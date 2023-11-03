calcAddOrderItemTotal = function(){
    let product = website.products.find(item => item.id == $('#addOrderItem-itemContainer').attr('productId'));
    if(typeof(product) === 'undefined'){return;}
    let itemTotal = parseFloat(product.price);
    $('.addItemSelectionCheck.ico-check1').each(function(){
        let option = product.product_options.find(item=> item.id == $(this).closest('.addItemSelection').attr('optionId'));
        if(typeof(option) === 'undefined'){return;}
        let selection = option.product_option_selections.find(item=> item.id == $(this).closest('.addItemSelection').attr('selectionId'));
        if(typeof(selection) === 'undefined'){return}
        itemTotal = itemTotal + parseFloat(selection.price);
    })
    $('#addOrderItem-itemTotal').text(website.currency+(itemTotal * parseInt($('#addOrderItem-qty').text())).toFixed(2))
}
drawAddItemCard = function(product){
    $('#addOrderItem-itemContainer').attr('productId',product.id).text('').append(
        $('<div/>',{
            class:'column alnS jstfyS w100p mT10',
        }).append(
            $('<div/>',{
                class:'row alnC jstfyC mX5 mY10',
            }).append(
                $('<img/>',{class:'h50 w50 br3 ofCover',src:product.thumbnail}),
                $('<div/>',{class:'bold mX5'}).append(
                    $('<div/>',{text:product.name,class:'fs104'}),
                    $('<div/>',{text:website.currency+product.price,class:'fs103 mT3'})
                ),
            ),
            $('<div/>',{class:'w100p-20 row alnC jstfySB p10 brdr1'}).append(
                $('<div/>',{class:'fs101',text:texts.orders.qty}),
                $('<div/>',{class:'numberPickerControls'}).append(
                    $('<span/>',{class:'numberPickerArrow ico-left',id:'addOrderItem-qtyMins'}),
                    $('<span/>',{class:'numberPickerValue',text:'1',id:'addOrderItem-qty'}),
                    $('<span/>',{class:'numberPickerArrow ico-right',id:'addOrderItem-qtyPlus'}),
                )
            ),
            $('<div/>',{class:'w100p',id:'addOrderItem-optionsContainer'})
        )
    )
    for(const key in product.product_options){
        let option = product.product_options[key];
        let thisSelectionsContainer;
        $('#addOrderItem-optionsContainer').append(
            $('<div/>',{class:'w100p column alnS jstfyS brdr1'}).append(
                $('<div/>',{text:option.name,class:'fs101 p10 bgc-c3 bold w100p-20'}),
                thisOptionContainer = $('<div/>',{class:'w100p column alnS jstfyS'})
            ),
        )
        for(const key in option.product_option_selections){
            let selection = option.product_option_selections[key];
            let selectionCheckClass;
            selection.isDefault ? selectionCheckClass = 'ico-check1': selectionCheckClass = 'ico-check0';
            thisOptionContainer.append(
                $('<div/>',{
                    class:'addItemSelection',
                    optionId:option.id,
                    selectionId:selection.id,
                }).append(
                    $('<span/>',{}).append(
                        $('<span/>',{text:selection.name}),
                        $('<span/>',{class:'mX3 fs085',text:'('+website.currency+selection.price+')'})
                    ),
                    $('<span/>',{class:'mX5'}),
                    $('<span/>',{class:'addItemSelectionCheck fs09 '+selectionCheckClass})
                )
            )
        }
    }
    calcAddOrderItemTotal();
}
/////////////////////
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
})
/////////////////////
$('#addOrderItem-productsList').on('click','.inputListElement',function(e){
    let product = website.products.find(item=> item.id == $(this).attr('key'));
    if(typeof(product) === 'undefined'){return;}
    !product.availability ? showAlert('warning',texts.orders.addItemUnavailable,4000,true) : null;
    $('#addOrderItem-itemContainer').removeClass('none')
    $('#addOrderItem-itemNotice').removeClass('none')
    $('#addOrderItem-ConfirmBtn').removeClass('none')
    drawAddItemCard(product);
})
///////////
$('html,body').on('click','.addItemSelection',function(e){
    $(this).parent().find('.addItemSelectionCheck').removeClass('ico-check1').addClass('ico-check0')
    $(this).find('.addItemSelectionCheck').removeClass('ico-check0').addClass('ico-check1')
    calcAddOrderItemTotal();
})
$('#addOrderItem-ConfirmBtn').on('click',function(){
    if($(this).attr('addTo') != null && $(this).attr('addTo') != '' && !$(this).hasClass('confirm-btn')  && settings_temp.dClickConfirm){
        $(this).addClass('confirm-btn').attr('tooltip',texts.cpanel.public.clickToConfirm)
            updateToolTip();
            return;
    }else{
        $(this).removeClass('confirm-btn').attr('tooltip',null)
        updateToolTip();
    }
    let product = website.products.find(item=> item.id == $('#addOrderItem-itemContainer').attr('productId'));
    if(typeof(product) === 'undefined'){closePopup();return}
    let qty = parseInt($('#addOrderItem-qty').text())
    let item_option_selections = [];
    let itemTotal = parseFloat(product.price)
    let itemNotice = null;
    $('#addOrderItem-itemNotice').val() == '' ? itemNotice = null : itemNotice = $('#addOrderItem-itemNotice').val();
    $('.addItemSelectionCheck.ico-check1').each(function(){
        let option = product.product_options.find(elem=> elem.id == $(this).closest('.addItemSelection').attr('optionId'));
        if(typeof(option) === 'undefined'){return;}
        let selection = option.product_option_selections.find(elem=> elem.id == $(this).closest('.addItemSelection').attr('selectionId'))
        if(typeof(selection ) === 'undefined'){return;}
        itemTotal = itemTotal + parseFloat(selection.price);
        item_option_selections.push({
            optionName:option.name,
            product_option_id:option.id,
            selectionName:selection.name,
            product_option_selection_id:selection.id,
            price:selection.price
        });

    })
    itemTotal = itemTotal * qty;

    if($(this).attr('addTo') == null || $(this).attr('addTo') == ''){
        window.placeOrder.items.push({
            itemNotice:itemNotice,
            order_item_option_selections:item_option_selections,
            price:product.price,
            productName:product.name,
            product_id:product.id,
            qty:qty,
            total:itemTotal,
        })
        drawPlaceOrderItems();
    }else{
        new orders($(this).attr('addTo')).addItem({
            itemNotice:itemNotice,
            order_item_option_selections:item_option_selections,
            price:product.price,
            productName:product.name,
            product_id:product.id,
            qty:qty,
            total:itemTotal,
        });
    }
    closePopup();
})
