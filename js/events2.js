class Events {
	constructor(selector, calObj) {

		this.selector = selector;
		this.calObj = calObj;
		this.calEl = document.querySelector(`#${selector}`);

	}
	eventHandler(el) {
		el.classList.contains('today') ? this.togglToday(el) : void(0);
		this.togglSelect(el);
		this.selectDate(el);
		this.selectedListEvent(this.calEl);
	}
	buttonEvents() {
		const htmlLeftArrow = '<button id="month-decrease" aria-label="previous month"><img src="img/arrow-left-circle.svg" alt="left arrow"></button>';
		const htmlRightArrow = '<button id="month-increase" aria-label="next month"><img src="img/arrow-right-circle.svg" alt="right arrow"></button>';
		const el = this.calEl.querySelector(`.calendar.header`);

		el.insertAdjacentHTML('afterbegin', htmlLeftArrow);
		el.insertAdjacentHTML('beforeend', htmlRightArrow);
		const nextMonthButtonEl = el.querySelector(`#month-increase`);
		const previousMonthButtonEl = el.querySelector(`#month-decrease`);
		previousMonthButtonEl.addEventListener('click', () => this.initCalendarEvents(-1));
		nextMonthButtonEl.addEventListener('click', () => this.initCalendarEvents(1));
	}
	eventState(thisClass, el) {
		// true if el contains thisClass
		return el.classList.contains(thisClass);
	}
	togglToday(el) {
		return this.eventState("selected", el) ? console.log(`goodbye`) : console.log(`hello`);
	}
	togglSelect(el) {
		return el.classList.toggle('selected');
	}
	selectedListEvent(elArray) {
		const selectedListArr = elArray.querySelectorAll('.selected-date-item');


		selectedListArr.forEach(el => {

			const txt = el.innerText;

			el.addEventListener('click', () => {
				console.log(el.id);
				el.remove('selected-date-item');
			});
			el.insertAdjacentHTML('beforeend', '<span class="selected-date-button">X</span>');

		});
	}
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
	static createCalendarEvents(selector, calObj) {

		let calEvents = new CalendarEvents(selector, calObj);

		calEvents.initCalendarEvents(0);

	}
	initCalendarEvents(adjustMonth) {
		this.changeMonth(adjustMonth);
		this.highlightToday(this.calEl);
		this.selectedDatesThisMonth(this.calEl);
		this.selectedListEvents();
		this.buttonEvents();
	}
	calculateMonthYear(month) {
		this.dateObj = this.newDateUTC(new Date(this.year, month, this.date));
		this.year = this.dateObj.getFullYear();
		this.month = this.dateObj.getMonth();
		this.date = this.dateObj.getDate();
	}
	changeMonth(adjustMonth) {

		this.month += adjustMonth;
		this.calculateMonthYear(this.month);

		this.calEl.querySelector(`.calendar2`).remove();

		this.calObj.newCalendar(this.calEl, this.dateObj);

	}
	selectedDatesThisMonth(el) {

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

			// console.log('no selection this month')

		}
	}
	highlightToday(el) {

		const {
			todayObj,
			dateObj
		} = this;

		// clear selected dates not in this month, add selections for current month view
		const currentMonth = this.monthYearFormat(todayObj);
		const selectedMonth = this.monthYearFormat(dateObj);

		if (selectedMonth === currentMonth) {

			el.querySelector(`#id-${dateObj.getDate()}`).classList.add('today');

		} else if (el.querySelector('.today')) {

			el.querySelector('.today').remove('today');

		}

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

			// console.log("year undefined")
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
		console.log(selectedItems)

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
		const selectedListEl = this.calEl.querySelector('.selected-dates-list');

		const dateObj = new Date(str);
		const day = dateObj.getDate();
		const month = dateObj.getMonth();
		const year = dateObj.getFullYear();
		const idString = `d${year}${month}${year}`;

		selectedListEl.insertAdjacentHTML('beforeend', `<span id="${idString}" class="selected-date-item">${str}</span>`);

		this.calendarHeight += this.spanHeight;
		this.calEl.style.height = `${this.calendarHeight}px`;

	}
	selectedListEvents() {

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
