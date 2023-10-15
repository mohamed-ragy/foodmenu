avgDeliveryTimeNoSaveCheck = function(){
    if(website_temp.averageDeliveryTime == website.averageDeliveryTime){
        $('.averageDeliveryTime-NoSave').addClass('none');
        return true;
    }else{
        $('.averageDeliveryTime-NoSave').removeClass('none');
        return false;
    }
}
resetDeliverAvgTime = function(){
    let deliveryTimePlus;
    if(website_temp.averageDeliveryTime == 0){
        deliveryTimePlus = 0;
        $('#avgDeliveryTime').attr('deliveryTime',deliveryTimePlus)
        $('#avgDeliveryTime').text('');
        $('#avgDeliveryTimeTxt').text(texts.cpanel.public.asSoonAsPossible);
    }else if(website_temp.averageDeliveryTime == 1){
        deliveryTimePlus = website_temp.averageDeliveryTime;
        $('#avgDeliveryTime').attr('deliveryTime',deliveryTimePlus)
        $('#avgDeliveryTime').text(deliveryTimePlus);
        $('#avgDeliveryTimeTxt').text(texts.cpanel.diffTime.min);
    }else if(website_temp.averageDeliveryTime > 1 && website_temp.averageDeliveryTime < 60){
        deliveryTimePlus = website_temp.averageDeliveryTime;
        $('#avgDeliveryTime').attr('deliveryTime',deliveryTimePlus)
        $('#avgDeliveryTime').text(deliveryTimePlus);
        $('#avgDeliveryTimeTxt').text(texts.cpanel.diffTime.mins);
    }else if(website_temp.averageDeliveryTime == 60){
        deliveryTimePlus = website_temp.averageDeliveryTime;
        $('#avgDeliveryTime').attr('deliveryTime',deliveryTimePlus)
        $('#avgDeliveryTime').text(deliveryTimePlus/60);
        $('#avgDeliveryTimeTxt').text(texts.cpanel.diffTime.hour);
    }else if(website_temp.averageDeliveryTime > 60 && website_temp.averageDeliveryTime < 1440){
        deliveryTimePlus = website_temp.averageDeliveryTime;
        $('#avgDeliveryTime').attr('deliveryTime',deliveryTimePlus)
        $('#avgDeliveryTime').text(deliveryTimePlus/60);
        $('#avgDeliveryTimeTxt').text(texts.cpanel.diffTime.hours);
    }else if(website_temp.averageDeliveryTime == 1440){
        deliveryTimePlus = 1440;
        $('#avgDeliveryTime').attr('deliveryTime',deliveryTimePlus)
        $('#avgDeliveryTime').text(deliveryTimePlus/1440);
        $('#avgDeliveryTimeTxt').text(texts.cpanel.diffTime.day);
    }else if(website_temp.averageDeliveryTime > 1440){
        deliveryTimePlus = website_temp.averageDeliveryTime;
        $('#avgDeliveryTime').attr('deliveryTime',deliveryTimePlus)
        $('#avgDeliveryTime').text(deliveryTimePlus/1440);
        $('#avgDeliveryTimeTxt').text(texts.cpanel.diffTime.days);
    }
}

