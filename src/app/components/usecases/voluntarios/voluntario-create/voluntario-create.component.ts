import { element } from 'protractor';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { paisesArray, departamentosBoliviaArray, dataBolivia, gruposSanguineos } from '../../../../../assets/localdata/arrayData';
// import paisesArray from '../../../../../assets/localdata/arrayData';

@Component({
  selector: "app-voluntario-create",
  templateUrl: "./voluntario-create.component.html",
  styleUrls: ["./voluntario-create.component.css"]
})
export class VoluntarioCreateComponent implements OnInit {

  voluntarioForm: FormGroup;
  gruposSanguineos=gruposSanguineos;
  //Ubicacion
  paisFormControl = new FormControl();
  departamentoFormControl = new FormControl();
  provinciaFormControl = new FormControl();
  capitalFormControl = new FormControl();
  municipioFormControl = new FormControl();


  dataBolivia=dataBolivia;
  filteredOptions: Observable<string[]>;
  filteredOptionsDepartamento: Observable<string[]>;

  constructor(private fb: FormBuilder) {
  }

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
    this.voluntarioForm.valueChanges.subscribe(console.log);

    //this.filteredOptions = this.voluntarioForm.value('pais');

    this.filteredOptions = this.paisFormControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.filteredOptionsDepartamento = this.departamentoFormControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return paisesArray.filter(option => option.toLowerCase().includes(filterValue));
  }

  getDepartamentos():string[]{

    if(this.paisFormControl.value=='Bolivia')
    {
      let departamentos:string[] =[];
      dataBolivia['departamentos'].forEach(element => {
        
        departamentos.push(element.nombreDepartamento);
      });
      return departamentos;
    }
    return [];
  }
  getProvincias():string[]{
    let pais:string = this.paisFormControl.value;
    let departamento:string = this.departamentoFormControl.value;
    let provincias:string[] =[];
    dataBolivia['departamentos'].forEach(element=>{
      if(element.nombreDepartamento==departamento){
        element.provincias.forEach(provincia => {
          provincias.push(provincia.nombreProvincia); 
        });
      }
    });
    return provincias;
  }
  
  getCapitals():string[]{
    let pais:string = this.paisFormControl.value;
    let departamento:string = this.departamentoFormControl.value;
    let provincia:string = this.provinciaFormControl.value;

    let capitals:string[] =[];
    dataBolivia['departamentos'].forEach(element=>{
      if(element.nombreDepartamento==departamento){
        element.provincias.forEach(pro => {
          if(pro.nombreProvincia==provincia)
          {
            pro.capitales.forEach(ele=>{
              capitals.push(ele.nombreCapital);
            });
          }
        });
      }
    });
    return capitals;
  }
  
  getMunicipios():string[]{
    let pais:string = this.paisFormControl.value;
    let departamento:string = this.departamentoFormControl.value;
    let provincia:string = this.provinciaFormControl.value;
    let capital:string =this.capitalFormControl.value;

    let municipios:string[] =[];

    dataBolivia['departamentos'].forEach(itemDepartamento=>{
      if(itemDepartamento.nombreDepartamento==departamento){
        itemDepartamento.provincias.forEach(itemProvincia => {
          if(itemProvincia.nombreProvincia==provincia)
          {
            itemProvincia.capitales.forEach(itemCapital=>{

              if(itemCapital.nombreCapital==capital)
              {
                itemCapital.municipios.forEach(itemMunicipio => {

                  municipios.push(itemMunicipio.nombreMunicipio);
                });
              }
            });
          }
        });
      }
    });
    return municipios;
  }

}
