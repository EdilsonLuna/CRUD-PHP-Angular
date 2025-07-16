export class ServicioDerivado{
    id: string;
    idmaestro: string;
    puesto: string;
    fechainicio: string;
    fechafin: string;
    horainicio: string;
    horafin: string;
    activo: string;

    constructor(_id:string, _idMaestro:string, _puesto:string, _fechaInicio:string, _fechaFin:string, _horaInicio:string, _horaFin:string, _activo:string){
        this.id = _id;
        this.idmaestro = _idMaestro;
        this.puesto = _puesto;
        this.fechainicio = _fechaInicio;
        this.fechafin = _fechaFin;
        this.horainicio = _horaInicio;
        this.horafin = _horaFin;
        this.activo = _activo;
    }
}