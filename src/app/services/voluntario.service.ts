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

  constructor(
    private afs: AngularFirestore,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {
    /*if (environment.production) {
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
    }*/
    //this.voluntariosRef = this.db.list<VoluntarioModel>("voluntarios");
    this.voluntariosRef = this.db.list<VoluntarioModel>("voluntarios2");
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
      await this.afs.collection("voluntarios2").add(formValue);
      success = true;
    } catch (err) {
      console.log(err);
    }
    loading = false;
  }

  getVoluntarios() {
    if (this.dataBaseType == DatabaseType.FIRESTORE) {
      if (environment.production) {
        this.voluntariosCollection = this.afs.collection<VoluntarioModel>(
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
        return this.voluntarios;
      } else {
        let voluntarios: Array<VoluntarioModel> = JSON.parse(
          localStorage.getItem("voluntarios") || "[]"
        );
        if (voluntarios.length < 10) {
          voluntariosLocalArrayAny.forEach(e => {
            voluntarios.push(e as VoluntarioModel);
          });
          localStorage.setItem("voluntarios", JSON.stringify(voluntarios));
        }
        let voluntariosModel: VoluntarioModel[] = [];
        for (let voluntario of voluntarios) {
          voluntariosModel.push(new VoluntarioModel(voluntario));
        }
        voluntariosModel.sort((a, b) => {
          return b.timestamp - a.timestamp;
        });

        return Observable.create((observer: Subscriber<VoluntarioModel[]>) => {
          observer.next(voluntariosModel);
          observer.complete();
        });
      }
    } else if (this.dataBaseType == DatabaseType.REALTIMEDATABASE) {
      //this.voluntariosRef = this.db.list<VoluntarioModel>("voluntarios");

      const data = this.db
        .list<VoluntarioModel>("voluntarios")
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
    let voluntario: VoluntarioModel;
    this.voluntarios.subscribe(voluntarios => {
      voluntarios.forEach(e => {
        console.log("Entro getVoluntario ForeaCH");

        if (e.id == id) {
          voluntario = new VoluntarioModel(e);
        }
      });
    });
    return voluntario;
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
  async addVoluntario(voluntario: VoluntarioModel) {
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

      task.snapshotChanges().pipe(
        finalize(()=>{
          console.log('ENVIADO2 ');
          fileRef.getDownloadURL().subscribe(item=>{
            voluntario.fotoURL=item;
            console.log(item);
            this.voluntariosRef.push(voluntario);
            console.log('ENVIADO ');
          
          });

        } )
      ).subscribe();

      return true;
    }
  }
  async updateVoluntario(voluntario: VoluntarioModel) {
    if (this.dataBaseType == DatabaseType.FIRESTORE) {
      if (environment.production) {
        try {
          console.log(voluntario);

          await this.afs
            .collection("voluntarios")
            .doc(voluntario.id)
            .update(voluntario);
          //await this.voluntarioDoc
          return true;
        } catch (err) {
          console.log(err);
          return false;
        }
      } else {
        this.updateVoluntarioLocal(voluntario);
        return true;
      }
    } else if (this.dataBaseType == DatabaseType.REALTIMEDATABASE) {
      this.voluntariosRef.update(voluntario.id, voluntario);
      return true;
    }
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

  uploadFile(file) {
    const filePath = "/root";
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    return task;
  }
}
