import { AuthService } from './auth.service';
import { Observable, Subscriber, Subject, from } from "rxjs";
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
import { map, finalize, switchMap } from 'rxjs/operators';
import { environment } from "../../environments/environment";
import { VoluntarioModel } from "../models/voluntario/voluntario.model";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireStorage } from "angularfire2/storage";
import { CompaniaService } from "./compania.service";
import * as faker from 'faker/locale/es_MX'
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
  familiaresRef;
  informacionAdicionalRef;
  datosFisicosRef;
  companiasRef;

  loading = false;
  VOLUNTARIOS_PATH = "personas";
  FAMILIARES_PATH = "familiares";
  INFORMACION_ADICIONAL_PATH = "informacionAdicional";
  DATOS_FISICOS_PATH = "datosFisicos";
  COMPANIAS_PATH = "companias";
  PRIVILEGIOS_PATH = "privilegios";
  constructor(
    private companiaService: CompaniaService,
    private afs: AngularFirestore,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private auth:AuthService
  ) {
    this.voluntariosRef = this.db.list<VoluntarioModel>(this.VOLUNTARIOS_PATH);
    this.familiaresRef = this.db.list<any>(this.FAMILIARES_PATH);
    this.informacionAdicionalRef = this.db.list<any>(
      this.INFORMACION_ADICIONAL_PATH
    );
    this.datosFisicosRef = this.db.list<any>(this.DATOS_FISICOS_PATH);
    this.companiasRef = this.db.list<any>(this.COMPANIAS_PATH);
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
    return this.db.object(`${this.VOLUNTARIOS_PATH}/${id}`).snapshotChanges()
    .pipe(
      map(c=> ({ id: c.payload.key, ...c.payload.val() })
      )
    );
  }
  getPersonaLogInData():Observable<any> {
   /* if(this.auth.user){
      return this.db.list(`${this.VOLUNTARIOS_PATH}`,ref=> ref.orderByChild('email').equalTo(email).limitToFirst(1))
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ id: c.payload.key, ...c.payload.val() }))
        )
        );
    }*/
   /* this.auth.user.subscribe(e=>{
      console.log("Estado Auth");
      console.log(e);
      
      
      return this.db.list(`${this.VOLUNTARIOS_PATH}`,ref=> ref.orderByChild('email').equalTo(e.email).limitToFirst(1))
      .snapshotChanges()
      .pipe(
        map(changes =>{
          console.log('Changes');
          console.log(changes);
          return  changes.map(c => ({ id: c.payload.key, ...c.payload.val() }))
        }
        )
        );
    })*/

    return this.auth.user.pipe
    (switchMap(e=> this.db.list(`${this.VOLUNTARIOS_PATH}`,ref=> ref.orderByChild('email').equalTo(e.email).limitToFirst(1))
    .snapshotChanges()
    .pipe(
      map(changes =>{
        console.log('Changes');
        console.log(changes);
        return  changes.map(c => ({ id: c.payload.key, ...c.payload.val() }))
        }
      )
      )))


   /* this.auth.user.subscribe(e=>{
      console.log("Estado Auth");
      console.log(e);
      
      
      return this.db.list(`${this.VOLUNTARIOS_PATH}`,ref=> ref.orderByChild('email').equalTo(e.email).limitToFirst(1))
      .snapshotChanges()
      .pipe(
        map(changes =>{
          console.log('Changes');
          console.log(changes);
          return  changes.map(c => ({ id: c.payload.key, ...c.payload.val() }))
        }
        )
        );
    })*/
  }

  deleteVoluntario(id: string) {
    this.getVoluntario(id).subscribe((e:any)=> {
      this.db.object(`${this.DATOS_FISICOS_PATH}/${id}`).remove();
      this.db.object(`${this.FAMILIARES_PATH}/${id}`).remove();
      this.db.object(`${this.INFORMACION_ADICIONAL_PATH}/${id}`).remove();
      if ((e.tipoPersona = "voluntariosar")) {
        this.companiaService.deleteVoluntarioCompania(id, e.idCompania);
      }
      this.db.object(`${this.VOLUNTARIOS_PATH}/${id}`).remove();
    });

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
  addVoluntario(
    voluntario: any,
    datosFisicos: any,
    familiares: any,
    informacionAdicional: any
  ) {
    if (voluntario.fotoURL && voluntario.fotoURL != "") {
      console.log(voluntario);

      const filePath = "/usuarios/dsds454" + voluntario.numeroCarnetIdentidad;
      const fileRef = this.storage.ref(filePath);
      const task = fileRef.putString(voluntario.fotoURL, "data_url");
      return task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(item => {
            voluntario.fotoURL = item;
            this.voluntariosRef.push(voluntario).then(item => {
              this.db
                .object(`${this.DATOS_FISICOS_PATH}/${item.key}`)
                .set(datosFisicos);
              this.db
                .object(`${this.FAMILIARES_PATH}/${item.key}`)
                .set(familiares);
              this.db
                .object(`${this.INFORMACION_ADICIONAL_PATH}/${item.key}`)
                .set(informacionAdicional);
              if ((voluntario.tipoPersona = "voluntariosar")) {
                this.companiaService.addVoluntarioCompania(
                  item.key,
                  voluntario.idCompania
                );
              }
            });
          });
        })
      );
    } else {
      let promise = this.voluntariosRef.push(voluntario).then(item => {
        this.db
          .object(`${this.DATOS_FISICOS_PATH}/${item.key}`)
          .set(datosFisicos);
        this.db.object(`${this.FAMILIARES_PATH}/${item.key}`).set(familiares);
        this.db
          .object(`${this.INFORMACION_ADICIONAL_PATH}/${item.key}`)
          .set(informacionAdicional);
        if ((voluntario.tipoPersona = "voluntariosar")) {
          this.companiaService.addVoluntarioCompania(
            item.key,
            voluntario.idCompania
          );
        }
      });
      return from(promise);
    }
  }
  testPushEmergencia(dato: any) {
    this.voluntariosRef.push(dato).then(item => {
      console.log(item.key);
    });
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
  updateVoluntario(
    id: string,
    voluntario: any,
    datosFisicos: any,
    familiares: any,
    informacionAdicional: any,
    informacionPersonalPrevValue: any
  ) {
    if (voluntario.fotoURL && voluntario.fotoURL != "") {
      const filePath = "/usuarios/gy45hgh" + voluntario.numeroCarnetIdentidad;
      const fileRef = this.storage.ref(filePath);
      const task = fileRef.putString(voluntario.fotoURL, "data_url");
      return task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(item => {
            voluntario.fotoURL = item;
            this.voluntariosRef.update(id, voluntario);
            this.db
              .object(`${this.DATOS_FISICOS_PATH}/${id}`)
              .set(datosFisicos);
            this.db.object(`${this.FAMILIARES_PATH}/${id}`).set(familiares);
            this.db
              .object(`${this.INFORMACION_ADICIONAL_PATH}/${id}`)
              .set(informacionAdicional);
            if ((voluntario.tipoPersona = "voluntariosar")) {
              this.companiaService.updateVoluntarioCompania(
                id,
                voluntario.idCompania,
                informacionPersonalPrevValue.idCompania
              );
            }
            //esto deberia llamar a el servicio Compania

            //
          });
        })
      );
    } else {
      let promise = this.voluntariosRef.update(id, voluntario);
      this.db.object(`${this.DATOS_FISICOS_PATH}/${id}`).set(datosFisicos);
      this.db.object(`${this.FAMILIARES_PATH}/${id}`).set(familiares);
      this.db
        .object(`${this.INFORMACION_ADICIONAL_PATH}/${id}`)
        .set(informacionAdicional);
      if ((voluntario.tipoPersona = "voluntariosar")) {
        this.companiaService.updateVoluntarioCompania(
          id,
          voluntario.idCompania,
          informacionPersonalPrevValue.idCompania
        );
      }
      return from(promise);
    }
  }
  /* updateVoluntario(voluntario: VoluntarioModel) {
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
  } */
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

  getInformacionPersonal(idpersona: string) {
    return this.db
      .object(`${this.VOLUNTARIOS_PATH}/${idpersona}`)
      .valueChanges();
  }

  getDatosFisicos(idpersona: string) {
    return this.db
      .object(`${this.DATOS_FISICOS_PATH}/${idpersona}`)
      .valueChanges();
  }
  getFamiliares(idpersona: string) {
    return this.db
      .object(`${this.FAMILIARES_PATH}/${idpersona}`)
      .valueChanges();
  }
  getInformacionAdicional(idpersona: string) {
    return this.db
      .object(`${this.INFORMACION_ADICIONAL_PATH}/${idpersona}`)
      .valueChanges();
  }

  getPersonas(start,end){
    return this.db.list(this.VOLUNTARIOS_PATH,ref=> ref.orderByChild('nombreCompleto').startAt(start).endAt(end).limitToFirst(20))
    .snapshotChanges()
        .pipe(
          map(changes =>
            changes.map(c => ({ id: c.payload.key, ...c.payload.val() }))
          )
        );
  }

  getVoluntariosGrado(grado:string){
    return this.db.list(this.VOLUNTARIOS_PATH,ref=> ref.orderByChild('grado').equalTo(grado))
    .snapshotChanges()
        .pipe(
          map(changes =>
            changes.map(c => ({ id: c.payload.key, ...c.payload.val() }))
          )
        );
  }

 /* getPrivilegiosPersonaFromEmail(email:string){
    return this.db.list(this.VOLUNTARIOS_PATH,ref=> ref.orderByChild('email').equalTo(email).limitToFirst(1))
    .valueChanges()
    .pipe(switchMap((e:any)=>this.db.object(`${this.PRIVILEGIOS_PATH}/${e.privilegioId}`).valueChanges()))
  }*/

  generarVoluntarios(){
    //let r = Math.random().toString(36).substring(7);
  //console.log("random", r);
  this.db.list<VoluntarioModel>('personas').remove();
    /*let persona:any={};
    //var nombre:String ="",
     for(let i = 0 ; i<2000;i++){
      persona.nombre = faker.name.findName();
      persona.apellidoPaterno= faker.name.lastName();
      persona.apellidoMaterno= faker.name.lastName();
      persona.sexo= "masculino";
      persona.fechaNacimiento= Date.now();
      persona.numeroCarnetIdentidad= faker.phone.phoneNumber();
      persona.direccion= faker.address.streetAddress();
      persona.celular=Date.now();
      persona.telefonoFijo=Date.now();
      persona.pais= faker.address.country();
      persona.departamento= faker.address.country();
      persona.provincia=faker.address.country();
      persona.capital= faker.address.country();
      persona.municipio= faker.address.country();
      persona.nombreTutor= faker.name.findName();;
      persona.celularTutor=Date.now();
      persona.estado= "activo";
      persona.tipoPersona= "civil";
      persona.grado= "grad";
      persona.idCompania= "-LQ8S6nv208-wao0QjB8"; //Peticion para compnia
      persona.fotoURL= faker.image.avatar();
      persona.nombreCompleto= `${persona.nombre} ${persona.apellidoPaterno} ${persona.apellidoMaterno}` ;
      persona.timestamp=Date.now();
      //this.voluntariosRef.push(persona)
      this.db.list<VoluntarioModel>('personas').push(persona);*/
     }

}

