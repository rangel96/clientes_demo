import { LngLatLike } from 'mapbox-gl';

export class ClienteModel {
  name: string;
  tel: string;
  email: string;
  ref: string;
  estado: string;
  municipio: string;
  colonia: string;
  street: string;
  zip: string;
  dateCreated: Date | string;
  id?: string;
  mark?: LngLatLike;

  constructor(
    name: string,
    tel: string,
    email: string,
    ref: string,
    estado: string,
    municipio: string,
    colonia: string,
    street: string,
    zip: string,
    id?: string,
    mark?: LngLatLike,
  ) {
    this.name = name;
    this.tel = tel;
    this.email = email;
    this.ref = ref;
    this.estado = estado;
    this.municipio = municipio;
    this.colonia = colonia;
    this.street = street;
    this.zip = zip;
    this.dateCreated = new Date();
    this.id = id;
    this.mark = mark;
  }

}
