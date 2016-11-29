import { Component, OnInit } from '@angular/core';
import { StudiesService } from '../services/studies/studies.service';

@Component({
  selector: 'capture-details',
  templateUrl: './capture-details.component.html',
  styleUrls: ['./capture-details.component.css'],
  providers: [StudiesService]
})
export class CaptureDetailsComponent implements OnInit {

  constructor(
      private studies: StudiesService
  ) { }

  ngOnInit() {
    this.searchStudies = this.searchStudies.bind(this);
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
