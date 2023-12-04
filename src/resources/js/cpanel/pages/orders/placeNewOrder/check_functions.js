calcPlaceOrderReceipt = function(){
    let orderType = window.placeOrder.type;
    let itemsTotal = calcPlaceOrderItemsTotel();
    let discount_itemsTotal;
    let tax = 0; let taxPercent = 0;
    let service = 0; let servicePercent = 0;
    let deliveryCost = 0;
    let total;

    discount_itemsTotal = itemsTotal - ((window.placeOrder.discount / 100) * itemsTotal);
    switch(orderType){
        case '2':
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
        case '0':
            if(website.useDeliveryTaxCost){
                tax = parseFloat(website.deliveryTaxCost);
                taxPercent = 0;
            }else{
                taxPercent = parseFloat(website.deliveryTaxPercentage);
                tax = (parseFloat(website.deliveryTaxPercentage) / 100) * discount_itemsTotal;
            }
            deliveryCost = parseFloat(window.placeOrder.deliveryCost);
        break;
        case '1':
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

    return {
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
    let discountCheck = 0 ;
    if(window.placeOrder.type == 0){discountCheck = getDiscount(website.workingDays_delivery)}
    if(window.placeOrder.type == 1){discountCheck = getDiscount(website.workingDays_pickup)}
    if(window.placeOrder.type == 2){discountCheck = getDiscount(website.workingDays_dinein)}
    let receipt = calcPlaceOrderReceipt();
    let happyHourElem = '';
    //discount(happy hour)
    if(discountCheck != receipt.discount && discountCheck > 0){
        happyHourElem = $('<div/>',{class:'placeOrderDiscountNotice'}).append(
            $('<span/>',{class:'m5 cO',text:texts.orders.happyHourNotice.replace(':service:',texts.orders[`type_${window.placeOrder.type}`]).replace(':discount:',discountCheck)}),
            $('<button/>',{class:'m5 alnsE btn-warning alnsE btn btn-cancel',id:'placeOrder-applyHappyHour',text:texts.orders.applyDiscount})
        )
    }
    ////subtotal
    let subTotalElem_text = $('<div/>',{class:'fs09',text:texts.orders.subTotal});
    let subTotalElem = $('<div/>',{class:'fs09',text:receipt.discount_itemsTotal});
    if(receipt.discount > 0){
        subTotalElem = $('<div/>',{class:'column alnE jstfyS'}).append(
            $('<div/>',{class:'lThrough',text:receipt.itemsTotal}),
            $('<div/>',{class:'',text:receipt.discount_itemsTotal}),
        );
    }
    ////tax
    let taxElem_text = $('<div/>',{class:'fs09',text:texts.orders.tax});
    let taxElem = $('<div/>',{class:'fs09',text:receipt.tax});
    if(receipt.taxPercent > 0){
        taxElem_text = $('<div/>').append(
            $('<span/>',{class:'fs09 mie-3',text:texts.orders.tax}),
            $('<span/>',{class:'fs07',text:`${receipt.taxPercent}%`}),
        );
    }
    ////service
    let serviceElem_text = $('<div/>',{class:'fs09',text:texts.orders.service});
    let serviceElem = $('<div/>',{class:'fs09',text:receipt.service});
    if(receipt.servicePercent > 0){
        serviceElem_text = $('<div/>').append(
            $('<span/>',{class:'fs09 mie-3',text:texts.orders.service}),
            $('<span/>',{class:'fs07',text:`${receipt.servicePercent}%`}),
        );
    }
    $('#placeOrder-receipt').text('').append(
        happyHourElem,
        $('<div/>',{class:'placeOrder-receiptElem'}).append(
            $('<div/>',{class:'fs09',text:texts.orders.discount}),
            $('<div/>',{class:'numberPickerControls mB5 mX5'}).append(
                $('<span/>',{class:'numberPickerArrow fs08 ico-left',id:'placeOrder-discountD'}),
                $('<span/>',{class:'numberPickerValue fs08 wFC mnw50',id:'placeOrder-discount',text:receipt.discount}),
                $('<span/>',{class:'numberPickerArrow fs08 ico-right',id:'placeOrder-discountU'}),
            ),
        ),
        $('<div/>',{class:'placeOrder-receiptElem'}).append(
            subTotalElem_text,
            subTotalElem,
        ),
        $('<div/>',{class:`placeOrder-receiptElem ${receipt.tax == 0 ? 'none' : null}`}).append(
            taxElem_text,
            taxElem,
        ),
        $('<div/>',{class:`placeOrder-receiptElem ${receipt.service == 0 ? 'none' : null}`}).append(
            serviceElem_text,
            serviceElem,
        ),
        $('<div/>',{class:`placeOrder-receiptElem ${receipt.deliveryCost == 0 ? 'none' : null}`}).append(
            $('<div/>',{class:'fs09',text:texts.orders.deliveryCost}),
            $('<div/>',{class:'row alnC jstfyE'}).append(
                $('<input/>',{class:'taE ordersReceipt_deliveryCost',id:'placeOrder-deliveryCost',value:receipt.deliveryCost}),
                $('<div/>',{class:'ico-edit pointer fs09 mis-5',type:'number',id:'placeOrder-editDeliveryCost'})
            )
        ),
        $('<div/>',{class:'placeOrder-receiptElem'}).append(
            $('<div/>',{class:'fs09',text:texts.orders.total}),
            $('<div/>',{class:'fs09',text:`${website.currency}${receipt.total}`}),
        ),
    )
}
