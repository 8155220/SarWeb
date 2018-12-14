import { map, switchMap, first } from 'rxjs/operators';
import { Observable, from } from "rxjs";
import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class PrivilegiosService {
  PrivilegiosRef;
  PRIVILEGIOS_PATH = "privilegios";
  VOLUNTARIOS_PATH = "personas";

  constructor(private db: AngularFireDatabase) {
    this.PrivilegiosRef = this.db.list<any>(this.PRIVILEGIOS_PATH);
  }

  addPrivilegios(privilegio: any) {
    return from(this.PrivilegiosRef.push(privilegio));
  }
  getPrivilegios() {
    return this.db
      .list<any>(this.PRIVILEGIOS_PATH)
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ id: c.payload.key, ...c.payload.val() }))
        )
      );
  }
  deletePrivilegio(id: string) {
    return this.db.object(`${this.PRIVILEGIOS_PATH}/${id}`).remove();
  }

  getPrivilegio(id: string) {
    return this.db.object(`${this.PRIVILEGIOS_PATH}/${id}`).valueChanges();
  }
  updatePrivilegio(privilegio: any,meritoid:string): Observable<any> {
    return from(
      this.db.object(`${this.PRIVILEGIOS_PATH}/${meritoid}`).update(privilegio)
    );
  }


    getPrivilegiosPersonaFromEmail(email:string){
    return this.db.list(this.VOLUNTARIOS_PATH,ref=> ref.orderByChild('email').equalTo(email).limitToFirst(1))
    
    .valueChanges()
    
    .pipe(first(),switchMap((e:any)=>{
      console.log("ResultadoAfterSwitchMap");
      console.log(e);
      return this.db.object(`${this.PRIVILEGIOS_PATH}/${e[0].privilegioId}`).valueChanges()
    }))
  }
}
