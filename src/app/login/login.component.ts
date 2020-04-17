import { Component, OnInit } from '@angular/core';
import { Designer } from '../models/designer';
import { Empresa } from '../models/empresa';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DesignerService } from '../services/designer.service';
import { GLOBAL } from '../services/global';
import { Portafolio } from '../models/portafolio';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [DesignerService]
})
export class LoginComponent implements OnInit {
  public designer : Designer;
  public empresa : Empresa;
  public respuesta;
  public Alerta : boolean;
  public identity;
  public inPerfil;
  public portafolios : Portafolio[];

  constructor(
    private _designerService : DesignerService,
    private _route : ActivatedRoute,
    private _router : Router
  ) { 
    this.designer = new Designer('','','','','','','','','','','', this.portafolios);
    this.Alerta = false;
    this.inPerfil = '1';
    
    if(this.validarUsuario()){
      this._router.navigate(['/home']);
    }
  }

  ngOnInit() {
    
  }

  onSubmit(loginForm){

    this._designerService.login(this.designer).subscribe(
      response =>{
        this.respuesta = response;
        if(this.respuesta.code == 200){
          if(this.respuesta.message == 'Ingreso correcto con designer'){
            this.designer = this.respuesta.data;
            console.log(this.designer);
            localStorage.setItem('identity', JSON.stringify(this.designer));
            localStorage.setItem('inPerfil', this.inPerfil);
            this._router.navigate(['/perfil']);   
          }else{
            console.log('good bussines');
            this.empresa = this.respuesta.data;
            localStorage.setItem('identityE', JSON.stringify(this.empresa));
            localStorage.setItem('inPerfil', this.inPerfil);
            this._router.navigate(['/perfil-E']);
          }
        }else{
          this.Alerta = true;
        }
      },
      error =>{
        console.log(<any>error);
      }
    );

  }

  cerrarAlert(){
    this.Alerta = false;
  }

  validarUsuario(){
    let usuario = localStorage.getItem('identity');
    let usuario2 = localStorage.getItem('identityE');
    if(usuario != null  || usuario2 != null){
      return true;
    }
    return false;
  }

}
