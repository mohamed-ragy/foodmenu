/////////////////////////////////time zone//////////////////////////////////////

timeZoneNoSaveCheck = function(){
    if(!account.authorities[4]){return true;}
    if(website.hour12 == website_temp.hour12
        && website.timeZone == website_temp.timeZone
    ){
        $('.system-timeZone-noSave').addClass('none');
        return true;
    }else{
        $('.system-timeZone-noSave').removeClass('none');
        return false
    }
}
$('html,body').on('change','#system-timeZone-hour12',function(e){
    e.stopImmediatePropagation();
    website_temp.hour12 = $(this).prop('checked');
    system_unsave_check();
});

$('html,body').on('click','#system-timeZonesList .inputListElement',function(e){
    website_temp.timeZone = $(this).attr('key');
    system_unsave_check()
})
$('html,body').on('keyup','#system-timeZones',function(e){
    e.stopImmediatePropagation();
    console.log('gaga')
    website_temp.timeZone = $('#system-timeZones').attr('key');
    system_unsave_check()
});

$('html,body').on('click','#system-timeZoneCancelBtn',function(e){
    e.stopImmediatePropagation();
    if(!account.authorities[4]){return;}
    website_temp.hour12 = website.hour12;
    $('#system-timeZone-hour12').prop('checked',website.hour12);
    website_temp.timeZone = website.timeZone;
    $('#system-timeZonesList').children().each(function(){
        if($(this).attr('key') == website.timeZone){
            $(this).trigger('click');
        }
    })
    // system_unsave_check();
});

$('html,body').on('click','#system-timeZoneSaveBtn',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    showBtnLoading($('#system-timeZoneSaveBtn'));
    let hour12 = false;
    $('#system-timeZone-hour12').prop('checked') == true ?  hour12 = 1 : hour12 = 0;
    let saveTimeZone = $('#system-timeZones').attr('key');
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            saveTimeZone:saveTimeZone,
            hour12:hour12,
        },
        success:function(response){
            hideBtnLoading($('#system-timeZoneSaveBtn'));
            if(response.saveTimeZoneStatus == 1){
                showAlert('success',response.msg,4000,true);
                website.timeZone = saveTimeZone;
                website.hour12 = hour12;
                website_temp.timeZone = saveTimeZone;
                website_temp.hour12 = hour12;
                system_unsave_check();
                timePickerAMPMRest();
            }else if(response.saveTimeZoneStatus == 0){
                showAlert('error',response.msg,4000,true);
            }
        }
    });
});
getTimeZones = function(){
    for(const key in window.timeZones){
        const timeZone = window.timeZones[key];
        let timeZoneName;
        if(account.language == 'en'){timeZoneName = timeZone.en;}
        else if(account.language == 'ar'){timeZoneName = timeZone.ar;}
        else if(account.language == 'fr'){timeZoneName = timeZone.fr;}
        else if(account.language == 'de'){timeZoneName = timeZone.de;}
        else if(account.language == 'it'){timeZoneName = timeZone.it;}
        else if(account.language == 'es'){timeZoneName = timeZone.es;}
        else if(account.language == 'ru'){timeZoneName = timeZone.ru;}
        else if(account.language == 'ua'){timeZoneName = timeZone.ua;}
        else{countryName = country.en;}

        addToInputList($('#system-timeZonesList'),timeZoneName,timeZone.code);

        if(website_temp.timeZone == timeZone.code){
            $('#system-timeZones').val(timeZoneName);
            $('#system-timeZones').attr('key',timeZone.code);
        }
    }
    setInterval(function(){
        const timeNow = new Date();
        try{
            liveTimeNow = timeNow.toLocaleTimeString(account.language, {hour12 :$('#system-timeZone-hour12').prop('checked'),timeZone:$('#system-timeZones').val()});
        }catch{
            liveTimeNow = '--:--:-- --';
        }
        $('#system-timeZoneTimeNow').text(liveTimeNow)
    },1000);
    system_unsave_check();
}


