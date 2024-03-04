datePicker = function (Cmonth,Cyear,nextPrev,selectPeriod){
    Cmonth = parseInt(Cmonth);
    cyear = parseInt(Cyear);
    year = Cyear;
    if(selectPeriod == 'month'){
        if(nextPrev == 1 ){
            if(Cmonth == 12){
                getMonth = 0;
                year = Cyear + 1;
            }else{
                getMonth = Cmonth;
            }
        }else if(nextPrev == 0 ){
            if(Cmonth == 1){
                getMonth = 11;
                year = Cyear - 1;
            }else{
                getMonth = Cmonth - 2;
            }
        }else if(nextPrev == 2 ){
            getMonth = Cmonth - 1;
        }
        return{
            monthName : [texts.cpanel.public.January,texts.cpanel.public.February,texts.cpanel.public.March,texts.cpanel.public.April,texts.cpanel.public.May,texts.cpanel.public.June,texts.cpanel.public.July,texts.cpanel.public.August,texts.cpanel.public.September,texts.cpanel.public.October,texts.cpanel.public.November,texts.cpanel.public.December][getMonth],
            month : getMonth + 1,
            year : year,
            firstDayWeek :new Date(year,getMonth,1).getDay(),
            monthDays:new Date(year,(getMonth + 1),0).getDate(),
        }
    }else if(selectPeriod == 'year'){
        if(nextPrev == 1){
            year = year + 1;
        }else if(nextPrev == 0){
            year = year - 1;
        }else if(nextPrev == 2){
            year = year;
        }
        return{
            monthName : [texts.cpanel.public.January,texts.cpanel.public.February,texts.cpanel.public.March,texts.cpanel.public.April,texts.cpanel.public.May,texts.cpanel.public.June,texts.cpanel.public.July,texts.cpanel.public.August,texts.cpanel.public.September,texts.cpanel.public.October,texts.cpanel.public.November,texts.cpanel.public.December][Cmonth - 1],
            month : Cmonth,
            year : year,
            firstDayWeek :new Date(year,Cmonth,1).getDay(),
            monthDays:new Date(year,(Cmonth + 1),0).getDate(),
        }
    }


}
datePickerCalcDateAndTime = function(timeStamp,modify=''){

    if(String(timeStamp).includes(".000000Z")){timeStamp = timeStamp.replace(/.000000Z/g, "")}
    if(String(timeStamp).includes(".")){timeStamp = timeStamp.split('.')[0];}
    if(String(timeStamp).includes("T")){timeStamp = timeStamp.replace(/T/g, " ")}
    if(String(timeStamp).includes("-")){timeStamp = timeStamp.replace(/-/g, "/")}
    if(timeStamp == 'now'){
        time = new Date(new Date().toLocaleString('en-US',{timeZone:website.timeZone}));
    }else{
        time = new Date(timeStamp+' UTC');
    }
    TimeLang = account.language;
    if(website.hour12 == true){
        hour12 = 1;
    }else{
        hour12 = 0;
    }
    if(modify == 'noYear'){
        format =  { weekday: 'long', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric',hour12 :hour12};
    }else if(modify == 'onlyTime'){
        format =  { hour:'numeric', minute:'numeric',hour12 :hour12,};
    }else if(modify == 'noTime'){
        format =  { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',hour12 :hour12,};
    }else if(modify == 'onlyYear'){
        format =  { year: 'numeric',hour12 :hour12,};
    }else if(modify == 'monthAndYear'){
        format =  {year: 'numeric', month: 'long',hour12 :hour12,};
    }else if(modify == 'dayAndMonth'){
        format =  { month: 'long', day: 'numeric',hour12 :hour12,};
    }else if(modify == 'dayAndMonthShort'){
        format =  { month: 'short', day: 'numeric',hour12 :hour12,};
    }else if(modify == 'monthShort'){
        format =  { month: 'short',hour12 :hour12,};
    }else if(modify == 'short'){
        format =  { weekday: 'short', year:'numeric', month: 'short', day: 'numeric', hour:'numeric', minute:'numeric',hour12 :hour12,};
    }else if(modify == 'hour24'){
        format =  {hour:'numeric',hour12 :0,};
    }else if(modify == 'minutes'){
        format =  {minute:'numeric',hour12 :0,};
    }else if(modify == 'monthNum'){
        format =  {month:'numeric',hour12 :0,};
    }else if(modify == 'dayNum'){
        format =  {day:'numeric',hour12 :0,};
    }else if(modify == 'parse'){
        return Date.parse(time);
    }else if(modify == 'weekday'){
        format =  {weekday:'long',hour12 :0,};
    }else{
        format =  { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric',hour12 :hour12,};
    }
    timeFinal = time.toLocaleString(TimeLang,format);
    return timeFinal;
}

setdatePicker = function(datePickerContainer,year,month,day){
    if(datePickerContainer.attr('selectPeriod') == 'year'){
        datePickerContainer.find('.datePickerYear').attr('year',datePicker(month,year,2,'year').year);
        datePickerContainer.find('.datePickerYear').text(datePicker(month,year,2,'year').year);
        datePickerContainer.find('.datePickerMonth').attr('month',datePicker(month,year,2,'year').month);
        datePickerContainer.find('.datePickerMonth').text(datePicker(month,year,2,'year').monthName);
    }else if(datePickerContainer.attr('selectPeriod') == 'month'){
        datePickerContainer.find('.datePickerYear').attr('year',datePicker(month,year,2,'month').year);
        datePickerContainer.find('.datePickerYear').text(datePicker(month,year,2,'month').year);
        datePickerContainer.find('.datePickerMonth').attr('month',datePicker(month,year,2,'month').month);
        datePickerContainer.find('.datePickerMonth').text(datePicker(month,year,2,'month').monthName);
    }
    let now = new Date();
    now.setHours(0,0,0,0);
    datePickerContainer.find('.datePickerDay').each(function(){
        $(this).removeClass('datePickerDayDump');
        $(this).removeClass('datePickerSelectedDay');
        $(this).removeClass('datePickerDayNoSelect');
        $(this).text(parseInt($(this).attr('dayNum')) - datePicker(month,year,2,'month').firstDayWeek);
        if(parseInt($(this).text()) < 1){
            $(this).text('');
            $(this).addClass('datePickerDayDump');
        }

        if(parseInt($(this).text()) > datePicker(month,year,2,'month').monthDays){
            $(this).text('');
            $(this).addClass('datePickerDayDump');
        }

        if($(this).attr('dayNum') - datePicker(month,year,2,'month').firstDayWeek == day){
            $(this).addClass('datePickerSelectedDay')
            $(this).trigger('click');
        }
        if(datePickerContainer.attr('datePickerType') == 'future'){
            if($(this).parent().parent().parent().attr('todayActive') == 1){
                if(Date.parse(now) > Date.parse(new Date(parseInt($(this).parent().parent().parent().find('.datePickerYear').attr('year')),(parseInt($(this).parent().parent().parent().find('.datePickerMonth').attr('month')) - 1),$(this).text()))){$(this).addClass('datePickerDayNoSelect')}
            }else if($(this).parent().parent().parent().attr('todayActive') == 0){
                if((Date.parse(now) + 86400000) > Date.parse(new Date(parseInt($(this).parent().parent().parent().find('.datePickerYear').attr('year')),(parseInt($(this).parent().parent().parent().find('.datePickerMonth').attr('month')) - 1),$(this).text()))){$(this).addClass('datePickerDayNoSelect')}
            }
        }else{
            if($(this).parent().parent().parent().attr('todayActive') == 1){
                if(Date.parse(now) < Date.parse(new Date(parseInt($(this).parent().parent().parent().find('.datePickerYear').attr('year')),(parseInt($(this).parent().parent().parent().find('.datePickerMonth').attr('month')) - 1),$(this).text()))){$(this).addClass('datePickerDayNoSelect')}
            }else if($(this).parent().parent().parent().attr('todayActive') == 0){
                if((Date.parse(now) - 86400000) < Date.parse(new Date(parseInt($(this).parent().parent().parent().find('.datePickerYear').attr('year')),(parseInt($(this).parent().parent().parent().find('.datePickerMonth').attr('month')) - 1),$(this).text()))){$(this).addClass('datePickerDayNoSelect')}
            }
        }
    });
}

drawdatePicker = function(datePickerContainer,firstLoad=false){
    if(datePickerContainer.attr('datePickerType') == 'future'){
        if(datePickerContainer.attr('todayActive') == 1){
            datePickerContainer.find('.datePickerMonth').text([texts.cpanel.public.January,texts.cpanel.public.February,texts.cpanel.public.March,texts.cpanel.public.April,texts.cpanel.public.May,texts.cpanel.public.June,texts.cpanel.public.July,texts.cpanel.public.August,texts.cpanel.public.September,texts.cpanel.public.October,texts.cpanel.public.November,texts.cpanel.public.December][new Date().getMonth()])
            datePickerContainer.find('.datePickerMonth').attr('month',parseInt(new Date().getMonth()) + 1);
            datePickerContainer.find('.datePickerYear').text(new Date().getFullYear())
            datePickerContainer.find('.datePickerYear').attr('year',new Date().getFullYear());
        }else{
            let tomorrow = new Date(Date.parse(new Date()) + 86400000);
            tomorrow.setHours(0,0,0,0);
            datePickerContainer.find('.datePickerMonth').text([texts.cpanel.public.January,texts.cpanel.public.February,texts.cpanel.public.March,texts.cpanel.public.April,texts.cpanel.public.May,texts.cpanel.public.June,texts.cpanel.public.July,texts.cpanel.public.August,texts.cpanel.public.September,texts.cpanel.public.October,texts.cpanel.public.November,texts.cpanel.public.December][tomorrow.getMonth()])
            datePickerContainer.find('.datePickerMonth').attr('month',parseInt(tomorrow.getMonth() + 1));
            datePickerContainer.find('.datePickerYear').text(tomorrow.getFullYear())
            datePickerContainer.find('.datePickerYear').attr('year',tomorrow.getFullYear());
        }
    }else{
        if(datePickerContainer.attr('todayActive') == 1){
            datePickerContainer.find('.datePickerMonth').text([texts.cpanel.public.January,texts.cpanel.public.February,texts.cpanel.public.March,texts.cpanel.public.April,texts.cpanel.public.May,texts.cpanel.public.June,texts.cpanel.public.July,texts.cpanel.public.August,texts.cpanel.public.September,texts.cpanel.public.October,texts.cpanel.public.November,texts.cpanel.public.December][new Date().getMonth()])
            datePickerContainer.find('.datePickerMonth').attr('month',parseInt(new Date().getMonth()) + 1);
            datePickerContainer.find('.datePickerYear').text(new Date().getFullYear())
            datePickerContainer.find('.datePickerYear').attr('year',new Date().getFullYear());
        }else{
            let yesterday = new Date(Date.parse(new Date()) - 86400000);
            yesterday.setHours(0,0,0,0);
            datePickerContainer.find('.datePickerMonth').text([texts.cpanel.public.January,texts.cpanel.public.February,texts.cpanel.public.March,texts.cpanel.public.April,texts.cpanel.public.May,texts.cpanel.public.June,texts.cpanel.public.July,texts.cpanel.public.August,texts.cpanel.public.September,texts.cpanel.public.October,texts.cpanel.public.November,texts.cpanel.public.December][yesterday.getMonth()])
            datePickerContainer.find('.datePickerMonth').attr('month',parseInt(yesterday.getMonth() + 1));
            datePickerContainer.find('.datePickerYear').text(yesterday.getFullYear())
            datePickerContainer.find('.datePickerYear').attr('year',yesterday.getFullYear());
        }
    }

    let selectedYear = parseInt(datePickerContainer.find('.datePickerYear').attr('year'));
    let selectedMonth = parseInt(datePickerContainer.find('.datePickerMonth').attr('month'));
    let now = new Date();
    now.setHours(0,0,0,0);

    if(datePickerContainer.attr('selectPeriod') == 'year'){datePickerContainer.find('.datePickerDaysContainer').hide();datePickerContainer.find('.datePickerMonth').hide();}

    if(datePickerContainer.attr('datePickerType') == 'future'){
        datePickerContainer.find('.datePickerDay').each(function(){
            $(this).text(parseInt($(this).attr('dayNum')) - datePicker((selectedMonth),(selectedYear),2,'month').firstDayWeek);

            $(this).removeClass('datePickerDayDump');
            $(this).removeClass('datePickerDayNoSelect');
            $(this).removeClass('datePickerSelectedDay');
            if(parseInt($(this).text()) < 1){
                $(this).text('');
                $(this).addClass('datePickerDayDump');
            }
            if(parseInt($(this).text()) > datePicker((selectedMonth),(selectedYear),2,'month').monthDays){
                $(this).text('');
                $(this).addClass('datePickerDayDump');
            }
            if($(this).parent().parent().parent().attr('todayActive') == 1){
                if(Date.parse(now) > Date.parse(new Date(parseInt($(this).parent().parent().parent().find('.datePickerYear').attr('year')),(parseInt($(this).parent().parent().parent().find('.datePickerMonth').attr('month')) - 1),$(this).text()))){$(this).addClass('datePickerDayNoSelect')}
                if(firstLoad){
                    if(parseInt($(this).attr('dayNum')) - datePicker((selectedMonth),(selectedYear),2,'month').firstDayWeek == parseInt(new Date().getDate())){
                        $(this).addClass('datePickerSelectedDay');
                    }
                }else{
                    if($(this).text() == 1){$(this).addClass('datePickerSelectedDay')}
                }

            }else if($(this).parent().parent().parent().attr('todayActive') == 0){
                if((Date.parse(now) + 86400000) > Date.parse(new Date(parseInt($(this).parent().parent().parent().find('.datePickerYear').attr('year')),(parseInt($(this).parent().parent().parent().find('.datePickerMonth').attr('month')) - 1),$(this).text()))){$(this).addClass('datePickerDayNoSelect')}
                if(firstLoad){
                    // console.log(parseInt(new Date(new Date()).getDate()))
                    if(parseInt($(this).attr('dayNum')) - datePicker((selectedMonth),(selectedYear),2,'month').firstDayWeek == parseInt(new Date(new Date()).getDate()) + 1){
                        $(this).addClass('datePickerSelectedDay');
                    }
                }else{
                    if($(this).text() == 1){$(this).addClass('datePickerSelectedDay')}
                }

            }

        })
        if(datePickerContainer.attr('selectBy') == 'day'){
            datePickerContainer.find('.datePickerDaysContainer').css('display','flex');
            datePickerContainer.find('.datePickerMonth').show();
            datePickerContainer.find('.datePickerYear').css('margin-top','1em');
            datePickerContainer.attr('selectPeriod','month');

            $('.datePickerSelectedDateContainer[datePickerContainer="'+datePickerContainer.attr('id')+'"]').find('.datePickerSelectedDate').text(
                datePickerCalcDateAndTime(new Date(datePickerContainer.find('.datePickerYear').attr('year'),datePickerContainer.find('.datePickerMonth').attr('month') - 1,datePickerContainer.find('.datePickerSelectedDay').text() ).toISOString(),'noTime')
            )
        }else if(datePickerContainer.attr('selectBy') == 'month'){
            datePickerContainer.find('.datePickerDaysContainer').hide();
            datePickerContainer.find('.datePickerMonth').show();
            datePickerContainer.find('.datePickerYear').css('margin-top','1em');
            datePickerContainer.attr('selectPeriod','month');
            $('.datePickerSelectedDateContainer[datePickerContainer="'+datePickerContainer.attr('id')+'"]').find('.datePickerSelectedDate').text(
                datePickerCalcDateAndTime(new Date(datePickerContainer.find('.datePickerYear').attr('year'),datePickerContainer.find('.datePickerMonth').attr('month') - 1,datePickerContainer.find('.datePickerSelectedDay').text()).toISOString(),'monthAndYear')
            )

        }else if(datePickerContainer.attr('selectBy') == 'year'){
            datePickerContainer.find('.datePickerDaysContainer').hide();
            datePickerContainer.find('.datePickerMonth').hide();
            datePickerContainer.find('.datePickerYear').css('margin-top',0);
            datePickerContainer.attr('selectPeriod','year');
            $('.datePickerSelectedDateContainer[datePickerContainer="'+datePickerContainer.attr('id')+'"]').find('.datePickerSelectedDate').text(
                datePickerCalcDateAndTime(new Date(datePickerContainer.find('.datePickerYear').attr('year'),datePickerContainer.find('.datePickerMonth').attr('month') - 1,datePickerContainer.find('.datePickerSelectedDay').text()).toISOString(),'onlyYear')
            )
        }
        if(datePickerContainer.find('.datePickerSelectedDay').hasClass('datePickerDayNoSelect')){datePickerContainer.find('.datePickerSelectedDay').removeClass('datePickerSelectedDay')}
    }else{
        datePickerContainer.find('.datePickerDay').each(function(){
            $(this).text(parseInt($(this).attr('dayNum')) - datePicker((selectedMonth),(selectedYear),2,'month').firstDayWeek);
            $(this).removeClass('datePickerDayDump');
            $(this).removeClass('datePickerDayNoSelect');
            $(this).removeClass('datePickerSelectedDay');
            if(parseInt($(this).text()) < 1){
                $(this).text('');
                $(this).addClass('datePickerDayDump');
            }
            if(parseInt($(this).text()) > datePicker((selectedMonth),(selectedYear),2,'month').monthDays){
                $(this).text('');
                $(this).addClass('datePickerDayDump');
            }
            if($(this).parent().parent().parent().attr('todayActive') == 1){
                if(Date.parse(now) < Date.parse(new Date(parseInt($(this).parent().parent().parent().find('.datePickerYear').attr('year')),(parseInt($(this).parent().parent().parent().find('.datePickerMonth').attr('month')) - 1),$(this).text()))){$(this).addClass('datePickerDayNoSelect')}
                if(firstLoad){
                    if(parseInt($(this).attr('dayNum')) - datePicker((selectedMonth),(selectedYear),2,'month').firstDayWeek == parseInt(new Date().getDate())){
                        $(this).addClass('datePickerSelectedDay');
                    }
                }else{
                    if($(this).text() == 1){$(this).addClass('datePickerSelectedDay')}
                }

            }else if($(this).parent().parent().parent().attr('todayActive') == 0){
                if((Date.parse(now) - 86400000) < Date.parse(new Date(parseInt($(this).parent().parent().parent().find('.datePickerYear').attr('year')),(parseInt($(this).parent().parent().parent().find('.datePickerMonth').attr('month')) - 1),$(this).text()))){$(this).addClass('datePickerDayNoSelect')}
                if(firstLoad){
                    if(parseInt($(this).attr('dayNum')) - datePicker((selectedMonth),(selectedYear),2,'month').firstDayWeek == parseInt(new Date(Date.parse(new Date()) - 86400000).getDate())){
                        $(this).addClass('datePickerSelectedDay');
                    }
                }else{
                    if($(this).text() == 1){$(this).addClass('datePickerSelectedDay')}
                }

            }

        })
        if(datePickerContainer.attr('selectBy') == 'day'){
            datePickerContainer.find('.datePickerDaysContainer').css('display','flex');
            datePickerContainer.find('.datePickerMonth').show();
            datePickerContainer.find('.datePickerYear').css('margin-top','1em');
            datePickerContainer.attr('selectPeriod','month');
            $('.datePickerSelectedDateContainer[datePickerContainer="'+datePickerContainer.attr('id')+'"]').find('.datePickerSelectedDate').text(
                datePickerCalcDateAndTime(new Date(datePickerContainer.find('.datePickerYear').attr('year'),datePickerContainer.find('.datePickerMonth').attr('month') - 1,datePickerContainer.find('.datePickerSelectedDay').text() ).toISOString(),'noTime')
            )
        }else if(datePickerContainer.attr('selectBy') == 'month'){
            datePickerContainer.find('.datePickerDaysContainer').hide();
            datePickerContainer.find('.datePickerMonth').show();
            datePickerContainer.find('.datePickerYear').css('margin-top','1em');
            datePickerContainer.attr('selectPeriod','month');
            $('.datePickerSelectedDateContainer[datePickerContainer="'+datePickerContainer.attr('id')+'"]').find('.datePickerSelectedDate').text(
                datePickerCalcDateAndTime(new Date(datePickerContainer.find('.datePickerYear').attr('year'),datePickerContainer.find('.datePickerMonth').attr('month') - 1,datePickerContainer.find('.datePickerSelectedDay').text()).toISOString(),'monthAndYear')
            )

        }else if(datePickerContainer.attr('selectBy') == 'year'){
            datePickerContainer.find('.datePickerDaysContainer').hide();
            datePickerContainer.find('.datePickerMonth').hide();
            datePickerContainer.find('.datePickerYear').css('margin-top',0);
            datePickerContainer.attr('selectPeriod','year');
            $('.datePickerSelectedDateContainer[datePickerContainer="'+datePickerContainer.attr('id')+'"]').find('.datePickerSelectedDate').text(
                datePickerCalcDateAndTime(new Date(datePickerContainer.find('.datePickerYear').attr('year'),datePickerContainer.find('.datePickerMonth').attr('month') - 1,datePickerContainer.find('.datePickerSelectedDay').text()).toISOString(),'onlyYear')
            )
        }
        if(datePickerContainer.find('.datePickerSelectedDay').hasClass('datePickerDayNoSelect')){datePickerContainer.find('.datePickerSelectedDay').removeClass('datePickerSelectedDay')}
    }

}

$('html,body').on('click','.datePickerNextMonthBtn',function(e){
    e.stopImmediatePropagation();
    let datePickerContainer = $('#'+$(this).attr('datePickerContainer'));
    let selectedYear = parseInt(datePickerContainer.find('.datePickerYear').attr('year'));
    let selectedMonth = parseInt(datePickerContainer.find('.datePickerMonth').attr('month'));

    if(datePickerContainer.attr('selectPeriod') == 'year'){
        if(datePickerContainer.attr('datePickerType') != 'future'){
            if(datePickerContainer.find('.datePickerYear').attr('year') == new Date().getFullYear()){return;}
        }
        datePickerContainer.find('.datePickerYear').attr('year',datePicker(selectedMonth,selectedYear,1,'year').year);
        datePickerContainer.find('.datePickerYear').text(datePicker(selectedMonth,selectedYear,1,'year').year);
        datePickerContainer.find('.datePickerMonth').attr('month',datePicker(selectedMonth,selectedYear,1,'year').month);
        datePickerContainer.find('.datePickerMonth').text(datePicker(selectedMonth,selectedYear,1,'year').monthName);
    }else if(datePickerContainer.attr('selectPeriod') == 'month'){
        if(datePickerContainer.attr('datePickerType') != 'future'){
            if(datePickerContainer.find('.datePickerYear').attr('year') == new Date().getFullYear()){
                if(datePickerContainer.find('.datePickerMonth').attr('month') == new Date().getMonth() + 1){return;}
            }
        }
        datePickerContainer.find('.datePickerYear').attr('year',datePicker(selectedMonth,selectedYear,1,'month').year);
        datePickerContainer.find('.datePickerYear').text(datePicker(selectedMonth,selectedYear,1,'month').year);
        datePickerContainer.find('.datePickerMonth').attr('month',datePicker(selectedMonth,selectedYear,1,'month').month);
        datePickerContainer.find('.datePickerMonth').text(datePicker(selectedMonth,selectedYear,1,'month').monthName);
    }

    datePickerContainer.find('.datePickerWeekDays').css({
        'opacity': '0'
    });
    setTimeout(function(){
        datePickerContainer.find('.datePickerDay').each(function(){
            $(this).removeClass('datePickerDayDump');
            $(this).removeClass('datePickerSelectedDay');
            $(this).removeClass('datePickerDayNoSelect');
            $(this).text(parseInt($(this).attr('dayNum')) - datePicker(selectedMonth,selectedYear,1,'month').firstDayWeek);
            if(parseInt($(this).text()) < 1){
                $(this).text('');
                $(this).addClass('datePickerDayDump');
            }
            if(parseInt($(this).text()) > datePicker(selectedMonth,selectedYear,1,'month').monthDays){
                $(this).text('');
                $(this).addClass('datePickerDayDump');
            }
            let now = new Date();
            now.setHours(0,0,0,0);
            if(datePickerContainer.attr('datePickerType') == 'future'){
                if($(this).parent().parent().parent().attr('todayActive') == 1){
                    if(Date.parse(now) > Date.parse(new Date(parseInt($(this).parent().parent().parent().find('.datePickerYear').attr('year')),(parseInt($(this).parent().parent().parent().find('.datePickerMonth').attr('month') - 1)),$(this).text()))){$(this).addClass('datePickerDayNoSelect')}
                }else if($(this).parent().parent().parent().attr('todayActive') == 0){
                    if(Date.parse(now) >= Date.parse(new Date(parseInt($(this).parent().parent().parent().find('.datePickerYear').attr('year')),(parseInt($(this).parent().parent().parent().find('.datePickerMonth').attr('month') - 1)),$(this).text()))){$(this).addClass('datePickerDayNoSelect')}
                }
                if($(this).text() == '1'){$(this).addClass('datePickerSelectedDay');$(this).trigger('click');datePickerContainer.show();}
            }else{
                if($(this).parent().parent().parent().attr('todayActive') == 1){
                    if(Date.parse(now) < Date.parse(new Date(parseInt($(this).parent().parent().parent().find('.datePickerYear').attr('year')),(parseInt($(this).parent().parent().parent().find('.datePickerMonth').attr('month') - 1)),$(this).text()))){$(this).addClass('datePickerDayNoSelect')}
                }else if($(this).parent().parent().parent().attr('todayActive') == 0){
                    if(Date.parse(now) <= Date.parse(new Date(parseInt($(this).parent().parent().parent().find('.datePickerYear').attr('year')),(parseInt($(this).parent().parent().parent().find('.datePickerMonth').attr('month') - 1)),$(this).text()))){$(this).addClass('datePickerDayNoSelect')}
                }
                if($(this).text() == '1'){$(this).addClass('datePickerSelectedDay');$(this).trigger('click');datePickerContainer.show();}
            }


        });
        datePickerContainer.find('.datePickerWeekDays').css({
            'opacity': '1'
        });
    },200);

})

$('html,body').on('click','.datePickerPrevMonthBtn',function(e){
    e.stopImmediatePropagation();
    let datePickerContainer = $('#'+$(this).attr('datePickerContainer'));
    let selectedYear = parseInt(datePickerContainer.find('.datePickerYear').attr('year'));
    let selectedMonth = parseInt(datePickerContainer.find('.datePickerMonth').attr('month'));

    if(datePickerContainer.attr('selectPeriod') == 'year'){
        if(datePickerContainer.attr('datePickerType') == 'future'){
            if(datePickerContainer.find('.datePickerYear').attr('year') == new Date().getFullYear()){return;}
        }
        datePickerContainer.find('.datePickerYear').attr('year',datePicker(selectedMonth,selectedYear,0,'year').year);
        datePickerContainer.find('.datePickerYear').text(datePicker(selectedMonth,selectedYear,0,'year').year);
        datePickerContainer.find('.datePickerMonth').attr('month',datePicker(selectedMonth,selectedYear,0,'year').month);
        datePickerContainer.find('.datePickerMonth').text(datePicker(selectedMonth,selectedYear,0,'year').monthName);
    }else if(datePickerContainer.attr('selectPeriod') == 'month'){
        if(datePickerContainer.attr('datePickerType') == 'future'){
            if(datePickerContainer.find('.datePickerYear').attr('year') == new Date().getFullYear()){
                if(datePickerContainer.find('.datePickerMonth').attr('month') == new Date().getMonth() + 1){return;}
            }
        }
        datePickerContainer.find('.datePickerYear').attr('year',datePicker(selectedMonth,selectedYear,0,'month').year);
        datePickerContainer.find('.datePickerYear').text(datePicker(selectedMonth,selectedYear,0,'month').year);
        datePickerContainer.find('.datePickerMonth').attr('month',datePicker(selectedMonth,selectedYear,0,'month').month);
        datePickerContainer.find('.datePickerMonth').text(datePicker(selectedMonth,selectedYear,0,'month').monthName);
    }
    datePickerContainer.find('.datePickerWeekDays').css({
        'opacity': '0'
    });
    setTimeout(function(){
        datePickerContainer.find('.datePickerDay').each(function(){
            $(this).removeClass('datePickerDayDump');
            $(this).removeClass('datePickerSelectedDay');
            $(this).removeClass('datePickerDayNoSelect');
            $(this).text(parseInt($(this).attr('dayNum')) - datePicker(selectedMonth,selectedYear,0,'month').firstDayWeek);
            if(parseInt($(this).text()) < 1){
                $(this).text('');
                $(this).addClass('datePickerDayDump');
            }
            if(parseInt($(this).text()) > datePicker(selectedMonth,selectedYear,0,'month').monthDays){
                $(this).text('');
                $(this).addClass('datePickerDayDump');
            }
            let now = new Date();
            now.setHours(0,0,0,0);
            if(datePickerContainer.attr('datePickerType') == 'future'){
                if($(this).parent().parent().parent().attr('todayActive') == 1){
                    if(Date.parse(now) > Date.parse(new Date(parseInt($(this).parent().parent().parent().find('.datePickerYear').attr('year')),(parseInt($(this).parent().parent().parent().find('.datePickerMonth').attr('month') - 1)),$(this).text()))){$(this).addClass('datePickerDayNoSelect')}
                }else if($(this).parent().parent().parent().attr('todayActive') == 0){
                    if(Date.parse(now) >= Date.parse(new Date(parseInt($(this).parent().parent().parent().find('.datePickerYear').attr('year')),(parseInt($(this).parent().parent().parent().find('.datePickerMonth').attr('month') - 1)),$(this).text()))){$(this).addClass('datePickerDayNoSelect')}
                }
                if(datePickerContainer.find('.datePickerYear').attr('year') == new Date().getFullYear()){
                    if(datePickerContainer.find('.datePickerMonth').attr('month') == new Date().getMonth() + 1){
                        if($(this).parent().parent().parent().attr('todayActive') == 1){
                            if($(this).text() == parseInt(new Date().getDate())){$(this).addClass('datePickerSelectedDay');$(this).trigger('click');datePickerContainer.show();}
                        }else{
                            if($(this).text() == parseInt(new Date(new Date()).getDate()) + 1){$(this).addClass('datePickerSelectedDay');$(this).trigger('click');datePickerContainer.show();}
                        }
                    }else{
                        if($(this).text() == '1'){$(this).addClass('datePickerSelectedDay');$(this).trigger('click');datePickerContainer.show();}
                    }
                }else{
                    if($(this).text() == '1'){$(this).addClass('datePickerSelectedDay');$(this).trigger('click');datePickerContainer.show();}
                }
            }else{
                if($(this).parent().parent().parent().attr('todayActive') == 1){
                    if(Date.parse(now) < Date.parse(new Date(parseInt($(this).parent().parent().parent().find('.datePickerYear').attr('year')),(parseInt($(this).parent().parent().parent().find('.datePickerMonth').attr('month') - 1)),$(this).text()))){$(this).addClass('datePickerDayNoSelect')}
                }else if($(this).parent().parent().parent().attr('todayActive') == 0){
                    if(Date.parse(now) <= Date.parse(new Date(parseInt($(this).parent().parent().parent().find('.datePickerYear').attr('year')),(parseInt($(this).parent().parent().parent().find('.datePickerMonth').attr('month') - 1)),$(this).text()))){$(this).addClass('datePickerDayNoSelect')}
                }
                    if($(this).text() == '1'){$(this).addClass('datePickerSelectedDay');$(this).trigger('click');datePickerContainer.show();}
            }


        })
        datePickerContainer.find('.datePickerWeekDays').css({
            'opacity': '1'
        });
    },200);
});
$('html,body').on('click','.datePickerDay',function(e){
    // e.stopPropagation();
    datePickerContainer = $(this).parent().parent().parent();
    if($(this).text() == ''){return;}
    let now = new Date();
    now.setHours(0,0,0,0);
    if(datePickerContainer.attr('datePickerType') == 'future'){
        if($(this).parent().parent().parent().attr('todayActive') == 1){
            if(Date.parse(now) > Date.parse(new Date(parseInt($(this).parent().parent().parent().find('.datePickerYear').attr('year')),(parseInt($(this).parent().parent().parent().find('.datePickerMonth').attr('month')) - 1),$(this).text()))){return;}
        }else if($(this).parent().parent().parent().attr('todayActive') == 0){
            if(Date.parse(now) >= Date.parse(new Date(parseInt($(this).parent().parent().parent().find('.datePickerYear').attr('year')),(parseInt($(this).parent().parent().parent().find('.datePickerMonth').attr('month')) - 1),$(this).text()))){return;}
        }
    }else{
        if($(this).parent().parent().parent().attr('todayActive') == 1){
            if(Date.parse(now) < Date.parse(new Date(parseInt($(this).parent().parent().parent().find('.datePickerYear').attr('year')),(parseInt($(this).parent().parent().parent().find('.datePickerMonth').attr('month')) - 1),$(this).text()))){return;}
        }else if($(this).parent().parent().parent().attr('todayActive') == 0){
            if(Date.parse(now) <= Date.parse(new Date(parseInt($(this).parent().parent().parent().find('.datePickerYear').attr('year')),(parseInt($(this).parent().parent().parent().find('.datePickerMonth').attr('month')) - 1),$(this).text()))){return;}
        }
    }
    $(this).parent().children().removeClass('datePickerSelectedDay');
    $(this).addClass('datePickerSelectedDay');
    if(datePickerContainer.attr('selectBy') == 'day'){
        if(!datePickerContainer.find('.datePickerSelectedDay').length > 0){
            showAlert('error',texts.statistics.selectADay,4000,true);
            return;
        }
        $('.datePickerSelectedDateContainer[datePickerContainer="'+datePickerContainer.attr('id')+'"]').find('.datePickerSelectedDate').text(
            datePickerCalcDateAndTime(new Date(datePickerContainer.find('.datePickerYear').attr('year'),datePickerContainer.find('.datePickerMonth').attr('month') - 1,datePickerContainer.find('.datePickerSelectedDay').text() ).toISOString(),'noTime')
        )
    }else if(datePickerContainer.attr('selectBy') == 'month'){
        $('.datePickerSelectedDateContainer[datePickerContainer="'+datePickerContainer.attr('id')+'"]').find('.datePickerSelectedDate').text(
            datePickerCalcDateAndTime(new Date(datePickerContainer.find('.datePickerYear').attr('year'),datePickerContainer.find('.datePickerMonth').attr('month') - 1,1).toISOString(),'monthAndYear')
        )
    }else if(datePickerContainer.attr('selectBy') == 'year'){
        $('.datePickerSelectedDateContainer[datePickerContainer="'+datePickerContainer.attr('id')+'"]').find('.datePickerSelectedDate').text(
            datePickerCalcDateAndTime(new Date(datePickerContainer.find('.datePickerYear').attr('year'),datePickerContainer.find('.datePickerMonth').attr('month') - 1,1).toISOString(),'onlyYear')
        )
    }
    datePickerContainer.hide();
})
$('html,body').on('click','.datePickerSelectedDateContainer',function(e){
    e.stopImmediatePropagation();
    $('.datePickerContainer').hide();
    $('#'+$(this).attr('datePickerContainer')).css({'display':'flex','left':$(this).position().left + ($(this).width() - $('#'+$(this).attr('datePickerContainer')).width()),'top':($(this).position().top) + $(this).outerHeight()});
});

$('html,body').on('click',function(e){
    $('.datePickerContainer').each(function(){
        if(!$(this).is(':hover')){
            $(this).hide();
        }
    })

})

