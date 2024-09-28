floatToTime = function(hour,minute){
    if(website.hour12 == 1){
        if(hour > 12){
            fixedHour = parseInt(hour) - 12;
            fixed12 = 'PM';
        }else if(hour == 0){
            fixedHour = 12;
            fixed12 = 'AM';
        }
        else if(hour == 12){
            fixedHour = 12;
            fixed12 = 'PM';
        }else{
            fixedHour = parseInt(hour);
            fixed12 = 'AM';
        }
        if(fixedHour < 10){fixedHour = '0'+fixedHour}
        if(minute < 10){minute = '0'+minute}
        return [fixedHour,minute,fixed12];
    }else if(website.hour12 == 0){
        if(hour < 10){hour = '0'+hour}
        if(minute < 10){minute = '0'+minute}
        return [hour,minute,''];
    }
}
drawWorkingDaysTable = function(service){
    let container;
    let workingDays;
    if(service == 'delivery'){
        container = $('#delivery-WorkingDaysTable')
        workingDays = website_temp.workingDays_delivery
    }else if(service == 'pickup'){
        container = $('#pickup-WorkingDaysTable')
        workingDays = website_temp.workingDays_pickup
    }else if(service == 'dinein'){
        container = $('#dinein-WorkingDaysTable')
        workingDays = website_temp.workingDays_dinein
    }
    let workingDaysSorter = {"sunday": 0, "monday": 1,"tuesday": 2,"wednesday": 3,"thursday": 4,"friday": 5,"saturday": 6};
    let workingDays_temp = [];
    for(const key in workingDays){
        workingDays_temp[workingDaysSorter[key.toLowerCase()]] = {
            key: key,
            value: workingDays[key]
        };
    }
    let workingDays_ordered = {};
    for(const key in workingDays_temp){
        workingDays_ordered[workingDays_temp[key].key] = workingDays_temp[key].value;
    }
    container.text('').append(
        $('<tr/>',{class:'trHead'}).append(
            $('<th/>',{class:'vaM tnw',text:texts.settings.day}),
            $('<th/>',{class:'vaM tnw',text:texts.settings.workingHours}),
            $('<th/>',{class:'vaM tnw',text:texts.settings.happyHour}),
            $('<th/>',{class:'vaM tnw',text:texts.settings.discount}),
            $('<th/>',{class:'vaM tnw',text:''}),
        ),

    )

    for(const day in workingDays_ordered){
        let dayData = workingDays_ordered[day];
        let from = floatToTime(dayData.from.split('.')[0],dayData.from.split('.')[1]);
        let to = floatToTime(dayData.to.split('.')[0],dayData.to.split('.')[1]);
        let Dfrom = floatToTime(dayData.Dfrom.split('.')[0],dayData.Dfrom.split('.')[1]);
        let Dto = floatToTime(dayData.Dto.split('.')[0],dayData.Dto.split('.')[1]);
        let dayWorkingHours = $('<span/>',{text:`${from[0]}:${from[1]}${from[2]} ~ ${to[0]}:${to[1]}${to[2]}`});
        let dayStatusClass= '';
        dayData.working24 ? dayWorkingHours = texts.settings.working24Hours : null;
        dayData.working == 0 ? dayWorkingHours = texts.settings.dayOff : null;
        dayData.working == 0 ? dayStatusClass = 'dayRowStatus_off' : null;

        let happyHourElem = $('<td/>',{class:'vaM tnw',text:`${Dfrom[0]}:${Dfrom[1]}${Dfrom[2]} ~ ${Dto[0]}:${Dto[1]}${Dto[2]}`});
        dayData.discount == 0 ? happyHourElem = $('<td/>',{class:'vaM tnw',text:`--`}) : null;
        dayData.working == 0 ? happyHourElem = $('<td/>',{class:'vaM tnw',text:`--`}) : null;

        let discountElem = $('<td/>',{class:'vaM tnw',text:`${dayData.discount}%`});
        dayData.discount == 0 ? discountElem = $('<td/>',{class:'vaM tnw',text:`--`}) : null;
        dayData.working == 0 ? discountElem = $('<td/>',{class:'vaM tnw',text:`--`}) : null;

        let copyWorkingdayDumpClass ='';
        dayData.working == 0 ? copyWorkingdayDumpClass = 'copyWorkingdayDump' : null;
        container.append(
            $('<tr/>',{}).append(
                $('<td/>',{class:'vaM tnw',text:texts.cpanel.public[day]}).append(

                ),
                $('<td/>',{class:'vaM tnw'}).append(
                    $('<div/>',{class:'row alnC jstfyS'}).append(
                        $('<span/>',{class:`dayRowStatus ${dayStatusClass}`}),
                        dayWorkingHours,
                    )
                ),
                happyHourElem,
                discountElem,
                $('<td/>',{class:'vaM taC tnw'}).append(
                    $('<div/>',{class:'ico-settings btn_table popupPage',popupPage:'working_hours',day:day,service:service,tooltip:texts.cpanel.public.manage}).append($('<div/>',{class:`tableRow_unsaved none workingHoursNotSaved-${service}-${day}`})),
                    $('<div/>',{class:`ico-copy btn_table copyWorkingday ${copyWorkingdayDumpClass}`,day:day,service:service,tooltip:texts.settings.copyDay})
                )
            )
        )
    }
    home_delivery_settings_unsave_check();
    order_pickup_settings_unsave_check();
    dine_in_settings_unsave_check();
}



