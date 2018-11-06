import { UiService } from './../../../../services/ui.service';
import { Component, OnInit } from '@angular/core';
import { CompaniaService } from '../../../../services/compania.service';

@Component({
  selector: 'app-compania-index',
  templateUrl: './compania-index.component.html',
  styleUrls: ['./compania-index.component.scss']
})
export class CompaniaIndexComponent implements OnInit {

  loading = true;
  displayedColumns: string[] = ["imagenURL", "nombre", "acciones"];
  companias: any[] = [];

  constructor(
    private companiaService: CompaniaService,
    private uiService: UiService
  ) {
    this.companiaService.getCompanias().subscribe(e => {
      this.companias = e;
      console.log(this.companias);
      this.loading = false;
    });
  }

  ngOnInit() { 
  }

  onEdit(row: any) {
    console.log(row);
    this.uiService.router.navigate(['/compania/update',row.id]);

  }
  onDetail(row:any){
    this.uiService.router.navigate(['/compania/detail',row.id]);
  }
  onDelete(row: any) {
    this.uiService
      .openConfirmDialog(
        "Esta seguro que desea eliminar la compania :"+row.nombre
      )
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.companiaService.deleteCompania(row.id);
          this.uiService.warn('Eliminado Exitosamente');
        }
      });


  }

}
