import { Component } from '@angular/core';
import { ClienteModel } from './models/cliente.model';
import { LngLatLike } from 'mapbox-gl';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent {

  selectCliente: ClienteModel | undefined;

  setCliente(cliente: ClienteModel) {
    this.selectCliente = cliente;
  }

  get mark() {
    return this.selectCliente?.mark;
  }

}
