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

  private extractData(res: Response) {
    return JSON.parse(res.json()) || {};
  }
}
