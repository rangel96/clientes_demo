import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClienteModel } from '../models/cliente.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent {

  clientForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
  ) {
    this.formInit();
    this.getParam();
  }

  get cliente(): ClienteModel {
    return this.clientForm?.value;
  }

  private formInit(cliente?: ClienteModel) {
    this.clientForm = this.fb.group({
      id: [cliente?.id || ''],
      estado: [cliente?.estado || ''],
      name: [cliente?.name || ''],
      municipio: [cliente?.municipio || ''],
      tel: [cliente?.tel || ''],
      colonia: [cliente?.colonia || ''],
      email: [cliente?.email || ''],
      street: [cliente?.street || ''],
      dateCreated: [cliente?.dateCreated || new Date()],
      zip: [cliente?.zip || ''],
      ref: [cliente?.ref || ''],
    });
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

  updateCliente() {
    console.log(this.cliente);
  }
}
