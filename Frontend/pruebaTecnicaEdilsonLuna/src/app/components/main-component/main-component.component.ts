import { Component } from '@angular/core';
import { MasterServicesComponentComponent } from '../master-services-component/master-services-component.component';
import { ServicesComponentComponent } from '../services-component/services-component.component';

@Component({
  selector: 'app-main-component',
  standalone: true,
  imports: [MasterServicesComponentComponent, ServicesComponentComponent],
  templateUrl: './main-component.component.html',
  styleUrl: './main-component.component.scss'
})
export class MainComponentComponent {

}
