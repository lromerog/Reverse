<?php
// CORS configuration - MUST BE AT THE VERY BEGINNING
$allowed_origins = [
    // URLs de producción
    'https://reverse-backend.vercel.app',
    'https://reverse-weld.vercel.app',
    
    // URLs de preview de Vercel (patrón común)
    'https://reverse-*-lromerogs-projects.vercel.app',
    
    // URLs específicas de Vercel
    'https://reverse-fe13svsup-lromerogs-projects.vercel.app',
    'https://reverse-4ngj2lrhe-lromerogs-projects.vercel.app',
    'https://reverse-p7r9y5kbm-lromerogs-projects.vercel.app',
    'https://reverse-hqqayhzwg-lromerogs-projects.vercel.app',
    'https://reverse-j3nz4600z-lromerogs-projects.vercel.app',
    'https://reverse-ctjeh5cab-lromerogs-projects.vercel.app',
    'https://reverse-j9ti7onf9-lromerogs-projects.vercel.app',
    'https://reverse-nwnmr5hq4-lromerogs-projects.vercel.app',
    'https://reverse-n99c7bd69-lromerogs-projects.vercel.app',
    'https://reverse-8pm39a7cs-lromerogs-projects.vercel.app',
    'https://reverse-5nty7ro5v-lromerogs-projects.vercel.app',
    'https://reverse-994nw7wco-lromerogs-projects.vercel.app',
    'https://reverse-jzvvp5c0n-lromerogs-projects.vercel.app',
    'https://reverse-6k8dfm99f-lromerogs-projects.vercel.app',
    'https://reverse-89opcdj4r-lromerogs-projects.vercel.app',
    'https://reverse-gkn1iqtqa-lromerogs-projects.vercel.app',
    'https://reverse-5ncw3e1bi-lromerogs-projects.vercel.app',
    'https://reverse-evqdi3ezs-lromerogs-projects.vercel.app',
    'https://reverse-lj3mt2nd7-lromerogs-projects.vercel.app',
    'https://reverse-8m8ywa5ur-lromerogs-projects.vercel.app',
    
    // URLs locales
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
    'http://localhost:5173',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'http://127.0.0.1:3002',
    'http://127.0.0.1:3003',
    'http://127.0.0.1:3004',
    'http://127.0.0.1:3005',
    'http://127.0.0.1:3006',
    'http://127.0.0.1:3007',
    'http://127.0.0.1:3008',
    'http://127.0.0.1:3009',
    'http://127.0.0.1:3010',
    'http://127.0.0.1:5173'
];

// Get the origin from the request
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

// Check if origin matches any of the allowed patterns
$is_allowed = false;
foreach ($allowed_origins as $allowed) {
    if (strpos($allowed, '*') !== false) {
        // Convert wildcard pattern to regex
        $pattern = str_replace('*', '.*', $allowed);
        $pattern = str_replace('.', '\.', $pattern);
        if (preg_match('/^' . $pattern . '$/', $origin)) {
            $is_allowed = true;
            break;
        }
    } elseif ($origin === $allowed) {
        $is_allowed = true;
        break;
    }
}

// Set CORS headers if origin is allowed
if ($is_allowed) {
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