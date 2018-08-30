import { VoluntarioModel } from './../../../../models/voluntario/voluntario.model';
import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { VoluntarioService } from '../../../../services/voluntario.service';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import {
  MatTableDataSource,
  MatPaginator,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
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
    private _router: Router,private uiService:UiService,public dialog: MatDialog
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


  openDialog(voluntario:VoluntarioModel): void {
    const dialogRef = this.dialog.open(DialogConfirmDelete, {
      width: '250px',
      data: voluntario
    });
    dialogRef.afterClosed().subscribe(
      result=>{
        if(result=='yes'){
            this.voluntarioService.deleteVoluntario(voluntario.id);
            this._router.navigate(['/voluntarios/index']);
            this.ngOnInit();
        }
      }
    );
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

@Component({
  selector: 'dialog-confirm-delete',
  templateUrl: '../dialogs/dialog-confirm-delete.html',
})
export class DialogConfirmDelete {

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmDelete>,
    @Inject(MAT_DIALOG_DATA) public data: VoluntarioModel) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
