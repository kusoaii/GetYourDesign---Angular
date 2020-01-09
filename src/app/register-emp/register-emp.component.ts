import { Component, OnInit } from '@angular/core';
import { Empresa } from '../models/empresa';
import { EmpresaService } from '../services/empresa.service';
import { DesignerService } from '../services/designer.service';
import { GLOBAL } from '../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-register-emp',
  templateUrl: './register-emp.component.html',
  styleUrls: ['./register-emp.component.css'],
  providers : [
    EmpresaService,
    DesignerService
  ]
})
export class RegisterEmpComponent implements OnInit {
  public next : boolean;
  public condiciones : boolean;
  public empresa : Empresa;
  public terminos : boolean;
  public respuesta;
  public messageAlert;
  public Alerta : boolean;
  public AlertSuccess : boolean;
  public filesToUpload;
  public resultUpload;

  constructor(
    private _designerService : DesignerService,
    private _empresaService : EmpresaService,
    private _router : Router
  ) { 
    this.next = false;
    this.next = false;
    this.Alerta = false;
    this.AlertSuccess = false;
    this.empresa = new Empresa('','','','','','','','','','','','');
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

  onSubmit(){
    console.log(this.empresa);

    if(this.filesToUpload && this.filesToUpload.length >= 1){
      this._designerService.makeFileRequest(GLOBAL.url+'upload-file',[],this.filesToUpload).then((result)=>{
        console.log(result);
        this.resultUpload = result;
        this.empresa.Foto_empresa = this.resultUpload.filename;
        this.saveEmpresa();
  
  
      }, (error) =>{
        console.log(error);
      });
    }else{
      this.saveEmpresa();
    }
  }

  saveEmpresa(){
    this._empresaService.addEmpresa(this.empresa).subscribe(
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
