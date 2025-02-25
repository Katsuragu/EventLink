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

    // Get POST data
    $data = json_decode(file_get_contents("php://input"), true);

    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $title = $data['title'];
        $start = $data['start'];
        $end = $data['end'];

        if (empty($title) || empty($start) || empty($end)) {
            echo json_encode(["error" => "All fields are required."]);
            exit;
        }

        // Insert into the database
        $stmt = $conn->prepare("INSERT INTO events (title, start, end) VALUES (?, ?, ?)");
        $stmt->execute([$title, $start, $end]);

        echo json_encode(["message" => "Event added successfully."]);
    } else {
        echo json_encode(["error" => "Invalid request method."]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
}
?>