import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  public selectMonth: boolean;
  public Month;
  public Year;
  public Day;
  public DayWeek;
  public NameMonth: Array<string>;
  public Weeking: Array<string>;
  public FirstDay;
  public cell;
  public row;
  public tbl;

  constructor() {
    this.selectMonth = true;
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
  }

  chooseMonth() {
    this.selectMonth = true;
  }

  showCalendar() {
    let firstDay = (new Date(this.Year, this.NameMonth.indexOf(this.Month))).getDay();
    console.log(firstDay);
    this.tbl = document.querySelector("#calendar-body") as HTMLElement;  // body of the calendar
    let cellText;
    // clearing all previous cells

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
      // creates a table row
      this.row = document.createElement("tr") as HTMLElement;

      //creating individual cells, filing them up with data.
      for (let j = 0; j < 7; j++) {
        if (i == 0 && j < firstDay) {
          this.cell = document.createElement("td") as HTMLElement;
          cellText = document.createTextNode("");
          this.cell.appendChild(cellText);
          this.row.appendChild(this.cell);
        }
        else if (date > this.daysInMonth(this.Month, this.Year)) {
          break;
        }

        else {
          this.cell = document.createElement("td") as HTMLElement;
          cellText = document.createTextNode(date.toString());

          this.cell.appendChild(cellText);
          this.row.appendChild(this.cell);
          date++;
        }
      }

      this.tbl.appendChild(this.row); // appending each row into calendar body.
    }

  }

  selectedMonth(e) {
    let Month = e.target.innerHTML;
    this.Month = Month;
    this.selectMonth = false;
    this.showCalendar();
  }

  daysInMonth(month, year) {
    return new Date(year, this.NameMonth.indexOf(month) + 1, 0).getDate();
  }

}
