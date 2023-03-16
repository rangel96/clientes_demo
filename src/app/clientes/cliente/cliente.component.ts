import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LngLatLike } from 'mapbox-gl';

import { BackendService } from '../../utils/backend.service';
import { ClienteModel } from '../models/cliente.model';
import { DirectionsResult } from './directions.example';
import { UtilsService } from '../../utils/utils.service';
import { Direction } from '../models/direction_response.model';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  // Forms & Controls
  clientForm!: FormGroup;
  directionControl: FormControl = new FormControl(undefined, Validators.required);


  directionList: Direction[] = [];
  center: LngLatLike | undefined;
  marker: [LngLatLike] | undefined;


  // loadings
  searchLoading = false;


  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private backend: BackendService,
    private utils: UtilsService,
  ) {
    this.formInit();
    this.getParam();
    this.directionList = DirectionsResult;
  }

  ngOnInit(): void {
    // this.utils.openModal('#selectLocation');
  }

  get cliente(): ClienteModel {
    return this.clientForm?.value;
  }

  get direction(): Direction {
    return this.directionControl.value[0];
  }

  private getParam() {
    this.router.params.subscribe(
      ({ id }) => {

        // Valid param
        if (id === 'nuevo') {
          return;
        }

        this.clientForm.controls['id'].setValue(id);
      }
    )
  }

  private formInit(cliente?: ClienteModel) {
    this.clientForm = this.fb.group({
      id: [cliente?.id],
      estado: [cliente?.estado || 'Jalisco', Validators.required],
      name: [cliente?.name || 'Eric', Validators.required],
      municipio: [cliente?.municipio || 'Zapopan', Validators.required],
      tel: [cliente?.tel || '3322291262'],
      colonia: [cliente?.colonia || 'Paseos del sol', Validators.required],
      email: [cliente?.email || 'dev@dev.com', [Validators.required, Validators.email]],
      street: [cliente?.street || 'Calle Jorge bravo, 1482', Validators.required],
      dateCreated: [cliente?.dateCreated || new Date()],
      zip: [cliente?.zip || '45075', Validators.required],
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
    console.log('addCliente');
  }

  updateCliente() {
    delete this.cliente.id;
    console.log('updateCliente');
  }


  searchLocation(): void {
    this.searchLoading = true;
    this.directionList = [];
    const { colonia, street, zip, ref } = this.cliente;

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
    this.marker = [[longitude, latitude]];
  }


  fieldInvalid(fieldName: string): boolean | undefined {
    const control = this.clientForm.get(fieldName);
    return control?.invalid && control?.touched;
  }

  isValidSearch(): boolean {
    const { colonia, street, zip, ref } = this.clientForm.controls;
    return colonia.invalid || street.invalid || zip.invalid;
  }

}
