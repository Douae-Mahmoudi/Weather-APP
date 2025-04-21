<?php
include 'db.php';

$res = $conn->query("SELECT * FROM weather_data ORDER BY date_recorded DESC LIMIT 5");

while ($row = $res->fetch_assoc()) {
    echo "<p><strong>{$row['city']}</strong> - {$row['temperature']}°C - {$row['humidity']}% - {$row['description']} ({$row['date_recorded']})</p>";
}
?>
