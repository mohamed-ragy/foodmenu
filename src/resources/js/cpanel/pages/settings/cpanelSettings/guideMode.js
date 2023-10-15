


////////////////////guid mode functions/////////////////

guideModeNoSaveCheck = function(){
    if($(window).width() < 1360 && settings_temp.guideHints == settings.guideHints){
        $('.guideModeNoSave').addClass('none');
        return true;
    }
    if(settings_temp.guideMode == false){
        if(settings_temp.guideMode == settings.guideMode && settings_temp.guideHints == settings.guideHints){
            $('.guideModeNoSave').addClass('none');
            return true;
        }else{
            $('.guideModeNoSave').removeClass('none');
            return false;
        }
    }else if(
        settings_temp.guideMode == settings.guideMode &&
        settings_temp.autoHelp == settings.autoHelp &&
        settings_temp.helpIcons== settings.helpIcons &&
        settings_temp.guideHints == settings.guideHints
    ){
        $('.guideModeNoSave').addClass('none');
        return true;
    }else{
        $('.guideModeNoSave').removeClass('none');
        return false;
    }
}
loadGuideModeSettings = function(){
    guideModeToggle(settings.guideMode);
    if(!settings.guideMode || $(window).width() < 1360){
        helpIconsToggle(false);
        autoHelpToggle(false);
        guideHintsToggle(settings.guideHints);
    }else{
        helpIconsToggle(settings.helpIcons);
        autoHelpToggle(settings.autoHelp);
        guideHintsToggle(settings.guideHints);
    }
}
guideModeToggle = function(action,check=true){
    if(action == true){
        if($(window).width() < 1360){
            guideModeNo(check);
        }else{
            guideModeYes(check);
        }
    }
    else if(action == false){guideModeNo(check);}
    control_panel_settings_unsave_check();
}


