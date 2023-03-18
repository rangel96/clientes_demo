import { Injectable } from '@angular/core';
import { ClienteModel } from '../models/cliente.model';
import { CLIENTE_DATA } from './cliente.data';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

private clienteList: ClienteModel[] = CLIENTE_DATA;

  constructor() { }

  getAll(): ClienteModel[] {
    return this.clienteList;
  }

  getById(id: string): ClienteModel {
    return this.clienteList[Number(id)];
  }

  update(id: string, cliente: ClienteModel): ClienteModel[] {
    this.clienteList[Number(id)] = cliente;
    return this.clienteList;
  }

  add(cliente: ClienteModel): number {
    this.clienteList.push(cliente);
    return this.clienteList.length;
  }

  delete(id: number): ClienteModel[] {
    this.clienteList = this.clienteList.filter((_, idx) => idx !== id);
    return this.clienteList;
  }

}
