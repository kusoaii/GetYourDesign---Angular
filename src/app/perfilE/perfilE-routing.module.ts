import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { MainComponent } from './components/main/main.component';
import { PrincipalComponent } from './components/principal/principal.component';

//Guard
import { PerfilGuard } from '../services/perfil.guard';

const perfilRoutes : Routes = [
    {
        path: 'perfil-E',
        component: MainComponent,
        canActivate : [PerfilGuard],
        children: [
            {path: '', redirectTo: 'principal', pathMatch: 'full'},
            {path: 'principal', component: PrincipalComponent}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(perfilRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class PerfilERouterModule{

}