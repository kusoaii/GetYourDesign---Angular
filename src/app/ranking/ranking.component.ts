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

  public designers;
  public portafolios;
  public resouces : string;
  public DesignerResponse;
  public portfolioResponse;
  public ports;
  public matrizPortafolios: string[][];
  public portafolioTemplate;

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
        this.designers.forEach(designer => {
          this.optenerPortafolios(designer.Documento_identidad);
        });
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  optenerPortafolios(documento) {

    this._designerService.listarPortaRanking(documento).subscribe(
      response => {

        this.portfolioResponse = response;
        if (this.portfolioResponse.code == 200) {
          this.portafolios = this.portfolioResponse.data;
          this.ports = this.portafolios;
          console.log(this.portafolios);
          var numeroPortafolio = 0;
          this.portafolios.forEach(portafolio => {
              this.matrizPortafolios[numeroPortafolio] = portafolio.Nombre_foto_portafolio;
              numeroPortafolio = numeroPortafolio + 1;
          });

          console.log(this.matrizPortafolios);

        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }


}
