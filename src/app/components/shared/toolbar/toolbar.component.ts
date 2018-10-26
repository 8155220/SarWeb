import { Component, OnInit } from "@angular/core";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from "@angular/cdk/layout";
import { Observable, Subject, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { UiService } from "../../../services/ui.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"]
})
export class ToolbarComponent implements OnInit {
  useCaseTitle = new Subject<string>();
  private titleSubscription: Subscription;
  title: string = "SAR FAB Santa Cruz";
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      // map(result => result.matches)
      map(result => {
        console.log("result:" + result.matches);
        return result.matches;
      })
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public uiService: UiService,private location:Location
  ) {}

  ngOnInit() {
    this.titleSubscription = this.uiService.useCaseStateChanged.subscribe(
      title => {
        this.title = title;
      }
    );
  }
  cancel() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.titleSubscription.unsubscribe;
  }
}
