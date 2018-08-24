import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  isHandset$: Observable<boolean> = 
  this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    // map(result => result.matches)
    map((result) =>{
      console.log('result:'+result.matches);
      
      return result.matches;
    })
  );
  
  constructor(private breakpointObserver: BreakpointObserver) { 

  }

  ngOnInit() {
  }

}
