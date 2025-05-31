# Backend Setup (PHP, MySQL, phpMyAdmin) for Reverse x Nike

## Overview
This folder contains the backend (PHP) code for Reverse x Nike. It is intended to be hosted on a local XAMPP (Apache, PHP, MySQL, phpMyAdmin) environment.

## Installation & Configuration (Windows)

### 1. Install XAMPP
- Download XAMPP from [https://www.apachefriends.org/index.html](https://www.apachefriends.org/index.html) (includes Apache, PHP, MySQL, and phpMyAdmin).
- Run the installer and follow the prompts (default options are fine).

### 2. Start XAMPP Services
- Open the XAMPP Control Panel (usually located at C:\xampp\xampp-control.exe).
- Start the **Apache** and **MySQL** services (click "Start").
- (Optional) If Apache does not start (e.g. port 80 is in use), edit C:\xampp\apache\conf\httpd.conf and change "Listen 80" to "Listen 8080" (o el puerto que prefieras).

### 3. Configurar la Base de Datos (MySQL y phpMyAdmin)
- Abre tu navegador y visita [http://localhost/phpmyadmin](http://localhost/phpmyadmin) (o [http://localhost:8080/phpmyadmin](http://localhost:8080/phpmyadmin) si cambiaste el puerto de Apache).
- Crea una nueva base de datos (por ejemplo, "reverse").
- (Opcional) Importa un archivo SQL (por ejemplo, "database.sql" en la carpeta /db) para crear las tablas y datos iniciales.

### 4. Estructura de Carpetas Sugerida (Backend)
Se recomienda organizar el código PHP de la siguiente manera:

```
/backend
  /api
    - auth.php (endpoint para autenticación (login/register))
    - vouchers.php (endpoint para listar, crear o redimir vouchers)
    - users.php (endpoint para obtener información de usuarios)
  /db
    - database.sql (archivo SQL para crear la base de datos y sus tablas)
  /config
    - config.php (archivo de configuración (por ejemplo, conexión a la base de datos))
  /README.md (este archivo)
```

### 5. Ejemplos de Endpoints (Backend)
- **Autenticación:**  
  - POST /api/auth.php (login o registro de usuario)
- **Vouchers:**  
  - GET /api/vouchers.php (listar o redimir vouchers)  
  - POST /api/vouchers.php (crear un nuevo voucher)
- **Usuarios:**  
  - GET /api/users.php (obtener datos de un usuario)

### 6. Dependencias y Requisitos
- PHP 7 (o superior) (incluido en XAMPP).
- MySQL (incluido en XAMPP).
- phpMyAdmin (incluido en XAMPP).

### 7. Seguridad y Notas
- Nunca expongas credenciales (por ejemplo, la contraseña de la base de datos) en el código del frontend.
- Asegúrate de validar y sanitizar los datos de entrada en el backend.
- En producción, usa HTTPS.

---

## Ejemplo de Archivo de Configuración (config.php)
A continuación se muestra un ejemplo de cómo podría verse un archivo de configuración (por ejemplo, en /config/config.php) para conectarte a la base de datos:

```php
<?php
// config.php (ejemplo de configuración para la conexión a la base de datos)
$host = "localhost";
$user = "root"; // (o el usuario que hayas configurado en MySQL)
$pass = ""; // (o la contraseña que hayas configurado en MySQL)
$db   = "reverse"; // (nombre de la base de datos creada en phpMyAdmin)

$conn = mysqli_connect($host, $user, $pass, $db) or die("Error de conexión: " . mysqli_connect_error());
// (usa $conn en tus endpoints para realizar consultas SQL)
?>
```


---

## Ejemplo de Endpoint (auth.php)
A continuación se muestra un ejemplo de endpoint (por ejemplo, en /api/auth.php) para autenticar (login) a un usuario:

```php
<?php
// /api/auth.php (ejemplo de endpoint de autenticación)
require_once "../config/config.php";

// (suponiendo que recibes datos por POST en formato JSON)
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data["user"]) && isset($data["pass"])) {
    $user = mysqli_real_escape_string($conn, $data["user"]);
    $pass = mysqli_real_escape_string($conn, $data["pass"]);

    $query = "SELECT * FROM users WHERE username = '$user' AND password = '$pass'";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) > 0) {
        echo json_encode(["status" => "ok", "message" => "Login exitoso."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Credenciales incorrectas."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Datos incompletos."]);
}
?>
```


---

## Ejemplo de Endpoint (vouchers.php)
A continuación se muestra un ejemplo de endpoint (por ejemplo, en /api/vouchers.php) para listar (GET) o crear (POST) vouchers:

```php
<?php
// /api/vouchers.php (ejemplo de endpoint para vouchers)
require_once "../config/config.php";

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // (ejemplo: listar vouchers de un usuario (por ejemplo, con un parámetro "user" en la query))
    $user = isset($_GET["user"]) ? mysqli_real_escape_string($conn, $_GET["user"]) : "";
    if ($user) {
         $query = "SELECT * FROM vouchers WHERE user = '$user'";
         $result = mysqli_query($conn, $query);
         $vouchers = [];
         while ($row = mysqli_fetch_assoc($result)) {
             $vouchers[] = $row;
         }
         echo json_encode($vouchers);
    } else {
         echo json_encode(["status" => "error", "message" => "Parámetro "user" no proporcionado."]);
    }
} else if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // (ejemplo: crear un nuevo voucher (suponiendo que recibes datos por POST en formato JSON))
    $data = json_decode(file_get_contents("php://input"), true);
    if (isset($data["user"]) && isset($data["voucher_code"])) {
         $user = mysqli_real_escape_string($conn, $data["user"]);
         $voucher_code = mysqli_real_escape_string($conn, $data["voucher_code"]);
         $query = "INSERT INTO vouchers (user, voucher_code) VALUES ('$user', '$voucher_code')";
         if (mysqli_query($conn, $query)) {
             echo json_encode(["status" => "ok", "message" => "Voucher creado."]);
         } else {
             echo json_encode(["status" => "error", "message" => "Error al crear el voucher."]);
         }
    } else {
         echo json_encode(["status" => "error", "message" => "Datos incompletos."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Método no soportado."]);
}
?>
```


---

## Ejemplo de Endpoint (users.php)
A continuación se muestra un ejemplo de endpoint (por ejemplo, en /api/users.php) para obtener (GET) la información de un usuario:

```php
<?php
// /api/users.php (ejemplo de endpoint para obtener datos de un usuario)
require_once "../config/config.php";

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // (ejemplo: obtener datos de un usuario (por ejemplo, con un parámetro "user" en la query))
    $user = isset($_GET["user"]) ? mysqli_real_escape_string($conn, $_GET["user"]) : "";
    if ($user) {
         $query = "SELECT * FROM users WHERE username = '$user'";
         $result = mysqli_query($conn, $query);
         if (mysqli_num_rows($result) > 0) {
             $row = mysqli_fetch_assoc($result);
             echo json_encode($row);
         } else {
             echo json_encode(["status" => "error", "message" => "Usuario no encontrado."]);
         }
    } else {
         echo json_encode(["status" => "error", "message" => "Parámetro "user" no proporcionado."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Método no soportado."]);
}
?>
```


---

## Resumen
- **Instala XAMPP** (que incluye Apache, PHP, MySQL y phpMyAdmin) desde [https://www.apachefriends.org/index.html](https://www.apachefriends.org/index.html).
- **Inicia los servicios** (Apache y MySQL) desde el XAMPP Control Panel.
- **Configura la base de datos** (crea una base de datos "reverse" en phpMyAdmin, y opcionalmente importa un archivo SQL).
- **Organiza tu código PHP** en carpetas (por ejemplo, /api, /db, /config) y crea endpoints (por ejemplo, /api/auth.php, /api/vouchers.php, /api/users.php) para manejar la autenticación, vouchers y datos de usuarios.
- **Revisa los ejemplos** (config.php, auth.php, vouchers.php, users.php) para ver cómo conectarte a la base de datos y cómo manejar peticiones (GET, POST) en el backend.

---

**¡Con esto ya tienes instalado y configurado todo lo necesario para el backend en tu máquina!** 