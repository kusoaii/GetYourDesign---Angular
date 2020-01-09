import { Component, OnInit } from '@angular/core';
import { Designer } from '../models/designer';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DesignerService } from '../services/designer.service';
import { GLOBAL } from '../services/global';

@Component({
  selector: 'app-register-designer',
  templateUrl: './register-designer.component.html',
  styleUrls: ['./register-designer.component.css'],
  providers: [DesignerService]
})
export class RegisterDesignerComponent implements OnInit {
  public next : boolean;
  public condiciones : boolean;
  public designer : Designer;
  public btn;
  public btndis : boolean;
  public filesToUpload;
  public resultUpload;
  public respuesta;
  public messageAlert;
  public Alerta : boolean;
  public AlertSuccess : boolean;
  public terminos;

  constructor(
    private _designerService : DesignerService,
    private _route : ActivatedRoute,
    private _router : Router
  ) {
    this.next = false;
    this.next = false;
    this.designer = new Designer('','','','','','','','','','','');
    this.Alerta = false;
    this.AlertSuccess = false;
    if(this.validarUsuario()){
      this._router.navigate(['/home']);
    }
   }

  ngOnInit() {
  }

  seguirRegistro(){
    if(this.next == false){
      this.next = true;
    }else{
      this.next = false;
    }
  }

  abrirCondiciones(){
    if(this.condiciones == false){
      this.condiciones = true;
    }else{
      this.condiciones = false;
    }   
  }

  cambionom(event) {
    let file = event.target.files[0];
    let fileName = file.name; 
    document.getElementById('fichero').innerHTML = fileName;
    this.filesToUpload = <Array<File>>event.target.files;
    console.log(this.filesToUpload);
  }

  onSubmit(registerFormDesign){
    console.log(this.designer);

    if(this.filesToUpload && this.filesToUpload.length >= 1){
      this._designerService.makeFileRequest(GLOBAL.url+'upload-file',[],this.filesToUpload).then((result)=>{
        console.log(result);
        this.resultUpload = result;
        this.designer.foto_disenador = this.resultUpload.filename;
        this.saveDesigner();
  
  
      }, (error) =>{
        console.log(error);
      });
    }else{
      this.saveDesigner();
    }

  }

  saveDesigner(){
    console.log(this.designer);
    this._designerService.addDesigner(this.designer).subscribe(
      response => {
        this.respuesta = response;
        if(this.respuesta.code == 200){
          this.messageAlert = this.respuesta.masssage;
          this.AlertSuccess = true;
          
        }else{
          console.log(response);
        }

        if(this.respuesta.code == 404){
          this.messageAlert = this.respuesta.masssage;
          this.Alerta = true;
        }

      },
      error =>{
        console.log(<any>error);
      }
    );
  }

  cerrarAlert(){
    if(this.Alerta == true){
      this.Alerta = false;
    }
    if(this.AlertSuccess == true){
      this.AlertSuccess = false;
      this._router.navigate(['/home']);   
    }  
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
