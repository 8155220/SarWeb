import { UiService } from './../../../services/ui.service';
import { Component, OnInit, Inject } from '@angular/core';
import { EspecialidadService } from '../../../services/especialidad.service';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-especialidad-voluntario',
  templateUrl: './agregar-especialidad-voluntario.component.html',
  styleUrls: ['./agregar-especialidad-voluntario.component.scss']
})
export class AgregarEspecialidadVoluntarioComponent implements OnInit {

  loading=false;
  persona:any;
  especialidad:any;
  formGroup:FormGroup;
  constructor(private especialidadService:EspecialidadService,
          private uiService:UiService,
          private dialogRef:MatDialogRef<AgregarEspecialidadVoluntarioComponent>,
          @Inject(MAT_DIALOG_DATA) data,
          private fb:FormBuilder) { 
            this.especialidad=data.especialidad;
            this.persona=data.persona;
          }

  ngOnInit() {
    this.formGroup= this.fb.group({
      nota:["",[Validators.required,Validators.min(0),Validators.max(100)]],
      fecha:["",[Validators.required]]
    });
  }

  onClose(){
    this.dialogRef.close();
  }
  onSave(){
    let fecha = this.formGroup.get("fecha").value;
    if (fecha != "") {
      this.formGroup
        .get("fecha")
        .setValue(new Date(fecha).toISOString());
    }

    this.especialidadService.addEspecialidadVoluntario(this.especialidad,this.persona,this.formGroup.value)
    .subscribe(e=>{
      this.uiService.success("Agregado Exitosamente");
      this.dialogRef.close();
    },error=>{
      this.uiService.warn("Ocurrio Un Error Contacte al Administrador del sistema");
      this.dialogRef.close();
    });
    
  }

}
