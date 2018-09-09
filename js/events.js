// Create Events
function addEvents(selector) {
  const el = document.querySelectorAll(selector);

  for (let i = 0; i < el.length; i += 1) {
    el[i].addEventListener('click', () => {
      eventHandler(el[i])
    });
  };
}

// Event handler
let eventHandler = (el) => {
  let elementState;
  elementState = el.classList.contains('today') ? todaySelected(el) : el;
  elementState = el.classList.contains('selected') ? toggleSelection(el) : toggleSelection(el);
  
  return elementState;
}

// Events

let todaySelected = el => { return el.classList.contains("selected") ? console.log(`goodbye`) : console.log(`hello`) };
let toggleSelection = el => { return el.classList.contains("selected") ? el.classList.remove('selected') : el.classList.add('selected') };