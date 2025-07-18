<?php
    require_once "Classes/services.php";
    require_once "Classes/maestros.php";

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");
    $method = $_SERVER['REQUEST_METHOD'];
    if($method == "OPTIONS") {
        die();
    }
    
    class Controller{
        public function handle_get_petitions(string $endpoint, array $urlParams) : array{
            $jsonRespuesta = array();
            switch($endpoint){
                case "/api/consultaMaestros":
                    $maestroService = new Maestros();
                    $idConsulta = "";
                    if(array_key_exists('idMaestro',$urlParams)){
                        $idConsulta = $urlParams["idServicio"];
                    }
                    $jsonRespuesta = $maestroService->consultaMaestros($idConsulta);
                    break;
                case "/api/consultaServiciosDerivados":
                    $services = new Services();
                    $idConsulta = "";
                    if(array_key_exists('idServicio',$urlParams)){
                        $idConsulta = $urlParams["idServicio"];
                    }
                    $jsonRespuesta = $services->consultarService($idConsulta);
                    break;
                default:
                    $jsonRespuesta = array(
                        "status" => 404,
                        "msgError" => "Ruta de consulta no encontrada."
                    );
                    break;
            }
            return $jsonRespuesta;
        }

        public function handle_post_petitions(string $endpoint, string $bodyParams) : array{
            $arraBodyJson = json_decode($bodyParams,true);
            $jsonRespuesta = array();
            switch($endpoint){
                case "/api/crearServicio":
                    $services = new Services();
                    $maestroServices = new Maestros();

                    #se valida que no exista previamente el registro
                    $arraResult = $services->consultarService($arraBodyJson["id"]);
                    $arraConsultaMaestro = $maestroServices->consultaMaestros($arraBodyJson["maestro"]);
                    if(count($arraResult["listaResultado"]) > 0){
                        $jsonRespuesta = array(
                            "status" => 400,
                            "msgError" => "Ya existe un servicio con este id"
                        );
                    }else if(count($arraConsultaMaestro["listaResultado"]) == 0){
                        $jsonRespuesta = array(
                            "status" => 400,
                            "msgError" => "No existe un maestro con este id"
                        );
                    }else{
                        $registroInsertado = $services->crearService($arraBodyJson);
                        if($registroInsertado){
                            $jsonRespuesta = array(
                                "status" => 200,
                                "msgError" => "Registro insertado correctamente."
                            );
                        }else{
                            $jsonRespuesta = array(
                                "status" => 500,
                                "msgError" => "Ocurrio un error insertando el registro. Intente nuevamente"
                            );
                        }
                    }
                    break;
                case "/api/actualizarServicio":
                    $services = new Services();
                    #se valida que exista previamente el registro
                    $arraResult = $services->consultarService($arraBodyJson["id"]);
                    if(count($arraResult) > 0){
                        $registroActualizado = $services->actualizarService($arraBodyJson);
                        if($registroActualizado){
                            $jsonRespuesta = array(
                                "status" => 200,
                                "msgError" => "Registro actualizado correctamente."
                            );
                        }else{
                            $jsonRespuesta = array(
                                "status" => 500,
                                "msgError" => "Ocurrio un error insertando el registro. Intente nuevamente"
                            );
                        }
                    }else{
                        $jsonRespuesta = array(
                            "status" => 400,
                            "msgError" => "No se ha encontrado el servicio especificado"
                        );
                    }
                    break;
                case "/api/cambiarEstadoServicio":
                    $services = new Services();
                    #se valida que exista previamente el registro
                    $arraResult = $services->consultarService($arraBodyJson["idServicio"]);
                    if(count($arraResult) > 0){
                        $registroActualizado = $services->cambiarEstadoService($arraBodyJson);
                        if($registroActualizado){
                            $jsonRespuesta = array(
                                "status" => 200,
                                "msgError" => "Registro actualizado correctamente."
                            );
                        }else{
                            $jsonRespuesta = array(
                                "status" => 500,
                                "msgError" => "Ocurrio un error insertando el registro. Intente nuevamente"
                            );
                        }
                    }else{
                        $jsonRespuesta = array(
                            "status" => 400,
                            "msgError" => "No se ha encontrado el servicio especificado"
                        );
                    }
                    break; 
                default:
                    $jsonRespuesta = array(
                        "status" => 404,
                        "msgError" => "Ruta de consulta no encontrada."
                    );
                    break;
            };
            return $jsonRespuesta;
        }
    }
?>