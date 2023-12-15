diffTime = (time) => {
    let now;
    if(time == 'midnight'){
        time = parseInt(new Date(new Date().toLocaleString('en-US', { timeZone: website.timeZone })).setHours(0,0,0,0) ) / 1000;
    }
    now = parseInt(parseInt(new Date().getTime()) / 1000);
    diff = now - time;
    min = 60;
    hour = min * 60;
    day = hour * 24;
    month = day * 30;
    year = month * 12;

    if(diff < min){
        return texts.cpanel.diffTime.lessThanMin;
    }
    else if(min < diff && diff < hour ){
        if(diff < ( min * 2 ) ){
            return  texts.cpanel.diffTime.before+' ' + (Math.floor(diff/min) ) +' '+texts.cpanel.diffTime.min + ' '+texts.cpanel.diffTime.after;
        }else{
            return texts.cpanel.diffTime.before+' ' + (Math.floor(diff/min) ) +' '+texts.cpanel.diffTime.mins + ' '+texts.cpanel.diffTime.after;
        }
    }
    else if(hour < diff && diff < day ){
        if(diff < ( hour * 2 ) ){
            return texts.cpanel.diffTime.before+' ' + (Math.floor(diff/hour) ) +' '+texts.cpanel.diffTime.hour + ' '+texts.cpanel.diffTime.after;
        }else{
            return texts.cpanel.diffTime.before+' ' + (Math.floor(diff/hour) ) +' '+texts.cpanel.diffTime.hours + ' '+texts.cpanel.diffTime.after;
        }
    }
    else if(day < diff && diff < month ){
        if(diff < ( day * 2 ) ){
            return texts.cpanel.diffTime.before+' ' + (Math.floor(diff/day) ) +' '+texts.cpanel.diffTime.day + ' '+texts.cpanel.diffTime.after;
        }else{
            return texts.cpanel.diffTime.before+' ' + (Math.floor(diff/day) ) +' '+texts.cpanel.diffTime.days + ' '+texts.cpanel.diffTime.after;
        }
    }
    else if(month < diff && diff < year ){
        if(diff < ( month * 2 ) ){
            return texts.cpanel.diffTime.before+' ' + (Math.floor(diff/month) ) +' '+texts.cpanel.diffTime.month + ' '+texts.cpanel.diffTime.after;
        }else{
            return texts.cpanel.diffTime.before+' ' + (Math.floor(diff/month) ) +' '+texts.cpanel.diffTime.months + ' '+texts.cpanel.diffTime.after;
        }
    }
    else if(year < diff ){
        if(diff < ( year * 2 ) ){
            return texts.cpanel.diffTime.before+' ' + (Math.floor(diff/year) ) +' '+texts.cpanel.diffTime.year + ' '+texts.cpanel.diffTime.after;
        }else{
            return texts.cpanel.diffTime.before+' ' + (Math.floor(diff/year) ) +' '+texts.cpanel.diffTime.years + ' '+texts.cpanel.diffTime.after;
        }
    }else{
        return '--';
    }
}
setInterval(function(){
    resendEmailVerifycodeBtnTimer();
    resendPhoneVerifycodeBtnTimer();
    $('.diffTimeCalc').each(function(){
        $(this).find('.cardLoading').remove();
        if($(this).is('[timeText]')){
            $(this).text($(this).attr('timeText')+' '+diffTime($(this).attr('time')))
        }else{
            $(this).text(diffTime($(this).attr('time')))
        }
    })
},1000)
