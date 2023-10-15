drawAboutusPhoneNumber = (phoneNumber) => {
    return $('<div/>',{class:'mX-10 mB-5 fs-09 phoneNumberCall pointer',text:phoneNumber,phoneNumber:phoneNumber})
}
drawAboutusAddress = (address) => {
    return $('<div/>',{class:'mX-10 mB-5 fs-09 ',text:address})
}
drawAboutusRestaurantEmail = (email) => {
    return $('<div/>',{class:'mX-10 mB-5 fs-09 ',text:email})
}

let deliveryWorkingHoursClass = 'workingHoursElem';
drawAboutusWorkingHour = (day,element,happyHourClass,happyHourToolTip) => {
    deliveryWorkingHoursClass == 'workingHoursElem' ? deliveryWorkingHoursClass = 'workingHoursElem_' : deliveryWorkingHoursClass = 'workingHoursElem';
    let dayTimesTxt = texts.other.hours24;
    if(!element.working24){
        dayTimesTxt = translateFloatToTime(element.from)+' ~ '+translateFloatToTime(element.to);
    }
    let wokringHour = $('<div/>',{
        class:deliveryWorkingHoursClass,
    }).append(
        $('<div/>',{class:'row alnC jstfyC workingHoursElemStart'}).append(
            $('<div/>',{text:texts.other[day]}),
            $('<div/>',{class:`ic-happyHour aboutusHappyHour ${happyHourClass}`,tooltip:happyHourToolTip})
        ),
        $('<div/>',{class:'workingHoursElemEnd',text:dayTimesTxt}),
    )
    return wokringHour;
}
showAboutUsPage = () =>{

}
