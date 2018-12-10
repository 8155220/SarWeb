import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { AscensoVoluntarioComponent } from './components/usecases/ascenso/ascenso-voluntario/ascenso-voluntario.component';
import { CompaniaPipe } from "./pipes/compania.pipe";
import { DemeritoCreateComponent } from "./components/usecases/demerito/demerito-create/demerito-create.component";
import { DemeritoIndexComponent } from "./components/usecases/demerito/demerito-index/demerito-index.component";
import { MeritoService } from "./services/merito.service";
import { MatConfirmDialogComponent } from "./components/shared/mat-confirm-dialog/mat-confirm-dialog.component";
import { EspecialidadService } from "./services/especialidad.service";
import { CompaniaService } from "./services/compania.service";
import {
  AngularFireStorage,
  AngularFireStorageModule
} from "angularfire2/storage";
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { MaterialModule } from "./material.module";

import { FlexLayoutModule } from "@angular/flex-layout";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { ToolbarComponent } from "./components/shared/toolbar/toolbar.component";
import { FooterComponent } from "./components/shared/footer/footer.component";
import {
  VoluntarioIndexComponent,
  BottomSheetOverviewVoluntarioSheet,
  DialogConfirmDelete
} from "./components/usecases/voluntarios/voluntario-index/voluntario-index.component";
import { VoluntarioCreateComponent } from "./components/usecases/voluntarios/voluntario-create/voluntario-create.component";
import { VoluntarioReadComponent } from "./components/usecases/voluntarios/voluntario-read/voluntario-read.component";
import { VoluntarioDeleteComponent } from "./components/usecases/voluntarios/voluntario-delete/voluntario-delete.component";
import { VoluntarioUpdateComponent } from "./components/usecases/voluntarios/voluntario-update/voluntario-update.component";
import { SidenavComponent } from "./components/shared/sidenav/sidenav.component";
import { VoluntarioCardComponent } from "./components/usecases/voluntarios/voluntario-card/voluntario-card.component";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { VoluntarioService } from "./services/voluntario.service";
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { MenuListItemComponent } from "./components/shared/sidenav/menu-list-item-component/menu-list-item.component";
import { UploadImageComponent } from "./components/shared/upload-image/upload-image.component";
import { UploadService } from "./services/upload/upload.service";

