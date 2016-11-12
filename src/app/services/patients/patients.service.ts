import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class PatientsService {

  constructor(private http: Http) {

  }

  fetchPatients(query) {
    return this.http.get(`/api/patients?query=${query}`);
  }
}
