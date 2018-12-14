import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { EspecialidadService } from "./../../../../services/especialidad.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { UiService } from '../../../../services/ui.service';
import { Observable, Subscriber,from } from "rxjs";
@Component({
  selector: 'app-especialidad-edit',
  templateUrl: './especialidad-edit.component.html',
  styleUrls: ['./especialidad-edit.component.scss']
})
export class EspecialidadEditComponent implements OnInit {
  formGroup: FormGroup;
  loading = true;
  especialidad:any;
  constructor(
    private especilidadService: EspecialidadService,
    private fb: FormBuilder,
    private router:Router,
    private activateRoute:ActivatedRoute,
    private uiService:UiService
  ) {}

  ngOnInit() {

    this.activateRoute.params.subscribe(e=>{
      this.especilidadService.getEspecialidad(e['id']).subscribe(
        especialidad=> {
          this.especialidad=especialidad;
          this.especialidad.id=e['id'];          
          this.formGroup = this.fb.group({
            id:e['id'],
            nombre: [this.especialidad.nombre, [Validators.required]],
            descripcion: [this.especialidad.descripcion, [Validators.required]],
          });
          this.loading = false;
        }
      );
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
      this.uiService.success("Complete los campos requeridos','ocultar");
      return;
    }
    this.loading=true;
    if(this.formGroup.get("imagenURL") && this.formGroup.get("imagenURL").value!='')
    {
        this.especilidadService.updateEspecialidad(this.formGroup.value).subscribe(
        (e: any) => {
          if (e.bytesTransferred != null) {
            if (e.bytesTransferred == e.totalBytes) {
              this.loading = false;
              this.uiService.success("Registrado Exitosamente");
              this.router.navigate(["/dashboard/especialidad/index"]);
            }
          }
        },
        e => {
          this.loading = false;
          this.uiService.success("Ocurrio un error intente mas tarde");
        }
      );  
    } else {
      console.log('Entro');
      

       this.especilidadService.updateEspecialidad(this.formGroup.value).subscribe(
        (e: any) => {
          this.loading = false;
          this.uiService.success("Registrado Exitosamente");
          this.router.navigate(["/dashboard/especialidad/index"]);
        }
        ,(e:any)=>{
          e => {
            this.loading = false;
            this.uiService.success("Ocurrio un error intente mas tarde");
          }
        }

      );
    }
    
  }

}
