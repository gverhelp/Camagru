<?php

require 'connect_db.php';

$response = [];
$userID = $_POST['userID'];
$newUsername = $_POST['newUsername'];
$newEmail = $_POST['newEmail'];
$newPassword = $_POST['newPassword'];
$newAvatar = $_POST['newAvatar'];
$newBio = $_POST['newBio'];

if (!isset($userID) || !isset($newUsername) || !isset($newEmail) ||
    !isset($newPassword) || !isset($newAvatar) || !isset($newBio)) {
    $response = [
        "success" => false,
        "message" => "Some data are not provided.",
        "response_code" => 400 // Bad Request
    ];
} else {
    $query = "UPDATE `camagru_db`.`users` SET ";
    $params = [];
    $types = "";

    if (!empty($newUsername)) {
        $query .= "`username` = ?, ";
        $params[] = $newUsername;
        $types .= "s";
    }

    if (!empty($newEmail)) {
        $query .= "`email` = ?, ";
        $params[] = $newEmail;
        $types .= "s";
    }

    if (!empty($newPassword)) {
        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
        $query .= "`password` = ?, ";
        $params[] = $hashedPassword;
        $types .= "s";
    }

    // if (!empty($newAvatar)) {
    //     $query .= "`avatar` = ?, ";
    //     $params[] = $newAvatar;
    //     $types .= "s";
    // }

    if (!empty($newBio)) {
        $query .= "`bio` = ?, ";
        $params[] = $newBio;
        $types .= "s";
    }

    // Supprimez la virgule finale et ajoutez la condition WHERE
    $query = rtrim($query, ", ") . " WHERE (`idusers` = ?)";
    $params[] = $userID;
    $types .= "s";

    $stmt = $mysqli->prepare($query);

    if ($stmt === false) {
        $response = [
            "success" => false,
            "message" => "Error in SQL query preparation: " . $mysqli->error,
            "response_code" => 500 // Internal Server Error
        ];
    } else {
        // Ajoutez les types de paramètres à la fonction bind_param
        $stmt->bind_param($types, ...$params);

        if (!$stmt->execute()) {
            $response = [
                "success" => false,
                "message" => "Error executing the query: " . $stmt->error,
                "response_code" => 500 // Internal Server Error
            ];
        } else {
            $response = [
                "success" => true,
                "message" => "Settings updated.",
                "response_code" => 200 // Success
            ];
        }

        $stmt->close();
    }
}

http_response_code($response["response_code"]); // Set the HTTP status code
header("Content-Type: application/json");
echo json_encode($response);

$mysqli->close();

?>

