import { AscensoService } from "./../../../../services/ascenso.service";
import { switchMap, filter } from "rxjs/operators";
import { map } from "rxjs/operators";
import { first } from "rxjs/operators";
import { VoluntarioService } from "./../../../../services/voluntario.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { UiService } from "../../../../services/ui.service";
import { CompaniaService } from "../../../../services/compania.service";

import { Observable, from } from "rxjs";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
@Component({
  selector: "app-ascenso-grado",
  templateUrl: "./ascenso-grado.component.html",
  styleUrls: ["./ascenso-grado.component.scss"]
})
export class AscensoGradoComponent implements OnInit {
  grado: string;
  voluntarios: any[];
  voluntariosSelected: any[] = [];
  loading = true;
  displayedColumns: string[] = [
    "nombreCompleto",
    "grado",
    "gradoAscender",
    "compania",
    "acciones"
  ];
  formGroup: FormGroup;

  constructor(
    private activateRoute: ActivatedRoute,
    private voluntarioService: VoluntarioService,
    private companiaService: CompaniaService,
    private uiService: UiService,
    private ascensoService: AscensoService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      fecha: ["", Validators.required]
    });

    this.activateRoute.params
      .pipe(
        first(),
        map(d => {
          this.grado = d["grado"];
          return d["grado"];
        }),
        switchMap(e =>
          this.voluntarioService.getVoluntariosGrado(e).pipe(
            first(),
            map((personas: any) => personas.filter(p => p.estado == "activo"))
          )
        )
      )
      .subscribe(
        (e: any) => {
          this.voluntarios = e;
          this.loading = false;
          this.voluntariosSelected = e;
        },
        (error: any) => console.log("error :" + error),
        () => console.log("complete")
      );
  }
  onChange(row: any, $event: any) {
    if ($event.checked) {
      this.voluntariosSelected.push(row);
    } else {
      const index = this.voluntariosSelected.indexOf(row);
      if (index !== -1) {
        this.voluntariosSelected.splice(index, 1);
      }
    }
  }
  onAscender() {
    if (this.voluntariosSelected.length == 0) {
      this.uiService.warn("Debe seleccionar al menos 1 voluntario");
      return;
    } else if (!this.formGroup.valid) {
      this.uiService.warn("Ingrese Una Fecha Valida");
      return;
    } else {
      this.cambiarFormatoFecha();
      

      this.loading = true;
      this.ascensoService
        .ascender(this.voluntariosSelected,this.fecha)
        .subscribe(e => console.log(e), undefined, () => {
          this.loading = false;
          this.uiService.success("Se ascendio a los voluntarios seleccionados correctamente");
          this.router.navigate(["/dashboard/ascenso/index"]);
        });
    }
  }

  cambiarFormatoFecha(){
    let fecha = this.formGroup.get("fecha").value;
    if (fecha != "") {
      this.formGroup
        .get("fecha")
        .setValue(new Date(fecha).toISOString());
    }
  }
  get fecha(){
    return this.formGroup.get('fecha').value;
  }
}
