
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
  trigger(e, el){ return el.classList.contains(e); } // true if (el)ement contains e

  eventHandler(el){
    this.trigger('today', el) ? this.togglToday(el) : el;
    this.trigger('selected', el) ? this.togglSelect(el) : this.togglSelect(el);
  }

  // Events
  togglToday(el){ return this.trigger("selected", el) ? console.log(`goodbye`) : console.log(`hello`) };
  togglSelect(el){ return this.trigger("selected", el) ? el.classList.remove('selected') : el.classList.add('selected') };
}
