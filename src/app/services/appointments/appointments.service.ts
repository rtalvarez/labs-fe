import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';

import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Rx";

@Injectable()
export class AppointmentsService {

  constructor(private http: Http) { }

  fetchAppointmentsByDate(date: string) {
    return this.http.get(`/api/appointments?date=${date}`)
      .map(this.extractData);
  }

  getDatetimeString(epoch) {
    const date = new Date(epoch);
    const month = '0' + (date.getMonth() + 1);
    const day = '0' + date.getDate();

    return `${date.getFullYear()}-${this.formatDigit(month)}-${this.formatDigit(day)}`;
  }

  private extractData(res: Response) {
    return JSON.parse(res.json()) || {};
  }

  private formatDigit(digit) {
    return digit.substring(digit.length - 2, digit.length);
  }
}
