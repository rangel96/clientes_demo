import { Component, EventEmitter, Output } from '@angular/core';
import { ClienteModel } from '../models/cliente.model';
import { map, Observable, Observer, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { UtilsService } from '../../utils/utils.service';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent {

  @Output() selectClient = new EventEmitter<ClienteModel>();

  clientList: ClienteModel[] = []; // Original
  clientes$!: Observable<ClienteModel[]>; // Filtro
  private clientesTemp: ClienteModel[] = []; // Temporal
  filter = new FormControl('', { nonNullable: true });

  // Observer
  getDataObs$: Observer<any> = {
    next: clientes => {
      // Vaciar el arreglo
      this.clientesTemp = [];

      // Cambiar los valores necesarios para
      clientes.forEach((cliente: ClienteModel, idx: number) => {
        if (typeof cliente.dateCreated !== 'string') {
          this.clientesTemp.push({
            ...cliente,
            id: idx.toString(),
            dateCreated: cliente.dateCreated.toDateString()
          });
        }
      });
    },
    error: err => console.error(err),
    complete: () => null,
  };

  keyList: string[] = [
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
  headers: string[] = [
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

  constructor(
    private utils: UtilsService,
    private clienteSvc: ClienteService,
  ) {
    this.getAllClientList();

    this.initSearch();
  }

  getAllClientList(): void {
    this.clientList = this.clienteSvc.getAll();
  }

  initSearch(): void {
    this.clientes$ = this.filter.valueChanges.pipe(
      startWith(''),
      map((text) => this.search(text)),
    );
  }

  /***
   * Export Archive
   * */
  toCSV(): void {
    const filename = 'Reporte_Clientes';

    // Obtener el arreglo si tiene filtro
    this.clientes$.subscribe(this.getDataObs$);

    this.utils.downloadFileCSV(this.clientesTemp, this.headers, filename, this.keyList);
  }

  toPDF() {
    const filename = 'Reporte_Clientes';
    // Obtener el arreglo si tiene filtro
    this.clientes$.subscribe(this.getDataObs$);

    this.utils.downloadFilePDF(this.clientesTemp, this.headers, this.keyList, filename);
  }

  /***
   * Table actions
   * */
  searchMap(cliente: ClienteModel) {
    this.selectClient.emit(cliente);
  }

  deleteClient(idx: number) {
    this.clientList = this.clienteSvc.delete(idx);
    this.initSearch();
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
