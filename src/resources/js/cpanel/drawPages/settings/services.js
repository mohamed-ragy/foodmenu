drawPopupPage_working_days = function(service,dayName){
    let day;let title;
    if(service == 'delivery'){
        title = `${texts.settings.deliveryWorkingHours}`
        day = website_temp.workingDays_delivery[dayName];
    }else if(service == 'pickup'){
        title = `${texts.settings.pickupWorkingHours}`
        day = website_temp.workingDays_pickup[dayName];
    }else if(service == 'dinein'){
        title = `${texts.settings.dineinWorkingHours}`
        day = website_temp.workingDays_dinein[dayName];
    }
    let dayTo = floatToTime(day.to.split('.')[0],day.to.split('.')[1])
    let showHideDayContentClass;
    day.working == 0 ? showHideDayContentClass = 'none' : null;
    let timePickerDumpClass = '';
    day.working24 ? timePickerDumpClass = 'timePickerDump' : null;
    let timePickerDumpClass2 = '';
    day.discount <= 0 ? timePickerDumpClass2 = 'timePickerDump' : null;
    $('#popupPageTitle').text('').append(
        $('<span/>',{class:'ellipsis',text:title}),
        // $('<span/>',{class:'ico-help help-icon',helpId:''})
    );
    $('#popupPageBody').text('').addClass('w500 mxw100p-40 p20').append(
        $('<div/>',{class:'pageSectionTitle2'}).append(
            $('<span/>',{class:`workingHoursNotSaved-${service}-${dayName} unsaved ico-warning mie-5 none`,tooltip:texts.cpanel.public.unsaved}),
            $('<span/>',{text:texts.cpanel.public[dayName]}),
        ),
        drawSwitchBtn('set_as_working_day',texts.settings.setAsWorkingDay,`${service}-setAsWorkingDay`,'setAsWorkingDaySwtichBtn checkboxlabel_100p mT10 brdrT0',''),
        $('<div/>',{id:`${service}-workingHoursContainer`,class:`area mT40 ${showHideDayContentClass}`,autoHelp:'working_hours'}).append(
            $('<div/>',{class:'areaTitle',text:texts.settings.workingHours}),
            drawSwitchBtn('',texts.settings.working24Hours,`${service}-working24`,'setAsworking24DaySwtichBtn checkboxlabel_100p mT20 brdrT0',''),
            drawTimePicker(texts.settings.startsAt,`timePickerContainer_100p ${timePickerDumpClass} workingHoursFromContainer`),
            drawTimePicker(texts.settings.endsAt,`timePickerContainer_100p ${timePickerDumpClass} workingHoursToContainer`),
        ),
        $('<div/>',{id:`${service}-happyHoursContainer`,class:`area mT40 ${showHideDayContentClass}`,autoHelp:'happy_hour'}).append(
            $('<div/>',{class:'areaTitle',text:texts.settings.happyHour}),
            $('<div/>',{class:'checkboxlabel_100p mT40 brdrT0'}).append(
                $('<div/>',{class:'fs09 mX5',text:texts.settings.discount}),
                $('<div/>',{class:'numberPickerControls'}).append(
                    $('<div/>',{class:'numberPickerArrow ico-left happyHourDiscountD'}),
                    $('<div/>',{class:'numberPickerValue'}).append(
                        $('<div/>',{class:'fs09 happyHourDiscount',id:`${service}-happyHourDiscount`}),
                        $('<div/>',{class:'fs09',text:'%'})
                    ),
                    $('<div/>',{class:'numberPickerArrow ico-right happyHourDiscountU'})
                )
            ),
            drawTimePicker(texts.settings.startsAt,`timePickerContainer_100p ${timePickerDumpClass2} happyHoursFromContainer`),
            drawTimePicker(texts.settings.endsAt,`timePickerContainer_100p ${timePickerDumpClass2} happyHoursToContainer`),
        ),
        drawSaveCancelBtns(`saveWorkingDayBtn`,`cancelWorkingDayBtn`,'mT40')
    );
    timePickerAMPMRest();
    setTimePicker($(`.workingHoursFromContainer`),day.from.split('.')[0],day.from.split('.')[1]);
    setTimePicker($(`.workingHoursToContainer`),day.to.split('.')[0],day.to.split('.')[1]);
    setTimePicker($(`.happyHoursFromContainer`),day.Dfrom.split('.')[0],day.Dfrom.split('.')[1]);
    setTimePicker($(`.happyHoursToContainer`),day.Dto.split('.')[0],day.Dto.split('.')[1]);
    day.working == 1 ? $(`#${service}-setAsWorkingDay`).prop('checked',true):null;
    day.working24 == 1 ? $(`#${service}-working24`).prop('checked',true):null;
    $(`#${service}-happyHourDiscount`).text(day.discount)
    home_delivery_settings_unsave_check();
    order_pickup_settings_unsave_check();
    dine_in_settings_unsave_check();
}
