<?php

require 'connect_db.php';

$response = [];

// Query the database to fetch user data based on $userId
// Prepare a SQL query to retrieve the user's data by idusers
$sql = "SELECT * FROM posts";
$stmt = $mysqli->prepare($sql);

if ($stmt === false) {
    $response = [
        "success" => false,
        "message" => "Error in SQL query preparation: " . $mysqli->error,
        "response_code" => 500 // Internal Server Error
    ];
}
else {
    if (!$stmt->execute()) {
        $response = [
            "success" => false,
            "message" => "Error executing the query: " . $stmt->error,
            "response_code" => 500 // Internal Server Error
        ];
    }
    else {
        $result = $stmt->get_result();

        $postsData = [];
        while ($row = $result->fetch_assoc()) {
            $postsData[] = $row;
        }

        foreach ($postsData as $key => $value) {
            $getLikeQuery = 'SELECT * FROM likes WHERE postID = ' . $value['idposts'];
            $getLikeQueryResult = $mysqli->query($getLikeQuery);
        
            $likesCount = 0;
        
            if ($getLikeQueryResult->num_rows > 0) {
                $likesCount = $getLikeQueryResult->num_rows;
            }
            $postsData[$key]['likes'] = $likesCount;
        }

        foreach ($postsData as $key => $value) {
            $getCommentQuery = 'SELECT * FROM comments WHERE postID = ' . $value['idposts'];
            $getCommentQueryResult = $mysqli->query($getCommentQuery);
        
            $commentsCount = 0;
        
            if ($getCommentQueryResult->num_rows > 0) {
                $commentsCount = $getCommentQueryResult->num_rows;
            }
            $postsData[$key]['comments'] = $commentsCount;
        }

        $response = [
            "success" => true,
            "response_code" => 200, // Success
            "postsData" => $postsData
        ];
    }
}

http_response_code($response["response_code"]); // Set the HTTP status code
header("Content-Type: application/json");
echo json_encode($response);

$stmt->close();
$mysqli->close();

?>
