<?php
    require_once "Database/dbController.php";

    class Maestros{
        public function consultaMaestros():array{
            $jsonRespuesta = array();
            try{
                $query = "SELECT codigo, descripcion, arma, ciudad, activo, fechainicio AS fechaInicio, fechafin AS fechaFin FROM maestro";
                $conn = DbConnection::crearConexion();
                
                $consulta = $conn->prepare($query);
                $consulta->execute();
                $resultadosConsulta = $consulta->fetchAll(PDO::FETCH_ASSOC);
                $jsonRespuesta = array(
                    "status" => 200,
                    "listaResultado" => $resultadosConsulta
                );
                return $jsonRespuesta;
            }catch(Exception $e){
                echo "error ocurrido durante la consulta: ";
                echo $e;
                return array();
            }
        }
    }
?>