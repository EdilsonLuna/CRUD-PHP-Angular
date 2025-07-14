<?php
    require "Controllers/api_controllers.php";

    Class RoutesController{
        public function iniciarServidor(){
            $metodoConsulta = $_SERVER["REQUEST_METHOD"];
            $endpoint = parse_url($_SERVER["REQUEST_URI"],PHP_URL_PATH);
            $urlParams = array();
            $bodyParams = "";
            $jsonRespuesta = array();
            $apiController = new Controller();

            if($metodoConsulta == "GET")
            {
                $urlParams = $_GET;
                $jsonRespuesta = $apiController->handle_get_petitions($endpoint,$urlParams);
            }
            elseif ($metodoConsulta == "POST")
            {
                $bodyParams = file_get_contents("php://input",true);
                $jsonRespuesta = $apiController->handle_post_petitions($endpoint,$bodyParams);
            }
            else
            {
                $jsonRespuesta = array(
                    "status" => "400",
                    "msgError" => "Metodo no soportado"
                );
            }

            echo json_encode($jsonRespuesta, http_response_code($jsonRespuesta["status"]));
        }
    }
?>