import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterServiceService } from '../../services/MasterService/master-service.service';
import { error } from 'console';
import { Maestro } from '../../Classes/Maestro';

@Component({
  selector: 'app-master-services-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './master-services-component.component.html',
  styleUrl: './master-services-component.component.scss'
})
export class MasterServicesComponentComponent implements OnInit{
  
  listaMaestros: Maestro[] = [];

  constructor(private masterServiceService: MasterServiceService){

  }

  ngOnInit(): void {
    this.consultarListaMaestros();
  }

  consultarListaMaestros(){
    this.masterServiceService.consultarMaestros().subscribe({
      next : data =>{
        this.listaMaestros = data.listaResultado;
      },
      error: error => {
        console.log(error);
      },
      complete : () =>{
      }
    })
  }
  


}
