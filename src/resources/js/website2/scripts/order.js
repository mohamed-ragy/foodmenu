ProductAvailabilityCheck = function(productId = null){
    if(productId == null){
        $('.addToCart').each(function(){
            let product = products.find(item => item.id == $(this).attr('productid'));
            if(product != null){
                if(product.availability == true){
                   $(this).prop('disabled',false);
                   $(this).text(texts.orders.addToCart)
                }else{
                    $(this).prop('disabled',true);
                    $(this).text(texts.orders.notAvailable)
                }
            }
        })
    }else{
        let product = products.find(item => item.id == productId);
        if(product != null){
            if(product.availability == true){
               $('.addToCart[productId="'+productId+'"]').prop('disabled',false);
               $('.addToCart[productId="'+productId+'"]').text(texts.orders.addToCart)
            }else{
                $('.addToCart[productId="'+productId+'"]').prop('disabled',true);
                $('.addToCart[productId="'+productId+'"]').text(texts.orders.notAvailable)
            }
        }
    }
}
checkOrderTimesAvailability = function(times){
    // return true;
    timeNow = new Date();
    dayOfWeek = timeNow.toLocaleString('en-US',{weekday:'long',timeZone:website.timeZone,hour12:0}).toLowerCase();
    hour = timeNow.toLocaleString('en-US',{hour:'numeric',timeZone:website.timeZone,hour12:0})
    minute = timeNow.toLocaleString('en-US',{minute:'numeric',timeZone:website.timeZone,hour12:0})
    if(hour == 24){hour = '00';}
    switch(dayOfWeek){
        case 'monday':yesterday = 'sunday';break;
        case 'tuesday':yesterday = 'monday';break;
        case 'wednesday':yesterday = 'tuesday';break;
        case 'thursday':yesterday = 'wednesday';break;
        case 'friday':yesterday = 'thursday';break;
        case 'saturday':yesterday = 'friday';break;
        case 'sunday':yesterday = 'saturday';break;
    }

    todayStatus = times[dayOfWeek].working;
    todayFrom = parseFloat(times[dayOfWeek].from);
    todayTo = parseFloat(times[dayOfWeek].to);
    yesterdayStatus = times[yesterday].working;
    yesterdayFrom = parseFloat(times[yesterday].from);
    yesterdayTo = parseFloat(times[yesterday].to);

    if(minute < 10){minute = '0'+minute;}
    timeNow = parseFloat(hour+'.'+minute);
    let working = false;
    if(todayStatus == true && todayFrom < todayTo){
        if( timeNow >= todayFrom && timeNow <= todayTo){
            working = true;
        }
    }else if(todayStatus == true && todayFrom > todayTo){
        if(timeNow >= todayFrom){
            working = true;
        }
    }

    if(yesterdayStatus == true && yesterdayFrom > yesterdayTo){
        if(timeNow <= yesterdayTo){
            working = true;
        }
    }
    if(times[dayOfWeek].working24 == true){
        working =  true;
    }
    return working;
}
checkNextWorkingTime = function(times){
    timeNow = new Date();
    today = timeNow.toLocaleString('en-US',{weekday:'long',timeZone:website.timeZone,hour12:0}).toLowerCase();
    hour = timeNow.toLocaleString('en-US',{hour:'numeric',timeZone:website.timeZone,hour12:0})
    minute = timeNow.toLocaleString('en-US',{minute:'numeric',timeZone:website.timeZone,hour12:0})
    if(hour == 24){hour = '00';}
    timeNow = parseFloat(hour+'.'+minute);
    switch(today){
        case 'sunday':tomorrow ='monday';afterTomorrow = 'tuesday';afterTomorrow1 = 'wednesday';afterTomorrow2 = 'thursday';afterTomorrow3 = 'friday';afterTomorrow4 = 'saturday';break;
        case 'monday':tomorrow ='tuesday';afterTomorrow = 'wednesday';afterTomorrow1 = 'thursday';afterTomorrow2 = 'friday';afterTomorrow3 = 'saturday';afterTomorrow4 = 'sunday';break;
        case 'tuesday':tomorrow ='wednesday';afterTomorrow = 'thursday';afterTomorrow1 = 'friday';afterTomorrow2 = 'saturday';afterTomorrow3 = 'sunday';afterTomorrow4 = 'monday';break;
        case 'wednesday':tomorrow ='thursday';afterTomorrow = 'friday';afterTomorrow1 = 'saturday';afterTomorrow2 = 'sunday';afterTomorrow3 = 'monday';afterTomorrow4 = 'tuesday';break;
        case 'thursday':tomorrow ='friday';afterTomorrow = 'saturday';afterTomorrow1 = 'sunday';afterTomorrow2 = 'monday';afterTomorrow3 = 'tuesday';afterTomorrow4 = 'wednesday';break;
        case 'friday':tomorrow ='saturday';afterTomorrow = 'sunday';afterTomorrow1 = 'monday';afterTomorrow2 = 'tuesday';afterTomorrow3 = 'wednesday';afterTomorrow4 = 'thursday';break;
        case 'saturday':tomorrow ='sunday';afterTomorrow = 'monday';afterTomorrow1 = 'tuesday';afterTomorrow2 = 'wednesday';afterTomorrow3 = 'thursday';afterTomorrow4 = 'friday';break;
    }

    if(times[today].working == true && timeNow < times[today].from){
        return texts.orders.todayAt+' '+' '+translateFloatToTime(times[today].from);
    }else if(times[tomorrow].working == true ){
        return texts.orders.tomorrowAt+' '+' '+translateFloatToTime(times[tomorrow].from);
    }else if(times[afterTomorrow].working == true){
        return texts.orders['next'+afterTomorrow]+' '+translateFloatToTime(times[afterTomorrow].from);
    }else if(times[afterTomorrow1].working == true){
        return texts.orders['next'+afterTomorrow1]+' '+translateFloatToTime(times[afterTomorrow1].from);
    }else if(times[afterTomorrow2].working == true){
        return texts.orders['next'+afterTomorrow2]+' '+translateFloatToTime(times[afterTomorrow2].from);
    }else if(times[afterTomorrow3].working == true){
        return texts.orders['next'+afterTomorrow3]+' '+translateFloatToTime(times[afterTomorrow3].from);
    }else if(times[afterTomorrow4].working == true){
        return texts.orders['next'+afterTomorrow4]+' '+translateFloatToTime(times[afterTomorrow4].from);
    }

}
translateFloatToTime = function(time){
    time = time.split('.');
    hour = time[0];
    minute = time[1];
    if(website.hour12 == 1){
        if(hour > 12){
            fixedHour = parseInt(hour) - 12;
            fixed12 = texts.orders.pm;
        }else if(hour == 0){
            fixedHour = 12;
            fixed12 = texts.orders.am;
        }
        else if(hour == 12){
            fixedHour = 12;
            fixed12 = texts.orders.pm;
        }else{
            fixedHour = parseInt(hour);
            fixed12 = texts.orders.am;
        }
        // return fixedHour+':'+minute+' '+fixed12;
        if(fixedHour < 10){fixedHour = '0'+parseInt(fixedHour)}
        return fixedHour+':'+minute+' '+fixed12;

        return [fixedHour,minute,fixed12];
    }else if(website.hour12 == 0){
        if(parseInt(hour) < 10){hour = '0'+parseInt(hour)}
        return hour+':'+minute;
    }


    return hour+':'+minute;
    // if(website.)
}
getDiscount = function(times){
    let now = new Date();
    let hour = getDateAndTime('now','hour24');
    let minute = getDateAndTime('now','minutes');
    if(hour == 24){hour = '00';}
    switch(timeNow.toLocaleString('en-US',{weekday:'long',timeZone:website.timeZone,hour12:0}).toLowerCase()){
        case 'monday':yesterday = 'sunday';dayOfWeek = 'monday';break;
        case 'tuesday':yesterday = 'monday';dayOfWeek = 'tuesday';break;
        case 'wednesday':yesterday = 'tuesday';dayOfWeek = 'wednesday';break;
        case 'thursday':yesterday = 'wednesday';dayOfWeek = 'thursday';break;
        case 'friday':yesterday = 'thursday';dayOfWeek = 'friday';break;
        case 'saturday':yesterday = 'friday';dayOfWeek = 'saturday';break;
        case 'sunday':yesterday = 'saturday';dayOfWeek = 'sunday';break;
    }

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
            return todayDiscount;
        }
    }else if(parseInt(todayDiscount) > 0 && todayFrom > todayTo){
        if(timeNow >= todayFrom){
            return todayDiscount;
        }
    }

    if(parseInt(yesterdayDiscount) > 0 && yesterdayFrom > yesterdayTo){
        if(timeNow <= yesterdayTo){
            return yesterdayDiscount;
        }
    }
    return 0;
}
calcOrderReceipt = function(){

    let orderDiscount = 0;
    let itemsTotal = parseFloat(calcCartTotal());
    let discount_itemsTotal = 0;
    let orderTax = 0;
    let taxPercent = 0;
    let orderdeliveryCost = 0;
    let orderTotal = 0;
    let minCharge = null;
    let minChargeAmount = 0;
    if($('.placeOrder-orderType[orderType="delivery"]').hasClass('placeOrder-orderTypeSelected')){
        orderDiscount = parseFloat(getDiscount(website.workingDays_delivery));
        discount_itemsTotal = itemsTotal - (( itemsTotal * orderDiscount ) / 100);
        if(window.promocode != null){
            orderDiscount = parseFloat(window.promocode.discount);
            discount_itemsTotal = itemsTotal - (( itemsTotal * orderDiscount ) / 100);
            if(window.promocode.cap > 0 && discount_itemsTotal > parseFloat(window.promocode.cap)){
                discount_itemsTotal = itemsTotal - parseFloat(window.promocode.cap);
            }

        }
        if(website.useDeliveryTaxCost){
            orderTax = parseFloat(website.deliveryTaxCost);
        }else if(!website.useDeliveryTaxCost){
            if(parseFloat(website.deliveryTaxPercentage) > 0){
                taxPercent = parseFloat(website.deliveryTaxPercentage);
                orderTax =  (parseFloat(website.deliveryTaxPercentage) / 100)  * discount_itemsTotal;
            }else if(parseFloat(website.deliveryTaxPercentage) == 0){
                taxPercent = parseFloat(website.deliveryTaxPercentage);
                orderTax =  0;
            }
        }
        orderdeliveryCost = parseFloat(website.deliveryCost);
        orderTotal = parseFloat(discount_itemsTotal.toFixed(2)) + parseFloat(orderTax.toFixed(2)) + parseFloat(orderdeliveryCost.toFixed(2));
        if(website.deliveryMinimumCharge > 0){
            minChargeAmount = parseFloat(website.deliveryMinimumCharge);
            if(website.deliveryMinimumChargeIncludes && website.deliveryMinimumCharge > orderTotal){
                minCharge = 'total';
            }else if(!website.deliveryMinimumChargeIncludes && website.deliveryMinimumCharge > itemsTotal){
                minCharge = 'items';
            }
        }
    }else if($('.placeOrder-orderType[orderType="pickup"]').hasClass('placeOrder-orderTypeSelected')){
        orderDiscount = parseFloat(getDiscount(website.workingDays_pickup));
        discount_itemsTotal = itemsTotal - (( itemsTotal * orderDiscount ) / 100);
        if(window.promocode != null){
            orderDiscount = parseFloat(window.promocode.discount);
            discount_itemsTotal = itemsTotal - (( itemsTotal * orderDiscount ) / 100);
            if(window.promocode.cap > 0 && discount_itemsTotal > parseFloat(window.promocode.cap)){
                discount_itemsTotal = itemsTotal - parseFloat(window.promocode.cap);
            }

        }
        if(website.usePickupTaxCost){
            orderTax = parseFloat(website.pickupTaxCost);
        }else if(!website.usePickupTaxCost){
            if(parseFloat(website.pickupTaxPercentage) > 0){
                taxPercent = parseFloat(website.pickupTaxPercentage);
                orderTax =  (parseFloat(website.pickupTaxPercentage) / 100)  * discount_itemsTotal;
            }else if(parseFloat(website.pickupTaxPercentage) == 0){
                taxPercent = parseFloat(website.pickupTaxPercentage);
                orderTax =  0;
            }
        }
        orderdeliveryCost = 0;
        orderTotal = parseFloat(discount_itemsTotal.toFixed(2)) + parseFloat(orderTax.toFixed(2));
        if(website.pickupMinimumCharge > 0){
            minChargeAmount = parseFloat(website.pickupMinimumCharge);
            if(website.pickupMinimumChargeIncludes && website.pickupMinimumCharge > orderTotal){
                minCharge = 'total';
            }else if(!website.pickupMinimumChargeIncludes && website.pickupMinimumCharge > itemsTotal){
                minCharge = 'items';
            }
        }
    }

    return{
        discount:orderDiscount.toFixed(2),
        itemsTotal:itemsTotal.toFixed(2),
        discount_itemsTotal:discount_itemsTotal.toFixed(2),
        taxPercent:taxPercent.toFixed(2),
        orderTax:orderTax.toFixed(2),
        deliveryCost:orderdeliveryCost.toFixed(2),
        total:orderTotal.toFixed(2),

        minCharge:minCharge,
        minChargeAmount:minChargeAmount.toFixed(2),
    }
}
getAvgTimeTxt = function(mins){
    if(mins == 0){return texts.orders.asSoonAsPossible}
    else if(mins == 1){return texts.orders.in+' '+mins+' '+texts.orders.min}
    else if(mins > 1 && mins < 60){return texts.orders.in+' '+mins+' '+texts.orders.mins}
    else if(mins == 60){return texts.orders.in+' '+(mins/60)+' '+texts.orders.hour}
    else if(mins > 60 && mins < 1440){return texts.orders.in+' '+(mins/60)+' '+texts.orders.hours}
    else if(mins == 1440){return texts.orders.in+' '+(mins/1440)+' '+texts.orders.day}
    else if(mins > 1440){return texts.orders.in+' '+(mins/1440)+' '+texts.orders.days}
}
require('./order/cart.js');
require('./order/addToCart.js');
require('./order/placeOrder.js');
require('./order/trackOrder.js');
require('./order/orderHistory.js');


// if(user.lat != 0 || user.lng != 0){
//     userLocationMap2.addLayer(userLocationMapMarker)
//     userLocationMapMarker.setLatLng([user.lat,user.lng,15]);
//     userLocationMap2.flyTo([user.lat,user.lng], 15, {
//         animate: false,
//         duration: 1
//     });
// }
