import { environment } from "../../../../../environments/environment";
import { VoluntarioModel } from "../../../../models/voluntario/voluntario.model";
import { UiService } from "../../../../services/ui.service";
import { AngularFirestore } from "angularfire2/firestore";
import { VoluntarioService } from "../../../../services/voluntario.service";
import { Observable } from "rxjs";
import { map, startWith, filter } from "rxjs/operators";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray
} from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-voluntario-update",
  templateUrl: "./voluntario-update.component.html",
  styleUrls: ["./voluntario-update.component.css"]
})
export class VoluntarioUpdateComponent implements OnInit {
  voluntario: VoluntarioModel;
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
    private uiService: UiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  getGrupoSanguineo(): any {
    return this.voluntarioService.getGrupoSanguineo();
  }
  ngOnInit() {
    this.loadVoluntarioFormVacios();
    this.route.params.subscribe(async params => {
      // this.voluntario = await this.voluntarioService.getVoluntario(params["id"]);

      //this.voluntarioService.getVoluntarios().pipe(filter(  e.id===params['id'])).subscribe();

      this.voluntarioService.getVoluntarios().subscribe(voluntarios => {
        voluntarios.forEach(e => {
          console.log("Entro getVoluntario ForeaCH");
          if (e.id == params["id"]) {
            this.voluntario = new VoluntarioModel(e);
            //this.loadVoluntarioFormVacios();
            console.log("Entro getVoluntario ForeaCH2222");
            this.loadVoluntarioForm();
            this.loadFormsControl();
            this.loadFormsArray();
            this.loadFilters();
          }
        });
      });
      console.log("EntroHERERE");
    });
    this.uiService.useCaseStateChanged.next("Editar Voluntario");

    
  }

