<?php

require 'connect_db.php';

$response = [];

// Get the user ID from the request
$postID = $_GET['postId'];

if (!isset($postID)) {
    $response = [
        "success" => false,
        "message" => "Post ID not provided.",
        "response_code" => 400 // Bad Request
    ];
}
else {
    // Query the database to fetch user data based on $userId
    // Prepare a SQL query to retrieve the user's data by idusers
    $sql = "SELECT * FROM likes WHERE postID = ?";
    $stmt = $mysqli->prepare($sql);

    if ($stmt === false) {
        $response = [
            "success" => false,
            "message" => "Error in SQL query preparation: " . $mysqli->error,
            "response_code" => 500 // Internal Server Error
        ];
    }
    else {
        $stmt->bind_param("s", $postID);

        if (!$stmt->execute()) {
            $response = [
                "success" => false,
                "message" => "Error executing the query: " . $stmt->error,
                "response_code" => 500 // Internal Server Error
            ];
        } else {
            $result = $stmt->get_result();

            $response = [
                "success" => true,
                "response_code" => 200 // OK
            ];

            // Check if a user with the provided id was found
            $response['likes'] = [];
            if ($result->num_rows > 0) {
                $likesArray = [];
                while ($row = $result->fetch_assoc()) {
                    $likesArray[] = $row;
                }
                $response['likes'] = $likesArray;
            }
        }
    }
}

// Set the HTTP status code
http_response_code($response["response_code"]);
header("Content-Type: application/json");
echo json_encode($response);

$stmt->close();
$mysqli->close();

?>