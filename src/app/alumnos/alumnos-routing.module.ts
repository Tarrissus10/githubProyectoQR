import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlumnosPage } from './alumnos.page';

const routes: Routes = [
  {
    path: '',
    component: AlumnosPage
  },
  {
    path: 'alumno-detalle',
    loadChildren: () => import('./alumno-detalle/alumno-detalle.module').then( m => m.AlumnoDetallePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnosPageRoutingModule {}
