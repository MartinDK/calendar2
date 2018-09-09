// Create Events
let addEvents = selector => {
  const el = document.querySelectorAll(selector);

  for (let i = 0; i < el.length; i += 1) {
    el[i].addEventListener('click', () => eventHandler(el[i]));
  };
}

// Event handler
let eventAct = (e, el) => el.classList.contains(e);

let eventHandler = el => {
  let eState;
  eState = eventAct('today', el) ? togglToday(el) : el;
  eState = eventAct('selected', el) ? togglSelect(el) : togglSelect(el);

  return eState;
}

// Events
let togglToday = el => { return eventAct("selected", el) ? console.log(`goodbye`) : console.log(`hello`)} ;
let togglSelect = el => { return eventAct("selected", el) ? el.classList.remove('selected') : el.classList.add('selected')};