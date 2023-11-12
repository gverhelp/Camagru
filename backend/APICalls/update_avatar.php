<?php

require 'db.php';

$response = [];

$userId = $_GET['userId'];
$avatarURL = $_GET['avatarURL'];

if (!isset($userId)) {
    $response = [
        "success" => false,
        "message" => "User ID not provided.",
        "response_code" => 400 // Bad Request
    ];
} elseif (!isset($avatarURL)) {
    $response = [
        "success" => false,
        "message" => "AvatarURL not provided.",
        "response_code" => 400 // Bad Request
    ];
} else {
    $sql = "SELECT * FROM users WHERE idusers = ?";
    $stmt = $mysqli->prepare($sql);

    if ($stmt === false) {
        $response = [
            "success" => false,
            "message" => "Error in SQL query preparation: " . $mysqli->error,
            "response_code" => 500 // Internal Server Error
        ];
    } else {
        $stmt->bind_param("s", $userId);

        if (!$stmt->execute()) {
            $response = [
                "success" => false,
                "message" => "Error executing the query: " . $stmt->error,
                "response_code" => 500 // Internal Server Error
            ];
        } else {
            $result = $stmt->get_result();

            // Check if a user with the provided id was found
            if ($result->num_rows != 1) {
                $response = [
                    "success" => false,
                    "message" => "User not found.",
                    "response_code" => 404 // Not Found
                ];
            } else {
                $query = "UPDATE `camagru_db`.`users` SET `avatarURL` = ? WHERE (`idusers` = ?)";
                $stmtUpdate = $mysqli->prepare($query);
                $stmtUpdate->bind_param("ss", $avatarURL, $userId);
                $stmtUpdate->execute();

                $response = [
                    "success" => true,
                    "avatarURL" => $avatarURL,
                    "response_code" => 200 // Success
                ];
            }
        }
    }
}

http_response_code($response["response_code"]); // Set the HTTP status code
header("Content-Type: application/json");
echo json_encode($response);

$stmt->close();
$mysqli->close();

?>
