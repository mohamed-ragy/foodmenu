require('./pickup/avgTime.js') //done
require('./pickup/paymentMethod.js')//done
require('./pickup/miniCharge.js')//done
require('./pickup/tax.js')//done

pickupWorkingDaysNoSaveCheck = function(){
    let pickupWorkingDaysCheck = true;
    for(const key in website.workingDays_pickup){
        if(
            website.workingDays_pickup[key].working == website_temp.workingDays_pickup[key].working && 
            website.workingDays_pickup[key].working24 == website_temp.workingDays_pickup[key].working24 && 
            website.workingDays_pickup[key].from == website_temp.workingDays_pickup[key].from && 
            website.workingDays_pickup[key].to == website_temp.workingDays_pickup[key].to && 
            website.workingDays_pickup[key].discount == website_temp.workingDays_pickup[key].discount && 
            website.workingDays_pickup[key].Dfrom == website_temp.workingDays_pickup[key].Dfrom && 
            website.workingDays_pickup[key].Dto == website_temp.workingDays_pickup[key].Dto 

        ){
            $(`.workingHoursNotSaved-pickup-${key}`).addClass('none');
        }else{
            $(`.workingHoursNotSaved-pickup-${key}`).removeClass('none');
            pickupWorkingDaysCheck = false;
        }
    }
    if(pickupWorkingDaysCheck){
        $('.pickup_working_days-NoSave').addClass('none')
        return true;
    }else{
        $('.pickup_working_days-NoSave').removeClass('none')
        return false;
    }
}
