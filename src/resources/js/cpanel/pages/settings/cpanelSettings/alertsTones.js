
apendAlertCard = function(container,alert,toneClass){
    let iconClass = 'ico-music';
    if(alert.id == 0){iconClass = 'ico-mute'}
    container.append(
        $('<div/>',{
            class:'alertToneCard '+toneClass,
            url:alert.url,
            alertId:alert.id
        }).append(
            $('<span/>',{class:iconClass}),
            $('<span/>',{class:'mX5 fs08',text:alert[account.language]}),
            $('<span/>',{class:'ico-check0 fs08'})
        )
    )
}
setAlertsTones = function(){
    for (const key in window.alertTones ) {
        const alert = window.alertTones[key];
        if(alert.id == settings_temp.normalAlert){
            $('#alert_normal').attr('src', alert.url)[0];
        }
        if(alert.id == settings_temp.errorAlert){
            $('#alert_error').attr('src', alert.url)[0];
        }
        if(alert.id == settings_temp.successAlert){
            $('#alert_success').attr('src', alert.url)[0];
        }
        if(alert.id == settings_temp.warningAlert){
            $('#alert_warning').attr('src', alert.url)[0];
        }
        if(alert.id == settings_temp.newMsgAlert){
            $('#newChatMsgSound').attr('src', alert.url)[0];
        }
    }

    $('.infoAlertToneCard').find('.ico-check1').removeClass('ico-check1').addClass('ico-check0');
    $('.errorAlertToneCard').find('.ico-check1').removeClass('ico-check1').addClass('ico-check0');
    $('.successAlertToneCard').find('.ico-check1').removeClass('ico-check1').addClass('ico-check0');
    $('.warningAlertToneCard').find('.ico-check1').removeClass('ico-check1').addClass('ico-check0');
    $('.newMsgAlertToneCard').find('.ico-check1').removeClass('ico-check1').addClass('ico-check0');

    $(`.infoAlertToneCard[alertid="${settings_temp.normalAlert}"]`).find('.ico-check0').removeClass('ico-check0').addClass('ico-check1');
    $(`.errorAlertToneCard[alertid="${settings_temp.errorAlert}"]`).find('.ico-check0').removeClass('ico-check0').addClass('ico-check1');
    $(`.successAlertToneCard[alertid="${settings_temp.successAlert}"]`).find('.ico-check0').removeClass('ico-check0').addClass('ico-check1');
    $(`.warningAlertToneCard[alertid="${settings_temp.warningAlert}"]`).find('.ico-check0').removeClass('ico-check0').addClass('ico-check1');

    if(settings_temp.newMsgAlert == 0){
        $(`.newMsgAlertToneCard[alertid="0"]`).find('.ico-check0').removeClass('ico-check0').addClass('ico-check1');
        $('#navLiveChat-mute').find('.navLiveChat-muteCheck').addClass('ico-check1').removeClass('ico-check0')
    }else{
        $(`.newMsgAlertToneCard[alertid="${settings_temp.newMsgAlert}"]`).find('.ico-check0').removeClass('ico-check0').addClass('ico-check1');
        $('#navLiveChat-mute').find('.navLiveChat-muteCheck').removeClass('ico-check1').addClass('ico-check0')
    }
}

alertTonesNoSaveCheck = function(){
    normalAlertNoSaveCheck();
    errorAlertNoSaveCheck();
    successAlertNoSaveCheck();
    warningAlertNoSaveCheck();
    newChatMegAlertToneNoSaveCheck();
    if(
        normalAlertNoSaveCheck() &&
        errorAlertNoSaveCheck() &&
        successAlertNoSaveCheck() &&
        warningAlertNoSaveCheck() &&
        newChatMegAlertToneNoSaveCheck()
    ){
        $('.alertToneSettingsNoSave').addClass('none');
        return true;
    }else{
        $('.alertToneSettingsNoSave').removeClass('none');
        return false;
    }
}

