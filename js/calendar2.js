// Create a new calendar

class Calendar2 {
  constructor() {

    this.today = new Date();
    // labels for the days of the week
    this.daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // months array in order
    this.monthsName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // the days of the week for each month, in order
    this.daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    this.month = [];
  }
  static createCalendar(id) { 

    const calendar2 = new Calendar2();
    const html = calendar2.createMonthHTML();
    // Output
    calendar2.writeHTML(id, html);
    calendar2.highlightToday();
  }
  initMonthArray(month) {
    const monthLength = this.daysInMonth[month];
    let monthArray = Array.apply(null, { length: monthLength }).map(Number.call, Number);
    this.month = monthArray.map(x => x + 1); // Adjust first day 0=>1
  }
  createMonthHTML() {

    this.initMonthArray(this.today.getMonth());
    const startWeekday = this.getToday().firstDay;
    let html = `<table class="calendar2 calendar-table"> <tbody ><tr><th colspan="10" > ${this.getToday().day} &nbsp;${this.getToday().date}<sup>th</sup>&nbsp;${this.getToday().month}&nbsp;${this.getToday().year}</th ></tr>`;
    html += '<tr class="calendar-header"><td class="calendar-header-day">Mon</td><td class="calendar-header-day">Tue</td><td class="calendar-header-day">Wed</td><td class="calendar-header-day">Thu</td><td class="calendar-header-day">Fri</td><td class="calendar-header-day">Sat</td><td class="calendar-header-day">Sun</td></tr><tr>';
    
    const emptyCell = startWeekday;
    for (let i = 0; i < emptyCell; i += 1) {
      html += '<td></td>';
    }
    for (let i = 0; i < this.month.length; i += 1) {
      const day = this.month[i];
      const cell = emptyCell + day;
      if (cell === 1) {
        html += `<td class="calendar-day" id="id-${day}">${day}</td>`;
      } else if (cell % 7) {
        html += `<td class="calendar-day" id="id-${day}">${day}</td>`;
      } else {
        html += `<td class="calendar-day" id="id-${day}">${day}</td></tr><tr>`;
      }
    }
    html += '</table>';

    return html;
  }
  writeHTML(id, html) {
    document.getElementById(id).insertAdjacentHTML('beforeend', html);
  }
  highlightToday() {
    const e = document.querySelectorAll(`#id-${this.getToday().date}`);
    e[0].classList.add('today');
  }
  dateOrdinal() {
    return function (date) {
      const numberOrdinal = {
        0: 'th',
        1: 'st',
        2: 'nd',
        3: 'rd',
        4: 'th',
        5: 'th',
        6: 'th',
        7: 'th',
        8: 'th',
        9: 'th',
      };
      let i;
      if (date >= 30) {
        i = date - 30;
      } else if (date >= 20) {
        i = date - 20;
      } else if (date >= 10) {
        i = date - 10;
      } else {
        i = date;
      }
      
      return numberOrdinal[i];
    };
  }
  getToday() {
    const today = this.today
    const date = today.getDate();
    const day = this.daysOfWeek[today.getDay()];
    const ordinal = this.dateOrdinal(date);
    const month = this.monthsName[today.getMonth()];
    const year = today.getFullYear();
    const firstOfMonth = new Date(year, today.getMonth(), 1);
    const firstDay = firstOfMonth.getDay() - 1;
    
    return {
      date,
      day,
      ordinal,
      firstDay,
      month,
      year,
    };
  };
}