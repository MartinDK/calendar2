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
      return `${daysOfWeek[day]}&nbsp;${date}<sup>${dateOrdinal}</sup>&nbsp;${monthsName[dateObj.getMonth()]}&nbsp;${dateObj.getFullYear()}`;
    }
    
    return `${monthsName[dateObj.getMonth()]}&nbsp;${dateObj.getFullYear()}`;
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
    // Init empty arrays
    let monthArray = this.createArray(monthLength);
    let emptyCellsArray = this.createArray(firstDay-1);
    // Fill arrays with 
    monthArray = monthArray.map(x => x = { day: x + 1 }); // Adjust first day 0=>1
    emptyCellsArray = emptyCellsArray.map(x => x = { day: '' }); // Adjust first day 0=>1

    return emptyCellsArray.concat(monthArray);
  }
  createMonthHTML(monthArray, todayObj) {
    let html = `
    <div class="calendar2" >
        <div class="calendar header">
          <h1 id="calendar-title">${this.readableDate(todayObj)}</h1>
        </div>
        <div class="calendar days">
          <div class="calendar day">Mon</div>
          <div class="calendar day">Tue</div>
          <div class="calendar day">Wed</div>
          <div class="calendar day">Thu</div>
          <div class="calendar day">Fri</div>
          <div class="calendar day">Sat</div>
          <div class="calendar day">Sun</div>
        </div>
          ${this.createDatesInMonthHTML(monthArray)}
    </div>`;

    return html;
  }
  createDatesInMonthHTML(monthArray) {
    const emptyCellHtml = `<div class="calendar cell blank">x</div>`
    let html = monthArray.map( item => item.day === '' ? emptyCellHtml : `<div class="calendar cell date" id="id-${item.day}">${item.day}</div>`).join('');

    return html;
  }
  writeMonthHTML(el, html) {
    el.insertAdjacentHTML('beforeend', html);
  }
  highlightDate(el, date) {
    let e = el.querySelectorAll(`#id-${date}`);
    e[0].classList.add('today');
  }
}