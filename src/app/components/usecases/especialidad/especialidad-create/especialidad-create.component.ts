import { MatSnackBar } from '@angular/material';
import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { EspecialidadService } from "./../../../../services/especialidad.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: "app-especialidad-create",
  templateUrl: "./especialidad-create.component.html",
  styleUrls: ["./especialidad-create.component.scss"]
})
export class EspecialidadCreateComponent implements OnInit {
  formGroup: FormGroup;
  loading = false;
  constructor(
    private especilidadService: EspecialidadService,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private router:Router
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
      this.openSnackBar('Complete los campos requeridos','ocultar');
      return;
    }
    this.loading=true;
    if(this.formGroup.get("imagenURL").value!='')
    {
      this.especilidadService.addEspecialidad(this.formGroup.value).subscribe(
        (e: any) => {
          if (e.bytesTransferred != null) {
            if (e.bytesTransferred == e.totalBytes) {
              this.loading = false;
              this.openSnackBar("Registrado Exitosamente", "ocultar");
              this.router.navigate(["/voluntarios/index"]);
            }
          }
        },
        e => {
          this.loading = false;
          this.openSnackBar(
            "Ocurrio un error intente mas tarde",
            "ocultar"
          );
        }
      );
    } else {
      this.especilidadService.addEspecialidad(this.formGroup.value).subscribe(
        (e: any) => {
          this.loading = false;
          this.openSnackBar("Guardado Exitosamente", "ocultar");
          this.router.navigate(["/voluntarios/index"]);
        },
        e => {
          console.log(e);
          this.loading = false;
          this.openSnackBar(
            "Ocurrio un error intente mas tarde",
            "ocultar"
          );
        }
      );
    }
    
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
