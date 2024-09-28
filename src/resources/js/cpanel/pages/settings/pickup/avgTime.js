avgPickupTimeNoSaveCheck = function(){
    if(website_temp.averagePickupTime == website.averagePickupTime){
        $('.average_pickup_time-NoSave').addClass('none');
        return true;
    }else{
        $('.average_pickup_time-NoSave').removeClass('none');
        return false;
    }
}
resetPickupAvgTime = function(){
    let pickupTimePlus;
    if(website_temp.averagePickupTime == 0){
        pickupTimePlus = 0;
        $('#avgPickupTime').attr('pickupTime',pickupTimePlus)
        $('#avgPickupTime').text('');
        $('#avgPickupTimeTxt').text(texts.cpanel.public.asSoonAsPossible);
    }else if(website_temp.averagePickupTime == 1){
        pickupTimePlus = website_temp.averagePickupTime;
        $('#avgPickupTime').attr('pickupTime',pickupTimePlus)
        $('#avgPickupTime').text(pickupTimePlus);
        $('#avgPickupTimeTxt').text(texts.cpanel.diffTime.min);
    }else if(website_temp.averagePickupTime > 1 && website_temp.averagePickupTime < 60){
        pickupTimePlus = website_temp.averagePickupTime;
        $('#avgPickupTime').attr('pickupTime',pickupTimePlus)
        $('#avgPickupTime').text(pickupTimePlus);
        $('#avgPickupTimeTxt').text(texts.cpanel.diffTime.mins);
    }else if(website_temp.averagePickupTime == 60){
        pickupTimePlus = website_temp.averagePickupTime;
        $('#avgPickupTime').attr('pickupTime',pickupTimePlus)
        $('#avgPickupTime').text(pickupTimePlus/60);
        $('#avgPickupTimeTxt').text(texts.cpanel.diffTime.hour);
    }else if(website_temp.averagePickupTime > 60 && website_temp.averagePickupTime < 1440){
        pickupTimePlus = website_temp.averagePickupTime;
        $('#avgPickupTime').attr('pickupTime',pickupTimePlus)
        $('#avgPickupTime').text(pickupTimePlus/60);
        $('#avgPickupTimeTxt').text(texts.cpanel.diffTime.hours);
    }else if(website_temp.averagePickupTime == 1440){
        pickupTimePlus = 1440;
        $('#avgPickupTime').attr('pickupTime',pickupTimePlus)
        $('#avgPickupTime').text(pickupTimePlus/1440);
        $('#avgPickupTimeTxt').text(texts.cpanel.diffTime.day);
    }else if(website_temp.averagePickupTime > 1440){
        pickupTimePlus = website_temp.averagePickupTime;
        $('#avgPickupTime').attr('pickupTime',pickupTimePlus)
        $('#avgPickupTime').text(pickupTimePlus/1440);
        $('#avgPickupTimeTxt').text(texts.cpanel.diffTime.days);
    }
}
let pickupTimeUIntervalCheck = false;
let pickupTimeUInterval;
$('body').on('click','#avgPickupTimeU',function(e){
    if(website_temp.averagePickupTime == 0){
        //min
        website_temp.averagePickupTime = 1;
    }else if(website_temp.averagePickupTime + 1 > 1 && website_temp.averagePickupTime + 1 < 60){
        //mins
        website_temp.averagePickupTime = website_temp.averagePickupTime + 1;
    }else if(website_temp.averagePickupTime  == 59){
        //hour
        website_temp.averagePickupTime =  60;
    }else if(website_temp.averagePickupTime + 60 > 119 && website_temp.averagePickupTime + 60 < 1439){
        //hours
        website_temp.averagePickupTime = website_temp.averagePickupTime + 60;
    }else if(website_temp.averagePickupTime == 1380){
        //day
        website_temp.averagePickupTime = 1440;
    }else if(website_temp.averagePickupTime >= 1440){
        //days
        website_temp.averagePickupTime = website_temp.averagePickupTime + 1440;
    }
    resetPickupAvgTime();
    order_pickup_settings_unsave_check();
}).on('mousedown touchstart','#avgPickupTimeU',function(e){
    e.stopImmediatePropagation();
    pickupTimeUIntervalCheck = true;
    pickupTimeUInterval = setInterval(function(){
        $('#avgPickupTimeU').trigger('click');
    },150);
})
let pickupTimeDIntervalCheck = false;
let pickupTimeDInterval;
$('body').on('click','#avgPickupTimeD',function(e){
    if(website_temp.averagePickupTime == 0){
        return;
    }else if(website_temp.averagePickupTime - 1 == 0){
        website_temp.averagePickupTime = website_temp.averagePickupTime - 1;
    }else if(website_temp.averagePickupTime - 1 == 1){
        //mins
        website_temp.averagePickupTime = 1;
    }else if(website_temp.averagePickupTime - 1 > 1 && website_temp.averagePickupTime - 1 < 60){
        website_temp.averagePickupTime = website_temp.averagePickupTime - 1;
    }else if(website_temp.averagePickupTime - 60 == 60 ){
        website_temp.averagePickupTime =  60;
    }else if(website_temp.averagePickupTime - 60 > 60 && website_temp.averagePickupTime - 60 < 1440){
        website_temp.averagePickupTime = website_temp.averagePickupTime - 60;
    }else if(website_temp.averagePickupTime - 1440 == 1440){
        website_temp.averagePickupTime = 1440;
    }else if(website_temp.averagePickupTime - 1440 > 1440){
        website_temp.averagePickupTime = website_temp.averagePickupTime - 1440;
    }
    resetPickupAvgTime();
    order_pickup_settings_unsave_check();
}).on('mousedown touchstart','#avgPickupTimeD',function(e){
    e.stopImmediatePropagation();
    pickupTimeDIntervalCheck = true;
    pickupTimeDInterval = setInterval(function(){
        $('#avgPickupTimeD').trigger('click');
    },150);
})
$('body').on('mouseup touchend',function(e){
    if(pickupTimeUIntervalCheck){
        clearInterval(pickupTimeUInterval);
        pickupTimeUIntervalCheck = false;
    }
    if(pickupTimeDIntervalCheck){
        clearInterval(pickupTimeDInterval);
        pickupTimeDIntervalCheck = false;
    }
});
$('body').on('click','#avgPickupTimeCancelBtn',function(e){
    website_temp.averagePickupTime = website.averagePickupTime;
    resetPickupAvgTime();
    order_pickup_settings_unsave_check();
})
$('body').on('click','#avgPickupTimeSaveBtn',function(e){
    if(!coolDownChecker()){return;}
    showBtnLoading($('#avgPickupTimeSaveBtn'));
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            saveAveragePickupTime:true,
            averagePickupTime:website_temp.averagePickupTime,
        },success:function(r){
            hideBtnLoading($('#avgPickupTimeSaveBtn'));
            if(r.averagePickupTimeStatus == 1){
                showAlert('success',r.msg,4000,true);
                website.averagePickupTime = website_temp.averagePickupTime;
                resetPickupAvgTime();
                order_pickup_settings_unsave_check();
            }else if(r.averagePickupTimeStatus == 0){
                showAlert('error',r.msg,4000,true);
                order_pickup_settings_unsave_check();
            }
        }
    })

})