  loadFilters(){
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
  loadVoluntarioForm() {
    this.voluntarioForm.get("nombre").setValue(this.voluntario.nombre);
    this.voluntarioForm
      .get("apellidoPaterno")
      .setValue(this.voluntario.apellidoPaterno);
    this.voluntarioForm
      .get("apellidoMaterno")
      .setValue(this.voluntario.apellidoMaterno);
    this.voluntarioForm.get("sexo").setValue(this.voluntario.sexo);
    this.voluntarioForm
      .get("fechaNacimiento")
      .setValue(this.voluntario.fechaNacimiento);
    this.voluntarioForm.get("tipoSangre").setValue(this.voluntario.tipoSangre);
    this.voluntarioForm
      .get("licenciaConducir")
      .setValue(this.voluntario.licenciaConducir);
    this.voluntarioForm.get("direccion").setValue(this.voluntario.direccion);
    // this.voluntarioForm.get("alergias").setValue(); this.fb.array([])
    this.voluntarioForm.get("pais").setValue(this.voluntario.pais);
    this.voluntarioForm
      .get("departamento")
      .setValue(this.voluntario.departamento);
    this.voluntarioForm.get("provincia").setValue(this.voluntario.provincia);
    this.voluntarioForm.get("capital").setValue(this.voluntario.capital);
    this.voluntarioForm.get("municipio").setValue(this.voluntario.municipio);
    // this.voluntarioForm.get("timestamp").setValue(); Date.now()
    this.voluntarioForm.get("celular").setValue(this.voluntario.celular);
    this.voluntarioForm
      .get("telefonoFijo")
      .setValue(this.voluntario.telefonoFijo);
    this.voluntarioForm
      .get("numeroCarnetIdentidad")
      .setValue(this.voluntario.numeroCarnetIdentidad);
    this.voluntarioForm
      .get("estadoCivil")
      .setValue(this.voluntario.estadoCivil);
    this.voluntarioForm.get("email").setValue(this.voluntario.email);
    // this.voluntarioForm.get("idiomas").setValue(); this.fb.array([])
    // this.voluntarioForm.get("hoobies").setValue(); this.fb.array([])
    this.voluntarioForm
      .get("nombreTutor")
      .setValue(this.voluntario.nombreTutor);
    this.voluntarioForm
      .get("celularTutor")
      .setValue(this.voluntario.celularTutor);
    //this.voluntarioForm.get("estudiosRealizados").setValue(); this.fb.array([])
    this.voluntarioForm.get("profesion").setValue(this.voluntario.profesion);
    this.voluntarioForm.get("ocupacion").setValue(this.voluntario.ocupacion || "");
    this.voluntarioForm
      .get("situacionLaboral")
      .setValue(this.voluntario.situacionLaboral);
    //this.voluntarioForm.get("experienciaCampoPrimeraRespuesta").setValue(); this.fb.array([])
    this.voluntarioForm.get("grado").setValue(this.voluntario.grado);
    this.voluntarioForm
      .get("armaEspecialidad")
      .setValue(this.voluntario.armaEspecialidad);
    this.voluntarioForm
      .get("numeroCarnetMilitar")
      .setValue(this.voluntario.numeroCarnetMilitar);
    //this.voluntarioForm.get("datosFamiliares").setValue(); this.fb.array([])
    this.voluntarioForm.get("estatura").setValue(this.voluntario.estatura);
    this.voluntarioForm.get("talla").setValue(this.voluntario.talla);
    this.voluntarioForm.get("colorPiel").setValue(this.voluntario.colorPiel);
    this.voluntarioForm.get("colorOjos").setValue(this.voluntario.colorOjos);
    this.voluntarioForm.get("cabello").setValue(this.voluntario.cabello);
    this.voluntarioForm.get("labios").setValue(this.voluntario.labios);
    this.voluntarioForm.get("nariz").setValue(this.voluntario.nariz);
    this.voluntarioForm
      .get("rasgosParticulares")
      .setValue(this.voluntario.rasgosParticulares);
  }
  loadVoluntarioFormVacios() {
    this.voluntarioForm = this.fb.group({
      nombre: ["", [Validators.required]],
      apellidoPaterno: ["", [Validators.required]],
      apellidoMaterno: ["", [Validators.required]],
      sexo: ["", [Validators.required]],
      fechaNacimiento: "",
      tipoSangre: "",
      licenciaConducir: "",
      direccion: "",
      alergias: this.fb.array([]),
      pais: "",
      departamento: "",
      provincia: "",
      capital: "",
      municipio: "",
      timestamp: Date.now(),
      celular: "",
      telefonoFijo: "",
      numeroCarnetIdentidad: "",
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
      rasgosParticulares: ""
    });
  }
  loadVoluntarioForm2() {
    this.voluntarioForm = this.fb.group({
      nombre: [this.voluntario.nombre, [Validators.required]],
      apellidoPaterno: [this.voluntario.apellidoPaterno, [Validators.required]],
      apellidoMaterno: [this.voluntario.apellidoMaterno, [Validators.required]],
      sexo: [this.voluntario.sexo, [Validators.required]],
      fechaNacimiento: this.voluntario.fechaNacimiento,
      tipoSangre: this.voluntario.tipoSangre,
      licenciaConducir: this.voluntario.licenciaConducir,
      direccion: this.voluntario.direccion,
      alergias: this.fb.array([]),
      pais: this.paisFormControl,
      departamento: this.departamentoFormControl,
      provincia: this.provinciaFormControl,
      capital: this.capitalFormControl,
      municipio: this.municipioFormControl,
      timestamp: Date.now(),
      celular: this.voluntario.celular,
      telefonoFijo: this.voluntario.telefonoFijo,
      numeroCarnetIdentidad: this.voluntario.numeroCarnetIdentidad,
      estadoCivil: this.voluntario.estadoCivil,
      email: this.voluntario.email,
      idiomas: this.fb.array([]),
      hoobies: this.fb.array([]),
      nombreTutor: this.voluntario.nombreTutor,
      celularTutor: this.voluntario.celularTutor,
      estudiosRealizados: this.fb.array([]),
      profesion: this.voluntario.profesion,
      ocupacion: this.voluntario.ocupacion,
      situacionLaboral: this.voluntario.situacionLaboral,
      experienciaCampoPrimeraRespuesta: this.fb.array([]),
      grado: this.voluntario.grado,
      armaEspecialidad: this.voluntario.armaEspecialidad,
      numeroCarnetMilitar: this.voluntario.numeroCarnetMilitar,
      datosFamiliares: this.fb.array([]),
      estatura: this.voluntario.estatura,
      talla: this.voluntario.talla,
      colorPiel: this.voluntario.colorPiel,
      colorOjos: this.voluntario.colorOjos,
      cabello: this.voluntario.cabello,
      labios: this.voluntario.labios,
      nariz: this.voluntario.nariz,
      rasgosParticulares: this.voluntario.rasgosParticulares
    });
  }
  loadFormsControl() {
    if (this.voluntario.pais)
      this.paisFormControl.setValue(this.voluntario.pais);
    if (this.voluntario.departamento)
      this.departamentoFormControl.setValue(this.voluntario.departamento);
    if (this.voluntario.provincia)
      this.provinciaFormControl.setValue(this.voluntario.provincia);
    if (this.voluntario.capital)
      this.capitalFormControl.setValue(this.voluntario.capital);
    if (this.voluntario.municipio)
      this.municipioFormControl.setValue(this.voluntario.municipio);
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

  setAlergiasFormArray() {
    if (this.voluntario.alergias) {
      this.voluntario.alergias.forEach(element => {
        this.alergiasFormArray.push(
          this.fb.group({ nombreAlergia: element.nombreAlergia })
        );
      });
    }
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
  setIdiomasFormArray() {
    if (this.voluntario.idiomas) {
      console.log("Cantidad Idiomas:" + this.voluntario.idiomas.length);

      this.voluntario.idiomas.forEach(element => {
        this.idiomasFormArray.push(
          this.fb.group({ nombreIdioma: element.nombreIdioma })
        );
        console.log("CantidadVecesPUsh");
      });
    }
  }

  get idiomasFormArray() {
    console.log(this.voluntarioForm.get("idiomas").value);

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

  setHoobiesFormArray() {
    if (this.voluntario.hoobies) {
      this.voluntario.hoobies.forEach(element => {
        this.hoobiesFormArray.push(
          this.fb.group({ nombreHoobie: element.nombreHoobie })
        );
      });
    }
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

  setEstudioRealizadosFormArray() {
    if (this.voluntario.estudiosRealizados) {
      this.voluntario.estudiosRealizados.forEach(element => {
        this.estudioRealizadosFormArray.push(
          this.fb.group({
            nombreEstudioRealizado: element.nombreEstudioRealizado
          })
        );
      });
    }
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

  setExperienciaCampoPrimeraRespuestasFormArray() {
    if (this.voluntario.experienciaCampoPrimeraRespuesta) {
      this.voluntario.experienciaCampoPrimeraRespuesta.forEach(element => {
        this.experienciaCampoPrimeraRespuestaFormArray.push(
          this.fb.group({
            nombreExperienciaCampoPrimeraRespuesta:
              element.nombreExperienciaCampoPrimeraRespuesta
          })
        );
      });
    }
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

  setDatoFamiliarsFormArray() {
    if (this.voluntario.datosFamiliares) {
      this.voluntario.datosFamiliares.forEach(element => {
        this.datosFamiliaresFormArray.push(
          this.fb.group({
            parentesco: element.parentesco,
            nombre: element.nombre,
            apellido: element.apellido,
            domicilio: element.domicilio,
            celular: element.celular
          })
        );
      });
    }
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

  loadFormsArray() {
    this.setAlergiasFormArray();
    this.setIdiomasFormArray();
    this.setEstudioRealizadosFormArray();
    this.setHoobiesFormArray();
    this.setExperienciaCampoPrimeraRespuestasFormArray();
    this.setDatoFamiliarsFormArray();
  }
  /* async submitHandler() {  //original
    this.loading = true;
    const formValue = this.voluntarioForm.value as VoluntarioModel;

    if(environment.production)
    {
      try {
        await this.afs.collection("voluntarios").add(formValue);
        this.success = true;
        this.openSnackBar('Guardado','ocultar')
        this.router.navigate(['/voluntarios/index']);
        
      } catch (err) {
        console.log(err);
      }
      this.loading = false;
    } else {
      this.voluntarioService.addVoluntario(formValue);
      this.openSnackBar('Guardado','ocultar')
        this.router.navigate(['/voluntarios/index']);
    }
    
  }*/
  async submitHandler() {
    this.loading = true;
    const formValue = this.voluntarioForm.value as VoluntarioModel;
    formValue.id = this.voluntario.id;
    if (await this.voluntarioService.updateVoluntario(formValue)) {
      this.success = true;
      this.openSnackBar("Actualizado Exitosamente", "ocultar");
      this.router.navigate(["/voluntarios/index"]);
    } else {
      this.success = false;
      this.openSnackBar("Ocurrio un error...", "ocultar");
      this.router.navigate(["/voluntarios/index"]);
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
