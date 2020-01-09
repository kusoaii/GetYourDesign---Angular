import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PerfilERouterModule } from './perfilE-routing.module'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DesignerService } from '../services/designer.service';
import { EmpresaService } from '../services/empresa.service';

//Componentes
import { MainComponent } from './components/main/main.component';
import { PrincipalComponent } from './components/principal/principal.component';

//Guard
import { PerfilGuard } from '../services/perfil.guard';

@NgModule({
    declarations: [
        MainComponent,
        PrincipalComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        PerfilERouterModule,
        BrowserAnimationsModule
    ],
    exports: [
        MainComponent,
        PrincipalComponent
    ],
    providers: [
        PerfilGuard,
        DesignerService,
        EmpresaService
    ]
})

export class PerfilEModule{
    
}