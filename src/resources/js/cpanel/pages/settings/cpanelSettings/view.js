

////////////////////view settings functions./////////////////////
viewSettingsNoSaveCheck = function(){
    if($(window).width() >= 1024 ){
        if(
            settings_temp.bigSideMenu == settings.bigSideMenu &&
            settings_temp.darkMode == settings.darkMode &&
            settings_temp.hotKeys == settings.hotKeys &&
            settings_temp.statusBar == settings.statusBar
        ){
            $('.viewSettingsNoSave').addClass('none');
            return true;
        }else{
            $('.viewSettingsNoSave').removeClass('none');
            return false;
        }
    }else{
        if(
            settings_temp.darkMode == settings.darkMode &&
            settings_temp.hotKeys == settings.hotKeys &&
            settings_temp.statusBar == settings.statusBar
        ){
            $('.viewSettingsNoSave').addClass('none');
            return true;
        }else{
            $('.viewSettingsNoSave').removeClass('none');
            return false;
        }
    }
}
loadViewSettings = function(){
    sideMenuIconsToggle(settings.bigSideMenu);
    hotKeysToggle(settings.hotKeys);
    statusBarToggle(settings.statusBar);
    darkModeToogle(settings.darkMode);
}

sideMenuIconsToggle = function(action){
    if(action == false ){
        sideMenuIconsSmall();
    }else if(action == true){
        if($(window).width() < 1024){
            setTimeout(function(){
                sideMenuIconsSmall();
            },250)
        }else{
            sideMenuIconsBig();
        }
    }
    control_panel_settings_unsave_check();
}
sideMenuIconsSmall = function(){
    $('#sideMenu-Container').addClass('sideMenu-Container_small')
    $('#cpanelSettings-bigSideMenu').prop('checked',false);
    settings_temp.bigSideMenu = false;
}
sideMenuIconsBig = function(){
    $('#sideMenu-Container').removeClass('sideMenu-Container_small')
    $('#cpanelSettings-bigSideMenu').prop('checked',true);
    settings_temp.bigSideMenu = true;
}


darkModeToogle = function(action){
    if(action == true){
        darkModeYes();
    }else if(action == false){
        darkModeNo();
    }
    control_panel_settings_unsave_check();
}
darkModeYes = function(){
    $('#colors').prop('href','css/cpanel/colorsDark.css?v=1');
    $('#cpanelSettings-darkMode').prop('checked',true);
    settings_temp.darkMode = true;
}
darkModeNo = function(){
    $('#colors').prop('href','css/cpanel/colors.css?v=1');
    $('#cpanelSettings-darkMode').prop('checked',false);
    settings_temp.darkMode = false;
}
statusBarToggle = function(action){
    if(action == true){
        showStatesBar();
    }else if(action == false){
        hideStatesBar();
    }
    control_panel_settings_unsave_check();
}
showStatesBar = function(){
    $('#statusBar').removeClass('none');
    $('#bodyContainer').css('height','calc(100% - 20px)');
    $('#cpanelSettings-statusBar').prop('checked',true);
    settings_temp.statusBar = true;
}
hideStatesBar = function(){
    $('#statusBar').addClass('none');
    $('#bodyContainer').css('height','calc(100%)');
    $('#cpanelSettings-statusBar').prop('checked',false);
    settings_temp.statusBar = false;
}
hotKeysToggle = function(action){
    if(action == true){
        $('#cpanelSettings-hotKeys').prop('checked',true);
        $('.hotKeys').css('display','inline');
        settings_temp.hotKeys = true;
    }else if(action == false){
        $('.hotKeys').css('display','none');
        $('#cpanelSettings-hotKeys').prop('checked',false);
        settings_temp.hotKeys = false;
    }
    control_panel_settings_unsave_check();
}
//////////////////////////view settings events/////////////////////
$('body').on('click','#cpanelSettings-bigSideMenu',function(e){
    settings_temp.bigSideMenu = $('#cpanelSettings-bigSideMenu').prop('checked')
    sideMenuIconsToggle(settings_temp.bigSideMenu);
    if(settings_temp.bigSideMenu == true && $(window).width() < 1024){
        setTimeout(function(){
            showAlert('error',texts.settings.cantForScreenLessThan1024,4000,true);
            $('#cpanelSettings-bigSideMenu').prop('checked',false)
            settings_temp.bigSideMenu = false;
        },250)
    }
    control_panel_settings_unsave_check();
});
$('body').on('click','#cpanelSettings-darkMode',function(){
    settings_temp.darkMode = $('#cpanelSettings-darkMode').prop('checked')
    darkModeToogle(settings_temp.darkMode);
});
$('body').on('click','#cpanelSettings-statusBar',function(){
    settings_temp.statusBar = $('#cpanelSettings-statusBar').prop('checked')
    statusBarToggle(settings_temp.statusBar);
});
$('body').on('click','#cpanelSettings-hotKeys',function(){
    settings_temp.hotKeys = $('#cpanelSettings-hotKeys').prop('checked')
    hotKeysToggle(settings_temp.hotKeys);
})
$('body').on('click','#cpanelSettings-viewSettingsCancelBtn',function(e){
    settings_temp.bigSideMenu = settings.bigSideMenu
    settings_temp.darkMode = settings.darkMode
    settings_temp.hotKeys = settings.hotKeys
    settings_temp.statusBar = settings.statusBar
    loadViewSettings();
    control_panel_settings_unsave_check();
})
$('body').on('click','#cpanelSettings-viewSettingsSaveBtn',function(){
    let guidemodeActive;
    if(!coolDownChecker()){return;}
    showBtnLoading($('#cpanelSettings-viewSettingsSaveBtn'));
    if($(window).width() >= 1024){
        if($('#cpanelSettings-bigSideMenu').prop('checked')){bigSideMenu = 1}else{bigSideMenu = 0}
    }else{
        bigSideMenu = settings.bigSideMenu;
    }
    if($('#cpanelSettings-darkMode').prop('checked')){darkMode = 1}else{darkMode = 0}
    if($('#cpanelSettings-statusBar').prop('checked')){statusBar = 1}else{statusBar = 0}
    if($('#cpanelSettings-hotKeys').prop('checked')){hotKeys = 1}else{hotKeys = 0}
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            saveViewSettings:true,
            bigSideMenu:bigSideMenu,
            darkMode:darkMode,
            statusBar:statusBar,
            hotKeys:hotKeys,
        },
        success:function(response){
            hideBtnLoading($('#cpanelSettings-viewSettingsSaveBtn'));
            if(response.saveViewSettingsStatus == 1){
                showAlert('success',response.msg,4000,true);
                window.Cookies.set('darkMode',darkMode, { expires: 365 })
                settings.bigSideMenu = bigSideMenu;
                settings.darkMode = darkMode;
                settings.statusBar = statusBar;
                settings.hotKeys = hotKeys;
                settings_temp.bigSideMenu = settings.bigSideMenu
                settings_temp.darkMode = settings.darkMode
                settings_temp.hotKeys = settings.hotKeys
                settings_temp.statusBar = settings.statusBar
                control_panel_settings_unsave_check();
            }else if(response.saveViewSettingsStatus == 0){
                showAlert('error',response.msg,4000,true);

            }
        }
    })
})

