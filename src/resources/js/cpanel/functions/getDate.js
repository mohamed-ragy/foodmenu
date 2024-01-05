getDate = function(timeStamp){
    let time;
    timeStamp == 'now' ? time = new Date() : time = new Date(timeStamp * 1000);
    let TimeLang = account.language;
    let hour12;
    website.hour12 ? hour12 = 1 : hour12 = 0;
    return {
        date:{
            restaurant:time.toLocaleString(TimeLang,{ year: 'numeric', month: 'short', day: 'numeric',hour12 :hour12,timeZone:website.timeZone}),
            UTC:time.toLocaleString(TimeLang,{ year: 'numeric', month: 'short', day: 'numeric',hour12 :hour12,timeZone:'UTC'}),
            local:time.toLocaleString(TimeLang,{ year: 'numeric', month: 'short', day: 'numeric',hour12 :hour12}),
        },
        date_time:{
            restaurant:time.toLocaleString(TimeLang,{ year: 'numeric', month: 'short', day: 'numeric',hour:'numeric', minute:'numeric',hour12 :hour12,timeZone:website.timeZone}),
            UTC:time.toLocaleString(TimeLang,{ year: 'numeric', month: 'short', day: 'numeric',hour:'numeric', minute:'numeric',hour12 :hour12,timeZone:'UTC'}),
            local:time.toLocaleString(TimeLang,{ year: 'numeric', month: 'short', day: 'numeric',hour:'numeric', minute:'numeric',hour12 :hour12}),
        },
        date_time_weekday:{
            restaurant:time.toLocaleString(TimeLang,{ weekday:'short', year: 'numeric', month: 'short', day: 'numeric',hour:'numeric', minute:'numeric',hour12 :hour12,timeZone:website.timeZone}),
            UTC:time.toLocaleString(TimeLang,{ weekday:'short', year: 'numeric', month: 'short', day: 'numeric',hour:'numeric', minute:'numeric',hour12 :hour12,timeZone:'UTC'}),
            local:time.toLocaleString(TimeLang,{ weekday:'short', year: 'numeric', month: 'short', day: 'numeric',hour:'numeric', minute:'numeric',hour12 :hour12}),
        },
        year:{
            restaurant:time.toLocaleString(TimeLang,{ year: 'numeric',hour12 :hour12,timeZone:website.timeZone}),
            UTC:time.toLocaleString(TimeLang,{ year: 'numeric',hour12 :hour12,timeZone:'UTC'}),
            local:time.toLocaleString(TimeLang,{ year: 'numeric',hour12 :hour12}),
        },
        month_num:{
            restaurant:time.toLocaleString(TimeLang,{ month: 'numeric',hour12 :hour12,timeZone:website.timeZone}),
            UTC:time.toLocaleString(TimeLang,{ month: 'numeric',hour12 :hour12,timeZone:'UTC'}),
            local:time.toLocaleString(TimeLang,{ month: 'numeric',hour12 :hour12}),
        },
        month_short:{
            restaurant:time.toLocaleString(TimeLang,{ month: 'short',hour12 :hour12,timeZone:website.timeZone}),
            UTC:time.toLocaleString(TimeLang,{ month: 'short',hour12 :hour12,timeZone:'UTC'}),
            local:time.toLocaleString(TimeLang,{ month: 'short',hour12 :hour12}),
        },
        month_long:{
            restaurant:time.toLocaleString(TimeLang,{ month: 'long',hour12 :hour12,timeZone:website.timeZone}),
            UTC:time.toLocaleString(TimeLang,{ month: 'long',hour12 :hour12,timeZone:'UTC'}),
            local:time.toLocaleString(TimeLang,{ month: 'long',hour12 :hour12}),
        },
        day_num:{
            restaurant:time.toLocaleString(TimeLang,{ day: 'numeric',hour12 :hour12,timeZone:website.timeZone}),
            UTC:time.toLocaleString(TimeLang,{ day: 'numeric',hour12 :hour12,timeZone:'UTC'}),
            local:time.toLocaleString(TimeLang,{ day: 'numeric',hour12 :hour12}),
        },
        weekday_short:{
            restaurant:time.toLocaleString(TimeLang,{ weekday: 'short',hour12 :hour12,timeZone:website.timeZone}),
            UTC:time.toLocaleString(TimeLang,{ weekday: 'short',hour12 :hour12,timeZone:'UTC'}),
            local:time.toLocaleString(TimeLang,{ weekday: 'short',hour12 :hour12}),
        },
        weekday_long:{
            restaurant:time.toLocaleString(TimeLang,{ weekday: 'long',hour12 :hour12,timeZone:website.timeZone}),
            UTC:time.toLocaleString(TimeLang,{ weekday: 'long',hour12 :hour12,timeZone:'UTC'}),
            local:time.toLocaleString(TimeLang,{ weekday: 'long',hour12 :hour12}),
        },
        time:{
            restaurant:time.toLocaleString(TimeLang,{ hour:'numeric', minute:'numeric',hour12 :hour12,timeZone:website.timeZone}),
            UTC:time.toLocaleString(TimeLang,{ hour:'numeric', minute:'numeric',hour12 :hour12,timeZone:'UTC'}),
            local:time.toLocaleString(TimeLang,{ hour:'numeric', minute:'numeric',hour12 :hour12}),
        },
        month_year:{
            restaurant:time.toLocaleString(TimeLang,{ month: 'short',year: 'numeric',hour12 :hour12,timeZone:website.timeZone}),
            UTC:time.toLocaleString(TimeLang,{ month: 'short',year: 'numeric',hour12 :hour12,timeZone:'UTC'}),
            local:time.toLocaleString(TimeLang,{ month: 'short',year: 'numeric',hour12 :hour12}),
        }

    }
}
getDateAndTime = function(timeStamp,modify=''){
    return '';
    if(timeStamp == 'now'){
        time = new Date(new Date().toLocaleString('en-US',{timeZone:website.timeZone}));
    }else{
        time = new Date(timeStamp * 1000);
    }
    TimeLang = account.language;
    if(TimeLang == 'eg'){TimeLang = 'ar'}
    if(website.hour12 == true){
        hour12 = 1;
    }else{
        hour12 = 0;
    }
    if(modify == 'noYear'){
        format =  { weekday: 'long', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric',hour12 :hour12,timeZone:website.timeZone};
    }else if(modify == 'onlyTime'){
        format =  { hour:'numeric', minute:'numeric',hour12 :hour12,timeZone:website.timeZone};
    }else if(modify == 'noTime'){
        format =  { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',hour12 :hour12,timeZone:website.timeZone};
    }else if(modify == 'noTimeNoWeekDay'){
        format =  { year: 'numeric', month: 'short', day: 'numeric',hour12 :hour12,timeZone:website.timeZone};
    }else if(modify == 'onlyYear'){
        format =  { year: 'numeric',hour12 :hour12,timeZone:website.timeZone};
    }else if(modify == 'monthAndYear'){
        format =  {year: 'numeric', month: 'long',hour12 :hour12,timeZone:website.timeZone};
    }else if(modify == 'dayAndMonth'){
        format =  { month: 'long', day: 'numeric',hour12 :hour12,timeZone:website.timeZone};
    }else if(modify == 'dayAndMonthShort'){
        format =  { weekday: 'short',month: 'short', day: 'numeric',hour12 :hour12,timeZone:website.timeZone};
    }else if(modify == 'monthShort'){
        format =  { month: 'short',hour12 :hour12,timeZone:website.timeZone};
    }else if(modify == 'short'){
        format =  { weekday: 'short', year:'numeric', month: 'short', day: 'numeric', hour:'numeric', minute:'numeric',hour12 :hour12,timeZone:website.timeZone};
    }else if(modify == 'hour24'){
        format =  {hour:'numeric',hour12 :0,timeZone:website.timeZone};
    }else if(modify == 'minutes'){
        format =  {minute:'numeric',hour12 :0,timeZone:website.timeZone};
    }else if(modify == 'monthNum'){
        format =  {month:'numeric',hour12 :0,timeZone:website.timeZone};
    }else if(modify == 'dayNum'){
        format =  {day:'numeric',hour12 :0,timeZone:website.timeZone};
    }else if(modify == 'parse'){
        return Date.parse(time);
    }else if(modify == 'weekday'){
        format =  {weekday:'long',hour12 :0,timeZone:website.timeZone};
    }else{
        format =  { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric',hour12 :hour12,timeZone:website.timeZone};
    }
    timeFinal = time.toLocaleString(TimeLang,format);
    return timeFinal;
}
