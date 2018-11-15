import {  map } from "rxjs/operators";
import { Observable, from } from "rxjs";
import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class MeritoService {
  MeritosRef;
  MERITOS_PATH = "meritos";

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
