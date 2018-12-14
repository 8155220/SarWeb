import { EspecialidadReadGuard } from './guard/especialidad-read.guard';
import { PrivilegiosEditComponent } from './components/usecases/privilegios/privilegios-edit/privilegios-edit.component';
import { PrivilegiosCreateComponent } from './components/usecases/privilegios/privilegios-create/privilegios-create.component';

import { MisionEditComponent } from './components/usecases/mision/mision-edit/mision-edit.component';
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
import { MisionCreateComponent } from './components/usecases/mision/mision-create/mision-create.component';
import { MisionIndexComponent } from './components/usecases/mision/mision-index/mision-index.component';
import { RootComponent } from './components/root/root/root.component';
import { AuthGuard } from './guard/auth.guard';
import { PrivilegiosIndexComponent } from './components/usecases/privilegios/privilegios-index/privilegios-index.component';

const routes:Routes = [
    {path:'',component:WelcomeComponent},
    
    {path:'dashboard',component:RootComponent,children:[
    //{path:'',component:RootComponent},
    {path:'voluntarios/index',component:VoluntarioIndexComponent,canActivate:[AuthGuard]},
    {path:'voluntarios/create',component:VoluntarioCreateComponent,canActivate:[AuthGuard]},
    {path:'voluntarios/read',component:VoluntarioReadComponent,canActivate:[AuthGuard]},
    {path:'voluntarios/update/:id',component:VoluntarioUpdateComponent,canActivate:[AuthGuard]},
    {path:'voluntarios/card',component:VoluntarioCardComponent,canActivate:[AuthGuard]},


    {path:'especialidad/create',component:EspecialidadCreateComponent,canActivate:[AuthGuard]},
    {path:'especialidad/index',component:EspecialidadIndexComponent,canActivate:[AuthGuard,EspecialidadReadGuard]},
    {path:'especialidad/update/:id',component:EspecialidadEditComponent,canActivate:[AuthGuard]},
    {path:'especialidad/detail/:id',component:EspecialidadDetailComponent,canActivate:[AuthGuard]},

    {path:'compania/create',component:CompaniaCreateComponent,canActivate:[AuthGuard]},
    {path:'compania/index',component:CompaniaIndexComponent,canActivate:[AuthGuard]},
    {path:'compania/update/:id',component:CompaniaEditComponent,canActivate:[AuthGuard]},
    {path:'compania/detail/:id',component:CompaniaDetailComponent,canActivate:[AuthGuard]},

    {path:'merito/create',component:MeritoCreateComponent,canActivate:[AuthGuard]},
    {path:'merito/index',component:MeritoIndexComponent,canActivate:[AuthGuard]},
    {path:'merito/update/:id',component:MeritoEditComponent,canActivate:[AuthGuard]},

    {path:'demerito/create',component:DemeritoCreateComponent,canActivate:[AuthGuard]},
    {path:'demerito/index',component:DemeritoIndexComponent,canActivate:[AuthGuard]},
    {path:'demerito/update/:id',component:DemeritoEditComponent,canActivate:[AuthGuard]},

    {path:'baja/create',component:BajaCreateComponent,canActivate:[AuthGuard]},
    {path:'baja/index',component:BajaindexComponent,canActivate:[AuthGuard]},
    {path:'baja/detail/:id',component:BajaDetailComponent,canActivate:[AuthGuard]},

    {path:'incorporacion/create',component:IncorporacionCreateComponent,canActivate:[AuthGuard]},
    {path:'incorporacion/index',component:IncorporacionIndexComponent,canActivate:[AuthGuard]},
    {path:'incorporacion/detail/:id',component:IncorporacionDetailComponent,canActivate:[AuthGuard]},

    {path:'ascenso/grado/:grado',component:AscensoGradoComponent,canActivate:[AuthGuard]},
    {path:'ascenso/index',component:AscensoIndexComponent,canActivate:[AuthGuard]},

    {path:'mision/create',component:MisionCreateComponent,canActivate:[AuthGuard]},
    {path:'mision/index',component:MisionIndexComponent,canActivate:[AuthGuard]},
    {path:'mision/update/:id',component:MisionEditComponent,canActivate:[AuthGuard]},

    {path:'privilegios/index',component:PrivilegiosIndexComponent,canActivate:[AuthGuard]},
    {path:'privilegios/create',component:PrivilegiosCreateComponent,canActivate:[AuthGuard]},
    {path:'privilegios/update/:id',component:PrivilegiosEditComponent,canActivate:[AuthGuard]},
    ]},


    {path:'welcome',component:WelcomeComponent},

   
];
@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{

}