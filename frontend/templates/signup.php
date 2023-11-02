<?php

$usernameErr = $emailErr = $passwordErr = "";

session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (filter_has_var(INPUT_POST, 'username') == FALSE || filter_has_var(INPUT_POST, 'email') == FALSE || filter_has_var(INPUT_POST, 'password') == FALSE) {
        echo "Method not supported.";
        exit();
    }

    if (!empty($_POST['username'])) {
        $username = verify_input($_POST['username']);
    } else {
        $usernameErr =  "Username is required.";
        exit();
    }

    if (!empty($_POST['email'])) {
        $email = verify_input($_POST["email"]);
        if (filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL) == FALSE) {
            $emailErr = "Email format not valid.";
            exit();
        }
    } else {
        $emailErr =  "Email is required.";
        exit();
    }

    if (!empty($_POST['password'])) {
        $password = password_hash($_POST["password"], PASSWORD_DEFAULT); // Hasher le mot de passe
    } else {
        $passwordErr =  "Password is required.";
        exit();
    }

    // Connexion à la base de données
    $env = parse_ini_file('../../.env'); // change later
    $mysqli = new mysqli($env["HOSTNAME"], $env["MYSQL_USERNAME"], $env["MYSQL_PASSWORD"], $env["DATABASE"]);

    if ($mysqli->connect_error) {
        die("Connection to database failed: " . $mysqli->connect_error);
    }

    // Vérifier l'unicité de l'username et de l'email
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
        echo "Username already taken.";
    } elseif ($stmt_email_check->num_rows > 0) {
        echo "Email adress already taken.";
    } else {
        // Préparer la requête SQL
        $query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        
        // Utiliser une requête préparée pour éviter les injections SQL
        $stmt = $mysqli->prepare($query);
        $stmt->bind_param("sss", $username, $email, $password);

        // Exécuter la requête
        if ($stmt->execute()) {
            $get_user = "SELECT * FROM users WHERE username = ?";
            $get_user_prep = $mysqli->prepare($get_user);
            $get_user_prep->bind_param("s", $username);
            $get_user_prep->execute();
            $result = $get_user_prep->get_result();

            $row = $result->fetch_assoc();
            $_SESSION['id'] = $row['idusers'];

            header("Location: index.php");
        } else {
            echo "Error while signin up. Try again." . $stmt->error;
        }

        // Fermer la connexion à la base de données
        $stmt->close();
        $mysqli->close();
    }
}

function verify_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

?>
