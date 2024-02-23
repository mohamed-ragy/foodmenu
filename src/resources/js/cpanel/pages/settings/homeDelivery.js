require('./delivery/deliveryCost.js');//done//
require('./delivery/avgTime.js')//done//
require('./delivery/paymentMethod.js')//done//
require('./delivery/minimumCharge.js')//done//
require('./delivery/tax.js');//done//
homeDeliveryWorkingDaysNoSaveCheck = function(){
    let homeDeliveryWorkingDaysCheck = true;
    for(const key in website.workingDays_delivery){
        if(
            website.workingDays_delivery[key].working == website_temp.workingDays_delivery[key].working &&
            website.workingDays_delivery[key].working24 == website_temp.workingDays_delivery[key].working24 &&
            website.workingDays_delivery[key].from == website_temp.workingDays_delivery[key].from &&
            website.workingDays_delivery[key].to == website_temp.workingDays_delivery[key].to &&
            website.workingDays_delivery[key].discount == website_temp.workingDays_delivery[key].discount &&
            website.workingDays_delivery[key].Dfrom == website_temp.workingDays_delivery[key].Dfrom &&
            website.workingDays_delivery[key].Dto == website_temp.workingDays_delivery[key].Dto

        ){
            $(`.workingHoursNotSaved-delivery-${key}`).addClass('none');
        }else{
            $(`.workingHoursNotSaved-delivery-${key}`).removeClass('none');
            homeDeliveryWorkingDaysCheck = false;
        }
    }
    if(homeDeliveryWorkingDaysCheck){
        $('.delivery_working_days-NoSave').addClass('none')
        return true;
    }else{
        $('.delivery_working_days-NoSave').removeClass('none')
        return false;
    }
}
