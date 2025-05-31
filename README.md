# Reverse Landing Page

A modern landing page built with React and PHP, featuring user authentication, voucher management, and a responsive design.

## Project Structure

```
reverse-landing/
├── src/                    # Frontend React application
│   ├── components/        # React components
│   ├── styles/           # CSS and styling files
│   └── App.tsx           # Main React application
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
- User authentication
- Database integration (MySQL)
- CORS support for development
- Secure password hashing
- Input sanitization

## Prerequisites

- Node.js (v14 or higher)
- PHP (v7.4 or higher)
- MySQL (v5.7 or higher)
- XAMPP (or similar local server)

## Installation

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

## Development

### Frontend Development
- The React application runs on port 3000 by default
- Hot reloading is enabled
- ESLint and Prettier are configured for code quality

### Backend Development
- The PHP API runs on Apache (XAMPP)
- CORS is configured for development (ports 3000-3010)
- Database queries are logged for debugging

## Security Considerations

- Passwords are hashed using PHP's `password_hash()`
- Input is sanitized using `mysqli_real_escape_string()`
- CORS is configured for specific origins
- Database credentials are stored in a separate config file

## Production Deployment

### Frontend
1. Build the React application:
   ```bash
   npm run build
   ```
2. Deploy the `build` folder to your web server

### Backend
1. Update CORS headers in PHP files to allow only your production domain
2. Ensure proper database credentials in `config.php`
3. Deploy the `backend` folder to your PHP server

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