//
$('body').on('click','.workingHoursFromContainer',function(e){
    let day = window.history.state.day;
    let service = window.history.state.service;
    website_temp[`workingDays_${service}`][day].from = `${$('.workingHoursFromContainer').find('.timePickerH').attr('hour')}.${$('.workingHoursFromContainer').find('.timePickerM').attr('mins')}`
    drawWorkingDaysTable(service)
})
$('body').on('click','.workingHoursToContainer',function(e){
    let day = window.history.state.day;
    let service = window.history.state.service;
    website_temp[`workingDays_${service}`][day].to = `${$('.workingHoursToContainer').find('.timePickerH').attr('hour')}.${$('.workingHoursToContainer').find('.timePickerM').attr('mins')}`
    drawWorkingDaysTable(service)
})
$('body').on('click','.setAsWorkingDaySwtichBtn',function(e){
    let day = window.history.state.day;
    let service = window.history.state.service;
    $(`#${service}-setAsWorkingDay`).prop('checked') ? website_temp[`workingDays_${service}`][day].working = 1 : website_temp[`workingDays_${service}`][day].working = 0;
    $(`#${service}-setAsWorkingDay`).prop('checked') ? $(`#${service}-workingHoursContainer`).removeClass('none') : $(`#${service}-workingHoursContainer`).addClass('none')
    $(`#${service}-setAsWorkingDay`).prop('checked') ? $(`#${service}-happyHoursContainer`).removeClass('none') : $(`#${service}-happyHoursContainer`).addClass('none')
    drawWorkingDaysTable(service)
})
$('body').on('click','.setAsworking24DaySwtichBtn',function(e){
    let day = window.history.state.day;
    let service = window.history.state.service;
    if($(`#${service}-working24`).prop('checked')){
        website_temp[`workingDays_${service}`][day].working24 = 1;
        $('.workingHoursFromContainer').addClass('timePickerDump')
        $('.workingHoursToContainer').addClass('timePickerDump')
    }else{
        website_temp[`workingDays_${service}`][day].working24 = 0;
        $('.workingHoursFromContainer').removeClass('timePickerDump')
        $('.workingHoursToContainer').removeClass('timePickerDump')
    }
    drawWorkingDaysTable(service)
})
///////
$('body').on('click','.happyHoursFromContainer',function(e){
    let day = window.history.state.day;
    let service = window.history.state.service;
    website_temp[`workingDays_${service}`][day].Dfrom = `${$('.happyHoursFromContainer').find('.timePickerH').attr('hour')}.${$('.happyHoursFromContainer').find('.timePickerM').attr('mins')}`
    drawWorkingDaysTable(service)
})
$('body').on('click','.happyHoursToContainer',function(e){
    let day = window.history.state.day;
    let service = window.history.state.service;
    website_temp[`workingDays_${service}`][day].Dto = `${$('.happyHoursToContainer').find('.timePickerH').attr('hour')}.${$('.happyHoursToContainer').find('.timePickerM').attr('mins')}`
    drawWorkingDaysTable(service)
})
$('body').on('click','.happyHourDiscountD',function(e){
    let day = window.history.state.day;
    let service = window.history.state.service;
    website_temp[`workingDays_${service}`][day].discount <= 0 ? website_temp[`workingDays_${service}`][day].discount = 0 :
    website_temp[`workingDays_${service}`][day].discount = parseInt(website_temp[`workingDays_${service}`][day].discount) - 1;
    $('.happyHourDiscount').text(website_temp[`workingDays_${service}`][day].discount)
    website_temp[`workingDays_${service}`][day].discount <= 0 ? $('.happyHoursFromContainer').addClass('timePickerDump') : $('.happyHoursFromContainer').removeClass('timePickerDump') ;
    website_temp[`workingDays_${service}`][day].discount <= 0 ? $('.happyHoursToContainer').addClass('timePickerDump') : $('.happyHoursToContainer').removeClass('timePickerDump') ;
    drawWorkingDaysTable(service)
})
$('body').on('click','.happyHourDiscountU',function(e){
    let day = window.history.state.day;
    let service = window.history.state.service;
    website_temp[`workingDays_${service}`][day].discount >= 100 ? website_temp[`workingDays_${service}`][day].discount = 100 :
    website_temp[`workingDays_${service}`][day].discount = parseInt(website_temp[`workingDays_${service}`][day].discount) + 1;
    $('.happyHourDiscount').text(website_temp[`workingDays_${service}`][day].discount)
    website_temp[`workingDays_${service}`][day].discount <= 0 ? $('.happyHoursFromContainer').addClass('timePickerDump') : $('.happyHoursFromContainer').removeClass('timePickerDump') ;
    website_temp[`workingDays_${service}`][day].discount <= 0 ? $('.happyHoursToContainer').addClass('timePickerDump') : $('.happyHoursToContainer').removeClass('timePickerDump') ;
    drawWorkingDaysTable(service)
})
//
$('body').on('click','#cancelWorkingDayBtn',function(e){
    let day = window.history.state.day;
    let service = window.history.state.service;
    website_temp[`workingDays_${service}`][day] = JSON.parse(JSON.stringify(website[`workingDays_${service}`][day]))
    drawWorkingDaysTable(service)
    drawPopupPage_working_days(service,day)
})
$('body').on('click','#saveWorkingDayBtn',function(e){
    let day = window.history.state.day;
    let service = window.history.state.service;

    if(!coolDownChecker()){return;}
    showBtnLoading($('#saveWorkingDayBtn'));
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"').attr('content'),
            saveWorkingDay:day,
            service:service,
            workingHours:website_temp[`workingDays_${service}`][day],
        },success:function(r){
            hideBtnLoading($('#saveWorkingDayBtn'));
            if(r.saveWorkingDayStatus == 1){
                showAlert('success',r.msg,4000,true);
                website[`workingDays_${service}`][day] = JSON.parse(JSON.stringify(website_temp[`workingDays_${service}`][day]))
                drawWorkingDaysTable(service)
                popupPageClose(true)
            }else if(r.saveWorkingDayStatus == 0){
                showAlert('error',r.msg,4000,true);
                drawWorkingDaysTable(service)
            }
        }
    })
});
/////
$('body').on('click','.copyWorkingday',function(e){
    if($(this).hasClass('copyWorkingdayDump')){return;}
    let dayName = $(this).attr('day');
    let service = $(this).attr('service');
    let day = website_temp[`workingDays_${service}`][dayName];
    let from = floatToTime(day.from.split('.')[0],day.from.split('.')[1]);
    let to = floatToTime(day.to.split('.')[0],day.to.split('.')[1]);
    let Dfrom = floatToTime(day.Dfrom.split('.')[0],day.Dfrom.split('.')[1]);
    let Dto = floatToTime(day.Dto.split('.')[0],day.Dto.split('.')[1]);
    let dayWorkingHours = $('<span/>',{text:`${from[0]}:${from[1]}${from[2]} ~ ${to[0]}:${to[1]}${to[2]}`});
    let showHideDiscountClass = '';let copyHappyHourCheckIcon = 'ico-check1';
    day.discount <= 0 ? showHideDiscountClass = 'none' : null;
    day.discount <= 0 ? copyHappyHourCheckIcon = 'ico-check0' : null;
    day.working24 ? dayWorkingHours =  $('<span/>',{text:texts.settings.working24Hours}) : null;
    let title;
    if(service == 'delivery'){
        title = `${texts.settings.deliveryWorkingHours}`
    }else if(service == 'pickup'){
        title = `${texts.settings.pickupWorkingHours}`
    }else if(service == 'dinein'){
        title = `${texts.settings.dineinWorkingHours}`
    }
    showPopup('copyWorkingDay',function(){
        $('.popupTitle').text(title);
        $('.popupBody').append(
            $('<div/>',{}).append(
                $('<span/>',{class:'bold500',text:`${texts.cpanel.public.copy} ${texts.cpanel.public[dayName]}`}),
            ),
            $('<div/>',{class:''}).append(
                $('<div/>',{class:'fs08 mT5 mis-5 pointer copyDayWorkingHappyHours'}).append(
                    $('<span/>',{class:'ico-check1  mie-5 copyDayWorkingHappyHoursCheck',id:'copyDayWorkingHoursCheck'}),
                    $('<span/>',{text:`${texts.settings.workingHours}:`,class:'mie-5'}),
                    dayWorkingHours,
                ),
                $('<div/>',{class:`fs08 mT5 mis-5 pointer ${showHideDiscountClass} copyDayWorkingHappyHours`}).append(
                    $('<span/>',{class:`${copyHappyHourCheckIcon} mie-5 copyDayWorkingHappyHoursCheck`,id:'copyDayHappyHoursCheck'}),
                    $('<span/>',{text:`${texts.settings.happyHour}:`,class:'mie-5'}),
                    $('<span/>',{text:`${Dfrom[0]}:${Dfrom[1]}${Dfrom[2]} ~ ${Dto[0]}:${Dto[1]}${Dto[2]} (${day.discount}% ${texts.settings.discount})`}),
                ),
            ),
            $('<div/>',{class:'pageSection_brdrB mY10'}),
            $('<div/>',{text:texts.settings.copyTo}),
            $('<div/>',{class:'row column alnS jstfyS w100p mT5 copyDayPopupDaysWrapper'}),
            $('<div/>',{class:'btnContainer mT40'}).append(
                $('<button/>',{class:'btn mie-5 btn-cancel',service:service,copy:dayName,id:`copyWorkingHoursBtn`,text:texts.cpanel.public.copy}),
                $('<button/>',{class:'btn mis-5',service:service,copy:dayName,id:`copySaveWorkingHoursBtn`}).append(
                    $('<div/>',{class:'btnLoading'}),
                    $('<div/>',{class:'btnTxt',text:texts.settings.copyAndSave}),
                ),
            )

        )
        let weekDays = ['allWeekDays','sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
        for(const key in weekDays){
            if(weekDays[key] != dayName){
                $('.copyDayPopupDaysWrapper').append(
                    $('<div/>',{class:'copyDayPopupDay',key:weekDays[key]}).append(
                        $('<div/>',{text:texts.cpanel.public[weekDays[key]]}),
                        $('<div/>',{class:'ico-check0 copyDayPopupDayCheck mie-10'})
                    )
                )
            }
        }

    })
})
$('body').on('click','.copyDayWorkingHappyHours',function(e){
    $(this).find('.copyDayWorkingHappyHoursCheck').hasClass('ico-check1') ? $(this).find('.copyDayWorkingHappyHoursCheck').removeClass('ico-check1').addClass('ico-check0') : $(this).find('.copyDayWorkingHappyHoursCheck').addClass('ico-check1').removeClass('ico-check0');
});
$('body').on('click','.copyDayPopupDay',function(e){
    if($(this).attr('key') == 'allWeekDays'){
        if($(this).find('.copyDayPopupDayCheck').hasClass('ico-check1')){
            $('.copyDayPopupDayCheck').removeClass('ico-check1').addClass('ico-check0')
        }else{
            $('.copyDayPopupDayCheck').addClass('ico-check1').removeClass('ico-check0')
        }
    }else{
        if($(this).find('.copyDayPopupDayCheck').hasClass('ico-check1')){
            $('.copyDayPopupDay[key="allWeekDays"]').find('.copyDayPopupDayCheck').removeClass('ico-check1').addClass('ico-check0')
            $(this).find('.copyDayPopupDayCheck').removeClass('ico-check1').addClass('ico-check0')
        }else{
            $(this).find('.copyDayPopupDayCheck').addClass('ico-check1').removeClass('ico-check0')
        }
    }
})
$('body').on('click','#copyWorkingHoursBtn',function(e){
    let service = $(this).attr('service');
    let copyFrom = website_temp[`workingDays_${service}`][$(this).attr('copy')];
    let copyTo = [];
    $('.copyDayPopupDay').each(function(){
        if($(this).find('.copyDayPopupDayCheck').hasClass('ico-check1') && $(this).attr('key') != 'allWeekDays'){
            copyTo.push($(this).attr('key'))
        }
    })
    if(!$('#copyDayWorkingHoursCheck').hasClass('ico-check1') && !$('#copyDayHappyHoursCheck').hasClass('ico-check1')){
        showAlert('error',texts.settings.selectWhatToCopy,4000,true);
        return;
    }
    if(copyTo.length == 0){
        showAlert('error',texts.settings.selectDayToCopy,4000,true);
        return;
    }
    for(const key in copyTo){
        if($('#copyDayWorkingHoursCheck').hasClass('ico-check1')){
            website_temp[`workingDays_${service}`][copyTo[key]].working = copyFrom.working
            website_temp[`workingDays_${service}`][copyTo[key]].working24 = copyFrom.working24
            website_temp[`workingDays_${service}`][copyTo[key]].from = copyFrom.from
            website_temp[`workingDays_${service}`][copyTo[key]].to = copyFrom.to
        }
        if($('#copyDayHappyHoursCheck').hasClass('ico-check1')){
            website_temp[`workingDays_${service}`][copyTo[key]].discount = copyFrom.discount
            website_temp[`workingDays_${service}`][copyTo[key]].Dfrom = copyFrom.Dfrom
            website_temp[`workingDays_${service}`][copyTo[key]].Dto = copyFrom.Dto
        }
    }
    drawWorkingDaysTable(service)
    closePopup();
})
$('body').on('click','#copySaveWorkingHoursBtn',function(e){
    if(!coolDownChecker()){return;}
    let service = $(this).attr('service');
    let copyFrom = website_temp[`workingDays_${service}`][$(this).attr('copy')];
    let copyTo = [];
    let copyHours;let copyDiscount;
    $('.copyDayPopupDay').each(function(){
        if($(this).find('.copyDayPopupDayCheck').hasClass('ico-check1') && $(this).attr('key') != 'allWeekDays'){
            copyTo.push($(this).attr('key'))
        }
    })
    if(!$('#copyDayWorkingHoursCheck').hasClass('ico-check1') && !$('#copyDayHappyHoursCheck').hasClass('ico-check1')){
        showAlert('error',texts.settings.selectWhatToCopy,4000,true);
        return;
    }
    if(copyTo.length == 0){
        showAlert('error',texts.settings.selectDayToCopy,4000,true);
        return;
    }
    $('#copyDayWorkingHoursCheck').hasClass('ico-check1') ? copyHours = 1 : copyHours = 0;
    $('#copyDayHappyHoursCheck').hasClass('ico-check1') ? copyDiscount = 1 : copyDiscount = 0;
    showBtnLoading($('#copySaveWorkingHoursBtn'))
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            copyWorkingDays:true,
            copyTo:copyTo,
            service:service,
            workingHours:copyFrom,
            copyHours:copyHours,
            copyDiscount:copyDiscount,
        },success:function(r){
            hideBtnLoading($('#copySaveWorkingHoursBtn'));
            if(r.copyWorkingDaysStatus == 1){
                showAlert('success',r.msg,4000,true);
                closePopup();
                console.log(copyTo)
                for(const key in copyTo){
                    let dayName = copyTo[key];
                    if(copyHours == 1){
                        website[`workingDays_${service}`][dayName].working = copyFrom.working;
                        website[`workingDays_${service}`][dayName].working24 = copyFrom.working24;
                        website[`workingDays_${service}`][dayName].from = copyFrom.from;
                        website[`workingDays_${service}`][dayName].to = copyFrom.to;
                        website_temp[`workingDays_${service}`][dayName].working = copyFrom.working;
                        website_temp[`workingDays_${service}`][dayName].working24 = copyFrom.working24;
                        website_temp[`workingDays_${service}`][dayName].from = copyFrom.from;
                        website_temp[`workingDays_${service}`][dayName].to = copyFrom.to;
                    }
                    if(copyDiscount == 1){
                        website_temp[`workingDays_${service}`][dayName].discount = copyFrom.discount;
                        website_temp[`workingDays_${service}`][dayName].Dfrom = copyFrom.Dfrom;
                        website_temp[`workingDays_${service}`][dayName].Dto = copyFrom.Dto;
                        website[`workingDays_${service}`][dayName].discount = copyFrom.discount;
                        website[`workingDays_${service}`][dayName].Dfrom = copyFrom.Dfrom;
                        website[`workingDays_${service}`][dayName].Dto = copyFrom.Dto;
                    }
                    drawWorkingDaysTable(service)
                }
            }else if(r.copyWorkingDaysStatus == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })
})
