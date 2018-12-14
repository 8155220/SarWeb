import { MisionService } from "./../../../../services/mision.service";
import { MatDialog } from "@angular/material";
import { first, map, switchMap } from "rxjs/operators";
import { MatDialogConfig } from "@angular/material";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { UiService } from "../../../../services/ui.service";
import { SearchPersonaComponent } from "../../../shared/search-persona/search-persona.component";

@Component({
  selector: "app-mision-edit",
  templateUrl: "./mision-edit.component.html",
  styleUrls: ["./mision-edit.component.scss"]
})
export class MisionEditComponent implements OnInit {
  loading = true;
  formGroup: FormGroup;

  mision: any;
  idmision:any;

  voluntarios: any[] = [];
  voluntariosAntiguos:any[]=[];
  oficialAntiguo:any;
  constructor(
    private uiService: UiService,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private misionService: MisionService,
    private activatedRoute: ActivatedRoute
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
        grado: [""],
        nombreCompleto: [""],
        CM: [""],
        id: [""]
      }),
      voluntarios: this.fb.array([]),
      observaciones: [""],
      solicitudPor: this.fb.group({
        persona1NombreCompleto: [""],
        persona1Cargo: [""],
        persona2NombreCompleto: [""],
        persona2Cargo: [""]
      })
    });
    this.activatedRoute.params
      .pipe(
        first(),
        map(e => e["id"]),
        switchMap(id => {
          this.idmision = id; 
          return this.misionService.getMision(id);
        })
      )
      .subscribe((e: any) => {
        this.loading = false;
        this.mision = e;
        this.fechaSolicitud = new Date(e.fechaSolicitud);
        this.fechaOperacion = new Date(e.fechaOperacion);
        this.tipoOperativoMision = e.tipoOperativoMision;
        this.lugarEvento = e.lugarEvento;
        this.medioTransporte = e.medioTransporte;
        this.estimado = e.estimado;
        this.datosSolicitante = e.datosSolicitante;
        this.oficialAlMando = e.oficialAlMando;
        this.observaciones = e.observaciones;
        this.solicitudPor = e.solicitudPor;
        this.cargarComentarios(e.comentarios);
        this.cargarVoluntarios(e.voluntarios);
        this.voluntariosAntiguos = e.voluntarios;
        this.oficialAntiguo=e.oficialAlMando;
        //cargar Voluntarios
      });
  }

  addComentario() {
    this.comentariosFormArray.push(this.fb.group({ descripcion: [""] }));
  }
  addComentarioWithData(comentario:any){
    this.comentariosFormArray.push(this.fb.group({ descripcion: [comentario.descripcion] }));
  }
  deleteComentario(index) {
    this.comentariosFormArray.removeAt(index);
  }
  addVoluntario(data) {
    this.voluntarios.push(data);
    this.voluntariosFormArray.push(
      this.fb.group({
        grado: [data.grado],
        nombreCompleto: [data.nombreCompleto],
        id: [data.id]
      })
    );
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
          this.oficialId = data.id;
        }
      });
  }
  ///getFormArrays
  get voluntariosFormArray() {
    return this.formGroup.get("voluntarios") as FormArray;
  }
  get comentariosFormArray() {
    return this.formGroup.get("comentarios") as FormArray;
  }
  ///

  set oficialId(value: string) {
    this.formGroup
      .get("oficialAlMando")
      .get("id")
      .setValue(value);
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

  //tipoOperativoMision
  get tipoOperativoMision() {
    return this.formGroup.get("tipoOperativoMision").value;
  }
  set tipoOperativoMision(value) {
    this.formGroup.get("tipoOperativoMision").setValue(value);
  }
  //lugarEvento
  get lugarEvento() {
    return this.formGroup.get("lugarEvento").value;
  }
  set lugarEvento(value) {
    this.formGroup.get("lugarEvento").setValue(value);
  }
  //medioTransporte
  get medioTransporte() {
    return this.formGroup.get("medioTransporte").value;
  }
  set medioTransporte(value) {
    this.formGroup.get("medioTransporte").setValue(value);
  }
  //comentarios
  //estimado
  get estimado() {
    return this.formGroup.get("estimado").value;
  }
  set estimado(value) {
    this.formGroup.get("estimado").setValue(value);
    this.fechaSalida = new Date(value.salidaFecha);
    this.fechaArribo = new Date(value.arriboFecha);
  }
  //datosSolicitante
  get datosSolicitante() {
    return this.formGroup.get("datosSolicitante").value;
  }
  set datosSolicitante(value) {
    this.formGroup.get("datosSolicitante").setValue(value);
  }
  //oficialAlMando
  get oficialAlMando() {
    return this.formGroup.get("oficialAlMando").value;
  }
  set oficialAlMando(value) {
    this.formGroup.get("oficialAlMando").setValue(value);
  }
  //voluntarios
  //observaciones
  get observaciones() {
    return this.formGroup.get("observaciones").value;
  }
  set observaciones(value) {
    this.formGroup.get("observaciones").setValue(value);
  }
  //solicitudPor
  get solicitudPor() {
    return this.formGroup.get("solicitudPor").value;
  }
  set solicitudPor(value) {
    this.formGroup.get("solicitudPor").setValue(value);
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

  cargarComentarios(comentarios:any) {
    if(comentarios){
      comentarios.forEach(e => {
        this.addComentarioWithData(e);
      });
    }
    
  }
  cargarVoluntarios(voluntarios:any ) {
    if(voluntarios){
      voluntarios.forEach(e => {
        this.addVoluntario(e);      
      });
    }
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

  onSubmit() {
    if (!this.formGroup.valid) {
      this.uiService.warn("Complete los campos requeridos");
    } else {
      this.loading = true;
      this.convertirFechasToTimeStamp();
      this.misionService.updateMision(this.formGroup.getRawValue(),this.idmision,this.oficialAntiguo,this.voluntariosAntiguos).subscribe(
        e => {},
        error => {
          this.loading = false;
          console.log(error);
          
          this.uiService.warn("Ocurrio un error, intente mas tarde");
          this.router.navigate(["/dashboard/mision/index"]);
        },
        () => {
          this.loading = false;
          this.uiService.success("Mision Editada Correctamente");
          this.router.navigate(["/dashboard/mision/index"]);
        }
      );
    }
  }

  convertirFechasToTimeStamp() {
    this.fechaSolicitud = new Date(this.fechaSolicitud).getTime();
    this.fechaOperacion = new Date(this.fechaOperacion).getTime();
    this.fechaArribo = new Date(this.fechaArribo).getTime();
    this.fechaSalida = new Date(this.fechaSalida).getTime();
  }
}
