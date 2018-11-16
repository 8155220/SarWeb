import { MisionService } from './../../../../services/mision.service';
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { UiService } from "../../../../services/ui.service";
@Component({
  selector: 'app-mision-index',
  templateUrl: './mision-index.component.html',
  styleUrls: ['./mision-index.component.scss']
})
export class MisionIndexComponent implements OnInit {

  loading = true;
  displayedColumns: string[] = ["tipoMision","fechaSolicitud", "fechaOperacion", "oficialAlMando", "acciones"];
  misiones: any[] = [];
  constructor(
    private misionService: MisionService,
    private uiService: UiService
  ) {
    this.misionService.getMisiones().subscribe(e => {
      this.misiones = e;
      console.log(this.misiones);
      this.loading = false;
    });
  }

  ngOnInit() { 
  }

  onEdit(row: any) {
    this.uiService.router.navigate(['/mision/update',row.id]);

  }
  onDetail(row:any){
    this.uiService.router.navigate(['/mision/detail',row.id]);
  }
  onDelete(row: any) {
    this.uiService
      .openConfirmDialog(
        "Esta seguro que desea eliminar el mision de :"+row.nombreCompleto

      )
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.misionService.deleteMision(row.id);
          this.uiService.warn('Eliminado Exitosamente');
        }
      });


  }

}
