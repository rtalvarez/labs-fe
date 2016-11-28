import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'capture-details',
  templateUrl: './capture-details.component.html',
  styleUrls: ['./capture-details.component.css']
})
export class CaptureDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  searchStudies() {

  }

  onTypeaheadItemSelected() {

  }

  areDetailsValid() {
    
  }

  generateTypeaheadKey(study) {
    return `${study.name} (${study.price})`;
  }

}
