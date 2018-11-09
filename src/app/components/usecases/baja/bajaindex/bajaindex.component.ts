import { BajaService } from './../../../../services/baja.service';
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { UiService } from "../../../../services/ui.service";

@Component({
  selector: 'app-bajaindex',
  templateUrl: './bajaindex.component.html',
  styleUrls: ['./bajaindex.component.scss']
})
export class BajaindexComponent implements OnInit {
  loading = true;
  displayedColumns: string[] = ["nombreCompleto","descripcion", "fecha", "acciones"];
  bajas: any[] = [];
  constructor(
    private bajaService: BajaService,
    private uiService: UiService
  ) {
    
  }

  ngOnInit() { 
    this.bajaService.getBajas().subscribe(e => {
      this.bajas = e;
      console.log(this.bajas);
      this.loading = false;
    });
  }

  onDetail(row:any){
    this.uiService.router.navigate(['/baja/detail',row.id]);
  }

}
