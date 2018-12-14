import { PrivilegiosService } from '../services/privilegios.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { switchMap, take, map, tap } from 'rxjs/operators';
import { UiService } from '../services/ui.service';

@Injectable({
  providedIn: 'root'
})
export class IncorporacionEditGuard implements CanActivate {
  constructor(private auth:AuthService,private router:Router,private ps:PrivilegiosService,private uiService:UiService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.auth.user.pipe(take(1),switchMap((e:any)=> 
      this.ps.getPrivilegiosPersonaFromEmail(e.email)
      ),map((e:any)=>{
        return e.incorporaciones.edit
      }),tap(permiso=>{
        if(!permiso){
            this.uiService.warn("Privilegios insuficientes")
        }
      }))
  }
}
