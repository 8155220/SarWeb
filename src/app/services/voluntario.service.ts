import { Observable, Subscriber, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import {
  paisesArray,
  dataBolivia,
  gruposSanguineos,
  situacionLaboral,
  voluntariosLocalArrayAny
} from "../../assets/localdata/arrayData";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { FormGroup } from "@angular/forms";
import { map } from "../../../node_modules/rxjs/operators";
import { environment } from "../../environments/environment";
import { VoluntarioModel } from "../models/voluntario/voluntario.model";
@Injectable({
  providedIn: "root"
})
export class VoluntarioService {
  voluntariosLocalArray: VoluntarioModel[] = [];
  voluntariosCollection: AngularFirestoreCollection<VoluntarioModel>;
  voluntarios: Observable<VoluntarioModel[]>;
  voluntariosLocal: Subject<VoluntarioModel[]> = new Subject<
    VoluntarioModel[]
  >();
  voluntarioDoc: AngularFirestoreDocument<VoluntarioModel>;

  voluntariosBusqueda: VoluntarioModel[];

  constructor(private afs: AngularFirestore) {
    if (environment.production) {
      this.voluntariosCollection = afs.collection<VoluntarioModel>(
        "voluntarios",
        ref => ref.orderBy("timestamp", "desc")
      );
      this.voluntarios = this.voluntariosCollection.snapshotChanges().pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as VoluntarioModel;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
    } else {
      this.voluntarios=this.getVoluntarios(); //Mejorar Codigo
    }
  }

  async submitHandler(
    loading: boolean,
    success: boolean,
    voluntarioForm: FormGroup
  ) {
    loading = true;
    const formValue = voluntarioForm.value;
    try {
      await this.afs.collection("voluntarios2").add(formValue);
      success = true;
    } catch (err) {
      console.log(err);
    }
    loading = false;
  }

  getVoluntarios() {
    if (environment.production) {
      return this.voluntarios;
    } else {
      let voluntarios: Array<VoluntarioModel> = JSON.parse(
        localStorage.getItem("voluntarios") || "[]");
      if(voluntarios.length<10){
        voluntariosLocalArrayAny.forEach(e =>{
          voluntarios.push(e as VoluntarioModel);
        });
      localStorage.setItem('voluntarios',JSON.stringify(voluntarios));
      }
      let voluntariosModel: VoluntarioModel[] = [];
      for (let voluntario of voluntarios) {
        voluntariosModel.push(new VoluntarioModel(voluntario));
      }
      voluntariosModel.sort((a, b) => {
        return b.timestamp - a.timestamp;
      });

      return Observable.create((observer:Subscriber<VoluntarioModel[]>)=>{
        observer.next(voluntariosModel);
        observer.complete();
      });
    }
  }
  deleteVoluntario(id: string) {
    if(environment.production)
    {
      this.afs
      .collection("voluntarios")
      .doc(id)
      .delete();
    } else {
      this.deleteVoluntarioLocal(id);
    }
    
  }
  deleteVoluntarioLocal(id:string){
    let voluntarios: Array<VoluntarioModel> = JSON.parse(
      localStorage.getItem('voluntarios') || "[]"
    );
    voluntarios.forEach((item,index)=>{
      if(item.id==id){        
        voluntarios.splice(index,1);
      }
    });
    localStorage.setItem('voluntarios',JSON.stringify(voluntarios));
    return true;
  }

  async addVoluntario(voluntario: VoluntarioModel) {
    if (environment.production) {
      try {
        await this.afs.collection("voluntarios").add(voluntario);
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    } else {
      this.addVoluntarioLocal(voluntario);
      return true;
    }
  }
  addVoluntarioLocal(voluntario: VoluntarioModel) {

    voluntario.id=voluntario.timestamp.toString();
    let voluntarios: Array<VoluntarioModel> = JSON.parse(
      localStorage.getItem('voluntarios') || "[]"
    );
    voluntarios.forEach((item,index)=>{
      if(item.id==voluntario.id){        
        voluntarios.splice(index,1);
      }
    });
    voluntarios.push(voluntario);
    localStorage.setItem('voluntarios',JSON.stringify(voluntarios));
    return true;
  }

  getPaises(): string[] {
    return paisesArray;
  }
  getDepartamentos(pais: string): string[] {
    if (pais == "Bolivia") {
      let departamentos: string[] = [];
      dataBolivia["departamentos"].forEach(element => {
        departamentos.push(element.nombreDepartamento);
      });
      return departamentos;
    }
    return [];
  }

  getProvincias(departamento: string): string[] {
    let provincias: string[] = [];
    dataBolivia["departamentos"].forEach(itemDepartamento => {
      if (itemDepartamento.nombreDepartamento == departamento) {
        if (itemDepartamento.provincias) {
          itemDepartamento.provincias.forEach(itemProvincia => {
            console.log("aqui:" + itemProvincia.nombreProvincia);
            provincias.push(itemProvincia.nombreProvincia);
          });
        }
      }
    });
    return provincias;
  }

  getCapitals(departamento: string, provincia: string): string[] {
    let capitals: string[] = [];
    dataBolivia["departamentos"].forEach(itemDepartamento => {
      if (itemDepartamento.nombreDepartamento == departamento) {
        if (itemDepartamento.provincias) {
          itemDepartamento.provincias.forEach(pro => {
            if (pro.nombreProvincia == provincia) {
              pro.capitales.forEach(ele => {
                capitals.push(ele.nombreCapital);
              });
            }
          });
        }
      }
    });
    return capitals;
  }
  VoluntariosLocalEmmit() {
    this.voluntariosLocalArray.sort((a, b) => {
      return b.timestamp - a.timestamp;
    });
    this.voluntariosLocal.next(this.voluntariosLocalArray);
  }
  getGrupoSanguineo(): any {
    return gruposSanguineos;
  }
  getMunicipios(
    departamento: string,
    provincia: string,
    capital: string
  ): string[] {
    let municipios: string[] = [];

    dataBolivia["departamentos"].forEach(itemDepartamento => {
      if (
        itemDepartamento.nombreDepartamento == departamento &&
        itemDepartamento.provincias
      ) {
        itemDepartamento.provincias.forEach(itemProvincia => {
          if (
            itemProvincia.nombreProvincia == provincia &&
            itemProvincia.capitales
          ) {
            itemProvincia.capitales.forEach(itemCapital => {
              if (
                itemCapital.nombreCapital == capital &&
                itemCapital.municipios
              ) {
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
  getSituacionLaboral(): any[] {
    return situacionLaboral;
  }
}
