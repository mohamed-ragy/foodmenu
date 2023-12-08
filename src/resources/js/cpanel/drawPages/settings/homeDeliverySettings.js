drawPage_home_delivery_settings = function(){
    $('#pageWrapper').addClass('mxw900')
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection pT10',
        }).append(
            $('<div/>',{class:'pageSectionTitle'}).append(
                $('<span/>',{text:texts.cpanel.menu.home_delivery_settings}),
            ),
            $('<div/>',{class:'pageTabs'}).append(
                $('<div/>',{class:'pageTabArrow pageTabArrowLeft ico-left'}),
                $('<div/>',{class:'pageTabsContainer'}).append(
                    $('<div/>',{tab:'delivery_working_days',class:'pageTab pageTab_selected'}).append(
                        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'delivery_working_days-NoSave ico-warning unsaved none mie-5 mis-2 fs1 '}),
                        $('<span/>',{text:texts.settings.workingDays})
                    ),
                    $('<div/>',{tab:'delivery_fees',class:'pageTab'}).append(
                        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'deliveryFees-NoSave ico-warning unsaved none mie-5 mis-2 fs1 '}),
                        $('<span/>',{text:texts.settings.deliveryFees})
                    ),
                    $('<div/>',{tab:'average_delivery_time',class:'pageTab'}).append(
                        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'averageDeliveryTime-NoSave ico-warning unsaved none mie-5 mis-2 fs1 '}),
                        $('<span/>',{text:texts.settings.averageDeliveryTime})
                    ),
                    $('<div/>',{tab:'delivery_payment_methods',class:'pageTab'}).append(
                        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'delivery_payment_methods-NoSave ico-warning unsaved none mie-5 mis-2 fs1 '}),
                        $('<span/>',{text:texts.settings.paymentMethods})
                    ),
                    $('<div/>',{tab:'delivery_minimum_charge',class:'pageTab'}).append(
                        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'delivery_minimum_charge-NoSave ico-warning unsaved none mie-5 mis-2 fs1 '}),
                        $('<span/>',{text:texts.settings.minimumCharge})
                    ),
                    $('<div/>',{tab:'delivery_tax_settings',class:'pageTab'}).append(
                        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'delivery_tax_settings-noSave ico-warning unsaved none mie-5 mis-2 fs1 '}),
                        $('<span/>',{text:texts.settings.taxSettings})
                    ),
                ),
                $('<div/>',{class:'pageTabArrow pageTabArrowRight ico-right'}),
            ),
            $('<div/>',{class:'pageTabContainer pageTabContainer_selected',tab:'delivery_working_days'}).append(
                $('<div/>',{class:'pageSectionTitle2'}).append(
                    $('<span/>',{class:'delivery_working_days-NoSave unsaved ico-warning mie-5 none',tooltip:texts.cpanel.public.unsaved}),
                    $('<span/>',{text:texts.settings.workingDays}),
                    $('<span/>',{class:'ico-help help-icon',helpId:'setting_the_working_days'})
                ),
                $('<div/>',{class:'w100p overflowX-A'}).append(
                    $('<table/>',{id:'delivery-WorkingDaysTable',class:'w100p',autoHelp:'working_days_list'})
                )
            ),
            $('<div/>',{class:'pageTabContainer',tab:'delivery_fees'}).append(
                $('<div/>',{class:'pageSectionTitle2'}).append(
                    $('<span/>',{class:'deliveryFees-NoSave unsaved ico-warning mie-5 none',tooltip:texts.cpanel.public.unsaved}),
                    $('<span/>',{text:texts.settings.deliveryFees}),
                    $('<span/>',{class:'ico-help help-icon',helpId:'delivery_cost'})
                ),
                $('<div/>',{class:'wFC'}).append(
                    drawInputText('','ico-money','',texts.settings.deliveryCost,'deliveryCost','number',texts.settings.deliveryCost,50,'clearVal','inputTextContainer_100p',website_temp.deliveryCost,false),
                    drawSwitchBtn('',texts.settings.deliveryCanChangeMsg,'deliveryCanChangeMsg','checkboxlabel_100p mT5 brdrT0',''),
                ),
                drawSaveCancelBtns('deliveryCostSaveBtn','deliveryCostCancelBtn','mT40')
            ),
            $('<div/>',{class:'pageTabContainer',tab:'average_delivery_time'}).append(
                $('<div/>',{class:'pageSectionTitle2'}).append(
                    $('<span/>',{class:'averageDeliveryTime-NoSave unsaved ico-warning mie-5 none',tooltip:texts.cpanel.public.unsaved}),
                    $('<span/>',{text:texts.settings.averageDeliveryTime}),
                    $('<span/>',{class:'ico-help help-icon',helpId:'average_delivery_time'})
                ),
                $('<div/>',{class:'wFC'}).append(
                    $('<div/>',{class:'numberPickerControls w100p mT20 ma'}).append(
                        $('<div/>',{class:'numberPickerArrow ico-left',id:'avgDeliveryTimeD'}),
                        $('<div/>',{class:'numberPickerValue fs09 w200'}).append(
                            $('<span/>',{class:'mX2',id:'avgDeliveryTime',deliveryTime:''}),
                            $('<span/>',{class:'mX2',id:'avgDeliveryTimeTxt'})
                        ),
                        $('<div/>',{class:'numberPickerArrow ico-right',id:'avgDeliveryTimeU'}),
                    )
                ),
                drawSaveCancelBtns('avgDeliveryTimeSaveBtn','avgDeliveryTimeCancelBtn','mT40')
            ),
            $('<div/>',{class:'pageTabContainer',tab:'delivery_payment_methods'}).append(
                $('<div/>',{class:'pageSectionTitle2'}).append(
                    $('<span/>',{class:'delivery_payment_methods-NoSave unsaved ico-warning mie-5 none',tooltip:texts.cpanel.public.unsaved}),
                    $('<span/>',{text:texts.settings.paymentMethods}),
                    $('<span/>',{class:'ico-help help-icon',helpId:'payment_methods'})
                ),
                $('<div/>',{class:'wFC'}).append(
                    $('<div/>',{class:'row alnC jstfySB checkboxlabel_100p brdrT0 mT20 cash_on_delivery'}).append(
                        $('<div/>',{class:'row alnC jstfyC mie-100'}).append(
                            $('<div/>',{class:'ico-money fs1 mie-5'}),
                            $('<div/>',{class:'fs09',text:texts.settings.cash_on_delivery})
                        ),
                        $('<div/>',{class:'fs09 cash_on_delivery_check ico-check0'})
                    ),
                    $('<div/>',{class:'row alnC jstfySB checkboxlabel_100p card_on_delivery'}).append(
                        $('<div/>',{class:'row alnC jstfyC mie-100'}).append(
                            $('<div/>',{class:'ico-card fs1 mie-5'}),
                            $('<div/>',{class:'fs09',text:texts.settings.card_on_delivery})
                        ),
                        $('<div/>',{class:'fs09 card_on_delivery_check ico-check0'})
                    ),
                ),
                drawSaveCancelBtns('deliveryPaymentMethodsSaveBtn','deliveryPaymentMethodsCancelBtn','mT40')
            ),
            $('<div/>',{class:'pageTabContainer',tab:'delivery_minimum_charge'}).append(
                $('<div/>',{class:'pageSectionTitle2'}).append(
                    $('<span/>',{class:'delivery_minimum_charge-NoSave unsaved ico-warning mie-5 none',tooltip:texts.cpanel.public.unsaved}),
                    $('<span/>',{text:texts.settings.minimumCharge}),
                    $('<span/>',{class:'ico-help help-icon',helpId:'home_delivery_minimum_charge'})
                ),
                $('<div/>',{class:'wFC'}).append(
                    drawInputText('','ico-money','',texts.settings.minimumCharge,'deliveryMinimumCharge','number',texts.settings.minimumCharge,50,'clearVal','inputTextContainer_100p',website_temp.deliveryMinimumCharge,false),
                    drawSwitchBtn('',texts.settings.deliveryMinimumChargeIncludes,'deliveryMinimumChargeIncludes','checkboxlabel_100p mT5 brdrT0',''),
                ),
                drawSaveCancelBtns('deliveryMinimumChargeSaveBtn','deliveryMinimumChargeCancelBtn','mT40')
            ),
            $('<div/>',{class:'pageTabContainer',tab:'delivery_tax_settings'}).append(
                $('<div/>',{class:'pageSectionTitle2'}).append(
                    $('<span/>',{class:'delivery_tax_settings-noSave unsaved ico-warning mie-5 none',tooltip:texts.cpanel.public.unsaved}),
                    $('<span/>',{text:texts.settings.taxSettings}),
                    $('<span/>',{class:'ico-help help-icon',helpId:'tax_settings'})
                ),
                $('<div/>',{class:'wFC'}).append(
                    $('<div/>',{class:'row alnC jstfySB checkboxlabel_100p brdrT0 mT10 useDeliveryTaxCost'}).append(
                        $('<div/>',{text:texts.settings.fixedCost,class:'fs09 mie-10'}),$('<div/>',{class:'fs09 useDeliveryTaxCostCheck ico-check0'})
                    ),
                    $('<div/>',{class:'row alnC jstfySB checkboxlabel_100p useDeliveryTaxPercent'}).append(
                        $('<div/>',{text:texts.settings.percent,class:'fs09 mie-10'}),$('<div/>',{class:'fs09 useDeliveryTaxPercentCheck ico-check0'})
                    ),
                    drawInputText('','ico-money','',texts.settings.taxCost,'deliveryTaxCost','number',texts.settings.taxCost,50,'clearVal','deliveryTaxCostContainer inputTextContainer_100p',website_temp.deliveryTaxCost,false),
                    drawInputText('','ico-percent','',texts.settings.taxPercent,'deliveryTaxPercent','number',texts.settings.taxPercent,50,'clearVal','deliveryTaxPercentContainer inputTextContainer_100p',website_temp.deliveryTaxPercentage,false)
                ),
                drawSaveCancelBtns('deliveryTaxSaveBtn','deliveryTaxCancelBtn','mT40')

            ),
        )
    )


    if(website_temp.useDeliveryTaxCost == 1){
        $('.useDeliveryTaxCostCheck').removeClass('ico-check0').addClass('ico-check1')
        $('.useDeliveryTaxPercentCheck').removeClass('ico-check1').addClass('ico-check0')
        $('.deliveryTaxCostContainer').removeClass('none')
        $('.deliveryTaxPercentContainer').addClass('none')
    }else{
        $('.useDeliveryTaxCostCheck').removeClass('ico-check1').addClass('ico-check0')
        $('.useDeliveryTaxPercentCheck').removeClass('ico-check0').addClass('ico-check1')
        $('.deliveryTaxCostContainer').addClass('none')
        $('.deliveryTaxPercentContainer').removeClass('none')
    }
    if(website_temp.showDeliveryCostChangable == 1){
        $('#deliveryCanChangeMsg').prop('checked',true)
    }else
    if(website_temp.deliveryMinimumChargeIncludes == 1){
        $('#deliveryMinimumChargeIncludes').prop('checked',true);
    }
    website_temp.cash_on_delivery ? $('.cash_on_delivery_check').removeClass('ico-check0').addClass('ico-check1') : null;
    website_temp.card_on_delivery ? $('.card_on_delivery_check').removeClass('ico-check0').addClass('ico-check1') : null;
    resetDeliverAvgTime();
    drawWorkingDaysTable('delivery')
    home_delivery_settings_unsave_check();
}

