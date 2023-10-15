calcPlaceOrderCheck = function(){
    let orderType = $('.placeOrderTypeCheck.ico-check1').closest('.placeOrderTypeCard').attr('orderType');
    let itemsTotal = 0; let discount_itemsTotal;
    let taxPercent = 0; let tax = 0;
    let servicePercent = 0; let service = 0;
    let deliveryCost = 0;
    let total;
    /////
    for(const key in window.placeOrder.items){
        itemsTotal = itemsTotal + parseFloat(window.placeOrder.items[key].total);
    }
    discount_itemsTotal = itemsTotal - ((window.placeOrder.discount / 100) * itemsTotal);
    /////
    switch(orderType){
        case 'dineIn':
            if(website.useDineInTaxCost){
                tax = parseFloat(website.dineInTaxCost);
                taxPercent = 0;
            }else{
                taxPercent = parseFloat(website.dineInTaxPercentage);
                tax = (parseFloat(website.dineInTaxPercentage) / 100) * discount_itemsTotal;
            }
            if(website.useDineInServiceCost){
                service = parseFloat(website.dineInServiceCost);
                servicePercent = 0;
            }else{
                servicePercent = parseFloat(website.dineInServicePercentage);
                service = (parseFloat(website.dineInServicePercentage) / 100) * discount_itemsTotal;
            }
        break;
        case 'delivery':
            if(website.useDeliveryTaxCost){
                tax = parseFloat(website.deliveryTaxCost);
                taxPercent = 0;
            }else{
                taxPercent = parseFloat(website.deliveryTaxPercentage);
                tax = (parseFloat(website.deliveryTaxPercentage) / 100) * discount_itemsTotal;
            }
            deliveryCost = parseFloat(window.placeOrder.deliveryCost);
        break;
        case 'pickup':
            if(website.usePickupTaxCost){
                tax = parseFloat(website.pickupTaxCost);
                taxPercent = 0;
            }else{
                taxPercent = parseFloat(website.pickupTaxPercentage);
                tax = (parseFloat(website.pickupTaxPercentage) / 100) * discount_itemsTotal;
            }
        break;
    }

    total = discount_itemsTotal + tax + service + deliveryCost;
    return{
        orderType:orderType,
        discount:window.placeOrder.discount,
        discount_itemsTotal:parseFloat(discount_itemsTotal).toFixed(2),
        itemsTotal:itemsTotal.toFixed(2),
        taxPercent:taxPercent.toFixed(2),
        tax:tax.toFixed(2),
        servicePercent:servicePercent.toFixed(2),
        service:service.toFixed(2),
        deliveryCost:deliveryCost.toFixed(2),
        total:parseFloat(total).toFixed(2),
    }
}
drawPlaceOrderCheck = function(){
    let orderCheck = calcPlaceOrderCheck();
    $('#placeOrder-discount').val(orderCheck.discount);
    $('#placeOrder-discount_itemsTotal').text(orderCheck.discount_itemsTotal);
    $('#placeOrder-itemsTotal').text(orderCheck.itemsTotal)
    if(orderCheck.itemsTotal == orderCheck.discount_itemsTotal){
        $('#placeOrder-discount_itemsTotal').addClass('none');
        $('#placeOrder-itemsTotal').removeClass('lThrough');
    }else{
        $('#placeOrder-discount_itemsTotal').removeClass('none');
        $('#placeOrder-itemsTotal').addClass('lThrough');
    }

    if(orderCheck.tax > 0){
        $('#placeOrder-taxContainer').removeClass('none');
        $('#placeOrder-taxPercent').text(orderCheck.taxPercent+'%');
        $('#placeOrder-tax').text(orderCheck.tax)
        orderCheck.taxPercent == 0 ? $('#placeOrder-taxPercent').addClass('none') : $('#placeOrder-taxPercent').removeClass('none');
    }else{
        $('#placeOrder-taxContainer').addClass('none');
    }
    if(orderCheck.service > 0){
        $('#placeOrder-serviceContainer').removeClass('none');
        $('#placeOrder-servicePercent').text(orderCheck.servicePercent+'%');
        $('#placeOrder-service').text(orderCheck.service)
        orderCheck.servicePercent == 0 ? $('#placeOrder-servicePercent').addClass('none') : $('#placeOrder-servicePercent').removeClass('none');
    }else{
        $('#placeOrder-serviceContainer').addClass('none');
    }
    if(orderCheck.orderType == 'delivery'){
        $('#placeOrder-deliveryCostContainer').removeClass('none');
        $('#placeOrder-deliveryCost').val(orderCheck.deliveryCost)
    }else{
        $('#placeOrder-deliveryCostContainer').addClass('none');
    }
    $('#placeOrder-total').text(website.currency+orderCheck.total)



    $('#placeOrder-discountTxt').text(texts.orders.discount);

    if(orderCheck.orderType == 'dineIn'){
        if(getDiscount(website.workingDays_dinein) == orderCheck.discount && orderCheck.discount > 0){
            $('#placeOrder-discountTxt').text(texts.orders.scheduledDiscount);
        }
    }else if(orderCheck.orderType == 'delivery'){
        if(getDiscount(website.workingDays_delivery) == orderCheck.discount && orderCheck.discount > 0){
            $('#placeOrder-discountTxt').text(texts.orders.scheduledDiscount);
        }
    }else if(orderCheck.orderType == 'pickup'){
        if(getDiscount(website.workingDays_pickup) == orderCheck.discount && orderCheck.discount > 0){
            $('#placeOrder-discountTxt').text(texts.orders.scheduledDiscount);
        }
    }
}
////////////
$('#placeOrder-deliveryCost').on('focusout change',function(){
    $(this).val($(this).val().replaceAll(/[^0-9\.]/g,''));

    if($(this).val() == ''){$(this).val('0.00')}
    if($(this).val() <= 0){$(this).val('0.00')}

    window.placeOrder.deliveryCost = parseFloat($(this).val()).toFixed(2)
    drawPlaceOrderCheck();
})
$('#placeOrder-deliveryCostEdit').on('click',function(){
    $('#placeOrder-deliveryCost').select();
})
////////
$('#placeOrder-discount').on('focusout change',function(){
    $(this).val($(this).val().replaceAll(/[^0-9]/g,''));
    if($(this).val() == ''){$(this).val('0')}
    if($(this).val() < 0){$(this).val('0')}
    if($(this).val() > 100){$(this).val('100')}

    window.placeOrder.discount = parseInt($(this).val())
    drawPlaceOrderCheck();
})
$('#placeOrder-discountEdit').on('click',function(){
    $('#placeOrder-discount').select();
})
////////

