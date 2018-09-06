// Learn how to create an ES16 list
function Calendar2() {
    // labels for the days of the week
    this.daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // months array in order
    this.monthsName = ['January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'December'];

    // the days of the week for each month, in order
    this.daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

}
Calendar2.prototype.getToday = function() {
    const today = new Date();
    const date = today.getDate();
    const day = this.daysOfWeek[today.getDay()];
    const ordinal = this.dateOrdinal(date);
    const month = this.monthsName[today.getMonth()];
    const year = today.getFullYear();
    return { date:date, day:day, ordinal:ordinal, month:month, year:year };
}
Calendar2.prototype.dateOrdinal = function (date) {

    // number ordinal labels
    numberOrdinal = {
        0: 'th',
        1: 'st',
        2: 'nd',
        3: 'rd',
        4: 'th',
        5: 'th',
        6: 'th',
        7: 'th',
        8: 'th',
        9: 'th'
    };

    let i;
    if (date >= 30) {
        i = date - 30;
    } else if (date >= 20) {
        i = date - 20;
    } else if (date >= 10) {
        i = date - 10;
    } else {
        i = date;
    }
    return numberOrdinal[i];
}
Calendar2.prototype.createMonthArray = (daysInMonth) => {
    // TODO: The month array will be used to store events
    let month = Array.apply(null, {length: daysInMonth}).map(Number.call, Number);
    month = month.map((x) => { return x+1 });
    return month
}
Calendar2.prototype.createMonthHTML = function(month, startWeekday) {
    
    let html = `<table class="calendar2 calendar-table"> <tbody ><tr><th colspan="10" > ${this.getToday().day} &nbsp;${this.getToday().date}<sup>th</sup>&nbsp;${this.getToday().month}&nbsp;${this.getToday().year}</th ></tr>`;
    html += `<tr class="calendar-header"><td class="calendar-header-day">Mon</td><td class="calendar-header-day">Tue</td><td class="calendar-header-day">Wed</td><td class="calendar-header-day">Thu</td><td class="calendar-header-day">Fri</td><td class="calendar-header-day">Sat</td><td class="calendar-header-day">Sun</td></tr><tr>`;
    
    let blanks = startWeekday;
    for (let i = 0; i < blanks; i++) {
        html += `<td></td>`
    }

    for (let i = 0; i < month.length; i++) {
        let day = month[i];
        let cell = blanks + day;
 
        if ( cell == 1 ) {
            html += `<td class="calendar-day">${day}</td>`;
        } else if ( cell % 7){
            html += `<td class="calendar-day">${day}</td>`;
        } else {
            html += `<td class="calendar-day">${day}</td></tr><tr>`;
        }
        
    }

    return html += "</table>";
}

