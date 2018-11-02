import { Component, OnInit } from "@angular/core";
import { EspecialidadService } from "../../../../services/especialidad.service";
import { UiService } from "../../../../services/ui.service";

@Component({
  selector: "app-especialidad-index",
  templateUrl: "./especialidad-index.component.html",
  styleUrls: ["./especialidad-index.component.scss"]
})
export class EspecialidadIndexComponent implements OnInit {
  loading = true;
  displayedColumns: string[] = ["imagenURL", "nombre", "acciones"];
  especialidades: any[] = [];
  constructor(
    private especialidadService: EspecialidadService,
    private uiService: UiService
  ) {
    this.especialidadService.getEspecialidades().subscribe(e => {
      this.especialidades = e;
      console.log(this.especialidades);
      this.loading = false;
    });
  }

  ngOnInit() { 
  }

  onEdit(row: any) {
    console.log(row);
    this.uiService.router.navigate(['/especialidad/update',row.id]);

  }
  onDelete(row: any) {
    this.uiService
      .openConfirmDialog(
        "Esta seguro que desea eliminar la especialidad :"+row.nombre

      )
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.especialidadService.deleteEspecialidad(row.id);
          this.uiService.warn('Eliminado Exitosamente');
        }
      });


  }
}
