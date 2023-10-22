<?php

session_start();

// Vérifier si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Valider et récupérer les données du formulaire
    if (filter_has_var(INPUT_POST, 'username')) {
        $username = htmlentities($_POST['username']);
    }

    if (filter_has_var(INPUT_POST, 'email')) {
        if (filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL) == FALSE) {
            echo 'Email not valid.';
            exit();
        }
        else {
            $email = htmlentities($_POST["email"]);
        }
    }

    if (filter_has_var(INPUT_POST, 'password')) {
        $password = password_hash($_POST["password"], PASSWORD_DEFAULT); // Hasher le mot de passe
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
            $_SESSION['username'] = $username;
            $_SESSION['email'] = $email;
            header("Location: index.php");
            $stmt->close();
            $mysqli->close();
            exit();
        } else {
            echo "Error while signin up. Try again." . $stmt->error;
        }

        // Fermer la connexion à la base de données
        $stmt->close();
        $mysqli->close();
    }
}

?>
