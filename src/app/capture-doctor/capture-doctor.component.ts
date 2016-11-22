import { Component, OnInit, ElementRef } from '@angular/core';
import { PatientsService } from './../services/patients/patients.service';

@Component({
  selector: 'capture-doctor',
  templateUrl: './capture-doctor.component.html',
  styleUrls: ['./capture-doctor.component.css'],
  providers: [PatientsService],
})
export class CaptureDoctorComponent implements OnInit {
  private $el: any;
  private firstName: string;
  private lastName: string;
  private selectedDoctor: string;

  constructor(
      private patients: PatientsService,
      private element: ElementRef
  ) { }

  ngOnInit() {
    this.onTypeaheadItemSelected = this.onTypeaheadItemSelected.bind(this);
    this.searchDoctor = this.searchDoctor.bind(this);
    this.$el = $(this.element.nativeElement);
  }

  onTypeaheadItemSelected(doctor) {
    this.firstName = doctor.firstName;
    this.lastName = doctor.lastName;
    this.selectedDoctor = doctor;

    this.setValue('firstName', doctor.firstName);
    this.setValue('lastName', doctor.lastName);
  }

  isDoctorValid() {
    return this.firstName && this.lastName;
  }

  searchDoctor(query) {
    return this.patients.fetchDoctors(query);
  }

  setValue(name, value) {
    this[name] = value;
    this.touchInput(name)
  }

  touchInput(name) {
    this.$el
        .find(`#captureDoctor-${name}`)
        .addClass('valid');

    this.$el
        .find(`#captureDoctor-${name} + label`)
        .addClass('active');
  }
}
