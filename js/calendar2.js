// Create a new calendar
class Calendar2 {
  constructor() {

    // labels for the days of the week
    this.daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // months array in order
    this.monthsName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // the days of the week for each month, in order
    this.daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    this.todayObj = new Date();
    this.date = this.todayObj.getDate();
    this.month = this.todayObj.getMonth();
    this.year = this.todayObj.getFullYear();
    this.monthArray = []; // make Private
    this.calendarHTML = ""; // make Private
  }
  static createCalendar(id) { 
    const calendar2 = new Calendar2();
    const firstOfMonth = new Date(calendar2.year, calendar2.month, 1);
    const monthLength = calendar2.daysInMonth[calendar2.month];
    const monthName = calendar2.monthsName[calendar2.getMonth];
    const dateOrdinal = calendar2.dateOrdinal(calendar2.date);
    const dateString = calendar2.createReadableDate( calendar2.todayObj, dateOrdinal, monthName);


    calendar2.monthArray = calendar2.initMonthArray(monthLength, firstOfMonth);
    calendar2.calendarHTML = calendar2.createMonthHTML(calendar2.monthArray, dateString);
    // Output
    calendar2.writeCalendarHTML(id, calendar2.calendarHTML);
    calendar2.highlightToday(calendar2.date);
  }
  initMonthArray(monthLength, firstOfMonth) {

    let monthArray = Array.apply(null, { length: monthLength }).map(Number.call, Number);
    monthArray = monthArray.map(x => x = {day: x+1}); // Adjust first day 0=>1
    monthArray[0].firstOfMonth = firstOfMonth.getDay();
    return monthArray;
  }
  createReadableDate(dateObj, dateOrdinal, monthName) {
    return `<table class="calendar2 calendar-table"> <tbody ><tr><th colspan="10" >${dateObj.getDate()}<sup>${dateOrdinal}</sup>&nbsp;${monthName}&nbsp;${dateObj.getFullYear()}</th ></tr>`;
  }
  createMonthHTML(monthArray, readableDate) {

    const emptyCells = monthArray[0].firstOfMonth - 1;
    
    let html = readableDate;
    html += '<tr class="calendar-header"><td class="calendar-header-day">Mon</td><td class="calendar-header-day">Tue</td><td class="calendar-header-day">Wed</td><td class="calendar-header-day">Thu</td><td class="calendar-header-day">Fri</td><td class="calendar-header-day">Sat</td><td class="calendar-header-day">Sun</td></tr><tr>';
    
    for (let i = 0; i < emptyCells; i += 1) {
      html += '<td></td>';
    }
    for (let i = 0; i < monthArray.length; i += 1) {
      const day = monthArray[i].day;
      const cell = emptyCells + day;
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
  writeCalendarHTML(id, html) {
    document.getElementById(id).insertAdjacentHTML('beforeend', html);
  }
  highlightToday(date) {
    let e = document.querySelectorAll(`#id-${date}`);
    e[0].classList.add('today');
  }
  dateOrdinal(date) {
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
    } else if (date > 9 && date < 20 ) {
      i = 0;
    } else {
      i = date;
    }
    
    return numberOrdinal[i];

  }
}