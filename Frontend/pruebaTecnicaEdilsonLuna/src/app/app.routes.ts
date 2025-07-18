import { Routes } from '@angular/router';
import { MainComponentComponent } from './components/main-component/main-component.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { InfoServiceComponent } from './components/info-service/info-service.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'manageServices',
        pathMatch: 'full'
    },
    {
        path: 'manageServices',
        component: MainComponentComponent,
    },
    {
        path: 'nuevoServicio',
        component: InfoServiceComponent
    },
    {
        path: 'infoServicio',
        component: InfoServiceComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
