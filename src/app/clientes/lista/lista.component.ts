import { Component, OnInit } from '@angular/core';
import { ClienteModel } from '../models/cliente.model';
import { map, Observable, pipe, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  clientList: ClienteModel[] = [];

  clientes$: Observable<ClienteModel[]>;
  filter = new FormControl('', { nonNullable: true });


  constructor() {
    this.fillList(30);

    this.clientes$ = this.filter.valueChanges.pipe(
      startWith(''),
      map((text) => this.search(text)),
    );
  }

  ngOnInit(): void {
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
        '37000',
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

  search(text: string): ClienteModel[] {
    return this.clientList.filter((cliente: ClienteModel) => {
      const term = text.toLowerCase();
      return (
        cliente.name.toLowerCase().includes(term)
        || cliente.tel.toLowerCase().includes(term)
        || cliente.email.toLowerCase().includes(term)
        || cliente.estado.toLowerCase().includes(term)
        || cliente.municipio.toLowerCase().includes(term)
        || cliente.zip.toLowerCase().includes(term)
      );
    });
  }
}
