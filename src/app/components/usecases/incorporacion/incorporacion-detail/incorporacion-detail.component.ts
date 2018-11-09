import { ActivatedRoute, Router } from "@angular/router";
import { first, map, switchMap, concat } from "rxjs/operators";
import { Component, OnInit } from "@angular/core";
import { IncorporacionService } from "../../../../services/incorporacion.service";
import { VoluntarioService } from "../../../../services/voluntario.service";

@Component({
  selector: 'app-incorporacion-detail',
  templateUrl: './incorporacion-detail.component.html',
  styleUrls: ['./incorporacion-detail.component.scss']
})
export class IncorporacionDetailComponent implements OnInit {
  incorporacion: any;
  persona: any;
  loading = true;
  incorporacionid = "";
  constructor(
    private incorporacionService: IncorporacionService,
    private voluntarioService: VoluntarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        first(),
        map(e => {
          this.incorporacionid = e["id"];
          return e["id"];
        }),
        switchMap(id =>
          this.incorporacionService.getIncorporacion(id).pipe(
            first(),
            switchMap((e: any) => {
              this.incorporacion = e;
              return this.voluntarioService.getVoluntario(e.idpersona);
            })
          )
        )
      )
      .subscribe((e: any) => {
        this.loading = false;
        this.persona = e;
      });
  }
}

