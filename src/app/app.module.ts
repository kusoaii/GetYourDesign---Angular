import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; 
import { routing, appRoutingProviders } from './app.routing';

//Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SliderComponent } from './slider/slider.component';
import { CartasComponent } from './cartas/cartas.component';
import { FooterComponent } from './footer/footer.component';
import { RedesComponent } from './redes/redes.component';
import { MenuComponent } from './menu/menu.component';
import { RegisterDesignerComponent } from './register-designer/register-designer.component';
import { RankingComponent } from './ranking/ranking.component';
import { LoginComponent } from './login/login.component';
import { RegisterEmpComponent } from './register-emp/register-emp.component';
import { DetailDesignerComponent } from './detail-designer/detail-designer.component';
import { DatePickerComponent } from './items/date-picker/date-picker.component';
import { CloudsComponent } from './items/clouds/clouds.component';
import { LoadingComponent } from './items/loading/loading.component';

//Modulos
import { PerfilModule } from './perfilD/perfil.module';
import { PerfilEModule } from './perfilE/perfilE.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SliderComponent,
    CartasComponent,
    FooterComponent,
    RedesComponent,
    MenuComponent,
    RegisterDesignerComponent,
    RankingComponent,
    LoginComponent,
    RegisterEmpComponent,
    DetailDesignerComponent,
    DatePickerComponent,
    CloudsComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PerfilModule,
    PerfilEModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
