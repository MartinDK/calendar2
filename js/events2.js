
class Events {
  constructor() {
    this.e = '';
    this.selector = '';
    this.todayObj = new Date();
    this.dateObj = this.todayObj;
    this.calObj = {};
    this.calEl = {};
    this.date = this.dateObj.getDate();
    this.month = this.dateObj.getMonth();
    this.year = this.dateObj.getFullYear();
    this.fullDate = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    };
    this.monthYear = {
      year: 'numeric',
      month: 'long',
    };
    this.selectedDays = [];

  }
  static createEvents(selector, calObj) {
    let calEvents = new Events;
    calEvents.dateObj = calEvents.todayObj;
    calEvents.selector = selector;
    calEvents.calObj = calObj;
    calEvents.addEvents(selector);
    calEvents.addButtons(selector);
  }
  updateEvents(selector){
    let removeOldCal = document.querySelector(`#${selector} .calendar2`);
    removeOldCal.remove(removeOldCal);
    this.addEvents(selector);
    this.addButtons(selector);
  }
  formatDate(dateObj, formatOptions) {
    let dateUTC = new Date(Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()));
    let dateFormatted = dateUTC.toLocaleDateString('en-GB', formatOptions);

    return dateFormatted;
  }
  // Buttons
  addButtons(selector) {
    let el = document.querySelector(`#${selector} th`)
    el.insertAdjacentHTML('afterbegin', '<button id="month-decrease" aria-label="previous month"><img src="img/arrow-left-circle.svg" alt="left arrow"></button>');
    el.insertAdjacentHTML('beforeend',  '<button id="month-increase" aria-label="next month"><img src="img/arrow-right-circle.svg" alt="right arrow"></button>');
    let nextMonthButtonEl = document.querySelector(`#${selector} #month-increase`);
    let previousMonthButtonEl = document.querySelector(`#${selector} #month-decrease`);
    previousMonthButtonEl.addEventListener('click', () => this.changeMonth(selector, -1));
    nextMonthButtonEl.addEventListener('click', () => this.changeMonth(selector, 1));
  }
  changeMonth(selector, increaseDecreaseMonth){
    
    this.month += increaseDecreaseMonth;
    this.dateObj = new Date(Date.UTC(this.year, this.month, this.date));

    this.calObj.setupMonth(selector, this.dateObj);
    this.updateEvents(selector);

    if (this.dateObj.getMonth() === (this.todayObj.getMonth()) && (this.dateObj.getFullYear() === this.todayObj.getFullYear)){
      document.querySelector(`#${selector} #id-${this.dateObj.getDate()}`).classList.add('today');
    } else {
      let elToday = document.querySelector(`${selector} .today`);
      let elSelected = document.querySelectorAll(`${selector} .selected`);
      elSelected.forEach(el => {
        el.classList.remove('selected');
      });
      elToday ? elToday.classList.remove('today') : elToday;
    }
  }
  eventHandler(el){
    el.classList.contains('today') ? this.togglToday(el) : void(0);
    this.togglSelect(el);
    this.selectedDay(el);
    this.addSelectedDay();
  }
  selectedDay(el) {
    let dateStr = (el.id).substring(3,6);
    let selectedDate = new Date(Date.UTC(this.year, this.month, dateStr));
    
    dateStr = this.formatDate(selectedDate, this.fullDate);
    
    this.selectedDays = this.selectedDays.filter( date => {
      return date !== dateStr;
    })
    if ( this.trigger('selected', el)) {
      this.selectedDays.push(dateStr);
    }    
  }
  addSelectedDay() {
    const dateEl = document.querySelector(`#${this.selector} .selected-date`);
    const calEl = document.getElementById(this.selector);
    const spanHeight = 32
    let calendarHeight = 313 - spanHeight;
    let selectedSpans = dateEl.querySelectorAll('span');
    
    selectedSpans.forEach(thisSpan => {
      thisSpan.remove();
    });
    
    this.selectedDays.forEach( el => {
      dateEl.insertAdjacentHTML('beforeend', `<span class="selected-list-item">${el}</span>`);
      calendarHeight += spanHeight;
      calEl.style.height = `${calendarHeight}px`
    });
  }
  // Add Events to date cells 
  addEvents(selector) {
    const el = document.querySelectorAll(`#${selector} td.calendar-day`);
  
    for (let i = 0; i < el.length; i += 1) {
      el[i].addEventListener('click', () => this.eventHandler(el[i]));
    };
  }
  // Event handler
  trigger(thisClass, el){
    // true if el contains thisClass
    return el.classList.contains(thisClass); 
  } 
  // Events
  togglToday(el){ 
    return this.trigger("selected", el) ? console.log(`goodbye`) : console.log(`hello`)
  };
  togglSelect(el){ 
    return this.trigger("selected", el) ? el.classList.remove('selected') : el.classList.add('selected')
  };
}
