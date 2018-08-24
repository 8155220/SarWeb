import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-voluntario-create",
  templateUrl: "./voluntario-create.component.html",
  styleUrls: ["./voluntario-create.component.css"]
})
export class VoluntarioCreateComponent implements OnInit {
  voluntarioForm: FormGroup;
 // sexo:string;
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


  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.voluntarioForm = this.fb.group({
      nombre: "Pedro",
      apellidoPaterno: "Pedro",
      apellidoMaterno: "",
      sexo: "",
      fechaNacimiento: "",
      tipoSangre: "",
      licenciaConducir: "false",
      direccion: "",
      alergias: "", //pendiente

      nacionalidad:"",
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
  }
}
