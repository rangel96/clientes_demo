import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LngLatLike } from 'mapbox-gl';

import { BackendService } from '../../utils/backend.service';
import { ClienteModel } from '../models/cliente.model';
import { UtilsService } from '../../utils/utils.service';
import { Direction } from '../models/direction_response.model';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent {

  // Forms & Controls
  clientForm!: FormGroup;
  directionControl: FormControl = new FormControl(undefined, Validators.required);


  directionList: Direction[] = [];
  center: LngLatLike | undefined;


  // loadings
  searchLoading = false;


  constructor(
    private fb: FormBuilder,
    private routerActivated: ActivatedRoute,
    private router: Router,

    private backend: BackendService,
    private utils: UtilsService,
    private clienteSvc: ClienteService,
  ) {
    this.formInit();
    this.getParam();
  }


  get cliente(): ClienteModel {
    return this.clientForm?.value;
  }

  get direction(): Direction {
    return this.directionControl.value[0];
  }

  private getParam() {
    this.routerActivated.params.subscribe(
      ({ id }) => {

        // Valid param
        if (id === 'nuevo') {
          return;
        }
        const client = this.clienteSvc.getById(id);
        this.formInit(client);
        this.clientForm.controls['id'].setValue(id);
        this.center = this.cliente.mark;
      }
    )
  }

  private formInit(cliente?: ClienteModel) {
    this.clientForm = this.fb.group({
      id: [cliente?.id],
      estado: [cliente?.estado || '', Validators.required],
      name: [cliente?.name || '', Validators.required],
      municipio: [cliente?.municipio || '', Validators.required],
      tel: [cliente?.tel || ''],
      colonia: [cliente?.colonia || '', Validators.required],
      email: [cliente?.email || '', [Validators.required, Validators.email]],
      street: [cliente?.street || '', Validators.required],
      dateCreated: [cliente?.dateCreated || new Date()],
      zip: [cliente?.zip || '', Validators.required],
      ref: [cliente?.ref || ''],
      mark: [cliente?.mark || []],
    });
  }


  addUpdateCliente() {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      return;
    }

    this.cliente.id
      ? this.updateCliente()
      : this.addCliente();
  }

  addCliente() {
    delete this.cliente.id;
    const id = this.clienteSvc.add(this.cliente);
    this.router.navigate(['/', id - 1]).then();
  }

  updateCliente() {
    const id: string = this.cliente.id || '';
    delete this.cliente.id;
    this.clienteSvc.update(id, this.cliente);
    this.clientForm.controls['id'].setValue(id);
    console.log(this.cliente);
  }


  searchLocation(): void {
    this.searchLoading = true;
    this.directionList = [];
    const { colonia, street, zip } = this.cliente;

    const path = `${ this.backend.getEndpoint('get-forward') }${ street }, ${ zip }${ colonia }`;
    this.backend.Get('positionStack', path).subscribe(
      (response) => {
        this.directionList = response.data;
        this.utils.openModal('#selectLocation');
        this.searchLoading = false;
      }
    );
  }

  setLocation(): void {
    const { longitude, latitude, region, locality } = this.direction;
    const { estado, municipio, mark } = this.clientForm.controls;

    estado.setValue(region);
    municipio.setValue(locality);
    mark.setValue([longitude, latitude]);

    this.center = [longitude, latitude];
  }


  fieldInvalid(fieldName: string): boolean | undefined {
    const control = this.clientForm.get(fieldName);
    return control?.invalid && control?.touched;
  }

  isValidSearch(): boolean {
    const { colonia, street, zip } = this.clientForm.controls;
    return colonia.invalid || street.invalid || zip.invalid;
  }

}
