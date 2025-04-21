<?php
// Connexion à la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "weather_app";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérification de la connexion
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Récupérer les données envoyées en JSON
$data = json_decode(file_get_contents('php://input'), true);

// Vérifier si les données sont présentes
if (isset($data['city'], $data['temperature'], $data['humidity'], $data['description'], $data['date'])) {
    // Préparer la requête d'insertion avec des requêtes préparées pour éviter les injections SQL
    $stmt = $conn->prepare("INSERT INTO weather_data (city, temperature, humidity, description, date_recorded) 
                            VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sdiis", $city, $temperature, $humidity, $description, $date_recorded);

    $city = $data['city'];
    $temperature = $data['temperature'];
    $humidity = $data['humidity'];
    $description = $data['description'];
    $date_recorded = $data['date'];  // Utilisation de la date envoyée par le JavaScript

    // Exécuter la requête
    if ($stmt->execute()) {
        echo "Données enregistrées avec succès.";
    } else {
        echo "Erreur: " . $stmt->error;
    }

    // Fermer la déclaration et la connexion
    $stmt->close();
} else {
    echo "Données manquantes.";
}

$conn->close();
?>
