import { CompaniaService } from "./../../../../../services/compania.service";
import { map } from "rxjs/operators";
import { VoluntarioService } from "./../../../../../services/voluntario.service";
import { Observable } from "rxjs";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges
} from "@angular/core";
import { startWith } from "rxjs/operators";

@Component({
  selector: "app-informacion-personal",
  templateUrl: "./informacion-personal.component.html",
  styleUrls: ["./informacion-personal.component.scss"]
})
export class InformacionPersonalComponent implements OnInit, OnChanges {
  formGroup: FormGroup;

  paisFormControl = new FormControl("");
  departamentoFormControl = new FormControl("");
  provinciaFormControl = new FormControl("");
  capitalFormControl = new FormControl("");
  municipioFormControl = new FormControl("");

  filteredOptions: Observable<string[]>;
  filteredOptionsDepartamento: Observable<string[]>;
  filteredOptionsProvincia: Observable<string[]>;
  filteredOptionsMunicipio: Observable<string[]>;

  imagenPerfil = "";
  companias: any[] = [];

  @Output("IPValue")
  emitter: EventEmitter<any> = new EventEmitter();

  @Input("informacionPersonal")
  informacionPersonalValue: any;
  constructor(
    private fb: FormBuilder,
    private voluntarioService: VoluntarioService,
    private companiaService: CompaniaService
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      nombre: ["", [Validators.required]],
      apellidoPaterno: ["", [Validators.required]],
      apellidoMaterno: ["", [Validators.required]],
      sexo: ["", [Validators.required]],
      fechaNacimiento: ["", [Validators.required]],
      direccion: ["", [Validators.required]],
      pais: this.paisFormControl,
      departamento: this.departamentoFormControl,
      provincia: this.provinciaFormControl,
      capital: this.capitalFormControl,
      municipio: this.municipioFormControl,
      timestamp: Date.now(),
      celular: ["", [Validators.required]],
      telefonoFijo: "",
      numeroCarnetIdentidad: ["", [Validators.required]],
      nombreTutor: ["", [Validators.required]],
      celularTutor: ["", [Validators.required]],
      estado: ["activo", [Validators.required]],
      tipoPersona: ["civil", [Validators.required]],
      grado: [""],
      idCompania: [""]
      // grado: "",
    });

    //    this.companiaService.getCompanias().subscribe(e=>this.companias=e);
    this.companiaService.getCompanias().subscribe(e => {
      this.companias = e;
      console.log(e);
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

    this.formGroup.get("tipoPersona").valueChanges.subscribe(e => {
      this.formGroup.get("grado").setValue("");
      this.formGroup.get("idCompania").setValue("");

      switch (e) {
        case "civil": {
          this.formGroup.get("grado").clearValidators();
          this.formGroup.get("idCompania").clearValidators();
        }
        case "oficial": {
          this.formGroup.get("grado").setValidators([Validators.required]);
          this.formGroup.get("idCompania").clearValidators();
        }
        case "suboficial": {
          this.formGroup.get("grado").setValidators([Validators.required]);
          this.formGroup.get("idCompania").clearValidators();
        }
        case "voluntariosar": {
          this.formGroup.get("grado").setValidators([Validators.required]);
          this.formGroup.get("idCompania").setValidators([Validators.required]);
        }
      }
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.informacionPersonalValue) {
      const ipv: SimpleChange = changes.informacionPersonalValue;
      /* console.log("prev value: ", ipv.previousValue);
      console.log("got name: ", ipv.currentValue); */
      if (this.formGroup) {
        this.formGroup.patchValue(ipv.currentValue);
        this.imagenPerfil=ipv.currentValue.fotoURL;
        this.formGroup.get("grado").setValue(ipv.currentValue.grado);
        this.formGroup.get("idCompania").setValue(ipv.currentValue.idCompania);
      }
    }
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

  set nombre(value: any) {
    this.formGroup.get("nombre").setValue(value);
  }
  set apellidoPaterno(value: any) {
    this.formGroup.get("apellidoPaterno").setValue(value);
  }
  set apellidoMaterno(value: any) {
    this.formGroup.get("apellidoMaterno").setValue(value);
  }
  set fechaNacimiento(value: any) {
    this.formGroup.get("fechaNacimiento").setValue(value);
  }
  set direccion(value: any) {
    this.formGroup.get("direccion").setValue(value);
  }
  set sexo(value: any) {
    this.formGroup.get("sexo").setValue(value);
  }
  set pais(value: any) {
    this.formGroup.get("pais").setValue(value);
  }
  set departamento(value: any) {
    this.formGroup.get("departamento").setValue(value);
  }
  set provincia(value: any) {
    this.formGroup.get("provincia").setValue(value);
  }
  set capital(value: any) {
    this.formGroup.get("capital").setValue(value);
  }
  set municipio(value: any) {
    this.formGroup.get("municipio").setValue(value);
  }
  set timestamp(value: any) {
    this.formGroup.get("timestamp").setValue(value);
  }
  set celular(value: any) {
    this.formGroup.get("celular").setValue(value);
  }
  set telefonoFijo(value: any) {
    this.formGroup.get("telefonoFijo").setValue(value);
  }
  set numeroCarnetIdentidad(value: any) {
    this.formGroup.get("numeroCarnetIdentidad").setValue(value);
  }
  set nombreTutor(value: any) {
    this.formGroup.get("nombreTutor").setValue(value);
  }
  set celularTutor(value: any) {
    this.formGroup.get("celularTutor").setValue(value);
  }
  set estado(value: any) {
    this.formGroup.get("estado").setValue(value);
  }
  // set tipoPersona(value:any){
  //   this.formGroup.get('tipoPersona').setValue(value);
  // }
  set grado(value: any) {
    this.formGroup.get("grado").setValue(value);
  }
  set idCompania(value: any) {
    this.formGroup.get("idCompania").setValue(value);
  }

  tipoPersona(): any {
    return this.formGroup.get("tipoPersona").value;
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

  getValue() {
    let fecha = this.formGroup.get("fechaNacimiento").value;
    if (fecha != "") {
      this.formGroup
        .get("fechaNacimiento")
        .setValue(new Date(fecha).toISOString());
    }
    this.emitter.emit(this.formGroup.value);
  }

  imageReceived($event) {
    console.log("imagen recibida");
    console.log($event);
    if(this.formGroup.get('fotoURL')){
      console.log('Entroaqui 1');
      
      this.formGroup.get('fotoURL').setValue($event);
    } else {
      console.log('Entroaqui 2');
      this.formGroup.addControl("fotoURL", new FormControl($event));
    }
  }
}
