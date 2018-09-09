// Create Events
function addEvents(selector) {
  const el = document.querySelectorAll(selector);

  for (let i = 0; i < el.length; i += 1) {
    el[i].addEventListener('click', () => eventHandler(el[i]));
  };
}

// Event handler
let eventContains = (e, el) => el.classList.contains(e);

let eventHandler = el => {
  let eState;
  eState = eventContains('today', el) ? togglToday(el) : el;
  eState = eventContains('selected', el) ? togglSelect(el) : togglSelect(el);

  return eState;
}

// Events
let togglToday = el => {
  return eventContains("selected", el) ? console.log(`goodbye`) : console.log(`hello`)
};
let togglSelect = el => {
  return eventContains("selected", el) ? el.classList.remove('selected') : el.classList.add('selected')
};