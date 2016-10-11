import { Component, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';

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
    console.log(2, this.rootElement);
    const $rootElement = $(this.rootElement.nativeElement);


    (<any>$rootElement.find('.datepicker')).pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });
  }

  initialize() {

  }

}