///////////////////////////////////normal alert tone/////////////////////////////////////////
normalAlertNoSaveCheck = function(){
    if(settings.normalAlert == settings_temp.normalAlert){
        $('.infoToneNotSaved').addClass('none');
        return true;
    }else{
        $('.infoToneNotSaved').removeClass('none');
        return false;
    }
}
$('html,body').on('click','.infoAlertToneCard',function(e){
    e.stopImmediatePropagation();
    settings_temp.normalAlert = $(this).attr('alertId');
    $('.infoAlertToneCard').find('.ico-check1').removeClass('ico-check1').addClass('ico-check0');
    $(this).find('.ico-check0').removeClass('ico-check0').addClass('ico-check1');
    $('#alert_normal').attr('src', $(this).attr('url'))[0];
    $('#alert_normal')[0].play();
    control_panel_settings_unsave_check();
});
$('html,body').on('click','#cpanelSettings-infoAlerrtToneCancelBtn',function(e){
    e.stopImmediatePropagation();
    settings_temp.normalAlert = settings.normalAlert;
    setAlertsTones();
    control_panel_settings_unsave_check();
});
$('html,body').on('click','#cpanelSettings-infoAlerrtToneSaveBtn',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    if(!window.alertsTonesFirstLoad){return;}
    showBtnLoading($('#cpanelSettings-infoAlerrtToneSaveBtn'));
    $('#alertSelectToneContainerTones-info').children().each(function(){
        if($(this).find('.ico-check1').hasClass('ico-check1')){
            $.ajax({
                url:'settings',
                type:'put',
                data:{
                    _token: $('meta[name="csrf-token"]').attr("content"),
                    saveAlertTone:true,
                    alert:'info',
                    tone:$(this).attr('alertid'),
                },
                success:function(response){
                    hideBtnLoading($('#cpanelSettings-infoAlerrtToneSaveBtn'));
                    if(response.saveInfoAlertToneStatus == 1){
                        settings.normalAlert = settings_temp.normalAlert;
                        showAlert('success',response.msg,4000,true);
                        // setAlertsTones();
                        control_panel_settings_unsave_check();
                    }else if(response.saveInfoAlertToneStatus == 0){
                        showAlert('error',response.msg,4000,true);

                    }
                }
            });
        }
    });
});
///////////////////////////////////erro alert tone //////////////////////////////////////
errorAlertNoSaveCheck = function(){
    if(settings.errorAlert == settings_temp.errorAlert){
        $('.errorToneNotSaved').addClass('none');
        return true;
    }else{
        $('.errorToneNotSaved').removeClass('none');
        return false;
    }
}
$('html,body').on('click','.errorAlertToneCard',function(e){
    e.stopImmediatePropagation();
    settings_temp.errorAlert = $(this).attr('alertId');
    $('.errorAlertToneCard').find('.ico-check1').removeClass('ico-check1').addClass('ico-check0');
    $(this).find('.ico-check0').removeClass('ico-check0').addClass('ico-check1');
    $('#alert_error').attr('src', $(this).attr('url'))[0];
    $('#alert_error')[0].play();
    control_panel_settings_unsave_check();
});
 $('html,body').on('click','#cpanelSettings-errorAlerrtToneCancelBtn',function(e){
    e.stopImmediatePropagation();
    settings_temp.errorAlert = settings.errorAlert;
    setAlertsTones();
    control_panel_settings_unsave_check();
});
$('html,body').on('click','#cpanelSettings-errorAlerrtToneSaveBtn',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    if(!window.alertsTonesFirstLoad){return;}
    showBtnLoading($('#cpanelSettings-errorAlerrtToneSaveBtn'));
    $('#alertSelectToneContainerTones-error').children().each(function(){
        if($(this).find('.ico-check1').hasClass('ico-check1')){
            $.ajax({
                url:'settings',
                type:'put',
                data:{
                    _token: $('meta[name="csrf-token"]').attr("content"),
                    saveAlertTone:true,
                    alert:'error',
                    tone:$(this).attr('alertid'),
                },
                success:function(response){
                    hideBtnLoading($('#cpanelSettings-errorAlerrtToneSaveBtn'));
                    if(response.saveErrorAlertToneStatus == 1){
                        settings.errorAlert = settings_temp.errorAlert;
                        showAlert('success',response.msg,4000,true);
                        control_panel_settings_unsave_check();
                    }else if(response.saveErrorAlertToneStatus == 0){
                        showAlert('error',response.msg,4000,true);

                    }
                }
            });
        }
    });
});

