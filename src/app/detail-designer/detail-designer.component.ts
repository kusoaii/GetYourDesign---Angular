import { Component, OnInit, DoCheck } from '@angular/core';
import { Designer } from '../models/designer';
import { DesignerService } from '../services/designer.service';
import { EmpresaService } from '../services/empresa.service';
import { Route, ActivatedRoute, Params, Router } from '@angular/router';
import { Portafolio } from '../models/portafolio';
import { Message } from '../models/message';
import { GLOBAL } from '../services/global';

@Component({
  selector: 'app-detail-designer',
  templateUrl: './detail-designer.component.html',
  styleUrls: ['./detail-designer.component.css'],
  providers: [
    DesignerService,
    EmpresaService
  ]
})
export class DetailDesignerComponent implements OnInit, DoCheck {
  public portOrabout;
  public p;
  public designer : Designer;
  public respuesta;
  public portafolios : Portafolio[];
  public respuestaPorta;
  public portafolio : Portafolio;
  public identityE;
  public identity;
  public message : Message;
  public responseMessage;
  public AlertSuccess : boolean;
  public resources;

  constructor(
    private _designerService : DesignerService,
    private _empresaService : EmpresaService,
    private _route : ActivatedRoute,
    private _router : Router
  ) {
    this.resources = GLOBAL.urlRecurso;
    this.portOrabout = true;
    this.p = document.getElementsByClassName('aa1B');
    this.designer = new Designer('','','','','','','','','','','', this.portafolios); 
    this.getDesigner();
    this.message = new Message('','','','','');  
    this.AlertSuccess = false;
   }

  ngOnInit() {

    this.p[1].classList.add('bordeado');
    this.portafolio = new Portafolio('',this.designer.Documento_identidad,'');
    this.identityE = this._empresaService.getIdentityE();
    this.identity = this._designerService.getIdentity();
    if(this.identityE != null){
      this.message.Remitente_m = this.identityE.Usuario_empresa;
      this.message.Email_m = this.identityE.Correo_e_empresa;
    } 
    this.message.Documento_identidad = this.designer.Documento_identidad;
  }

  ngDoCheck(){
    this.identityE = this._empresaService.getIdentityE();
    this.identity = this._designerService.getIdentity();
  }

  abrirPortafolio(){
    this.portOrabout = false;
    this.p[0].classList.add('bordeado');
    this.p[1].classList.remove('bordeado');
}

abrirSobremi(){
    this.portOrabout = true;
    this.p[1].classList.add('bordeado');
    this.p[0].classList.remove('bordeado');
}

  getDesigner(){
    this._route.params.forEach((params: Params) =>{
      let nombre = params['nombre'];

      this._designerService.detailDesigner(nombre).subscribe(
        response =>{
          this.respuesta = response;
          if(this.respuesta.code == 200){
            this.designer = this.respuesta.data;
            this.portafolio.Usuario_portafolio = this.designer.Documento_identidad;
            this.message.Documento_identidad = this.designer.Documento_identidad;
            this.optenerPortafolio();

          }else{
            console.log('no existe');
          }
        },
        error =>{
          console.log(<any>error);
        }
      );
    });
  
  }

  optenerPortafolio(){
    
    let id = this.portafolio.Usuario_portafolio;
    this._designerService.getPortafolio(id).subscribe(
        response =>{
            this.respuestaPorta = response;
            if(this.respuestaPorta.code == 200){
                this.portafolios = this.respuestaPorta.data;
            }else{
                this.portafolios = null;
            }
        },
        error =>{
            console.log(<any>error);
        }
    );
  }

 enviarSolicitud(){
  let t = document.getElementsByClassName('slidebar-contact');
  t[0].classList.toggle('active');

  let icon = document.getElementsByClassName('toggle');
  icon[0].classList.toggle('active');
 }

 onSubmit(){ 
   this._empresaService.sendMessage(this.message).subscribe(
    response =>{
      this.responseMessage = response;
      if(this.responseMessage.code == 200){
        console.log('correcto');
        this.AlertSuccess = true;
      }else{
        console.log('error');
      }
    },
    error =>{
      console.log(<any>error);
    }
   );
   let t = document.getElementsByClassName('slidebar-contact');
   t[0].classList.toggle('active');

   let icon = document.getElementsByClassName('toggle');
   icon[0].classList.toggle('active');
 }

 cerrarAlert(){
   this.AlertSuccess = false;
 }

}
