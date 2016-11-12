import { Component, OnInit } from '@angular/core';
import { PatientsService } from './../services/patients/patients.service';
import * as _ from 'lodash';

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
  patientQuery: string;

  constructor(
    private patients: PatientsService
  ) {
    // this.rootElement = rootElement;
  }

  ngOnInit() {
    this.initializeDatepicker();
    // this.initializeAutocomplete();
    // this.searchPatient = _.debounce(() => this.searchPatient(), 200);
  }

  initializeDatepicker() {
    const $input = $('#capturePatient-DoB').pickadate(DATEPICKER_CONFIG);
    const picker = $input.pickadate('picker');

    this.picker = picker;
  }

  onPatientQueryChange() {
    console.log('change');
    if (this.patientQuery.length > 2) {
      this.searchPatient();
    }
  }

  searchPatient() {
    console.log('getting patient: ', this.patientQuery);
    debugger;
    return this.patients.fetchPatients(this.patientQuery);
  }

  initializeAutocomplete() {
    $('#capturePatient-patientTypeahead').autocomplete({
      data: {
        "Apple": null,
        "Microsoft": null,
        "Google": 'http://placehold.it/250x250'
      }
    });
  }
}
