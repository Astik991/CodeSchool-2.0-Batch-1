<?php
    define("DB_HOST", "localhost");
    define("DB_PORT", "5432");
    define("DB_NAME", "employee_managment_system");
    define("DB_USERNAME", "postgres");
    define("DB_PASSWORD", "postgres");
    
    // DB CONNECTION.
    function getPDO()
    {
        $pdo = new PDO("pgsql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";user=" . DB_USERNAME . ";password=" . DB_PASSWORD);
        return $pdo;
    }
?>