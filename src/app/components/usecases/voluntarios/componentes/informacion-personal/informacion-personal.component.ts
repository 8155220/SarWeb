import { CompaniaService } from './../../../../../services/compania.service';
import { map } from 'rxjs/operators';
import { VoluntarioService } from './../../../../../services/voluntario.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-informacion-personal',
  templateUrl: './informacion-personal.component.html',
  styleUrls: ['./informacion-personal.component.scss']
})
export class InformacionPersonalComponent implements OnInit {
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
  companias:any[]=[];

  @Output('IPValue') emitter:EventEmitter<any>=new EventEmitter();
  constructor(private fb: FormBuilder,
  private voluntarioService: VoluntarioService,private companiaService:CompaniaService) { }

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
      estado:["activo", [Validators.required]],
      tipoPersona:["civil", [Validators.required]],
      grado:["", [Validators.required]],
      companiaId:["", [Validators.required]],
      // grado: "", 
    });

//    this.companiaService.getCompanias().subscribe(e=>this.companias=e);
    this.companiaService.getCompanias().subscribe(e=>{
      this.companias=e;
      console.log(e);
      
    }
    );
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

    this.formGroup.get('tipoPersona').valueChanges.subscribe(e =>{
      console.log(e);
      this.formGroup.get('grado').setValue("");
      this.formGroup.get('companiaId').setValue("");
    });

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

  tipoPersona():string{
    return this.formGroup.get('tipoPersona').value;
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


  getValue(){
    this.emitter.emit(this.formGroup.value);
  }
}
