import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { MainComponent } from './components/main/main.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { editComponent } from './components/edit/edit.componet';
import { MessagesComponent } from './components/messages/messages.component';

//Guard
import { PerfilGuard } from '../services/perfil.guard';

const perfilRoutes : Routes = [
    {
        path: 'perfil',
        component: MainComponent,
        canActivate : [PerfilGuard],
        children: [
            {path: '', redirectTo: 'principal', pathMatch: 'full'},
            {path: 'principal', component: PrincipalComponent},
            {path: 'editar', component: editComponent},
            {path: 'mensajes', component: MessagesComponent}
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
export class PerfilRouterModule{

}