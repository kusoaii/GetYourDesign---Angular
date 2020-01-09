import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../../services/global';
import{ DesignerService } from '../../../services/designer.service';
import { EmpresaService } from '../../../services/empresa.service';
import { Designer } from '../../../models/designer';
import { Portafolio } from '../../../models/portafolio';
import { identity } from 'rxjs';

@Component({
    selector: 'perfil-principal',
    templateUrl: './principal.component.html',
    styleUrls : ['./principal.component.css'],
    providers: [
        DesignerService,
        EmpresaService
    ]
})
export class PrincipalComponent implements OnInit, DoCheck{
    public menu;
    public identity;
    public resources;

    constructor(
        private _route : Router,
        private _empresaService : EmpresaService
    ){
        this.resources = GLOBAL.urlRecurso;
        this.identity = this._empresaService.getIdentityE();
    }

    ngOnInit(){
    }

    ngDoCheck(){
        
    }

    abrirMenu(){
        let mm = document.getElementById('cerrarmenuEM');
       if(this.menu == false){
           this.menu = true;
           mm.classList.add('active');
       }else{
           this.menu = false;
           mm.classList.remove('active');
       }
    }

    cerrarSesion(){
        localStorage.clear();
        this.identity = null;
        this._route.navigate(['/home']);
    }
}