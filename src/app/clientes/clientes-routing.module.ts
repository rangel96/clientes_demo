import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes.component';
import { ClienteComponent } from './cliente/cliente.component';

const routes: Routes = [
  {
    path: '',
    component: ClientesComponent
  }, {
    path: ':id',
    component: ClienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule {
}
