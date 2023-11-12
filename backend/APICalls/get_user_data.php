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
    $sql = "SELECT * FROM users WHERE idusers = ?";
    $stmt = $mysqli->prepare($sql);

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
            if ($result->num_rows != 1) {
                $response = [
                    "success" => false,
                    "message" => "User not found.",
                    "response_code" => 404 // Not Found
                ];
            } else {
                $row = $result->fetch_assoc();
                $response = [
                    "success" => true,
                    "userData" =>   array(
                                        "username" => $row['username'],
                                        "email" => $row['email'],
                                        "avatarURL" => $row['avatarURL'],
                                        "theme" => $row['theme'],
                                        "bio" => $row['bio']
                                    ),
                    "response_code" => 200 // OK
                ];
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
