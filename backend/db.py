from sqlite3 import Cursor

def createUserTable(cur: Cursor):
  cur.execute('''
      CREATE TABLE IF NOT EXISTS USER (
          username TEXT NOT NULL PRIMARY KEY,
          password TEXT
      );
  ''')

def findUser(cur:Cursor, username:str):
   res = cur.execute("SELECT username, password FROM USER WHERE username = :username", {"username": username})
   return res.fetchall()

def addUser(cur:Cursor, username:str, password:str):
   res = cur.execute("INSERT INTO USER (username, password) VALUES (:username, :password)", {"username": username, "password": password})
   return res.fetchall()