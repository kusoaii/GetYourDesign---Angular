import { Component, DoCheck, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck, OnInit, OnChanges{
  title = 'Angular7GYD';
  public inPerfil;

  constructor(){
    this.inPerfil = false;
    localStorage.removeItem('inPerfil');
    
  }

  ngOnInit(){
  
  }

  ngDoCheck(){   
    this.inPerfil = localStorage.getItem('inPerfil');
  }

  ngOnChanges(){
    console.log('on change');
  }

}
