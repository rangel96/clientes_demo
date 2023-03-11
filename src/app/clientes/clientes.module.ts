import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes.component';
import { ClientesRoutingModule } from './clientes-routing.module';
import { MapComponent } from './map/map.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ListaComponent } from './lista/lista.component';



@NgModule({
  declarations: [
    ClientesComponent,
    MapComponent,
    ClienteComponent,
    ListaComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
  ]
})
export class ClientesModule { }
