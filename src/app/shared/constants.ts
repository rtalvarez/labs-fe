import * as _ from 'lodash';

export const DATEPICKER_OPTIONS = {
  monthsFull: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
  monthsShort: [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ],
  weekdaysFull: [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ],
  weekdaysShort: [ 'Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb' ],
  today: 'hoy',
  clear: 'borrar',
  close: 'cerrar',
  firstDay: 1,
  format: 'dddd d !de mmmm !de yyyy',
  formatSubmit: 'yyyy/mm/dd',
  selectMonths: true,
  selectYears: 200,
  onSet: () => {},
};

export const AVAILABLE_APPOINTMENT_TIMES = _.range(8, 19, 1);
