import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
public slide : number;
  constructor() {
    this.slide = 1;
   }

  ngOnInit() {
  }

  onSlide(param, isdot){
    if(param == 'next' && this.slide < 3){
      this.slide = this.slide + 1;
    }else if(param == 'back' && this.slide > 1){
      this.slide = this.slide - 1;
    }else if(isdot == true){
      this.slide = param;
    }
  }
}
