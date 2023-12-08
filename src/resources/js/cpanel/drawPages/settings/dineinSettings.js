dine_in_settings_settings = function(){
    $('#pageWrapper').addClass('mxw900')
    $('#pageWrapper').append(
        $('<div/>',{
            class:'pageSection pT10',
        }).append(
            $('<div/>',{class:'pageSectionTitle'}).append(
                $('<span/>',{text:texts.cpanel.menu.dine_in_settings}),
            ),
            $('<div/>',{class:'pageTabs'}).append(
                $('<div/>',{class:'pageTabArrow pageTabArrowLeft ico-left'}),
                $('<div/>',{class:'pageTabsContainer'}).append(
                    $('<div/>',{tab:'dinein_working_days',class:'pageTab pageTab_selected'}).append(
                        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'dinein_working_days-NoSave ico-warning unsaved none mie-5 mis-2 fs1 '}),
                        $('<span/>',{text:texts.settings.workingDays})
                    ),
                    $('<div/>',{tab:'dinein_service_charge_settings',class:'pageTab'}).append(
                        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'dinein_service_charge_settings-noSave ico-warning unsaved none mie-5 mis-2 fs1 '}),
                        $('<span/>',{text:texts.settings.serviceCharge})
                    ),
                    $('<div/>',{tab:'dinein_tax_settings',class:'pageTab'}).append(
                        $('<span/>',{tooltip:texts.cpanel.public.unsaved,class:'dinein_tax_settings-noSave ico-warning unsaved none mie-5 mis-2 fs1 '}),
                        $('<span/>',{text:texts.settings.taxSettings})
                    ),
                ),
                $('<div/>',{class:'pageTabArrow pageTabArrowRight ico-right'}),
            ),
            $('<div/>',{class:'pageTabContainer pageTabContainer_selected',tab:'dinein_working_days'}).append(
                $('<div/>',{class:'pageSectionTitle2'}).append(
                    $('<span/>',{class:'dinein_working_days-NoSave unsaved ico-warning mie-5 none',tooltip:texts.cpanel.public.unsaved}),
                    $('<span/>',{text:texts.settings.workingDays}),
                    $('<span/>',{class:'ico-help help-icon',helpId:'setting_the_working_days'})
                ),
                $('<div/>',{class:'w100p overflowX-A'}).append(
                    $('<table/>',{id:'dinein-WorkingDaysTable',class:'w100p',autoHelp:'working_days_list'})
                )
            ),
            $('<div/>',{class:'pageTabContainer',tab:'dinein_service_charge_settings'}).append(
                $('<div/>',{class:'pageSectionTitle2'}).append(
                    $('<span/>',{class:'dinein_service_charge_settings-noSave unsaved ico-warning mie-5 none',tooltip:texts.cpanel.public.unsaved}),
                    $('<span/>',{text:texts.settings.serviceCharge}),
                    $('<span/>',{class:'ico-help help-icon',helpId:'service_charge'})
                ),
                $('<div/>',{class:'wFC'}).append(
                    $('<div/>',{class:'row alnC jstfySB checkboxlabel_100p brdrT0 mT10 useDineinServiceCost'}).append(
                        $('<div/>',{text:texts.settings.fixedCost,class:'fs09 mie-10'}),$('<div/>',{class:'fs09 useDineinServiceCostCheck ico-check0'})
                    ),
                    $('<div/>',{class:'row alnC jstfySB checkboxlabel_100p useDineinServicePercent'}).append(
                        $('<div/>',{text:texts.settings.percent,class:'fs09 mie-10'}),$('<div/>',{class:'fs09 useDineinServicePercentCheck ico-check0'})
                    ),
                    drawInputText('','ico-money','',texts.settings.serviceCost,'dineinServiceCost','number',texts.settings.serviceCost,50,'clearVal','dineinServiceCostContainer inputTextContainer_100p',website_temp.dineInServiceCost,false),
                    drawInputText('','ico-percent','',texts.settings.servicePercent,'dineinServicePercent','number',texts.settings.servicePercent,50,'clearVal','dineinServicePercentContainer inputTextContainer_100p',website_temp.dineInServicePercentage,false)
                ),
                drawSaveCancelBtns('dineinServiceSaveBtn','dineinServiceCancelBtn','mT40')

            ),
            $('<div/>',{class:'pageTabContainer',tab:'dinein_tax_settings'}).append(
                $('<div/>',{class:'pageSectionTitle2'}).append(
                    $('<span/>',{class:'dinein_tax_settings-noSave unsaved ico-warning mie-5 none',tooltip:texts.cpanel.public.unsaved}),
                    $('<span/>',{text:texts.settings.taxSettings}),
                    $('<span/>',{class:'ico-help help-icon',helpId:'tax_settings'})
                ),
                $('<div/>',{class:'wFC'}).append(
                    $('<div/>',{class:'row alnC jstfySB checkboxlabel_100p brdrT0 mT10 useDineinTaxCost'}).append(
                        $('<div/>',{text:texts.settings.fixedCost,class:'fs09 mie-10'}),$('<div/>',{class:'fs09 useDineinTaxCostCheck ico-check0'})
                    ),
                    $('<div/>',{class:'row alnC jstfySB checkboxlabel_100p useDineinTaxPercent'}).append(
                        $('<div/>',{text:texts.settings.percent,class:'fs09 mie-10'}),$('<div/>',{class:'fs09 useDineinTaxPercentCheck ico-check0'})
                    ),
                    drawInputText('','ico-money','',texts.settings.taxCost,'dineinTaxCost','number',texts.settings.taxCost,50,'clearVal','dineinTaxCostContainer inputTextContainer_100p',website_temp.dineInTaxCost,false),
                    drawInputText('','ico-percent','',texts.settings.taxPercent,'dineinTaxPercent','number',texts.settings.taxPercent,50,'clearVal','dineinTaxPercentContainer inputTextContainer_100p',website_temp.dineInTaxPercentage,false)
                ),
                drawSaveCancelBtns('dineinTaxSaveBtn','dineinTaxCancelBtn','mT40')

            ),
        )
    )
    if(website_temp.useDineInServiceCost == 1){
        $('.useDineinServiceCostCheck').removeClass('ico-check0').addClass('ico-check1')
        $('.useDineinServicePercentCheck').removeClass('ico-check1').addClass('ico-check0')
        $('.dineinServiceCostContainer').removeClass('none')
        $('.dineinServicePercentContainer').addClass('none')
    }else{
        $('.useDineinServiceCostCheck').removeClass('ico-check1').addClass('ico-check0')
        $('.useDineinServicePercentCheck').removeClass('ico-check0').addClass('ico-check1')
        $('.dineinServiceCostContainer').addClass('none')
        $('.dineinServicePercentContainer').removeClass('none')
    }
    if(website_temp.useDineInTaxCost == 1){
        $('.useDineinTaxCostCheck').removeClass('ico-check0').addClass('ico-check1')
        $('.useDineinTaxPercentCheck').removeClass('ico-check1').addClass('ico-check0')
        $('.dineinTaxCostContainer').removeClass('none')
        $('.dineinTaxPercentContainer').addClass('none')
    }else{
        $('.useDineinTaxCostCheck').removeClass('ico-check1').addClass('ico-check0')
        $('.useDineinTaxPercentCheck').removeClass('ico-check0').addClass('ico-check1')
        $('.dineinTaxCostContainer').addClass('none')
        $('.dineinTaxPercentContainer').removeClass('none')
    }
    drawWorkingDaysTable('dinein');
    dine_in_settings_unsave_check();
}
