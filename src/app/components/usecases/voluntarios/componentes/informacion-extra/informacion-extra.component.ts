import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-informacion-extra",
  templateUrl: "./informacion-extra.component.html",
  styleUrls: ["./informacion-extra.component.scss"]
})
export class InformacionExtraComponent implements OnInit {
  formGroup: FormGroup;
  situacionLaboral:any[] = [
    {value:"empresario",viewValue:"Empresaria con asalariadas/os"},
    {value:"autonoma",viewValue:"Autónoma"},
    {value:"cooperativista",viewValue:"Cooperativista"},
    {value:"asalariado",viewValue:"Asalariada"},
    {value:"desempleado",viewValue:"Desempleado"},
    {value:"trabajoTiempoTotal",viewValue:"Trabajo a tiempo total"},
    {value:"trabajoTiempoParcial",viewValue:"Trabajo a tiempo parcial"},
  ];
  @Output('IEValue') emitter:EventEmitter<any>= new EventEmitter();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      estadoCivil: "",
      idiomas: this.fb.array([]),
      hoobies: this.fb.array([]),
      estudiosRealizados: this.fb.array([]),
      profesion: "",
      licenciaConducir: "false",
      ocupacion: "",
      situacionLaboral: "",
      experienciaCampoPrimeraRespuesta: this.fb.array([]),
      armaEspecialidad: "",
      numeroCarnetMilitar: "",
    });
  }


  get idiomasFormArray() {
    return this.formGroup.get("idiomas") as FormArray;
  }

  addIdioma() {
    const idioma = this.fb.group({
      nombreIdioma: []
    });
    this.idiomasFormArray.push(idioma);
  }
  deleteIdioma(i: number) {
    this.idiomasFormArray.removeAt(i);
  }
  get hoobiesFormArray() {
    return this.formGroup.get("hoobies") as FormArray;
  }

  addHoobie() {
    const hoobie = this.fb.group({
      nombreHoobie: []
    });
    this.hoobiesFormArray.push(hoobie);
  }
  deleteHoobie(i: number) {
    this.hoobiesFormArray.removeAt(i);
  }

  get estudioRealizadosFormArray() {
    return this.formGroup.get("estudiosRealizados") as FormArray;
  }

  addEstudioRealizado() {
    const estudioRealizado = this.fb.group({
      nombreEstudioRealizado: []
    });
    this.estudioRealizadosFormArray.push(estudioRealizado);
  }
  deleteEstudioRealizado(i: number) {
    this.estudioRealizadosFormArray.removeAt(i);
  }

  get experienciaCampoPrimeraRespuestaFormArray() {
    return this.formGroup.get(
      "experienciaCampoPrimeraRespuesta"
    ) as FormArray;
  }

  addExperienciaCampoPrimeraRespuesta() {
    const experienciaCampoPrimeraRespuesta = this.fb.group({
      nombreExperienciaCampoPrimeraRespuesta: []
    });
    this.experienciaCampoPrimeraRespuestaFormArray.push(
      experienciaCampoPrimeraRespuesta
    );
  }
  deleteExperienciaCampoPrimeraRespuesta(i: number) {
    this.experienciaCampoPrimeraRespuestaFormArray.removeAt(i);
  }

  getSituacionLaboral(): any[] {
    return this.situacionLaboral;
  }

  getValue(){
    this.emitter.emit(this.formGroup.value);
  }

}
