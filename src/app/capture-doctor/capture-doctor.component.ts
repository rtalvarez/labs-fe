import { Component, OnInit } from '@angular/core';
import { PatientsService } from './../services/patients/patients.service';

@Component({
  selector: 'capture-doctor',
  templateUrl: './capture-doctor.component.html',
  styleUrls: ['./capture-doctor.component.css'],
  providers: [PatientsService],
})
export class CaptureDoctorComponent implements OnInit {

  constructor(
      private patients: PatientsService
  ) { }

  ngOnInit() {
    this.onTypeaheadItemSelected = this.onTypeaheadItemSelected.bind(this);
    this.searchDoctor = this.searchDoctor.bind(this);
  }

  onTypeaheadItemSelected() {
    console.log('selected');
  }

  searchDoctor(query) {
    return this.patients.fetchDoctors(query);
  }

}
