import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'; 
import { Designer } from '../models/designer';
import { Portafolio } from '../models/portafolio';
import { GLOBAL } from './global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Injectable()
export class DesignerService{
    public url : string;
    public identity;

    constructor(
        public _http : HttpClient
    ){
        this.url = GLOBAL.url;
    }

    makeFileRequest(url : string , params : Array<string>, files: Array<File>){
        return new Promise((resolve,reject)=>{
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();

            for(var i = 0; i < files.length; i++){
                formData.append('uploads', files[i], files[i].name);
            }

            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.response));
                    }else{
                        reject(xhr.response);
                    }
                }
            };

            xhr.open("POST", url, true);
            xhr.send(formData);

        });
    }

    addDesigner(designer : Designer){
        let json = JSON.stringify(designer);
        let params = 'json='+json;
        let headers = new HttpHeaders ({'Content-Type':'application/x-www-form-urlencoded'});

        return this._http.post(this.url+'register-designer',params, {headers: headers})
        .pipe(map(res => res));
    }

    addPortafolio(portafolio : Portafolio){
        let json = JSON.stringify(portafolio);
        let params = 'json='+json;
        let headers = new HttpHeaders ({'Content-Type':'application/x-www-form-urlencoded'});

        return this._http.post(this.url+'add-portafolio',params, {headers: headers})
        .pipe(map(res => res));
    }

    updateFoto(designer, id){
        let json = JSON.stringify(designer);
        let params = 'json='+json;
        let headers = new HttpHeaders ({'Content-Type':'application/x-www-form-urlencoded'});

        return this._http.post(this.url+'update-designer-image/'+id,params, {headers: headers})
        .pipe(map(res => res));
    }

    login(designer : Designer){
        let json = JSON.stringify(designer);
        let params = 'json='+json;
        let headers = new HttpHeaders ({'Content-Type':'application/x-www-form-urlencoded'});

        return this._http.post(this.url+'login',params, {headers: headers})
        .pipe(map(res => res));
    }

    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));

        if(identity != "undefined"){
            this.identity = identity;
        }else{
            this.identity = null;
        }
        return this.identity;
    }

    getPortafolio(id){
        return this._http.get(this.url+'portafolio/'+id).pipe(map(res => res));
    }

    getMessages(id){
        return this._http.get(this.url+'messages/'+id).pipe(map(res => res));
    }

    deletePortafolio(id){
        return this._http.get(this.url+'delete-portafolio/'+id).pipe(map(res => res));
    }

    listarInfoRanking(){
        return this._http.get(this.url+'designer-ranking').pipe(map(res => res));
    }

    listarPortaRanking(id){
        return this._http.get(this.url+'porta-ranking/'+id).pipe(map(res => res));
    }

    findDesigner(usuario){
        return this._http.get(this.url+'find-designer/'+usuario).pipe(map(res => res));
    }

    detailDesigner(usuario){
        return this._http.get(this.url+'detail-designer/'+usuario).pipe(map(res => res));
    }

    updateDesigner(designer : Designer, id){
        let json = JSON.stringify(designer);
        let params = 'json='+json;
        let headers = new HttpHeaders ({'Content-Type':'application/x-www-form-urlencoded'});

        return this._http.post(this.url+'update-designer/'+id,params, {headers: headers})
        .pipe(map(res => res));
    }

}