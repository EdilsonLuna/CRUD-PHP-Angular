export class Maestro{
    codigo:string;
    descripcion:string;
    arma:string;
    ciudad:string;
    activo:string;
    fechainicio:string;
    fechafin:string;
    
    constructor(_codigo:string,_descripcion:string,_arma:string,_ciudad:string,_activo:string,_fechaInicio:string,_fechaFin:string){
        this.codigo = _codigo;
        this.descripcion = _descripcion;
        this.arma = _arma;
        this.ciudad = _ciudad;
        this.activo = _activo;
        this.fechainicio = _fechaInicio;
        this.fechafin = _fechaFin;
    }
}