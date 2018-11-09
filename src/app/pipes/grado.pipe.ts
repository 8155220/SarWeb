import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'grado'
})
export class GradoPipe implements PipeTransform {

  transform(data:string): string {
    switch (data){
      case "primerAnio":{
        return "Voluntario 1er año";
      }
      case "segundoAnio":{
        return "Voluntario 2do año";
      }
      case "tercerAnio":{
        return "Voluntario 3er año";
      }
      case "rescatistaInicial":{
        return "Rescatista Inicial";
      }
      case "rescatistaSegundo":{
        return "Rescatista Segundo";
      }
      case "rescatistaPrimero":{
        return "Rescatista Primero";
      }
      case "rescatistaEspecialista":{
        return "Rescatista Especialista";
      }
      case "rescatistaMaster":{
        return "Rescatista Master";
      }
      case "rescatistaComando":{
        return "Rescatista Comando";
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
