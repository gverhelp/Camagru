<?php

require 'connect_db.php';

$userId = $_GET['userId'];
$avatarURL = $_GET['avatarURL'];

if (!isset($userId)) {
    die("User ID not provided.");
}

if (!isset($avatarURL)) {
    die("AvatarURL not provided.");
}

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
    $query = "UPDATE `camagru_db`.`users` SET `avatarURL` = '$avatarURL' WHERE (`idusers` = '$userId')";
    $stmt = $mysqli->prepare($query);
    $stmt->execute();

    $userData = array("avatarURL" => $avatarURL);
    echo json_encode($userData);
} else {
    echo "User not found.";
}

$stmt->close();
$mysqli->close();

?>