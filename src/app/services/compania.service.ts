import { map } from "rxjs/operators";
import {
  AngularFireDatabase,
  DatabaseSnapshot,
  AngularFireAction
} from "angularfire2/database";
import { AngularFirestore } from "angularfire2/firestore";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CompaniaService {
  companiasRef;
  COMPANIAS_PATH = "companias";
  companias: any[] = [];
  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
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
    console.log('Current :'+ idCompaniaCurrent);
    console.log('prev :'+idCompaniaPre);
    
    if(idCompaniaCurrent!=idCompaniaPre){
      console.log('Entra');
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
}
