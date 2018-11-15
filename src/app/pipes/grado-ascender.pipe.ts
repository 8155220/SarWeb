import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gradoAscender'
})
export class GradoAscenderPipe implements PipeTransform {

  transform(grado:string): string {
    switch (grado){
      case "primerAnio":{
        return "segundoAnio";
        
      }
      case "segundoAnio":{
        return "tercerAnio";
        
      }
      case "tercerAnio":{
        return "rescatistaInicial";
        
      }
      case "rescatistaInicial":{
        return "rescatistaSegundo";
        
      }
      case "rescatistaSegundo":{
        return "rescatistaPrimero";
        
      }
      case "rescatistaPrimero":{
        return "rescatistaEspecialista";
        
      }
      case "rescatistaEspecialista":{
        return "rescatistaMaster";
        
      }
      case "rescatistaMaster":{
        return "rescatistaComando";
        
      }
      case "rescatistaComando":{
        return "NO SE PUEDE ASCENDER";
        
      }
    }
    return (grado!="") ? grado :  'empty string';

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
