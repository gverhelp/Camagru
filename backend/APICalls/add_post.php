<?php

require 'connect_db.php';

$response = [];

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response = [
        "success" => false,
        "message" => "Invalid request method.",
        "response_code" => 405 // Method Not Allowed
    ];
} else {
    $userID = $_POST['userID'];
    $title = $_POST['title'];

    // Handle file upload
    if (isset($_FILES['newPost'])) {
        $file = $_FILES['newPost'];
        $fileName = $file['name'];

        // Create a unique name for the file (e.g., "50exemple")
        $uniqueFileName = generateUniqueFileName($fileName);

        // Set the destination path
        $destinationPath = "../usersPicturesImg/" . $uniqueFileName;

        // Move the file to the destination path
        if (move_uploaded_file($file['tmp_name'], $destinationPath)) {
            // Update the database with the file information
            $sql = "INSERT INTO posts (userID, title, URL) VALUES (?, ?, ?)";
            $stmt = $mysqli->prepare($sql);

            if ($stmt === false) {
                $response = [
                    "success" => false,
                    "message" => "Error in SQL query preparation: " . $mysqli->error,
                    "response_code" => 500 // Internal Server Error
                ];
            } else {
                $url = "../../backend/usersPicturesImg/" . $uniqueFileName; // Update with the actual URL format

                $stmt->bind_param("sss", $userID, $title, $url);

                if (!$stmt->execute()) {
                    $response = [
                        "success" => false,
                        "message" => "Error executing the query: " . $stmt->error,
                        "response_code" => 500 // Internal Server Error
                    ];
                } else {
                    $response = [
                        "success" => true,
                        "message" => "Post added successfully.",
                        "response_code" => 200 // OK
                    ];
                }
            }
        } else {
            $response = [
                "success" => false,
                "message" => "Error moving uploaded file.",
                "response_code" => 500 // Internal Server Error
            ];
        }
    } else {
        $response = [
            "success" => false,
            "message" => "New post file not provided.",
            "response_code" => 400 // Bad Request
        ];
    }
}

http_response_code($response["response_code"]); // Set the HTTP status code
header("Content-Type: application/json");
echo json_encode($response);

$stmt->close();
$mysqli->close();

function getImageCountFromDatabase() {
    require 'connect_db.php'; // Include your database connection code

    $sql = "SELECT COUNT(*) as imageCount FROM posts";
    $result = $mysqli->query($sql);

    if ($result) {
        $row = $result->fetch_assoc();
        return isset($row['imageCount']) ? (int)$row['imageCount'] : 0;
    } else {
        // Handle database query error
        return 0;
    }
}

function generateUniqueFileName($fileName) {
    // Assuming you have a function to get the current image count from the database
    $imageCount = getImageCountFromDatabase(); // Implement this function

    $uniqueFileName = ($imageCount + 1) . $fileName;
    return $uniqueFileName;
}

?>
