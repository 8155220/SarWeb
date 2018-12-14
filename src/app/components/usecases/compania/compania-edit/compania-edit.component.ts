import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { CompaniaService } from "./../../../../services/compania.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { UiService } from '../../../../services/ui.service';
import { Observable, Subscriber,from } from "rxjs";

@Component({
  selector: 'app-compania-edit',
  templateUrl: './compania-edit.component.html',
  styleUrls: ['./compania-edit.component.scss']
})
export class CompaniaEditComponent implements OnInit {
  formGroup: FormGroup;
  loading = true;
  compania:any;
  constructor(
    private especilidadService: CompaniaService,
    private fb: FormBuilder,
    private router:Router,
    private activateRoute:ActivatedRoute,
    private uiService:UiService
  ) {}

  ngOnInit() {

    this.activateRoute.params.subscribe(e=>{
      this.especilidadService.getCompania(e['id']).subscribe(
        compania=> {
          this.compania=compania;
          this.compania.id=e['id'];          
          this.formGroup = this.fb.group({
            id:e['id'],
            nombre: [this.compania.nombre, [Validators.required]],
            descripcion: [this.compania.descripcion, [Validators.required]],
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
        this.especilidadService.updateCompania(this.formGroup.value).subscribe(
        (e: any) => {
          if (e.bytesTransferred != null) {
            if (e.bytesTransferred == e.totalBytes) {
              this.loading = false;
              this.uiService.success("Registrado Exitosamente");
              this.router.navigate(["/dashboard/compania/index"]);
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
      

       this.especilidadService.updateCompania(this.formGroup.value).subscribe(
        (e: any) => {
          this.loading = false;
          this.uiService.success("Registrado Exitosamente");
          this.router.navigate(["/dashboard/compania/index"]);
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
