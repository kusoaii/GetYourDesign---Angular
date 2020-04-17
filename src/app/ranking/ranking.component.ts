import { Component, OnInit } from '@angular/core';
import { Designer } from '../models/designer';
import { Portafolio } from '../models/portafolio';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/global';
import { DesignerService } from '../services/designer.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
  providers: [DesignerService]
})
export class RankingComponent implements OnInit {

  public designers : Designer[];
  public portafolios;
  public resouces : string;
  public DesignerResponse;
  public portfolioResponse;
  public ports;
  public matrizPortafolios: string[][];

  constructor(
    private _designerService: DesignerService,
    private _route: Router,
    private _acRoute: ActivatedRoute
  ) {
    this.resouces = GLOBAL.urlRecurso;
    this.matrizPortafolios = [];
  }

  ngOnInit() {
    this.optenerDatos();
  }

  optenerDatos() {

    this._designerService.listarInfoRanking().subscribe(

      response => {
        this.DesignerResponse = response;
        this.designers = this.DesignerResponse.data;
        this.designers.forEach(designer =>{
          this.optenerPortafolios(designer);
        });
        console.log(this.designers);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  optenerPortafolios(designer : Designer) {

    this._designerService.listarPortaRanking(designer.Documento_identidad).subscribe(
      response => {

        this.portfolioResponse = response;
        if (this.portfolioResponse.code == 200) {
          this.portafolios = this.portfolioResponse.data;
          designer.Portfolios = this.portafolios;
          this.ports = this.portafolios;
          console.log(this.portafolios);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  GoTo(route : string){
    console.log(route);
    this._route.navigate(['/detalle-diseñador/'+ route]);
  }
}
