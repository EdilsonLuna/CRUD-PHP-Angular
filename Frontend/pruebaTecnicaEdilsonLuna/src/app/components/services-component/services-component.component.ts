import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioDerivado } from '../../Classes/ServicioDerivado';
import { MasterServiceService } from '../../services/MasterService/master-service.service';

@Component({
  selector: 'app-services-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services-component.component.html',
  styleUrl: './services-component.component.scss'
})
export class ServicesComponentComponent implements OnInit {

  listaServiciosDerivados: ServicioDerivado[] = [];

  constructor(private masterService:MasterServiceService){

  }

  ngOnInit(): void {
    this.consultaServiciosDerivados();
  }

  consultaServiciosDerivados(){
    this.masterService.consultarServiciosDerivados().subscribe({
      next: data =>{
        console.log("Servicios Derivados encontrados: ");
        console.log(data);
        this.listaServiciosDerivados = data.listaResultado
      }
    });
  }

  modificarRegistro(id:string){
      alert('modificando : ' + id);
  }
}
