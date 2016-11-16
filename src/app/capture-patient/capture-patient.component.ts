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
  private results: any;
  private errorMessage: any;
  private typeaheadData: Object;
  patientQuery: string;

  constructor(
    private patients: PatientsService
  ) {
    // this.rootElement = rootElement;
  }

  ngOnInit() {
    this.initializeDatepicker();
    this.typeaheadData = {};
    // this.initializeAutocomplete();
    // this.searchPatient = _.debounce(() => this.searchPatient(), 200);
    this.attachListener();
  }

  attachListener() {
    console.log(1);
    $('#capturePatient-patientTypeahead').on('change', (evt) => this.onTypeaheadChange(evt));
  }

  initializeDatepicker() {
    // const $input = $('#capturePatient-DoB').pickadate(DATEPICKER_CONFIG);
    // const picker = $input.pickadate('picker');
    //
    // this.picker = picker;
  }

  onPatientQueryChange() {
    if (this.patientQuery.length > 2) {
      this.searchPatient();
    }
  }

  searchPatient() {
    this.patients.fetchPatients(this.patientQuery)
      .subscribe(
        patients => this.setPatients(patients),
        errors => this.handleErrors(errors)
      )
  }

  setPatients(patients) {
    const transformed = this.transformDataForTypeahead(patients);
    console.log('result', patients);
    this.results = patients;

    this.initializeAutocomplete(transformed);
  }

  handleErrors(errors) {
    console.log('e', errors);
  }

  transformDataForTypeahead(source) {
    const result = {};

    _.each(source, (patient) => {
      const key = `${patient.firstName} ${patient.lastName}`;

      if (!this.typeaheadData[key]) {
        this.typeaheadData[key] = true;
        result[key] = null;
      }
    });

    console.log('transformed', result);
    return result;
  }

  onTypeaheadChange(evt) {
    evt.preventDefault();

    console.log('w', evt);
  }

  initializeAutocomplete(data) {
    $('#capturePatient-patientTypeahead').autocomplete({
      data,
    });
  }
}
