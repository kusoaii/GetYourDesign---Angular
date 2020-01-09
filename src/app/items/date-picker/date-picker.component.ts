import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  public selectMonth : boolean;
  public Month;
  public Year;
  public Day;
  public DayWeek;
  public NameMonth : Array<string>;
  public Weeking : Array<string>;
  public FirstDay;
  public cell : any;
  public row : any;
  public tbl : any;

  constructor() {
    this.selectMonth = false;
    this.Year = new Date().getFullYear();
    this.Day = new Date().getDate();
    this.NameMonth = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Obtubre',
      'Noviembre',
      'Diciembre'
    ];

    this.Weeking = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sabado'
    ];

    this.Month = this.NameMonth[new Date().getMonth()];
    this.DayWeek = this.Weeking[new Date().getDay()];
   }

  ngOnInit() {
    this.showCalendar(5,2019);
  }

  chooseMonth(){
    this.selectMonth = true;
  }

  selectedMonth(e){
    let Month = e.target.innerHTML;
    this.Month = Month;
    this.selectMonth = false;
  }
  
  showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();

    this.tbl = <HTMLElement> document.querySelector("#calendar-body");  // body of the calendar
    let cellText;
    // clearing all previous cells
    /*tbl.innerHTML = "";*/

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        this.row = <HTMLElement> document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                this.cell = <HTMLElement> document.createElement("td");
                cellText = document.createTextNode("");
                this.cell.appendChild(cellText);
                this.row.appendChild(this.cell);
            }
            else if (date > this.daysInMonth(month, year)) {
                break;
            }

            else {
                this.cell = <HTMLElement> document.createElement("td");
                cellText = document.createTextNode(date.toString());

                this.cell.appendChild(cellText);
                this.row.appendChild(this.cell);
                date++;
            }


        }

        this.tbl.appendChild(this.row); // appending each row into calendar body.
    }

}

  daysInMonth(month, year){
    return 32 - new Date (month, year, 32) .getDate ();
  }

}
