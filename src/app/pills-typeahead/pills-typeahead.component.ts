import { ElementRef, Input, Component, OnInit } from '@angular/core';
import { TypeaheadComponent } from './../typeahead/typeahead.component';

@Component({
  selector: 'pills-typeahead',
  templateUrl: './pills-typeahead.component.html',
  styleUrls: ['./pills-typeahead.component.css'],
  inputs: ['name'],
})
export class PillsTypeaheadComponent extends TypeaheadComponent {
  @Input()
      onItemSelected: Function;

  @Input()
      fetchData: Function;

  @Input()
      generateKey: Function;

  constructor(
      element: ElementRef
  ) {
    super(element);
    
    this.initialize();
  }

  ngOnInit() {
    console.log('as dack as dack')
  }

}
