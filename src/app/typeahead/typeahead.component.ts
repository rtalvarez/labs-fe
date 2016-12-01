import {Component, OnInit, Input, ElementRef} from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss'],
  inputs: ['name'],
})
export class TypeaheadComponent implements OnInit {
  protected $el: any;
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
    this.$typeahead.on('change', (evt, data) => this.onTypeaheadChange(evt, data));
  }

  onTypeaheadChange(evt, evtData) {
    // Evt is fired twice, need to catch the right one
    if (_.isUndefined(evtData)) {
      return;
    }

    const id = evtData.option.data('id');

    this.onItemSelected(this.typeaheadData[id]);
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.$el = $(this.element.nativeElement);
    console.log(1, this.$el);
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
    console.log('s', source);

    _.each(source, (entity) => {
      console.log('b', entity)
      const key = this.generateKey(entity);

      if (!this.typeaheadData[entity.id]) {
        this.typeaheadData[entity.id] = entity;
        //result[key] = null;
        result[key] = {
          id: entity.id
        };
      }
    });

    console.log('res', result)
    return result;
  }
}
