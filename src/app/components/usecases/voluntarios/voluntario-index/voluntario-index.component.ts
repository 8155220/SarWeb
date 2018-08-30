import { Component, OnInit, ViewChild } from "@angular/core";
import { VoluntarioModel } from "../../../../models/voluntario/voluntario.model";
import { VoluntarioService } from "../../../../services/voluntario.service";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import {
  MatTableDataSource,
  MatPaginator
} from "../../../../../../node_modules/@angular/material";
import { MatBottomSheetRef, MatBottomSheet } from "@angular/material";
import { UiService } from '../../../../services/ui.service';
import {
  Router,
  RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from "../../../../../../node_modules/@angular/router";
import { environment } from "../../../../../environments/environment";

@Component({
  selector: "app-voluntario-index",
  templateUrl: "./voluntario-index.component.html",
  styleUrls: ["./voluntario-index.component.css"],
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", minHeight: "0", display: "none" })
      ),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class VoluntarioIndexComponent implements OnInit {
  voluntarios: VoluntarioModel[];
  loading: boolean = false;
  color: string = "lightblue";
  dataSource = new MatTableDataSource<VoluntarioModel>();
  columnsToDisplay = [
    "nombre",
    "apellidoPaterno",
    "apellidoMaterno",
    "celular"
  ];
  expandedElement: VoluntarioModel;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  constructor(
    private voluntarioService: VoluntarioService,
    private bottomSheet: MatBottomSheet,
    private _router: Router,private uiService:UiService
  ) {
  }

  ngOnInit() {
    this.voluntarioService.getVoluntarios().subscribe(voluntarios => {
      this.dataSource.data = voluntarios;
      console.log(voluntarios); //production=false;
    });
    if(!environment.production){
        this.voluntarioService.VoluntariosLocalEmmit();
    }
    this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit() {
    this.uiService.useCaseStateChanged.next('Gestionar Usuario');
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.uiService.useCaseStateChanged.unsubscribe;
    this.voluntarioService.getVoluntarios().unsubscribe;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetOverviewVoluntarioSheet);
  }

  deleteVoluntario(id:string){
    this.voluntarioService.deleteVoluntario(id);
  }
}

@Component({
  selector: "bottom-sheet-overview-voluntario-sheet",
  templateUrl: "bottom-sheet-overview-voluntario-sheet.html"
})
export class BottomSheetOverviewVoluntarioSheet {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<
      BottomSheetOverviewVoluntarioSheet
    >
  ) {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
