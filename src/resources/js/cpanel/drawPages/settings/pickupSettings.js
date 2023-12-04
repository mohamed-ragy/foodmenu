drawPage_order_pickup_settings = function(){
    $('#pageWrapper').addClass('mxw900')
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection pT10',
        }).append(
            $('<div/>',{class:'pageSectionTitle'}).append(
                $('<span/>',{text:texts.cpanel.menu.order_pickup_settings}),
            ),
            $('<div/>',{class:'pageTabs'}).append(
                $('<div/>',{class:'pageTabArrow pageTabArrowLeft ico-left'}),
                $('<div/>',{class:'pageTabsContainer'}).append(
                    $('<div/>',{tab:'pickup_working_days',class:'pageTab pageTab_selected'}).append(
                        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'pickup_working_days-NoSave ico-warning unsaved none mie-5 mis-2 fs1 '}),
                        $('<span/>',{text:texts.settings.workingDays})
                    ),
                    $('<div/>',{tab:'average_pickup_time',class:'pageTab'}).append(
                        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'average_pickup_time-NoSave ico-warning unsaved none mie-5 mis-2 fs1 '}),
                        $('<span/>',{text:texts.settings.averagePickupTime})
                    ),
                    $('<div/>',{tab:'pickup_payment_methods',class:'pageTab'}).append(
                        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'pickup_payment_methods-NoSave ico-warning unsaved none mie-5 mis-2 fs1 '}),
                        $('<span/>',{text:texts.settings.paymentMethods})
                    ),
                    $('<div/>',{tab:'pickup_minimum_charge',class:'pageTab'}).append(
                        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'pickup_minimum_charge-NoSave ico-warning unsaved none mie-5 mis-2 fs1 '}),
                        $('<span/>',{text:texts.settings.minimumCharge})
                    ),
                    $('<div/>',{tab:'pickup_tax_settings',class:'pageTab'}).append(
                        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'pickup_tax_settings-noSave ico-warning unsaved none mie-5 mis-2 fs1 '}),
                        $('<span/>',{text:texts.settings.taxSettings})
                    ),
                ),
                $('<div/>',{class:'pageTabArrow pageTabArrowRight ico-right'}),
            ),
            $('<div/>',{class:'pageTabContainer pageTabContainer_selected',tab:'pickup_working_days'}).append(
                $('<div/>',{class:'pageSectionTitle2'}).append(
                    $('<span/>',{class:'pickup_working_days-NoSave unsaved ico-warning mie-5 none',tooltip:texts.cpanel.public.unsaved}),
                    $('<span/>',{text:texts.settings.workingDays}),
                    $('<span/>',{class:'ico-help help-icon',helpId:'setting_the_working_days'})
                ),
                $('<table/>',{id:'pickup-WorkingDaysTable',class:'w100p',autoHelp:'working_days_list'})
            ),
            $('<div/>',{class:'pageTabContainer',tab:'average_pickup_time'}).append(
                $('<div/>',{class:'pageSectionTitle2'}).append(
                    $('<span/>',{class:'average_pickup_time-NoSave unsaved ico-warning mie-5 none',tooltip:texts.cpanel.public.unsaved}),
                    $('<span/>',{text:texts.settings.averagePickupTime}),
                    $('<span/>',{class:'ico-help help-icon',helpId:'average_time_to_prepare_an_order'})
                ),
                $('<div/>',{class:'wFC'}).append(
                    $('<div/>',{class:'numberPickerControls w100p mT20 ma'}).append(
                        $('<div/>',{class:'numberPickerArrow ico-left',id:'avgPickupTimeD'}),
                        $('<div/>',{class:'numberPickerValue fs09 w200'}).append(
                            $('<span/>',{class:'mX2',id:'avgPickupTime',pickupTime:''}),
                            $('<span/>',{class:'mX2',id:'avgPickupTimeTxt'})
                        ),
                        $('<div/>',{class:'numberPickerArrow ico-right',id:'avgPickupTimeU'}),
                    )
                ),
                drawSaveCancelBtns('avgPickupTimeSaveBtn','avgPickupTimeCancelBtn','mT40')
            ),
            $('<div/>',{class:'pageTabContainer',tab:'pickup_payment_methods'}).append(
                $('<div/>',{class:'pageSectionTitle2'}).append(
                    $('<span/>',{class:'pickup_payment_methods-NoSave unsaved ico-warning mie-5 none',tooltip:texts.cpanel.public.unsaved}),
                    $('<span/>',{text:texts.settings.paymentMethods}),
                    $('<span/>',{class:'ico-help help-icon',helpId:'payment_methods'})
                ),
                $('<div/>',{class:'wFC'}).append(
                    $('<div/>',{class:'row alnC jstfySB checkboxlabel_100p brdrT0 mT20 cash_at_restaurant'}).append(
                        $('<div/>',{class:'row alnC jstfyC mie-100'}).append(
                            $('<div/>',{class:'ico-money fs1 mie-5'}),
                            $('<div/>',{class:'fs09',text:texts.settings.cash_at_restaurant})
                        ),
                        $('<div/>',{class:'fs09 cash_at_restaurant_check ico-check0'})
                    ),
                    $('<div/>',{class:'row alnC jstfySB checkboxlabel_100p card_at_restaurant'}).append(
                        $('<div/>',{class:'row alnC jstfyC mie-100'}).append(
                            $('<div/>',{class:'ico-card fs1 mie-5'}),
                            $('<div/>',{class:'fs09',text:texts.settings.card_at_restaurant})
                        ),
                        $('<div/>',{class:'fs09 card_at_restaurant_check ico-check0'})
                    ),
                ),
                drawSaveCancelBtns('pickupPaymentMethodsSaveBtn','pickupPaymentMethodsCancelBtn','mT40')
            ),
            $('<div/>',{class:'pageTabContainer',tab:'pickup_minimum_charge'}).append(
                $('<div/>',{class:'pageSectionTitle2'}).append(
                    $('<span/>',{class:'pickup_minimum_charge-NoSave unsaved ico-warning mie-5 none',tooltip:texts.cpanel.public.unsaved}),
                    $('<span/>',{text:texts.settings.minimumCharge}),
                    $('<span/>',{class:'ico-help help-icon',helpId:'order_pickup_minimum_charge'})
                ),
                $('<div/>',{class:'wFC'}).append(
                    drawInputText('','ico-money','',texts.settings.minimumCharge,'pickupMinimumCharge','number',texts.settings.minimumCharge,50,'clearVal','inputTextContainer_100p',website_temp.pickupMinimumCharge,false),
                    drawSwitchBtn('',texts.settings.pickupMinimumChargeIncludes,'pickupMinimumChargeIncludes','checkboxlabel_100p mT5 brdrT0',''),
                ),
                drawSaveCancelBtns('pickupMinimumChargeSaveBtn','pickupMinimumChargeCancelBtn','mT40')
            ),
            $('<div/>',{class:'pageTabContainer',tab:'pickup_tax_settings'}).append(
                $('<div/>',{class:'pageSectionTitle2'}).append(
                    $('<span/>',{class:'pickup_tax_settings-noSave unsaved ico-warning mie-5 none',tooltip:texts.cpanel.public.unsaved}),
                    $('<span/>',{text:texts.settings.taxSettings}),
                    $('<span/>',{class:'ico-help help-icon',helpId:'tax_settings'})
                ),
                $('<div/>',{class:'wFC'}).append(
                    $('<div/>',{class:'row alnC jstfySB checkboxlabel_100p brdrT0 mT10 usePickupTaxCost'}).append(
                        $('<div/>',{text:texts.settings.fixedCost,class:'fs09 mie-10'}),$('<div/>',{class:'fs09 usePickupTaxCostCheck ico-check0'})
                    ),
                    $('<div/>',{class:'row alnC jstfySB checkboxlabel_100p usePickupTaxPercent'}).append(
                        $('<div/>',{text:texts.settings.percent,class:'fs09 mie-10'}),$('<div/>',{class:'fs09 usePickupTaxPercentCheck ico-check0'})
                    ),
                    drawInputText('','ico-money','',texts.settings.taxCost,'pickupTaxCost','number',texts.settings.taxCost,50,'clearVal','pickupTaxCostContainer inputTextContainer_100p',website_temp.pickupTaxCost,false),
                    drawInputText('','ico-percent','',texts.settings.taxPercent,'pickupTaxPercent','number',texts.settings.taxPercent,50,'clearVal','pickupTaxPercentContainer inputTextContainer_100p',website_temp.pickupTaxPercentage,false)
                ),
                drawSaveCancelBtns('pickupTaxSaveBtn','pickupTaxCancelBtn','mT40')

            ),
        )
    )
    if(website_temp.usePickupTaxCost == 1){
        $('.usePickupTaxCostCheck').removeClass('ico-check0').addClass('ico-check1')
        $('.usePickupTaxPercentCheck').removeClass('ico-check1').addClass('ico-check0')
        $('.pickupTaxCostContainer').removeClass('none')
        $('.pickupTaxPercentContainer').addClass('none')
    }else{
        $('.usePickupTaxCostCheck').removeClass('ico-check1').addClass('ico-check0')
        $('.usePickupTaxPercentCheck').removeClass('ico-check0').addClass('ico-check1')
        $('.pickupTaxCostContainer').addClass('none')
        $('.pickupTaxPercentContainer').removeClass('none')
    }
    if(website_temp.pickupMinimumChargeIncludes == 1){
        $('#pickupMinimumChargeIncludes').prop('checked',true);
    }
    website_temp.cash_at_restaurant ? $('.cash_at_restaurant_check').removeClass('ico-check0').addClass('ico-check1') : null;
    website_temp.card_at_restaurant ? $('.card_at_restaurant_check').removeClass('ico-check0').addClass('ico-check1') : null;
    drawWorkingDaysTable('pickup');
    resetPickupAvgTime();
    order_pickup_settings_unsave_check();
}
