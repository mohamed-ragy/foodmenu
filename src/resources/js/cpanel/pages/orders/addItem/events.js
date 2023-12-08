$('html,body').on('click','#addItemProductList-list .inputListElement',function(e){
    let product = website.products.find(item=>item.id == $(this).attr('key'));
    console.log(product)
    !product.availability ? showAlert('warning',texts.orders.addItemUnavailable,4000,true) : null;
    drawAddItemPopupProduct(product)
    setTimeout(()=>{
        calcAddOrderItemTotal();
    },100)
})


$('html,body').on('click','#addOrderItem-qtyMins',function(e){
    e.stopImmediatePropagation();
    if($('#addOrderItem-qty').text() == 1){return;}
    $('#addOrderItem-qty').text(parseInt($('#addOrderItem-qty').text()) - 1)
    calcAddOrderItemTotal();
})
$('html,body').on('click','#addOrderItem-qtyPlus',function(e){
    e.stopImmediatePropagation();
    $('#addOrderItem-qty').text(parseInt($('#addOrderItem-qty').text()) + 1)
    calcAddOrderItemTotal();
});
//
$('html,body').on('click','.addItem-selection',function(e){
    e.stopImmediatePropagation();
    $(this).closest('.addItem-option').find('.addItem-selectionCheck').removeClass('ico-check1').addClass('ico-check0');
    $(this).find('.addItem-selectionCheck').removeClass('ico-check0').addClass('ico-check1')
    calcAddOrderItemTotal();
})
//
$('html,body').on('click','#addItembtn-confirm',function(e){
    e.stopImmediatePropagation();
    if($('.popupBody').attr('order') == '0'){
        addItemToPlaceOrder()
    }else{
        addItemToOrder()
    }
    closePopup();
})
//