guideModeYes = function(check=true){
    check ? settings_temp.guideMode = true : null;
    check ? $('#cpanelSettings-GuideMode').prop('checked',true) : null;
    settings_temp.helpIcons = settings.helpIcons
    settings_temp.autoHelp = settings.autoHelp
    helpIconsToggle(settings.helpIcons);
    autoHelpToggle(settings.autoHelp);
    $('#helpWindow').removeClass('hideHelpWindow').addClass('showHelpWindow')
    $('#bodyPage').removeClass('bodyPage_noHelpWindow').addClass('bodyPage_helpWindow')
    $('#helpWindowControls').removeClass('helpWindowControls_hide');
    setTimeout(function(){
        $('#popupPage').css('max-width',$(window).width() - ($('#helpWindow').width() +20) )
        loadPinnedHelp();
    },500)
}
guideModeNo = function(check=true){
    check ? settings_temp.guideMode = false : null;
    check ? $('#cpanelSettings-GuideMode').prop('checked',false) : null;
    helpIconsToggle(false);
    autoHelpToggle(false);
    $('#helpWindow').addClass('hideHelpWindow').removeClass('showHelpWindow')
    $('#bodyPage').addClass('bodyPage_noHelpWindow').removeClass('bodyPage_helpWindow')
    $('#helpWindowControls').addClass('helpWindowControls_hide');
    setTimeout(function(){
        $('#popupPage').css('max-width',$(window).width() - ($('#helpWindow').width() +20) )
    },500)
}
helpIconsToggle = function(action){
    if(action == true){
        if($(window).width() <= 1360 || !settings_temp.guideMode){
            showAlert('error',texts.settings.guideModeNo,4000,true);
            setTimeout(function(){
                settings_temp.helpIcons = false;
                $('#cpanelSettings-helpIcons').prop('checked',false);
            },250);
            $('.help-icon').hide();
        }else{
            settings_temp.helpIcons = true;
            $('#cpanelSettings-helpIcons').prop('checked',true);
            $('.help-icon').show();
        }

    }else if(action == false){
        settings_temp.helpIcons = false;
        $('#cpanelSettings-helpIcons').prop('checked',false);
        $('.help-icon').hide();
    }
    control_panel_settings_unsave_check();
}
autoHelpToggle = function(action){
    if(action == true){
        if($(window).width() <= 1360 || !settings_temp.guideMode){
            showAlert('error',texts.settings.guideModeNo,4000,true);
            setTimeout(function(){
                settings_temp.autoHelp = false;
                $('#cpanelSettings-autoHelp').prop('checked',false);
            },250);
        }else{
            settings_temp.autoHelp = true;
            $('#cpanelSettings-autoHelp').prop('checked',true);
        }
    }else if(action == false){
        settings_temp.autoHelp = false;
        $('#cpanelSettings-autoHelp').prop('checked',false);
    }
    control_panel_settings_unsave_check();
}
guideHintsToggle = function(action){
    if(action == true){
        settings_temp.guideHints = true;
        $('#cpanelSettings-guideHints').prop('checked',true);
        $('#guideHints').show();
    }else if(action == false){
        settings_temp.guideHints = false;
        $('#cpanelSettings-guideHints').prop('checked',false);
        $('#guideHints').hide();
    }
    control_panel_settings_unsave_check();
}
hotkeys = function(){
    $(document).bind('keydown', function(e) {
        ////guide mode
        if (e.ctrlKey && e.which == 71) {
            e.preventDefault();
            if(window.history.state.page == 'statistics_and_analytics'){
                return;
            }
            settings_temp.guideMode ?  guideModeToggle(false) : guideModeToggle(true);
        }
        if (e.ctrlKey && e.which == 73) {
            e.preventDefault();
            settings_temp.helpIcons ? helpIconsToggle(false) : helpIconsToggle(true);
        }
        if (e.ctrlKey && e.which == 72) {
            e.preventDefault();
            settings_temp.autoHelp ? autoHelpToggle(false) : autoHelpToggle(true);
        }
        if (e.ctrlKey && e.which == 65) {
            e.preventDefault();
            settings_temp.guideHints ? guideHintsToggle(false) : guideHintsToggle(true);
        }
        if(e.ctrlKey && e.which == 66){
            e.preventDefault();
            $('.autoHelpContainer').each(function(){
                if($(this).is(':hover')){
                    $(`.autoHelpContainer[helpnumber="${$(this).attr('helpnumber')}"]`).find('.autoHelpPinUnpin').trigger('click')
                }
            });
            $('[autohelp]').each(function(){
                if($(this).is(':hover')){
                    $(`.autoHelpContainer[helpnumber="${$(this).attr('autoHelp')}"]`).find('.autoHelpPinUnpin').trigger('click')
                }
            })
            $('.help-icon').each(function(){
                if($(this).is(':hover')){
                    $(`.autoHelpContainer[helpnumber="${$(this).attr('helpId')}"]`).find('.autoHelpPinUnpin').trigger('click')
                }
            })
        }
        if (e.altKey && e.which == 78 ) {
            e.preventDefault();
            $('#autoHelp-miniAll').trigger('click');
        }
        if (e.altKey && e.which == 77 ) {
            e.preventDefault();
            $('#autoHelp-maxAll').trigger('click');
        }
        if (e.altKey && e.which == 67 ) {
            e.preventDefault();
            $('#autoHelp-clearUnpinned').trigger('click');
        }
        if (e.altKey && e.which == 88 ) {
            e.preventDefault();
            $('#autoHelp-clearAll').trigger('click');
        }

        //general
        if(e.which == 112){
            e.preventDefault();
            showPopup('cpanelHelp');
        }
        if(e.which == 27){
            if(!$('#imgs-imgPreview').hasClass('none')){
                $('#imgs-imgPreviewClose').trigger('click');
            }else if(!$('.popupContainer').hasClass('none')){
                closePopup();
            }else if($('#popupPage').css('right') == '0px' || $('#popupPage').css('left') == '0px'){
                $('#popupPageClose').trigger('click')
            }else{
                $('.chatWindow').each(function(){
                    if($(this).hasClass('activeChatWindow')){
                        let chat = new chatWindow($(this).attr('userId'));
                        chat.close();
                    }
                });
                $('#windowsCover_autoHelp').text('');
                $('#windowsCover_autoHelp').hide();
            }
        }
        if(e.shiftKey && e.ctrlKey && e.which == 76){
            $('#logoutForm').trigger('submit');
        }
        if(e.altKey && e.which == 65){
            $('#alertsContainer').text('')
        }
        //view settings
        if (e.ctrlKey && e.which == 75 ) {
            e.preventDefault();
            settings_temp.hotKeys ? hotKeysToggle(false) : hotKeysToggle(true);
        }
        if (e.ctrlKey && e.which == 77 ) {
            e.preventDefault();
            settings_temp.bigSideMenu ? sideMenuIconsToggle(false) : sideMenuIconsToggle(true);
        }
        if (e.ctrlKey && e.which == 83 ) {
            e.preventDefault();
            settings_temp.statusBar ? statusBarToggle(false) : statusBarToggle(true);
        }
        if (e.ctrlKey && e.which == 68 ) {
            e.preventDefault();
            settings_temp.darkMode ? darkModeToogle(false) : darkModeToogle(true) ;
        }


    });
}
hotkeys();

