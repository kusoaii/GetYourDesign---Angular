import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'; 
import { Designer } from '../models/designer';
import { Empresa } from '../models/empresa';
import { Portafolio } from '../models/portafolio';
import { GLOBAL } from './global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Message } from '../models/message';

@Injectable()
export class EmpresaService{
    public url : string;
    public identityE;

    constructor(
        public _http : HttpClient
    ){
        this.url = GLOBAL.url;
    }

    addEmpresa(empresa : Empresa){
        let json = JSON.stringify(empresa);
        let params = 'json='+json;
        let headers = new HttpHeaders ({'Content-Type':'application/x-www-form-urlencoded'});

        return this._http.post(this.url+'register-empresa',params, {headers: headers})
        .pipe(map(res => res));
    }

    getIdentityE(){
        let identityE = JSON.parse(localStorage.getItem('identityE'));
        if(identityE != "undefined"){
            this.identityE = identityE;
        }else{
            this.identityE = null;
        }
        return this.identityE;
    }

    sendMessage(message : Message){
        let json = JSON.stringify(message);
        let params = 'json='+json;
        let headers = new HttpHeaders ({'Content-Type':'application/x-www-form-urlencoded'});

        return this._http.post(this.url+'send-message',params, {headers: headers})
        .pipe(map(res => res));
    }
}