<?php

require 'connect_db.php';

$response = [];

session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (empty($_POST['username'])) {
        $response = [
            "success" => false,
            "message" => "Username is required.",
            "response_code" => 200 // Success
        ];
    }
    elseif (empty($_POST['password'])) {
        $response = [
            "success" => false,
            "message" => "Password is required.",
            "response_code" => 200 // Success
        ];
    }
    else {
        $username = verify_input($_POST['username']);
        $password = $_POST['password'];

        $sql = "SELECT * FROM users WHERE username = ?";
        $stmt = $mysqli->prepare($sql);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows != 1) {
            $response = [
                "success" => false,
                "message" => "User not found. Please check your username.",
                "response_code" => 200 // Success
            ];
        }
        else {
            $row = $result->fetch_assoc();

            if (password_verify($password, $row['password'])) {
                $_SESSION['id'] = $row['idusers'];
                
                $response = [
                    "success" => true,
                    "response_code" => 200 // Success
                ];
            } else {
                $response = [
                    "success" => false,
                    "message" => "Invalid password. Please try again.",
                    "response_code" => 200 // Success
                ];
            } 
        }
        $stmt->close();
        $mysqli->close();
    }
}
else {
    $response = [
        "success" => false,
        "message" => "Method not supported.",
        "response_code" => 405 // Method Not Allowed
    ];
}

http_response_code($response["response_code"]); // Set the HTTP status code
header("Content-Type: application/json");
echo json_encode($response);

function verify_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

?>
