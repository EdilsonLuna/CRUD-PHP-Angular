import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MasterServiceService } from '../../services/MasterService/master-service.service';
import { ServicioDerivado } from '../../Classes/ServicioDerivado';

@Component({
  selector: 'app-info-service',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './info-service.component.html',
  styleUrl: './info-service.component.scss'
})
export class InfoServiceComponent implements OnInit{
  flagNuevo:boolean = true;
  idConsultaServicio:string = "";
  Servicio:ServicioDerivado | null = null;

  //FormularioDinamico
  formServicio!: FormGroup;

  constructor(private activatedRoute:ActivatedRoute, private formBuilder:FormBuilder, private router:Router, private masterServiceService:MasterServiceService){
    this.formServicio = this.formBuilder.group({
      id: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(9)]],
      maestro: ['', [Validators.required, Validators.minLength(1),Validators.maxLength(7)]],
      puesto: ['',[Validators.required,Validators.minLength(1), Validators.maxLength(100)]],
      fechaInicio: ['',Validators.required],
      fechaFin: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params =>{
      if(params["modo"] == "consulta"){
        this.flagNuevo = false;
        this.idConsultaServicio = params["idServicioDerivado"];
        this.consultaServicioDerivado(this.idConsultaServicio);
      }else if(params["modo"] == "nuevo"){
        console.log('xd');
      }
    })
  }

  irPatnallaPrincipal(){
    this.router.navigate(['/manageServices']);
  }

  enviarForm(){
    if(this.formServicio.valid){
      let fechaInicio = Date.parse(this.formServicio.value.fechaInicio);
      let fechaFin = Date.parse(this.formServicio.value.fechaFin);
      if(fechaFin<fechaInicio){
        alert('La fecha final no puede ser menor a la fecha final. Verifique e intente de nuevo');
        return;
      }

      let horaInicio = new Date(this.formServicio.value.fechaInicio + " " + this.formServicio.value.horaInicio);
      let horaFin = new Date(this.formServicio.value.fechaFin + " " + this.formServicio.value.horaFin);
      if(horaFin<horaInicio){
        alert('La hora final no puede ser menor a la hora inicial. Verifique e intente de nuevo');
        return;
      }

      let valueString = JSON.stringify(this.formServicio.value);
      if(this.flagNuevo){
        this.guardarServicioDerivado(valueString);
      }else{
        this.actualizarServicioDerivado(valueString);
      }
    }else{
      alert('Debe llenar todos los campos para poder guardar la informacion.');
      this.formServicio.markAllAsTouched;
    }
  }

  guardarServicioDerivado(jsonFormulario:string){
    this.masterServiceService.guardarServicioDerivado(jsonFormulario).subscribe({
      next : data => {
        alert('Registro insertado correctamente');
        this.formServicio.reset();
      },
      error: error => {
        alert('Error: ' + error.error.msgError);
      },
      complete: () => {}
    })
  }

  actualizarServicioDerivado(jsonFormulario:string){
    console.log(jsonFormulario);
    this.masterServiceService.actualizarServicioDerivado(jsonFormulario).subscribe({
      next : data => {
        alert('Registro actualizado correctamente');
        this.irPatnallaPrincipal();
      },
      error: error => {
        console.log(error);
        alert('Error: ' + error.error.msgError);
      },
      complete: () => {}
    })
  }

  consultaServicioDerivado(idServicioDerivado:string):any{
    this.masterServiceService.consultarServiciosDerivados(idServicioDerivado).subscribe({
      next : data => {
        let dataResult:ServicioDerivado = data.listaResultado[0];
        this.formServicio.get('id')?.setValue(dataResult.id);
        this.formServicio.get('maestro')?.setValue(dataResult.idmaestro);
        this.formServicio.get('puesto')?.setValue(dataResult.puesto);
        this.formServicio.get('fechaInicio')?.setValue(dataResult.fechainicio);
        this.formServicio.get('fechaFin')?.setValue(dataResult.fechafin);
        this.formServicio.get('horaInicio')?.setValue(dataResult.horainicio);
        this.formServicio.get('horaFin')?.setValue(dataResult.horafin);
      },
      error: error => {
        return null;
      },
      complete: () => {}
    });
  }
}