import { NoimagePipe } from "./pipes/noimage.pipe";
import { InformacionPersonalComponent } from "./components/usecases/voluntarios/componentes/informacion-personal/informacion-personal.component";
import { EmergenciaComponent } from "./components/usecases/voluntarios/componentes/emergencia/emergencia.component";
import { DatosFisicosComponent } from "./components/usecases/voluntarios/componentes/datos-fisicos/datos-fisicos.component";
import { InformacionExtraComponent } from "./components/usecases/voluntarios/componentes/informacion-extra/informacion-extra.component";
import { EspecialidadIndexComponent } from "./components/usecases/especialidad/especialidad-index/especialidad-index.component";
import { EspecialidadCreateComponent } from "./components/usecases/especialidad/especialidad-create/especialidad-create.component";
import { EspecialidadEditComponent } from "./components/usecases/especialidad/especialidad-edit/especialidad-edit.component";
import { EspecialidadDetailComponent } from "./components/usecases/especialidad/especialidad-detail/especialidad-detail.component";
import { SearchPersonaComponent } from "./components/shared/search-persona/search-persona.component";
import { AgregarEspecialidadVoluntarioComponent } from "./components/shared/agregar-especialidad-voluntario/agregar-especialidad-voluntario.component";
import { CompaniaIndexComponent } from "./components/usecases/compania/compania-index/compania-index.component";
import { CompaniaCreateComponent } from "./components/usecases/compania/compania-create/compania-create.component";
import { CompaniaEditComponent } from "./components/usecases/compania/compania-edit/compania-edit.component";
import { CompaniaDetailComponent } from "./components/usecases/compania/compania-detail/compania-detail.component";
import { MeritoIndexComponent } from "./components/usecases/merito/merito-index/merito-index.component";
import { MeritoCreateComponent } from "./components/usecases/merito/merito-create/merito-create.component";
import { MeritoEditComponent } from "./components/usecases/merito/merito-edit/merito-edit.component";
import { DemeritoEditComponent } from "./components/usecases/demerito/demerito-edit/demerito-edit.component";
import { BajaindexComponent } from "./components/usecases/baja/bajaindex/bajaindex.component";
import { BajaCreateComponent } from "./components/usecases/baja/baja-create/baja-create.component";
import { IncorporacionCreateComponent } from "./components/usecases/incorporacion/incorporacion-create/incorporacion-create.component";
import { IncorporacionIndexComponent } from "./components/usecases/incorporacion/incorporacion-index/incorporacion-index.component";
import { GradoPipe } from "./pipes/grado.pipe";
import { BajaDetailComponent } from "./components/usecases/baja/baja-detail/baja-detail.component";
import { IncorporacionDetailComponent } from "./components/usecases/incorporacion/incorporacion-detail/incorporacion-detail.component";
import { AscensoGradoComponent } from "./components/usecases/ascenso/ascenso-grado/ascenso-grado.component";
import { GradoAscenderPipe } from "./pipes/grado-ascender.pipe";
import { AscensoIndexComponent } from "./components/usecases/ascenso/ascenso-index/ascenso-index.component";
import { MisionCreateComponent } from './components/usecases/mision/mision-create/mision-create.component';
import { DisableControlDirective } from './directives/disable-control.directive';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MisionIndexComponent } from './components/usecases/mision/mision-index/mision-index.component';
import { MisionEditComponent } from './components/usecases/mision/mision-edit/mision-edit.component';
import { RootComponent } from './components/root/root/root.component';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ToolbarComponent,
    FooterComponent,
    VoluntarioIndexComponent,
    VoluntarioCreateComponent,
    VoluntarioReadComponent,
    VoluntarioDeleteComponent,
    VoluntarioUpdateComponent,
    VoluntarioCardComponent,
    SidenavComponent,
    BottomSheetOverviewVoluntarioSheet,
    DialogConfirmDelete,
    MenuListItemComponent,
    UploadImageComponent,
    //Pipes
    NoimagePipe,
    GradoPipe,
    CompaniaPipe,
    GradoAscenderPipe,
    InformacionPersonalComponent,
    EmergenciaComponent,
    DatosFisicosComponent,
    InformacionExtraComponent,
    EspecialidadIndexComponent,
    EspecialidadCreateComponent,
    MatConfirmDialogComponent,
    EspecialidadEditComponent,
    EspecialidadDetailComponent,
    SearchPersonaComponent,
    AgregarEspecialidadVoluntarioComponent,
    CompaniaIndexComponent,
    CompaniaCreateComponent,
    CompaniaEditComponent,
    CompaniaDetailComponent,
    MeritoIndexComponent,
    MeritoCreateComponent,
    MeritoEditComponent,
    DemeritoIndexComponent,
    DemeritoCreateComponent,
    DemeritoEditComponent,
    BajaindexComponent,
    BajaCreateComponent,
    IncorporacionCreateComponent,
    IncorporacionIndexComponent,
    BajaDetailComponent,
    IncorporacionDetailComponent,
    AscensoGradoComponent,
    AscensoIndexComponent,
    AscensoVoluntarioComponent,
    MisionCreateComponent,
    DisableControlDirective,
    MisionIndexComponent,
    MisionEditComponent,
    RootComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "SARFAB"),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule
  ],
  entryComponents: [
    BottomSheetOverviewVoluntarioSheet,
    DialogConfirmDelete,
    MatConfirmDialogComponent,
    SearchPersonaComponent,
    AgregarEspecialidadVoluntarioComponent,
    AscensoVoluntarioComponent,
    
  ],
  providers: [
    VoluntarioService,
    UploadService,
    AngularFireStorage,
    CompaniaService,
    EspecialidadService,
    MeritoService,
    AuthService,
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private adapter:DateAdapter<any>) { 
      this.adapter.setLocale('es');
    }
}
