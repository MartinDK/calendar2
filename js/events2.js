
class Events {
  constructor() {
    this.e = '';
    this.todayObj = new Date();
    this.dateObj = this.todayObj;
    this.calObj = {};
    this.calEl = {};
    this.date = this.dateObj.getDate();
    this.month = this.dateObj.getMonth();
    this.year = this.dateObj.getFullYear();
    this.selectedDays = {};
    this.spanHeight = 32;
    this.calendarHeight = 295;
  }
  static createEvents(selector, calObj) {
    let calEvents = new Events;
    
    calEvents.dateObj = calEvents.todayObj;
    calEvents.calEl = document.querySelector(`#${selector}`);
    calEvents.calObj = calObj;

    calEvents.addEvents();
  }
  addEvents(){
    this.dateEvents();
    this.buttonEvents();
  }
  fullDateFormat(dateObj) {
    const fullDateFormat = {
    	year: 'numeric',
    	month: 'long',
    	day: 'numeric',
    	weekday: 'short',
    };
    
    let dateUTC = new Date(Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()));
    let formattedDateStr = dateUTC.toLocaleDateString('en-GB', fullDateFormat);

    return formattedDateStr;
  }
  monthYearFormat(dateObj) {
    const monthYearFormat = {
      year: 'numeric',
      month: 'long',
    }

    let dateUTC = new Date(Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()));
    let formattedDateStr = dateUTC.toLocaleDateString('en-GB', monthYearFormat);

    return formattedDateStr;
  }
  replaceMonth(el, dateObj) {
    let removeOldCal = el.querySelector(`.calendar2`);
    removeOldCal.remove(removeOldCal);

    this.calObj.setup(el, dateObj);
  }
  changeMonth(i){
    this.month += i;
    this.dateObj = new Date(Date.UTC(this.year, this.month, this.date));
    this.replaceMonth(this.calEl, this.dateObj);
    this.addEvents();
    this.clearSelection(this.calEl, this.todayObj, this.dateObj);
  }
  eventHandler(el){
    el.classList.contains('today') ? this.togglToday(el) : void(0);
    this.togglSelect(el);
    this.selectDates(el);
    // this.addToSelectedDates();
  }
  selectDates(el) {
    let dateStr = '';
    let thisDate = (el.id).substring(3,6);
    let dateUTC = new Date(Date.UTC(this.year, this.month, thisDate));
    let thisYear = dateUTC.getFullYear()
    let thisMonth = dateUTC.getMonth()
 
    if ( this.selectDates === undefined ) {

      console.log("empty")

      this.selectDates = { [thisYear]:{[thisMonth]: [{ date:thisDate, [thisDate]: dateUTC }]} };

    } else if (this.selectDates[thisYear] === undefined) {

      // console.log("year undefined")

      this.selectDates[thisYear] = { [thisMonth]: {[thisDate]: dateUTC} };

    } else if (this.selectDates[thisYear][thisMonth] === undefined) {

      // console.log("month undefined")

      this.selectDates[thisYear][thisMonth] = {[thisDate]: dateUTC};

    } else if ( this.selectDates[thisYear][thisMonth][thisDate] === undefined ) {

      // console.log('year and month exists')

      this.selectDates[thisYear][thisMonth][thisDate] = dateUTC;

    } else {

      // console.log("item deselected")

      delete this.selectDates[thisYear][thisMonth][thisDate];

    }

    this.initList();

    // Years in this.selectDates
    for (const year in this.selectDates) {
      if (this.selectDates.hasOwnProperty(year)) {
        const yearObj = this.selectDates[year];
        // Month in this.selectDates.year
        for (const month in yearObj) {
          if (yearObj.hasOwnProperty(month)) {
            const monthObj = yearObj[month];
            // Dates in this.selectDates.year.month
            for (const date in monthObj) {
              if (monthObj.hasOwnProperty(date)) {
                const dateObj = monthObj[date];
                dateStr = this.fullDateFormat(dateObj);
                this.addToSelectedDates(dateStr);
              }
            }
          }
        }
      }
    }

  }
  clearSelection(el, todayObj, dateObj) {
    const currentMonth = this.monthYearFormat(todayObj);
    const selectedMonth = this.monthYearFormat(dateObj);

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
  initList() {
    const selectedItems = this.calEl.querySelectorAll('.selected-date-item');
    this.calendarHeight = 295;

    selectedItems.forEach(thisSpan => {
      thisSpan.remove();
    });
  }
  addToSelectedDates(str) {
    const selectedListEl = this.calEl.querySelector(`.selected-dates-list`);

    console.log(str)
    
    selectedListEl.insertAdjacentHTML('beforeend', `<span class="selected-date-item">${str}</span>`);
    this.calendarHeight += this.spanHeight;
    this.calEl.style.height = `${this.calendarHeight}px`

  }
  dateEvents() {
    
    const el = this.calEl.querySelectorAll(`.calendar.date`);
  
    for (let i = 0; i < el.length; i += 1) {
      el[i].addEventListener('click', () => this.eventHandler(el[i]));
    };
  }
  buttonEvents() {
    const htmlLeftArrow = '<button id="month-decrease" aria-label="previous month"><img src="img/arrow-left-circle.svg" alt="left arrow"></button>';
    const htmlRightArrow = '<button id="month-increase" aria-label="next month"><img src="img/arrow-right-circle.svg" alt="right arrow"></button>';
    const el = this.calEl.querySelector(`.calendar.header`);

    el.insertAdjacentHTML('afterbegin', htmlLeftArrow);
    el.insertAdjacentHTML('beforeend', htmlRightArrow);
    const nextMonthButtonEl = el.querySelector(`#month-increase`);
    const previousMonthButtonEl = el.querySelector(`#month-decrease`);
    previousMonthButtonEl.addEventListener('click', () => this.changeMonth(-1));
    nextMonthButtonEl.addEventListener('click', () => this.changeMonth(1));
  }
  eventState(thisClass, el){
    // true if el contains thisClass
    return el.classList.contains(thisClass); 
  } 
  togglToday(el){ 
    return this.eventState("selected", el) ? console.log(`goodbye`) : console.log(`hello`);
  };
  togglSelect(el){ 
    return el.classList.toggle('selected');
  };
}
