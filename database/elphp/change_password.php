<?php
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

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);

        $username = $data['username'];
        $new_password = $data['password'];

        if (empty($username) || empty($new_password)) {
            echo json_encode(["error" => "Username and new password are required"]);
            exit;
        }

        $hashed_password = password_hash($new_password, PASSWORD_BCRYPT);

        $stmt = $conn->prepare("UPDATE users SET password = ? WHERE username = ?");
        $stmt->execute([$hashed_password, $username]);

        echo json_encode(["message" => "Password changed successfully"]);
    } else {
        echo json_encode(["error" => "Invalid request method"]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
}
?>