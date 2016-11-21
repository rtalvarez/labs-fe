import {Component, OnInit, Input, ElementRef} from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss'],
  inputs: ['name'],
})
export class TypeaheadComponent implements OnInit {
  private $el: any;
  private query: string;
  private typeaheadData: Object;
  private element: ElementRef;
  private $typeahead: any;
  name: string;

  @Input()
  onItemSelected: Function;

  @Input()
  fetchData: Function;

  constructor(
    element: ElementRef
  ) {
    this.element = element;
    this.$el = $(element.nativeElement);
  }

  private attachListeners() {
    this.$typeahead = this.$el.find('.typeahead-input');

    this.$typeahead.on('change', this.onItemSelected);
  }

  ngOnInit() {
    this.typeaheadData = {};

    this.attachListeners();
  }

  handleErrors(errors) {
    console.log(errors);
  }

  setData(data) {
    const transformedData = this.transformData(data);

    this.$typeahead.autocomplete({
      data: transformedData,
    });
  }

  onQueryChange() {
    console.log('query change');

    if (this.query.length > 2) {
      this.fetchData(this.query)
        .subscribe(
          data => this.setData(data),
          errors => this.handleErrors(errors)
        )
    }
  }

  transformData(source) {
    const result = {};

    _.each(source, (patient) => {
      const key = `${patient.firstName} ${patient.lastName} (${patient.dateOfBirth})`;

      if (!this.typeaheadData[key]) {
        this.typeaheadData[key] = true;
        result[key] = null;
      }
    });

    return result;
  }
}
