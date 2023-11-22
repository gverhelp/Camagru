<?php

require 'connect_db.php';

$response = [];

// Get the user ID from the request
$postID = $_GET['postID'];

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
    $sql = "SELECT * FROM posts WHERE idposts = ?";
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
            $row = $result->fetch_assoc();
            $response = [
                "success" => true,
                "postURL" => $row['URL'],
                "response_code" => 200 // OK
            ];
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