$('.orderPageTab-d').on('click',function(e){
    $('.orderPageTab-d').addClass('orderPageTab_selected');
    $('.orderPageTab-l').removeClass('orderPageTab_selected');
    $('.orderPageTab-i').removeClass('orderPageTab_selected');
    $('#orderPage-orderDetails').removeClass('h0 ofH');
    $('#orderPage-orderLifecycle').addClass('h0 ofH');
    $('#orderPage-orderItems').addClass('h0 ofH');
})
$('.orderPageTab-i').on('click',function(e){
    $('.orderPageTab-i').addClass('orderPageTab_selected');
    $('.orderPageTab-l').removeClass('orderPageTab_selected');
    $('.orderPageTab-d').removeClass('orderPageTab_selected');
    $('#orderPage-orderDetails').addClass('h0 ofH');
    $('#orderPage-orderLifecycle').addClass('h0 ofH');
    $('#orderPage-orderItems').removeClass('h0 ofH');
})
$('.orderPageTab-l').on('click',function(e){
    $('.orderPageTab-l').addClass('orderPageTab_selected');
    $('.orderPageTab-d').removeClass('orderPageTab_selected');
    $('.orderPageTab-i').removeClass('orderPageTab_selected');
    $('#orderPage-orderDetails').addClass('h0 ofH');
    $('#orderPage-orderItems').addClass('h0 ofH');
    $('#orderPage-orderLifecycle').removeClass('h0 ofH');
})
////////////
$('#orderPage-addItemBtn').on('click',function(){
    $('#addOrderItem-productsListInput').val('').attr('key',null);
    $('#addOrderItem-itemContainer').addClass('none')
    $('#addOrderItem-itemNotice').val('').addClass('none')
    $('#addOrderItem-ConfirmBtn').addClass('none').removeClass('btn-cancel').attr('addTo',window.popupPage.order)
    showPopup($('#addOrderItem-popup'))
})
$('html,body').on('click','.orderPage-removeItem',function(e){
    e.stopImmediatePropagation();
    if(!$(this).hasClass('confirm-btn') && settings_temp.dClickConfirm){
        $('.orderPage-removeItem').removeClass('confirm-btn').attr('tooltip',null)
        $(this).addClass('confirm-btn').attr('tooltip',texts.cpanel.public.clickToConfirm)
            updateToolTip();
            return;
    }else{
        $(this).removeClass('confirm-btn').attr('tooltip',null)
        updateToolTip();
    }
    let itemId = $(this).closest('.orderItemContainer').attr('itemId');
    new orders($(this).closest('.orderItemContainer').attr('orderId')).removeItem(itemId);
})
////
$('html,body').on('click','.orderPage-itemQtyMinus',function(e){
    e.stopImmediatePropagation();
    if($(this).closest('.orderItemContainer').find('.orderPage-itemQty').attr('itemQty') == 1){return}
    if(!$(this).hasClass('confirm-btn') && settings_temp.dClickConfirm){
        $('.orderPage-itemQtyMinus').removeClass('confirm-btn').attr('tooltip',null)
        $(this).addClass('confirm-btn').attr('tooltip',texts.cpanel.public.clickToConfirm)
            updateToolTip();
            return;
    }else{
        $(this).removeClass('confirm-btn').attr('tooltip',null)
        updateToolTip();
    }
    new orders($(this).closest('.orderItemContainer').attr('orderId')).changeQty($(this).closest('.orderItemContainer').attr('itemId'),'minus')
})
$('html,body').on('click','.orderPage-itemQtyPlus',function(e){
    e.stopImmediatePropagation();
    if(!$(this).hasClass('confirm-btn') && settings_temp.dClickConfirm){
        $('.orderPage-itemQtyPlus').removeClass('confirm-btn').attr('tooltip',null)
        $(this).addClass('confirm-btn').attr('tooltip',texts.cpanel.public.clickToConfirm)
            updateToolTip();
            return;
    }else{
        $(this).removeClass('confirm-btn').attr('tooltip',null)
        updateToolTip();
    }
    new orders($(this).closest('.orderItemContainer').attr('orderId')).changeQty($(this).closest('.orderItemContainer').attr('itemId'),'plus')
})
////
$('html,body').on('click','.orderPage-itemSelection',function(e){
    e.stopImmediatePropagation();
    new orders($(this).closest('.orderItemContainer').attr('orderId')).showChangeItemSelection($(this).closest('.orderItemContainer').attr('itemId'),$(this).attr('optionId'),$(this))
})
$('html,body').on('click','.orderPage-itemSelectionChange',function(e){
    e.stopImmediatePropagation();
    if(!$(this).hasClass('confirm-btn') && settings_temp.dClickConfirm){
        $('.orderPage-itemSelectionChange').removeClass('confirm-btn').attr('tooltip',null)
        $(this).addClass('confirm-btn').attr('tooltip',texts.cpanel.public.clickToConfirm)
            updateToolTip();
            return;
    }else{
        $(this).removeClass('confirm-btn').attr('tooltip',null)
        updateToolTip();
    }
    new orders($(this).attr('orderId')).changeItemSelection($(this).attr('itemId'),$(this).attr('optionId'),$(this).attr('selectionId'))
})
////
$('html,body').on('input change focus focusout','.orderPage-itemNotice',function(e){
    e.stopImmediatePropagation();
    new orders($(this).closest('.orderItemContainer').attr('orderId')).itemNoticeNoSaveCheck($(this).closest('.orderItemContainer').attr('itemId'))
})
$('html,body').on('click','.orderPage-itemNoticeCancelBtn',function(e){
    e.stopImmediatePropagation();
    new orders($(this).closest('.orderItemContainer').attr('orderId')).drawOrder();
})
$('html,body').on('click','.orderPage-itemNoticeSaveBtn',function(e){
    e.stopImmediatePropagation();
    if(!$(this).hasClass('confirm-btn') && settings_temp.dClickConfirm){
        $('.orderPage-itemNoticeSaveBtn').removeClass('confirm-btn').attr('tooltip',null)
        $(this).addClass('confirm-btn').attr('tooltip',texts.cpanel.public.clickToConfirm)
            updateToolTip();
            return;
    }else{
        $(this).removeClass('confirm-btn').attr('tooltip',null)
        updateToolTip();
    }
    new orders($(this).closest('.orderItemContainer').attr('orderId')).changeItemNotice($(this).closest('.orderItemContainer').attr('itemId'));

})
/////
$('#orderPage-deliveryCostEdit').on('click',function(){
    $('#orderPage-deliveryCost').select();
})
$('#orderPage-deliveryCost').on('focusout change',function(){
    $(this).val($(this).val().replaceAll(/[^0-9\.]/g,''));

    if($(this).val() == ''){$(this).val('0.00')}
    if($(this).val() <= 0){$(this).val('0.00')}

})
$('#orderPage-deliveryCost').on('focus focusout input change',function(){
    new orders(window.popupPage.order).deliveryCostNoSaveCheck();
})
$('#orderPage-deliveryCostCancelBtn').on('click',function(){
    new orders(window.popupPage.order).drawOrder()
    new orders(window.popupPage.order).deliveryCostNoSaveCheck();
})
$('#orderPage-deliveryCostSaveBtn').on('click',function(){
    if(!$(this).hasClass('confirm-btn') && settings_temp.dClickConfirm){
        $(this).addClass('confirm-btn').attr('tooltip',texts.cpanel.public.clickToConfirm)
            updateToolTip();
            return;
    }else{
        $(this).removeClass('confirm-btn').attr('tooltip',null)
        updateToolTip();
    }
    new orders(window.popupPage.order).changeDeliveryCost()
})
/////
$('#orderPage-discountEdit').on('click',function(){
    $('#orderPage-discount').select();
})
$('#orderPage-discount').on('focusout change',function(){
    $(this).val($(this).val().replaceAll(/[^0-9]/g,''));
    if($(this).val() == ''){$(this).val('0')}
    if($(this).val() < 0){$(this).val('0')}
    if($(this).val() > 100){$(this).val('100')}
})
$('#orderPage-discount').on('focus focusout input change',function(){
    new orders(window.popupPage.order).discountNoSaveCheck();
})
$('#orderPage-discountCancelBtn').on('click',function(){
    new orders(window.popupPage.order).drawOrder()
    new orders(window.popupPage.order).discountNoSaveCheck();
})
$('#orderPage-discountSaveBtn').on('click',function(){
    if(!$(this).hasClass('confirm-btn') && settings_temp.dClickConfirm){
        $(this).addClass('confirm-btn').attr('tooltip',texts.cpanel.public.clickToConfirm)
            updateToolTip();
            return;
    }else{
        $(this).removeClass('confirm-btn').attr('tooltip',null)
        updateToolTip();
    }
    new orders(window.popupPage.order).changeDiscount()
})
///////////
$('html,body').on('click','.order-printReceipt',function(e){
    e.stopImmediatePropagation();
    new orders($(this).attr('orderId')).printReceipt();
})
