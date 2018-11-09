import { finalize, map } from "rxjs/operators";
import { Observable, Subscriber, from } from "rxjs";
import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from "@angular/core";
import { AngularFireStorage } from "angularfire2/storage";

@Injectable({
  providedIn: "root"
})
export class DemeritoService {
  DemeritosRef;
  MERITOS_PATH = "demeritos";

  constructor(private db: AngularFireDatabase) {
    this.DemeritosRef = this.db.list<any>(this.MERITOS_PATH);
  }

  addDemerito(demerito: any) {
    return from(this.DemeritosRef.push(demerito));
  }
  getDemeritos() {
    return this.db
      .list<any>(this.MERITOS_PATH)
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ id: c.payload.key, ...c.payload.val() }))
        )
      );
  }
  deleteDemerito(id: string) {
    return this.db.object(`${this.MERITOS_PATH}/${id}`).remove();
  }

  getDemerito(id: string) {
    return this.db.object(`${this.MERITOS_PATH}/${id}`).valueChanges();
  }
  updateDemerito(demerito: any,demeritoid:string): Observable<any> {
    return from(
      this.db.object(`${this.MERITOS_PATH}/${demeritoid}`).update(demerito)
    );
  }
}
