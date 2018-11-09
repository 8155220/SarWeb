import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { first } from "rxjs/operators";
import { SearchPersonaComponent } from "./../../../shared/search-persona/search-persona.component";
import { MatDialogConfig } from "@angular/material";
import { UiService } from "./../../../../services/ui.service";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { BajaService } from "../../../../services/baja.service";

@Component({
  selector: "app-baja-create",
  templateUrl: "./baja-create.component.html",
  styleUrls: ["./baja-create.component.scss"]
})
export class BajaCreateComponent implements OnInit {
  persona: any;
  formGroup: FormGroup;
  loading = false;
  constructor(
    private bajaService: BajaService,
    private uiService: UiService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      idpersona: ["", [Validators.required]],
      descripcion: ["", [Validators.required]],
      fecha: ["", [Validators.required]],
      nombreCompleto: [""]
    });
  }

  set idpersona(id: string) {
    this.formGroup.get("idpersona").setValue(id);
  }
  set nombreCompleto(data: string) {
    this.formGroup.get("nombreCompleto").setValue(data);
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
          if ((data.estado =="pasivo")) {
            this.uiService.warn(
              "El voluntario esta actualmente en Estado Pasivo"
            );
          } else {
            this.persona = data;
            this.idpersona = data.id;
            this.nombreCompleto = data.nombreCompleto;
          }
        }
      });
  }

  onSubmit() {
    let fecha = this.formGroup.get("fecha").value;
    if (fecha != "") {
      this.formGroup.get("fecha").setValue(new Date(fecha).toISOString());
    }

    this.loading = true;
    this.bajaService.addBaja(this.formGroup.value).subscribe(
      e => {
        this.loading = false;
        this.uiService.success("Guardaro Exitosamente");
        this.router.navigate(["baja/index"]);
      },
      (e: any) => console.log(e),
      () => console.log("Complete")
    );
  }
}
