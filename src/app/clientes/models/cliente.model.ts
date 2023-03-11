export class ClienteModel {
  id?: string;
  name: string;
  tel: string;
  email: string;
  ref: string;
  estado: string;
  municipio: string;
  colonia: string;
  street: string;
  zip: string;
  dateCreated: Date;

  constructor(
    name: string,
    tel: string,
    email: string,
    ref: string,
    estado: string,
    municipio: string,
    colonia: string,
    street: string,
    zip: string
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
  }

}
