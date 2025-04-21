<?php
$conn = new mysqli("localhost", "root", "", "weather_app");
if ($conn->connect_error) {
    die("Erreur de connexion : " . $conn->connect_error);
}
?>
