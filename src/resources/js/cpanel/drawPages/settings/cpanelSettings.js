drawPage_control_panel_settings = function(){
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection',
        }).append(
            $('<div/>',{class:'pageTabs'}).append(
                $('<div/>',{class:'pageTabArrow pageTabArrowLeft ico-left'}),
                $('<div/>',{class:'pageTabsContainer'}).append(
                    $('<div/>',{tab:'view_settings',class:'pageTab pageTab_selected'}).append(
                        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'viewSettingsNoSave ico-warning unsaved none mie-5 mis-2 fs1 '}),
                        $('<span/>',{text:texts.settings.viewSettings})
                    ),
                    $('<div/>',{tab:'control_settings',class:'pageTab'}).append(
                        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'controlSettingsNoSave ico-warning unsaved none mie-5 mis-2 fs1 '}),
                        $('<span/>',{text:texts.settings.controlSettings})
                    ),
                    $('<div/>',{tab:'guide_mode',class:'pageTab'}).append(
                        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'guideModeNoSave ico-warning unsaved none mie-5 mis-2 fs1 '}),
                        $('<span/>',{text:texts.settings.guideMode})
                    ),
                    $('<div/>',{tab:'alert_notifications',class:'pageTab'}).append(
                        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'alertNotificationsNoSave ico-warning unsaved none mie-5 mis-2 fs1 '}),
                        $('<span/>',{text:texts.settings.alertNotifications})
                    ),
                ),
                $('<div/>',{class:'pageTabArrow pageTabArrowRight ico-right'}),
            ),
            $('<div/>',{class:'pageTabContainer pageTabContainer_selected',tab:'view_settings'}).append(
                $('<div/>',{class:'pageSectionTitle2 mX5'}).append(
                    $('<span/>',{class:'viewSettingsNoSave unsaved ico-warning mie-5 none',tooltip:texts.cpanel.public.unsaved}),
                    $('<span/>',{text:texts.settings.viewSettings}),
                    $('<span/>',{class:'ico-help help-icon',helpId:'view_settings'})
                ),
                drawSwitchBtn('expand_navigation_side_menu',`<span>${texts.settings.showBigIcons}</span><span class="hotKeys">${texts.cpanel.hotKeys.viewIconsHotKey}</span>`,'cpanelSettings-bigSideMenu','checkboxlabel_100p mT10 brdrT0'),
                drawSwitchBtn('show_status_bar',`<span>${texts.settings.showStatusBar}</span><span class="hotKeys">${texts.cpanel.hotKeys.viewStatusHotKey}</span>`,'cpanelSettings-statusBar'),
                drawSwitchBtn('show_hotkey_shortcuts',`<span>${texts.settings.showHotkeysShortcuts}</span><span class="hotKeys">${texts.cpanel.hotKeys.hotKeysHotKey}</span>`,'cpanelSettings-hotKeys'),
                drawSwitchBtn('enable_dark_mode',`<span>${texts.settings.enableDarkMode}</span><span class="hotKeys">${texts.cpanel.hotKeys.darkModeHotKey}</span>`,'cpanelSettings-darkMode'),
                drawSaveCancelBtns('cpanelSettings-viewSettingsSaveBtn','cpanelSettings-viewSettingsCancelBtn','mT40'),

            ),
            $('<div/>',{class:'pageTabContainer',tab:'control_settings'}).append(
                $('<div/>',{class:'pageSectionTitle2 mX5'}).append(
                    $('<span/>',{class:'controlSettingsNoSave unsaved ico-warning mie-5 none',tooltip:texts.cpanel.public.unsaved}),
                    $('<span/>',{text:texts.settings.controlSettings}),
                    $('<span/>',{class:'ico-help help-icon',helpId:'control_settings'})
                ),
                drawSwitchBtn('enable_tooltips',`<span>${texts.settings.tooltip}</span>`,'cpanelSettings-tooltip','checkboxlabel_100p mT10 brdrT0'),
                drawSwitchBtn('Dont_show_more_than_one_alert',`<span>${texts.settings.oneAlert}</span>`,'cpanelSettings-oneAlert'),
                drawSwitchBtn('click_twice_to_confirm_actions',`<span>${texts.settings.dClickConfirm}</span>`,'cpanelSettings-dClickConfirm'),
                drawSwitchBtn('enable_share_reminders',`<span>${texts.settings.shareReminder}</span>`,'cpanelSettings-shareReminder','checkboxlabel_100p authority_1'),
                drawSwitchBtn('enable_chat_window_popup',`<span>${texts.settings.chatPopup}</span>`,'cpanelSettings-chatPopup'),
                drawSaveCancelBtns('cpanelSettings-controlSettingsSaveBtn','cpanelSettings-controlSettingsCancelBtn','mT40'),
            ),
            $('<div/>',{class:'pageTabContainer',tab:'guide_mode'}).append(
                $('<div/>',{class:'pageSectionTitle2 mX5'}).append(
                    $('<span/>',{class:'guideModeNoSave unsaved ico-warning mie-5 none',tooltip:texts.cpanel.public.unsaved}),
                    $('<span/>',{text:texts.settings.guideMode}),
                    $('<span/>',{class:'ico-help help-icon',helpId:'guide_mode'})
                ),
                drawSwitchBtn('enable_the_guide_mode',`<span>${texts.settings.enableGuideMode}</span><span class="hotKeys">${texts.cpanel.hotKeys.guideModeHotKey}</span>`,'cpanelSettings-GuideMode','checkboxlabel_100p mT10 brdrT0'),
                drawSwitchBtn('enable_auto_help',`<span>${texts.settings.enableAutohelp}</span><span class="hotKeys">${texts.cpanel.hotKeys.autoHelpHotKey}</span>`,'cpanelSettings-autoHelp'),
                drawSwitchBtn('show_help_icons',`<span>${texts.settings.showHelpIcons}</span><span class="hotKeys">${texts.cpanel.hotKeys.helpIconsHotKey}</span>`,'cpanelSettings-helpIcons'),
                drawSwitchBtn('Enable_guide_alerts',`<span>${texts.settings.enableGuideHints}</span><span class="hotKeys">${texts.cpanel.hotKeys.guideHintsHotKey}</span>`,'cpanelSettings-guideHints'),
                drawSaveCancelBtns('cpanelSettings-GuideModeSaveBtn','cpanelSettings-GuideModeCancelBtn','mT40'),

            ),
            $('<div/>',{class:'pageTabContainer',tab:'alert_notifications'}).append(
                $('<div/>',{class:'pageSectionTitle2 mX5'}).append(
                    $('<span/>',{class:'alertNotificationsNoSave unsaved ico-warning mie-5 none',tooltip:texts.cpanel.public.unsaved}),
                    $('<span/>',{text:texts.settings.alertNotifications}),
                    $('<span/>',{class:'ico-help help-icon',helpId:'alert_notifications'})
                ),
                drawSwitchBtn('new_order_placement_alert',texts.settings.NewOrderAlerts,'cpanelSettings-NewOrderAlerts','checkboxlabel_100p mT10 brdrT0 authority_0'),
                drawSwitchBtn('delivered_orders_alert',texts.settings.DeliveredOrderAlerts,'cpanelSettings-DeliveredOrderAlerts','checkboxlabel_100p authority_0'),
                drawSwitchBtn('new_user_registration_alert',texts.settings.NewUserAlerts,'cpanelSettings-NewUserAlerts','checkboxlabel_100p authority_2'),
                drawSwitchBtn('new_product_review_alert',texts.settings.NewReviewAlerts,'cpanelSettings-NewReviewAlerts','checkboxlabel_100p authority_1'),
                drawSwitchBtn('user_order_cancelation_alert',texts.settings.CanceledOrderAlerts,'cpanelSettings-CanceledOrderAlerts','checkboxlabel_100p authority_0'),
                drawSwitchBtn('user_login_alert',texts.settings.onlineUserAlert,'cpanelSettings-onlineUserAlert','checkboxlabel_100p authority_2'),
                drawSwitchBtn('browsing_guests_alert',texts.settings.onlineGuestAlert,'cpanelSettings-onlineGuestAlert','checkboxlabel_100p authority_2'),
                drawSaveCancelBtns('cpanelSettings-alertNotificationsSaveBtn','cpanelSettings-alertNotificationsCancelBtn','mT40'),
            ),
        ),

    )

    $('#cpanelSettings-bigSideMenu').prop('checked',settings_temp.bigSideMenu);
    $('#cpanelSettings-darkMode').prop('checked',settings_temp.darkMode);
    $('#cpanelSettings-hotKeys').prop('checked',settings_temp.hotKeys);
    $('#cpanelSettings-statusBar').prop('checked',settings_temp.statusBar);

    $('#cpanelSettings-tooltip').prop('checked',settings_temp.tooltip);
    $('#cpanelSettings-oneAlert').prop('checked',settings_temp.oneAlert);
    $('#cpanelSettings-dClickConfirm').prop('checked',settings_temp.dClickConfirm);
    $('#cpanelSettings-shareReminder').prop('checked',settings_temp.shareReminder);
    $('#cpanelSettings-chatPopup').prop('checked',settings_temp.chatPopup);

    $('#cpanelSettings-GuideMode').prop('checked',settings_temp.guideMode);
    $('#cpanelSettings-autoHelp').prop('checked',settings_temp.autoHelp);
    $('#cpanelSettings-helpIcons').prop('checked',settings_temp.helpIcons);
    $('#cpanelSettings-guideHints').prop('checked',settings_temp.guideHints);

    $('#cpanelSettings-NewOrderAlerts').prop('checked',settings_temp.NewOrderAlerts);
    $('#cpanelSettings-DeliveredOrderAlerts').prop('checked',settings_temp.DeliveredOrderAlerts);
    $('#cpanelSettings-NewUserAlerts').prop('checked',settings_temp.NewUserAlerts);
    $('#cpanelSettings-NewReviewAlerts').prop('checked',settings_temp.NewReviewAlerts);
    $('#cpanelSettings-CanceledOrderAlerts').prop('checked',settings_temp.CanceledOrderAlerts);
    $('#cpanelSettings-onlineUserAlert').prop('checked',settings_temp.onlineUserAlert);
    $('#cpanelSettings-onlineGuestAlert').prop('checked',settings_temp.onlineGuestAlert);

    control_panel_settings_unsave_check();
}
