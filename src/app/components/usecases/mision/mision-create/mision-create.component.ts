import { MatDialog } from "@angular/material";
import { first } from "rxjs/operators";
import { MatDialogConfig } from "@angular/material";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { UiService } from "../../../../services/ui.service";
import { SearchPersonaComponent } from "../../../shared/search-persona/search-persona.component";

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from "@angular/material/core";
import { MisionService } from "../../../../services/mision.service";

@Component({
  selector: "app-mision-create",
  templateUrl: "./mision-create.component.html",
  styleUrls: ["./mision-create.component.scss"]
})
export class MisionCreateComponent implements OnInit {
  loading = false;
  formGroup: FormGroup;
  date = new Date();

  voluntarios: any[] = [];
  constructor(
    private uiService: UiService,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private misionService: MisionService
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      fechaSolicitud: ["", [Validators.required]],
      fechaOperacion: ["", [Validators.required]],
      tipoOperativoMision: ["", [Validators.required]],
      lugarEvento: this.fb.group({
        ciudad: [""],
        provincia: [""],
        localidad: [""],
        comunidad: [""],
        zonaAvenida: [""]
      }),
      medioTransporte: this.fb.group({
        tipoVehiculo: [""],
        propietario: [""],
        matricula: [""],
        conducidoPor: [""]
      }),
      comentarios: this.fb.array([]),
      estimado: this.fb.group({
        salidaLugar: [""],
        salidaFecha: ["", [Validators.required]],
        arriboLugar: [""],
        arriboFecha: ["", [Validators.required]]
      }),
      datosSolicitante: this.fb.group({
        nombre: [""],
        numeroTelefono: [""],
        atencion: [""],
        intercambio: [""]
      }),
      oficialAlMando: this.fb.group({
        grado:[""],
        nombreCompleto: [""],
        CM: [""],
        id:[""],
      }),
      voluntarios: this.fb.array([]),
      observaciones: [""],
      solicitudPor: this.fb.group({
        persona1NombreCompleto: [""],
        persona1Cargo: [""],
        persona2NombreCompleto: [""],
        persona2Cargo: [""]
      }),
     /* autorizacionOperativo: this.fb.group({
        numeroAutorizacion: [""],
        fecha: [""],
        hora: [""],
        autorizado: [""],
        rechazado: [""]
      }),
      observacionesFinales: [""]*/
    });
  }

  get comentariosFormArray() {
    return this.formGroup.get("comentarios") as FormArray;
  }
  addComentario() {
    this.comentariosFormArray.push(this.fb.group({ descripcion: [""] }));
  }
  deleteComentario(index) {
    this.comentariosFormArray.removeAt(index);
  }
  get voluntariosFormArray() {
    return this.formGroup.get("voluntarios") as FormArray;
  }
  addVoluntario(data) {
    this.voluntarios.push(data);
    this.voluntariosFormArray.push(
      this.fb.group({
        grado: [data.grado],
        nombreCompleto: [data.nombreCompleto],
        id:[data.id]
      })
    );
    console.log(this.voluntariosFormArray.value);
    console.log(this.formGroup.value);
    
    
  }
  deleteVoluntario(index) {
    this.voluntariosFormArray.removeAt(index);
    this.voluntarios.splice(index, 1);
  }

  onClickPersonalCuadro() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { tipoPersona: "militar" };
    const dialogRef = this.dialog.open(SearchPersonaComponent, dialogConfig);
    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe((data: any) => {
        if (data) {
          //this.formGroup.get('oficialAlMando').get('grado').setValue(data.grado);
          this.oficialGrado = data.grado;
          this.oficialNombreCompleto = data.nombreCompleto;
          this.oficialId=data.id;
        }
      });
  }

  get oficialGrado() {
    return this.formGroup.get("oficialAlMando").get("grado").value;
  }
  set oficialGrado(value: string) {
    this.formGroup
      .get("oficialAlMando")
      .get("grado")
      .setValue(value);
  }
  get oficialNombreCompleto() {
    return this.formGroup.get("oficialAlMando").get("nombreCompleto").value;
  }
  set oficialNombreCompleto(value: string) {
    this.formGroup
      .get("oficialAlMando")
      .get("nombreCompleto")
      .setValue(value);
  }
  set oficialId(value:string){
    this.formGroup.get("oficialAlMando").get("id").setValue(value);
  }

  addVoluntarioMision() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { tipoPersona: "voluntariosar" };
    const dialogRef = this.dialog.open(SearchPersonaComponent, dialogConfig);
    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe((data: any) => {
        if (data) {
          //this.formGroup.get('oficialAlMando').get('grado').setValue(data.grado);
          let vol = this.voluntarios.find((e: any) => {
            return e.nombreCompleto == data.nombreCompleto;
          });
          if (vol) {
            this.uiService.warn("El voluntario ya se encuentra en la lista");
          } else {
            this.addVoluntario(data);
          }
        }
      });
  }

  get fechaSolicitud() {
    return this.formGroup.get("fechaSolicitud").value;
  }
  get fechaOperacion() {
    return this.formGroup.get("fechaOperacion").value;
  }
  get fechaArribo() {
    return this.formGroup.get("estimado").get("arriboFecha").value;
  }
  get fechaSalida() {
    return this.formGroup.get("estimado").get("salidaFecha").value;
  }
  set fechaSolicitud(value) {
    this.formGroup.get("fechaSolicitud").setValue(value);
  }
  set fechaOperacion(value) {
    this.formGroup.get("fechaOperacion").setValue(value);
  }
  set fechaArribo(value) {
    this.formGroup
      .get("estimado")
      .get("arriboFecha")
      .setValue(value);
  }
  set fechaSalida(value) {
    this.formGroup
      .get("estimado")
      .get("salidaFecha")
      .setValue(value);
  }
  onSubmit() {
    if (!this.formGroup.valid) {
      this.uiService.warn("Complete los campos requeridos");
    } else {
      this.loading = true;
      this.convertirFechasToTimeStamp();
      this.misionService.addMision(this.formGroup.getRawValue()).subscribe(e => {
        
      },error=>{
        this.loading = false;
        this.uiService.warn("Ocurrio un error, intente mas tarde");
        this.router.navigate(['mision/index']);
      },()=>{
        this.loading = false;
        this.uiService.success("Mision Creada Correctamente");
        this.router.navigate(['mision/index']);
      });
    }
  }

  convertirFechasToTimeStamp() {
    this.fechaSolicitud = new Date(this.fechaSolicitud).getTime();
    this.fechaOperacion = new Date(this.fechaOperacion).getTime();
    this.fechaArribo = new Date(this.fechaArribo).getTime();
    this.fechaSalida = new Date(this.fechaSalida).getTime();
  }
}
