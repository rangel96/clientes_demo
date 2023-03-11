import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesModule } from './clientes/clientes.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./clientes/clientes.module').then(m => ClientesModule),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ClientesModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
