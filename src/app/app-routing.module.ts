import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { MainComponent } from './modules/main/main.component';
import { InicioComponent } from './modules/pages/inicio/view/inicio/inicio.component';
import { OrganigramaComponent } from './modules/pages/sistema-de-gestion/view/components/organigrama/organigrama.component';
import { SistemadegestionComponent } from './modules/pages/sistema-de-gestion/view/sistema-de-gestion/sistema-de-gestion.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      {
        path: 'inicio',
        component: InicioComponent,
      },
      {
        path: 'institucional',
        component: InicioComponent,
      },
      {
        path: 'mineria',
        component: InicioComponent,
      },
      {
        path: 'geologia',
        component: InicioComponent,
      },
      {
        path: 'administracion',
        component: InicioComponent,
      },
      {
        path: 'sistema-de-gestion',
        component: SistemadegestionComponent,
        //   children:[{
        //     path: 'organigrama',
        //     component: OrganigramaComponent
        //   },
        //   og
        // ]
      },
      {
        path: 'tecnologia',
        component: InicioComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
