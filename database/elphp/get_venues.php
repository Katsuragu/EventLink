<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

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

// Fetch venues
$sql = "SELECT id, venue_name, description FROM venues";
$result = $conn->query($sql);

$venues = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $venues[] = $row;
    }
}

echo json_encode($venues);

$conn->close();
?>