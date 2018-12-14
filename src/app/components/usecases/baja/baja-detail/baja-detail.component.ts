import { ActivatedRoute, Router } from "@angular/router";
import { first, map, switchMap, concat } from "rxjs/operators";
import { Component, OnInit } from "@angular/core";
import { BajaService } from "../../../../services/baja.service";
import { VoluntarioService } from "../../../../services/voluntario.service";
@Component({
  selector: "app-baja-detail",
  templateUrl: "./baja-detail.component.html",
  styleUrls: ["./baja-detail.component.scss"]
})
export class BajaDetailComponent implements OnInit {
  baja: any;
  persona: any;
  loading = true;
  bajaid = "";
  constructor(
    private bajaService: BajaService,
    private voluntarioService: VoluntarioService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        first(),
        map(e => {
          this.bajaid = e["id"];
          return e["id"];
        }),
        switchMap(id =>
          this.bajaService.getBaja(id).pipe(
            first(),
            switchMap((e: any) => {
              this.baja = e;
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
