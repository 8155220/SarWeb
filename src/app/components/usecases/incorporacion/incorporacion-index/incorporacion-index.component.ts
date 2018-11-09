import { IncorporacionService } from './../../../../services/Incorporacion.service';
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { UiService } from "../../../../services/ui.service";

@Component({
  selector: 'app-incorporacion-index',
  templateUrl: './incorporacion-index.component.html',
  styleUrls: ['./incorporacion-index.component.scss']
})
export class IncorporacionIndexComponent implements OnInit {
  loading = true;
  displayedColumns: string[] = ["nombreCompleto","descripcion", "fecha", "acciones"];
  Incorporaciones: any[] = [];
  constructor(
    private IncorporacionService: IncorporacionService,
    private uiService: UiService
  ) {
    
  }

  ngOnInit() { 
    this.IncorporacionService.getIncorporaciones().subscribe(e => {
      this.Incorporaciones = e;
      this.loading = false;
    });
  }

  onDetail(row:any){
    this.uiService.router.navigate(['/incorporacion/detail',row.id]);
  }

}
