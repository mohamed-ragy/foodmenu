$('html,body').on('click',function(e){
    if($('.confirm-btn:hover').length == 0){
        $('.confirm-btn').each(function(){
            $(this).attr('tooltip',$(this).attr('tooltipTemp'))
        })
        $('.confirm-btn').removeClass('confirm-btn');
    }
})


///////////////////////////////////////////
window.coolDown = 0;
setInterval(()=>{
    window.coolDown = 0;
},15000)
coolDownChecker = function(){
    if(window.coolDown > 5){
        showAlert('warning',texts.cpanel.public.coolDown,4000,true);
        return false;
    }else{
        window.coolDown ++;
        return true;
    }
}
//////////////////inputlist///////////////////////
addToInputList = function(list,text,key){
    if(list.children().first().hasClass('inputListElementLoading1')){
        list.text('');
    }
    list.append(
        $('<div/>',{
            text:text,
            key:key,
            class:'inputListElement'
        }).append(
            $('<div/>',{class:`inputListElement_unsaved none`})
        )
    )
}
resetInputList = function(list){
    list.text('');
    list.append(
        $('<div/>',{class:'inputListElementLoading1'}),
        $('<div/>',{class:'inputListElementLoading2'}),
        $('<div/>',{class:'inputListElementLoading1'}),
        $('<div/>',{class:'inputListElementLoading2'}),
        $('<div/>',{class:'inputListElementLoading1'}),
        $('<div/>',{class:'inputListElementLoading2'}),
        $('<div/>',{class:'inputListElementLoading1'}),
        $('<div/>',{class:'inputListElementLoading2'}),
    )
}

////////////////history
pushHistory = function (push=true){
    let historyState = {};
    let historyUrl = '';
    for(const key in window.page){
        historyState[key] = window.page[key];
        if(historyUrl == ''){
            historyUrl = `/?${key}=${window.page[key]}`
        }else{
            historyUrl = `${historyUrl}&${key}=${window.page[key]}`
        }
    }
    for(const key in window.popupPage){
        historyState[key] = window.popupPage[key];
        historyUrl = `${historyUrl}&${key}=${window.popupPage[key]}`
    }
    for(const key in window.previewImg){
        historyState[key] = window.previewImg[key];
        historyUrl = `${historyUrl}&${key}=${window.previewImg[key]}`
    }
    if(push){
        window.history.pushState(historyState,'',historyUrl)
    }else{
        window.history.replaceState(historyState,'',historyUrl)
    }
}

/////////////////////
////////////////////////unsorted events/////////////////////////////////

loadWebsiteOrdersAndChats = function(callback=()=>{}){
    $('.loading_navIconNum').removeClass('none');
    window.waitFor_loadWebsiteOrdersAndChats = true;
    window.notificationsFirstLoad = false;
    window.notifications = [];
    $('#notificationsListConainer').text('')
    hideList($('#notificationsList'),$('#notifications'))
    /////
    window.getFirstChatsCheck = false;
    $('#liveChatMsgsListConainer').text('')
    $('#liveChatMsgsListConainer_guests').text('')
    hideList($('#liveChatMsgsList'),$('#liveChatMsgs'))
    /////
    window.incompleteOrdersCheck = false;
    /////////
    $('.ordersHomePageInfoLoading').removeClass('none');
    $('.ordersHomePageInfoIcon').addClass('none')

    $.ajax({
        url:'dashboard',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            FirstLoad:true,
        },
        success:function(response){
            $('.loading_navIconNum').addClass('none');
            ///////////
            for(const key in response.unSeenLiveChats){
                if(response.unSeenLiveChats[key].user_id){
                    window.unSeenChats_users.push(response.unSeenLiveChats[key].user_id);
                }else if(response.unSeenLiveChats[key].guest_id){
                    window.unSeenChats_guests.push(response.unSeenLiveChats[key].guest_id)
                }
            }

            ///////////////
            for(const key in response.incompleteOrders){
                website.incompleteOrders.push(
                    response.incompleteOrders[key]
                )
            }
            new orders().incompleteOrders();

            window.incompleteOrdersCheck = true;
            window.todayOrders = response.todayOrders;

            $('.ordersHomePageInfoLoading').addClass('none');
            $('.ordersHomePageInfoIcon').removeClass('none')

            drawTodayHomeOrders();


            window.pageNotifications.notifications = response.notifications;
            cpanelTitle(false);
        }
    }).done(function(){
        callback();
        window.waitFor_loadWebsiteOrdersAndChats = false;
    })

}




