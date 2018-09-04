import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  loadingStateChanged = new Subject<boolean>();
  useCaseStateChanged = new Subject<string>();
  public appDrawer: any;
  public navStatus:boolean=false;
  constructor() { }

  public closeNav() {
    this.appDrawer.close();
  }

  public openNav() {
      this.appDrawer.open();
    
  }

  toggleNav(){
    if(!this.navStatus)
    {
      this.appDrawer.open();
      this.navStatus=true;
    } else {
      this.closeNav();
      this.navStatus=false;
    }
  }
}
