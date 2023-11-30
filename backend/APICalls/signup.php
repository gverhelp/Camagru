<?php

require 'connect_db.php';

$response = [];
$avatarURL = "../static/img/profile-outlined.svg";
$theme = 0;

session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (empty($_POST['username'])) {
        $response = [
            "success" => false,
            "message" => "Username is required.",
            "response_code" => 200 // Success
        ];
    } elseif (empty($_POST['email'])) {
        $response = [
            "success" => false,
            "message" => "Email is required.",
            "response_code" => 200 // Success
        ];
    } elseif (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        $response = [
            "success" => false,
            "message" => "Email format not valid.",
            "response_code" => 200 // Success
        ];
    } elseif (empty($_POST['password'])) {
        $response = [
            "success" => false,
            "message" => "Password is required.",
            "response_code" => 200 // Success
        ];
    } elseif (strlen($_POST['password']) < 6 || !preg_match('/[A-Z]/', $_POST['password'])) {
        $response = [
            "success" => false,
            "message" => "Password should be at least 6 characters long and contain at least one capital letter.",
            "response_code" => 200 // Success
        ];
    } else {
        $username = verify_input($_POST['username']);
        $email = verify_input($_POST["email"]);
        $password = password_hash($_POST["password"], PASSWORD_DEFAULT); // Hash the password

        // Check the uniqueness of the username and email
        $sql_username_check = "SELECT idusers FROM users WHERE username = ?";
        $stmt_username_check = $mysqli->prepare($sql_username_check);
        $stmt_username_check->bind_param("s", $username);
        $stmt_username_check->execute();
        $stmt_username_check->store_result();

        $sql_email_check = "SELECT idusers FROM users WHERE email = ?";
        $stmt_email_check = $mysqli->prepare($sql_email_check);
        $stmt_email_check->bind_param("s", $email);
        $stmt_email_check->execute();
        $stmt_email_check->store_result();

        if ($stmt_username_check->num_rows > 0) {
            $response = [
                "success" => false,
                "message" => "Username already taken.",
                "response_code" => 200 // Success
            ];
        } elseif ($stmt_email_check->num_rows > 0) {
            $response = [
                "success" => false,
                "message" => "Email address already taken.",
                "response_code" => 200 // Success
            ];
        } else {
            $query = "INSERT INTO users (username, email, password, avatarURL, theme) VALUES (?, ?, ?, ?, ?)";
            $stmt = $mysqli->prepare($query);
            $stmt->bind_param("ssssi", $username, $email, $password, $avatarURL, $theme);

            if ($stmt->execute()) {
                $get_user = "SELECT * FROM users WHERE username = ?";
                $get_user_prep = $mysqli->prepare($get_user);
                $get_user_prep->bind_param("s", $username);
                $get_user_prep->execute();
                $result = $get_user_prep->get_result();

                $row = $result->fetch_assoc();
                $_SESSION['id'] = $row['idusers'];

                $response = [
                    "success" => true,
                    "response_code" => 200 // Success
                ];
            } else {
                $response = [
                    "success" => false,
                    "message" => "Error while signing up." . $stmt->error,
                    "response_code" => 500 // Internal Server Error
                ];
            }
            $stmt->close();
            $mysqli->close();
        }
    }
} else {
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
