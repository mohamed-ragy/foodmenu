
system_unsave_check = function(){
    systemSettingsNoSaveCheck()
    region_nosaveCheck()
    websitePrivacyPolicyNoSaveCheck()
    if(
        systemSettingsNoSaveCheck() &&
        region_nosaveCheck() &&
        websitePrivacyPolicyNoSaveCheck()
    ){
        $('.system_unsaved').addClass('none');
    }else{
        $('.system_unsaved').removeClass('none');
    }
    settings_unsave_check();
}
control_panel_settings_unsave_check = function(){
    viewSettingsNoSaveCheck()
    controlSettingsNoSaveCheck()
    guideModeNoSaveCheck()
    alertNotificationsNoSaveCheck()
    if(
        viewSettingsNoSaveCheck() &&
        controlSettingsNoSaveCheck() &&
        guideModeNoSaveCheck() &&
        alertNotificationsNoSaveCheck()
    ){
        $('.control_panel_settings_unsaved').addClass('none');
    }else{
        $('.control_panel_settings_unsaved').removeClass('none');
    }
    settings_unsave_check();
}
restaurant_information_unsave_chack = function(){
    websiteNamesNoSaveFunction();
    websiteDescriptionsNoSaveFunction();
    restaurantEmailNoSaveFunction();
    phoneNumberNoSaveCheck();
    websiteAddressNoSaveCheck();
    restaurantLocationNoSaveCheck();
    currenciesNoSaveCheck();
    checkSocailMediaLinksNoSave();
    websiteAnnouncementsNoSaveFunction();
    websiteReceiptMsgsNoSaveFunction();
    if(
        websiteNamesNoSaveFunction() &&
        websiteDescriptionsNoSaveFunction() &&
        restaurantEmailNoSaveFunction() &&
        phoneNumberNoSaveCheck() &&
        websiteAddressNoSaveCheck() &&
        restaurantLocationNoSaveCheck() &&
        currenciesNoSaveCheck() &&
        checkSocailMediaLinksNoSave() &&
        websiteAnnouncementsNoSaveFunction() &&
        websiteReceiptMsgsNoSaveFunction()
    ){
        $('.restaurant_information_unsaved').addClass('none');
    }else{
        $('.restaurant_information_unsaved').removeClass('none');
    }
    settings_unsave_check();
}
languages_unsave_check = function(){
    langsOptionsNoSaveCheck();
    langsTxtsNoSaveCheck();
    if(
        langsOptionsNoSaveCheck() && langsTxtsNoSaveCheck()
    ){
        $('.languages_unsaved').addClass('none');
    }else{
        $('.languages_unsaved').removeClass('none');
    }
    settings_unsave_check();
}
promo_codes_unsave_check = function(){
    editPromocodeNoSaveCheck();
    if(
        editPromocodeNoSaveCheck()
    ){
        $('.promo_codes_unsaved').addClass('none');
    }else{
        $('.promo_codes_unsaved').removeClass('none');
    }
    settings_unsave_check();
}
home_delivery_settings_unsave_check = function(){
    homeDeliveryTaxNoSaveCheck();
    deliveryMinimumChargeNoSaveCheck();
    deliveryPaymentMethodsNoSaveCheck();
    deliveryCostNoSavecheck();
    avgDeliveryTimeNoSaveCheck();
    homeDeliveryWorkingDaysNoSaveCheck();
    if(
        homeDeliveryTaxNoSaveCheck() &&
        deliveryMinimumChargeNoSaveCheck() &&
        deliveryPaymentMethodsNoSaveCheck() &&
        deliveryCostNoSavecheck() &&
        avgDeliveryTimeNoSaveCheck() &&
        homeDeliveryWorkingDaysNoSaveCheck()
    ){
        $('.home_delivery_settings_unsaved').addClass('none')
    }else{
        $('.home_delivery_settings_unsaved').removeClass('none')
    }
    settings_unsave_check();
}
order_pickup_settings_unsave_check = function(){
    pickupWorkingDaysNoSaveCheck();
    avgPickupTimeNoSaveCheck();
    pickupPaymentMethodsNoSaveCheck();
    pickupMinimumChargeNoSaveCheck();
    pickupTaxNoSaveCheck();
    if(
        pickupWorkingDaysNoSaveCheck() &&
        avgPickupTimeNoSaveCheck() &&
        pickupPaymentMethodsNoSaveCheck() &&
        pickupMinimumChargeNoSaveCheck() &&
        pickupTaxNoSaveCheck()
    ){
        $('.order_pickup_settings_unsaved').addClass('none')
    }else{
        $('.order_pickup_settings_unsaved').removeClass('none')
    }
    settings_unsave_check();
}
dine_in_settings_unsave_check = function(){
    dineinWorkingDaysNoSaveCheck();
    dineinTaxNoSaveCheck();
    dineinServiceNoSaveCheck();
    if(
        dineinWorkingDaysNoSaveCheck() &&
        dineinTaxNoSaveCheck() &&
        dineinServiceNoSaveCheck()
    ){
        $('.dine_in_settings_unsaved').addClass('none')
    }else{
        $('.dine_in_settings_unsaved').removeClass('none')
    }
    settings_unsave_check();
}
settings_unsave_check = function(){
    if(
        $('.system_unsaved').hasClass('none') &&
        $('.restaurant_information_unsaved').hasClass('none') &&
        $('.control_panel_settings_unsaved').hasClass('none') &&
        $('.languages_unsaved').hasClass('none') &&
        $('.promo_codes_unsaved').hasClass('none') &&
        $('.home_delivery_settings_unsaved').hasClass('none') &&
        $('.order_pickup_settings_unsaved').hasClass('none')
    ){
        $('.settings_unsaved').addClass('none');
    }else{
        $('.settings_unsaved').removeClass('none');
    }
    globalUnsaveChecker_navMenu();
}
