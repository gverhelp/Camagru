<?php

require 'connect_db.php';

$response = [];
$userId = $_GET['userId'];
$theme = $_GET['theme'];

if (!isset($userId)) {
    $response = [
        "success" => false,
        "message" => "User ID not provided.",
        "response_code" => 400 // Bad Request
    ];
} elseif (!isset($theme)) {
    $response = [
        "success" => false,
        "message" => "Theme not provided.",
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
                $query = "UPDATE `camagru_db`.`users` SET `theme` = ? WHERE (`idusers` = ?)";
                $stmtUpdate = $mysqli->prepare($query);
                $stmtUpdate->bind_param("ss", $theme, $userId);
                $stmtUpdate->execute();

                $response = [
                    "success" => true,
                    "theme" => $theme,
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
