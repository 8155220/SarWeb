import { MatSnackBar } from "@angular/material";
import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { CompaniaService } from "./../../../../services/compania.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { UiService } from "../../../../services/ui.service";

@Component({
  selector: "app-compania-create",
  templateUrl: "./compania-create.component.html",
  styleUrls: ["./compania-create.component.scss"]
})
export class CompaniaCreateComponent implements OnInit {
  formGroup: FormGroup;
  loading = false;
  constructor(
    private companiaService: CompaniaService,
    private fb: FormBuilder,
    public uiService: UiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      nombre: ["", [Validators.required]],
      descripcion: ["", [Validators.required]],
      imagenURL: [""]
    });
  }

  imageReceived($event) {
    if (this.formGroup.get("imagenURL")) {
      this.formGroup.get("imagenURL").setValue($event);
    } else {
      this.formGroup.addControl("imagenURL", new FormControl($event));
    }
  }
  onSubmit() {
    if (this.formGroup.invalid) {
      this.uiService.success("Complete los campos requeridos");
      return;
    }
    this.loading = true;
    if (this.formGroup.get("imagenURL").value != "") {
      this.companiaService.addCompania(this.formGroup.value).subscribe(
        (e: any) => {
          if (e.bytesTransferred != null) {
            if (e.bytesTransferred == e.totalBytes) {
              this.loading = false;
              this.uiService.success("Registrado Exitosamente");
              this.router.navigate(["/compania/index"]);
            }
          }
        },
        e => {
          this.loading = false;
          this.uiService.success("Ocurrio un error intente mas tarde");
        }
      );
    } else {
      this.companiaService.addCompania(this.formGroup.value).subscribe(
        (e: any) => {
          this.loading = false;
          this.uiService.success("Guardado Exitosamente");
          this.router.navigate(["/compania/index"]);
        },
        e => {
          console.log(e);
          this.loading = false;
          this.uiService.success("Ocurrio un error intente mas tarde");
        }
      );
    }
  }
}
