from fastapi import FastAPI, Response, status, Request
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta, timezone
from db import createUserTable, findUser, addUser
from pydantic import BaseModel
from dotenv import load_dotenv
import uvicorn
import sqlite3
import bcrypt
import jwt
import os


load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

conn = sqlite3.connect("Authentication.db")
cur = conn.cursor()

createUserTable(cur)

class AuthSchema(BaseModel):
  username: str
  password: str


def validatePassword(password: str): 
  password = password.strip()
  hasLowerCase, hasUpperCase, hasDigit, hasSpecialCharacter, satisfyMinLength = False, False, False, False, False

  satisfyMinLength = len(password) > 4

  for char in password:
    if char.islower():
      hasLowerCase = True
    if char.isupper():
      hasUpperCase = True
    if char.isdigit():
      hasDigit = True
    if char in ['@', '$','!','%', '*', '?', '&']:
      hasSpecialCharacter = True

  return hasUpperCase and hasLowerCase and hasDigit and hasSpecialCharacter and satisfyMinLength 

# To check the health of the backend application
@app.get("/health")
async def health(): 
  return {"message": "Hello from FastAPI", "health": "GOOD"}

# To register user
@app.post("/register")
async def register_user(user: AuthSchema, response: Response):
  rows = findUser(cur, user.username)
  usernameExist = False
  for row in rows:
    if row[0] == user.username:
      usernameExist = True
      break

  if usernameExist:
    response.status_code = status.HTTP_409_CONFLICT
    return {"message": "Username already taken"}

  if not validatePassword(user.password): 
      response.status_code = status.HTTP_400_BAD_REQUEST
      return {"message": "Password must consist of at least one digit, one special character, one uppercase character, one lowercase character and minimum length of 5 characters"}

  hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())
  addUser(cur,user.username, hashed_password)
  conn.commit()

  expirationTime = datetime.now(tz=timezone.utc) + timedelta(days=1)
  
  # Generate jwt token for 1 day 
  payload = {"username": user.username, "type": "access_token", "exp": expirationTime}
  token = jwt.encode(payload, os.getenv("JWT_SECRET"), algorithm="HS256")
  
  # Send jwt token in response body using username
  response.set_cookie(key="access_token", value=token, httponly=True, secure=True)

  return {"message": "Successfully registered user"}


# To login user using username and password
@app.post("/login")
async def login_user(user: AuthSchema, response: Response):
  rows = findUser(cur, user.username)
  foundUser = None
  for row in rows: 
    if row[0] == user.username:
      foundUser = {"username": row[0], "password": row[1]}
      break
  if foundUser is None: 
    response.status_code = status.HTTP_404_NOT_FOUND
    return {"message": "Username not found"}
  
  isValidPassword = bcrypt.checkpw(user.password.encode('utf-8'), foundUser['password'])
  
  if not isValidPassword: 
    response.status_code = status.HTTP_401_UNAUTHORIZED
    return {"message": "Invalid password"}

  expirationTime = datetime.now(tz=timezone.utc) + timedelta(days=1)
  
  # Generate jwt token for 1 day 
  payload = {"username": foundUser["username"], "type": "access_token", "exp": expirationTime}
  token = jwt.encode(payload, os.getenv("JWT_SECRET"), algorithm="HS256")
  
  # Send jwt token in response body using username
  response.set_cookie(key="access_token", value=token, httponly=True, secure=True)

  return {"message": "Successfully logged in user"}


# Endpoint that is to logout user
@app.get("/logout")
async def login_user(response:Response):
  response.delete_cookie(key="access_token")
  return {"message": "Successfully logged out user"}


# Endpoint that is triggered on every page load to determine whether user is logged in or not 
@app.get("/validate-token")
async def validate_token(request: Request, response: Response):
  accessToken = request.cookies.get("access_token")
  if not accessToken: 
    response.status_code = status.HTTP_401_UNAUTHORIZED
    return {"status": False, "message": "No access token"}
  try:
    payload = jwt.decode(accessToken, os.getenv("JWT_SECRET"), algorithms="HS256")
    return {"status":True, "message": f"Valid jwt, Hello {payload['username']}"}
  except jwt.ExpiredSignatureError:
    response.status_code = status.HTTP_401_UNAUTHORIZED
    return {"status":False, "message": "Access token expired"}
  except jwt.InvalidTokenError:
    response.status_code = status.HTTP_401_UNAUTHORIZED
    return {"status":False, "message": "Invalid token"}
  except Exception as err:
    response.status_code = status.HTTP_401_UNAUTHORIZED
    return {"status":False, "message": "Unknown Exception"}
  
  


uvicorn.run(app, host='localhost', port=8000)