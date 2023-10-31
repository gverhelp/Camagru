<?php

$env = parse_ini_file('../../.env'); // change later
$mysqli = new mysqli($env["HOSTNAME"], $env["MYSQL_USERNAME"], $env["MYSQL_PASSWORD"], $env["DATABASE"]);

if ($mysqli->connect_error) {
    die("Connection to database failed: " . $mysqli->connect_error);
}

if (isset($_GET['id'])) {
    $query = "SELECT * FROM posts WHERE userID = id";
    $query_prep = $mysqli->prepare($query);
    $query_prep->execute();
    $query_result = $query_prep->store_result();
    header("Content-type:application/json");
    header("HTTP/1.1 200 OK");

    $jsonstring = json_encode($query_result);
    echo $jsonstring;
}
$mysqli->close();

?>