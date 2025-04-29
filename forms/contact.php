<?php
// Active les erreurs
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Définir que la réponse sera du JSON
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $subject = htmlspecialchars(trim($_POST['subject']));
    $message = htmlspecialchars(trim($_POST['message']));

    if (!empty($name) && !empty($email) && !empty($subject) && !empty($message)) {
        // Ici tu peux envoyer un vrai email plus tard

        // Répondre en JSON
        echo json_encode(["success" => true, "message" => "Merci $name ! Votre message a été reçu."]);
    } else {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Tous les champs sont requis."]);
    }

} else {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Méthode non autorisée."]);
}
?>
