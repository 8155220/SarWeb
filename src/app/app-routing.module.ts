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