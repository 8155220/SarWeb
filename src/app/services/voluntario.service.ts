import { Observable } from 'rxjs';
import { VoluntarioModel } from './../models/voluntario/voluntario.model';
import { Injectable } from '@angular/core';
import { paisesArray, dataBolivia, gruposSanguineos,situacionLaboral } from '../../assets/localdata/arrayData';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore'; 
import { FormGroup } from '@angular/forms';
import { map } from '../../../node_modules/rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class VoluntarioService {

  voluntariosCollection: AngularFirestoreCollection<VoluntarioModel>;
  voluntarios: Observable<VoluntarioModel[]>;
  voluntarioDoc: AngularFirestoreDocument<VoluntarioModel>;

  voluntariosBusqueda: VoluntarioModel[];

  constructor(private afs:AngularFirestore) {
    this.voluntariosCollection = afs.collection<VoluntarioModel>('voluntarios');
    this.voluntarios = this.voluntariosCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as VoluntarioModel;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
   }

  getPaises():string[]{
    return paisesArray;
  }
  getDepartamentos(pais:string):string[]{
    if(pais=='Bolivia')
    {
      let departamentos:string[] =[];
      dataBolivia['departamentos'].forEach(element => {
        departamentos.push(element.nombreDepartamento);
      });
      return departamentos;
    }
    return [];
  }

  getProvincias(departamento:string):string[]{
    let provincias:string[] =[];
    dataBolivia['departamentos'].forEach(itemDepartamento=>{
      if(itemDepartamento.nombreDepartamento==departamento){ 
        if(itemDepartamento.provincias){
          itemDepartamento.provincias.forEach(itemProvincia => {
            console.log("aqui:"+itemProvincia.nombreProvincia);
            provincias.push(itemProvincia.nombreProvincia); 
        });
        }
      }
    });
    return provincias;
  }
  
  getCapitals(departamento:string,provincia:string):string[]{
    let capitals:string[] =[];
    dataBolivia['departamentos'].forEach(itemDepartamento=>{
      if(itemDepartamento.nombreDepartamento==departamento){
        if(itemDepartamento.provincias){
          itemDepartamento.provincias.forEach(pro => {
            if(pro.nombreProvincia==provincia)
            {
              pro.capitales.forEach(ele=>{
                capitals.push(ele.nombreCapital);
              });
            }
          });
        }
      }
    });
    return capitals;
  }
  getGrupoSanguineo():any{
    return gruposSanguineos;
  }
  getMunicipios(departamento:string,provincia:string,capital:string):string[]{

    let municipios:string[] =[];

    dataBolivia['departamentos'].forEach(itemDepartamento=>{
      if(itemDepartamento.nombreDepartamento==departamento && itemDepartamento.provincias){
        itemDepartamento.provincias.forEach(itemProvincia => {
          if(itemProvincia.nombreProvincia==provincia && itemProvincia.capitales)
          {
            
            itemProvincia.capitales.forEach(itemCapital=>{

              if(itemCapital.nombreCapital==capital && itemCapital.municipios)
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
  getSituacionLaboral():any[]{
    return situacionLaboral;
  }

  async submitHandler(loading:boolean,success:boolean,voluntarioForm:FormGroup){
    loading=true;
    const formValue=voluntarioForm.value;
    try{
      await this.afs.collection('voluntarios2').add(formValue);
      success=true;
    }
    catch(err){
      console.log(err);
      
    }
    loading=false;
  }

  getVoluntarios(){
      return this.voluntarios;
  }
}
