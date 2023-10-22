<?php

session_start();

$_SESSION = array();

// Détruire la session
session_destroy();

// Rediriger vers la page d'accueil ou une autre page après la déconnexion
header("Location: index.php");
exit()

?>