/////////////guide Mode events/////////////////
$('html,body').on('click','#cpanelSettings-GuideMode',function(e){
    e.stopImmediatePropagation();
    settings_temp.guideMode = $('#cpanelSettings-GuideMode').prop('checked')
    if(settings_temp.guideMode == true && $(window).width() < 1360){
        setTimeout(function(){
            showAlert('error',texts.settings.cantForScreenLessThan1360,4000,true);
            $('#cpanelSettings-GuideMode').prop('checked',false);
            settings_temp.guideMode = false;
            guideModeToggle(false)
        },250);
    }else{
        guideModeToggle(settings_temp.guideMode);
    }
    control_panel_settings_unsave_check();
})
$('html,body').on('click','#cpanelSettings-helpIcons',function(e){
    e.stopImmediatePropagation();
    settings_temp.helpIcons = $('#cpanelSettings-helpIcons').prop('checked')
    helpIconsToggle(settings_temp.helpIcons);
    control_panel_settings_unsave_check();
})
$('html,body').on('click','#cpanelSettings-autoHelp',function(e){
    e.stopImmediatePropagation();
    settings_temp.autoHelp = $('#cpanelSettings-autoHelp').prop('checked')
    autoHelpToggle(settings_temp.autoHelp);
    control_panel_settings_unsave_check();
})
$('html,body').on('click','#cpanelSettings-guideHints',function(e){
    e.stopImmediatePropagation();
    settings_temp.guideHints = $('#cpanelSettings-guideHints').prop('checked')
    guideHintsToggle(settings_temp.guideHints);
    control_panel_settings_unsave_check();
})
$('html,body').on('click','#cpanelSettings-GuideModeCancelBtn',function(e){
    e.stopImmediatePropagation();
    settings_temp.guideMode = settings.guideMode;
    settings_temp.autoHelp = settings.autoHelp;
    settings_temp.helpIcons = settings.helpIcons;
    settings_temp.guideHints = settings.guideHints;
    if($(window).width() < 1360){
        $('#cpanelSettings-guideHints').prop('checked',settings_temp.guideHints);
        guideHintsToggle(settings_temp.guideHints)
        control_panel_settings_unsave_check();
        return;
    }
    if(settings.guideMode == false){
        $('#cpanelSettings-GuideMode').prop('checked',settings_temp.guideMode);
        $('#cpanelSettings-autoHelp').prop('checked',false);
        $('#cpanelSettings-helpIcons').prop('checked',false);
        $('#cpanelSettings-guideHints').prop('checked',settings_temp.guideHints);
    }else{
        $('#cpanelSettings-GuideMode').prop('checked',settings_temp.guideMode);
        $('#cpanelSettings-autoHelp').prop('checked',settings_temp.autoHelp);
        $('#cpanelSettings-helpIcons').prop('checked',settings_temp.helpIcons);
        $('#cpanelSettings-guideHints').prop('checked',settings_temp.guideHints);
    }
    guideHintsToggle(settings.guideHints)
    helpIconsToggle(settings.helpIcons);
    autoHelpToggle(settings.autoHelp);
    guideModeToggle(settings.guideMode);
    control_panel_settings_unsave_check();
})
$('html,body').on('click','#cpanelSettings-GuideModeSaveBtn',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    showBtnLoading($('#cpanelSettings-GuideModeSaveBtn'))
    let guideMode; let autoHelp; let helpIcons;
    if($('#cpanelSettings-guideHints').prop('checked')){guideHintsCheck = 1}else{guideHintsCheck = 0}
    if($(window).width() < 1360){
        guideMode = settings.guideMode
        autoHelp = settings.autoHelp
        helpIcons = settings.helpIcons
    }else{
        if(settings_temp.guideMode == true){
            if($('#cpanelSettings-GuideMode').prop('checked')){guideMode = 1}else{guideMode = 0}
            if($('#cpanelSettings-autoHelp').prop('checked')){autoHelp = 1}else{autoHelp = 0}
            if($('#cpanelSettings-helpIcons').prop('checked')){helpIcons = 1}else{helpIcons = 0}
        }else{
            if($('#cpanelSettings-GuideMode').prop('checked')){guideMode = 1}else{guideMode = 0}
            autoHelp = settings.autoHelp
            helpIcons = settings.helpIcons
        }
    }

    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            saveGuideMode:true,
            guideMode:guideMode,
            autoHelp:autoHelp,
            helpIcons:helpIcons,
            guideHints:guideHintsCheck,
        },
        success:function(response){
            hideBtnLoading($('#cpanelSettings-GuideModeSaveBtn'))
            if(response.saveGuideModeStatus == 1){
                showAlert('success',response.msg,4000,true);
                settings.guideMode = guideMode;
                settings.autoHelp = autoHelp;
                settings.helpIcons = helpIcons;
                settings.guideHints = guideHintsCheck;
                settings_temp.guideMode = guideMode;
                settings_temp.autoHelp = autoHelp;
                settings_temp.helpIcons = helpIcons;
                settings_temp.guideHints = guideHintsCheck;
                control_panel_settings_unsave_check();
            }else if(response.saveGuideModeStatus == 0){
                showAlert('error',response.msg,4000,true);

            }
        }
    })
})

