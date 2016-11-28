import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';

import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Rx";

@Injectable()
export class AuthService {

  constructor(private http: Http) { }

  loginWithFacebook(authData) {

  }

}
