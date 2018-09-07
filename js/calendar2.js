// Create a new calendar

function Calendar2() {
  // labels for the days of the week
  this.daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // months array in order
  this.monthsName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // the days of the week for each month, in order
  this.daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
}
function createCalendar() {
  const calendar2 = new Calendar2();
  const monthHTML2 = calendar2.createMonthHTML();
  document.getElementById('calendar2').insertAdjacentHTML('beforeend', monthHTML2);
  return calendar2;
}
function today() {
  return function () {
    const today = new Date();
    const date = today.getDate();
    const day = this.daysOfWeek[today.getDay()];
    const ordinal = this.dateOrdinal(date);
    const monthLength = this.daysInMonth[today.getMonth()];
    const month = this.monthsName[today.getMonth()];
    const year = today.getFullYear();
    const firstOfMonth = new Date(year, today.getMonth(), 1);
    const firstDay = firstOfMonth.getDay() - 1;
    return {
      date,
      day,
      ordinal,
      firstDay,
      monthLength,
      month,
      year,
    };
  };
}
function monthArray() {
  return function () {
    const monthLength = this.getToday().monthLength;
    let monthArray = Array.apply(null, {
      length: monthLength,
    }).map(Number.call, Number);
    // Adjust first day 0=>1
    monthArray = monthArray.map(x => x + 1);
    return monthArray;
  };
}
function monthHTML() {
  return function () {
    const month = this.createMonthArray();
    const startWeekday = this.getToday().firstDay;
    let html = `<table class="calendar2 calendar-table"> <tbody ><tr><th colspan="10" > ${this.getToday().day} &nbsp;${this.getToday().date}<sup>th</sup>&nbsp;${this.getToday().month}&nbsp;${this.getToday().year}</th ></tr>`;
    html += '<tr class="calendar-header"><td class="calendar-header-day">Mon</td><td class="calendar-header-day">Tue</td><td class="calendar-header-day">Wed</td><td class="calendar-header-day">Thu</td><td class="calendar-header-day">Fri</td><td class="calendar-header-day">Sat</td><td class="calendar-header-day">Sun</td></tr><tr>';
    const blanks = startWeekday;
    for (let i = 0; i < blanks; i += 1) {
      html += '<td></td>';
    }
    for (let i = 0; i < month.length; i += 1) {
      const day = month[i];
      const cell = blanks + day;
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
  };
}
function highlight() {
  return function () {
    const e = document.querySelectorAll(`#id-${this.getToday().date}`);
    e[0].classList.add('today');
  };
}
function ordinal() {
  return function (date) {
    // number ordinal labels
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
Calendar2.prototype.getToday = today();
Calendar2.prototype.createMonthArray = monthArray();
Calendar2.prototype.createMonthHTML = monthHTML();
Calendar2.prototype.highlightToday = highlight();
Calendar2.prototype.dateOrdinal = ordinal();
