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

// Connect to MySQL
$conn = new mysqli($servername, $username, $password, $dbname);

// Check for connection error
if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed: " . $conn->connect_error]));
}

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $id = $data['id'];
    $status = $data['status'];

    if (empty($id) || empty($status)) {
        echo json_encode(["error" => "ID and status are required."]);
        exit;
    }

    // Update the status in the database
    $stmt = $conn->prepare("UPDATE bookings SET status = ? WHERE id = ?");
    if ($stmt === false) {
        echo json_encode(["error" => "Prepare failed: " . $conn->error]);
        exit;
    }
    $stmt->bind_param("si", $status, $id);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Booking status updated successfully."]);
    } else {
        echo json_encode(["error" => "Failed to update booking status: " . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Invalid request method."]);
}

$conn->close();
?>