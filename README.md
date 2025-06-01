# Reverse Landing Page

A modern landing page built with React and PHP, featuring user authentication, voucher management, and a responsive design.

## Online Demo

You can try the app online at: [https://reverse-weld.vercel.app](https://reverse-weld.vercel.app)

## Project Structure

```
reverse-landing/
├── src/                    # Frontend React application
│   ├── components/        # React components
│   ├── styles/           # CSS and styling files
│   └── App.jsx           # Main React application
│
└── backend/               # PHP Backend API
    ├── api/              # API endpoints
    │   ├── auth.php     # Authentication (login/register)
    │   ├── users.php    # User management
    │   └── vouchers.php # Voucher management
    ├── config/          # Configuration files
    │   └── config.php   # Database configuration
    └── db/              # Database files
        └── database.sql # Database schema
```

## Features

### Frontend (React)
- Modern, responsive design
- User authentication (login/register)
- Voucher management system
- Protected routes
- Form validation
- Error handling
- Loading states

### Backend (PHP)
- RESTful API endpoints
- User authentication (login/register)
- Database integration (MySQL)
- CORS support for development
- Secure password hashing
- Input sanitization

## How to Run the App

### Frontend Setup
1. Navigate to the project root:
   ```bash
   cd reverse-landing
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`

### Backend Setup
1. Install XAMPP (or your preferred local server)
2. Copy the `backend` folder to your XAMPP's `htdocs` directory
3. Create a new MySQL database named `reverse`
4. Import the database schema:
   - Open phpMyAdmin
   - Select the `reverse` database
   - Import `backend/db/database.sql`
5. Configure the database connection:
   - Open `backend/config/config.php`
   - Update the database credentials if needed:
     ```php
     $host = 'localhost';
     $dbname = 'reverse';
     $username = 'your_username';
     $password = 'your_password';
     ```
6. Start Apache and MySQL from XAMPP Control Panel

## API Endpoints

### Authentication
- `POST /api/auth.php`
  - Login: `{ "action": "login", "username": "...", "password": "..." }`
  - Register: `{ "action": "register", "username": "...", "password": "...", "email": "..." }`

### Users
- `GET /api/users.php?user=username`
  - Returns user information

### Vouchers
- `GET /api/vouchers.php?user=username`
  - Returns user's vouchers
- `POST /api/vouchers.php`
  - Create voucher: `{ "user": "username", "voucher_code": "..." }`

## Development Notes

- The React app runs on port 3000 by default (hot reloading enabled)
- The PHP backend runs on Apache (XAMPP) and supports CORS for local development
- Passwords are hashed using PHP's `password_hash()`
- All user input is sanitized

## Changelog

- **feat:** Added backend in PHP with authentication and user management
- **feat:** Integrated MySQL database and provided schema
- **feat:** Implemented RESTful API endpoints for authentication, users, and vouchers
- **fix:** Translated all frontend and backend messages to English
- **fix:** Improved CORS configuration for local development
- **feat:** Modern, responsive React frontend with protected routes and voucher system
- **docs:** Updated README with setup instructions and online demo URL

## License

This project is licensed under the MIT License - see the LICENSE file for details.
