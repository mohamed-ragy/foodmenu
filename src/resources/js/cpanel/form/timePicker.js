drawTimePicker = function(title,containerClass){
    console.log(title)
    return $('<div/>',{class:`timePickerContainer ${containerClass}`}).append(
        $('<div/>',{text:title,class:'fs09 mX5'}),
        $('<div/>',{class:'timePickerControls'}).append(
            $('<div/>',{class:'timePickerControlsHours'}).append(
                $('<div/>',{class:'timePickerHU ico-up'}),
                $('<div/>',{class:'timePickerH'}),
                $('<div/>',{class:'timePickerHD ico-down'})
            ),
            $('<diiv/>',{class:'fs2',text:':'}),
            $('<div/>',{class:'timePickerControlsMins'}).append(
                $('<div/>',{class:'timePickerMU ico-up'}),
                $('<div/>',{class:'timePickerM'}),
                $('<div/>',{class:'timePickerMD ico-down'})
            ),
            $('<div/>',{class:`timePickerControlsAMPM`}).append(
                $('<div/>',{class:'timePickerAMPMU ico-up'}),
                $('<div/>',{class:'timePickerAMPM'}),
                $('<div/>',{class:'timePickerAMPMD ico-down'})
            ),
        ),
    )

}
timePickerAMPMRest = function(){
    if(website.hour12 == 1){
        $('.timePickerControlsAMPM').removeClass('none');
    }else{
        $('.timePickerControlsAMPM').addClass('none');
    }
}
setTimePicker = function(timePicker,hours,mins){
    let time = floatToTime(hours,mins);
    timePicker.find('.timePickerH').attr('hour',hours.toString().padStart(2, '0')).text(time[0].toString().padStart(2, '0'))
    timePicker.find('.timePickerM').attr('mins',mins.toString().padStart(2, '0')).text(time[1].toString().padStart(2, '0'))
    timePicker.find('.timePickerAMPM').text(time[2])
}
timePickerAMPMRest();
calcTimePicker = function(timePicker,action){
    let hours = parseInt(timePicker.closest('.timePickerControls').find('.timePickerH').attr('hour'));
    let mins = parseInt(timePicker.closest('.timePickerControls').find('.timePickerM').attr('mins'));
    if(action == 'HU'){
        if(hours == 23){
            hours = 0;
        }else{
            hours = hours + 1;
        }
    }else if(action == 'HD'){
        if(hours == 0){
            hours = 23;
        }else{
            hours = hours - 1;
        }
    }else if(action == 'MU'){
        if(mins == 59){
            mins = 0;
            if(hours == 23){
                hours = 0;
            }else{
                hours = hours + 1;
            }
        }else{
            mins = mins + 1;
        }
    }else if(action == 'MD'){
        if(mins == 0){
            mins = 59;
            if(hours == 0){
                hours = 23;
            }else{
                hours = hours - 1;
            }
        }else{
            mins = mins - 1;
        }
    }else if(action == 'AMPM'){
        if(hours < 12){
            hours = hours + 12;
        }else if(hours >= 12){
            hours = hours - 12;
        }
    }
    let time = floatToTime(hours,mins);
    timePicker.find('.timePickerH').attr('hour',hours.toString().padStart(2, '0')).text(time[0].toString().padStart(2, '0'))
    timePicker.find('.timePickerM').attr('mins',mins.toString().padStart(2, '0')).text(time[1].toString().padStart(2, '0'))
    timePicker.find('.timePickerAMPM').text(time[2])
}
let timePickerInterval;
$('html,body').on('click','.timePickerHU',function(e){
    if($(this).closest('.timePickerContainer').hasClass('timePickerDump')){
        return;
    }
    calcTimePicker($(this).closest('.timePickerControls'),'HU');
})
$('html,body').on('click','.timePickerHD',function(e){
    if($(this).closest('.timePickerContainer').hasClass('timePickerDump')){
        return;
    }
    calcTimePicker($(this).closest('.timePickerControls'),'HD');
})

$('html,body').on('click','.timePickerMU',function(e){
    if($(this).closest('.timePickerContainer').hasClass('timePickerDump')){
        return;
    }
    calcTimePicker($(this).closest('.timePickerControls'),'MU');
})
$('html,body').on('click','.timePickerMD',function(e){
    if($(this).closest('.timePickerContainer').hasClass('timePickerDump')){
        return;
    }
    calcTimePicker($(this).closest('.timePickerControls'),'MD');
})
$('html,body').on('click','.timePickerAMPMU,.timePickerAMPMD',function(e){
    if($(this).closest('.timePickerContainer').hasClass('timePickerDump')){
        return;
    }
    calcTimePicker($(this).closest('.timePickerControls'),'AMPM');
})

$('html,body').on('mousedown touchstart','.timePickerHU,.timePickerHD,.timePickerMU,.timePickerMD',function(e){
    e.stopImmediatePropagation();
    if($(this).closest('.timePickerContainer').hasClass('timePickerDump')){
        return;
    }
    let elem = $(this)
    timePickerInterval = setInterval(function(){
        elem.trigger('click');
    },100);
});
$('html,body').on('mouseup mouseleave touchend','.timePickerHU,.timePickerHD,.timePickerMU,.timePickerMD',function(e){
    e.stopImmediatePropagation();
    if($(this).closest('.timePickerContainer').hasClass('timePickerDump')){
        return;
    }
    clearInterval(timePickerInterval);
});
