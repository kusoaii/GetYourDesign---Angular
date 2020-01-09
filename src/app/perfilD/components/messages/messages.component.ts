import { Component, OnInit, DoCheck } from '@angular/core';
import { DesignerService } from '../../../services/designer.service';
import { Designer } from 'src/app/models/designer';
import { Message } from '../../../models/message';

@Component({
    selector: 'perfil-edit',
    templateUrl: './Messages.component.html',
    styleUrls : ['./Messages.component.css'],
    providers: [DesignerService]
})
export class MessagesComponent implements OnInit, DoCheck{
    public identity;
    public designer : Designer;
    public respuesta;
    public messages : Message[];
    public title;
    public openMessage;
    public cont;
    public remitente;
    public correo;

    constructor(
        private _designerService : DesignerService
    ){
        this.identity = this._designerService.getIdentity();
        this.designer = this.identity;
        this.title = 'Solicitudes';
        this.openMessage = false;
    }

    ngOnInit(){
        this.optenerMensajes();
    }

    ngDoCheck(){

    }

    optenerMensajes(){
        let id = this.identity.Documento_identidad;
        this._designerService.getMessages(id).subscribe(
            response =>{
                this.respuesta = response
                if(this.respuesta.code == 200){     
                    this.messages = this.respuesta.data;
                    console.log(this.messages);
                }
            },
            error =>{
                console.log(<any>error);
            }
        );
    }

    abrirMensaje(mensaje, remitente, correo){
        this.cont = mensaje;
        this.remitente = remitente;
        this.correo = correo;
        this.openMessage = true;

    }

    closeMessage(){
        this.openMessage = false;
    }
    
}