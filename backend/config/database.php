<?php
// Database configuration
// Change these values to your production server values

define('DB_HOST', 'mysql.tuservidor.com'); // Change to your real host
define('DB_USER', 'admin');                // Change to your real user
define('DB_PASS', 'SuperSecreta123');      // Change to your real password
define('DB_NAME', 'reverse_prod');         // Change to your real database name

// Function to get the database connection
function getDBConnection() {
    try {
        $conn = new PDO(
            "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
            DB_USER,
            DB_PASS,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false
            ]
        );
        return $conn;
    } catch (PDOException $e) {
        // In production, do not display the error message directly
        error_log("Database connection error: " . $e->getMessage());
        throw new Exception("Database connection error");
    }
}

// Function to execute queries safely
function executeQuery($sql, $params = []) {
    try {
        $conn = getDBConnection();
        $stmt = $conn->prepare($sql);
        $stmt->execute($params);
        return $stmt;
    } catch (PDOException $e) {
        error_log("Query error: " . $e->getMessage());
        throw new Exception("Database operation error");
    }
}

// Function to fetch a single record
function fetchOne($sql, $params = []) {
    $stmt = executeQuery($sql, $params);
    return $stmt->fetch();
}

// Function to fetch multiple records
function fetchAll($sql, $params = []) {
    $stmt = executeQuery($sql, $params);
    return $stmt->fetchAll();
}

// Function to insert a record and get its ID
function insertAndGetId($sql, $params = []) {
    $conn = getDBConnection();
    $stmt = $conn->prepare($sql);
    $stmt->execute($params);
    return $conn->lastInsertId();
}
?> 