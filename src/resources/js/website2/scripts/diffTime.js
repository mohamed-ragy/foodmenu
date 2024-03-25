diffTime = (time) => {
    return '';
    let now;
    if(time == 'midnight'){
        now = new Date().toLocaleString('en-US', { timeZone: website.timeZone });
        time = new Date(new Date().toLocaleString('en-US', { timeZone: website.timeZone })).setHours(0,0,0,0);
    }else{
        time = time.replace(/T/g, " ");
        time = time.split('.')[0];
        time = Date.parse(time.replace(/-/g, "/"));
        now = new Date().toLocaleString('en-US', { timeZone: 'UTC' });
    }
    now = Date.parse(now);
        diff = now - time;
        min = 60000;
        hour = min * 60;
        day = hour * 24;
        month = day * 30;
        year = month * 12;

        if(diff < min){
            return diffTimeArr.lessThanMin;
        }
        else if(min < diff && diff < hour ){
            if(diff < ( min * 2 ) ){
                return  diffTimeArr.before+' ' + (Math.floor(diff/min) ) +' '+diffTimeArr.min + ' '+diffTimeArr.after;
            }else{
                return diffTimeArr.before+' ' + (Math.floor(diff/min) ) +' '+diffTimeArr.mins + ' '+diffTimeArr.after;
            }
        }
        else if(hour < diff && diff < day ){
            if(diff < ( hour * 2 ) ){
                return diffTimeArr.before+' ' + (Math.floor(diff/hour) ) +' '+diffTimeArr.hour + ' '+diffTimeArr.after;
            }else{
                return diffTimeArr.before+' ' + (Math.floor(diff/hour) ) +' '+diffTimeArr.hours + ' '+diffTimeArr.after;
            }
        }
        else if(day < diff && diff < month ){
            if(diff < ( day * 2 ) ){
                return diffTimeArr.before+' ' + (Math.floor(diff/day) ) +' '+diffTimeArr.day + ' '+diffTimeArr.after;
            }else{
                return diffTimeArr.before+' ' + (Math.floor(diff/day) ) +' '+diffTimeArr.days + ' '+diffTimeArr.after;
            }
        }
        else if(month < diff && diff < year ){
            if(diff < ( month * 2 ) ){
                return diffTimeArr.before+' ' + (Math.floor(diff/month) ) +' '+diffTimeArr.month + ' '+diffTimeArr.after;
            }else{
                return diffTimeArr.before+' ' + (Math.floor(diff/month) ) +' '+diffTimeArr.months + ' '+diffTimeArr.after;
            }
        }
        else if(year < diff ){
            if(diff < ( year * 2 ) ){
                return diffTimeArr.before+' ' + (Math.floor(diff/year) ) +' '+diffTimeArr.year + ' '+diffTimeArr.after;
            }else{
                return diffTimeArr.before+' ' + (Math.floor(diff/year) ) +' '+diffTimeArr.years + ' '+diffTimeArr.after;
            }
        }else{
            return '--';
        }
}
$('[diffTime]').each((i,elem) => {
    $(elem).text(diffTime($(elem).attr('diffTime')))
})
setInterval(() => {
    $('[diffTime]').each((i,elem) => {
        $(elem).text(diffTime($(elem).attr('diffTime')))
    })
},60000)
getDateAndTime = (timeStamp,modify='') => {
    try{String(timeStamp).includes(".000000Z") ? timeStamp = timeStamp.replace(/.000000Z/g, "") : timeStamp = timeStamp;}catch{timeStamp = timeStamp}
    try{String(timeStamp).includes(".") ? timeStamp = timeStamp.split('.')[0] : timeStamp = timeStamp;}catch{timeStamp = timeStamp}
    try{String(timeStamp).includes("T") ? timeStamp = timeStamp.replace(/T/g, " ") : timeStamp = timeStamp;}catch{timeStamp = timeStamp}
    try{String(timeStamp).includes("-") ? timeStamp = timeStamp.replace(/-/g, "/") : timeStamp = timeStamp;}catch{timeStamp = timeStamp}
    timeStamp == 'now' ? time = new Date(new Date().toLocaleString('en-US',{timeZone:website.timeZone})) : time = new Date(timeStamp+' UTC');
    website.hour12 ? hour12 = 1 : hour12 = 0;
    switch(modify){
        case 'noYear':format =  { weekday: 'long', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric',hour12 :hour12,};break;
        case 'onlyTime':format =  { hour:'numeric', minute:'numeric',hour12 :hour12,};break;
        case 'noTime':format =  { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour12 :hour12,};break;
        case 'onlyYear':format =  { year: 'numeric',hour12 :hour12,};break;
        case 'monthAndYear':format =  {year: 'numeric', month: 'long',hour12 :hour12,};break;
        case 'dayAndMonth':format =  { month: 'long', day: 'numeric',hour12 :hour12,};break;
        case 'dayAndMonthShort':format =  { month: 'short', day: 'numeric',hour12 :hour12,};break;
        case 'monthShort':format =  { month: 'short',hour12 :hour12,};break;
        case 'short':format =  { weekday: 'short', year:'numeric', month: 'short', day: 'numeric', hour:'numeric', minute:'numeric',hour12 :hour12,};break;
        case 'hour24':format =  {hour:'numeric',hour12 :0};break;
        case 'minutes':format =  {minute:'numeric',hour12 :0};break;
        case 'monthNum':format =  {month:'numeric',hour12 :0};break;
        case 'dayNum':format =  {day:'numeric',hour12 :0};break;
        case 'weekday':format =  {weekday:'long',hour12 :0};break;
        default:format =  { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric',hour12 :hour12,};
    }
    return time.toLocaleString(lang,format);
}
