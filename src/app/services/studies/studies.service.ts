import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Rx";

import 'rxjs/add/operator/map';

@Injectable()
export class StudiesService {

  constructor(private http: Http) { }

  fetchStudies(query): Observable<Object[]> {
    return this.http.get(`/api/studies?query=${query}`)
        .map(this.extractData);
  }

  private extractData(res: Response) {
    return JSON.parse(res.json()) || {};
  }
}
