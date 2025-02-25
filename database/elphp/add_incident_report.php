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
    $studentName = $data['studentName'];
    $contactNumber = $data['contactNumber'];
    $incidentType = $data['incidentType'];
    $otherIncident = $data['otherIncident'];
    $description = $data['description'];

    if (empty($studentName) || empty($contactNumber) || empty($incidentType) || empty($description)) {
        echo json_encode(["error" => "All fields are required."]);
        exit;
    }

    // Insert into the database
    $stmt = $conn->prepare("INSERT INTO incident_reports (student_name, contact_number, incident_type, other_incident, description) VALUES (?, ?, ?, ?, ?)");
    if ($stmt === false) {
        echo json_encode(["error" => "Prepare failed: " . $conn->error]);
        exit;
    }
    $stmt->bind_param("sssss", $studentName, $contactNumber, $incidentType, $otherIncident, $description);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Incident report added successfully."]);
    } else {
        echo json_encode(["error" => "Failed to add incident report: " . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Invalid request method."]);
}

$conn->close();
?>