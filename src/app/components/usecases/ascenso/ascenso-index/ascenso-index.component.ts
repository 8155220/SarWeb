import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AscensoService } from './../../../../services/ascenso.service';
import { Component, OnInit } from '@angular/core';
import { UiService } from '../../../../services/ui.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { SearchPersonaComponent } from '../../../shared/search-persona/search-persona.component';
import { AscensoVoluntarioComponent } from '../ascenso-voluntario/ascenso-voluntario.component';

@Component({
  selector: 'app-ascenso-index',
  templateUrl: './ascenso-index.component.html',
  styleUrls: ['./ascenso-index.component.scss']
})
export class AscensoIndexComponent implements OnInit {

  ascensos: any[];
  loading = true;
  displayedColumns: string[] = [
    "nombreCompleto",
    "gradoAntiguo",
    "gradoNuevo",
    "fecha"
  ];
  ascenderGradoClicked=false;
  selectedValue:string;
  grados: any[] = [
    //Ubicacion:
    { value: "primerAnio", viewValue: "Voluntario 1er año" },
    { value: "segundoAnio", viewValue: "Voluntario 2do año" },
    { value: "tercerAnio", viewValue: "Voluntario 3er año" },
    { value: "rescatistaInicial", viewValue: "Rescatista Inicial" },
    { value: "rescatistaSegundo", viewValue: "Rescatista Segundo" },
    { value: "rescatistaPrimero", viewValue: "Rescatista Primero" },
    { value: "rescatistaEspecialista", viewValue: "Rescatista Especialista" },
    { value: "rescatistaMaster", viewValue: "Rescatista Master" },
  ];
  constructor(
    private uiService: UiService,
    private ascensoService: AscensoService,
    private router:Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.ascensoService.getAscensos().pipe(first()).subscribe(e=>{
      this.loading=false;
      this.ascensos=e;
      console.log(e);
    });
    
  }

  onNext(){
    if(this.selectedValue==""){
      this.uiService.warn("seleccione una opcion valida");
    } else {
        this.router.navigate(["ascenso/grado",this.selectedValue])
    }
  }
  ascenderVoluntario(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(SearchPersonaComponent, dialogConfig);
    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe((data: any) => {
        if(data.grado=='rescatistaComando')
        {
          this.uiService.warn("Se encuentra en el rango mas alto");
        }else{
          dialogConfig.data={persona:data};
          this.dialog.open(AscensoVoluntarioComponent,dialogConfig);
        }
      });
  }

}
