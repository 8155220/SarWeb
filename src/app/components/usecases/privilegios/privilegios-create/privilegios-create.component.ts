import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { UiService } from "./../../../../services/ui.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { PrivilegiosService } from "../../../../services/privilegios.service";

@Component({
  selector: "app-privilegios-create",
  templateUrl: "./privilegios-create.component.html",
  styleUrls: ["./privilegios-create.component.scss"]
})
export class PrivilegiosCreateComponent implements OnInit {
  persona: any;
  formGroup: FormGroup;
  loading = false;
  constructor(
    private privilegiosService: PrivilegiosService,
    private uiService: UiService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      nombre: ["", [Validators.required]],
      personas: this.fb.group({
        read: false,
        create: false,
        edit: false,
        delete: false
      }),
      especialidades: this.fb.group({
        read: false,
        create: false,
        edit: false,
        delete: false
      }),
      companias: this.fb.group({
        read: false,
        create: false,
        edit: false,
        delete: false
      }),
      meritos: this.fb.group({
        read: false,
        create: false,
        edit: false,
        delete: false
      }),
      demeritos: this.fb.group({
        read: false,
        create: false,
        edit: false,
        delete: false
      }),
      bajas: this.fb.group({
        read: false,
        create: false,
        edit: false,
        delete: false
      }),
      incorporaciones: this.fb.group({
        read: false,
        create: false,
        edit: false,
        delete: false
      }),
      ascensos: this.fb.group({
        read: false,
        create: false,
        edit: false,
        delete: false
      }),
      misiones: this.fb.group({
        read: false,
        create: false,
        edit: false,
        delete: false
      }),
      privilegios: this.fb.group({
        read: false,
        create: false,
        edit: false,
        delete: false
      })
    });
  }

  onSubmit() {
    if (!this.formGroup.valid) {
      this.uiService.warn("Complete los campos requeridos");
      return;
    }
    this.loading = true;
    this.privilegiosService.addPrivilegios(this.formGroup.value).subscribe(
      e => {
        this.loading = false;
        this.uiService.success("Guardaro Exitosamente");
        this.router.navigate(["/dashboard/privilegios/index"]);
      },
      (e: any) => {
        console.log(e);
        this.loading = false;
      },
      () => console.log("Complete")
    );
  }
}
