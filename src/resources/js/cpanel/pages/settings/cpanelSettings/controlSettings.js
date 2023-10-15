

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

let toolTipDisabledCheck = false;
if(settings_temp.tooltip == false){
    toolTipDisabledCheck = true;
}
tooltip = function(){
    $('html,body').on('mouseleave','[tooltip]',function(e){
        // e.stopImmediatePropagation();
        $('#tooltipDiv').text('');
        $('#tooltipDiv').hide();
    });
    $('html,body').on('mouseenter mouseover mousemove','[tooltip]',function(e){
        // e.stopImmediatePropagation();
        if(toolTipDisabledCheck == true){
            showAlert('warning',texts.settings.tooltipWarnginMsg,8000,true)
        }
        toolTipDisabledCheck = false;
        if($(this).attr('tooltip') == ''){return;}
        window.toolTipElem = $(this);
        if(!window.matchMedia("(pointer: coarse)").matches && settings_temp.tooltip){
            // console.log($(this).attr('tooltip'));
            if(e.pageY < ($(window).height()/2) &&  e.pageX < ($(window).width()/2)){
                $('#tooltipDiv').html($(this).attr('tooltip') ?? $(this).attr('tooltip'));
                $('#tooltipDiv').css({
                    'top':e.pageY + 15 ,
                    'left':e.pageX + 15,
                    'display':'block',
                });
                // console.log('up left')
            }else if(e.pageY > ($(window).height()/2) &&  e.pageX < ($(window).width()/2)){
                $('#tooltipDiv').html($(this).attr('tooltip') ?? $(this).attr('tooltip'));
                $('#tooltipDiv').css({
                    'top':e.pageY - $('#tooltipDiv').height() - 5,
                    'left':e.pageX + 5,
                    'display':'block',
                });
                // console.log('down left')
            }else if(e.pageY < ($(window).height()/2) &&  e.pageX > ($(window).width()/2)){
                $('#tooltipDiv').html($(this).attr('tooltip') ?? $(this).attr('tooltip'));
                $('#tooltipDiv').css({
                    'top':e.pageY + 15,
                    'left':e.pageX - $('#tooltipDiv').width() - 15,
                    'display':'block',
                });
                // console.log('up right')
            }else if(e.pageY > ($(window).height()/2) &&  e.pageX > ($(window).width()/2)){
                $('#tooltipDiv').html($(this).attr('tooltip') ?? $(this).attr('tooltip'));
                $('#tooltipDiv').css({
                    'left':e.pageX - $('#tooltipDiv').width() - 10,
                    'top':e.pageY - $('#tooltipDiv').height() - 10,
                    'display':'block',
                });
            }
        }

        hotKeysToggle(settings_temp.hotKeys)
    });
    $('html,body').on('touchstart','[tooltip]',function(e){
        // e.stopImmediatePropagation();
        if(toolTipDisabledCheck == true){
            showAlert('warning',texts.settings.tooltipWarnginMsg,8000,true)
        }
        toolTipDisabledCheck = false;
        if($(this).attr('tooltip') == ''){return;}
        if( settings_temp.tooltip == true){
            // console.log($(this).attr('tooltip'));
            window.toolTipElem = $(this);
            if(e.originalEvent.touches[0].pageY < ($(window).height()/2) &&  e.originalEvent.touches[0].pageX < ($(window).width()/2)){
                $('#tooltipDiv').html($(this).attr('tooltip') ?? $(this).attr('tooltip'));
                $('#tooltipDiv').css({
                    'top':e.originalEvent.touches[0].pageY + 15 ,
                    'left':e.originalEvent.touches[0].pageX + 15,
                    'display':'block',
                });
                // console.log('up left')
            }else if(e.originalEvent.touches[0].pageY > ($(window).height()/2) && e.originalEvent.touches[0].pageX < ($(window).width()/2)){
                $('#tooltipDiv').html($(this).attr('tooltip') ?? $(this).attr('tooltip'));
                $('#tooltipDiv').css({
                    'top':e.originalEvent.touches[0].pageY - $('#tooltipDiv').height() - 5,
                    'left':e.originalEvent.touches[0].pageX + 5,
                    'display':'block',
                });
                // console.log('down left')
            }else if(e.originalEvent.touches[0].pageY < ($(window).height()/2) &&  e.originalEvent.touches[0].pageX > ($(window).width()/2)){
                $('#tooltipDiv').html($(this).attr('tooltip') ?? $(this).attr('tooltip'));
                $('#tooltipDiv').css({
                    'top':e.originalEvent.touches[0].pageY + 15,
                    'left':e.originalEvent.touches[0].pageX - $('#tooltipDiv').width() - 15,
                    'display':'block',
                });
                // console.log('up right')
            }else if(e.originalEvent.touches[0].pageY > ($(window).height()/2) &&  e.originalEvent.touches[0].pageX > ($(window).width()/2)){
                $('#tooltipDiv').html($(this).attr('tooltip') ?? $(this).attr('tooltip'));
                $('#tooltipDiv').css({
                    'left':e.originalEvent.touches[0].pageX - $('#tooltipDiv').width() - 10,
                    'top':e.originalEvent.touches[0].pageY - $('#tooltipDiv').height() - 10,
                    'display':'block',
                });
                // console.log('down right')
            }
        }
    });
    $('html,body').on('mousemove',function(e){
        // e.stopImmediatePropagation();
        if($('[tooltip]:hover').length == 0){
            $('#tooltipDiv').text('');
            $('#tooltipDiv').hide();
        }
    });
    $('html,body').on('touchend',function(e){
        // e.stopImmediatePropagation();
        $('#tooltipDiv').text('');
        $('#tooltipDiv').hide();
    });
    // $(document).on('mouseover','.optionBtn',function(e){
        // e.stopImmediatePropagation();
        // if($(this).prop('disabled') == true){
            // $('#tooltipDiv').hide();
        // }
    // })

}
tooltip();
updateToolTip = function(){
    if(typeof(window.toolTipElem) === 'undefined'){return;}
    $('#tooltipDiv').html(window.toolTipElem.attr('tooltip'));
}
///share reminder
shareReminder = function(){
    let shareIteml;let shareType;
    if(Math.floor(Math.random() * (2 - 1 + 1)) + 1 == 1){
        shareItem = products[Math.floor(Math.random()*products.length)];
        shareType = 'product';
        share(shareType,shareItem);
    }else{
        shareItem = categories[Math.floor(Math.random()*categories.length)]
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


$('html,body').on('click','#cpanelSettings-tooltip',function(e){
    e.stopImmediatePropagation();
    settings_temp.tooltip = $(this).prop('checked')
    control_panel_settings_unsave_check();
})
$('html,body').on('click','#cpanelSettings-oneAlert',function(e){
    e.stopImmediatePropagation();
    settings_temp.oneAlert = $(this).prop('checked')
    control_panel_settings_unsave_check();
})
$('html,body').on('click','#cpanelSettings-dClickConfirm',function(e){
    e.stopImmediatePropagation();
    settings_temp.dClickConfirm = $(this).prop('checked')
    control_panel_settings_unsave_check();
})
$('html,body').on('click','#cpanelSettings-shareReminder',function(e){
    e.stopImmediatePropagation();
    settings_temp.shareReminder = $(this).prop('checked')
    control_panel_settings_unsave_check();
})
$('html,body').on('click','#cpanelSettings-chatPopup',function(e){
    e.stopImmediatePropagation();
    settings_temp.chatPopup = $(this).prop('checked')
    $('#LiveChat-chatPopup').prop('checked',settings_temp.chatPopup);
    control_panel_settings_unsave_check();
})
$('html,body').on('click','#cpanelSettings-controlSettingsCancelBtn',function(){
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
$('html,body').on('click','#cpanelSettings-controlSettingsSaveBtn',function(e){
    e.stopImmediatePropagation();
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
