import { environment } from "../../../../../environments/environment";
import { VoluntarioModel } from "../../../../models/voluntario/voluntario.model";
import { UiService } from "../../../../services/ui.service";
import { AngularFirestore } from "angularfire2/firestore";
import { VoluntarioService } from "../../../../services/voluntario.service";
import { Observable } from "rxjs";
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
  success = false;
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
      fechaNacimiento: "",
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

  preview_image(event) {
    console.log("EntroPreview_Image");

    let reader = new FileReader();
    reader.onload = (eventReader: any) => {
      //let output = document.getElementById('output_image');   //esta linea genera error en typescript solucion abajo
      let output = <HTMLInputElement>document.getElementById("output_image");
      output.src = reader.result;
      //
      let image = new Image();
      image.onload = event => {
        console.log("EntroPreview_Image2");
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        canvas.width = 400;
        canvas.height = 400;
        context.drawImage(
          image,
          0,
          0,
          image.width,
          image.height,
          0,
          0,
          canvas.width,
          canvas.height
        );
        output.src = canvas.toDataURL();
        this.imagenPerfil = canvas.toDataURL();
        console.log("Entro aqui 2232");
      };
      image.src = event.target.result;
      /*image.onload = function() {
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        canvas.width = image.width / 4;
        canvas.height = image.height / 4;
        context.drawImage(
          image,
          0,
          0,
          image.width,
          image.height,
          0,
          0,
          canvas.width,
          canvas.height
        );
        output.src =  canvas.toDataURL();
        //this.imagenPerfil =  canvas.toDataURL();
        //this.setImagenPerfil(canvas.toDataURL());
      };*/
      //
    };

    //this.imagenPerfil = event.target.files[0];
    reader.readAsDataURL(event.target.files[0]);
  }

  loadImageFile() {
    var uploadImage = <HTMLInputElement>document.getElementById("upload-Image");

    //check and retuns the length of uploded file.
    if (uploadImage.files.length === 0) {
      return;
    }

    //Is Used for validate a valid file.
    var uploadFile = (<HTMLInputElement>document.getElementById("upload-Image"))
      .files[0];
    /*if (!filterType.test(uploadFile.type)) {
      alert("Please select a valid image.");
      return;
    }*/

    this.fileReader.readAsDataURL(uploadFile);
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
    formValue.fotoURL = this.imagenPerfil;
    if (await this.voluntarioService.addVoluntario(formValue)) {
      this.success = true;
      this.openSnackBar("Registrado Exitosamente", "ocultar");
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
