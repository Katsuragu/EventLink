<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// MySQL credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "eventlink";

try {
    // Connect to MySQL using PDO
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $path = explode('/', trim($_SERVER['REQUEST_URI'], '/'));

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);

        if ($path[count($path) - 1] === 'signup') {
            // Signup logic
            $email = $data['email'];
            $username = $data['username'];
            $password = $data['password'];

            if (empty($email) || empty($username) || empty($password)) {
                echo json_encode(["error" => "All fields are required"]);
                exit;
            }

            $hashed_password = password_hash($password, PASSWORD_BCRYPT);

            $stmt = $conn->prepare("INSERT INTO users (email, username, password) VALUES (?, ?, ?)");
            $stmt->execute([$email, $username, $hashed_password]);

            echo json_encode(["message" => "User signed up successfully"]);
        } elseif ($path[count($path) - 1] === 'login') {
            // Login logic
            $login = $data['login'];
            $password = $data['password'];

            if (empty($login) || empty($password)) {
                echo json_encode(["error" => "Login and password are required"]);
                exit;
            }

            $stmt = $conn->prepare("SELECT id, username, email, password, access FROM users WHERE username = ? OR email = ?");
            $stmt->execute([$login, $login]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user) {
                if (password_verify($password, $user['password'])) {
                    // Store user data in session
                    $_SESSION['user_id'] = $user['id'];
                    $_SESSION['username'] = $user['username'];
                    $_SESSION['email'] = $user['email'];
                    $_SESSION['access'] = $user['access'];

                    echo json_encode(["message" => "Login successful", "redirect" => true, "access" => $user['access'], "username" => $user['username'], "email" => $user['email']]);
                } else {
                    echo json_encode(["error" => "Invalid password"]);
                }
            } else {
                echo json_encode(["error" => "Username or email not found"]);
            }
        } else {
            echo json_encode(["error" => "Invalid endpoint"]);
        }
    } else {
        echo json_encode(["error" => "Invalid request method"]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
}
?>