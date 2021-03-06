import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { DemeritoService } from "../../../../services/demerito.service";
import { UiService } from "../../../../services/ui.service";
import { CanAccessService } from '../../../../services/can-access.service';
@Component({
  selector: 'app-demerito-index',
  templateUrl: './demerito-index.component.html',
  styleUrls: ['./demerito-index.component.scss']
})
export class DemeritoIndexComponent implements OnInit {
  loading = true;
  displayedColumns: string[] = ["nombreCompleto","descripcion", "fecha", "acciones"];
  demeritos: any[] = [];
  constructor(
    private demeritoService: DemeritoService,
    private uiService: UiService,
    private ca:CanAccessService
  ) {
    this.demeritoService.getDemeritos().subscribe(e => {
      this.demeritos = e;
      console.log(this.demeritos);
      this.loading = false;
    });
  }

  ngOnInit() { 
  }

  onEdit(row: any) {
    console.log(row);
    this.uiService.router.navigate(['/dashboard/demerito/update',row.id]);

  }
  onDetail(row:any){
    this.uiService.router.navigate(['/dashboard/demerito/detail',row.id]);
  }
  onDelete(row: any) {

    this.ca.demeritosCanDelete().subscribe(e=>{
      if(e){
        this.uiService
        .openConfirmDialog(
          "Esta seguro que desea eliminar el demerito de :"+row.nombreCompleto
  
        )
        .afterClosed()
        .subscribe(res => {
          if (res) {
            this.demeritoService.deleteDemerito(row.id);
            this.uiService.warn('Eliminado Exitosamente');
          }
        });
      }
    })

    


  }

}
