import { map } from 'rxjs/operators';
import { AngularFireDatabase, DatabaseSnapshot, AngularFireAction } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompaniaService {
  companiasRef;
  COMPANIAS_PATH = "companias";
  companias:any[]=[];
  constructor(
    private afs:AngularFirestore,
    private db:AngularFireDatabase,
  ) { 
    this.companiasRef = this.db.list<any>(this.COMPANIAS_PATH);
  }

  getCompanias(){
    const data = this.companiasRef.snapshotChanges()
    .pipe(
      map((changes:AngularFireAction<DatabaseSnapshot<any>>[])=>
        {
          return changes.map(c=> ({id:c.payload.key,...c.payload.val()}))
        }
      )
    );
    return data;
  }

  addVoluntarioToCompania(idpersona:string,idcompania:string){
    let persona= {'idpersona':idpersona};
    this.db.object(`${this.COMPANIAS_PATH}/${idcompania}/idpersonas/${idpersona}`).set(persona);
  }

}
