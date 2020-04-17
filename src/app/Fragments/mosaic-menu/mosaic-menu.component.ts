import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mosaic-menu',
  templateUrl: './mosaic-menu.component.html',
  styleUrls: ['./mosaic-menu.component.css']
})
export class MosaicMenuComponent implements OnInit {

  constructor(
    private _router : Router
  ) { }

  ngOnInit() {
  }

  GoTo(route : string){
    this._router.navigate([route]);
  }

}
