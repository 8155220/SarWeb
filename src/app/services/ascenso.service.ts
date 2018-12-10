import { map, concat } from "rxjs/operators";
import { Observable, Subscriber, from, merge } from "rxjs";
import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AscensoService {
  AscensosRef;
  ASCENSOS_PATH = "ascensos";
  VOLUNTARIOS_PATH = "personas";
  constructor(private db: AngularFireDatabase) {
    this.AscensosRef = this.db.list<any>(this.ASCENSOS_PATH);
  }
  ascenderVoluntario(voluntario:any,fecha:string) {
    return merge(from(this.AscensosRef.push({
      idpersona: voluntario.id,
      nombreCompleto: voluntario.nombreCompleto,
      gradoAntiguo: voluntario.grado,
      gradoNuevo: this.getNuevoGrado(voluntario.grado),
      fecha:fecha
    })),from(
      this.db
        .object(`${this.VOLUNTARIOS_PATH}/${voluntario.id}`)
        .update({ grado: this.getNuevoGrado(voluntario.grado) })
    ));
  }
  getAscensos() {
    return this.db
      .list<any>(this.ASCENSOS_PATH)
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ id: c.payload.key, ...c.payload.val() }))
        )
      );
  }
  ascender(voluntarios: any[],fecha:string) {
    //this.db.object(this.ASCENSOS_PATH).push();
    //primero ascenderlo
    //luego registrar ascenso
    // ->idPersona
    // ->Nombre Completo
    // ->RangoAntiguo
    // ->RangoNuevo
    return from(voluntarios).pipe(
      map(e =>
        merge(
          from(
            this.db
              .list(this.ASCENSOS_PATH)
              .push({
                idpersona: e.id,
                nombreCompleto: e.nombreCompleto,
                gradoAntiguo: e.grado,
                gradoNuevo: this.getNuevoGrado(e.grado),
                fecha:fecha
              })
          ),
          from(
            this.db
              .object(`${this.VOLUNTARIOS_PATH}/${e.id}`)
              .update({ grado: this.getNuevoGrado(e.grado) })
          )
        )
      )
    );
  }

  getNuevoGrado(data: string) {
    switch (data) {
      case "primerAnio": {
        return "segundoAnio";
      
      }
      case "segundoAnio": {
        return "tercerAnio";
      
      }
      case "tercerAnio": {
        return "rescatistaInicial";
      
      }
      case "rescatistaInicial": {
        return "rescatistaSegundo";
      
      }
      case "rescatistaSegundo": {
        return "rescatistaPrimero";
      
      }
      case "rescatistaPrimero": {
        return "rescatistaEspecialista";
      
      }
      case "rescatistaEspecialista": {
        return "rescatistaMaster";
      
      }
      case "rescatistaMaster": {
        return "rescatistaComando";
      
      }
      case "rescatistaComando": {
        return "NO SE PUEDE ASCENDER";
      
      }
    }
  }
}
