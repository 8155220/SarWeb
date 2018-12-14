import { OnInit } from '@angular/core';
import { VoluntarioService } from './../../../services/voluntario.service';
import {Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit} from '@angular/core';
import {VERSION, MatSidenav} from '@angular/material';
import { NavItem } from '../../../models/ui/nav-item';
import { UiService } from '../../../services/ui.service';
import { BreakpointObserver,Breakpoints } from '../../../../../node_modules/@angular/cdk/layout';
import { Observable, Subject, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements AfterViewInit,OnInit {

  @ViewChild('appDrawer') appDrawer: MatSidenav;
  version = VERSION;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      // map(result => result.matches)
      map(result => {
        console.log("result:" + result.matches);

        return result.matches;
      })
    );
    usuarioLogeado:any;

  constructor(public uiService:UiService,private breakpointObserver: BreakpointObserver,public personaService:VoluntarioService) { 
  }
  ngOnInit(){
    this.personaService.getPersonaLogInData().subscribe(e=>{
      this.usuarioLogeado=e[0];
    })
  }

  ngAfterViewInit() {
    console.log("Entro AfterViewInit");
    console.log(this.appDrawer);
    
    this.uiService.appDrawer = this.appDrawer;
  }

}
