
<?php
session_start();
if (!isset($_SESSION['session_token'])) {
    http_response_code(500);
    $response["status"] = false;
    $response["message"] = "*session expired";
    echo json_encode($response);
    exit;
}