authorities = function(){
    if(account.is_master == false){
        $('.authority_master').hide();
    }
    if(account.authorities[0] == 0){
        $('.authority_0').hide();
    }
    if(account.authorities[1] == 0){
        $('.authority_1').hide();
    }
    if(account.authorities[2] == 0){
        $('.authority_2').hide();
    }
    if(account.authorities[3] == 0){
        $('.authority_3').hide();
    }
    if(account.authorities[4] == 0){
        $('.authority_4').hide();
    }
    if(account.authorities[5] == 0){
        $('.authority_5').hide();
    }
}
authorities();
////////////////
let titleAlertInterval;
cpanelTitle = function(titleAlert){
    window.unSeenChats_users = [...new Set(window.unSeenChats_users)];
    window.unSeenChats_guests = [...new Set(window.unSeenChats_guests)];
    window.pageNotifications.chat.users = window.unSeenChats_users.length;
    window.pageNotifications.chat.guests = window.unSeenChats_guests.length;
    window.pageNotifications.chat.users > 0 ? $('.liveChatTabIconUnseen').removeClass('none') : $('.liveChatTabIconUnseen').addClass('none')
    window.pageNotifications.chat.guests > 0 ? $('.liveChatTabIconUnseen_guests').removeClass('none') : $('.liveChatTabIconUnseen_guests').addClass('none')
    $('.liveChatMsgsNumber').text(parseInt(window.pageNotifications.chat.users) + parseInt(window.pageNotifications.chat.guests))
    parseInt(window.pageNotifications.chat.guests) + parseInt( window.pageNotifications.chat.users) > 0 ? $('.liveChatMsgsNumber').removeClass('none') : $('.liveChatMsgsNumber').addClass('none');

    window.pageNotifications.notifications > 0 ? $('#notificationsNumber').removeClass('none') : $('#notificationsNumber').addClass('none') ;
    $('#notificationsNumber').text(window.pageNotifications.notifications)

    let titleNumber = parseInt(window.pageNotifications.chat.guests) +
                        parseInt(window.pageNotifications.chat.users) +
                        parseInt(window.pageNotifications.notifications) +
                        parseInt(window.pageNotifications.orders.pending) +
                        parseInt(window.pageNotifications.orders.accepted) +
                        parseInt(window.pageNotifications.orders.withDelivery) +
                        parseInt(window.pageNotifications.orders.readyToPickup) +
                        parseInt(window.pageNotifications.orders.diningIn);


    let title;
    let titleNumberTxt = '';
    titleNumber > 0 ? titleNumberTxt = `(${titleNumber})`:null;

    try{
        if(typeof(window.history.state.popupPage) !== 'undefined' ){
            title = `${titleNumberTxt} ${texts.cpanel.menu[window.history.state.popupPage]} | ${texts.cpanel.public.cpanel}`;
        }else{
            title = `${titleNumberTxt} ${texts.cpanel.menu[window.history.state.page]} | ${texts.cpanel.public.cpanel}`;
        }
    }catch{
        title = `${texts.cpanel.public.cpanel}`;
    }
    if(titleAlert && document.hidden){
        clearInterval(titleAlertInterval)
        let titleMsgSwitch = 0;
        $('title').text(`${window.pageNotifications.titleAlert}`)
        titleAlertInterval = setInterval(() => {
            if(titleMsgSwitch == 0){
                titleMsgSwitch = 1;
                $('title').text(title);
            }else{
                titleMsgSwitch = 0;
                $('title').text(`${window.pageNotifications.titleAlert}`)
            }
        }, 1500);
    }else{
        $('title').text(title);
    }
}


$(window).focus(function(){
    clearInterval(titleAlertInterval);
    setTimeout(() => {
        cpanelTitle();
    }, 1500);
})



/////////////////////////////functions/////////////////////////
counterIntervals = [];
counter = function(div,number,prefix,after='',toFixed=0){
    let checkNumber ;
    let divnumber = parseFloat(div.text().replace(after, ''));
    if(divnumber > number){
        checkNumber =  divnumber - number;
    }else if(divnumber < number){
        checkNumber =  number - divnumber;
    }

    let addToNumber = checkNumber / 50

    clearInterval(counterIntervals[prefix]);

    if(divnumber > number){
        counterIntervals[prefix] = setInterval(function(){
            divnumber = divnumber - addToNumber;
            div.text(after+divnumber.toFixed(toFixed))
            if(divnumber <= number){
                div.text(after+number.toFixed(toFixed))
                clearInterval(counterIntervals[prefix]);
            }
        },50)
    }else if(divnumber < number){
        counterIntervals[prefix] = setInterval(function(){
            divnumber = divnumber + addToNumber;
            div.text(after+divnumber.toFixed(toFixed))
            if(divnumber >= number){
                div.text(after+number.toFixed(toFixed))
                clearInterval(counterIntervals[prefix]);
            }
        },50)
    }else{
        div.text(after+number.toFixed(toFixed))
    }
}

MultiLoginCheckANdAutoLogout = function(accountId){
    setInterval(function(){
        $.ajax({
            url:'notifications',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                lastSeen:true,
            }
        });
    },60000 * 5);
}
MultiLoginCheckANdAutoLogout();

