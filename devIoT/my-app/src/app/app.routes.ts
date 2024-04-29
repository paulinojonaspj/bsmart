import { Routes } from '@angular/router';
import AdminComponent from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuardsGuard } from './guards/auth-guards.guard';

import { ObjetivosComponent } from './pages/objetivos/objetivos.component';
import { ContratosComponent } from './pages/contratos/contratos.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuardsGuard],
    children: [{
      path: 'contratos',
      component: ContratosComponent
    },

    {
      path: "objetivos",
      component: ObjetivosComponent
    }
    ]
  },


];
