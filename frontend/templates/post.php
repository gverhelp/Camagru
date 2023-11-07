<?php

require 'connect_db.php';

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