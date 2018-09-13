// Create a new calendar
class Calendar2 {
  constructor() {    
    this.todayObj = new Date();
    this.date = this.todayObj.getDate();
    this.month = this.todayObj.getMonth();
    this.year = this.todayObj.getFullYear();
    this.monthArray = []; // access with getter setter
    this.calendarHTML = ""; // access with getter setter
  }
  static createCalendar(id) { 
    const calendar2 = new Calendar2();
    // Create HTML
    calendar2.monthArray = calendar2.initMonthArray(calendar2.todayObj);
    calendar2.calendarHTML = calendar2.createMonthHTML(calendar2.monthArray, calendar2.todayObj);
    // Output
    calendar2.writeMonthHTML(id, calendar2.calendarHTML);
    calendar2.highlightToday(calendar2.date);
  }
  readableDate(dateObj) {
    
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthsName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const numberOrdinal = ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'];
    const date = dateObj.getDate();
    const day = dateObj.getDay();
    
    let i;
    if (date >= 30) {
      i = date - 30;
    } else if (date >= 20) {
      i = date - 20;
    } else if (date > 9 && date < 20) {
      i = 0;
    } else {
      i = date;
    }
    
    const dateOrdinal = numberOrdinal[i]
    
    return `<table class="calendar2 calendar-table"><tbody ><tr><th colspan="10" >${daysOfWeek[day]}&nbsp;${date}<sup>${dateOrdinal}</sup>&nbsp;${monthsName[dateObj.getMonth()]}&nbsp;${dateObj.getFullYear()}</th ></tr>`;
  }
  initMonthArray(dateObj) {

    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const firstDayOfMonth = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);
    const monthLength = daysInMonth[firstDayOfMonth.getMonth()];
    let monthArray = [];
    // Init array length
    monthArray = Array.apply(null, { length: monthLength }).map(Number.call, Number);
    monthArray = monthArray.map(x => x = {day: x+1}); // Adjust first day 0=>1
    // First day of the week index e.g 0:Mon, 1:Tue, 2:Wed
    monthArray[0].firstDayOfMonth = firstDayOfMonth.getDay();

    return monthArray;
  }
  createMonthHTML(monthArray, dateObj) {
    
    const emptyCells = monthArray[0].firstDayOfMonth - 1;
    
    let html = this.readableDate(dateObj);
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
  writeMonthHTML(id, html) {
    document.getElementById(id).insertAdjacentHTML('beforeend', html);
  }
  highlightToday(date) {
    let e = document.querySelectorAll(`#id-${date}`);
    e[0].classList.add('today');
  }
}