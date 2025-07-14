import { Routes } from '@angular/router';
import { MainComponentComponent } from './components/main-component/main-component.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'manageServices',
        pathMatch: 'full'
    },
    {
        path: 'manageServices',
        component: MainComponentComponent,
    }
];
