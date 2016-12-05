import { ElementRef, Component, OnInit } from '@angular/core';
import { StudiesService } from '../services/studies/studies.service';
import { AppointmentsService } from '../services/appointments/appointments.service';

@Component({
  selector: 'capture-details',
  templateUrl: './capture-details.component.html',
  styleUrls: ['./capture-details.component.css'],
  providers: [StudiesService, AppointmentsService]
})
export class CaptureDetailsComponent implements OnInit {
  private $selectHour: any;
  private availableSlots: any;

  constructor(
      private appointments: AppointmentsService,
      private studies: StudiesService,
      private element: ElementRef
  ) { }

  ngOnInit() {
    this.searchStudies = this.searchStudies.bind(this);


    this.appointments.fetchAppointmentsByDate('2012-01-13')
      .subscribe(
        data => (this.initializeSelect(data))
    );

    //this.initializeSelect();
  }

  initializeSelect(data) {

    console.log('dates', data);
    this.availableSlots = [{
      value: 2,
      displayName: "2"
    }];

    this.$selectHour = $(this.element.nativeElement).find('#captureDetails-selectHour');
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
