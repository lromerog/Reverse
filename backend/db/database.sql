-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS reverse;

-- Usar la base de datos
USE reverse;

-- Crear la tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    points INT DEFAULT 0,
    level INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Crear la tabla de vouchers
CREATE TABLE IF NOT EXISTS vouchers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    code VARCHAR(50) NOT NULL UNIQUE,
    value DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'redeemed', 'expired') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    redeemed_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_voucher_code ON vouchers(code);
CREATE INDEX idx_voucher_user ON vouchers(user_id); 