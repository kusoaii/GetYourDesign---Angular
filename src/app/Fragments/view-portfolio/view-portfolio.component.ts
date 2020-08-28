import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Portafolio } from 'src/app/models/portafolio';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-view-portfolio',
  templateUrl: './view-portfolio.component.html',
  styleUrls: ['./view-portfolio.component.css']
})
export class ViewPortfolioComponent implements OnInit {
  @Input() portfolio;
  @Output() EmitterViewPortfolio = new EventEmitter();
  public urlPortafolio : string;

  constructor() {  
  }

  ngOnInit() {
    this.urlPortafolio = GLOBAL.urlRecurso + "portafolios/" + this.portfolio.Nombre_foto_portafolio;
  }

  CloseComponent(e) {
    if(e.target.className === 'modal'){
      this.EmitterViewPortfolio.emit({  });
    }
  }

}
