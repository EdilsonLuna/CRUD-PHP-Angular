<?php
    require "Database/dbController.php";
    class Services{
        public function crearService(array $jsonBody) : bool{
            try{
                $idServicio = $jsonBody["idServicio"]; 
                $idMaestro = $jsonBody["idMaestro"];
                $puesto = $jsonBody["puesto"];
                $fechaInicio = $jsonBody["fechaInicio"];
                $fechaFin = $jsonBody["fechaFin"];
                $horaInicio = $jsonBody["horaInicio"];
                $horaFin = $jsonBody["horaFin"];
                
                #creacion de consulta
                $query = "INSERT INTO servicio (idServicio,codigoMaestro_fk,puesto,fechaInicio,fechaFin,horaInicio,horaFin,activo) VALUES (:idServicio,:idMaestro,:puesto,:fechaInicio,:fechaFin,:horaInicio,:horaFin,'True')";
                $conn = DbConnection::crearConexion();
                $consulta = $conn->prepare($query);

                #reemplazo de variables
                $consulta->bindParam(":idServicio",$idServicio);
                $consulta->bindParam(":idMaestro",$idMaestro);
                $consulta->bindParam(":puesto",$puesto);
                $consulta->bindParam(":fechaInicio",$fechaInicio);
                $consulta->bindParam(":fechaFin",$fechaFin);
                $consulta->bindParam(":horaInicio",$horaInicio);
                $consulta->bindParam(":horaFin",$horaFin);
                
                return $consulta->execute();
            }catch(PDOException $e){
                echo $e->getMessage();
                return false;
            }
        }

        public function actualizarService(array $jsonBody) : bool{
            try{
                $idServicio = $jsonBody["idServicio"]; 
                $puesto = $jsonBody["puesto"];
                $fechaInicio = $jsonBody["fechaInicio"];
                $fechaFin = $jsonBody["fechaFin"];
                $horaInicio = $jsonBody["horaInicio"];
                $horaFin = $jsonBody["horaFin"];
                
                #creacion de consulta
                $query = "UPDATE servicio SET puesto = :puesto, fechaInicio = :fechaInicio, fechaFin = :fechaFin, horaInicio = :horaInicio, horaFin = :horaFin WHERE idservicio = :idServicio";
                $conn = DbConnection::crearConexion();
                $consulta = $conn->prepare($query);

                #reemplazo de variables
                $consulta->bindParam(":idServicio",$idServicio);
                $consulta->bindParam(":puesto",$puesto);
                $consulta->bindParam(":fechaInicio",$fechaInicio);
                $consulta->bindParam(":fechaFin",$fechaFin);
                $consulta->bindParam(":horaInicio",$horaInicio);
                $consulta->bindParam(":horaFin",$horaFin);
                
                return $consulta->execute();
            }catch(PDOException $e){
                echo $e->getMessage();
                return false;
            }
            return true;
        }

        public function consultarService(string $idServicio) : array {
            try{
                $query = "SELECT * FROM servicio WHERE idservicio = :idServicio";
                $conn = DbConnection::crearConexion();
                
                #preparacion consulta
                $consulta = $conn->prepare($query);
                $consulta->bindParam(":idServicio",$idServicio);

                #Consulta de datos
                $consulta->execute();
                $resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);

                return $resultado;
            }catch(PDOException $e){
                echo "Error consultando a base de datos: " . $e->getMessage();
                return array();
            }
        }

        public function cambiarEstadoService(array $jsonBody) : bool {
            try{
                $idServicio = $jsonBody["idServicio"];
                $estado = $jsonBody["estadoServicio"];

                $query = "UPDATE servicio SET activo = :estado  WHERE idservicio = :idServicio";
                $conn = DbConnection::crearConexion();
                
                #preparacion consulta
                $consulta = $conn->prepare($query);
                $consulta->bindParam(":idServicio",$idServicio);
                $consulta->bindParam(":estado",$estado);

                return $consulta->execute();
            }catch(PDOException $e){
                echo "Error consultando a base de datos: " . $e->getMessage();
                return false;
            }
        }
    }
?>