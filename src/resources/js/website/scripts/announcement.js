if(window.announcement != null && window.announcement != ''){
    announcement_Arr.push(window.announcement)
}
getDiscountAnnouncement_delivery = function(){
    let now = new Date();
    let now2 = new Date(new Date().toLocaleString('en-US',{timeZone:website.timeZone}))
    let hour = now2.toLocaleString('en-US',{hour:'numeric',hour12 :0})
    let minute = now2.toLocaleString('en-US',{minute:'numeric',hour12 :0})
    if(hour == 24){hour = '00';}
    switch( now2.toLocaleString('en-US',{weekday:'long',hour12 :0}).toLowerCase() ){
        case 'monday':yesterday = 'sunday';dayOfWeek = 'monday';break;
        case 'tuesday':yesterday = 'monday';dayOfWeek = 'tuesday';break;
        case 'wednesday':yesterday = 'tuesday';dayOfWeek = 'wednesday';break;
        case 'thursday':yesterday = 'wednesday';dayOfWeek = 'thursday';break;
        case 'friday':yesterday = 'thursday';dayOfWeek = 'friday';break;
        case 'saturday':yesterday = 'friday';dayOfWeek = 'saturday';break;
        case 'sunday':yesterday = 'saturday';dayOfWeek = 'sunday';break;
    }

    times = website.workingDays_delivery
    todayDiscount = times[dayOfWeek].discount;
    todayFrom = parseFloat(times[dayOfWeek].Dfrom);
    todayTo = parseFloat(times[dayOfWeek].Dto);
    yesterdayDiscount = times[yesterday].discount;
    yesterdayFrom = parseFloat(times[yesterday].Dfrom);
    yesterdayTo = parseFloat(times[yesterday].Dto);

    if(minute < 10){minute = '0'+minute;}
    timeNow = parseFloat(hour+'.'+minute);

    if(parseInt(todayDiscount) > 0 && todayFrom < todayTo){
        if( timeNow >= todayFrom && timeNow <= todayTo){
            return {discount:todayDiscount,now:1,from:parseFloat(todayFrom).toFixed(2),to:parseFloat(todayTo).toFixed(2)};
        }else if(timeNow < todayFrom){
            return {discount:todayDiscount,now:0,from:parseFloat(todayFrom).toFixed(2),to:parseFloat(todayTo).toFixed(2)};
        }
    }else if(parseInt(todayDiscount) > 0 && todayFrom > todayTo){
        if(timeNow >= todayFrom){
            return {discount:todayDiscount,now:1,from:parseFloat(todayFrom).toFixed(2),to:parseFloat(todayTo).toFixed(2)};
        }else if(timeNow < todayFrom){
            return {discount:todayDiscount,now:0,from:parseFloat(todayFrom).toFixed(2),to:parseFloat(todayTo).toFixed(2)};
        }
    }

    if(parseInt(yesterdayDiscount) > 0 && yesterdayFrom > yesterdayTo){
        if(timeNow <= yesterdayTo){
            return {discount:yesterdayDiscount,now:1,from:parseFloat(yesterdayFrom).toFixed(2),to:parseFloat(yesterdayTo).toFixed(2)};
        }
    }


    return{discount:0}

}
getDiscountAnnouncement_pickup = function(){

    let now = new Date();
    let now2 = new Date(new Date().toLocaleString('en-US',{timeZone:website.timeZone}))
    let hour = now2.toLocaleString('en-US',{hour:'numeric',hour12 :0})
    let minute = now2.toLocaleString('en-US',{minute:'numeric',hour12 :0})
    if(hour == 24){hour = '00';}
    switch( now2.toLocaleString('en-US',{weekday:'long',hour12 :0}).toLowerCase() ){
        case 'monday':yesterday = 'sunday';dayOfWeek = 'monday';break;
        case 'tuesday':yesterday = 'monday';dayOfWeek = 'tuesday';break;
        case 'wednesday':yesterday = 'tuesday';dayOfWeek = 'wednesday';break;
        case 'thursday':yesterday = 'wednesday';dayOfWeek = 'thursday';break;
        case 'friday':yesterday = 'thursday';dayOfWeek = 'friday';break;
        case 'saturday':yesterday = 'friday';dayOfWeek = 'saturday';break;
        case 'sunday':yesterday = 'saturday';dayOfWeek = 'sunday';break;
    }

    times = website.workingDays_pickup
    todayDiscount = times[dayOfWeek].discount;
    todayFrom = parseFloat(times[dayOfWeek].Dfrom);
    todayTo = parseFloat(times[dayOfWeek].Dto);
    yesterdayDiscount = times[yesterday].discount;
    yesterdayFrom = parseFloat(times[yesterday].Dfrom);
    yesterdayTo = parseFloat(times[yesterday].Dto);

    if(minute < 10){minute = '0'+minute;}
    timeNow = parseFloat(hour+'.'+minute);

    if(parseInt(todayDiscount) > 0 && todayFrom < todayTo){
        if( timeNow >= todayFrom && timeNow <= todayTo){
            return {discount:todayDiscount,now:1,from:parseFloat(todayFrom).toFixed(2),to:parseFloat(todayTo).toFixed(2)};
        }else if(timeNow < todayFrom){
            return {discount:todayDiscount,now:0,from:parseFloat(todayFrom).toFixed(2),to:parseFloat(todayTo).toFixed(2)};
        }
    }else if(parseInt(todayDiscount) > 0 && todayFrom > todayTo){
        if(timeNow >= todayFrom){
            return {discount:todayDiscount,now:1,from:parseFloat(todayFrom).toFixed(2),to:parseFloat(todayTo).toFixed(2)};
        }else if(timeNow < todayFrom){
            return {discount:todayDiscount,now:0,from:parseFloat(todayFrom).toFixed(2),to:parseFloat(todayTo).toFixed(2)};
        }
    }

    if(parseInt(yesterdayDiscount) > 0 && yesterdayFrom > yesterdayTo){
        if(timeNow <= yesterdayTo){
            return {discount:yesterdayDiscount,now:1,from:parseFloat(yesterdayFrom).toFixed(2),to:parseFloat(yesterdayTo).toFixed(2)};
        }
    }


    return{discount:0}

}
getDiscountAnnouncement_dinein = function(){

    let now = new Date();
    let now2 = new Date(new Date().toLocaleString('en-US',{timeZone:website.timeZone}))
    let hour = now2.toLocaleString('en-US',{hour:'numeric',hour12 :0})
    let minute = now2.toLocaleString('en-US',{minute:'numeric',hour12 :0})
    if(hour == 24){hour = '00';}
    switch( now2.toLocaleString('en-US',{weekday:'long',hour12 :0}).toLowerCase() ){
        case 'monday':yesterday = 'sunday';dayOfWeek = 'monday';break;
        case 'tuesday':yesterday = 'monday';dayOfWeek = 'tuesday';break;
        case 'wednesday':yesterday = 'tuesday';dayOfWeek = 'wednesday';break;
        case 'thursday':yesterday = 'wednesday';dayOfWeek = 'thursday';break;
        case 'friday':yesterday = 'thursday';dayOfWeek = 'friday';break;
        case 'saturday':yesterday = 'friday';dayOfWeek = 'saturday';break;
        case 'sunday':yesterday = 'saturday';dayOfWeek = 'sunday';break;
    }

    times = website.workingDays_dinein
    todayDiscount = times[dayOfWeek].discount;
    todayFrom = parseFloat(times[dayOfWeek].Dfrom);
    todayTo = parseFloat(times[dayOfWeek].Dto);
    yesterdayDiscount = times[yesterday].discount;
    yesterdayFrom = parseFloat(times[yesterday].Dfrom);
    yesterdayTo = parseFloat(times[yesterday].Dto);

    if(minute < 10){minute = '0'+minute;}
    timeNow = parseFloat(hour+'.'+minute);

    if(parseInt(todayDiscount) > 0 && todayFrom < todayTo){
        if( timeNow >= todayFrom && timeNow <= todayTo){
            return {discount:todayDiscount,now:1,from:parseFloat(todayFrom).toFixed(2),to:parseFloat(todayTo).toFixed(2)};
        }else if(timeNow < todayFrom){
            return {discount:todayDiscount,now:0,from:parseFloat(todayFrom).toFixed(2),to:parseFloat(todayTo).toFixed(2)};
        }
    }else if(parseInt(todayDiscount) > 0 && todayFrom > todayTo){
        if(timeNow >= todayFrom){
            return {discount:todayDiscount,now:1,from:parseFloat(todayFrom).toFixed(2),to:parseFloat(todayTo).toFixed(2)};
        }else if(timeNow < todayFrom){
            return {discount:todayDiscount,now:0,from:parseFloat(todayFrom).toFixed(2),to:parseFloat(todayTo).toFixed(2)};
        }
    }

    if(parseInt(yesterdayDiscount) > 0 && yesterdayFrom > yesterdayTo){
        if(timeNow <= yesterdayTo){
            return {discount:yesterdayDiscount,now:1,from:parseFloat(yesterdayFrom).toFixed(2),to:parseFloat(yesterdayTo).toFixed(2)};
        }
    }


    return{discount:0}

}
if(website.discountAnnouncement){
    deliveryDiscount = getDiscountAnnouncement_delivery();
    pickupDiscount = getDiscountAnnouncement_pickup();
    dineInDiscount = getDiscountAnnouncement_dinein();
    if(deliveryDiscount.discount > 0){
        if(deliveryDiscount.now == 1){
            announcement_Arr.push(texts.orders.availableNow+' '+deliveryDiscount.discount+'% '+texts.orders.discountDeliveryUntil+' '+translateFloatToTime(deliveryDiscount.to))
        }else if(deliveryDiscount.now == 0){
            announcement_Arr.push(deliveryDiscount.discount+'% '+texts.orders.discountDeliverySoon+' '+translateFloatToTime(deliveryDiscount.from)+' '+texts.orders.to+' '+translateFloatToTime(deliveryDiscount.to))
        }
    }
    if(pickupDiscount.discount > 0){
        if(pickupDiscount.now == 1){
            announcement_Arr.push(texts.orders.availableNow+' '+pickupDiscount.discount+'% '+texts.orders.discountPickupUntil+' '+translateFloatToTime(pickupDiscount.to))
        }else if(pickupDiscount.now == 0){
            announcement_Arr.push(pickupDiscount.discount+'% '+texts.orders.discountPickupSoon+' '+translateFloatToTime(pickupDiscount.from)+' '+texts.orders.to+' '+translateFloatToTime(pickupDiscount.to))
        }
    }
    if(dineInDiscount.discount > 0){
        if(dineInDiscount.now == 1){
            announcement_Arr.push(texts.orders.availableNow+' '+dineInDiscount.discount+'% '+texts.orders.discountDineinUntil+' '+translateFloatToTime(dineInDiscount.to))
        }else if(dineInDiscount.now == 0){
            announcement_Arr.push(dineInDiscount.discount+'% '+texts.orders.discountDineinSoon+' '+translateFloatToTime(dineInDiscount.from)+' '+texts.orders.to+' '+translateFloatToTime(dineInDiscount.to))
        }
    }
}

if(typeof Cookies.get('announcement') === 'undefined'){
    Cookies.set('announcement','true',{ expires:1 })
}else{
    if(Cookies.get('announcement') == 'false' || announcement_Arr.length == 0){
        $('.announcement').addClass('none');
    }
}
$('html,body').on('click','.announcementClose',(e)=>{
    e.stopImmediatePropagation();
    Cookies.set('announcement','false',{ expires:1 })
    $('.announcement').addClass('none');
})
