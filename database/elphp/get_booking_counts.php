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

    // Fetch booking counts
    $stmt = $conn->prepare("
        SELECT 
            (SELECT COUNT(*) FROM bookings WHERE status = 'pending') AS pending_count,
            (SELECT COUNT(*) FROM bookings WHERE status = 'accepted') AS accepted_count,
            (SELECT COUNT(*) FROM bookings WHERE status = 'declined') AS declined_count
    ");
    $stmt->execute();

    $counts = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode($counts);
} catch (PDOException $e) {
    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
}
?>