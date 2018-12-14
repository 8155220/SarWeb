import { UiService } from './../../../../services/ui.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map, switchMap } from "rxjs/operators";
import { PrivilegiosService } from '../../../../services/privilegios.service';
@Component({
  selector: 'app-privilegios-edit',
  templateUrl: './privilegios-edit.component.html',
  styleUrls: ['./privilegios-edit.component.scss']
})
export class PrivilegiosEditComponent implements OnInit {
  privilegiosid="";
  privilegios: any[];
  formGroup: FormGroup;
  loading = true;
  constructor(
    private privilegioService: PrivilegiosService,
    private uiService: UiService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit() {

    this.activatedRoute.params
      .pipe(
        first(),
        map(e => {
          this.privilegiosid=e['id'];
          return e["id"]})
        ,switchMap(id=> this.privilegioService.getPrivilegio(id).pipe(first()))
      )
      .subscribe((e:any) => {
        this.loading=false;
        this.privilegios=e;
        this.formGroup = this.fb.group({
          nombre: [e.nombre, [Validators.required]],
          personas: this.fb.group({
            read:e.personas.read,
            create:e.personas.create,
            edit:e.personas.edit,
            delete:e.personas.delete
          }),
          /////
          especialidades: this.fb.group({
            read:e.especialidades.read,
            create:e.especialidades.create,
            edit:e.especialidades.edit,
            delete:e.especialidades.delete
          }),
          companias: this.fb.group({
            read:e.companias.read,
            create:e.companias.create,
            edit:e.companias.edit,
            delete:e.companias.delete
          }),
          meritos: this.fb.group({
            read:e.meritos.read,
            create:e.meritos.create,
            edit:e.meritos.edit,
            delete:e.meritos.delete
          }),
          demeritos: this.fb.group({
            read:e.demeritos.read,
            create:e.demeritos.create,
            edit:e.demeritos.edit,
            delete:e.demeritos.delete
          }),
          bajas: this.fb.group({
            read:e.bajas.read,
            create:e.bajas.create,
            edit:e.bajas.edit,
            delete:e.bajas.delete
          }),
          incorporaciones: this.fb.group({
            read:e.incorporaciones.read,
            create:e.incorporaciones.create,
            edit:e.incorporaciones.edit,
            delete:e.incorporaciones.delete
          }),
          ascensos: this.fb.group({
            read:e.ascensos.read,
            create:e.ascensos.create,
            edit:e.ascensos.edit,
            delete:e.ascensos.delete
          }),
          misiones: this.fb.group({
            read:e.misiones.read,
            create:e.misiones.create,
            edit:e.misiones.edit,
            delete:e.misiones.delete
          }),      
          privilegios: this.fb.group({
            read:e.privilegios.read,
            create:e.privilegios.create,
            edit:e.privilegios.edit,
            delete:e.privilegios.delete
          }),
        });
      }
      );
  }

  onSubmit() {
    this.loading = true;
    console.log(this.formGroup.value);
    console.log(this.privilegiosid);
    this.privilegioService.updatePrivilegio(this.formGroup.value,this.privilegiosid).subscribe(
      e => {
        this.loading = false;
        this.uiService.success('Guardaro Exitosamente');
          this.router.navigate(["/dashboard/privilegios/index"]);
      },
      (e: any) => console.log(e),
      () => console.log("Complete")
    );
  }
  onCancel(){
    this.router.navigate(["/dashboard/privilegios/index"]);
  }

}
