import { Component, OnInit } from '@angular/core';
import { Designer } from '../models/designer';
import { Portafolio } from '../models/portafolio';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/global';
import{ DesignerService } from '../services/designer.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
  providers: [DesignerService]
})
export class RankingComponent implements OnInit {

  public designers;
  public portafolios;
  public resouces;
  public respuesta;
  public respuesta2;
  public ports;
  public cont : number;
  public portafolioTemplate;
  public ok;

  constructor(
        private _designerService : DesignerService,
        private _route : Router,
        private _acRoute : ActivatedRoute
  ) {
    this.resouces = GLOBAL.urlRecurso;
    this.ok = true;
    
   }

  ngOnInit() {
    this.optenerDatos();
  }

  optenerDatos(){

    this._designerService.listarInfoRanking().subscribe(
      
      response =>{
        this.respuesta = response;
        this.designers = this.respuesta.data;
      
      },
      error =>{
        console.log(<any>error);
      }
    );
  }

  optenerPortafolios(documento){

        this._designerService.listarPortaRanking(documento).subscribe(
          response =>{
            
            this.respuesta2 = response;
            if(this.respuesta2.code == 200){
              this.portafolios = this.respuesta2.data; 
              this.ports = this.portafolios;
              console.log(this.portafolios);  
            }
          },
          error =>{
            console.log(<any>error);
          }
        );  
  }


}
