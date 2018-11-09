import { map, first , concat} from 'rxjs/operators';
import { Observable, from } from "rxjs";
import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class IncorporacionService {
  incorporacionesRef;
  INCORPORACIONES_PATH = "incorporaciones";
  PERSONAS_PATH = 'voluntarios2';
  constructor(private db: AngularFireDatabase) {
    this.incorporacionesRef = this.db.list<any>(this.INCORPORACIONES_PATH);
  }

  addIncorporacion(incorporacion: any) {
    return from(this.db.object(`${this.PERSONAS_PATH}/${incorporacion.idpersona}`).update({estado:'activo'})).pipe(first(),
     concat(from(this.incorporacionesRef.push(incorporacion))));
    //return from(this.IncorporacionesRef.push(incorporacion));
  }
  getIncorporaciones() {
    return this.db
      .list<any>(this.INCORPORACIONES_PATH)
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ id: c.payload.key, ...c.payload.val() }))
        )
      );
  }
  deleteIncorporacion(id: string) {
    return this.db.object(`${this.INCORPORACIONES_PATH}/${id}`).remove();
  }

  getIncorporacion(id: string) {
    return this.db.object(`${this.INCORPORACIONES_PATH}/${id}`).valueChanges();
  }
  updateIncorporacion(incorporacion: any,incorporacionid:string): Observable<any> {
    return from(
      this.db.object(`${this.INCORPORACIONES_PATH}/${incorporacionid}`).update(incorporacion)
    );
  }
}

