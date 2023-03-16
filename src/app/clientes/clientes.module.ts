import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes.component';
import { ClientesRoutingModule } from './clientes-routing.module';
import { MapComponent } from './map/map.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ListaComponent } from './lista/lista.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbHighlight } from '@ng-bootstrap/ng-bootstrap';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { environment } from '../../environments/environment';



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
    ReactiveFormsModule,
    NgbHighlight,
    NgxMapboxGLModule.withConfig({
      accessToken: environment.apiKey.mapBox, // Optional, can also be set per map (accessToken input of mgl-map)
    }),
  ]
})
export class ClientesModule { }
