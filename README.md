# FastAPI Authentication Backend

## Overview

This backend application is built using FastAPI and SQLite to provide basic authentication features, including user registration, login, logout, and JWT token validation.

### How the Backend Works

- **Health Check Endpoint**: Verifies the health of the backend server.
- **User Registration**:
  - Accepts username and password.
  - Checks if the username is already taken.
  - Validates the password to ensure it meets the required criteria.
  - Hashes the password using `bcrypt` and stores the user details in an SQLite database.
  - Generates a JWT token that is valid for 1 day and sets it as an HTTP-only cookie.
- **User Login**:
  - Accepts username and password.
  - Checks if the user exists in the database.
  - Validates the password using `bcrypt`.
  - Generates a new JWT token for 1 day and sets it as an HTTP-only cookie.
- **User Logout**:
  - Deletes the JWT token from the cookies, effectively logging out the user.
- **Token Validation**:
  - Validates the JWT token stored in the cookies on every page load.
  - Checks for token expiration or invalidity and returns the appropriate status.

### API Endpoints

- `GET /health`: Check the health of the backend service.
- `POST /register`: Register a new user with a username and password.
- `POST /login`: Login an existing user using a username and password.
- `GET /logout`: Logout the current user.
- `GET /validate-token`: Validate the JWT token to determine if the user is logged in.

## To run the backend application

1. Navigate to the backend directory:
   ```bash
   cd backend/
   ```
2. Install the required dependencies:

```bash
pip install -r requirements.txt
```

3. Create a .env file:

```bash
touch .env
```

4. Set the JWT secret in the .env file

```bash
JWT_SECRET="your_secret_key"
```

5. Run the backend application:

```bash
JWT_SECRET="your_secret_key"
```

## To run the frontend application

1. Navigate to the frontend directory:
   ```bash
   cd frontend/
   ```
2. Install all dependencies using pnpm:

```bash
pnpm install
```

3. Run the frontend application:

```bash
pnpm dev
```
