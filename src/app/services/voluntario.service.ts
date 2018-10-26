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
import { map, finalize } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { VoluntarioModel } from "../models/voluntario/voluntario.model";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireStorage } from "angularfire2/storage";

enum DatabaseType {
  FIRESTORE,
  REALTIMEDATABASE
}

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
  dataBaseType: DatabaseType = DatabaseType.REALTIMEDATABASE;
  voluntariosRef;

  loading = false;
  VOLUNTARIOS_PATH = "voluntarios2";
  constructor(
    private afs: AngularFirestore,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {
    this.voluntariosRef = this.db.list<VoluntarioModel>(this.VOLUNTARIOS_PATH);
    this.voluntarios = this.getVoluntarios();
  }

  async submitHandler(
    loading: boolean,
    success: boolean,
    voluntarioForm: FormGroup
  ) {
    loading = true;
    const formValue = voluntarioForm.value;
    try {
      await this.afs.collection(this.VOLUNTARIOS_PATH).add(formValue);
      success = true;
    } catch (err) {
      console.log(err);
    }
    loading = false;
  }

  getVoluntarios() {
    if (this.dataBaseType == DatabaseType.REALTIMEDATABASE) {
      //this.voluntariosRef = this.db.list<VoluntarioModel>("voluntarios");
      const data = this.db
        .list<VoluntarioModel>(this.VOLUNTARIOS_PATH)
        .snapshotChanges()
        .pipe(
          map(changes =>
            changes.map(c => ({ id: c.payload.key, ...c.payload.val() }))
          )
        );

      return data;
    }
  }

  getVoluntario(id: string) {
    return this.db.object(`${this.VOLUNTARIOS_PATH}/${id}`).valueChanges();
  }

  deleteVoluntario(id: string) {
    if (this.dataBaseType == DatabaseType.FIRESTORE) {
      if (environment.production) {
        this.afs
          .collection("voluntarios")
          .doc(id)
          .delete();
      } else {
        this.deleteVoluntarioLocal(id);
      }
    } else if (this.dataBaseType == DatabaseType.REALTIMEDATABASE) {
      this.voluntariosRef.remove(id);
    }
  }
  deleteVoluntarioLocal(id: string) {
    let voluntarios: Array<VoluntarioModel> = JSON.parse(
      localStorage.getItem("voluntarios") || "[]"
    );
    voluntarios.forEach((item, index) => {
      if (item.id == id) {
        voluntarios.splice(index, 1);
      }
    });
    localStorage.setItem("voluntarios", JSON.stringify(voluntarios));
    return true;
  }

  cargarVoluntariosFirebaseDatabase() {
    voluntariosLocalArrayAny.forEach(e => {
      this.voluntariosRef.set(e.id, e);
    });
  }
  addVoluntario(voluntario: VoluntarioModel) {
    if (voluntario.fotoURL != "") {
      const filePath = "/usuarios/dsds454" + voluntario.numeroCarnetIdentidad;
      const fileRef = this.storage.ref(filePath);
      const task = fileRef.putString(voluntario.fotoURL, "data_url");
      return task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(item => {
            voluntario.fotoURL = item;
            this.voluntariosRef.push(voluntario);
          });
        })
      );
    } else {
      console.log("antesde enviar");
      console.log(voluntario);
      this.voluntariosRef.push(voluntario);
    }
  }
  /* async addVoluntario(voluntario: VoluntarioModel) {
    if (this.dataBaseType == DatabaseType.FIRESTORE) {
      if (environment.production) {
        try {
          await this.afs.collection("voluntarios").add(voluntario);
          console.log("EExito");
          return true;
        } catch (err) {
          console.log("Error");
          console.log(err);
          return false;
        }
      } else {
        this.addVoluntarioLocal(voluntario);
        return true;
      }
    } else if (this.dataBaseType == DatabaseType.REALTIMEDATABASE) {
      console.log(voluntario.fotoURL);
      // const ref= this.db.push();
      //const voluntariosRef = this.db.object('voluntarios');
      const filePath = "/usuarios/dsds"+voluntario.numeroCarnetIdentidad;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, voluntario.fotoURL);
      //return task;

      return task.snapshotChanges().pipe(
        finalize(()=>{
          console.log('ENVIADO2 ');
          fileRef.getDownloadURL().subscribe(item=>{
            voluntario.fotoURL=item;
            console.log(item);
            this.voluntariosRef.push(voluntario);
            console.log('ENVIADO ');
          });

        } )
      );

    }
  }*/
  updateVoluntario(voluntario: VoluntarioModel) {
    if (voluntario.fotoURL != "") {
      const filePath = "/usuarios/gy45hgh" + voluntario.numeroCarnetIdentidad;
      const fileRef = this.storage.ref(filePath);
      const task = fileRef.putString(voluntario.fotoURL, "data_url");
      return task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(item => {
            voluntario.fotoURL = item;
            this.voluntariosRef.update(voluntario.id, voluntario);
          });
        })
      );
    } else {
      this.voluntariosRef.update(voluntario.id, voluntario);
    }
  }
  updateVoluntarioSinImagen(voluntario: VoluntarioModel) {
    this.voluntariosRef.update(voluntario.id, voluntario);
  }

  updateVoluntarioLocal(voluntario: VoluntarioModel) {
    let voluntarios: Array<VoluntarioModel> = JSON.parse(
      localStorage.getItem("voluntarios") || "[]"
    );
    voluntarios.forEach((item, index) => {
      if (item.id == voluntario.id) {
        voluntarios.splice(index, 1);
      }
    });
    voluntarios.push(voluntario);
    localStorage.setItem("voluntarios", JSON.stringify(voluntarios));
    return true;
  }
  addVoluntarioLocal(voluntario: VoluntarioModel) {
    if (!voluntario.id) {
      voluntario.id = voluntario.timestamp.toString();
    }
    let voluntarios: Array<VoluntarioModel> = JSON.parse(
      localStorage.getItem("voluntarios") || "[]"
    );
    voluntarios.forEach((item, index) => {
      if (item.id == voluntario.id) {
        voluntarios.splice(index, 1);
      }
    });
    voluntarios.push(voluntario);
    localStorage.setItem("voluntarios", JSON.stringify(voluntarios));
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

  // getGrados():any[]{

  // }
}