///////////////////////////////////success alert tone //////////////////////////////////////
successAlertNoSaveCheck = function(){
    if(settings.successAlert == settings_temp.successAlert){
        $('.successToneNotSaved').addClass('none');
        return true;
    }else{
        $('.successToneNotSaved').removeClass('none');
        return false;
    }
}
$('html,body').on('click','.successAlertToneCard',function(e){
    e.stopImmediatePropagation();
    settings_temp.successAlert = $(this).attr('alertId');
    $('.successAlertToneCard').find('.ico-check1').removeClass('ico-check1').addClass('ico-check0');
    $(this).find('.ico-check0').removeClass('ico-check0').addClass('ico-check1');
    $('#alert_success').attr('src', $(this).attr('url'))[0];
    $('#alert_success')[0].play();
    control_panel_settings_unsave_check();
});
 $('html,body').on('click','#cpanelSettings-successAlerrtToneCancelBtn',function(e){
    e.stopImmediatePropagation();
    settings_temp.successAlert = settings.successAlert;
    setAlertsTones();
    control_panel_settings_unsave_check();
});
$('html,body').on('click','#cpanelSettings-successAlerrtToneSaveBtn',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    if(!window.alertsTonesFirstLoad){return;}
    showBtnLoading($('#cpanelSettings-successAlerrtToneSaveBtn'));
    $('#alertSelectToneContainerTones-success').children().each(function(){
        if($(this).find('.ico-check1').hasClass('ico-check1')){
            $.ajax({
                url:'settings',
                type:'put',
                data:{
                    _token: $('meta[name="csrf-token"]').attr("content"),
                    saveAlertTone:true,
                    alert:'success',
                    tone:$(this).attr('alertid'),
                },
                success:function(response){
                    hideBtnLoading($('#cpanelSettings-successAlerrtToneSaveBtn'));
                    if(response.saveSuccessAlertToneStatus == 1){
                        settings.successAlert = settings_temp.successAlert;
                        showAlert('success',response.msg,4000,true);
                        control_panel_settings_unsave_check();
                    }else if(response.saveSuccessAlertToneStatus == 0){
                        showAlert('error',response.msg,4000,true);

                    }
                }
            });
        }
    });
});

