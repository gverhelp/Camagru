<?php

// Include necessary files and connect to the database

// Connect to your database (modify the connection details as needed)
$env = parse_ini_file('../../.env'); // change later
$mysqli = new mysqli($env["HOSTNAME"], $env["MYSQL_USERNAME"], $env["MYSQL_PASSWORD"], $env["DATABASE"]);

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// Get the user ID from the request
$userId = $_GET['userId'];

if (!isset($userId)) {
    die("User ID not provided.");
}

// Query the database to fetch user data based on $userId
// Prepare a SQL query to retrieve the user's data by idusers
$sql = "SELECT * FROM users WHERE idusers = ?";
$stmt = $mysqli->prepare($sql);

if ($stmt === false) {
    die("Error in SQL query preparation: " . $mysqli->error);
}

$stmt->bind_param("s", $userId);

if (!$stmt->execute()) {
    die("Error executing the query: " . $stmt->error);
}

$result = $stmt->get_result();

// Check if a user with the provided id was found
if ($result->num_rows === 1) {
    $row = $result->fetch_assoc();

    $userData = array("username" => $row['username'], "email" => $row['email'], "avatarURL" => $row['avatarURL']);
    echo json_encode($userData);
} else {
    echo "User not found.";
}

$stmt->close();
$mysqli->close();

?>