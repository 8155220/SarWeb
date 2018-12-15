import { CanAccessService } from './../../../../services/can-access.service';
import { element } from "protractor";
import { ActivatedRoute } from "@angular/router";
import { UiService } from "./../../../../services/ui.service";
import { EspecialidadService } from "./../../../../services/especialidad.service";
import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { SearchPersonaComponent } from "../../../shared/search-persona/search-persona.component";
import { AgregarEspecialidadVoluntarioComponent } from "../../../shared/agregar-especialidad-voluntario/agregar-especialidad-voluntario.component";
import { take, first, map, mergeMap } from "rxjs/operators";
import { VoluntarioService } from "../../../../services/voluntario.service";
import { Observable, forkJoin, from } from "rxjs";

@Component({
  selector: "app-especialidad-detail",
  templateUrl: "./especialidad-detail.component.html",
  styleUrls: ["./especialidad-detail.component.scss"]
})
export class EspecialidadDetailComponent implements OnInit {
  especialidad: any;
  personas: any[] = [];
  loading = true;
  constructor(
    private especialidadService: EspecialidadService,
    private activateRoute: ActivatedRoute,
    private voluntarioService: VoluntarioService,
    private uiService: UiService,
    private dialog: MatDialog,
    private ca:CanAccessService
  ) {
    activateRoute.params.subscribe(data => {
      this.especialidadService.getEspecialidad(data["id"]).subscribe(e => {
        console.log(e);
        this.especialidad = e;
        this.loading = false;
        if (this.especialidad.idpersonas) {
          this.personas = [];
          this.getKeys();
        }
      });
    });
  }

  ngOnInit() {}
  openDialog() {

    this.ca.especialidadesCanAddVoluntario().subscribe(e=>{
      if(e){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        const dialogRef = this.dialog.open(SearchPersonaComponent, dialogConfig);
        dialogRef
          .afterClosed()
          .pipe(first())
          .subscribe((data: any) => {
            if (data) {
              this.especialidadService
                .checkEspecialidadVoluntario(data.id, this.especialidad.id)
                .pipe(first())
                .subscribe(e => {
                  if (e) {
                    //si el voluntario ya tiene la especialidad
                    this.uiService.warn(
                      "El voluntario ya tiene la especialidad " +
                        this.especialidad.nombre
                    );
                  } else {
                    dialogConfig.data = {
                      especialidad: this.especialidad,
                      persona: data
                    };
                    this.dialog.open(
                      AgregarEspecialidadVoluntarioComponent,
                      dialogConfig
                    );
                  }
                });
            }
          });
      }
    })
    
  }

  getVoluntario(id: string) {
    return this.voluntarioService.getVoluntario(id).pipe(first());
  }

  getKeys() {
    from(Object.values(this.especialidad.idpersonas))
      .pipe(mergeMap((value: any) => this.getVoluntario(value.idpersona)))
      .subscribe(e => {
        if (this.personas.indexOf(e) === -1) {
          this.personas.push(e);
        }
      });
  }

  onDelete(persona: any) {
    this.ca.especialidadesCanDelete().subscribe(e=>{
      if(e){
        this.uiService
      .openConfirmDialog(
        "Esta seguro que desea al Voluntario : " + persona.nombreCompleto + " de la especialidad : " +this.especialidad.nombre
      )
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.especialidadService
            .deleteVoluntariofromEspecialidad(persona.id, this.especialidad.id)
            .subscribe(e => {
              this.uiService.success(
                "Voluntario "+ persona.nombreCompleto+ " eliminado de la Especialidad :" +
                  this.especialidad.nombre
              );
            }, undefined);
        }
      });
      }
    }
    )

    
    
  }
}
