import { UiService } from './../../../../services/ui.service';
import { AngularFirestore } from "angularfire2/firestore";
import { VoluntarioService } from "./../../../../services/voluntario.service";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "../../../../../../node_modules/@angular/material";

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
  success = false;
  constructor(
    private fb: FormBuilder,
    private voluntarioService: VoluntarioService,
    private afs: AngularFirestore,
    public snackBar: MatSnackBar,
    private uiService:UiService
  ) {}

  getGrupoSanguineo(): any {
    return this.voluntarioService.getGrupoSanguineo();
  }
  ngOnInit() {
    this.uiService.useCaseStateChanged.next('Registrar Voluntario');

    this.voluntarioForm = this.fb.group({
      nombre: ["",[Validators.required]],
      apellidoPaterno: ["",[Validators.required]],
      apellidoMaterno: ["",[Validators.required]],
      sexo: ["",[Validators.required]],
      fechaNacimiento: "",
      tipoSangre: "",
      licenciaConducir: "false",
      direccion: "",
      alergias: "", //pendiente
      
      pais: this.paisFormControl,
      departamento: this.departamentoFormControl,
      provincia: this.provinciaFormControl,
      capital: this.capitalFormControl,
      municipio: this.municipioFormControl,

      // lugar: "",
      celular: "", //number
      telefonoFijo: "",
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
      datosFamiliares: "", //pendiente

      datosFisicos: "", //pendiente

      emergenciaLlamar: "", //pendiente

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
  // async submitHandler(){
  //   console.log('Clickeado');

  //   this.voluntarioService.submitHandler(this.loading,this.success,this.voluntarioForm);
  //   console.log('loading'+this.loading);
  //   console.log('succes'+this.success);
  // }

  async submitHandler() {
    this.loading = true;
    const formValue = this.voluntarioForm.value;
    try {
      await this.afs.collection("voluntarios").add(formValue);
      this.success = true;
      this.openSnackBar('Guardado','ocultar')
    } catch (err) {
      console.log(err);
    }
    this.loading = false;
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
