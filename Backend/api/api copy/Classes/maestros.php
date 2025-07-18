<?php
    require_once "Database/dbController.php";

    class Maestros{
        public function consultaMaestros($idMaestro):array{
            $jsonRespuesta = array();
            try{
                $query = "";
                if($idMaestro != ""){
                    $query = "SELECT codigo, descripcion, arma, ciudad, activo, fechainicio AS fechaInicio, fechafin AS fechaFin FROM maestro WHERE codigo = :codigo";
                }else{
                    $query = "SELECT codigo, descripcion, arma, ciudad, activo, fechainicio AS fechaInicio, fechafin AS fechaFin FROM maestro";
                }
                
                $conn = DbConnection::crearConexion();
                $consulta = $conn->prepare($query);
                
                if($idMaestro != ""){$consulta->bindParam(':codigo',$idMaestro);}
                
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