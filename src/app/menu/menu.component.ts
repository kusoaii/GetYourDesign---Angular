import { Component, OnInit, DoCheck } from '@angular/core';
import { DesignerService } from '../services/designer.service';
import { EmpresaService } from '../services/empresa.service';
import { Designer } from '../models/designer';
import { Router } from '@angular/router';
import { GLOBAL } from '../services/global';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [
    DesignerService,
    EmpresaService
  ]
})
export class MenuComponent implements OnInit, DoCheck {
  public id;
  public menu : boolean;
  public identity;
  public identityE;
  public menuP : boolean;
  public designerToFing;
  public respuesta;
  public designers : Designer[];
  public designerFind;
  public menuResponsive : boolean;
  public urlRecursos;

  constructor(
    private _designerService : DesignerService,
    private _empresaService : EmpresaService,
    private _router : Router
  ) { 
    this.menu = false;
    this.menuP = false;
    this.designerToFing = '';
    this.menuResponsive = false;
    this.urlRecursos = GLOBAL.urlRecurso;
  }

  ngOnInit() {
    this.identity = this._designerService.getIdentity();
    this.identityE = this._empresaService.getIdentityE();
  }

  ngDoCheck(){
    this.identity = this._designerService.getIdentity();
    this.identityE = this._empresaService.getIdentityE();
  }

  abrirBusqueda(){ 
    let sc = document.getElementById('search');

    if(this.menu == false){
      sc.classList.add('hide');
      this.menu = true;
    }
    else{
      sc.classList.remove('hide');
      this.menu = false;
    }
  }

  abrirBusqueda2(){ 
    let vv = document.getElementsByClassName('menu-item');
    let sf = document.getElementsByClassName('search-form');
    let cl = document.getElementsByClassName('close');
    let sr = document.getElementById('search');
    if(this.menu == false){
      vv[0].classList.add('hide-item');
      vv[1].classList.add('hide-item');
      sr.classList.add('hide');
  
      sf[0].classList.add('activado');    
      cl[0].classList.add('activado');
      
      this.menu = true;
    }else{
      vv[0].classList.remove('hide-item');
      vv[1].classList.remove('hide-item');
      sr.classList.remove('hide');

      sf[0].classList.remove('activado');
      cl[0].classList.remove('activado');
      this.menu = false;
    }
  }

  abrirmen(){
    
    if(this.menuP == false){
      let t = document.getElementsByClassName('menPerfil');
      t[0].classList.add('active');
      let i = document.getElementsByClassName('a-hidden');
      i[0].classList.add('active');
      i[1].classList.add('active');

      this.menuP = true;
    }else{
      let t = document.getElementsByClassName('menPerfil');
      t[0].classList.remove('active');
      let i = document.getElementsByClassName('a-hidden');
      i[0].classList.remove('active');
      i[1].classList.remove('active');

      this.menuP = false;
    }
    
  }

  buscarDesigner(e){
    if(this.designerFind == ''){
      this.designers = null;
    }else{
      this._designerService.findDesigner(this.designerFind).subscribe(
      response =>{
        this.respuesta = response;
        if(this.respuesta.code == 200){
          this.designers = this.respuesta.data;
        }else{
          this.designers = null;
        }
      },
      error =>{
        console.log(<any>error);
      }
    );
    }
    
  }

  mostrarValor(){
    console.log(this.designerFind);
  }

  abrirMenuRes(){
    let t = document.getElementsByClassName('nav-res');
    if(this.menuResponsive == false){
      t[0].classList.add('active');
      this.menuResponsive = true;
    }else{
      t[0].classList.remove('active');
      this.menuResponsive = false;
    }
    
  }

  CloseMen(){

  }

}
