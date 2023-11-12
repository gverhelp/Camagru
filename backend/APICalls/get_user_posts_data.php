<?php

require 'connect_db.php';

$response = [];

// Get the user ID from the request
$userId = $_GET['userId'];

if (!isset($userId)) {
    $response = [
        "success" => false,
        "message" => "User ID not provided.",
        "response_code" => 400 // Bad Request
    ];
}
else {
    // Query the database to fetch user data based on $userId
    // Prepare a SQL query to retrieve the user's data by idusers
    $query = "SELECT * FROM posts WHERE userID = ?";
    $stmt = $mysqli->prepare($query);

    if ($stmt === false) {
        $response = [
            "success" => false,
            "message" => "Error in SQL query preparation: " . $mysqli->error,
            "response_code" => 500 // Internal Server Error
        ];
    }
    else {
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
            if ($result->num_rows < 1) {
                $response = [
                    "success" => false,
                    "message" => "User not found.",
                    "response_code" => 200 // Success
                ];
            } else {
                $ret = [];
                while ($row = $result->fetch_assoc()) {
                    $ret[] = $row;
                }

                foreach ($ret as $key => $value) {
                    $getLikeQuery = 'SELECT * FROM likes WHERE postID = ' . $value['idposts'];
                    $getLikeQueryResult = $mysqli->query($getLikeQuery);
                
                    if ($getLikeQueryResult->num_rows > 0) {
                        while ($row = $getLikeQueryResult->fetch_assoc()) {
                            $ret[$key]['likes'] = [$row];
                        }
                    } else {
                        $ret[$key]['likes'] = [];
                    }
                }

                foreach ($ret as $key => $value) {
                    $getCommentQuery = 'SELECT * FROM comments WHERE postID = ' . $value['idposts'];
                    $getCommentQueryResult = $mysqli->query($getCommentQuery);
                
                    if ($getCommentQueryResult->num_rows > 0) {
                        while ($row = $getCommentQueryResult->fetch_assoc()) {
                            $ret[$key]['comments'] = [$row];
                        }
                    } else {
                        $ret[$key]['comments'] = [];
                    }
                }

                $response = [
                    "success" => true,
                    "userPostsData" => $ret,
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
