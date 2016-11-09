import { Component, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';

import { DATEPICKER_CONFIG } from './../config/datepicker.config';

declare let $;

@Component({
  selector: 'capture-patient',
  templateUrl: './capture-patient.component.html',
  styleUrls: ['./capture-patient.component.css']
})
export class CapturePatientComponent implements OnInit {
  rootElement: ElementRef;
  picker: any;

  constructor(
    rootElement: ElementRef
  ) {
    this.rootElement = rootElement;
  }

  ngOnInit() {
    this.initializeDatepicker();
    this.initializeAutocomplete();
  }

  initializeDatepicker() {
    const $input = $('#capturePatient-DoB').pickadate(DATEPICKER_CONFIG);
    const picker = $input.pickadate('picker');

    this.picker = picker;
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
