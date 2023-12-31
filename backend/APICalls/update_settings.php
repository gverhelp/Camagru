<?php

require 'connect_db.php';

$response = [];
$userID = $_POST['userID'];
$newUsername = $_POST['newUsername'];
$newEmail = $_POST['newEmail'];
$newPassword = $_POST['newPassword'];
$newBio = $_POST['newBio'];

// Vérifiez si au moins un champ est rempli
if (empty($newUsername) && empty($newEmail) && empty($newPassword) && empty($newBio) && empty($_FILES['newAvatar'])) {
    $response = [
        "success" => false,
        "message" => "Please fill in at least one field.",
        "response_code" => 200 // Success
    ];
} else {
    // Vérifiez l'unicité du nom d'utilisateur
    if (!empty($newUsername)) {
        $checkUsernameQuery = "SELECT * FROM `camagru_db`.`users` WHERE `username` = ?";
        $checkUsernameStmt = $mysqli->prepare($checkUsernameQuery);

        if ($checkUsernameStmt === false) {
            $response = [
                "success" => false,
                "message" => "Error in SQL query preparation: " . $mysqli->error,
                "response_code" => 500 // Internal Server Error
            ];
        } else {
            $checkUsernameStmt->bind_param("s", $newUsername);
            $checkUsernameStmt->execute();
            $checkUsernameResult = $checkUsernameStmt->get_result();

            if ($checkUsernameResult->num_rows > 0) {
                // Le nom d'utilisateur existe déjà
                $response = [
                    "success" => false,
                    "message" => "Username already exists. Please choose a different username.",
                    "response_code" => 200 // Success
                ];

                $checkUsernameStmt->close();
                $mysqli->close();
                http_response_code($response["response_code"]);
                header("Content-Type: application/json");
                echo json_encode($response);
                exit; // Arrêtez l'exécution du script
            }

            $checkUsernameStmt->close();
        }
    }

    // Vérifiez la validité du courriel
    if (!empty($newEmail)) {
        if (!filter_var($newEmail, FILTER_VALIDATE_EMAIL)) {
            // Le courriel n'est pas valide
            $response = [
                "success" => false,
                "message" => "Invalid email format.",
                "response_code" => 200 // Success
            ];

            $mysqli->close();
            http_response_code($response["response_code"]);
            header("Content-Type: application/json");
            echo json_encode($response);
            exit; // Arrêtez l'exécution du script
        }

        // Vérifiez l'unicité du courriel
        $checkEmailQuery = "SELECT * FROM `camagru_db`.`users` WHERE `email` = ?";
        $checkEmailStmt = $mysqli->prepare($checkEmailQuery);

        if ($checkEmailStmt === false) {
            $response = [
                "success" => false,
                "message" => "Error in SQL query preparation: " . $mysqli->error,
                "response_code" => 500 // Internal Server Error
            ];

            $mysqli->close();
            http_response_code($response["response_code"]);
            header("Content-Type: application/json");
            echo json_encode($response);
            exit; // Arrêtez l'exécution du script
        }

        $checkEmailStmt->bind_param("s", $newEmail);
        $checkEmailStmt->execute();
        $checkEmailResult = $checkEmailStmt->get_result();

        if ($checkEmailResult->num_rows > 0) {
            // Le courriel existe déjà
            $response = [
                "success" => false,
                "message" => "Email already exists. Please choose a different email.",
                "response_code" => 200 // Success
            ];

            $checkEmailStmt->close();
            $mysqli->close();
            http_response_code($response["response_code"]);
            header("Content-Type: application/json");
            echo json_encode($response);
            exit; // Arrêtez l'exécution du script
        }

        $checkEmailStmt->close();
    }

    // Continuez avec la mise à jour des champs
    $query = "UPDATE `camagru_db`.`users` SET ";
    $params = [];
    $types = "";

    if (!empty($newUsername)) {
        $query .= "`username` = ?, ";
        $params[] = $newUsername;
        $types .= "s";
    }

    if (!empty($newEmail)) {
        $query .= "`email` = ?, ";
        $params[] = $newEmail;
        $types .= "s";
    }

    if (!empty($newPassword)) {
        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
        $query .= "`password` = ?, ";
        $params[] = $hashedPassword;
        $types .= "s";
    }

    if (!empty($_FILES['newAvatar']['name'])) {
        // Récupérer le nom du fichier
        $avatarFileName = $_FILES['newAvatar']['name'];
        // Construire le chemin du répertoire de destination
        $destinationPath = "../usersAvatarImg/" . $userID . $avatarFileName;

        // Déplacer le fichier téléchargé vers le répertoire de destination
        if (move_uploaded_file($_FILES['newAvatar']['tmp_name'], $destinationPath)) {
            // Ajouter le champ à la requête
            $query .= "`avatarURL` = ?, ";
            $params[] = "../../backend/usersAvatarImg/" . $userID . $avatarFileName; // Utilisez le chemin complet du fichier
            $types .= "s";
        } else {
            // Échec du déplacement du fichier
            $response = [
                "success" => false,
                "message" => "Failed to move the uploaded avatar image.",
                "response_code" => 500 // Internal Server Error
            ];

            http_response_code($response["response_code"]);
            header("Content-Type: application/json");
            echo json_encode($response);
            exit;
        }
    }

    if (!empty($newBio)) {
        $query .= "`bio` = ?, ";
        $params[] = $newBio;
        $types .= "s";
    }

    // Supprimez la virgule finale et ajoutez la condition WHERE
    $query = rtrim($query, ", ") . " WHERE (`idusers` = ?)";
    $params[] = $userID;
    $types .= "s";

    $stmt = $mysqli->prepare($query);

    if ($stmt === false) {
        $response = [
            "success" => false,
            "message" => "Error in SQL query preparation: " . $mysqli->error,
            "response_code" => 500 // Internal Server Error
        ];
    } else {
        // Ajoutez les types de paramètres à la fonction bind_param
        $stmt->bind_param($types, ...$params);

        if (!$stmt->execute()) {
            $response = [
                "success" => false,
                "message" => "Error executing the query: " . $stmt->error,
                "response_code" => 500 // Internal Server Error
            ];
        } else {
            $response = [
                "success" => true,
                "message" => "Settings updated.",
                "response_code" => 200 // Success
            ];
        }

        $stmt->close();
    }
}

http_response_code($response["response_code"]); // Set the HTTP status code
header("Content-Type: application/json");
echo json_encode($response);

$mysqli->close();

?>

