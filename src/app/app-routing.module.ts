import { VoluntarioCardComponent } from './components/usecases/voluntarios/voluntario-card/voluntario-card.component';
import { VoluntarioReadComponent } from './components/usecases/voluntarios/voluntario-read/voluntario-read.component';
import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { SingupComponent } from './components/auth/singup/singup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { VoluntarioCreateComponent } from './components/usecases/voluntarios/voluntario-create/voluntario-create.component';
import { VoluntarioUpdateComponent } from './components/usecases/voluntarios/voluntario-update/voluntario-update.component';

const routes:Routes = [
    {path:'',component:WelcomeComponent},
    
    {path:'voluntarios/index',component:WelcomeComponent},
    {path:'voluntarios/create',component:VoluntarioCreateComponent},
    {path:'voluntarios/read',component:VoluntarioReadComponent},
    {path:'voluntarios/update',component:VoluntarioUpdateComponent},
    {path:'voluntarios/card',component:VoluntarioCardComponent},

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