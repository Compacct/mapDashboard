import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateConvertService {
  monthNames:any[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  currentDate: Date;

  date_Convert(dateParam: Date) {
    this.currentDate = new Date(dateParam);
    return `${this.currentDate.getDate().toString().length === 1 ? '0'+this.currentDate.getDate() : this.currentDate.getDate()}/${
      this.monthNames[this.currentDate.getMonth()]
    }/${this.currentDate.getFullYear()}`;
  }
}
