import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UiService {
  loadingStateChanged = new Subject<boolean>();
  useCaseStateChanged = new Subject<string>();
  public appDrawer: any;
  public navStatus: boolean = false;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => {
        return result.matches;
      })
    );
  constructor(private breakpointObserver: BreakpointObserver) {}

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
}