///////////////////////////////////warning alert tone //////////////////////////////////////
warningAlertNoSaveCheck = function(){
    if(settings.warningAlert == settings_temp.warningAlert){
        $('.warningToneNotSaved').addClass('none');
        return true;
    }else{
        $('.warningToneNotSaved').removeClass('none');
        return false;
    }
}
$('html,body').on('click','.warningAlertToneCard',function(e){
    e.stopImmediatePropagation();
    settings_temp.warningAlert = $(this).attr('alertId');
    $('.warningAlertToneCard').find('.ico-check1').removeClass('ico-check1').addClass('ico-check0');
    $(this).find('.ico-check0').removeClass('ico-check0').addClass('ico-check1');
    $('#alert_warning').attr('src', $(this).attr('url'))[0];
    $('#alert_warning')[0].play();
    control_panel_settings_unsave_check();
});
$('html,body').on('click','#cpanelSettings-warningAlerrtToneCancelBtn',function(e){
    e.stopImmediatePropagation();
    settings_temp.warningAlert = settings.warningAlert;
    setAlertsTones();
    control_panel_settings_unsave_check();
});
$('html,body').on('click','#cpanelSettings-warningAlerrtToneSaveBtn',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    if(!window.alertsTonesFirstLoad){return;}
    showBtnLoading($('#cpanelSettings-warningAlerrtToneSaveBtn'));
    $('#alertSelectToneContainerTones-warning').children().each(function(){
        if($(this).find('.ico-check1').hasClass('ico-check1')){
            $.ajax({
                url:'settings',
                type:'put',
                data:{
                    _token: $('meta[name="csrf-token"]').attr("content"),
                    saveAlertTone:true,
                    alert:'warning',
                    tone:$(this).attr('alertid'),
                },
                success:function(response){
                    hideBtnLoading($('#cpanelSettings-warningAlerrtToneSaveBtn'));
                    if(response.saveWarningAlertToneStatus == 1){
                        settings.warningAlert = settings_temp.warningAlert;
                        showAlert('success',response.msg,4000,true);
                        control_panel_settings_unsave_check();
                    }else if(response.saveWarningAlertToneStatus == 0){
                        showAlert('error',response.msg,4000,true);

                    }
                }
            });
        }
    });
});
///////////////////////////////////chat alert tone //////////////////////////////////////
newChatMegAlertToneNoSaveCheck = function(){
    if(settings.newMsgAlert == settings_temp.newMsgAlert){
        $('.newMsgAlertToneNotSaved').addClass('none');
        return true;
    }else{
        $('.newMsgAlertToneNotSaved').removeClass('none');
        return false;
    }
}

$('html,body').on('click','.newMsgAlertToneCard',function(e){
    e.stopImmediatePropagation();
    settings_temp.newMsgAlert = $(this).attr('alertId');
    $('.newMsgAlertToneCard').find('.ico-check1').removeClass('ico-check1').addClass('ico-check0');
    $(this).find('.ico-check0').removeClass('ico-check0').addClass('ico-check1');
    $('#newChatMsgSound').attr('src', $(this).attr('url'))[0];
    $('#newChatMsgSound')[0].play();
    if(settings_temp.newMsgAlert == 0){
        $('#navLiveChat-mute').find('.navLiveChat-muteCheck').addClass('ico-check1').removeClass('ico-check0')
    }else{
        $('#navLiveChat-mute').find('.navLiveChat-muteCheck').removeClass('ico-check1').addClass('ico-check0')
    }
    control_panel_settings_unsave_check();
});
$('html,body').on('click','#cpanelSettings-newMsgAlertToneCancelBtn',function(e){
    e.stopImmediatePropagation();
    settings_temp.newMsgAlert = settings.newMsgAlert;
    if(settings.newMsgAlert == 0){
        $('#navLiveChat-mute').find('.navLiveChat-muteCheck').addClass('ico-check1').removeClass('ico-check0')
    }else{
        $('#navLiveChat-mute').find('.navLiveChat-muteCheck').removeClass('ico-check1').addClass('ico-check0')
    }
    setAlertsTones();
    control_panel_settings_unsave_check();
});
$('html,body').on('click','#cpanelSettings-newMsgAlertToneSaveBtn',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    if(!window.alertsTonesFirstLoad){return;}
    showBtnLoading($('#cpanelSettings-newMsgAlertToneSaveBtn'));
    $('#alertSelectToneContainerTones-chat').children().each(function(){
        if($(this).find('.ico-check1').hasClass('ico-check1')){
            $.ajax({
                url:'settings',
                type:'put',
                data:{
                    _token: $('meta[name="csrf-token"]').attr("content"),
                    saveAlertTone:true,
                    alert:'newMsgAlert',
                    tone:$(this).attr('alertid'),
                },
                success:function(response){
                    hideBtnLoading($('#cpanelSettings-newMsgAlertToneSaveBtn'));
                    if(response.savenewMsgAlertStatus == 1){
                        settings.newMsgAlert = settings_temp.newMsgAlert;
                        showAlert('success',response.msg,4000,true);
                        control_panel_settings_unsave_check();
                    }else if(response.savenewMsgAlertStatus == 0){
                        showAlert('error',response.msg,4000,true);

                    }
                }
            });
        }
    });
});
