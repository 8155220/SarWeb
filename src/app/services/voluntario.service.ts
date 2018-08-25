import { Injectable } from '@angular/core';
import { paisesArray, dataBolivia, gruposSanguineos } from '../../assets/localdata/arrayData';
@Injectable({
  providedIn: 'root'
})
export class VoluntarioService {

  constructor() { }




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
}
