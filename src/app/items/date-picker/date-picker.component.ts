import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {
  // Usamos el decorador Output para pasar la fecha al componente padre
  @Output() PasarFechaEmitter = new EventEmitter();
  public DateSelected: string;


  public selectMonth: boolean;
  public selectYear: boolean;
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
  private days: string[][];
  public years: Array<string>;

  constructor() {
    this.selectMonth = true;
    this.selectYear = false;
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
    this.days = [];
    this.years = [];
  }

  ngOnInit() {
    this.fillYears();
  }

  chooseMonth() {
    this.selectMonth = true;
    this.selectYear = false;
  }

  chooseYear() {
    this.selectYear = true;
    this.selectMonth = false;
  }

  showCalendar() {
    let firstDay = (new Date(this.Year, this.NameMonth.indexOf(this.Month))).getDay();

    let date = 1;
    for (let i = 0; i < 6; i++) {
      this.days[i] = [];

      for (let j = 0; j < 7; j++) {
        if (i == 0 && j < firstDay) {
          this.days[i][j] = "";
        }
        else if (date > this.daysInMonth(this.Month, this.Year)) {
          break;
        }

        else {
          this.days[i][j] = date.toString();
          date++;
        }
      }
    }
  }

  selectedMonth(e) {
    let Month = e.target.innerHTML;
    this.Month = Month;
    this.selectYear = false;
    this.selectMonth = false;
    this.showCalendar();
  }

  selectedYear(e) {
    let Year = e.target.innerHTML;
    this.Year = Year;
    this.selectYear = false;
    this.selectMonth = false;
    this.showCalendar();
  }

  daysInMonth(month, year) {
    return new Date(year, this.NameMonth.indexOf(month) + 1, 0).getDate();
  }

  fillYears() {
    for (let i = 1950; i < 2035; i++) {
      this.years[i] = i.toString();
    }
  }

  hoverDay(e) {
    let dia = e.target.innerHTML.toString().trim();
    if (dia != null && dia != "" && dia.length != 0 && dia != undefined ) {
      e.target.classList.add('active')
    }
  }

  PasarFechaComponentePadre(event) {
    if (event.target.innerHTML.toString().trim() != "") {
      // Usamos el método emit
      this.Day = event.target.innerHTML;
      console.log('Emitir');
      let mesAEmitir = (this.NameMonth.indexOf(this.Month) + 1);
      let diaAEmitir = this.Day;
      mesAEmitir = this.AjustarNumeroFecha((this.NameMonth.indexOf(this.Month) + 1));
      diaAEmitir = this.AjustarNumeroFecha(diaAEmitir);
      this.DateSelected = this.Year.toString() + '-' + mesAEmitir + '-' + diaAEmitir.trim();
      this.PasarFechaEmitter.emit({ Date: this.DateSelected });
    }
  }

  AjustarNumeroFecha(date) {
    let dateCadena = date.toString().trim();
    if (date < 10) {
      return '0' + dateCadena;
    } else {
      return dateCadena;
    }
  }

}
