import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import paisesArray from '../../../../../assets/localdata/paises';

@Component({
  selector: "app-voluntario-create",
  templateUrl: "./voluntario-create.component.html",
  styleUrls: ["./voluntario-create.component.css"]
})
export class VoluntarioCreateComponent implements OnInit {
  voluntarioForm: FormGroup;
  
  gruposSanguineos: any[] = [
    {value: 'oNegativo', viewValue: 'O RH negativo'},
    {value: 'oPositivo', viewValue: 'O RH positivo'},
    {value: 'aNegativo', viewValue: 'A RH negativo'},
    {value: 'aPositivo', viewValue: 'A RH positivo'},
    {value: 'bNegativo', viewValue: 'B RH negativo'},
    {value: 'bPositivo', viewValue: 'B RH positivo'},
    {value: 'abNegativo', viewValue: 'AB RH negativo'},
    {value: 'abPositivo', viewValue: 'AB RH positivo'},
  ];

  paisFormControl = new FormControl();
  filteredOptions: Observable<string[]>;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.voluntarioForm = this.fb.group({
      nombre: "Pedro",  
      apellidoPaterno: "",
      apellidoMaterno: "",
      sexo: "",
      fechaNacimiento: "",
      tipoSangre: "",
      licenciaConducir: "false",
      direccion: "",
      alergias: "", //pendiente

      pais: this.paisFormControl,
      departamento:"",
      provincia: "",
      capital:"",
      municipio:"",
      lugar: "",
      celular: "",
      telefono: "",
      numeroCarnetIdentidad: "",
      estadoCivil: "",
      email: "",
      idiomas: "", //pendiente

      hoobies: "", //pendiente

      nombreTutor: "",
      celularTutor: "",
      estudiosRealizados: "", //pendiente

      profesion: "",
      ocupacion: "",
      situacionLaboral: "",
      experienciaCampoPrimeraRespuesta: "", //pendiente

      grado: "",
      armaEspecialidad: "",
      numeroCarnetMilitar: "",
      DatosFamiliares: "", //pendiente

      datosFisicos: "", //pendiente

      emergenciaLlamar: "", //pendiente

      lugarNacimiento: ""
    });
    this.voluntarioForm.valueChanges.subscribe(console.log);

    //this.filteredOptions = this.voluntarioForm.value('pais');

    this.filteredOptions = this.paisFormControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return paisesArray.filter(option => option.toLowerCase().includes(filterValue));
  }
}
