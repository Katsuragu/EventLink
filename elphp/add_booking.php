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
        $eventTitle = $data['eventTitle'];
        $venue = $data['venue'];
        $startTime = $data['startTime'];
        $endTime = $data['endTime'];
        $resources = $data['resources'];
        $remarks = $data['remarks'];

        if (empty($eventTitle) || empty($venue) || empty($startTime) || empty($endTime) || empty($resources)) {
            echo json_encode(["error" => "All fields are required."]);
            exit;
        }

        // Insert into the database
        $stmt = $conn->prepare("INSERT INTO bookings (event_title, venue, start_time, end_time, resources, remarks, status) VALUES (?, ?, ?, ?, ?, ?, 'pending')");
        $stmt->execute([$eventTitle, $venue, $startTime, $endTime, $resources, $remarks]);

        echo json_encode(["message" => "Booking added successfully."]);
    } else {
        echo json_encode(["error" => "Invalid request method."]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
}
?>