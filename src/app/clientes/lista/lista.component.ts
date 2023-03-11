import { Component, OnInit } from '@angular/core';
import { ClienteModel } from '../models/cliente.model';
import { map, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { UtilsService } from '../../utils/utils.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  clientList: ClienteModel[] = [];

  clientes$: Observable<ClienteModel[]>;
  filter = new FormControl('', { nonNullable: true });


  constructor(
    private utils: UtilsService
  ) {
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

  /***
   * Export Archive
   * */
  toCSV() {
    const filename = 'Clientes';
    const keyList = [
      'id',
      'estado',
      'name',
      'municipio',
      'tel',
      'colonia',
      'email',
      'street',
      'dateCreated',
      'zip',
      'ref',
    ];
    const headers: string[] = [
      'Cliente',
      'Estado',
      'Nombre/Apellidos',
      'Municipio',
      'Teléfono',
      'Colonia',
      'Correo',
      'Calle',
      'Fecha de Creación',
      'Código Postal',
      'Referencia',
    ];
    const data: ClienteModel[] = [];

    // Obtener el arreglo si tiene filtro
    this.clientes$.subscribe(clientes => {
      // Cambiar los valores necesarios para
      clientes.forEach((cliente, idx) => {
        if (typeof cliente.dateCreated !== 'string') {
          data.push({
            ...cliente,
            id: idx.toString(),
            dateCreated: cliente.dateCreated.toDateString()
          });
        }
      });
    });

    this.utils.downloadFileCSV(data, headers, filename, keyList);
  }

  /***
   * Table actions
   * */
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
