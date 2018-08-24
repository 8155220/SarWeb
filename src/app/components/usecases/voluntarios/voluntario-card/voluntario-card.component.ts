import { Component, OnInit } from '@angular/core';
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

  backgroundSize:string = "cover";
  color:string='lightblue';
  color2:string='lightpink';
  color3:string='lightgreen';
  // tiles: Tile[] = [
  //   {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
  //   {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
  //   {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
  //   {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  // ];
  constructor(private bottomSheet: MatBottomSheet) { }

  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetOverviewVoluntarioSheet);
  }
  ngOnInit() {
  }
}

@Component({
  selector: 'bottom-sheet-overview-voluntario-sheet',
  templateUrl: 'bottom-sheet-overview-voluntario-sheet.html',
})
export class BottomSheetOverviewVoluntarioSheet {
  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewVoluntarioSheet>) {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
