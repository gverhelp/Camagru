<?php

require 'connect_db.php';

$response = [];

// Get the user ID from the request
$userId = $_GET['userId'];

if (!isset($userId)) {
    $response = [
        "success" => false,
        "message" => "User ID not provided."
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
            "message" => "Error in SQL query preparation: " . $mysqli->error
        ];
    }
    else {
        $stmt->bind_param("s", $userId);

        if (!$stmt->execute()) {
            $response = [
                "success" => false,
                "message" => "Error executing the query: " . $stmt->error
            ];
        }
        else {
            $result = $stmt->get_result();

            // Check if a user with the provided id was found
            if ($result->num_rows != 1) {
                $response = [
                    "success" => false,
                    "message" => "User not found."
                ];
            } else {
                $row = $result->fetch_assoc();
                $response = [
                    "success" => true,
                    "theme" =>  $row['theme']
                ];
            }
        }
    }
}

http_response_code(200); // Set the HTTP status code
header("Content-Type: application/json");
echo json_encode($response);

$stmt->close();
$mysqli->close();

?>