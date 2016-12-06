import { ElementRef, Component, OnInit } from '@angular/core';
import { StudiesService } from '../services/studies/studies.service';
import { AppointmentsService } from '../services/appointments/appointments.service';

import * as _ from 'lodash';

import { DATEPICKER_CONFIG } from './../config/datepicker.config';

@Component({
  selector: 'capture-details',
  templateUrl: './capture-details.component.html',
  styleUrls: ['./capture-details.component.css'],
  providers: [StudiesService, AppointmentsService]
})
export class CaptureDetailsComponent implements OnInit {
  private $selectHour: any;
  private availableSlots: any;
  private $el: any;
  private appointmentDate: string;

  constructor(
      private appointments: AppointmentsService,
      private studies: StudiesService,
      private element: ElementRef
  ) { }

  ngOnInit() {
    this.$el = $(this.element.nativeElement);
    this.searchStudies = this.searchStudies.bind(this);


    this.appointments.fetchAppointmentsByDate('2012-01-13')
      .subscribe(
        data => (this.initializeSelect(data))
    );

    this.initializeDatepicker();
    //this.initializeSelect();
  }

  onAppointmentDateChange(context) {
    console.log('new val', context)
    const dateTime = this.appointments.getDatetimeString(context.select);

    this.appointments.fetchAppointmentsByDate(dateTime)
      .subscribe(
        data => this.initializeSelect(data),
        errors => this.handleErrors(errors)
    );
  }

  handleErrors(errors) {
    console.log('e', errors);
  }

  initializeDatepicker() {
    const config = _.clone(DATEPICKER_CONFIG);

    config.onSet = this.onAppointmentDateChange.bind(this);
    this.$el.find('#appointmentDate').pickadate(config);
  }

  initializeSelect(data) {
    console.log('dates', data);
    this.availableSlots = [{
      value: 2,
      displayName: "2"
    }];

    this.$selectHour = this.$el.find('#captureDetails-selectHour');
    this.$selectHour.material_select();
  }

  searchStudies(query) {
    return this.studies.fetchStudies(query)
  }

  onTypeaheadItemSelected(study) {
    console.log('selected', study);
  }

  getPillTagName(study) {
    return study.name;
  }

  areDetailsValid() {
    
  }

  generateTypeaheadKey(study) {
    return `${study.name} ($${study.price})`;
  }

}
