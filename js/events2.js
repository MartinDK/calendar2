class Events {
  constructor(selector, calObj) {

    this.calObj = calObj;
    this.calEl = document.querySelector(`#${selector}`);

  }
  eventHandler(el) {
    el.classList.contains('today') ? this.togglToday(el) : void(0);
    this.togglSelect(el);
    this.selectDate(el);
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
  eventState(thisClass, el) {
    // true if el contains thisClass
    return el.classList.contains(thisClass); 
  } 
  togglToday(el) { 
    return this.eventState("selected", el) ? console.log(`goodbye`) : console.log(`hello`);
  };
  togglSelect(el) { 
    return el.classList.toggle('selected');
  };
}
class CalendarEvents extends Events {
  constructor(selector, calObj) {
    super(selector, calObj);

    this.todayObj = new Date();
    this.dateObj = this.todayObj;
    this.date = this.dateObj.getDate();
    this.month = this.dateObj.getMonth();
    this.year = this.dateObj.getFullYear();
    this.selectedDates = {};
    this.spanHeight = 32;
    this.calendarHeight = 295;
  }
  static setupCalendarEvents(selector, calObj){

    let calEvents = new CalendarEvents(selector, calObj);
    
    calEvents.initSelectedListHtml();
    calEvents.addEvents();

  }
  addEvents() {
  	this.clearSelection(this.calEl);
  	this.dateEvents();
  	this.buttonEvents();
  }
  changeMonth(i) {

  	this.month += i;
  	this.dateObj = this.newDateUTC(new Date(this.year, this.month, this.date));
  	this.year = this.dateObj.getFullYear();
  	this.month = this.dateObj.getMonth();
  	this.date = this.dateObj.getDate();

  	let removeOldCal = this.calEl.querySelector(`.calendar2`);
  	removeOldCal.remove(removeOldCal);

  	this.calObj.setup(this.calEl, this.dateObj);

  	this.addEvents();

  }
  highlightSelectedMonth(el) {

  	const {
  		selectedDates,
  		dateObj
  	} = this;

  	const thisYear = dateObj.getFullYear();
  	const thisMonth = dateObj.getMonth();

  	if (selectedDates[thisYear] !== undefined && selectedDates[thisYear][thisMonth] !== undefined) {

  		let thisMonthSelected = selectedDates[thisYear][thisMonth];

  		for (const date in thisMonthSelected) {
  			if (thisMonthSelected.hasOwnProperty(date)) {

  				const dateObj = thisMonthSelected[date];
  				const id = dateObj.getDate();

  				el.querySelector(`#id-${id}`).classList.add('selected');

  			}
  		}
  	} else {

  		console.log('no selection this month')

  	}
  }
  clearSelection(el) {

    const {
      todayObj,
      dateObj
    } = this;

    // clear selected dates not in this month, add selections for current month view
    const currentMonth = this.monthYearFormat(todayObj);
    const selectedMonth = this.monthYearFormat(dateObj);

    if (selectedMonth === currentMonth) {

      el.querySelector(`#id-${dateObj.getDate()}`).classList.add('today');

    } else {

      let elToday = el.querySelector(`.today`);
      elToday ? elToday.classList.remove('today') : elToday;

      let elSelected = el.querySelectorAll(`.selected`);
      elSelected.forEach(el => el.classList.remove('selected'));

    }

    this.highlightSelectedMonth(el);

  }
  selectDate(el) {

  	const {
  		year: thisYear,
  		month: thisMonth,
  		selectedDates
  	} = this;

  	let thisDate = (el.id).substring(3, 6);
  	let dateUTC = new Date(Date.UTC(thisYear, thisMonth, thisDate));

  	if (selectedDates === undefined) {

  		// console.log("empty")
  		selectedDates = {
  			[thisYear]: {
  				[thisMonth]: {
  					[thisDate]: dateUTC
  				}
  			}
  		};

  	} else if (selectedDates[thisYear] === undefined) {

  		console.log("year undefined")
  		selectedDates[thisYear] = {
  			[thisMonth]: {
  				[thisDate]: dateUTC
  			}
  		};

  	} else if (selectedDates[thisYear][thisMonth] === undefined) {

  		// console.log("month undefined")
  		selectedDates[thisYear][thisMonth] = {
  			[thisDate]: dateUTC
  		};

  	} else if (selectedDates[thisYear][thisMonth][thisDate] === undefined) {

  		// console.log('year and month exists')
  		selectedDates[thisYear][thisMonth][thisDate] = dateUTC;

  	} else {

  		// console.log("item deselected")
  		delete selectedDates[thisYear][thisMonth][thisDate];

  	}

  	this.initSelectedListHtml();
  	this.createSelectedList();

  }
  initSelectedListHtml() {

  	const selectedItems = this.calEl.querySelectorAll('.selected-date-item');

  	this.calendarHeight = 295;
  	this.calEl.style.height = `${this.calendarHeight}px`;

  	selectedItems.forEach(thisSpan => thisSpan.remove());

  }
  createSelectedList() {

  	let dateStr = '';

  	// Years in this.selectedDates
  	for (const year in this.selectedDates) {
  		if (this.selectedDates.hasOwnProperty(year)) {

  			const yearObj = this.selectedDates[year];

  			// Month in this.selectedDates.year
  			for (const month in yearObj) {
  				if (yearObj.hasOwnProperty(month)) {

  					const monthObj = yearObj[month];

  					// Dates in this.selectedDates.year.month
  					for (const date in monthObj) {
  						if (monthObj.hasOwnProperty(date)) {

  							const dateObj = monthObj[date];
  							dateStr = this.fullDateFormat(dateObj);
  							this.addToSelectedListHtml(dateStr);
  						}
  					}
  				}
  			}
  		}
  	}
  }
  addToSelectedListHtml(str) {
  	const selectedListEl = this.calEl.querySelector(`.selected-dates-list`);
  	selectedListEl.insertAdjacentHTML('beforeend', `<span class="selected-date-item">${str}</span>`);
  	this.calendarHeight += this.spanHeight;
  	this.calEl.style.height = `${this.calendarHeight}px`;

  }
  dateEvents() {

  	const el = this.calEl.querySelectorAll(`.calendar.date`);

  	for (let i = 0; i < el.length; i += 1) {
  		el[i].addEventListener('click', () => this.eventHandler(el[i]));
  	};
  }
  newDateUTC(dateObj) {

  	let dateUTC = new Date(Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()));

  	return dateUTC;
  }
  fullDateFormat(dateObj) {

  	const fullDateFormat = {
  		year: 'numeric',
  		month: 'long',
  		day: 'numeric',
  		weekday: 'short',
  	};

  	let dateUTC = this.newDateUTC(dateObj)
  	let formattedDateStr = dateUTC.toLocaleDateString('en-GB', fullDateFormat);

  	return formattedDateStr;
  }
  monthYearFormat(dateObj) {
  	const monthYearFormat = {
  		year: 'numeric',
  		month: 'long',
  	}

  	let dateUTC = this.newDateUTC(dateObj)
  	let formattedDateStr = dateUTC.toLocaleDateString('en-GB', monthYearFormat);

  	return formattedDateStr;
  }
}
