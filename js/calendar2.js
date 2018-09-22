// Create a new calendar
class Calendar2 {
  constructor() {  
    this.todayObj = new Date();
    // this.calEl = {};
    this.date = this.todayObj.getDate();
    this.month = this.todayObj.getMonth();
    this.year = this.todayObj.getFullYear();
    this.monthArray = []; // access with getter setter
    this.monthHTML = ""; // access with getter setter
    this.options = {
      year: 'numeric',
      month: 'long',
    };
  }
  static createCalendar(id) {

    let calendar2html = new Calendar2();
    const calEl = document.querySelector(`#${id}`);
    
    // Create HTML
    calendar2html.setup(calEl, calendar2html.todayObj)
    
    return calendar2html
  }
  setup(el, todayObj) {
    this.monthArray = this.initMonthArray(todayObj);
    this.monthHTML = this.createMonthHTML(this.monthArray, todayObj);
    // Output
    this.writeMonthHTML(el, this.monthHTML);
    this.highlightDate(el, this.date);
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
    let a = dateObj.toLocaleDateString('en-GB', this.options);
    let b = this.todayObj.toLocaleDateString('en-GB', this.options);

    if (a === b) {
      return `<span class="calendar-month-ord">${daysOfWeek[day]}&nbsp;${date}<sup>${dateOrdinal}</sup>&nbsp;${monthsName[dateObj.getMonth()]}&nbsp;${dateObj.getFullYear()}</span>`;
    }
    
    return `<span class="calendar-month">${monthsName[dateObj.getMonth()]}&nbsp;${dateObj.getFullYear()}</span>`;
  }
  createArray(arrayLength){
    return Array.apply(null, {length: arrayLength}).map(Number.call, Number);
  }
  initMonthArray(todayObj) {

    const year = todayObj.getFullYear();
    const month = todayObj.getMonth();
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const firstDayOfMonth = new Date(year, month, 1);
    const monthLength = daysInMonth[month];
    // Make Monday the first day of the week index e.g 1:Mon, 2:Tue, 3:Wed and 0:Sun
    const firstDay = firstDayOfMonth.getDay() ? firstDayOfMonth.getDay() : firstDayOfMonth.getDate()+6;
    // Init arrays
    let monthArray = this.createArray(monthLength);
    monthArray = monthArray.map(x => x = { day: x + 1 }); // Adjust first day 0=>1
    let emptyCellsArray = this.createArray(firstDay);
    emptyCellsArray = emptyCellsArray.map(x => x = { day: '' }); // Adjust first day 0=>1

    let calendarArray = emptyCellsArray.concat(monthArray);

    return calendarArray;
  }
  createMonthHTML(monthArray, todayObj) {
    let html = ""

    html += `
    <table class="calendar2 calendar-table" >
      <tbody>
        <tr>
          <th colspan ="10">${this.readableDate(todayObj)}</th>
        </tr>
        <tr class="calendar-header">
          <td class="calendar-header-day">Mon</td>
          <td class="calendar-header-day">Tue</td>
          <td class="calendar-header-day">Wed</td>
          <td class="calendar-header-day">Thu</td>
          <td class="calendar-header-day">Fri</td>
          <td class="calendar-header-day">Sat</td>
          <td class="calendar-header-day">Sun</td>
        </tr>
          ${this.createDatesInMonthHTML(monthArray)}
    </table>`;

    return html;
  }
  createDatesInMonthHTML(monthArray) {
    let html = '<tr>';
    
    for (let i = 1; i < monthArray.length; i += 1) {
      const day = monthArray[i].day;
      if (day === '') {
        html += `<td class="calendar-day blank"></td>`;
      }  else if (i % 7 === 0) {
        html += `<td class="calendar-day" id="id-${day}">${day}</td></tr>`;
      } else if (i % 7 === 1) {
        html += `<tr><td class="calendar-day" id="id-${day}">${day}</td>`;
      } else {
        html += `<td class="calendar-day" id="id-${day}">${day}</td>`;
      };
    }
    
    return html += `</td>`;
  }
  writeMonthHTML(el, html) {
    el.insertAdjacentHTML('beforeend', html);
  }
  highlightDate(el, date) {
    let e = el.querySelectorAll(`#id-${date}`);
    e[0].classList.add('today');
  }
}