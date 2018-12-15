import { Component, OnInit } from '@angular/core';
import { PrivilegiosService } from '../../../../services/privilegios.service';
import { UiService } from '../../../../services/ui.service';
import { CanAccessService } from '../../../../services/can-access.service';

@Component({
  selector: 'app-privilegios-index',
  templateUrl: './privilegios-index.component.html',
  styleUrls: ['./privilegios-index.component.scss']
})
export class PrivilegiosIndexComponent implements OnInit {
  loading = true;
  displayedColumns: string[] = ["nombre","acciones"];
  privilegios: any[] = [];
  constructor(
    private privilegioService: PrivilegiosService,
    private uiService: UiService,
    private ca:CanAccessService
  ) {
    this.privilegioService.getPrivilegios().subscribe(e => {
      this.privilegios = e;
      console.log(this.privilegios);
      this.loading = false;
    });
  }

  ngOnInit() { 
  }

  onEdit(row: any) {
    console.log(row);
    this.uiService.router.navigate(['/dashboard/privilegios/update',row.id]);

  }
  onDetail(row:any){
    this.uiService.router.navigate(['/dashboard/privilegios/detail',row.id]);
  }
  onDelete(row: any) {
    this.ca.privilegiosCanDelete().subscribe(e=>{
      if(e){
        this.uiService
        .openConfirmDialog(
          "Esta seguro que desea eliminar el privilegio de :"+row.nombre
  
        )
        .afterClosed()
        .subscribe(res => {
          if (res) {
            this.privilegioService.deletePrivilegio(row.id);
            this.uiService.warn('Eliminado Exitosamente');
          }
        });
      }
    })
    


  }

}
