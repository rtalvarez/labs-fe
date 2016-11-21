import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';

import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Rx";

@Injectable()
export class PatientsService {

  constructor(private http: Http) {

  }

  fetchPatients(query): Observable<Object[]> {
    return this.http.get(`/api/patients?query=${query}`)
      .map(this.extractData);
  }

  fetchDoctors(query): Observable<Object[]> {
    return this.http.get(`/api/doctors?query=${query}`)
      .map(this.extractData);
  }

  private extractData(res: Response) {
    return JSON.parse(res.json()) || {};
  }
}
