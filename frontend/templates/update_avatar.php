<?php

require 'db.php';

$userId = $_GET['userId'];
$avatarURL = $_GET['avatarURL'];

if (!isset($userId)) {
    $response = [
        "success" => false,
        "message" => "User ID not provided."
    ];
}

elseif (!isset($avatarURL)) {
    $response = [
        "success" => false,
        "message" => "AvatarURL not provided."
    ];
}

else {
    $sql = "SELECT * FROM users WHERE idusers = ?";
    $stmt = $mysqli->prepare($sql);

    if ($stmt === false) {
        $response = [
            "success" => false,
            "message" => "Error in SQL query preparation: " . $mysqli->error
        ];
    }

    else {
        $stmt->bind_param("s", $userId);

        if (!$stmt->execute()) {
            $response = [
                "success" => false,
                "message" => "Error executing the query: " . $stmt->error
            ];
        }
        else {
            $result = $stmt->get_result();

            // Check if a user with the provided id was found
            if ($result->num_rows != 1) {
                $response = [
                    "success" => false,
                    "message" => "User not found."
                ];
            } else {
                $query = "UPDATE `camagru_db`.`users` SET `avatarURL` = '$avatarURL' WHERE (`idusers` = '$userId')";
                $stmt = $mysqli->prepare($query);
                $stmt->execute();

                $response = [
                    "success" => true,
                    "avatarURL" => $avatarURL
                ];
            }
        }
    }
}

http_response_code(200); // Set the HTTP status code
header("Content-Type: application/json");
echo json_encode($response);

$stmt->close();
$mysqli->close();

?>