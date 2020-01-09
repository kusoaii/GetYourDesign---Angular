import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PerfilRouterModule } from './perfil-routing.module'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DesignerService } from '../services/designer.service';

//Componentes
import { MainComponent } from './components/main/main.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { editComponent } from './components/edit/edit.componet';
import { MessagesComponent } from './components/messages/messages.component';
import { MosaicMenuComponent } from '../Fragments/mosaic-menu/mosaic-menu.component';

//Guard
import { PerfilGuard } from '../services/perfil.guard';

@NgModule({
    declarations: [
        MainComponent,
        PrincipalComponent,
        editComponent,
        MessagesComponent,
        MosaicMenuComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        PerfilRouterModule,
        BrowserAnimationsModule
    ],
    exports: [
        MainComponent,
        PrincipalComponent,
        editComponent,
        MessagesComponent
    ],
    providers: [
        PerfilGuard,
        DesignerService
    ]
})

export class PerfilModule{
    
}