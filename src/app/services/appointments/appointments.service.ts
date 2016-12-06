import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { AVAILABLE_APPOINTMENT_TIMES } from './../../shared/constants';
import { Appointment } from './../../models/appointment.model';
import * as _ from 'lodash';

import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Rx";

@Injectable()
export class AppointmentsService {

  constructor(private http: Http) { }

  fetchAppointmentsByDate(date: string) {
    return this.http.get(`/api/appointments?date=${date}`)
      .map(this.extractData);
      //.map((res) => this.mapToAvailableAppointments(res));
  }

  fetchAvailableAppointmentHours(date: string) {
    return this.fetchAppointmentsByDate(date)
      .map(this.mapToAvailableAppointments);
  }

  mapToAvailableAppointments(appointments) {
    const data = _.map(appointments, (app: Appointment) => {
      const date = new Date(app.date);

      return date.getHours();
    });

    console.log(data);

    return _.difference(AVAILABLE_APPOINTMENT_TIMES, data);
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
