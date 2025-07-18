<?php
    Class DbConnection{
        static public function infoDb () : array{
            return array(
                "host" => "localhost",
                "port" => "5432",
                "dbname" => "pruebaTecnica",
                "user" => "postgres",
                "password" => "adminadmin",
            );
        }

        static public function crearConexion(){
            try {
                $pdo = new PDO("pgsql:host=".DbConnection::infoDb()["host"].";port=".DbConnection::infoDb()["port"].";dbname=".DbConnection::infoDb()["dbname"], DbConnection::infoDb()["user"], DbConnection::infoDb()["password"]);
                // Opcional: establecer modo de errores como excepciones
                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                return $pdo;
            } catch (PDOException $e) {
                echo "Error de conexión a la base de datos: " . $e->getMessage();
                return null;
            }
        } 
    }
?>