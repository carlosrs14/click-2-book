import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PensionesComponent } from './components/pensiones/pensiones.component';
import { UserComponent } from './components/user/user.component';
import { authGuard } from './guards/auth.guard';
import { PropietarioComponent } from './components/propietario/propietario.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { PensionComponent } from './components/pension/pension.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent, canActivate: []},
    {path: 'login', component: LoginComponent, canActivate: []},
    {path: 'registro', component: RegistroComponent, canActivate: []},
    {path: 'pensiones', component: PensionesComponent, canActivate: []},
    {path: 'user', component: UserComponent, canActivate:[authGuard]},
    {path: 'propietario', component: PropietarioComponent, canActivate: []},
    {path: 'reservas', component: ReservasComponent, canActivate: []},
    {path: 'pension/:id', component: PensionComponent, canActivate: []},
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
