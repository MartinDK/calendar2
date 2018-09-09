
class Events {

  static createEvents() {
    let ev = new Events;
    ev.addEvents('.calendar2 td.calendar-day');
  }

  // Create Events
  addEvents(selector) {
    const el = document.querySelectorAll(selector);

    for (let i = 0; i < el.length; i += 1) {
      el[i].addEventListener('click', () => this.eventHandler(el[i]));
    };
  }

  // Event handler
  eventFilter(e, el){ return el.classList.contains(e); }

  eventHandler(el){
    let eState;
    eState = this.eventFilter('today', el) ? this.togglToday(el) : el;
    eState = this.eventFilter('selected', el) ? this.togglSelect(el) : this.togglSelect(el);

    return eState;
  }

  // Events
  togglToday(el){ return this.eventFilter("selected", el) ? console.log(`goodbye`) : console.log(`hello`) };
  togglSelect(el){ return this.eventFilter("selected", el) ? el.classList.remove('selected') : el.classList.add('selected') };

}
