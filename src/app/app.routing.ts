import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//importando Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterDesignerComponent } from './register-designer/register-designer.component';
import { RankingComponent } from './ranking/ranking.component';
import { LoginComponent } from './login/login.component';
import { RegisterEmpComponent } from './register-emp/register-emp.component';
import { DetailDesignerComponent } from './detail-designer/detail-designer.component';

const appRutes : Routes = [
    {path: '', redirectTo: 'home',pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'registro-diseñador', component: RegisterDesignerComponent},
    {path: 'ranking', component: RankingComponent},
    {path: 'inicio-sesion', component: LoginComponent},
    {path: 'registro-empresa', component: RegisterEmpComponent},
    {path: 'detalle-diseñador/:nombre', component: DetailDesignerComponent},
    {path: '**', redirectTo: 'home'}
];

export const appRoutingProviders : any[] = [];
export const routing : ModuleWithProviders = RouterModule.forRoot(appRutes);