<?php

$usernameErr = $emailErr = $passwordErr = "";

session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (filter_has_var(INPUT_POST, 'username') == FALSE || filter_has_var(INPUT_POST, 'password') == FALSE) {
        echo "Method not supported.";
    }

    if (!empty($_POST['username'])) {
        $username = verify_input($_POST['username']);
    } else {
        $usernameErr =  "Username is required.";
        exit();
    }

    if (!empty($_POST['password'])) {
        // $password = password_hash($_POST["password"], PASSWORD_DEFAULT); // Hasher le mot de passe ?
        $password = $_POST['password'];
    } else {
        $passwordErr =  "Password is required.";
        exit();
    }

    // Connect to your database (modify the connection details as needed)
    $env = parse_ini_file('../../.env'); // change later
    $mysqli = new mysqli($env["HOSTNAME"], $env["MYSQL_USERNAME"], $env["MYSQL_PASSWORD"], $env["DATABASE"]);

    if ($mysqli->connect_error) {
        die("Connection failed: " . $mysqli->connect_error);
    }

    // Prepare a SQL query to retrieve the user's data by username
    $sql = "SELECT * FROM users WHERE username = ?";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if a user with the provided username was found
    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();

        // Verify the submitted password with the stored hashed password
        if (password_verify($password, $row['password'])) {
            // Passwords match - user is authenticated
            // Store user information in session
            $_SESSION['id'] = $row['idusers'];
            
            header("Location: index.php");
            $stmt->close();
            $mysqli->close();
            exit();
        } else {
            echo "Invalid password. Please try again.";
        }
    } else {
        echo "User not found. Please check your username.";
    }

    // Close the database connection
    $stmt->close();
    $mysqli->close();
}

function verify_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

?>