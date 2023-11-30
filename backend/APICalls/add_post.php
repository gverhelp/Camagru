<?php

require 'connect_db.php';

$response = [];

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response = [
        "success" => false,
        "message" => "Invalid request method.",
        "response_code" => 405 // Method Not Allowed
    ];
} else {
    $userID = $_POST['userID'];
    $screenshotDataURL = file_get_contents($_POST['screenshotDataURL']);

    if (!isset($userID)) {
        $response = [
            "success" => false,
            "message" => "UserID not provided.",
            "response_code" => 400 // Bad Request
        ];
    } elseif (!isset($screenshotDataURL)) {
        $response = [
            "success" => false,
            "message" => "Screenshot data URL not provided.",
            "response_code" => 400 // Bad Request
        ];
    } else {
        $sql = "INSERT INTO posts (userID, URL) VALUES (?, ?)";
        $stmt = $mysqli->prepare($sql);

        if ($stmt === false) {
            $response = [
                "success" => false,
                "message" => "Error in SQL query preparation: " . $mysqli->error,
                "response_code" => 500 // Internal Server Error
            ];
        } else {
            $stmt->bind_param("ib", $userID, $screenshotDataURL);

            echo $screenshotDataURL;

            if (!$stmt->execute()) {
                $response = [
                    "success" => false,
                    "message" => "Error executing the query: " . $stmt->error,
                    "response_code" => 500 // Internal Server Error
                ];
            } else {
                $response = [
                    "success" => true,
                    "message" => "Post added successfully.",
                    "response_code" => 200 // OK
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
