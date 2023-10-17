require('./cpanelSettings/view.js')//done
require('./cpanelSettings/guideMode.js')//done
require('./cpanelSettings/controlSettings.js')//done
require('./cpanelSettings/alertNotifications.js')//done
//////////load settings
// load settings in the cpanel.js file
loadViewSettings();
loadGuideModeSettings();

$(window).on('resize',function(){
    loadGuideModeSettings();
    loadViewSettings();
    control_panel_settings_unsave_check();
})







