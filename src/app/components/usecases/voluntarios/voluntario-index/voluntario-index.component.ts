import { Component, OnInit } from "@angular/core";
import { VoluntarioModel } from "../../../../models/voluntario/voluntario.model";
import { VoluntarioService } from "../../../../services/voluntario.service";
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatTableDataSource } from "../../../../../../node_modules/@angular/material";
import { MatBottomSheetRef, MatBottomSheet } from '@angular/material';

@Component({
  selector: "app-voluntario-index",
  templateUrl: "./voluntario-index.component.html",
  styleUrls: ["./voluntario-index.component.css"],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class VoluntarioIndexComponent implements OnInit {
  voluntarios: VoluntarioModel[];

  color:string='lightblue';
 // dataSource = ELEMENT_DATA;
  // dataSource = this.voluntarios;
   dataSource = new MatTableDataSource<VoluntarioModel>();

  // columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  columnsToDisplay = ['nombre', 'apellidoPaterno', 'apellidoMaterno', 'celular'];
  // expandedElement: PeriodicElement;
  expandedElement: VoluntarioModel;


  constructor(private voluntarioService: VoluntarioService,private bottomSheet: MatBottomSheet) {}

  ngOnInit() {
    this.voluntarioService.getVoluntarios().subscribe(voluntarios => {
      this.dataSource.data = voluntarios;
      console.log(this.voluntarios);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetOverviewVoluntarioSheet);
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


