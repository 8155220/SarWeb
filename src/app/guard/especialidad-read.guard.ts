import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { take, map,tap, switchMap } from 'rxjs/operators';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { PrivilegiosService } from '../services/privilegios.service';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadReadGuard implements CanActivate {
  constructor(private auth:AuthService,private router:Router,private ps:PrivilegiosService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      
      return this.auth.user.pipe(take(1),switchMap((e:any)=> {
        console.log("ValorE:");
        console.log("ValorE:");
        
        return this.ps.getPrivilegiosPersonaFromEmail(e.email)
      }),map((e:any)=>e.especialidades.read))
      //return this.auth.userPrivileges.especialidades.read
      /*if(!this.auth.userPrivileges.especialidades.read){
        
      }
      return this.auth.userPrivileges.pipe(take(1),map(user=>!!user),tap(loggedIn=>{
        if(!loggedIn){
          console.log("acess denied");
          this.router.navigate(['/login']);
        }
      }))*/
  }
}
