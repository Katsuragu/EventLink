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

// Fetch booking data for each venue
$sql = "SELECT venue, COUNT(*) as count FROM bookings GROUP BY venue ORDER BY count DESC";
$result = $conn->query($sql);

$venueBookingData = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $venueBookingData[] = $row;
    }
}

echo json_encode($venueBookingData);

$conn->close();
?>