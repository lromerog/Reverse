<?php
// Get the request origin
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

// List of allowed origins (for development)
$allowed_origins = [
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
    'http://127.0.0.1:3010'
];

// If the origin is in the allowed list, accept it
if (in_array($origin, $allowed_origins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}

header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

// If it's an OPTIONS request (preflight), end here
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header('Content-Type: application/json');
require_once '../config/config.php';

$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = isset($data['username']) ? mysqli_real_escape_string($conn, $data['username']) : '';
    $password = isset($data['password']) ? mysqli_real_escape_string($conn, $data['password']) : '';
    $email = isset($data['email']) ? mysqli_real_escape_string($conn, $data['email']) : '';
    $action = isset($data['action']) ? $data['action'] : 'login';

    if ($username && $password) {
        if ($action === 'register' && $email) {
            // Registration
            $hash = password_hash($password, PASSWORD_DEFAULT);
            $query = "INSERT INTO users (username, password, email) VALUES ('$username', '$hash', '$email')";
            if (mysqli_query($conn, $query)) {
                echo json_encode(["status" => "ok", "message" => "Registration successful."]);
            } else {
                echo json_encode(["status" => "error", "message" => "Registration failed or user/email already exists."]);
            }
        } else {
            // Login
            $query = "SELECT * FROM users WHERE username = '$username'";
            $result = mysqli_query($conn, $query);
            if ($row = mysqli_fetch_assoc($result)) {
                if (password_verify($password, $row['password'])) {
                    echo json_encode(["status" => "ok", "message" => "Login successful.", "user" => $row['username']]);
                } else {
                    echo json_encode(["status" => "error", "message" => "Invalid password."]);
                }
            } else {
                echo json_encode(["status" => "error", "message" => "User not found."]);
            }
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Missing username or password."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?> 