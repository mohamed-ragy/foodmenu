drawPage_system = function(){
    $('#pageWrapper').addClass('mxw800')
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection pT10',
        }).append(
            $('<div/>',{class:'pageSectionTitle'}).append(
                $('<span/>',{text:texts.cpanel.menu.system}),
            ),
            $('<div/>',{class:'pageTabs'}).append(
                $('<div/>',{class:'pageTabArrow pageTabArrowLeft ico-left'}),
                $('<div/>',{class:'pageTabsContainer'}).append(
                    $('<div/>',{tab:'region',class:'pageTab pageTab_selected'}).append(
                        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'region-noSave ico-warning unsaved none mie-5 mis-2 fs1 '}),
                        $('<span/>',{text:texts.settings.region})
                    ),
                    $('<div/>',{tab:'system_settings',class:'pageTab'}).append(
                        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'systemSettings-noSave ico-warning unsaved none mie-5 mis-2 fs1 '}),
                        $('<span/>',{text:texts.settings.SystemSettings})
                    ),
                    $('<div/>',{tab:'privacy_policy',class:'pageTab authority_master'}).append(
                        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'system-privacyPolicyNoSave ico-warning unsaved none mie-5 mis-2 fs1 '}),
                        $('<span/>',{text:texts.settings.privacyPolicy2})
                    ),
                    $('<div/>',{tab:'delete_data',class:'pageTab authority_master',text:texts.settings.deleteData}),
                ),
                $('<div/>',{class:'pageTabArrow pageTabArrowRight ico-right'}),
            ),
            $('<div/>',{class:'pageTabContainer pageTabContainer_selected',tab:'region'}).append(
                $('<div/>',{class:'pageSectionTitle2'}).append(
                    $('<span/>',{class:'system-countrynoSave unsaved ico-warning mie-5 none',tooltip:texts.cpanel.public.unsaved}),
                    $('<span/>',{text:texts.settings.country}),
                    $('<span/>',{class:'ico-help help-icon',helpId:'country'})
                ),
                $('<img/>',{id:'system-countryFlag',class:'countryFlagCard',alt:''}),
                drawInputList('','ico-flag','',texts.settings.country,'system-countries',texts.settings.findCountry,250,'system-countriesList',true),
                drawSaveCancelBtns('system-countrySaveBtn','system-countryCancelBtn','mT40'),
                $('<div/>',{class:'mY80 pageSection_brdrB'}),
                $('<div/>',{class:'pageSectionTitle2'}).append(
                    $('<span/>',{class:'system-timeZone-noSave unsaved ico-warning mie-5 none'}),
                    $('<span/>',{text:texts.settings.timeZone}),
                    $('<span/>',{class:'ico-help help-icon',helpId:'time_zone'})
                ),
                $('<div/>',{class:'timeZoneCard wFC'}).append(
                    $('<div/>',{class:'accountTimeZoneNow digitalWatch',id:'system-timeZoneTimeNow'})
                ),
                $('<div/>',{}).append(
                    drawSwitchBtn('',texts.settings.enable12Hour,'system-timeZone-hour12','checkboxlabel mT10 brdrT0 mX0'),
                    drawInputList('','ico-clock','',texts.settings.timeZone,'system-timeZones',texts.settings.findTimeZone,250,'system-timeZonesList',true),
                ),
                drawSaveCancelBtns('system-timeZoneSaveBtn','system-timeZoneCancelBtn','mT40'),
            ),
            $('<div/>',{class:'pageTabContainer',tab:'system_settings'}).append(
                $('<div/>',{class:'pageSectionTitle2 mB0'}).append(
                    $('<span/>',{class:'systemSettings-noSave unsaved ico-warning mie-5 none',tooltip:texts.cpanel.public.unsaved}),
                    $('<span/>',{text:texts.settings.SystemSettings}),
                    $('<span/>',{class:'ico-help help-icon',helpId:'system_settings'})
                ),
                $('<div/>',{class:'area mT40'}).append(
                    $('<div/>',{class:'areaTitle',text:texts.settings.orderingSystem}),
                    drawSwitchBtn('enable_home_delivery',texts.settings.useDelivery,'systemSettings-useDelivery','checkboxlabel_100p mT10 brdrT0'),
                    drawSwitchBtn('enable_order_pickup',texts.settings.usePickup,'systemSettings-usePickup'),
                    drawSwitchBtn('enable_guest_orders',texts.settings.enableGuestOrders,'systemSettings-guestOrders'),
                    drawSwitchBtn('accept_delivery_orders24',texts.settings.acceptDeliveryOrders24,'systemSettings-acceptDeliveryOrders24'),
                    drawSwitchBtn('accept_pickup_orders24',texts.settings.acceptPickupOrders24,'systemSettings-acceptPickupOrders24'),
                    drawSwitchBtn('cancel_order',texts.settings.cancelOrder,'systemSettings-cancelOrder'),
                ),
                $('<div/>',{class:'area mT40'}).append(
                    $('<div/>',{class:'areaTitle',text:texts.settings.reviewsSystem}),
                    drawSwitchBtn('enable_reviews',texts.settings.enableProductReviews,'systemSettings-productReviews','checkboxlabel_100p mT10 brdrT0'),
                    drawSwitchBtn('enable_guest_Reviews',texts.settings.enableGuestReviews,'systemSettings-guestReviews'),
                    drawSwitchBtn('collect_reviews',texts.settings.collectReviews,'systemSettings-collectReviews'),
                ),
                $('<div/>',{class:'area mT40'}).append(
                    $('<div/>',{class:'areaTitle',text:texts.settings.liveChatSystem}),
                    drawSwitchBtn('live_chat',texts.settings.liveChat,'systemSettings-liveChat','checkboxlabel_100p mT10 brdrT0'),
                    drawSwitchBtn('guest_live_chat',texts.settings.guestLiveChat,'systemSettings-guestLiveChat'),
                ),
                $('<div/>',{class:'area mT40'}).append(
                    $('<div/>',{class:'areaTitle',text:texts.settings.otherSystem}),
                    drawSwitchBtn('quick_load_mode',texts.settings.fastLoading,'systemSettings-fastLoading','checkboxlabel_100p mT10 brdrT0'),
                    drawSwitchBtn('show_dinein_working_hours',texts.settings.showDineinWorkingHours,'systemSettings-dineinWorkingHours'),
                    drawSwitchBtn('display_select_language_message',texts.settings.langPopup,'systemSettings-langPopup'),
                    drawSwitchBtn('show_scheduled_discounts_announcement',texts.settings.discountAnnouncement,'systemSettings-discountAnnouncement'),
                    drawSwitchBtn('display_cookies_notification_message',texts.settings.cookiesMsg,'systemSettings-cookiesMsg'),
                    $('<div/>',{class:'numberPickerContainer_100p',autoHelp:'cart_lifetime'}).append(
                        $('<span/>',{text:texts.settings.cartLifeTime}),
                        $('<div/>',{class:'numberPickerControls'}).append(
                            $('<span/>',{id:'systemSettings-cartLifeTimeD',class:'numberPickerArrow ico-left'}),
                            $('<span/>',{class:'numberPickerValue',}).append(
                                $('<span/>',{class:'mX2',id:'systemSettings-cartLifeTime'}),
                                $('<span/>',{class:'mX2',id:'systemSettings-cartLifeTimeText'}),
                            ),
                            $('<span/>',{id:'systemSettings-cartLifeTimeU',class:'numberPickerArrow ico-right'}),
                        )
                    ),
                    $('<div/>',{class:'numberPickerContainer_100p',autoHelp:'receipt_width'}).append(
                        $('<span/>',{text:texts.settings.printerWidth}),
                        $('<div/>',{class:'numberPickerControls'}).append(
                            $('<span/>',{id:'systemSettings-printerWidthD',class:'numberPickerArrow ico-left'}),
                            $('<span/>',{class:'numberPickerValue',}).append(
                                $('<span/>',{class:'mX2',id:'systemSettings-printerWidth'}),
                                $('<span/>',{class:'mX2',text:texts.settings.printerWidthmm})
                            ),
                            $('<span/>',{id:'systemSettings-printerWidthU',class:'numberPickerArrow ico-right'}),
                        )
                    ),
                ),
                drawSaveCancelBtns('systemSettingsSaveBtn','systemSettingsCancelBtn','mT40'),
            ),
            $('<div/>',{class:'pageTabContainer authority_master',tab:'privacy_policy'}).append(
                $('<div/>',{class:'pageSectionTitle2'}).append(
                    $('<span/>',{class:'system-privacyPolicyNoSave unsaved ico-warning mie-5 none',tooltip:texts.cpanel.public.unsaved}),
                    $('<span/>',{text:texts.settings.privacyPolicy}),
                    $('<span/>',{class:'ico-help help-icon',helpId:'privacy_policy'})
                ),
                $('<div/>',{id:'privacyPolicyTextAreas'}),
                drawSaveCancelBtns('system-privacyPolicySaveBtn','system-privacyPolicyCancelBtn','mT40'),

            ),
            $('<div/>',{class:'pageTabContainer authority_master',tab:'delete_data'}).append(
                $('<div/>',{class:'pageSectionTitle2'}).append(
                    $('<span/>',{text:texts.settings.deleteOrdersAndStatistics}),
                    $('<span/>',{class:'ico-help help-icon',helpId:'delete_data'})
                ),
                $('<div/>',{class:'msgBox_orange'}).append(
                    $('<span/>',{class:'ico-warning fs2 mB10'}),
                    $('<span/>',{class:'fs09 taC',text:texts.settings.deleteOrdersAndStatisticsText})
                ),
                $('<div/>',{class:'mA wFC mT40'}).append(
                    drawInputText('','ico-password','',texts.settings.password,'deleteOrdersAndStatistics-password','password',texts.settings.password,150,'password'),
                    $('<div/>',{class:'btnContainer'}).append(
                        $('<button/>',{id:'deleteOrdersAndStatistics-btn',class:'btn btn-delete'}).append(
                            $('<div/>',{class:'btnLoading'}),
                            $('<div/>',{class:'btnTxt',text:texts.settings.deleteMyData})
                        )
                    )
                )

            ),
        ),
    )

    if(account.authorities[4]){
        $('#systemSettings-usePickup').prop('checked',website_temp.usePickup)
        $('#systemSettings-useDelivery').prop('checked',website_temp.useDelivery);
        $('#systemSettings-productReviews').prop('checked',website_temp.productReviews);
        $('#systemSettings-guestReviews').prop('checked',website_temp.guestReviews);
        $('#systemSettings-collectReviews').prop('checked',website_temp.collectReviews);
        $('#systemSettings-guestOrders').prop('checked',website_temp.guestOrders);
        $('#systemSettings-acceptPickupOrders24').prop('checked',website_temp.acceptPickupOrders24);
        $('#systemSettings-acceptDeliveryOrders24').prop('checked',website_temp.acceptDeliveryOrders24);
        $('#systemSettings-discountAnnouncement').prop('checked',website_temp.discountAnnouncement);
        $('#systemSettings-cancelOrder').prop('checked',website_temp.cancelOrder);
        $('#systemSettings-dineinWorkingHours').prop('checked',website_temp.dineinWorkingHours);
        $('#systemSettings-liveChat').prop('checked',website_temp.liveChat);
        $('#systemSettings-guestLiveChat').prop('checked',website_temp.guestLiveChat);
        $('#systemSettings-cookiesMsg').prop('checked',website_temp.cookies_msg);
        $('#systemSettings-langPopup').prop('checked',website_temp.langPopup);
        $('#systemSettings-fastLoading').prop('checked',website_temp.fastLoading);
        $('#systemSettings-printerWidth').text(website_temp.printerWidth);
        calcCartLifeTime();
        getCountriesTimezones();
        $('#system-timeZone-hour12').prop('checked',website_temp.hour12);
    }
    if(account.is_master){
        for(const key in website.languages){
            let lang = website.languages[key];
            $('#privacyPolicyTextAreas').append(
                drawTextArea('','',lang.flag,`${texts.settings.privacyPolicy} (${lang.name})`,`system_PrivacyPolicy_${lang.code}`,20000,'',website_temp.website_privacyPolicy[lang.code])
            )
        }
    }
    system_unsave_check();
}
