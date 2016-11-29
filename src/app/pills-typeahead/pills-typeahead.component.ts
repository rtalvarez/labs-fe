import { ElementRef, Input, Component, OnInit } from '@angular/core';
import { TypeaheadComponent } from './../typeahead/typeahead.component';

@Component({
  selector: 'pills-typeahead',
  templateUrl: './pills-typeahead.component.html',
  styleUrls: ['./pills-typeahead.component.css'],
  inputs: ['name'],
})
export class PillsTypeaheadComponent extends TypeaheadComponent {
  private $pills: any;

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
  }

  onTypeaheadChange(evt) {
    console.log('pre as dack')
    const pill = this.getPillTagName();

    //this.addPill()
    super.onTypeaheadChange(evt);
  }


}
