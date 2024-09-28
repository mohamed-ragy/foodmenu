$('body').on('click','#placeOrder-discountD',function(e){
    if(window.placeOrder.discount == 0){return}
    window.placeOrder.discount = parseInt(window.placeOrder.discount) - 1;
    $('#placeOrder-discount').text(window.placeOrder.discount);
    drawPlaceOrderCheck();
})
$('body').on('click','#placeOrder-discountU',function(e){
    if(window.placeOrder.discount == 100){return}
    window.placeOrder.discount = parseInt(window.placeOrder.discount) + 1;
    $('#placeOrder-discount').text(window.placeOrder.discount);
    drawPlaceOrderCheck();
})
$('body').on('input','#placeOrder-deliveryCost',function(e){
    $(this)[0].value = $(this)[0].value.replace(/[^0-9.]/g, '');

})
$('body').on('change','#placeOrder-deliveryCost',function(e){
    window.placeOrder.deliveryCost = parseFloat($(this).val());
    drawPlaceOrderCheck();
})
$('body').on('click','#placeOrder-editDeliveryCost',function(e){
    $('#placeOrder-deliveryCost').select();
})
$('body').on('click','#placeOrder-applyHappyHour',function(e){
    let discountCheck = 0 ;
    if(window.placeOrder.type == 0){discountCheck = getDiscount(website.workingDays_delivery)}
    if(window.placeOrder.type == 1){discountCheck = getDiscount(website.workingDays_pickup)}
    if(window.placeOrder.type == 2){discountCheck = getDiscount(website.workingDays_dinein)}
    window.placeOrder.discount = discountCheck;
    drawPlaceOrderCheck();

})
