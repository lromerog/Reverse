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

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $user = isset($_GET['user']) ? mysqli_real_escape_string($conn, $_GET['user']) : '';
    if ($user) {
        $query = "SELECT * FROM vouchers WHERE user = '$user'";
        $result = mysqli_query($conn, $query);
        $vouchers = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $vouchers[] = $row;
        }
        echo json_encode($vouchers);
    } else {
        echo json_encode(["status" => "error", "message" => "Missing user parameter."]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $user = isset($data['user']) ? mysqli_real_escape_string($conn, $data['user']) : '';
    $voucher_code = isset($data['voucher_code']) ? mysqli_real_escape_string($conn, $data['voucher_code']) : '';
    if ($user && $voucher_code) {
        $query = "INSERT INTO vouchers (user, voucher_code) VALUES ('$user', '$voucher_code')";
        if (mysqli_query($conn, $query)) {
            echo json_encode(["status" => "ok", "message" => "Voucher created successfully."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to create voucher or code already exists."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Missing user or voucher_code."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?> 