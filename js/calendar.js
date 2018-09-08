function Calendar() {
  // labels for the days of the week
  this.daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // months array in order
  this.monthsName = ['January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December',
  ];

  // the days of the week for each month, in order
  this.daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  this.dayCounter = 1;
}
// add ordinal i.e 1st, 2nd, 3rd and 4th
Calendar.prototype.dateOrdinal = function (date) {
  // number ordinal labels
  numberOrdinal = {
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
// the current date
Calendar.prototype.getToday = function () {
  const todayObj = new Date();
  const today = todayObj.getDate();
  const weekday = todayObj.getDay();
  const month = todayObj.getMonth();
  const year = todayObj.getFullYear();

  return {
    today,
    weekday,
    month,
    year,
  };
};
// Tue 4th September 2018
Calendar.prototype.readableDate = function (date) {
  const todaysName = this.daysOfWeek[this.startMonday(date.weekday)];
  const readableDate = `${todaysName  }&nbsp;${  date.today  }<sup>${  this.dateOrdinal(date.today)  }</sup>` + `&nbsp;${  this.monthsName[date.month]  }&nbsp;${  date.year}`;
  return readableDate;
};
// make Monday start of the week
Calendar.prototype.startMonday = function (day) {
  if (day == 0) {
    day += 6;
  } else {
    day -= 1;
  }
  return day;
};
// month properties
Calendar.prototype.monthProps = function (dateObj) {
  const year = dateObj.year;
  const month = dateObj.month;

  const firstOfMonth = new Date(year, month, 1); // first day of month
  const startOfWeek = firstOfMonth.getDay();
  let lengthOfMonth = this.daysInMonth[month]; // number of days this month

  const leapYear = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
  if (month == 1 && leapYear) {
    lengthOfMonth = 29;
  } // February - leap year

  return {
    firstOfMonth: startOfWeek,
    lengthOfMonth,
  };
};
// table header
Calendar.prototype.tableHeader = function (dateStr) {
  let html = '';
  html += '<table class="calendar-table">';
  html += '<tr><th colspan="7">';
  html += dateStr;
  html += '</th></tr>';
  html += '<tr class="calendar-header">';
  for (let i = 0; i <= 6; i++) {
    html += '<td class="calendar-header-day">';
    html += this.daysOfWeek[i];
    html += '</td>';
  }
  html += '</tr>';

  return html;
};
// one week
Calendar.prototype.calendarRow = function (today, monthDetails, week) {
  let html = '<tr>';

  if (this.dayCounter > monthDetails.lengthOfMonth) {
    return html;
  } // stop if end of month

  for (let dayOfWeek = 1; dayOfWeek <= 7; dayOfWeek++) { // loop for each day of the week
    html += '<td class="calendar-day';
    if (this.dayCounter == today) {
      html += ' today';
    } // add today class

    if ((week > 0) || (dayOfWeek >= monthDetails.firstOfMonth)) { // start from first day of month
      html += `" id = "day">${this.dayCounter++}`;
    } else {
      html += '">';
    }
    html += '</td>';
  }
  return html;
};
// all days of the month
Calendar.prototype.calendarBody = function (monthDetails, todaysDate) {
  let html = '';
  const today = todaysDate.today;

  // loop for weeks (rows)
  for (let i = 0; i < 6; i++) {
    html += this.calendarRow(today, monthDetails, i);
  }
  html += '</tr></table>';
  return html;
};
// Build calendar HTML
Calendar.prototype.calendarHTML = function () {
  const todaysDate = this.getToday();
  const monthDetails = this.monthProps(todaysDate);
  const readableDate = this.readableDate(todaysDate);
  let html = '';

  firstOfMonth = this.startMonday(monthDetails.firstOfMonth);

  html += this.tableHeader(readableDate);
  html += this.calendarBody(monthDetails, todaysDate);

  return html;
};
