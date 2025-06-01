<?php
// CORS configuration - MUST BE AT THE VERY BEGINNING
$allowed_origins = [
    'https://reverse-backend.vercel.app',
    'https://reverse-weld.vercel.app',
    'https://reverse-fe13svsup-lromerogs-projects.vercel.app',
    'https://reverse-4ngj2lrhe-lromerogs-projects.vercel.app',
    'https://reverse-p7r9y5kbm-lromerogs-projects.vercel.app',
    'https://reverse-hqqayhzwg-lromerogs-projects.vercel.app',
    'https://reverse-j3nz4600z-lromerogs-projects.vercel.app',
    // Allow localhost ports 3000-3010 and 5173
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
    'http://localhost:3004',
    'http://localhost:3005',
    'http://localhost:3006',
    'http://localhost:3007',
    'http://localhost:3008',
    'http://localhost:3009',
    'http://localhost:3010',
    'http://localhost:5173'
];

// Get the origin from the request
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

// Set CORS headers if origin is allowed
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400'); // 24 hours cache for preflight
}

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// Set content type for all other requests
header('Content-Type: application/json');

// Include database configuration
require_once __DIR__ . '/../config/database.php';

// Get the JSON content from the request body
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Check that the action is valid
if (!isset($data['action']) || !in_array($data['action'], ['login', 'register'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid action']);
    exit;
}

try {
    switch ($data['action']) {
        case 'login':
            // Check required fields
            if (!isset($data['email']) || !isset($data['password'])) {
                throw new Exception('Email and password are required');
            }

            // Find user
            $user = fetchOne(
                "SELECT id, username, email, password, points, level FROM users WHERE email = ?",
                [$data['email']]
            );

            if (!$user || !password_verify($data['password'], $user['password'])) {
                throw new Exception('Invalid credentials');
            }

            // Remove password before sending response
            unset($user['password']);

            // Generate session token (use JWT in production)
            session_start();
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];

            echo json_encode([
                'success' => true,
                'message' => 'Login successful',
                'user' => $user
            ]);
            break;

        case 'register':
            // Check required fields
            if (!isset($data['username']) || !isset($data['email']) || !isset($data['password'])) {
                throw new Exception('All fields are required');
            }

            // Check if email already exists
            $existingUser = fetchOne(
                "SELECT id FROM users WHERE email = ?",
                [$data['email']]
            );

            if ($existingUser) {
                throw new Exception('Email is already registered');
            }

            // Check if username already exists
            $existingUsername = fetchOne(
                "SELECT id FROM users WHERE username = ?",
                [$data['username']]
            );

            if ($existingUsername) {
                throw new Exception('Username is already taken');
            }

            // Hash the password
            $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);

            // Insert new user
            $userId = insertAndGetId(
                "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
                [$data['username'], $data['email'], $hashedPassword]
            );

            // Get the created user
            $newUser = fetchOne(
                "SELECT id, username, email, points, level FROM users WHERE id = ?",
                [$userId]
            );

            // Automatically start session
            session_start();
            $_SESSION['user_id'] = $newUser['id'];
            $_SESSION['username'] = $newUser['username'];

            echo json_encode([
                'success' => true,
                'message' => 'Registration successful',
                'user' => $newUser
            ]);
            break;
    }
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?> 