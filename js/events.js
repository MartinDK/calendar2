function addEvents(e) {
    for (let i = 0; i < e.length; i++) {
        e[i].addEventListener("click", function () {
            if (this.classList.contains("selected")) {
                this.classList.remove("selected");
            } else {
                this.classList.add("selected");
            };
        });
    };
}