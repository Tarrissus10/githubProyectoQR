import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfesorPage } from './profesor.page';

const routes: Routes = [
  {
    path: '',
    component: ProfesorPage
  },
  {
    path: 'profesor-detalle',
    loadChildren: () => import('./profesor-detalle/profesor-detalle.module').then( m => m.ProfesorDetallePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesorPageRoutingModule {}
