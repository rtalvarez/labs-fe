import { Component, OnInit } from '@angular/core';
import { PatientsService } from './../services/patients/patients.service';

import { DATEPICKER_CONFIG } from './../config/datepicker.config';

declare let $;

@Component({
  selector: 'capture-patient',
  templateUrl: './capture-patient.component.html',
  styleUrls: ['./capture-patient.component.css'],
  providers: [PatientsService],
})
export class CapturePatientComponent implements OnInit {
  private picker: any;
  private typeaheadData: Object;

  constructor(
    private patients: PatientsService
  ) {
  }

  ngOnInit() {
    this.initializeDatepicker();
    this.typeaheadData = {};

    this.onTypeaheadItemSelected = this.onTypeaheadItemSelected.bind(this);
    this.searchPatient = this.searchPatient.bind(this);
  }

  initializeDatepicker() {
    const $input = $('#capturePatient-DoB').pickadate(DATEPICKER_CONFIG);
    const picker = $input.pickadate('picker');

    this.picker = picker;
  }

  searchPatient(query) {
    return this.patients.fetchPatients(query);
      // .subscribe(
      //   patients => this.transformDataForTypeahead(patients),
      //   errors => this.handleErrors(errors)
      // )
  }

  // setPatients(patients) {
  //   const transformed = this.transformDataForTypeahead(patients);
  //   console.log('result', patients);
  //   this.results = patients;
  //
  //   this.setTypeaheadData(transformed);
  // }
  //
  // handleErrors(errors) {
  //   console.log('e', errors);
  // }


  onTypeaheadItemSelected(evt) {
    evt.preventDefault();

    console.log('w', evt);
  }
}
