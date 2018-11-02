import { MatConfirmDialogComponent } from './../components/shared/mat-confirm-dialog/mat-confirm-dialog.component';
import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map } from "rxjs/operators";
import { MatSnackBar, MatSnackBarConfig, MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class UiService {
  loadingStateChanged = new Subject<boolean>();
  useCaseStateChanged = new Subject<string>();
  public appDrawer: any;
  public navStatus: boolean = false;

  config: MatSnackBarConfig = {
    duration: 2000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom'
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => {
        return result.matches;
      })
    );
  constructor(private breakpointObserver: BreakpointObserver,public snackBar: MatSnackBar,private dialog: MatDialog,public router:Router) {}

  public closeNav() {
    if(this.isHandset$.subscribe(e=>{
      if(e) this.appDrawer.close();
    })){
    }
  }

  public openNav() {
    this.appDrawer.open();
  }

  toggleNav() {
    if (!this.navStatus) {
      this.appDrawer.open();
      this.navStatus = true;
    } else {
      this.closeNav();
      this.navStatus = false;
    }
  }
  success(msg) {
    this.config['panelClass'] = ['notification', 'success'];
    this.snackBar.open(msg, 'ocultar',this.config);
  }
  warn(msg) {
    this.config['panelClass'] = ['notification', 'warn'];
    this.snackBar.open(msg, '', this.config);
  }

  //DIalog
  openConfirmDialog(msg:string){
    return this.dialog.open(MatConfirmDialogComponent,{
       width: '390px',
       panelClass: 'confirm-dialog-container',
       disableClose: true,
       position: { top: "10px" },
       data :{
         message : msg
       }
     });
   }
}
