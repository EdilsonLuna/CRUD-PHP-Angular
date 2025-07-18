import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { consultaMaestro } from '../../Classes/SolicitudesHttp';

@Injectable({
  providedIn: 'root'
})
export class MasterServiceService {
  urlConsulta:string = "http://pruebaTecnicaEdilsonLuna.com/api";
  constructor(private httpClient: HttpClient) {

  }

  consultarMaestros():Observable<consultaMaestro>{
    return this.httpClient.get<consultaMaestro>(this.urlConsulta + "/consultaMaestros");
  }

  consultarServiciosDerivados(idServicioDerivado:string):Observable<consultaMaestro>{
    let params = new HttpParams({});
    if(idServicioDerivado != ""){
      params = new HttpParams()
        .set('idServicio', idServicioDerivado)
    }
    return this.httpClient.get<consultaMaestro>(this.urlConsulta + "/consultaServiciosDerivados",{params});
  }

  cambiarEstadoServicioDerivado(idServicio:string, estadoServicio: string):Observable<any>{
    let bodyRequest = {
      "idServicio" : idServicio,
      "estadoServicio" : estadoServicio,
    };
    return this.httpClient.post<any>(this.urlConsulta + "/cambiarEstadoServicio", JSON.stringify(bodyRequest));
  }

  guardarServicioDerivado(jsonBody:string):Observable<any>{
    return this.httpClient.post(this.urlConsulta + "/crearServicio",jsonBody);
  }

  actualizarServicioDerivado(jsonBody:string):Observable<any>{
    return this.httpClient.post(this.urlConsulta + "/actualizarServicio",jsonBody);
  }
}
