import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoMision'
})
export class GradoPipe implements PipeTransform {

  transform(data:string): string {
    switch (data){
      case "busquedaRescatePerdidos":{
        return "BÚSQUEDA Y RESCATE(PERDIDOS)";
      }
      case "busquedaRescateAhogadosAguaDetenida":{
        return "BÚSQUEDA Y RESCATE(AHOGADOS/AGUA DETENIDA)";
      }
      case "busquedaRescateAhogadosAguaRapida":{
        return "BÚSQUEDA Y RESCATE(AHOGADOS/AGUA RAPIDA)";
      }
      case "accionCivica":{
        return "ACCIÓN CÍVICA";
      }
      case "defensaCivil":{
        return "DEFENSA CIVIL";
      }
      case "entrenamiento":{
        return "ENTRENAMIENTO";
      }
      case "seguridad":{
        return "SEGURIDAD";
      }
      case "accidenteAereo":{
        return "ACCIDENTE AÉREO";
      }
      case "otros":{
        return "OTROS";
      }
    }
    return (data!="") ? data :  'empty string';

  }

  /*

                            <mat-option value="primerAnio" *ngIf="tipoPersona()=='voluntariosar'">
                                Voluntario 1er año
                            </mat-option>
                            <mat-option value="segundoAnio" *ngIf="tipoPersona()=='voluntariosar'">
                                Voluntario 2do año
                            </mat-option>
                            <mat-option value="tercerAnio" *ngIf="tipoPersona()=='voluntariosar'">
                                Voluntario 3er año
                            </mat-option>
                            <mat-option value="rescatistaInicial" *ngIf="tipoPersona()=='voluntariosar'">
                                Rescatista Inicial
                            </mat-option>
                            <mat-option value="rescatistaSegundo" *ngIf="tipoPersona()=='voluntariosar'">
                                Rescatista Segundo
                            </mat-option>
                            <mat-option value="rescatistaPrimero" *ngIf="tipoPersona()=='voluntariosar'">
                                Rescatista Primero
                            </mat-option>
                            <mat-option value="rescatistaEspecialista" *ngIf="tipoPersona()=='voluntariosar'">
                                Rescatista Especialista
                            </mat-option>
                            <mat-option value="rescatistaMaster" *ngIf="tipoPersona()=='voluntariosar'">
                                Rescatista Master
                            </mat-option>
                            <mat-option value="rescatistaComando" *ngIf="tipoPersona()=='voluntariosar'">
                                Rescatista Comando
                            </mat-option>
  */
}
