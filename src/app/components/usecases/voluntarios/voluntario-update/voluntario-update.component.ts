import { InformacionExtraComponent } from "./../componentes/informacion-extra/informacion-extra.component";
import { DatosFisicosComponent } from "./../componentes/datos-fisicos/datos-fisicos.component";
import { InformacionPersonalComponent } from "./../componentes/informacion-personal/informacion-personal.component";
import { environment } from "../../../../../environments/environment";
import { VoluntarioModel } from "../../../../models/voluntario/voluntario.model";
import { UiService } from "../../../../services/ui.service";
import { VoluntarioService } from "../../../../services/voluntario.service";
import { Observable, Subscriber } from "rxjs";
import { map, startWith, filter } from "rxjs/operators";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray
} from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";
import { EmergenciaComponent } from "../componentes/emergencia/emergencia.component";
import { LoginComponent } from '../../../auth/login/login.component';

@Component({
  selector: "app-voluntario-update",
  templateUrl: "./voluntario-update.component.html",
  styleUrls: ["./voluntario-update.component.css"]
})
export class VoluntarioUpdateComponent implements OnInit {
  id:string="";
  loading = false;
  imagenPerfil = "";
  @ViewChild("informacionPersonal")
  informacionPersonal: InformacionPersonalComponent;
  @ViewChild("datosFisicos")
  datosFisicos: DatosFisicosComponent;
  @ViewChild("emergencia")
  emergencia: EmergenciaComponent;
  @ViewChild("informacionExtra")
  informacionExtra: InformacionExtraComponent;

  informacionPersonalValue: any;
  datosFisicosValue: any;
  familiaresValue: any;
  informacionAdicionalValue: any;

  informacionPersonalPrevValue:any;
  datosFisicosPrevValue:any;
  familiaresPrevValue:any;
  informacionAdicionalPrevValue:any;

  constructor(
    private fb: FormBuilder,
    private voluntarioService: VoluntarioService,
    public snackBar: MatSnackBar,
    private uiService: UiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.uiService.useCaseStateChanged.next("Editar Persona");
    this.activatedRoute.params.subscribe(e => {
      this.id = e["id"];
      this.voluntarioService
        .getInformacionPersonal(this.id)
        .subscribe(e => {
          this.informacionPersonalPrevValue=e;
        });
      this.voluntarioService.getDatosFisicos(this.id).subscribe(e=>{
        this.datosFisicosPrevValue=e;
      });
      this.voluntarioService.getFamiliares(this.id).subscribe(e=>{
        this.familiaresPrevValue=e;
      });
      this.voluntarioService.getInformacionAdicional(this.id).subscribe(e=>{
        this.informacionAdicionalPrevValue=e;
      });
    });
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }

  submitHandler() {}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  imageReceived(image: string) {
    this.imagenPerfil = image;
  }

  IPValue($event) {
    console.log($event);
    this.informacionPersonalValue = $event;
  }
  DFValue($event) {
    console.log($event);
    this.datosFisicosValue = $event;
  }
  EValue($event) {
    console.log($event);
    this.familiaresValue = $event;
  }
  IEValue($event) {
    console.log($event);
    this.informacionAdicionalValue = $event;
    console.log('noProblem');
    
  }

  guardar() {
    this.informacionPersonal.getValue();
    this.datosFisicos.getValue();
    this.emergencia.getValue();
    this.informacionExtra.getValue();


    if (!this.informacionPersonal.formGroup.valid) {
      this.openSnackBar("Complete Informacion Personal", "ocultar");
      return;
    } else {
      this.loading = true;
      if (this.informacionAdicionalValue.fotoURL) {
        this.voluntarioService
          .updateVoluntario(
            this.id,
            this.informacionPersonalValue,
            this.datosFisicosValue,
            this.familiaresValue,
            this.informacionAdicionalValue,
            this.informacionPersonalPrevValue
          )
          .subscribe(
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
              console.log(e);
              this.loading = false;
              this.openSnackBar(
                "Ocurrio un error intente mas tarde",
                "ocultar"
              );
            }
          );
      } else {
        
        this.voluntarioService
        .updateVoluntario(
          this.id,
          this.informacionPersonalValue,
          this.datosFisicosValue,
          this.familiaresValue,
          this.informacionAdicionalValue,
          this.informacionPersonalPrevValue
        )
          .subscribe(
            (e: any) => {
              this.loading = false;
              this.openSnackBar("Actualizado Exitosamente", "ocultar");
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

    // this.voluntarioService.testPushEmergencia(this.emergenciaValue);
  }
}
