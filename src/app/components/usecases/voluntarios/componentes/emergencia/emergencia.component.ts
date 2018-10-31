import { SimpleChanges, SimpleChange } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges
} from "@angular/core";
import { FormArray } from "@angular/forms";

@Component({
  selector: "app-emergencia",
  templateUrl: "./emergencia.component.html",
  styleUrls: ["./emergencia.component.scss"]
})
export class EmergenciaComponent implements OnInit, OnChanges {
  formGroup: FormGroup;
  @Output("EValue")
  emitter: EventEmitter<any> = new EventEmitter();
  constructor(private fb: FormBuilder) {}
  @Input("familiares")
  data: any;
  ngOnInit() {
    this.formGroup = this.fb.group({
      datosFamiliares: this.fb.array([])
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      const ipv: SimpleChange = changes.data;
  /*     console.log("prev value: ", ipv.previousValue);
      console.log("got name: ", ipv.currentValue); */
      if (this.formGroup) {
        this.addDatoFamiliarData(ipv.currentValue);
      }
    }
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

  addDatoFamiliarData(data: any[]) {
    data.forEach(e => {
      const datoFamiliar = this.fb.group({
        parentesco: [e.parentesco || ""],
        nombre: [e.nombre  || ""],
        apellido: [e.apellido || ""],
        domicilio: [e.domicilio || ""],
        celular: [e.celular || ""]
      });
      this.datosFamiliaresFormArray.push(datoFamiliar);
    });
  }

  getValue() {
    this.emitter.emit(this.formGroup.get("datosFamiliares").value);
  }
}
