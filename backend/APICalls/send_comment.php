<?php

require 'connect_db.php';

$response = [];
$userID = $_POST['userID'];
$postID = $_POST['postID'];
$text = $_POST['text'];

if (!isset($userID)) {
    $response = [
        "success" => false,
        "message" => "UserID not provided.",
        "response_code" => 400 // Bad Request
    ];
} elseif (!isset($postID)) {
    $response = [
        "success" => false,
        "message" => "postID not provided.",
        "response_code" => 400 // Bad Request
    ];
} elseif (!isset($text)) {
    $response = [
        "success" => false,
        "message" => "Text not provided.",
        "response_code" => 400 // Bad Request
    ];
 } else {
    $sql = "INSERT INTO comments (userID, postID, text) VALUES (?, ?, ?)";
    $stmt = $mysqli->prepare($sql);

    if ($stmt === false) {
        $response = [
            "success" => false,
            "message" => "Error in SQL query preparation: " . $mysqli->error,
            "response_code" => 500 // Internal Server Error
        ];
    } else {
        $stmt->bind_param("iis", $userID, $postID, $text);

        if (!$stmt->execute()) {
            $response = [
                "success" => false,
                "message" => "Error executing the query: " . $stmt->error,
                "response_code" => 500 // Internal Server Error
            ];
        }
    }
}

http_response_code($response["response_code"]); // Set the HTTP status code
header("Content-Type: application/json");
echo json_encode($response);

$stmt->close();
$mysqli->close();

?>