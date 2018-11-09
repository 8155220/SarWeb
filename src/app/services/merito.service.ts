import { finalize, map } from "rxjs/operators";
import { Observable, Subscriber, from } from "rxjs";
import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from "@angular/core";
import { AngularFireStorage } from "angularfire2/storage";

@Injectable({
  providedIn: "root"
})
export class MeritoService {
  MeritosRef;
  MERITOS_PATH = "meritos";
  VOLUNTARIO_merito_PATH = "voluntariomerito";

  constructor(private db: AngularFireDatabase) {
    this.MeritosRef = this.db.list<any>(this.MERITOS_PATH);
  }

  addmerito(merito: any) {
    return from(this.MeritosRef.push(merito));
  }
  getMeritos() {
    return this.db
      .list<any>(this.MERITOS_PATH)
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ id: c.payload.key, ...c.payload.val() }))
        )
      );
  }
  deleteMerito(id: string) {
    return this.db.object(`${this.MERITOS_PATH}/${id}`).remove();
  }

  getMerito(id: string) {
    return this.db.object(`${this.MERITOS_PATH}/${id}`).valueChanges();
  }
  updateMerito(merito: any,meritoid:string): Observable<any> {
    return from(
      this.db.object(`${this.MERITOS_PATH}/${meritoid}`).update(merito)
    );
  }
}
