import { finalize,map } from 'rxjs/operators';
import { Observable, Subscriber,from } from "rxjs";
import { AngularFireDatabase, AngularFireAction, DatabaseSnapshot } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: "root"
})
export class CompaniaService {
  companiasRef;
  COMPANIAS_PATH = "companias";
  companias: any[] = [];
  constructor(private afs: AngularFirestore, private db: AngularFireDatabase,
    private storage: AngularFireStorage) {
    this.companiasRef = this.db.list<any>(this.COMPANIAS_PATH);
  }

  getCompanias() {
    const data = this.companiasRef.snapshotChanges().pipe(
      map((changes: AngularFireAction<DatabaseSnapshot<any>>[]) => {
        return changes.map(c => ({ id: c.payload.key, ...c.payload.val() }));
      })
    );
    return data;
  }

  addVoluntarioCompania(idpersona: string, idcompania: string) {
    let persona = { idpersona: idpersona };
    this.db
      .object(`${this.COMPANIAS_PATH}/${idcompania}/idpersonas/${idpersona}`)
      .set(persona);
  }

  updateVoluntarioCompania(
    idPersona: string,
    idCompaniaCurrent: string,
    idCompaniaPre
  ) {
    let persona = { idpersona: idPersona };
    
    if(idCompaniaCurrent!=idCompaniaPre){
      this.db
      .object(
        `${this.COMPANIAS_PATH}/${idCompaniaPre}/idpersonas/${idPersona}`
      )
      .remove();
    this.db
      .object(
        `${this.COMPANIAS_PATH}/${idCompaniaCurrent}/idpersonas/${idPersona}`
      )
      .set(persona);
    }
  }
  deleteVoluntarioCompania(idPersona: string,idCompania:string){
    this.db
    .object(
      `${this.COMPANIAS_PATH}/${idCompania}/idpersonas/${idPersona}`
    )
    .remove();
  }


  addCompania(compania:any){
    if(compania.imagenURL && compania.imagenURL !=""){
      const filePath = "companias/"+compania.nombre;
      const fileRef = this.storage.ref(filePath);
      const task = fileRef.putString(compania.imagenURL,"data_url");
      return task.snapshotChanges().pipe(
        finalize(()=>{
          fileRef.getDownloadURL().subscribe(item =>{
            compania.imagenURL=item;
            this.companiasRef.push(compania);
          });
        })
      );
    } else {
      return from(this.companiasRef.push(compania));
    }
  }

  getCompania(id:string){
    return this.db.object(`${this.COMPANIAS_PATH}/${id}`).valueChanges();
  }
  updateCompania(compania:any):Observable<any>{
    
    if(compania.imagenURL && compania.imagenURL !=""){
      const filePath = "companias/"+compania.nombre;
      const fileRef = this.storage.ref(filePath);
      const task = fileRef.putString(compania.imagenURL,"data_url");
      return task.snapshotChanges().pipe(
        finalize(()=>{
          fileRef.getDownloadURL().subscribe(item =>{
            compania.imagenURL=item;
            this.db.object(`${this.COMPANIAS_PATH}/${compania.id}`).update(compania);
          });
        })
      );
    } else {
      return from(this.db.object(`${this.COMPANIAS_PATH}/${compania.id}`).update(compania));
    }
  }

  deleteCompania(id:string){
    return this.db.object(`${this.COMPANIAS_PATH}/${id}`).remove();
  }

}
