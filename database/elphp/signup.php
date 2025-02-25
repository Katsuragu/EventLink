<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// MySQL credentials
$servername = "localhost";
$username = "root"; // Replace with your MySQL username
$password = ""; // Replace with your MySQL password
$dbname = "eventlink";

try {
    // Connect to MySQL using PDO
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Handle POST request
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);

        $email = $data['email'];
        $username = $data['username'];
        $password = $data['password'];

        if (empty($email) || empty($username) || empty($password)) {
            echo json_encode(["error" => "All fields are required"]);
            exit;
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL) || !str_ends_with($email, '@gmail.com')) {
            echo json_encode(["error" => "Email must be a valid @gmail.com address"]);
            exit;
        }

        if (strlen($password) < 8) {
            echo json_encode(["error" => "Password must be at least 8 characters long"]);
            exit;
        }

        if (!preg_match('/[!@#$%^&*(),.?":{}|<>]/', $password)) {
            echo json_encode(["error" => "Password must include at least one special character"]);
            exit;
        }

        // Check if username already exists
        $stmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE username = ?");
        $stmt->execute([$username]);
        if ($stmt->fetchColumn() > 0) {
            echo json_encode(["error" => "Username already exists"]);
            exit;
        }

        // Hash the password before storing it
        $hashed_password = password_hash($password, PASSWORD_BCRYPT);

        $stmt = $conn->prepare("INSERT INTO users (email, username, password, access) VALUES (?, ?, ?, 1)");
        $stmt->execute([$email, $username, $hashed_password]);

        echo json_encode(["message" => "User signed up successfully"]);
    } else {
        echo json_encode(["error" => "Invalid request method"]);
    }
} catch (PDOException $e) {
    if ($e->getCode() === '23000') { // Duplicate entry error code
        echo json_encode(["error" => "Email or username already exists"]);
    } else {
        echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
    }
}
?>