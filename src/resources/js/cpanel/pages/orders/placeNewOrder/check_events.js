$('html,body').on('click','#placeOrder-discountD',function(e){
    e.stopImmediatePropagation();
    if(window.placeOrder.discount == 0){return}
    window.placeOrder.discount = parseInt(window.placeOrder.discount) - 1;
    $('#placeOrder-discount').text(window.placeOrder.discount);
    drawPlaceOrderCheck();
})
$('html,body').on('click','#placeOrder-discountU',function(e){
    e.stopImmediatePropagation();
    if(window.placeOrder.discount == 100){return}
    window.placeOrder.discount = parseInt(window.placeOrder.discount) + 1;
    $('#placeOrder-discount').text(window.placeOrder.discount);
    drawPlaceOrderCheck();
})
$('html,body').on('change','#placeOrder-deliveryCost',function(e){
    e.stopImmediatePropagation();
    window.placeOrder.deliveryCost = parseFloat($(this).val());
    drawPlaceOrderCheck();
})
$('html,body').on('click','#placeOrder-editDeliveryCost',function(e){
    e.stopImmediatePropagation();
    $('#placeOrder-deliveryCost').select();
})
$('html,body').on('click','#placeOrder-applyHappyHour',function(e){
    e.stopImmediatePropagation();
    let discountCheck = 0 ;
    if(window.placeOrder.type == 0){discountCheck = getDiscount(website.workingDays_delivery)}
    if(window.placeOrder.type == 1){discountCheck = getDiscount(website.workingDays_pickup)}
    if(window.placeOrder.type == 2){discountCheck = getDiscount(website.workingDays_dinein)}
    window.placeOrder.discount = discountCheck;
    drawPlaceOrderCheck();

})
