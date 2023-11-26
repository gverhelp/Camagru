<?php

require 'connect_db.php';

$response = [];

// Get the post ID from the request
$postID = $_GET['postID'];

if (!isset($postID)) {
    $response = [
        "success" => false,
        "message" => "Post ID not provided.",
        "response_code" => 400 // Bad Request
    ];
} else {
    // Query the database to fetch post data based on $postID
    $postSql = "SELECT * FROM posts WHERE idposts = ?";
    $postStmt = $mysqli->prepare($postSql);

    if ($postStmt === false) {
        $response = [
            "success" => false,
            "message" => "Error in SQL query preparation: " . $mysqli->error,
            "response_code" => 500 // Internal Server Error
        ];
    } else {
        $postStmt->bind_param("s", $postID);

        if (!$postStmt->execute()) {
            $response = [
                "success" => false,
                "message" => "Error executing the post query: " . $postStmt->error,
                "response_code" => 500 // Internal Server Error
            ];
        } else {
            $postResult = $postStmt->get_result();
            $postRow = $postResult->fetch_assoc();

            if (!$postRow) {
                $response = [
                    "success" => false,
                    "message" => "Post not found with ID: $postID",
                    "response_code" => 404 // Not Found
                ];
            } else {
                // Fetch user data based on userID from the post
                $userID = $postRow['userID'];
                $userSql = "SELECT username, avatarURL FROM users WHERE idusers = ?";
                $userStmt = $mysqli->prepare($userSql);

                if ($userStmt === false) {
                    $response = [
                        "success" => false,
                        "message" => "Error in user SQL query preparation: " . $mysqli->error,
                        "response_code" => 500 // Internal Server Error
                    ];
                } else {
                    $userStmt->bind_param("s", $userID);

                    if (!$userStmt->execute()) {
                        $response = [
                            "success" => false,
                            "message" => "Error executing the user query: " . $userStmt->error,
                            "response_code" => 500 // Internal Server Error
                        ];
                    } else {
                        $userResult = $userStmt->get_result();
                        $userRow = $userResult->fetch_assoc();

                        if (!$userRow) {
                            $response = [
                                "success" => false,
                                "message" => "User not found with ID: $userID",
                                "response_code" => 404 // Not Found
                            ];
                        } else {
                            // Fetch comments based on postID
                            $commentSql = "SELECT text, userID FROM comments WHERE postID = ?";
                            $commentStmt = $mysqli->prepare($commentSql);

                            if ($commentStmt === false) {
                                $response = [
                                    "success" => false,
                                    "message" => "Error in comment SQL query preparation: " . $mysqli->error,
                                    "response_code" => 500 // Internal Server Error
                                ];
                            } else {
                                $commentStmt->bind_param("s", $postID);

                                if (!$commentStmt->execute()) {
                                    $response = [
                                        "success" => false,
                                        "message" => "Error executing the comment query: " . $commentStmt->error,
                                        "response_code" => 500 // Internal Server Error
                                    ];
                                } else {
                                    $commentResult = $commentStmt->get_result();
                                    $comments = $commentResult->fetch_all(MYSQLI_ASSOC);

                                    // Fetch user data for each comment
                                    foreach ($comments as &$comment) {
                                        $commentUserID = $comment['userID'];
                                        $commentUserSql = "SELECT username, avatarURL FROM users WHERE idusers = ?";
                                        $commentUserStmt = $mysqli->prepare($commentUserSql);

                                        if ($commentUserStmt === false) {
                                            $response = [
                                                "success" => false,
                                                "message" => "Error in comment user SQL query preparation: " . $mysqli->error,
                                                "response_code" => 500 // Internal Server Error
                                            ];
                                        } else {
                                            $commentUserStmt->bind_param("s", $commentUserID);

                                            if (!$commentUserStmt->execute()) {
                                                $response = [
                                                    "success" => false,
                                                    "message" => "Error executing the comment user query: " . $commentUserStmt->error,
                                                    "response_code" => 500 // Internal Server Error
                                                ];
                                            } else {
                                                $commentUserResult = $commentUserStmt->get_result();
                                                $commentUserRow = $commentUserResult->fetch_assoc();

                                                if ($commentUserRow) {
                                                    $comment['userData'] = $commentUserRow;
                                                }
                                            }
                                            $commentUserStmt->close();
                                        }
                                    }

                                    // Include post, user, and comments data in the response
                                    $response = [
                                        "success" => true,
                                        "postData" => $postRow,
                                        "userData" => $userRow,
                                        "commentsData" => $comments,
                                        "response_code" => 200 // OK
                                    ];
                                }
                            }
                            $commentStmt->close();
                        }
                    }
                    $userStmt->close();
                }
            }
        }
    }
    $postStmt->close();
}

// Set the HTTP status code
http_response_code($response["response_code"]);
header("Content-Type: application/json");
echo json_encode($response);

$mysqli->close();

?>
