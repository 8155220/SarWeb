import { MeritoService } from './../../../../services/merito.service';
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { UiService } from "../../../../services/ui.service";
@Component({
  selector: 'app-merito-index',
  templateUrl: './merito-index.component.html',
  styleUrls: ['./merito-index.component.scss']
})
export class MeritoIndexComponent implements OnInit {
  loading = true;
  displayedColumns: string[] = ["nombreCompleto","descripcion", "fecha", "acciones"];
  meritos: any[] = [];
  constructor(
    private meritoService: MeritoService,
    private uiService: UiService
  ) {
    this.meritoService.getMeritos().subscribe(e => {
      this.meritos = e;
      console.log(this.meritos);
      this.loading = false;
    });
  }

  ngOnInit() { 
  }

  onEdit(row: any) {
    console.log(row);
    this.uiService.router.navigate(['/dashboard/merito/update',row.id]);

  }
  onDetail(row:any){
    this.uiService.router.navigate(['/dashboard/merito/detail',row.id]);
  }
  onDelete(row: any) {
    this.uiService
      .openConfirmDialog(
        "Esta seguro que desea eliminar el merito de :"+row.nombreCompleto

      )
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.meritoService.deleteMerito(row.id);
          this.uiService.warn('Eliminado Exitosamente');
        }
      });


  }

}
