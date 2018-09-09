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

  if (el.classList.contains('today')) { return selectToday(el);
  
  }
  if (el.classList.contains('selected')) {

    return el.classList.remove('selected');

  } else {

    return el.classList.add('selected');

  };
}

// Events
let toggleSelection = el => {

}
let selectToday = el => { 
  if (el.classList.contains('selected')) {
    console.log(`goodbye`);
    return el.classList.remove('selected')
  } else {
    console.log(`hello`);
    return el.classList.add('selected')
    
  }
}