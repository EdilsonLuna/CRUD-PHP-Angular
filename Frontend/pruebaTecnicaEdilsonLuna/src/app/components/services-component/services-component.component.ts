import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioDerivado } from '../../Classes/ServicioDerivado';
import { MasterServiceService } from '../../services/MasterService/master-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services-component.component.html',
  styleUrl: './services-component.component.scss'
})
export class ServicesComponentComponent implements OnInit {

  listaServiciosDerivados: ServicioDerivado[] = [];

  constructor(private masterService:MasterServiceService, private route:Router){

  }

  ngOnInit(): void {
    this.consultaServiciosDerivados();
  }

  consultaServiciosDerivados(){
    this.masterService.consultarServiciosDerivados("").subscribe({
      next: data =>{
        this.listaServiciosDerivados = data.listaResultado
      }
    });
  }

  modificarRegistro(id:string){
    this.irInfoServicio(false,id);
  }

  confirmaDesactivarServicio(idServicioDerivado:string){
    console.log(idServicioDerivado);
    if(confirm('Esta seguro que quiere desactivar el Servicio Derivado: '+ idServicioDerivado + "?")){
      this.desactivarServicioDerivado(idServicioDerivado);
    }
  }

  desactivarServicioDerivado(idServicioDerivado:string){
    this.masterService.cambiarEstadoServicioDerivado(idServicioDerivado,'False').subscribe({
      next : data =>{
        if(data.status == "200"){
          alert("Se ha desactivado el servicio correctamente");
          this.listaServiciosDerivados = [];
          this.consultaServiciosDerivados();
        }
      },
      error : error =>{
        alert("Ha ocurrido un error desactivando el registro. Intente nuevamente");
        console.log(error);
      }
    })
  }

  confirmarActivarServicioDerivado(idServicioDerivado:string){
    if(confirm("Esta seguro que quiere activar el servicio: " + idServicioDerivado + "?")){
      this.activarServicioDerivado(idServicioDerivado);
    }
  }

  activarServicioDerivado(idServicioDerivado:string){
    this.masterService.cambiarEstadoServicioDerivado(idServicioDerivado,'True').subscribe({
      next : data =>{
        if(data.status == "200"){
          alert("Se ha activado el servicio correctamente");
          this.listaServiciosDerivados = [];
          this.consultaServiciosDerivados();
        }
      },
      error : error =>{
        alert("Ha ocurrido un error desactivando el registro. Intente nuevamente");
        console.log(error);
      }
    })
  }

  irInfoServicio(flagNuevo:boolean,idServicioDerivado:string){
    if(flagNuevo){
      this.route.navigate(['/nuevoServicio'], {queryParams: {modo : "nuevo"}});
    }else{
      this.route.navigate(['/infoServicio'], {queryParams: {modo: "consulta" , idServicioDerivado: idServicioDerivado}});
    }
  }

}
