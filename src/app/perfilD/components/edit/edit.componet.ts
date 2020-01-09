import { Component, OnInit, DoCheck } from '@angular/core';
import { DesignerService } from '../../../services/designer.service';
import { Designer } from 'src/app/models/designer';


@Component({
    selector: 'perfil-edit',
    templateUrl: './edit.component.html',
    styleUrls : ['./edit.component.css'],
    providers: [DesignerService]
})
export class editComponent implements OnInit, DoCheck{
    public identity;
    public designer;
    public respuesta;
    public message : boolean;

    constructor(
        private _designerService : DesignerService
    ){
        this.identity = this._designerService.getIdentity();
        this.designer = this.identity;
        this.message = false;
    }

    ngOnInit(){

    }

    ngDoCheck(){

    }

    onSubmit(){
        console.log(this.designer);
        let id = this.designer.Documento_identidad;
        this._designerService.updateDesigner(this.designer,id).subscribe(
            response =>{
                console.log('se ha actualizado');
                this.message = true;
                localStorage.removeItem('identity');
                localStorage.setItem('identity', JSON.stringify(this.designer));
            },
            error =>{
                console.log(<any>error);
            }
        );

    }
}