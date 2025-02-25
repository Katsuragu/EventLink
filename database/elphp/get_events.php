<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// MySQL credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "eventlink";

try {
    // Connect to MySQL using PDO
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Fetch events
    $stmt = $conn->prepare("SELECT id, event_title AS title, start_time AS start, end_time AS end FROM bookings WHERE status = 'accepted'");
    $stmt->execute();

    $events = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($events);
} catch (PDOException $e) {
    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
}
?>