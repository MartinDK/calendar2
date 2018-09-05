// Learn how to create an ES16 list
function Calendar2() {
    // labels for the days of the week
    this.daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // months array in order
    this.monthsName = ['January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'December'];

    // the days of the week for each month, in order
    this.daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
}
Calendar2.prototype.createMonth = (daysInMonth) => {

    let month = Array.apply(null, {length: daysInMonth}).map(Number.call, Number);
    month = month.map((x) => { return x+1 });
    console.log(month);
    return month
}
Calendar2.prototype.htmlMonth = (month, startWeekday) => {
    
    let html = `<table class="calendar2 calendar table"> <tbody ><tr><th colspan = "7" > Wed &nbsp;5 <sup>th</sup>&nbsp;September&nbsp;2018</th ></tr>`;
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
            console.log(day);
        } else {
            html += `<td class="calendar-day">${day}</td></tr><tr>`;
        }
        
    }

    return html;
}

