import { element } from "protractor";
import { ActivatedRoute } from "@angular/router";
import { UiService } from "./../../../../services/ui.service";
import { CompaniaService } from "./../../../../services/compania.service";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { take, first, map, mergeMap } from "rxjs/operators";
import { VoluntarioService } from "../../../../services/voluntario.service";
import { Observable, forkJoin, from } from "rxjs";
@Component({
  selector: 'app-compania-detail',
  templateUrl: './compania-detail.component.html',
  styleUrls: ['./compania-detail.component.scss']
})
export class CompaniaDetailComponent implements OnInit {

  compania: any;
  personas: any[] = [];
  loading = true;
  constructor(
    private companiaService: CompaniaService,
    private activateRoute: ActivatedRoute,
    private voluntarioService: VoluntarioService,
    private uiService: UiService,
    private dialog: MatDialog
  ) {
    activateRoute.params.subscribe(data => {
      this.companiaService.getCompania(data["id"]).subscribe(e => {
        console.log(e);
        this.compania = e;
        this.loading = false;
        if (this.compania.idpersonas) {
          this.personas = [];
          this.getKeys();
        }
      });
    });
  }

  ngOnInit() {}


  getVoluntario(id: string) {
    return this.voluntarioService.getVoluntario(id).pipe(first());
  }

  getKeys() {
    from(Object.values(this.compania.idpersonas))
      .pipe(mergeMap((value: any) => this.getVoluntario(value.idpersona)))
      .subscribe(e => {
        if (this.personas.indexOf(e) === -1) {
          this.personas.push(e);
        }
      });
  }

  

}
