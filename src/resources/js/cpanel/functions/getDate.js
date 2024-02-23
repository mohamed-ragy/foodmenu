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
        },
        month_day_short:{
            restaurant:time.toLocaleString(TimeLang,{month: 'short', day: 'numeric',hour12 :hour12,timeZone:website.timeZone}),
            UTC:time.toLocaleString(TimeLang,{ month: 'short', day: 'numeric',hour12 :hour12,timeZone:'UTC'}),
            local:time.toLocaleString(TimeLang,{ month: 'short', day: 'numeric',hour12 :hour12}),
        },

    }
}
