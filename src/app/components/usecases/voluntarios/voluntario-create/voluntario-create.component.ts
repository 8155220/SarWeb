import { VoluntarioService } from './../../../../services/voluntario.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";

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

  constructor(private fb: FormBuilder,private voluntarioService:VoluntarioService) {
  }

  getGrupoSanguineo():any{
    return this.voluntarioService.getGrupoSanguineo();
  }
  ngOnInit() {
    

    this.voluntarioForm = this.fb.group({
      nombre: "",  
      apellidoPaterno: "",
      apellidoMaterno: "",
      sexo: "",
      fechaNacimiento: "",
      tipoSangre: "",
      licenciaConducir: "false",
      direccion: "",
      alergias: "", //pendiente

      pais: this.paisFormControl,
      departamento:this.departamentoFormControl,
      provincia: this.provinciaFormControl,
      capital:this.capitalFormControl,
      municipio:this.municipioFormControl,

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

    this.filteredOptions = this.paisFormControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.filteredOptionsDepartamento = this.departamentoFormControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this.filtrar(value,this.getDepartamentos()))
    );

    this.filteredOptionsProvincia = this.provinciaFormControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this.filtrar(value,this.getProvincias()))
    );

    this.filteredOptionsMunicipio = this.municipioFormControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this.filtrar(value,this.getMunicipios()))
    );
  }

  getPaises():string[]{
    return this.voluntarioService.getPaises();
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.getPaises().filter(option => option.toLowerCase().includes(filterValue));
  }
  
  public filtrar(value: string,array:string[]): string[] {
    const filterValue = value.toLowerCase();
    return array.filter(option => option.toLowerCase().includes(filterValue));
  }

  getDepartamentos():string[]{
    return this.voluntarioService.getDepartamentos(this.paisFormControl.value);
  }
  getProvincias():string[]{
    return this.voluntarioService.getProvincias(this.departamentoFormControl.value);
  }
  getCapitals():string[]{
    return this.voluntarioService.getCapitals(this.departamentoFormControl.value,this.provinciaFormControl.value);
  }
  getMunicipios():string[]{
    return this.voluntarioService.getMunicipios(this.departamentoFormControl.value,this.provinciaFormControl.value,
    this.capitalFormControl.value);
  }
}
