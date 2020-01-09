import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit, OnDestroy, DoCheck{
public title : string;
public inPerfil; 

  constructor() { 
    this.title = 'Pricipal';
    this.inPerfil = '1';
    localStorage.setItem('inPerfil', this.inPerfil);
  }

  ngOnInit() {
    localStorage.removeItem('inPerfil');    
  }

  ngOnDestroy(){
    localStorage.removeItem('inPerfil');
  }

  ngDoCheck(){
    localStorage.setItem('inPerfil', this.inPerfil);
  }

}