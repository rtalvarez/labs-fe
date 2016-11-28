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

  @Input()
  generateKey: Function;

  constructor(
    element: ElementRef
  ) {
    this.element = element;
    this.$el = $(element.nativeElement);
  }

  private clearQuery() {
    this.$typeahead.val('');
    this.$typeahead.blur();
    this.query = '';

    this.hideDropdown();
  }

  private attachListeners() {
    this.$typeahead = this.$el.find('.typeahead-input');

    //this.$typeahead.on('change', this.onItemSelected);
    this.$typeahead.on('change', (evt) => this.onTypeaheadChange(evt));
  }

  onTypeaheadChange(evt) {
    evt.preventDefault();
    const inputVals = $(evt.target).val().split(' ');

    // Evt is fired twice, need to catch the right one
    if (inputVals.length === 1) {
      return;
    }

    console.log('i', inputVals);
    const entity = {
      firstName: inputVals[0],
      lastName: inputVals[1],
      dateOfBirth: inputVals[2],
      id: undefined,
    };
    const key = this.generateKey(entity);

    entity.id = this.typeaheadData[key];

    this.onItemSelected(entity);
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
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
        );

      this.showDropdown();
    }
  }

  hideDropdown() {
    this.$el
        .find('.dropdown-content')
        .addClass('hidden');
  }

  showDropdown() {
    this.$el
        .find('.dropdown-content')
        .removeClass('hidden');
  }

  transformData(source) {
    const result = {};

    _.each(source, (entity) => {
      const key = this.generateKey(entity);

      if (!this.typeaheadData[key]) {
        this.typeaheadData[key] = entity.id;
        result[key] = null;
      }
    });

    return result;
  }
}
