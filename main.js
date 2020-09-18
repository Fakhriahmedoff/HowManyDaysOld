 function isLeapYear(year) {
    return !(year % 4 || !(year % 100) && year % 400);
}

function daysAlive(c_day, c_month, c_year, b_day, b_month, b_year) {
    var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var totalDays = 0;
    var excessMonths;
    for (var y = b_year + 1; y <= c_year; ++y) {
        if (isLeapYear(y)) totalDays += 366;
        else totalDays += 365;
    }
    if (c_month > b_month) {
        excessMonths = monthDays.slice(b_month - 1, c_month - 1);
        totalDays += eval(excessMonths.join('+'));
    } else if (c_month < b_month) {
        excessMonths = monthDays.slice(c_month - 1, b_month - 1);
        totalDays -= eval(excessMonths.join('+'));
    }
    totalDays += c_day - b_day;
    if (isLeapYear(b_year)) totalDays += 1;
    return totalDays;
}

function validateBirthday(birthday) {
    var today = new Date();
    var t_day = today.getDate();
    var t_month = today.getMonth() + 1;
    var t_year = today.getFullYear();
    var [year, month, day] = birthday.split('-').map(function (itm) {
        return parseInt(itm);
    });
    if (new Date(birthday) > today) {
        res_div.innerHTML = '';
        err_div.innerHTML = `You can't be born in the future!`;
    } else if (birthday === '') {
        res_div.innerHTML = '';
        err_div.innerHTML = `Please, fill in your birthday!`;
    }else if(year < 1900){
        res_div.innerHTML = '';
        err_div.innerHTML = `Please, Be honest!`;
    }
     else {
        var res = daysAlive(t_day, t_month, t_year, day, month, year);
        res_div.innerHTML = `You are ${res} days old as of today!`;
        err_div.innerHTML = '';
    }
}

function calculateDays(event) {
    event.preventDefault();
    var bd = document.getElementById('bd').value;
    validateBirthday(bd);
}

var b_form = document.getElementById('birthdayForm');
var res_div = document.getElementById('result');
var err_div = document.getElementById('error');

b_form.addEventListener('submit', calculateDays); 


