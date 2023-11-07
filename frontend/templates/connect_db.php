<?php

$env = parse_ini_file('../../.env'); // change later
$mysqli = new mysqli($env["HOSTNAME"], $env["MYSQL_USERNAME"], $env["MYSQL_PASSWORD"], $env["DATABASE"]);

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

?>