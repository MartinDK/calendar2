
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
    this.monthYearFormat = {
      year: 'numeric',
      month: 'long',
    };
    this.selectedDays = [];
    this.htmlLeftArrow = '<button id="month-decrease" aria-label="previous month"><img src="img/arrow-left-circle.svg" alt="left arrow"></button>';
    this.htmlRightArrow = '<button id="month-increase" aria-label="next month"><img src="img/arrow-right-circle.svg" alt="right arrow"></button>';
  }
  static createEvents(selector, calObj) {
    let calEvents = new Events;
    calEvents.dateObj = calEvents.todayObj;
    calEvents.selector = selector;
    calEvents.calEl = document.querySelector(`#${selector}`);
    calEvents.calObj = calObj;

    calEvents.addEvents();
  }
  addEvents(){
    this.dateEvents();
    this.buttonEvents();
  }
  formatDate(dateObj, formatOptions) {
    let dateUTC = new Date(Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()));
    let formattedDateStr = dateUTC.toLocaleDateString('en-GB', formatOptions);

    return formattedDateStr;
  }
  removePreviousMonth(el) {
    let removeOldCal = el.querySelector(`.calendar2`);
    removeOldCal.remove(removeOldCal);
  }
  addCurrentMonth(el, dateObj) {
    this.calObj.setup(el, dateObj);
  }
  changeMonth(increaseDecreaseMonth){
    this.month += increaseDecreaseMonth;
    this.dateObj = new Date(Date.UTC(this.year, this.month, this.date));
    this.removePreviousMonth(this.calEl)
    this.addCurrentMonth(this.calEl, this.dateObj);
    this.addEvents();
    this.clearSelection(this.calEl, this.todayObj, this.dateObj);
  }
  eventHandler(el){
    el.classList.contains('today') ? this.togglToday(el) : void(0);
    this.togglSelect(el);
    this.selectDates(el);
    this.addToSelectionList();
  }
  selectDates(el) {
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
  clearSelection(el, todayObj, dateObj) {
    const currentMonth = this.formatDate(todayObj, this.monthYearFormat);
    const selectedMonth = this.formatDate(dateObj, this.monthYearFormat);

    if ( selectedMonth === currentMonth ) {
    	el.querySelector(`#id-${dateObj.getDate()}`).classList.add('today');
    } else {
      // not today
    	let elToday = el.querySelector(`.today`);
    	let elSelected = el.querySelectorAll(`.selected`);
    	elSelected.forEach(el => {
    		el.classList.remove('selected');
      });
      // remove today highlight
    	elToday ? elToday.classList.remove('today') : elToday;
    }
  }
  addToSelectionList() {
    const dateEl = this.calEl.querySelector(`.selected-date`);
    const selectedSpans = this.calEl.querySelectorAll('.selected-list-item');
    const spanHeight = 32
    let calendarHeight = 313 - spanHeight;

    selectedSpans.forEach(thisSpan => {
      thisSpan.remove();
    });
    
    this.selectedDays.forEach( el => {
      dateEl.insertAdjacentHTML('beforeend', `<span class="selected-list-item">${el}</span>`);
      calendarHeight += spanHeight;
      this.calEl.style.height = `${calendarHeight}px`
    });
  }
  dateEvents() {
    
    const el = this.calEl.querySelectorAll(`td.calendar-day`);
  
    for (let i = 0; i < el.length; i += 1) {
      el[i].addEventListener('click', () => this.eventHandler(el[i]));
    };
  }
  buttonEvents() {
    let el = this.calEl.querySelector(`th`);

    el.insertAdjacentHTML('afterbegin', this.htmlLeftArrow);
    el.insertAdjacentHTML('beforeend', this.htmlRightArrow);
    let nextMonthButtonEl = el.querySelector(`#month-increase`);
    let previousMonthButtonEl = el.querySelector(`#month-decrease`);
    previousMonthButtonEl.addEventListener('click', () => this.changeMonth(-1));
    nextMonthButtonEl.addEventListener('click', () => this.changeMonth(1));
  }
  trigger(thisClass, el){
    // true if el contains thisClass
    return el.classList.contains(thisClass); 
  } 
  togglToday(el){ 
    return this.trigger("selected", el) ? console.log(`goodbye`) : console.log(`hello`)
  };
  togglSelect(el){ 
    return this.trigger("selected", el) ? el.classList.remove('selected') : el.classList.add('selected')
  };
}
