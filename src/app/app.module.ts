import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { CapturePatientComponent } from './capture-patient/capture-patient.component';
import { CaptureDoctorComponent } from './capture-doctor/capture-doctor.component';
import { CaptureDetailsComponent } from './capture-details/capture-details.component';
import { TypeaheadComponent } from './typeahead/typeahead.component';
import { LoginComponent } from './login/login.component';
import { PillsTypeaheadComponent } from './pills-typeahead/pills-typeahead.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'appointments/create', component: CreateAppointmentComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateAppointmentComponent,
    CapturePatientComponent,
    CaptureDoctorComponent,
    CaptureDetailsComponent,
    TypeaheadComponent,
    LoginComponent,
    PillsTypeaheadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
