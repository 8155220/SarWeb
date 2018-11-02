import { finalize,map } from 'rxjs/operators';
import { Observable, Subscriber,from } from "rxjs";
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  especialidadesRef;
  ESPECIALIDADES_PATH='especialidades'
  constructor(private db: AngularFireDatabase,
    private storage: AngularFireStorage) { 
      this.especialidadesRef = this.db.list<any>(this.ESPECIALIDADES_PATH);
    }

  addEspecialidad(especialidad:any){
    if(especialidad.imagenURL && especialidad.imagenURL !=""){
      const filePath = "especialidades/"+especialidad.nombre;
      const fileRef = this.storage.ref(filePath);
      const task = fileRef.putString(especialidad.imagenURL,"data_url");
      return task.snapshotChanges().pipe(
        finalize(()=>{
          fileRef.getDownloadURL().subscribe(item =>{
            especialidad.imagenURL=item;
            this.especialidadesRef.push(especialidad);
          });
        })
      );
    } else {
      return from(this.especialidadesRef.push(especialidad));
    }
  }
  getEspecialidades(){
    return this.db.list<any>(this.ESPECIALIDADES_PATH).snapshotChanges()
    .pipe(
      map( changes=>        
        changes.map(c => ({ id: c.payload.key, ...c.payload.val() }))
      )
    );
  }
  deleteEspecialidad(id:string){
    return this.db.object(`${this.ESPECIALIDADES_PATH}/${id}`).remove();
  }

  getEspecialidad(id:string){
    return this.db.object(`${this.ESPECIALIDADES_PATH}/${id}`).valueChanges();
  }
  updateEspecialidad(especialidad:any):Observable<any>{
    
    if(especialidad.imagenURL && especialidad.imagenURL !=""){
      const filePath = "especialidades/"+especialidad.nombre;
      const fileRef = this.storage.ref(filePath);
      const task = fileRef.putString(especialidad.imagenURL,"data_url");
      return task.snapshotChanges().pipe(
        finalize(()=>{
          fileRef.getDownloadURL().subscribe(item =>{
            especialidad.imagenURL=item;
            this.db.object(`${this.ESPECIALIDADES_PATH}/${especialidad.id}`).update(especialidad);
          });
        })
      );
    } else {
      return from(this.db.object(`${this.ESPECIALIDADES_PATH}/${especialidad.id}`).update(especialidad));
    }
  }

}
