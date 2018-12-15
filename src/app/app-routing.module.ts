import { MeritoReadGuard } from './guard/merito-read.guard';
import { PersonaEditGuard } from './guard/persona-edit.guard';
import { PersonaReadGuard } from './guard/persona-read.guard';
import { MeritoEditGuard } from './guard/merito-edit.guard';
import { MeritoCreateGuard } from './guard/merito-create.guard';
import { PrivilegioReadGuard } from './guard/privilegio-read.guard';
import { AscensoCreateGuard } from './guard/ascenso-create.guard';
import { BajaReadGuard } from './guard/baja-read.guard';
import { DemeritoReadGuard } from './guard/demerito-read.guard';
import { CompaniaEditGuard } from './guard/compania-edit.guard';
import { CompaniaCreateGuard } from './guard/compania-create.guard';
import { BajaCreateGuard } from './guard/baja-create.guard';
import { EspecialidadEditGuard } from './guard/especialidad-edit.guard';
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
import { EspecialidadCreateGuard } from './guard/especialidad-create.guard';
import { AscensoReadGuard } from './guard/ascenso-read.guard';
import { CompaniaReadGuard } from './guard/compania-read.guard';
import { DemeritoCreateGuard } from './guard/demerito-create.guard';
import { DemeritoEditGuard } from './guard/demerito-edit.guard';
import { IncorporacionReadGuard } from './guard/incorporacion-read.guard';
import { IncorporacionCreateGuard } from './guard/incorporacion-create.guard';
import { PrivilegioCreateGuard } from './guard/privilegio-create.guard';
import { PrivilegioEditGuard } from './guard/privilegio-edit.guard';
import { MisionCreateGuard } from './guard/mision-create.guard';
import { MisionReadGuard } from './guard/mision-read.guard';
import { MisionEditGuard } from './guard/mision-edit.guard';
import { PersonaCreateGuard } from './guard/persona-create.guard';

const routes:Routes = [
    {path:'',component:WelcomeComponent},
    
    
    {path:'dashboard',component:RootComponent,children:[
    //{path:'',component:RootComponent},
    {path:'voluntarios/index',component:VoluntarioIndexComponent,canActivate:[AuthGuard,PersonaReadGuard]},
    {path:'voluntarios/create',component:VoluntarioCreateComponent,canActivate:[AuthGuard,PersonaCreateGuard]},
    {path:'voluntarios/read',component:VoluntarioReadComponent,canActivate:[AuthGuard,PersonaReadGuard]},
    {path:'voluntarios/update/:id',component:VoluntarioUpdateComponent,canActivate:[AuthGuard,PersonaEditGuard]},
    {path:'voluntarios/card',component:VoluntarioCardComponent,canActivate:[AuthGuard]},


    {path:'especialidad/create',component:EspecialidadCreateComponent,canActivate:[AuthGuard,EspecialidadCreateGuard]},
    {path:'especialidad/index',component:EspecialidadIndexComponent,canActivate:[AuthGuard,EspecialidadReadGuard]},
    {path:'especialidad/update/:id',component:EspecialidadEditComponent,canActivate:[AuthGuard,EspecialidadEditGuard]},
    {path:'especialidad/detail/:id',component:EspecialidadDetailComponent,canActivate:[AuthGuard,EspecialidadReadGuard]},

    {path:'compania/create',component:CompaniaCreateComponent,canActivate:[AuthGuard,CompaniaCreateGuard]},
    {path:'compania/index',component:CompaniaIndexComponent,canActivate:[AuthGuard,CompaniaReadGuard]},
    {path:'compania/update/:id',component:CompaniaEditComponent,canActivate:[AuthGuard,CompaniaEditGuard]},
    {path:'compania/detail/:id',component:CompaniaDetailComponent,canActivate:[AuthGuard,CompaniaReadGuard]},

    {path:'merito/create',component:MeritoCreateComponent,canActivate:[AuthGuard,MeritoCreateGuard]},
    {path:'merito/index',component:MeritoIndexComponent,canActivate:[AuthGuard,MeritoReadGuard]},
    {path:'merito/update/:id',component:MeritoEditComponent,canActivate:[AuthGuard,MeritoEditGuard]},

    {path:'demerito/create',component:DemeritoCreateComponent,canActivate:[AuthGuard,DemeritoCreateGuard]},
    {path:'demerito/index',component:DemeritoIndexComponent,canActivate:[AuthGuard,DemeritoReadGuard]},
    {path:'demerito/update/:id',component:DemeritoEditComponent,canActivate:[AuthGuard,DemeritoEditGuard]},

    {path:'baja/create',component:BajaCreateComponent,canActivate:[AuthGuard,BajaCreateGuard]},
    {path:'baja/index',component:BajaindexComponent,canActivate:[AuthGuard,BajaReadGuard]},
    {path:'baja/detail/:id',component:BajaDetailComponent,canActivate:[AuthGuard,BajaReadGuard]},

    {path:'incorporacion/create',component:IncorporacionCreateComponent,canActivate:[AuthGuard,IncorporacionCreateGuard]},
    {path:'incorporacion/index',component:IncorporacionIndexComponent,canActivate:[AuthGuard,IncorporacionReadGuard]},
    {path:'incorporacion/detail/:id',component:IncorporacionDetailComponent,canActivate:[AuthGuard,IncorporacionReadGuard]},

    {path:'ascenso/grado/:grado',component:AscensoGradoComponent,canActivate:[AuthGuard,AscensoCreateGuard]},
    {path:'ascenso/index',component:AscensoIndexComponent,canActivate:[AuthGuard,AscensoReadGuard]},

    {path:'mision/create',component:MisionCreateComponent,canActivate:[AuthGuard,MisionCreateGuard]},
    {path:'mision/index',component:MisionIndexComponent,canActivate:[AuthGuard,MisionReadGuard]},
    {path:'mision/update/:id',component:MisionEditComponent,canActivate:[AuthGuard,MisionEditGuard]},

    {path:'privilegios/index',component:PrivilegiosIndexComponent,canActivate:[AuthGuard,PrivilegioReadGuard]},
    {path:'privilegios/create',component:PrivilegiosCreateComponent,canActivate:[AuthGuard,PrivilegioCreateGuard]},
    {path:'privilegios/update/:id',component:PrivilegiosEditComponent,canActivate:[AuthGuard,PrivilegioEditGuard]},
    ]},


    {path:'welcome',component:WelcomeComponent},

   
];
@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{

}