
class Events {
  constructor() {
    this.e = '';
    this.month = 0;
  }

  static createEvents(selector) {
    this.e = new Events;
    this.e.addEvents(selector);
    this.e.addButtonss(selector);
  }
  // Buttons
  addButtonss(selector) {
    let el = document.querySelector(`${selector} th`)
    el.insertAdjacentHTML('afterbegin', '<button id="month-decrease">&nbsp;\<-&nbsp;</button>');
    el.insertAdjacentHTML('beforeend', '<button id="month-increase">&nbsp;-\>&nbsp;</button>');
    let increaseMonthButton = document.querySelector(`${selector} #month-increase`);
    let decreaseMonthButton = document.querySelector(`${selector} #month-decrease`);
    increaseMonthButton.addEventListener('click', () => console.log(`${selector} inc ${this.month +=1}`));
    decreaseMonthButton.addEventListener('click', () => console.log(`${selector} dec ${this.month -=1}`));
  }

  // Create Events
  addEvents(selector) {
    const el = document.querySelectorAll(`${selector} td.calendar-day`);

    for (let i = 0; i < el.length; i += 1) {
      el[i].addEventListener('click', () => this.eventHandler(el[i]));
    };
  }

  // Event handler
  trigger(e, el){ return el.classList.contains(e); } // true if (el)ement contains e

  eventHandler(el){
    this.trigger('today', el) ? this.togglToday(el) : el;
    this.trigger('selected', el) ? this.togglSelect(el) : this.togglSelect(el);
  }

  // Events
  togglToday(el){ return this.trigger("selected", el) ? console.log(`goodbye`) : console.log(`hello`) };
  togglSelect(el){ return this.trigger("selected", el) ? el.classList.remove('selected') : el.classList.add('selected') };
}

