# Overview

This project is a simple authentication system with two user roles: **Admin** and **Customer**. The stack includes React.js for the frontend, Express.js for the backend, and PostgreSQL for data storage. Passwords are hashed with bcrypt before persisting, and login compares against the hashed value.

## Project Structure

- backend/: Express API with PostgreSQL and bcrypt-based auth routes.
- frontend/: React + Vite UI with signup/login forms and role-aware messaging.

## Running the App

### Backend

1. Copy backend/.env.example to backend/.env and set DATABASE_URL (Postgres connection string) and PORT (default 3001).
2. From backend/, install dependencies and create the table:
   - `npm install`
   - `psql "$DATABASE_URL" -f schema.sql`
3. Start the API server: `npm run dev`

### Frontend

1. From frontend/, install dependencies: `npm install`
2. Start Vite dev server: `npm run dev` (defaults to http://localhost:5173)
3. The frontend expects the API at `http://localhost:3001/api`; override with `VITE_API_URL` in frontend/.env if needed.

## Technologies

- **Frontend:** React.js for the UI; fetch/axios for HTTP requests.
- **Backend:** Express.js for API routes; PostgreSQL for storing users (email, password hash, role); bcrypt.js for secure password hashing.

## Features

- **SignUp (Registration):** Admins and Customers can create accounts with email, password, and role. Passwords are hashed before storage; duplicate emails are rejected.
- **SignIn (Login):** Users log in with email and password. Supplied passwords are compared with the stored hash. Success returns a role-aware message such as "Welcome Admin" or "Welcome Customer".
- **Basic Role Handling:** User role is stored on signup and reflected in login responses/messages.

## Tasks Completed

- Built registration and login flows for Admin and Customer users.
- Secured password handling via bcrypt.js hashing.
- Prevented duplicate registrations by email.
- Implemented credential validation with clear success/error responses.
- Displayed simple role-specific messaging after login.
- Connected React frontend to Express backend using fetch/axios for requests.

## Outcomes

- Functional signup and login for Admin and Customer roles.
- Hashed password storage in PostgreSQL for security.
- Role-based messaging on successful authentication.
- Error handling for invalid credentials or duplicate emails.

## Notes

- This implementation omits session management and JWTs; it focuses on secure storage and validation. It can serve as a foundation for adding token-based auth or sessions later.
# Ai-Auth-App
