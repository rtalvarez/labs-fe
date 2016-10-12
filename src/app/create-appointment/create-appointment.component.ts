import { Component, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { DATEPICKER_CONFIG } from './../config/datepicker.config';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css']
})
export class CreateAppointmentComponent implements OnInit {

  constructor(
    private rootElement: ElementRef
  ) {
    console.log(1, rootElement);
    // this._rootElement = rootElement;
  }

  ngOnInit() {
    this.initializeDatepicker($(this.rootElement.nativeElement).find('.datepicker'));
  }

  initializeDatepicker($datepicker) {
    // options.monthsFull = []

    (<any>$datepicker).pickadate(DATEPICKER_CONFIG);
  }

}
