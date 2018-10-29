import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-emergencia',
  templateUrl: './emergencia.component.html',
  styleUrls: ['./emergencia.component.scss']
})
export class EmergenciaComponent implements OnInit {

  formGroup:FormGroup;
  @Output('EValue') emitter:EventEmitter<any>= new EventEmitter();
  constructor(private fb: FormBuilder,) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      datosFamiliares:this.fb.array([])
    });
  }

  get datosFamiliaresFormArray() {
    return this.formGroup.get("datosFamiliares") as FormArray;
  }

  addDatoFamiliar() {
    const datoFamiliar = this.fb.group({
      parentesco: [],
      nombre: [],
      apellido: [],
      domicilio: [],
      celular: []
    });
    this.datosFamiliaresFormArray.push(datoFamiliar);
  }
  deleteDatoFamiliar(i: number) {
    this.datosFamiliaresFormArray.removeAt(i);
  }

  getValue(){
    this.emitter.emit(this.formGroup.value);
  }

}
