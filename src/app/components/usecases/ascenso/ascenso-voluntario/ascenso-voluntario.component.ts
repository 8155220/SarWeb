import { AscensoService } from './../../../../services/ascenso.service';

import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UiService } from '../../../../services/ui.service';
@Component({
  selector: 'app-ascenso-voluntario',
  templateUrl: './ascenso-voluntario.component.html',
  styleUrls: ['./ascenso-voluntario.component.scss']
})
export class AscensoVoluntarioComponent implements OnInit {

  loading=false;
  persona:any;
  fecha:string;
  formGroup:FormGroup;
  constructor(private ascensoService:AscensoService,
          private uiService:UiService,
          private dialogRef:MatDialogRef<AscensoVoluntarioComponent>,
          @Inject(MAT_DIALOG_DATA) data,
          private fb:FormBuilder) { 
            this.persona=data.persona;
          }

  ngOnInit() {

  }

  onClose(){
    this.dialogRef.close();
  }
  onSave(){
    if (this.fecha != "") {
      this.loading=true;
      this.fecha = new Date(this.fecha).toISOString();
      this.ascensoService.ascenderVoluntario(this.persona,this.fecha).subscribe(e=>{}
        ,undefined,()=>{
          this.loading=false;
          this.dialogRef.close();
        });
    }
    else{
      this.uiService.warn("Ingrese una fecha valida");
    }
   /* this.ascensoService.addEspecialidadVoluntario(this.especialidad,this.persona,this.formGroup.value)
    .subscribe(e=>{
      this.uiService.success("Agregado Exitosamente");
      this.dialogRef.close();
    },error=>{
      this.uiService.warn("Ocurrio Un Error Contacte al Administrador del sistema");
      this.dialogRef.close();
    });*/
  }

}
