import { environment } from "../../../../../environments/environment";
import { VoluntarioModel } from "../../../../models/voluntario/voluntario.model";
import { UiService } from "../../../../services/ui.service";
import { AngularFirestore } from "angularfire2/firestore";
import { VoluntarioService } from "../../../../services/voluntario.service";
import { Observable, Subscriber } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray
} from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";

@Component({
  selector: "app-voluntario-create",
  templateUrl: "./voluntario-create.component.html",
  styleUrls: ["./voluntario-create.component.css"]
})
export class VoluntarioCreateComponent implements OnInit {
  voluntarioForm: FormGroup;
  //Ubicacion
  paisFormControl = new FormControl("");
  departamentoFormControl = new FormControl("");
  provinciaFormControl = new FormControl("");
  capitalFormControl = new FormControl("");
  municipioFormControl = new FormControl("");
  //endUbicacion

  filteredOptions: Observable<string[]>;
  filteredOptionsDepartamento: Observable<string[]>;
  filteredOptionsProvincia: Observable<string[]>;
  filteredOptionsMunicipio: Observable<string[]>;

  loading = false;
  imagenPerfil = "";
  fileReader = new FileReader();

  constructor(
    private fb: FormBuilder,
    private voluntarioService: VoluntarioService,
    private afs: AngularFirestore,
    public snackBar: MatSnackBar,
    private uiService: UiService,
    private router: Router
  ) {}

  getGrupoSanguineo(): any {
    return this.voluntarioService.getGrupoSanguineo();
  }
  ngOnInit() {
    this.uiService.useCaseStateChanged.next("Registrar Voluntario");

    this.voluntarioForm = this.fb.group({
      nombre: ["", [Validators.required]],
      apellidoPaterno: ["", [Validators.required]],
      apellidoMaterno: ["", [Validators.required]],
      sexo: ["", [Validators.required]],
      fechaNacimiento: ["", [Validators.required]],
      tipoSangre: "",
      licenciaConducir: "false",
      direccion: "",
      alergias: this.fb.array([]),
      pais: this.paisFormControl,
      departamento: this.departamentoFormControl,
      provincia: this.provinciaFormControl,
      capital: this.capitalFormControl,
      municipio: this.municipioFormControl,
      timestamp: Date.now(),
      celular: ["", [Validators.required]],
      telefonoFijo: "",
      numeroCarnetIdentidad: ["", [Validators.required]],
      estadoCivil: "",
      email: "",
      idiomas: this.fb.array([]),
      hoobies: this.fb.array([]),
      nombreTutor: "",
      celularTutor: "",
      estudiosRealizados: this.fb.array([]),
      profesion: "",
      ocupacion: "",
      situacionLaboral: "",
      experienciaCampoPrimeraRespuesta: this.fb.array([]),
      grado: "",
      armaEspecialidad: "",
      numeroCarnetMilitar: "",
      datosFamiliares: this.fb.array([]),
      estatura: "",
      talla: "",
      colorPiel: "",
      colorOjos: "",
      cabello: "",
      labios: "",
      nariz: "",
      rasgosParticulares: "",

      emergenciaLlamar: "",

      lugarNacimiento: ""
    });

    this.filteredOptions = this.paisFormControl.valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );

    this.filteredOptionsDepartamento = this.departamentoFormControl.valueChanges.pipe(
      startWith(""),
      map(value => this.filtrar(value, this.getDepartamentos()))
    );

    this.filteredOptionsProvincia = this.provinciaFormControl.valueChanges.pipe(
      startWith(""),
      map(value => this.filtrar(value, this.getProvincias()))
    );

    this.filteredOptionsMunicipio = this.municipioFormControl.valueChanges.pipe(
      startWith(""),
      map(value => this.filtrar(value, this.getMunicipios()))
    );
  }

  getPaises(): string[] {
    return this.voluntarioService.getPaises();
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.getPaises().filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  public filtrar(value: string, array: string[]): string[] {
    const filterValue = value.toLowerCase();
    return array.filter(option => option.toLowerCase().includes(filterValue));
  }

  getDepartamentos(): string[] {
    return this.voluntarioService.getDepartamentos(this.paisFormControl.value);
  }
  getProvincias(): string[] {
    return this.voluntarioService.getProvincias(
      this.departamentoFormControl.value
    );
  }
  getCapitals(): string[] {
    return this.voluntarioService.getCapitals(
      this.departamentoFormControl.value,
      this.provinciaFormControl.value
    );
  }
  getMunicipios(): string[] {
    return this.voluntarioService.getMunicipios(
      this.departamentoFormControl.value,
      this.provinciaFormControl.value,
      this.capitalFormControl.value
    );
  }
  getSituacionLaboral(): any[] {
    return this.voluntarioService.getSituacionLaboral();
  }
  get alergiasFormArray() {
    return this.voluntarioForm.get("alergias") as FormArray;
  }

  addAlergia() {
    const alergia = this.fb.group({
      nombreAlergia: []
    });
    this.alergiasFormArray.push(alergia);
  }
  deleteAlergia(i: number) {
    this.alergiasFormArray.removeAt(i);
  }
  get idiomasFormArray() {
    return this.voluntarioForm.get("idiomas") as FormArray;
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
    return this.voluntarioForm.get("hoobies") as FormArray;
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
    return this.voluntarioForm.get("estudiosRealizados") as FormArray;
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
    return this.voluntarioForm.get(
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

  get datosFamiliaresFormArray() {
    return this.voluntarioForm.get("datosFamiliares") as FormArray;
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

  submitHandler() {
    //this.loading = true;
    if(this.voluntarioForm.invalid){
      this.openSnackBar("Complete los Campos requeridos antes de continuar", "ocultar");
      return;
    }

    const formValue = this.voluntarioForm.value as VoluntarioModel;

    let dateString = formValue.fechaNacimiento;
    formValue.fechaNacimiento = new Date(formValue.fechaNacimiento).toISOString();
    //formValue.fechaNacimiento = 
    console.log('fechaNacimineto:'+ formValue.fechaNacimiento);
    // convertir a "2018-10-05T04:00:00.000Z"
   //console.log(formValue.fechaNacimiento);
  
    formValue.fotoURL = this.imagenPerfil;

    if (this.imagenPerfil != "") {
      this.voluntarioService.addVoluntario(formValue).subscribe(
        e => {
          console.log(e);
          if (e.bytesTransferred == e.totalBytes) {
            this.loading = false;
            this.openSnackBar("Registrado Exitosamente", "ocultar");
            this.router.navigate(["/voluntarios/index"]);
          }
        },
        e => {
          console.log(e);
          this.loading = false;
          this.openSnackBar("Ocurrio un error intente mas tarde", "ocultar");
        }
      );
    } else {
      this.voluntarioService.addVoluntario(formValue);
      this.loading = false;
      this.openSnackBar("Registrado Exitosamente", "ocultar");
      this.router.navigate(["/voluntarios/index"]);
    }

    /*if (await this.voluntarioService.addVoluntario(formValue)) {
      this.success = true;
      this.openSnackBar("Registrado Exitosamente", "ocultar");
      this.router.navigate(["/voluntarios/index"]);
    } else {
      this.success = false;
      this.openSnackBar("Ocurrio un error...", "ocultar");
      this.router.navigate(["/voluntarios/index"]);
    }*/
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  imageReceived(image: string) {
    this.imagenPerfil = image;
  }
}
