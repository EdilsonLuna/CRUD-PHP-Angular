import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { get } from 'http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterServiceService {

  constructor(private httpClient: HttpClient) {

  }

  consultaMaestros<T>(): Observable<T>{
    let urlConsulta:string = "pruebaTecnicaEdilsonLuna.com/api/consultarMaestro";
    return this.httpClient.get<T>(urlConsulta);
  }
}
