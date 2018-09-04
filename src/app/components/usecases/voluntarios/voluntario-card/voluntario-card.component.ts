import { VoluntarioModel } from '../../../../models/voluntario/voluntario.model';
import { Component, OnInit , Input } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-voluntario-card',
  templateUrl: './voluntario-card.component.html',
  styleUrls: ['./voluntario-card.component.css']
})
export class VoluntarioCardComponent implements OnInit {

  @Input() voluntario:VoluntarioModel;
  
  backgroundSize:string = "cover";
  color:string='lightblue';
  color2:string='lightpink';
  color3:string='lightgreen';
  //@Input()voluntario:Voluntario;
  constructor(private bottomSheet: MatBottomSheet) { }

  openBottomSheet(): void {
    //this.bottomSheet.open(BottomSheetOverviewVoluntarioSheet);
  }
  ngOnInit() {
  }
}

// @Component({
//   selector: 'bottom-sheet-overview-voluntario-sheet',
//   templateUrl: 'bottom-sheet-overview-voluntario-sheet.html',
// })
// export class BottomSheetOverviewVoluntarioSheet {
//   constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewVoluntarioSheet>) {}

//   openLink(event: MouseEvent): void {
//     this.bottomSheetRef.dismiss();
//     event.preventDefault();
//   }

  

