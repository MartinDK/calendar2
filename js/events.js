function addEvents(selector) {
  const el = document.querySelectorAll(selector);

  for (let i = 0; i < el.length; i += 1) {
    el[i].addEventListener('click', eventHandler(this));
  };
}

// Event handler
function eventHandler(el) {
console.log(el);

  if (el.classList.contains('selected')) {
    el.classList.remove('selected');
  } else {
    el.classList.add('selected');
  };
}