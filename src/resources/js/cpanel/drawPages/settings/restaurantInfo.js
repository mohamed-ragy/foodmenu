drawPage_restaurant_information = function(){
    $('#pageWrapper').addClass('mxw800')
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection pT10',
        }).append(
            $('<div/>',{class:'pageSectionTitle'}).append(
                $('<span/>',{text:texts.cpanel.menu.restaurant_information}),
            ),
            $('<div/>',{class:'pageTabs'}).append(
                $('<div/>',{class:'pageTabArrow pageTabArrowLeft ico-left'}),
                $('<div/>',{class:'pageTabsContainer'}).append(
                    $('<div/>',{tab:'logo_and_icon',class:'pageTab pageTab_selected'}).append(
                        $('<span/>',{text:texts.settings.logoAndIcon})
                    ),
                    $('<div/>',{tab:'restaurant_name',class:'pageTab '}).append(
                        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'websiteNameNoSave ico-warning unsaved none mie-5 mis-2 fs1 '}),
                        $('<span/>',{text:texts.settings.websiteNameTitle})
                    ),
                    $('<div/>',{tab:'restaurant_description',class:'pageTab '}).append(
                        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'websiteDescriptionNoSave ico-warning unsaved none mie-5 mis-2 fs1 '}),
                        $('<span/>',{text:texts.settings.websiteDescription})
                    ),
                    $('<div/>',{tab:'restaurant_email',class:'pageTab '}).append(
                        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'restaurantEmailNoSave ico-warning unsaved none mie-5 mis-2 fs1 '}),
                        $('<span/>',{text:texts.settings.restaurantEmail})
                    ),
                    $('<div/>',{tab:'restaurant_phone_numbers',class:'pageTab '}).append(
                        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'websitePhoneNoSave ico-warning unsaved none mie-5 mis-2 fs1 '}),
                        $('<span/>',{text:texts.settings.websitePhone})
                    ),
                    $('<div/>',{tab:'restaurant_address',class:'pageTab '}).append(
                        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'websiteAddressNoSave ico-warning unsaved none mie-5 mis-2 fs1 '}),
                        $('<span/>',{text:texts.settings.websiteAddressTitle})
                    ),
                    $('<div/>',{tab:'restaurant_location',class:'pageTab '}).append(
                        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'restaurantLocationNoSave ico-warning unsaved none mie-5 mis-2 fs1 '}),
                        $('<span/>',{text:texts.settings.restaurantLocation})
                    ),
                    $('<div/>',{tab:'currency_symbol',class:'pageTab '}).append(
                        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'currencySymbolNoSave ico-warning unsaved none mie-5 mis-2 fs1 '}),
                        $('<span/>',{text:texts.settings.currencySymbol})
                    ),
                    $('<div/>',{tab:'social_media_links',class:'pageTab '}).append(
                        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'socialMediaLinksNoSave ico-warning unsaved none mie-5 mis-2 fs1 '}),
                        $('<span/>',{text:texts.settings.socialMediaLinks})
                    ),
                    $('<div/>',{tab:'website_announcement',class:'pageTab '}).append(
                        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'websiteAnnouncementNoSave ico-warning unsaved none mie-5 mis-2 fs1 '}),
                        $('<span/>',{text:texts.settings.websiteAnnouncementTitle})
                    ),
                    $('<div/>',{tab:'receipt_footer_message',class:'pageTab '}).append(
                        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'receiptMsgNoSave ico-warning unsaved none mie-5 mis-2 fs1 '}),
                        $('<span/>',{text:texts.settings.receiptMsg})
                    ),
                ),
                $('<div/>',{class:'pageTabArrow pageTabArrowRight ico-right'}),
            ),
            $('<div/>',{class:'pageTabContainer pageTabContainer_selected',tab:'logo_and_icon'}).append(
                $('<div/>',{class:'pageSectionTitle2 mX5'}).append(
                    $('<span/>',{text:texts.settings.websiteIcon}),
                    $('<span/>',{class:'ico-help help-icon',helpId:'website_icon'})
                ),
                $('<div/>',{class:'row alnC jstfyC relative wFC mX5',id:'settings-websiteIconCard'}).append(
                    $('<span/>',{class:'ico-edit imgCardIcon'}),
                    $('<img/>',{class:'imgCard h100 w100',id:'settings-websiteIconImg'}),
                    $('<div/>',{class:'loading absolute',id:'settings-websiteIconLoading'})
                ),
                $('<div/>',{class:'mY40 pageSection_brdrB'}),
                $('<div/>',{class:'pageSectionTitle2 mX5'}).append(
                    $('<span/>',{text:texts.settings.websiteLogo}),
                    $('<span/>',{class:'ico-help help-icon',helpId:'website_logo'})
                ),
                $('<div/>',{class:'row alnC jstfyC relative wFC mX5',id:'settings-websiteLogoCard'}).append(
                    $('<span/>',{class:'ico-edit imgCardIcon'}),
                    $('<img/>',{class:'imgCard h150 w150',id:'settings-websiteLogoImg'}),
                    $('<div/>',{class:'loading absolute',id:'settings-websiteLogoLoading'})
                )
            ),
            $('<div/>',{class:'pageTabContainer',tab:'restaurant_name'}).append(
                $('<div/>',{class:'pageSectionTitle2 mX5 mB20'}).append(
                    $('<span/>',{class:'websiteNameNoSave unsaved ico-warning mie-5 none',tooltip:texts.cpanel.public.unsaved}),
                    $('<span/>',{text:texts.settings.websiteNameTitle}),
                    $('<span/>',{class:'ico-help help-icon',helpId:'restaurant_name'})
                ),
                $('<div/>',{id:'restaurant_name_inputBoxes'}),
                drawSaveCancelBtns('setting-restaurantName-SaveBtn','setting-restaurantName-CancelBtn','mT40'),
            ),
            $('<div/>',{class:'pageTabContainer',tab:'restaurant_description'}).append(
                $('<div/>',{class:'pageSectionTitle2 mX5 mB20'}).append(
                    $('<span/>',{class:'websiteDescriptionNoSave unsaved ico-warning mie-5 none',tooltip:texts.cpanel.public.unsaved}),
                    $('<span/>',{text:texts.settings.websiteDescription}),
                    $('<span/>',{class:'ico-help help-icon',helpId:'restaurant_description'})
                ),
                $('<div/>',{id:'websiteDescriptionTextAreas'}),
                drawSaveCancelBtns('settings-websiteDescriptionSaveBtn','settings-websiteDescriptionCancelBtn','mT40')
            ),
            $('<div/>',{class:'pageTabContainer',tab:'restaurant_email'}).append(
                $('<div/>',{class:'pageSectionTitle2 mX5 mB20'}).append(
                    $('<span/>',{class:'restaurantEmailNoSave unsaved ico-warning mie-5 none',tooltip:texts.cpanel.public.unsaved}),
                    $('<span/>',{text:texts.settings.restaurantEmail}),
                    $('<span/>',{class:'ico-help help-icon',helpId:'restaurant_email'})
                ),
                drawInputText('','ico-email_address','',`${texts.settings.restaurantEmail}`,'settings-restaurantEmail','text',`${texts.settings.restaurantEmail}`,150,'clearVal',''),
                drawSaveCancelBtns('settings-restaurantEmailSaveBtn','settings-restaurantEmailCancelBtn','mT40')
            ),
            $('<div/>',{class:'pageTabContainer',tab:'restaurant_phone_numbers'}).append(
                $('<div/>',{class:'pageSectionTitle2 mX5 mB20'}).append(
                    $('<span/>',{class:'websitePhoneNoSave unsaved ico-warning mie-5 none',tooltip:texts.cpanel.public.unsaved}),
                    $('<span/>',{text:texts.settings.websitePhone}),
                    $('<span/>',{class:'ico-help help-icon',helpId:'restaurant_phone_numbers'})
                ),
                $('<div/>',{id:'setting-phoneNumbers'}),
                $('<div/>',{id:'setting-addPhoneNumberBtn',class:'pointer c_white-8'}).append(
                    $('<span/>',{class:'ico-plus fs07 mie-5'}),
                    $('<span/>',{text:texts.settings.addNewPhoneNumber,class:'fs08'})
                ),
                drawSaveCancelBtns('setting-phoneNumberSaveBtn','setting-phoneNumberCancelBtn','mT40')
            ),
            $('<div/>',{class:'pageTabContainer',tab:'restaurant_address'}).append(
                $('<div/>',{class:'pageSectionTitle2 mX5 mB20'}).append(
                    $('<span/>',{class:'websiteAddressNoSave unsaved ico-warning mie-5 none',tooltip:texts.cpanel.public.unsaved}),
                    $('<span/>',{text:texts.settings.websiteAddressTitle}),
                    $('<span/>',{class:'ico-help help-icon',helpId:'restaurant_Address'})
                ),
                $('<div/>',{id:'restaurant_address_inputBoxes'}),
                drawSaveCancelBtns('setting-websiteAddressSaveBtn','setting-websiteAddressCancelBtn','mT40'),
            ),
            $('<div/>',{class:'pageTabContainer',tab:'restaurant_location'}).append(
                $('<div/>',{class:'pageSectionTitle2 mX5 mB20'}).append(
                    $('<span/>',{class:'restaurantLocationNoSave unsaved ico-warning mie-5 none',tooltip:texts.cpanel.public.unsaved}),
                    $('<span/>',{text:texts.settings.restaurantLocation}),
                    $('<span/>',{class:'ico-help help-icon',helpId:'restaurant_location'})
                ),
                $('<div/>',{id:'setting-restaurantLocation_map'}),
                drawSaveCancelBtns('setting-restaurantLocation_saveBtn','setting-restaurantLocation_cancelBtn','mT40')
            ),
            $('<div/>',{class:'pageTabContainer',tab:'currency_symbol'}).append(
                $('<div/>',{class:'pageSectionTitle2 mX5 mB20'}).append(
                    $('<span/>',{class:'currencySymbolNoSave unsaved ico-warning mie-5 none',tooltip:texts.cpanel.public.unsaved}),
                    $('<span/>',{text:texts.settings.currencySymbol}),
                    $('<span/>',{class:'ico-help help-icon',helpId:'currency_symbols'})
                ),
                $('<div/>',{id:'currency_symbolInputBoxes'}),
                drawSaveCancelBtns('settings-currencySaveBtn','settings-currencyCancelBtn','mT40'),
            ),
            $('<div/>',{class:'pageTabContainer',tab:'social_media_links'}).append(
                $('<div/>',{class:'pageSectionTitle2 mX5 mB20'}).append(
                    $('<span/>',{class:'socialMediaLinksNoSave unsaved ico-warning mie-5 none',tooltip:texts.cpanel.public.unsaved}),
                    $('<span/>',{text:texts.settings.socialMediaLinks}),
                    $('<span/>',{class:'ico-help help-icon',helpId:'social_media_links'})
                ),
                $('<div/>',{class:'msgBox_orange mX0 wFC'}).append(
                    $('<span/>',{class:'ico-warning fs108 mB5'}),
                    $('<span/>',{class:'fs09 taC',text:texts.settings.socialMediaLinksNotice})
                ),
                drawInputText('','ico-facebook c_facebook','',texts.settings.facebookLink,'settings-facebookLink','text',texts.settings.facebookLink,250,'clearVal',''),
                drawInputText('','ico-youtube c_youtube','',texts.settings.youtubeLink,'settings-youtubeLink','text',texts.settings.youtubeLink,250,'clearVal',''),
                drawInputText('','ico-twitter c_twitter','',texts.settings.twitterLink,'settings-twitterLink','text',texts.settings.twitterLink,250,'clearVal',''),
                drawInputText('','ico-linkedin c_linkedin','',texts.settings.linkedinLink,'settings-linkedinLink','text',texts.settings.linkedinLink,250,'clearVal',''),
                drawInputText('','ico-instagram c_instagram','',texts.settings.instagramLink,'settings-instagramLink','text',texts.settings.instagramLink,250,'clearVal',''),
                drawSaveCancelBtns('settings-socialMediaLinksSaveBtn','settings-socialMediaLinksCancelBtn','mT40')
            ),
            $('<div/>',{class:'pageTabContainer',tab:'website_announcement'}).append(
                $('<div/>',{class:'pageSectionTitle2 mX5 mB20'}).append(
                    $('<span/>',{class:'websiteAnnouncementNoSave unsaved ico-warning mie-5 none',tooltip:texts.cpanel.public.unsaved}),
                    $('<span/>',{text:texts.settings.websiteAnnouncementTitle}),
                    $('<span/>',{class:'ico-help help-icon',helpId:'website_announcement'})
                ),
                $('<div/>',{id:'website_announcement_textAreas'}),
                drawSaveCancelBtns('settings-websiteAnnouncementSaveBtn','settings-websiteAnnouncementCancelBtn','mT40')
            ),
            $('<div/>',{class:'pageTabContainer',tab:'receipt_footer_message'}).append(
                $('<div/>',{class:'pageSectionTitle2 mX5 mB20'}).append(
                    $('<span/>',{class:'receiptMsgNoSave unsaved ico-warning mie-5 none',tooltip:texts.cpanel.public.unsaved}),
                    $('<span/>',{text:texts.settings.receiptMsg}),
                    $('<span/>',{class:'ico-help help-icon',helpId:'receipt_footer_message'})
                ),
                $('<div/>',{id:'receipt_footer_message_textAreas'}),
                drawSaveCancelBtns('settings-receiptMsgSaveBtn','settings-receiptMsgCancelBtn','mT40')
            ),
        )
    )


    $('#settings-websiteIconImg').attr('src',website.iconUrl);
    $('#settings-websiteLogoImg').attr('src',website.logoUrl);

    for(const key in website.languages){
        let lang = website.languages[key];
        $('#restaurant_name_inputBoxes').append(
            drawInputText('','',lang.flag,`${texts.settings.websiteName} (${lang.name})`,`setting-restaurantName-${lang.code}`,'text',`${texts.settings.websiteName} (${lang.name})`,150,'clearVal','',website_temp.websiteNames[lang.code],false,'restaurantNameInputText'),
        );
        $('#websiteDescriptionTextAreas').append(
            drawTextArea('','',lang.flag,`${texts.settings.websiteDescription} (${lang.name})`,`settings_websiteDescription_${lang.code}`,150,'',website_temp.websiteDescriptions[lang.code],'websiteDescriptionTextarea'),
        );
        $('#restaurant_address_inputBoxes').append(
            drawInputText('','',lang.flag,`${texts.settings.websiteAddress} (${lang.name})`,`setting-restaurantAddress_${lang.code}`,'text',`${texts.settings.websiteAddress} (${lang.name})`,300,'clearVal','inputText_100p',website_temp.addresses[lang.code],false,'restaurantAddressInputText'),
        );
        $('#currency_symbolInputBoxes').append(
            drawInputText('','',lang.flag,`${texts.settings.currencySymbol} (${lang.name})`,`setting-enCurrency_${lang.code}`,'text',`${texts.settings.currencySymbol} (${lang.name})`,50,'clearVal','',website_temp.currencies[lang.code],false,'websiteCurrencyInputText'),
        );
        $('#website_announcement_textAreas').append(
            drawTextArea('','',lang.flag,`${texts.settings.websiteAnnouncement} (${lang.name})`,`settings_Announcement_${lang.code}`,500,'',website_temp.website_announcements[lang.code],'websiteAnnouncementInputText'),
        );
        $('#receipt_footer_message_textAreas').append(
            drawTextArea('','',lang.flag,`${texts.settings.receiptMsg} (${lang.name})`,`settings_ReceiptMsg_${lang.code}`,250,'',website_temp.website_receiptMsgs[lang.code],'receiptMsgInputText'),
        )
    }

    $('#settings-restaurantEmail').val(website_temp.restaurantEmail);
    getWebsitePhoneNumbers();
    drawRestaurantLocationMap();
    $('#settings-facebookLink').val(website_temp.facebookLink);
    $('#settings-twitterLink').val(website_temp.twitterLink);
    $('#settings-youtubeLink').val(website_temp.youtubeLink);
    $('#settings-linkedinLink').val(website_temp.linkedinLink);
    $('#settings-instagramLink').val(website_temp.instagramLink);
    restaurant_information_unsave_chack();
}