ReloadForUpdate = function(){
    showAlert('warning',texts.cpanel.public.pageRefreshRequired1,100000000,true);
    setTimeout(function(){
        secondsToReload = 10;
        $('#updateRefreshRequiredContainer').text(texts.cpanel.public.pageRefreshRequired2+' '+secondsToReload+' '+texts.cpanel.public.pageRefreshRequired3);
        showPopup('updateRefreshRequired');
        setInterval(function(){
            $('#updateRefreshRequiredContainer').text(texts.cpanel.public.pageRefreshRequired2+' '+secondsToReload+' '+texts.cpanel.public.pageRefreshRequired3)
            secondsToReload = secondsToReload - 1;
            if(secondsToReload == 0){
                window.location.replace(window.location.pathname + window.location.search + window.location.hash);
            }
        },1000);
    },60000);
}
ReloadForUpdatePopup = function(){
    showPopup('updateRefreshRequired',function(){
        secondsToReload = 10;
        $('#updateRefreshRequiredContainer').text(texts.cpanel.public.pageRefreshRequired2+' '+secondsToReload+' '+texts.cpanel.public.pageRefreshRequired3);
        setInterval(function(){
            $('#updateRefreshRequiredContainer').text(texts.cpanel.public.pageRefreshRequired2+' '+secondsToReload+' '+texts.cpanel.public.pageRefreshRequired3)
            secondsToReload = secondsToReload - 1;
            if(secondsToReload == 0){
                window.location.replace(window.location.pathname + window.location.search + window.location.hash);
            }
        },1000);
    });

}
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
// getDateAndTime2 = function(timeStamp,modify=''){

//     if(String(timeStamp).includes(".000000Z")){timeStamp = timeStamp.replace(/.000000Z/g, "")}
//     if(String(timeStamp).includes(".")){timeStamp = timeStamp.split('.')[0];}
//     if(String(timeStamp).includes("T")){timeStamp = timeStamp.replace(/T/g, " ")}
//     if(String(timeStamp).includes("-")){timeStamp = timeStamp.replace(/-/g, "/")}
//     if(timeStamp == 'now'){
//         time = new Date(new Date().toLocaleString('en-US',{}));
//     }else{
//         time = new Date(timeStamp+' UTC');
//     }
//     TimeLang = account.language;
//     if(TimeLang == 'eg'){TimeLang = 'ar'}
//     if(website.hour12 == true){
//         hour12 = 1;
//     }else{
//         hour12 = 0;
//     }
//     if(modify == 'noYear'){
//         format =  { weekday: 'long', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric',hour12 :hour12,};
//     }else if(modify == 'onlyTime'){
//         format =  { hour:'numeric', minute:'numeric',hour12 :hour12,};
//     }else if(modify == 'noTime'){
//         format =  { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',hour12 :hour12,};
//     }else if(modify == 'onlyYear'){
//         format =  { year: 'numeric',hour12 :hour12,};
//     }else if(modify == 'monthAndYear'){
//         format =  {year: 'numeric', month: 'long',hour12 :hour12,};
//     }else if(modify == 'dayAndMonth'){
//         format =  { month: 'long', day: 'numeric',hour12 :hour12,};
//     }else if(modify == 'dayAndMonthShort'){
//         format =  { weekday: 'short',month: 'short', day: 'numeric',hour12 :hour12,};
//     }else if(modify == 'monthShort'){
//         format =  { month: 'short',hour12 :hour12,};
//     }else if(modify == 'short'){
//         format =  { weekday: 'short', year:'numeric', month: 'short', day: 'numeric', hour:'numeric', minute:'numeric',hour12 :hour12,};
//     }else if(modify == 'hour24'){
//         format =  {hour:'numeric',hour12 :0,};
//     }else if(modify == 'minutes'){
//         format =  {minute:'numeric',hour12 :0,};
//     }else if(modify == 'monthNum'){
//         format =  {month:'numeric',hour12 :0,};
//     }else if(modify == 'dayNum'){
//         format =  {day:'numeric',hour12 :0,};
//     }else if(modify == 'parse'){
//         return Date.parse(time);
//     }else if(modify == 'weekday'){
//         format =  {weekday:'long',hour12 :0,};
//     }else{
//         format =  { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric',hour12 :hour12,};
//     }
//     timeFinal = time.toLocaleString(TimeLang,format);
//     return timeFinal;
// }

scrollToDiv = function(container,div,animationTime=500,space=50){
    container.stop();
    container.animate({
        'scrollTop':div.offset().top - space - container.offset().top + container.scrollTop(),
    },500,'swing');
}
//////////////////////////////////////info window



//////////////
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
    $('.diffTimeCalc').each(function(){
        if($(this).is('[timeText]')){
            $(this).text($(this).attr('timeText')+' '+diffTime($(this).attr('time')))
        }else{
            $(this).text(diffTime($(this).attr('time')))
        }
    })
},1000)
