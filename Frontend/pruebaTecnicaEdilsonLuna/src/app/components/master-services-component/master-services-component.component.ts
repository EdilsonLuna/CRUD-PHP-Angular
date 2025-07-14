import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-master-services-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './master-services-component.component.html',
  styleUrl: './master-services-component.component.scss'
})
export class MasterServicesComponentComponent implements OnInit{
  arraDatos : string[] = [];

  ngOnInit(): void {
    
  }

  agregarArray(){
    this.arraDatos.push("as123","asd123123");
    console.log(this.arraDatos);
  }


}
