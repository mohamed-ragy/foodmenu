require('./dinein/tax.js'); // done
require('./dinein/service.js'); // done

dineinWorkingDaysNoSaveCheck = function(){
    let dineinWorkingDaysCheck = true;
    for(const key in website.workingDays_dinein){
        if(
            website.workingDays_dinein[key].working == website_temp.workingDays_dinein[key].working && 
            website.workingDays_dinein[key].working24 == website_temp.workingDays_dinein[key].working24 && 
            website.workingDays_dinein[key].from == website_temp.workingDays_dinein[key].from && 
            website.workingDays_dinein[key].to == website_temp.workingDays_dinein[key].to && 
            website.workingDays_dinein[key].discount == website_temp.workingDays_dinein[key].discount && 
            website.workingDays_dinein[key].Dfrom == website_temp.workingDays_dinein[key].Dfrom && 
            website.workingDays_dinein[key].Dto == website_temp.workingDays_dinein[key].Dto 

        ){
            $(`.workingHoursNotSaved-dinein-${key}`).addClass('none');
        }else{
            $(`.workingHoursNotSaved-dinein-${key}`).removeClass('none');
            dineinWorkingDaysCheck = false;
        }
    }
    if(dineinWorkingDaysCheck){
        $('.dinein_working_days-NoSave').addClass('none')
        return true;
    }else{
        $('.dinein_working_days-NoSave').removeClass('none')
        return false;
    }
}
