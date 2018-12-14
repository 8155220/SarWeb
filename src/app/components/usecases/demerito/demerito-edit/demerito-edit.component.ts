import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { first, map, switchMap } from "rxjs/operators";
import { SearchPersonaComponent } from "../../../shared/search-persona/search-persona.component";
import { MatDialogConfig } from "@angular/material";
import { UiService } from "../../../../services/ui.service";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { DemeritoService } from "../../../../services/demerito.service";

@Component({
  selector: "app-demerito-edit",
  templateUrl: "./demerito-edit.component.html",
  styleUrls: ["./demerito-edit.component.scss"]
})
export class DemeritoEditComponent implements OnInit {
  persona: any;
  formGroup: FormGroup;
  loading = true;
  demeritoid='';
  constructor(
    private demeritoService: DemeritoService,
    private uiService: UiService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      idpersona: ["", [Validators.required]],
      descripcion: ["", [Validators.required]],
      fecha: [""]
    });
  
    this.activatedRoute.params
      .pipe(
        first(),
        map(e => {
          this.demeritoid=e['id'];
          return e["id"]})
        ,switchMap(id=> this.demeritoService.getDemerito(id).pipe(first()))
      )
      .subscribe((e:any) => {
        this.loading=false;
        this.persona=e;
        this.idpersona=e.idpersona;
        this.descripcion=e.descripcion;
        this.fecha=e.fecha;
      }
      );
  }

  set idpersona(id: string) {
    this.formGroup.get("idpersona").setValue(id);
  }
  set descripcion(data:string){
    this.formGroup.get('descripcion').setValue(data);
  }
  set fecha(data:string){
    this.formGroup.get('fecha').setValue(data);
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(SearchPersonaComponent, dialogConfig);
    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe((data: any) => {
        if (data) {
          this.persona = data;
          this.idpersona = data.id;
        }
      });
  }

  onSubmit() {
    let fecha = this.formGroup.get("fecha").value;
    if (fecha != "") {
      this.formGroup.get("fecha").setValue(new Date(fecha).toISOString());
    }
    this.loading = true;
    console.log(this.formGroup.value);
    console.log(this.demeritoid);
    
    

    this.demeritoService.updateDemerito(this.formGroup.value,this.demeritoid).subscribe(
      e => {
        this.loading = false;
        this.uiService.success('Guardaro Exitosamente');
          this.router.navigate(["/dashboard/demerito/index"]);
      },
      (e: any) => console.log(e),
      () => console.log("Complete")
    );
  }
}
