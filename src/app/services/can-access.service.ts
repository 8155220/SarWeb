import { Observable } from 'rxjs';
import { PrivilegiosService } from './privilegios.service';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { take, map, tap, switchMap, first } from 'rxjs/operators';
import { UiService } from '../services/ui.service';

@Injectable({
  providedIn: 'root'
})
export class CanAccessService {

  constructor(private auth:AuthService,private ps:PrivilegiosService,private uiService:UiService) { }

  personasCanDelete():Observable<Boolean>{
    return this.auth.user.pipe(take(1),switchMap((e:any)=> {
      return this.ps.getPrivilegiosPersonaFromEmail(e.email)
    }),map((e:any)=>e.personas.delete),first(),first(),tap(permiso=>{
      if(!permiso){
          this.uiService.warn("Privilegios insuficientes")
      }
    }))
  }

  especialidadesCanDelete():Observable<Boolean>{
    return this.auth.user.pipe(take(1),switchMap((e:any)=> {
      return this.ps.getPrivilegiosPersonaFromEmail(e.email)
    }),map((e:any)=>e.especialidades.delete),first(),tap(permiso=>{
      if(!permiso){
          this.uiService.warn("Privilegios insuficientes")
      }
    }))
  }

  especialidadesCanAddVoluntario():Observable<Boolean>{
    return this.auth.user.pipe(take(1),switchMap((e:any)=> {
      return this.ps.getPrivilegiosPersonaFromEmail(e.email)
    }),map((e:any)=>e.especialidades.create),first(),tap(permiso=>{
      if(!permiso){
          this.uiService.warn("Privilegios insuficientes")
      }
    }))
  }

  companiasCanDelete():Observable<Boolean>{
    return this.auth.user.pipe(take(1),switchMap((e:any)=> {
      return this.ps.getPrivilegiosPersonaFromEmail(e.email)
    }),map((e:any)=>e.companias.delete),first(),tap(permiso=>{
      if(!permiso){
          this.uiService.warn("Privilegios insuficientes")
      }
    }))
  }
  meritosCanDelete():Observable<Boolean>{
    return this.auth.user.pipe(take(1),switchMap((e:any)=> {
      return this.ps.getPrivilegiosPersonaFromEmail(e.email)
    }),map((e:any)=>e.meritos.delete),first(),tap(permiso=>{
      if(!permiso){
          this.uiService.warn("Privilegios insuficientes")
      }
    }))
  }
  demeritosCanDelete():Observable<Boolean>{
    return this.auth.user.pipe(take(1),switchMap((e:any)=> {
      return this.ps.getPrivilegiosPersonaFromEmail(e.email)
    }),map((e:any)=>e.demeritos.delete),first(),tap(permiso=>{
      if(!permiso){
          this.uiService.warn("Privilegios insuficientes")
      }
    }))
  }

  misionesCanDelete():Observable<Boolean>{
    return this.auth.user.pipe(take(1),switchMap((e:any)=> {
      return this.ps.getPrivilegiosPersonaFromEmail(e.email)
    }),map((e:any)=>e.misiones.delete),first(),tap(permiso=>{
      if(!permiso){
          this.uiService.warn("Privilegios insuficientes")
      }
    }))
  }

  privilegiosCanDelete():Observable<Boolean>{
    return this.auth.user.pipe(take(1),switchMap((e:any)=> {
      return this.ps.getPrivilegiosPersonaFromEmail(e.email)
    }),map((e:any)=>e.privilegios.delete),first(),first(),first(),tap(permiso=>{
      if(!permiso){
          this.uiService.warn("Privilegios insuficientes")
      }
    }))
  }

  ascensosCanAscender():Observable<Boolean>{
    return this.auth.user.pipe(take(1),switchMap((e:any)=> {
      return this.ps.getPrivilegiosPersonaFromEmail(e.email)
    }),map((e:any)=>e.ascensos.create),first(),first(),first(),tap(permiso=>{
      if(!permiso){
          this.uiService.warn("Privilegios insuficientes")
      }
    }))
  }
  


}
