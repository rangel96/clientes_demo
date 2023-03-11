import { Component, OnInit } from '@angular/core';
import { ClienteModel } from '../models/cliente.model';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  clientList: ClienteModel[] = [];

  ngOnInit(): void {
    this.fillList(30);
  }

  fillList(count: number) {
    for (let i = 0; i < count; i++) {
      const cliente: ClienteModel = new ClienteModel(
        'Francisco Hernández',
        '4770000000',
        'test@dev.com',
        '',
        'Guanajuato',
        'León',
        '',
        '',
        37000,
      );
      this.clientList.push(cliente);
    }
  }

  searchMap(cliente: ClienteModel) {
    console.log(cliente);
  }

  deleteClient(idx: number) {
    console.log(`Clic: deleteClient(${ idx })`);
  }

}
