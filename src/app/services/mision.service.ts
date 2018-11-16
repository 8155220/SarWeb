import { mergeMap } from "rxjs/operators";
import { map, switchMap } from "rxjs/operators";
import { Observable, from, merge } from "rxjs";
import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from "@angular/core";
import { LoginComponent } from '../components/auth/login/login.component';
@Injectable({
  providedIn: "root"
})
export class MisionService {
  misionRef;
  MISION_PATH = "misiones";
  PERSONA_MISION_PATH = "personaMision";
  constructor(private db: AngularFireDatabase) {
    this.misionRef = this.db.list<any>(this.MISION_PATH);
  }

  addMision(mision: any) {
    let personaslist:any[] = mision.voluntarios;
    if(mision.oficialAlMando && mision.oficialAlMando.id)
    {
      personaslist.push(mision.oficialAlMando);
    }
    return from(this.misionRef.push(mision)).pipe(
      switchMap((item: any) => {
        //if (mision.voluntarios && mision.oficialAlMando) {
        return merge(
          from(personaslist).pipe(
            mergeMap((e: any) =>
              from(
                this.db
                  .object(`${this.PERSONA_MISION_PATH}/${e.id}/${item.key}`)
                  .set({ idmision: item.key })
              )
            )
          )
        );
        //} else return from(null);
      })
    );
  }
  getMisiones() {
    return this.db
      .list<any>(this.MISION_PATH)
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ id: c.payload.key, ...c.payload.val() }))
        )
      );
  }
  deleteMision(id: string) {
    return this.db.object(`${this.MISION_PATH}/${id}`).remove();
  }

  getMision(id: string) {
    return this.db.object(`${this.MISION_PATH}/${id}`).valueChanges();
  }
  updateMision(
    mision: any,
    idmision: string,
    oficialAntiguo: any,
    voluntariosAntiguos: any[]
  ): Observable<any> {
    //personas a eliminar -> si esta en la lista antigua pero no en la nueva
    //personas a agregar -> si no estan en la lista antigua pero si ne la nueva
    let personasEliminar: any[] = [];
    if (!voluntariosAntiguos) voluntariosAntiguos = [];
    let volAnt = voluntariosAntiguos.map(e => e.id);
    let vol = mision.voluntarios.map(e => e.id);
    let personasAgregar: any[] = [];

    volAnt.forEach(va => {
      if (!vol.includes(va)) {
        personasEliminar.push(va);
      }
    });
    if (vol && vol.length > 0) {
      vol.forEach(v => {
        if (!volAnt.includes(v)) {
          personasAgregar.push(v);
        }
      });
    } else {
      personasEliminar = voluntariosAntiguos.map(e => e.id);
    }
    console.log("OFicialAlMando");
    console.log(mision.oficialAlMando);
    
    
    if(mision.oficialAlMando && mision.oficialAlMando.id){
      if(oficialAntiguo.id != mision.oficialAlMando.id){
        personasEliminar.push(oficialAntiguo.id);
        personasAgregar.push(mision.oficialAlMando.id);
      }
    }
    //ERROR CUANDO LA NUEVA LISTA DE VOLUNTARIOS NO HAY IDS

    /* 
      let personaEliminar = voluntariosAntiguos.filter(x=> {
        let flag = !mision.voluntarios.includes(x)
        console.log(flag);
        console.log('Misiones voluntarios incluye a :'+x);
        if(mision.voluntarios.includes(x)){
          console.log('si lo incluye');
          
        }
        return flag;
        
      });
      console.log("PERSONAS ELIMIANR");
      console.log(personaEliminar);   
      
    return from(""); */

    return merge(
      from(this.db.object(`${this.MISION_PATH}/${idmision}`).update(mision)),
      from(personasEliminar).pipe(
        mergeMap(e =>
          from(
            this.db
              .object(`${this.PERSONA_MISION_PATH}/${e}/${idmision}`)
              .remove()
          )
        )
      ),
      from(personasAgregar).pipe(
        mergeMap(e =>
          from(
            this.db
              .object(`${this.PERSONA_MISION_PATH}/${e}/${idmision}`)
              .set({ misionid: idmision })
          )
        )
      )
    );
  }
}
