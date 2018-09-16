
class Events {
  constructor() {
    this.e = '';
    this.todayObj = new Date();
    this.obj = {};
    this.date = this.todayObj.getDate();
    this.month = this.todayObj.getMonth();
    this.year = this.todayObj.getFullYear();
    this.options = {
      year: 'numeric',
      month: 'long',
    };

  }
  static createEvents(selector, obj) {
    let calEvents = new Events;
    calEvents.obj = obj;
    calEvents.addEvents(selector);
    calEvents.addButtonss(selector);
  }
  // Buttons
  addButtonss(selector) {
    let el = document.querySelector(`${selector} th`)
    el.insertAdjacentHTML('afterbegin', '<button id="month-decrease">&nbsp;\<-&nbsp;</button>');
    el.insertAdjacentHTML('beforeend', '<button id="month-increase">&nbsp;-\>&nbsp;</button>');
    let increaseMonthButton = document.querySelector(`${selector} #month-increase`);
    let decreaseMonthButton = document.querySelector(`${selector} #month-decrease`);
    decreaseMonthButton.addEventListener('click', () => this.changeMonth(selector, -1));
    increaseMonthButton.addEventListener('click', () => this.changeMonth(selector, 1));
  }
  changeMonth(selector, x){
    let calendarTitle;
    
    this.month += x;
    this.todayObj = new Date(Date.UTC(this.year, this.month, this.date));
    
    calendarTitle = this.todayObj.toLocaleDateString('en-GB', this.options);
    document.querySelector(`${selector} .calendar-title`).textContent = calendarTitle;
    
    if (this.todayObj.getMonth() === (new Date().getMonth())) {
      document.querySelector(`${selector} #id-${this.todayObj.getDate()}`).classList.add('today');
    } else {
      let elToday = document.querySelector(`${selector} .today`);
      let elSelected = document.querySelectorAll(`${selector} .selected`);
      elSelected.forEach(el => {
        el.classList.remove('selected');
      });
      elToday ? elToday.classList.remove('today') : console.log("not today");
    }
  }
  // Create Events  
  addEvents(selector) {
    const el = document.querySelectorAll(`${selector} td.calendar-day`);

    for (let i = 0; i < el.length; i += 1) {
      el[i].addEventListener('click', () => this.eventHandler(el[i]));
    };
  }
  // Event handler
  trigger(thisClass, el){ return el.classList.contains(thisClass); } // true if el contains thisClass

  eventHandler(el){
    this.trigger('today', el) ? this.togglToday(el) : console.log('do nothing');
    this.trigger('selected', el) ? this.togglSelect(el) : this.togglSelect(el);
  }
  // Events
  togglToday(el){ return this.trigger("selected", el) ? console.log(`goodbye`) : console.log(`hello`) };
  togglSelect(el){ return this.trigger("selected", el) ? el.classList.remove('selected') : el.classList.add('selected') };
}

