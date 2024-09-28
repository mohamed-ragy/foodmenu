

/////////////////////control settings functions///////////
controlSettingsNoSaveCheck = function(){
    if(
        settings.tooltip == settings_temp.tooltip &&
        settings.oneAlert == settings_temp.oneAlert &&
        settings.dClickConfirm == settings_temp.dClickConfirm &&
        settings.chatPopup == settings_temp.chatPopup &&
        settings.shareReminder == settings_temp.shareReminder
    ){
        $('.controlSettingsNoSave').addClass('none');
        return true;
    }else{
        $('.controlSettingsNoSave').removeClass('none');
        return false;
    }
}


///share reminder
shareReminder = function(){
    let shareIteml;let shareType;
    if(Math.floor(Math.random() * (2 - 1 + 1)) + 1 == 1){
        shareItem = website.products[Math.floor(Math.random()*website.products.length)];
        shareType = 'product';
        share(shareType,shareItem);
    }else{
        shareItem = website.categories[Math.floor(Math.random()*website.categories.length)]
        shareType = 'category';
        share(shareType,shareItem);
    }
}
setTimeout(function(){
    if(settings_temp.shareReminder && account.authorities[1] ){
        shareReminder();
    }
},60000 * 5)
setInterval(() => {
    if(settings_temp.shareReminder && account.authorities[1] ){
        shareReminder();
    }
}, 60000 * 60);



///////////////////control settings events /////////////////////////////


$('body').on('click','#cpanelSettings-tooltip',function(e){
    settings_temp.tooltip = $(this).prop('checked')
    control_panel_settings_unsave_check();
})
$('body').on('click','#cpanelSettings-oneAlert',function(e){
    settings_temp.oneAlert = $(this).prop('checked')
    control_panel_settings_unsave_check();
})
$('body').on('click','#cpanelSettings-dClickConfirm',function(e){
    settings_temp.dClickConfirm = $(this).prop('checked')
    control_panel_settings_unsave_check();
})
$('body').on('click','#cpanelSettings-shareReminder',function(e){
    settings_temp.shareReminder = $(this).prop('checked')
    control_panel_settings_unsave_check();
})
$('body').on('click','#cpanelSettings-chatPopup',function(e){
    settings_temp.chatPopup = $(this).prop('checked')
    $('#LiveChat-chatPopup').prop('checked',settings_temp.chatPopup);
    control_panel_settings_unsave_check();
})
$('body').on('click','#cpanelSettings-controlSettingsCancelBtn',function(){
    settings_temp.tooltip = settings.tooltip
    settings_temp.oneAlert = settings.oneAlert
    settings_temp.dClickConfirm = settings.dClickConfirm
    settings_temp.shareReminder = settings.shareReminder
    settings_temp.chatPopup = settings.chatPopup
    $('#cpanelSettings-tooltip').prop('checked',settings.tooltip);
    $('#cpanelSettings-oneAlert').prop('checked',settings.oneAlert);
    $('#cpanelSettings-dClickConfirm').prop('checked',settings.dClickConfirm);
    $('#cpanelSettings-shareReminder').prop('checked',settings.shareReminder);
    $('#cpanelSettings-chatPopup').prop('checked',settings.chatPopup);
    $('#LiveChat-chatPopup').prop('checked',settings.chatPopup);
    control_panel_settings_unsave_check();
})
$('body').on('click','#cpanelSettings-controlSettingsSaveBtn',function(e){
    if(!coolDownChecker()){return;}
    showBtnLoading($('#cpanelSettings-controlSettingsSaveBtn'))
    if($('#cpanelSettings-tooltip').prop('checked')){tooltip = 1}else{tooltip = 0}
    if($('#cpanelSettings-oneAlert').prop('checked')){oneAlert = 1}else{oneAlert = 0}
    if($('#cpanelSettings-dClickConfirm').prop('checked')){dClickConfirm = 1}else{dClickConfirm = 0}
    if($('#cpanelSettings-shareReminder').prop('checked')){shareReminder = 1}else{shareReminder = 0}
    if($('#cpanelSettings-chatPopup').prop('checked')){chatPopup = 1}else{chatPopup = 0}

    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            saveControlSettings:true,
            tooltip:tooltip,
            oneAlert:oneAlert,
            dClickConfirm:dClickConfirm,
            shareReminder:shareReminder,
            chatPopup:chatPopup,
        },
        success:function(response){
            hideBtnLoading($('#cpanelSettings-controlSettingsSaveBtn'))
            if(response.saveControlSettingsStatus == 1){
                showAlert('success',response.msg,4000,true);
                settings_temp.tooltip = tooltip;
                settings_temp.oneAlert = oneAlert;
                settings_temp.dClickConfirm = dClickConfirm;
                settings_temp.shareReminder = shareReminder;
                settings_temp.chatPopup = chatPopup;
                settings.tooltip = tooltip;
                settings.oneAlert = oneAlert;
                settings.dClickConfirm = dClickConfirm;
                settings.shareReminder = shareReminder;
                settings.chatPopup = chatPopup;
                control_panel_settings_unsave_check();
            }else if(response.saveControlSettingsStatus == 0){
                showAlert('error',response.msg,4000,true);

            }
        }
    })
})
