import { BajaDetailComponent } from './components/usecases/baja/baja-detail/baja-detail.component';
import { IncorporacionCreateComponent } from './components/usecases/incorporacion/incorporacion-create/incorporacion-create.component';
import { BajaindexComponent } from './components/usecases/baja/bajaindex/bajaindex.component';
import { BajaCreateComponent } from './components/usecases/baja/baja-create/baja-create.component';
import { DemeritoIndexComponent } from './components/usecases/demerito/demerito-index/demerito-index.component';
import { DemeritoCreateComponent } from './components/usecases/demerito/demerito-create/demerito-create.component';
import { MeritoEditComponent } from './components/usecases/merito/merito-edit/merito-edit.component';
import { CompaniaCreateComponent } from './components/usecases/compania/compania-create/compania-create.component';
import { EspecialidadDetailComponent } from './components/usecases/especialidad/especialidad-detail/especialidad-detail.component';
import { EspecialidadEditComponent } from './components/usecases/especialidad/especialidad-edit/especialidad-edit.component';
import { EspecialidadCreateComponent } from './components/usecases/especialidad/especialidad-create/especialidad-create.component';

import { VoluntarioCardComponent } from './components/usecases/voluntarios/voluntario-card/voluntario-card.component';
import { VoluntarioReadComponent } from './components/usecases/voluntarios/voluntario-read/voluntario-read.component';
import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { SingupComponent } from './components/auth/singup/singup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { VoluntarioCreateComponent } from './components/usecases/voluntarios/voluntario-create/voluntario-create.component';
import { VoluntarioUpdateComponent } from './components/usecases/voluntarios/voluntario-update/voluntario-update.component';
import { VoluntarioIndexComponent } from './components/usecases/voluntarios/voluntario-index/voluntario-index.component';
import { EspecialidadIndexComponent } from './components/usecases/especialidad/especialidad-index/especialidad-index.component';
import { CompaniaIndexComponent } from './components/usecases/compania/compania-index/compania-index.component';
import { CompaniaEditComponent } from './components/usecases/compania/compania-edit/compania-edit.component';
import { CompaniaDetailComponent } from './components/usecases/compania/compania-detail/compania-detail.component';
import { MeritoCreateComponent } from './components/usecases/merito/merito-create/merito-create.component';
import { MeritoIndexComponent } from './components/usecases/merito/merito-index/merito-index.component';
import { DemeritoEditComponent } from './components/usecases/demerito/demerito-edit/demerito-edit.component';
import { IncorporacionIndexComponent } from './components/usecases/incorporacion/incorporacion-index/incorporacion-index.component';
import { IncorporacionDetailComponent } from './components/usecases/incorporacion/incorporacion-detail/incorporacion-detail.component';
import { AscensoGradoComponent } from './components/usecases/ascenso/ascenso-grado/ascenso-grado.component';
import { AscensoIndexComponent } from './components/usecases/ascenso/ascenso-index/ascenso-index.component';

const routes:Routes = [
    {path:'',component:WelcomeComponent},
    
    {path:'voluntarios/index',component:VoluntarioIndexComponent},
    {path:'voluntarios/create',component:VoluntarioCreateComponent},
    {path:'voluntarios/read',component:VoluntarioReadComponent},
    {path:'voluntarios/update/:id',component:VoluntarioUpdateComponent},
    {path:'voluntarios/card',component:VoluntarioCardComponent},


    {path:'especialidad/create',component:EspecialidadCreateComponent},
    {path:'especialidad/index',component:EspecialidadIndexComponent},
    {path:'especialidad/update/:id',component:EspecialidadEditComponent},
    {path:'especialidad/detail/:id',component:EspecialidadDetailComponent},

    {path:'compania/create',component:CompaniaCreateComponent},
    {path:'compania/index',component:CompaniaIndexComponent},
    {path:'compania/update/:id',component:CompaniaEditComponent},
    {path:'compania/detail/:id',component:CompaniaDetailComponent},

    {path:'merito/create',component:MeritoCreateComponent},
    {path:'merito/index',component:MeritoIndexComponent},
    {path:'merito/update/:id',component:MeritoEditComponent},

    {path:'demerito/create',component:DemeritoCreateComponent},
    {path:'demerito/index',component:DemeritoIndexComponent},
    {path:'demerito/update/:id',component:DemeritoEditComponent},

    {path:'baja/create',component:BajaCreateComponent},
    {path:'baja/index',component:BajaindexComponent},
    {path:'baja/detail/:id',component:BajaDetailComponent},

    {path:'incorporacion/create',component:IncorporacionCreateComponent},
    {path:'incorporacion/index',component:IncorporacionIndexComponent},
    {path:'incorporacion/detail/:id',component:IncorporacionDetailComponent},

    {path:'ascenso/grado/:grado',component:AscensoGradoComponent},
    {path:'ascenso/index',component:AscensoIndexComponent},

    {path:'signup',component:SingupComponent},
    {path:'login',component:LoginComponent},
    {path:'login',component:LoginComponent},
];
@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{

}