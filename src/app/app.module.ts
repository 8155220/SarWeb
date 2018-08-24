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
import { VoluntarioIndexComponent } from "./components/usecases/voluntarios/voluntario-index/voluntario-index.component";
import { VoluntarioCreateComponent } from "./components/usecases/voluntarios/voluntario-create/voluntario-create.component";
import { VoluntarioReadComponent } from "./components/usecases/voluntarios/voluntario-read/voluntario-read.component";
import { VoluntarioDeleteComponent } from "./components/usecases/voluntarios/voluntario-delete/voluntario-delete.component";
import { VoluntarioUpdateComponent } from "./components/usecases/voluntarios/voluntario-update/voluntario-update.component";
import { SidenavComponent } from "./components/shared/sidenav/sidenav.component";
import {
  VoluntarioCardComponent,
  BottomSheetOverviewVoluntarioSheet
} from "./components/usecases/voluntarios/voluntario-card/voluntario-card.component";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

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
    BottomSheetOverviewVoluntarioSheet
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [BottomSheetOverviewVoluntarioSheet],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
