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

// Fetch resources with items
$sql = "SELECT id, bundle_name, chairs, tables, microphones, sound_systems, projectors FROM resources";
$result = $conn->query($sql);

$resources = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $items = [];
        if ($row['chairs']) $items[] = $row['chairs'] . ' chairs';
        if ($row['tables']) $items[] = $row['tables'] . ' tables';
        if ($row['microphones']) $items[] = $row['microphones'] . ' microphones';
        if ($row['sound_systems']) $items[] = $row['sound_systems'] . ' sound systems';
        if ($row['projectors']) $items[] = $row['projectors'] . ' projectors';

        $resources[] = [
            'id' => $row['id'],
            'bundle_name' => $row['bundle_name'],
            'items' => $items
        ];
    }
}

echo json_encode($resources);

$conn->close();
?>