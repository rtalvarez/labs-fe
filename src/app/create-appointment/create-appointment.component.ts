import { Component, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';

import { DATEPICKER_CONFIG } from './../config/datepicker.config';

declare let $;

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css']
})
export class CreateAppointmentComponent implements OnInit {
  rootElement: ElementRef;
  picker: any;

  constructor(
    rootElement: ElementRef
  ) {
    this.rootElement = rootElement;
  }

  ngOnInit() {
    this.initializeDatepicker();
  }

  initializeDatepicker() {
    const $input = $('#createAppointment-DoB').pickadate(DATEPICKER_CONFIG);
    const picker = $input.pickadate('picker');

    this.picker = picker;
  }

}
