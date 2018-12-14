import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { take, map,tap, switchMap } from 'rxjs/operators';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { PrivilegiosService } from '../services/privilegios.service';
import { UiService } from '../services/ui.service';

@Injectable({
  providedIn: 'root'
})
export class DemeritoReadGuard implements CanActivate {
  constructor(private auth:AuthService,private router:Router,private ps:PrivilegiosService,private uiService:UiService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      
      return this.auth.user.pipe(take(1),switchMap((e:any)=> {
        return this.ps.getPrivilegiosPersonaFromEmail(e.email)
      }),map((e:any)=>e.demeritos.read),tap(permiso=>{
        if(!permiso){
            this.uiService.warn("Privilegios insuficientes")
        }
      }))
  }
}
