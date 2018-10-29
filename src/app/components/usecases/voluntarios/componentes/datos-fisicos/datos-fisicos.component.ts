import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-datos-fisicos",
  templateUrl: "./datos-fisicos.component.html",
  styleUrls: ["./datos-fisicos.component.scss"]
})
export class DatosFisicosComponent implements OnInit {
  formGroup: FormGroup;
  gruposSanguineos: any[] = [
    { value: "oNegativo", viewValue: "O RH negativo" },
    { value: "oPositivo", viewValue: "O RH positivo" },
    { value: "aNegativo", viewValue: "A RH negativo" },
    { value: "aPositivo", viewValue: "A RH positivo" },
    { value: "bNegativo", viewValue: "B RH negativo" },
    { value: "bPositivo", viewValue: "B RH positivo" },
    { value: "abNegativo", viewValue: "AB RH negativo" },
    { value: "abPositivo", viewValue: "AB RH positivo" }
  ];
  @Output('DFValue') emitter:EventEmitter<any>=new EventEmitter();
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      estatura: "",
      colorOjos: "",
      labios: "",
      rasgosParticulares: "",
      fechaNacimiento: "",
      colorPiel: "",
      timestamp: Date.now(),
      cabello: "",
      talla: "",
      nariz: "",
      gruposSanguineo: ""
    });
  }

  getValue(){
    this.emitter.emit(this.formGroup.value);
  }
}
