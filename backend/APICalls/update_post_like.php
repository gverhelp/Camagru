<?php

require 'connect_db.php';

$response = [];

$userId = $_GET['userId'];
$postId = $_GET['postId'];

if (!isset($userId) || !isset($postId)) {
    $response = [
        "success" => false,
        "message" => "User ID or Post ID not provided.",
        "response_code" => 400 // Bad Request
    ];
} else {
    // Check if the user has already liked the post
    $checkQuery = "SELECT * FROM likes WHERE userID = ? AND postID = ?";
    $checkStmt = $mysqli->prepare($checkQuery);

    if ($checkStmt === false) {
        $response = [
            "success" => false,
            "message" => "Error in SQL query preparation: " . $mysqli->error
        ];
    } else {
        $checkStmt->bind_param("ii", $userId, $postId);
        $checkStmt->execute();
        $checkResult = $checkStmt->get_result();

        if ($checkResult->num_rows < 1) {
            // If the user hasn't liked the post, add a new like
            $addQuery = "INSERT INTO likes (userID, postID) VALUES (?, ?)";
            $addStmt = $mysqli->prepare($addQuery);

            if ($addStmt === false) {
                $response = [
                    "success" => false,
                    "message" => "Error in SQL query preparation: " . $mysqli->error
                ];
            } else {
                $addStmt->bind_param("ii", $userId, $postId);
                if ($addStmt->execute()) {
                    $response = [
                        "success" => true,
                        "message" => "Added", // Indicate that a new like is added
                        "response_code" => 200 // Success
                    ];
                } else {
                    $response = [
                        "success" => false,
                        "message" => "Query failed: " . $addStmt->error,
                        "response_code" => 500 // Internal Server Error
                    ];
                }
                $addStmt->close();
            }
        } else {
            // If the user has liked the post, delete the like
            $deleteQuery = "DELETE FROM likes WHERE userID = ? AND postID = ?";
            $deleteStmt = $mysqli->prepare($deleteQuery);

            if ($deleteStmt === false) {
                $response = [
                    "success" => false,
                    "message" => "Error in SQL query preparation: " . $mysqli->error
                ];
            } else {
                $deleteStmt->bind_param("ii", $userId, $postId);
                if ($deleteStmt->execute()) {
                    $response = [
                        "success" => true,
                        "message" => "Deleted", // Indicate that the existing like is deleted
                        "response_code" => 200 // Success
                    ];
                } else {
                    $response = [
                        "success" => false,
                        "message" => "Query failed: " . $deleteStmt->error,
                        "response_code" => 500 // Internal Server Error
                    ];
                }
                $deleteStmt->close();
            }
        }

        $checkStmt->close();
    }
}

http_response_code($response["response_code"]); // Set the HTTP status code
header("Content-Type: application/json");
echo json_encode($response);

$mysqli->close();

?>
