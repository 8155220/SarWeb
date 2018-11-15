import { first,map } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { CompaniaService } from '../services/compania.service';
import { Observable } from 'rxjs';

@Pipe({
  name: 'compania'
})
export class CompaniaPipe implements PipeTransform {

  constructor(private companiaService:CompaniaService){
  }
  transform(data:string): Observable<any> {
    if(data!=""){
      return this.companiaService.getCompania(data).pipe(first(),map((e:any)=>e=e.nombre));
    }
  }

}
