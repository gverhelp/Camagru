<?php

require 'connect_db.php';

$response = [];
$postID = $_GET['postID'];

if (!isset($postID)) {
    $response = [
        "success" => false,
        "message" => "postID not provided.",
        "response_code" => 400 // Bad Request
    ];
} else {
    $sql = "DELETE FROM posts WHERE idposts = ?";
    $stmt = $mysqli->prepare($sql);

    if ($stmt === false) {
        $response = [
            "success" => false,
            "message" => "Error in SQL query preparation: " . $mysqli->error,
            "response_code" => 500 // Internal Server Error
        ];
    } else {
        $stmt->bind_param("i", $postID);

        if (!$stmt->execute()) {
            $response = [
                "success" => false,
                "message" => "Error executing the query: " . $stmt->error,
                "response_code" => 500 // Internal Server Error
            ];
        } else {
            $response = [
                "success" => True,
                "message" => "Post deleted successfuly.",
                "response_code" => 200 // OK
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