import { map, first, switchMap , concat} from 'rxjs/operators';
import { Observable, Subscriber, from } from "rxjs";
import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from "@angular/core";
import { AngularFireStorage } from "angularfire2/storage";

@Injectable({
  providedIn: 'root'
})
export class BajaService {
  BajasRef;
  BAJAS_PATH = "bajas";
  PERSONAS_PATH = 'voluntarios2';
  constructor(private db: AngularFireDatabase) {
    this.BajasRef = this.db.list<any>(this.BAJAS_PATH);
  }

  addBaja(baja: any) {
     //from(this.db.object(`${this.PERSONAS_PATH}/${baja.idpersona}`).update({estado:'pasivo'}))
     return from(this.db.object(`${this.PERSONAS_PATH}/${baja.idpersona}`).update({estado:'pasivo'})).pipe(first(),
     concat(from(this.BajasRef.push(baja))));
    //return from(this.BajasRef.push(baja));
  }
  getBajas() {
    return this.db
      .list<any>(this.BAJAS_PATH)
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ id: c.payload.key, ...c.payload.val() }))
        )
      );
  }
  deleteBaja(id: string) {
    return this.db.object(`${this.BAJAS_PATH}/${id}`).remove();
  }

  getBaja(id: string) {
    return this.db.object(`${this.BAJAS_PATH}/${id}`).valueChanges();
  }
  updateBaja(baja: any,bajaid:string): Observable<any> {
    return from(
      this.db.object(`${this.BAJAS_PATH}/${bajaid}`).update(baja)
    );
  }
}

