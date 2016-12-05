export interface Datepicker {
  monthsFull: Array<String>;
  monthsShort: Array<String>;
  weekdaysFull: Array<String>;
  weekdaysShort: Array<String>;
  today: String,
  clear: String,
  close: String,
  firstDay: number,
  format: String,
  formatSubmit: String,
  onSet: Function,
}
