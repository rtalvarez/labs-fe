import { ElementRef, Input, Component, OnInit } from '@angular/core';
import { TypeaheadComponent } from './../typeahead/typeahead.component';
import * as _ from 'lodash';

@Component({
  selector: 'pills-typeahead',
  templateUrl: './pills-typeahead.component.html',
  styleUrls: ['./pills-typeahead.component.scss'],
  inputs: ['name'],
})
export class PillsTypeaheadComponent extends TypeaheadComponent {
  private $pills: any;
  private pillTagNames: Object;

  @Input()
      onItemSelected: Function;

  @Input()
      fetchData: Function;

  @Input()
      generateKey: Function;

  @Input()
      getPillTagName: Function;

  constructor(
      element: ElementRef
  ) {
    super(element);

  }

  ngOnInit() {
    console.log('as dack as dack')
    this.initialize();

    this.$pills = this.$el.find('.chips');
    this.pillTagNames = {};
    console.log('pills', this.$pills)
  }

  onTypeaheadChange(evt, evtData) {
    if (_.isUndefined(evtData)) {
      return;
    }

    console.log('pre as dack')
    const entityId = evtData.option.data('id');
    const pill = this.getPillTagName(this.typeaheadData[entityId]);
    console.log('pillerino', pill)

    this.addPill(pill);
    super.onTypeaheadChange(evt, evtData);
  }

  addPill(tagName) {
    this.pillTagNames[tagName] = true;

    const tagNames = _.chain(this.pillTagNames)
      .keys()
      .map((keyName) => ({ tag: keyName }))
      .value();

    this.$pills.material_chip({
      data: tagNames
    });

    this.$el.find('.input').addClass('hidden');
  }


}