let deliveryTimeUIntervalCheck = false;
let deliveryTimeUInterval;
$('html,body').on('click','#avgDeliveryTimeU',function(e){
    e.stopImmediatePropagation();
    if(website_temp.averageDeliveryTime == 0){
        //min
        website_temp.averageDeliveryTime = 1;
    }else if(website_temp.averageDeliveryTime + 1 > 1 && website_temp.averageDeliveryTime + 1 < 60){
        //mins
        website_temp.averageDeliveryTime = website_temp.averageDeliveryTime + 1;
    }else if(website_temp.averageDeliveryTime  == 59){
        //hour
        website_temp.averageDeliveryTime =  60;
    }else if(website_temp.averageDeliveryTime + 60 > 119 && website_temp.averageDeliveryTime + 60 < 1439){
        //hours
        website_temp.averageDeliveryTime = website_temp.averageDeliveryTime + 60;
    }else if(website_temp.averageDeliveryTime == 1380){
        //day
        website_temp.averageDeliveryTime = 1440;
    }else if(website_temp.averageDeliveryTime >= 1440){
        //days
        website_temp.averageDeliveryTime = website_temp.averageDeliveryTime + 1440;
    }
    resetDeliverAvgTime();
    home_delivery_settings_unsave_check();
}).on('mousedown touchstart','#avgDeliveryTimeU',function(e){
    e.stopImmediatePropagation();
    deliveryTimeUIntervalCheck = true;
    deliveryTimeUInterval = setInterval(function(){
        $('#avgDeliveryTimeU').trigger('click');
    },150);
})
let deliveryTimeDIntervalCheck = false;
let deliveryTimeDInterval;
$('html,body').on('click','#avgDeliveryTimeD',function(e){
    e.stopImmediatePropagation();
    if(website_temp.averageDeliveryTime == 0){
        return;
    }else if(website_temp.averageDeliveryTime - 1 == 0){
        website_temp.averageDeliveryTime = website_temp.averageDeliveryTime - 1;
    }else if(website_temp.averageDeliveryTime - 1 == 1){
        //mins
        website_temp.averageDeliveryTime = 1;
    }else if(website_temp.averageDeliveryTime - 1 > 1 && website_temp.averageDeliveryTime - 1 < 60){
        website_temp.averageDeliveryTime = website_temp.averageDeliveryTime - 1;
    }else if(website_temp.averageDeliveryTime - 60 == 60 ){
        website_temp.averageDeliveryTime =  60;
    }else if(website_temp.averageDeliveryTime - 60 > 60 && website_temp.averageDeliveryTime - 60 < 1440){
        website_temp.averageDeliveryTime = website_temp.averageDeliveryTime - 60;
    }else if(website_temp.averageDeliveryTime - 1440 == 1440){
        website_temp.averageDeliveryTime = 1440;
    }else if(website_temp.averageDeliveryTime - 1440 > 1440){
        website_temp.averageDeliveryTime = website_temp.averageDeliveryTime - 1440;
    }
    resetDeliverAvgTime();
    home_delivery_settings_unsave_check();
}).on('mousedown touchstart','#avgDeliveryTimeD',function(e){
    e.stopImmediatePropagation();
    deliveryTimeDIntervalCheck = true;
    deliveryTimeDInterval = setInterval(function(){
        $('#avgDeliveryTimeD').trigger('click');
    },150);
})
$(document).on('mouseup touchend',function(e){
    if(deliveryTimeDIntervalCheck){
        clearInterval(deliveryTimeDInterval);
        deliveryTimeDIntervalCheck = false;
    }
    if(deliveryTimeUIntervalCheck){
        clearInterval(deliveryTimeUInterval);
        deliveryTimeUIntervalCheck = false;
    }
});

$('html,body').on('click','#avgDeliveryTimeCancelBtn',function(e){
    e.stopImmediatePropagation();
    website_temp.averageDeliveryTime = website.averageDeliveryTime;
    resetDeliverAvgTime();
    home_delivery_settings_unsave_check();
})
$('html,body').on('click','#avgDeliveryTimeSaveBtn',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    showBtnLoading($('#avgDeliveryTimeSaveBtn'));
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            saveAverageDeliveryTime:true,
            averageDeliveryTime:website_temp.averageDeliveryTime,
        },success:function(r){
            hideBtnLoading($('#avgDeliveryTimeSaveBtn'));
            if(r.averageDeliveryTimeStatus == 1){
                showAlert('success',r.msg,4000,true);
                website.averageDeliveryTime = website_temp.averageDeliveryTime;
                resetDeliverAvgTime();
                home_delivery_settings_unsave_check();
            }else if(r.averageDeliveryTimeStatus == 0){
                showAlert('error',r.msg,4000,true);
                home_delivery_settings_unsave_check();
            }
        }
    })

})
