import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { DesignerService } from './designer.service';
import { EmpresaService } from './empresa.service';

@Injectable()
export class PerfilGuard implements CanActivate{
    constructor(
        private _route : Router,
        private _designerService : DesignerService,
        private _empresaService : EmpresaService
    ){}

    canActivate(){
        let identity = this._designerService.getIdentity();
        let identityE = this._empresaService.getIdentityE();
        if(identity || identityE){
            return true;
        }else{
            this._route.navigate(['/home']);
            return false;
        }
    }

}