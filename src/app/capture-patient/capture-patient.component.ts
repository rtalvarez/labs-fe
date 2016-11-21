import { Component, OnInit, ElementRef } from '@angular/core';
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
  private firstName: string;
  private lastName: string;
  private $el: any;

  constructor(
      private patients: PatientsService,
      private element: ElementRef
  ) {
  }

  ngOnInit() {
    this.initializeDatepicker();
    this.typeaheadData = {};

    this.onTypeaheadItemSelected = this.onTypeaheadItemSelected.bind(this);
    this.searchPatient = this.searchPatient.bind(this);
    this.$el = $(this.element.nativeElement);
  }

  initializeDatepicker() {
    const $input = $('#capturePatient-DoB').pickadate(DATEPICKER_CONFIG);
    const picker = $input.pickadate('picker');

    this.picker = picker;
  }

  searchPatient(query) {
    return this.patients.fetchPatients(query);
  }

  onTypeaheadItemSelected(evt) {
    const inputVals = $(evt.target).val().split(' ');

    // Event gets fired twice, need to catch the correct one
    if (inputVals.length !== 3) {
      return;
    }

    this.firstName = inputVals[0];
    this.lastName = inputVals[1];

    this.setValue('firstName', inputVals[0]);
    this.setValue('lastName', inputVals[1]);
    this.setDate(inputVals[2]);
  }

  setDate(date) {
    const formattedDate = date
        .replace(/[()]/g,'')
        .split('/')
        .map((digit) => digit.length === 1 ? '0' + digit : digit)
        .join('/');

    this.picker.set('select', formattedDate, { format: 'mm/dd/yyyy' });
    this.touchInput('DoB');
  }

  setValue(name, value) {
    this[name] = value;
    this.touchInput(name)
  }

  touchInput(name) {
    this.$el
        .find(`#capturePatient-${name}`)
        .addClass('valid');

    this.$el
        .find(`#capturePatient-${name} + label`)
        .addClass('active');
  }
}
