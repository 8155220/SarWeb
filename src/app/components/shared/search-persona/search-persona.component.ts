import { Subscriber } from "rxjs";
import { Subject } from "rxjs";
import { VoluntarioService } from "./../../../services/voluntario.service";
import { Component, OnInit, Output } from '@angular/core';
import { debounceTime,map, filter } from "rxjs/operators";
import { MatDialogRef } from '@angular/material';

@Component({
  selector: "app-search-persona",
  templateUrl: "./search-persona.component.html",
  styleUrls: ["./search-persona.component.scss"]
})
export class SearchPersonaComponent implements OnInit {
  personas;
  personaSelected:any;
  startAt = new Subject<string>();
  searchText:string="";
  searchDirty:boolean=false;

  constructor(private personaService: VoluntarioService,
    private dialogRef:MatDialogRef<SearchPersonaComponent>) {}

  ngOnInit() {
    this.startAt.pipe(debounceTime(250)).subscribe(e => {
      this.personaService
      .getPersonas(e, e+"\uf8ff")
      .pipe(map((e:any)=> e.filter(persona=>persona.tipoPersona=='voluntariosar')))
      .subscribe(personas => {
        this.personas = personas;
        console.log(personas);
      });
    });
  }
  search($event) {
    this.searchDirty=true;
    let q:string = $event.target.value;
    this.startAt.next(q.toLowerCase());
  }
  onClick(persona:any){
    this.personaSelected=persona;
  }
  onSelect(){
    this.dialogRef.close(this.personaSelected);
  }
  onCancel(){
    this.dialogRef.close();
  }

}
