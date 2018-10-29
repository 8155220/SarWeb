import { CompaniaService } from './services/compania.service';
import { AngularFireStorage, AngularFireStorageModule } from "angularfire2/storage";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { MaterialModule } from "./material.module";
import { SingupComponent } from "./components/auth/singup/singup.component";
import { LoginComponent } from "./components/auth/login/login.component";

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

import { NoimagePipe } from './pipes/noimage.pipe';
import { InformacionPersonalComponent } from './components/usecases/voluntarios/componentes/informacion-personal/informacion-personal.component';
import { EmergenciaComponent } from './components/usecases/voluntarios/componentes/emergencia/emergencia.component';
import { DatosFisicosComponent } from './components/usecases/voluntarios/componentes/datos-fisicos/datos-fisicos.component';
import { InformacionExtraComponent } from './components/usecases/voluntarios/componentes/informacion-extra/informacion-extra.component';

@NgModule({
  declarations: [
    AppComponent,
    SingupComponent,
    LoginComponent,
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
    InformacionPersonalComponent,
    EmergenciaComponent,
    DatosFisicosComponent,
    InformacionExtraComponent,
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
    AngularFireStorageModule
  ],
  entryComponents: [BottomSheetOverviewVoluntarioSheet, DialogConfirmDelete],
  providers: [VoluntarioService, UploadService, AngularFireStorage,CompaniaService  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
