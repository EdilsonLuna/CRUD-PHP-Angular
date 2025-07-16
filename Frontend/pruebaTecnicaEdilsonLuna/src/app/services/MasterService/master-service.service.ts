import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { get } from 'http';
import { Observable } from 'rxjs';
import { consultaMaestro } from '../../Classes/SolicitudesHttp';
import { ServicioDerivado } from '../../Classes/ServicioDerivado';

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

  consultarServiciosDerivados():Observable<consultaMaestro>{
    return this.httpClient.get<consultaMaestro>(this.urlConsulta + "/consultaServiciosDerivados");
  }
}
