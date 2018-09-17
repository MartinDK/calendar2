
class Events {
  constructor() {
    this.e = '';
    this.todayObj = new Date();
    this.dateObj = this.todayObj;
    this.calObj = {};
    this.date = this.dateObj.getDate();
    this.month = this.dateObj.getMonth();
    this.year = this.dateObj.getFullYear();
    this.options = {
      year: 'numeric',
      month: 'long',
    };

  }
  static createEvents(selector, calObj) {
    let calEvents = new Events;
    calEvents.dateObj = calEvents.todayObj;
    calEvents.calObj = calObj;
    calEvents.addEvents(selector);
    calEvents.addButtonss(selector);
  }
  updateEvents(selector, calObj){
    document.querySelector(`#${selector}`).removeChild(document.querySelector(`#${selector}`).firstChild);
    // let calEvents = new Events;
    this.calObj = calObj;
    this.addEvents(selector);
    this.addButtonss(selector);
  }
  // Buttons
  addButtonss(selector) {
    let el = document.querySelector(`#${selector} th`)
    el.insertAdjacentHTML('afterbegin', '<button id="month-decrease">&nbsp;\<-&nbsp;</button>');
    el.insertAdjacentHTML('beforeend', '<button id="month-increase">&nbsp;-\>&nbsp;</button>');
    let increaseMonthButton = document.querySelector(`#${selector} #month-increase`);
    let decreaseMonthButton = document.querySelector(`#${selector} #month-decrease`);
    decreaseMonthButton.addEventListener('click', () => this.changeMonth(selector, -1));
    increaseMonthButton.addEventListener('click', () => this.changeMonth(selector, 1));
  }
  changeMonth(selector, changeMonth){
    
    this.month += changeMonth;
    this.dateObj = new Date(Date.UTC(this.year, this.month, this.date));
    this.calObj.setupMonth(selector, this.dateObj);
    
    if (this.dateObj.getMonth() === (new Date().getMonth())) {
      document.querySelector(`#${selector} #id-${this.dateObj.getDate()}`).classList.add('today');
    } else {
      let elToday = document.querySelector(`${selector} .today`);
      let elSelected = document.querySelectorAll(`${selector} .selected`);
      elSelected.forEach(el => {
        el.classList.remove('selected');
      });
      elToday ? elToday.classList.remove('today') : elToday;
    }
    this.updateEvents(selector, this.calObj);
  }
  // Add Events to date cells 
  addEvents(selector) {
    const el = document.querySelectorAll(`#${selector} td.calendar-day`);

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

