function addEvents(selector) {
	let el = document.querySelectorAll(selector);

	for (let i = 0; i < el.length; i++) {
		el[i].addEventListener('click', function () {
			if (this.classList.contains('selected')) {
				this.classList.remove('selected');
			} else {
				this.classList.add('selected');
			}
		});
	}
}
