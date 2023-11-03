$('#placeOrder-addItemBtn').on('click',function(){
    $('#addOrderItem-productsListInput').val('').attr('key',null);
    $('#addOrderItem-itemContainer').addClass('none')
    $('#addOrderItem-itemNotice').val('').addClass('none')
    $('#addOrderItem-ConfirmBtn').addClass('none btn-cancel').attr('addTo',null)
    showPopup($('#addOrderItem-popup'))
})

drawPlaceOrderItems = function(){
    $('#placeOrder-itemsContainer').text('')
    for(const key in window.placeOrder.items){
        let item = window.placeOrder.items[key];
        let product = website.products.find(elem => elem.id == item.product_id);
        if(typeof(product) === 'undefined'){return;}
        let itemNoticeClass;
        let thisItemOptions;
        $('#placeOrder-itemsContainer').append(
            $('<div/>',{
                class:'orderItemContainer',
                key:key,
                productId:product.id,
            }).append(
                $('<div/>',{
                    class:'w100p row alnC jstfyS'
                }).append(
                    $('<div/>',{
                        class:'ico-close alnsS mT20 mie-5 cR pointer placeOrder-removeItem',
                        tooltip:texts.orders.removeItem,
                    }),
                    $('<img/>',{
                        class:'alnsS h50 w50 ofCover br3 mX5',
                        src:product.thumbnail,
                    }),
                    $('<div/>',{
                        class:'grow2 alnsS mX5',
                    }).append(
                        $('<div/>',{
                            class:'row alnC jstfySB w100p mB5'
                        }).append(
                            $('<div/>').append(
                                $('<a/>',{text:product.name,class:'popupPage fs102',popupPage:'Product',product:product.name}),
                            ),
                            $('<div/>',{text:website.currency+item.total.toFixed(2),class:'bold mT3'}),
                        ),
                        $('<div/>',{class:'numberPickerControls_s mY3'}).append(
                            $('<span/>',{class:'numberPickerArrow_s ico-left placeOrder-itemQtyMinus'}),
                            $('<span/>',{class:'numberPickerValue_s placeOrder-itemQty',text:`x${item.qty}`}),
                            $('<span/>',{class:'numberPickerArrow_s ico-right placeOrder-itemQtyPlus'}),
                        ),
                    ),
                ),
                thisItemOptions = $('<div/>',{class:'row wrap alnC jstfyS mis-20 mY5'}),
                $('<div/>',{
                    class:`row mis-20 mB5 alnC jstfyS `,
                }).append(
                    $('<div/>',{class:'ico-info'}),
                    $('<input/>',{class:'mX5 unset placeOrder-itemNotice w100p-10',value:item.itemNotice,placeholder:texts.orders.addSpecialRequest,tooltip:texts.orders.specialRequest})
                )
            )
        )
        for(const key in item.order_item_option_selections){
            let option = item.order_item_option_selections[key];
            thisItemOptions.append(
                $('<div/>',{
                    selectionKey:key,
                    optionId:option.product_option_id,
                    class:'pointer row alnC jstfyC p5 mY5 mie-5 shdw2 br3 fs09 bgc-c1 placeOrder-itemSelection'
                }).append(
                    $('<div/>',{
                        class:'mie-5',
                        text:`${option.optionName}: ${option.selectionName}`,
                    }),
                    $('<div/>',{class:'ico-down fs08 mis-5'})
                )
            )
        }
    }
    drawPlaceOrderCheck();
}


$('html,body').on('click','.placeOrder-removeItem',function(e){
    e.stopImmediatePropagation();
    window.placeOrder.items.splice(parseInt($(this).closest('.orderItemContainer').attr('key')),1);
    drawPlaceOrderItems();

})
//////
$('html,body').on('click','.placeOrder-itemQtyPlus',function(e){
    e.stopImmediatePropagation();
    let itemKey = $(this).closest('.orderItemContainer').attr('key');
    let itemTotal = parseFloat(window.placeOrder.items[itemKey].price);
    for(const key in window.placeOrder.items[itemKey].order_item_option_selections){
        itemTotal = itemTotal + parseFloat(window.placeOrder.items[itemKey].order_item_option_selections[key].price)
    }
    window.placeOrder.items[itemKey].qty = parseFloat(window.placeOrder.items[itemKey].qty) + 1;
    window.placeOrder.items[itemKey].total = itemTotal * parseFloat(window.placeOrder.items[itemKey].qty);
    drawPlaceOrderItems();
})
$('html,body').on('click','.placeOrder-itemQtyMinus',function(e){
    e.stopImmediatePropagation();
    let itemKey = $(this).closest('.orderItemContainer').attr('key');
    let itemTotal = parseFloat(window.placeOrder.items[itemKey].price);
    for(const key in window.placeOrder.items[itemKey].order_item_option_selections){
        itemTotal = itemTotal + parseFloat(window.placeOrder.items[itemKey].order_item_option_selections[key].price)
    }
    if(window.placeOrder.items[itemKey].qty == 1){return;}
    window.placeOrder.items[itemKey].qty = parseFloat(window.placeOrder.items[itemKey].qty) - 1;
    window.placeOrder.items[itemKey].total =  itemTotal * parseFloat(window.placeOrder.items[itemKey].qty);
    drawPlaceOrderItems();
})
/////////
$('html,body').on('click','.placeOrder-itemSelection',function(e){
    e.stopImmediatePropagation();
    let itemKey = $(this).closest('.orderItemContainer').attr('key');
    let selectionKey = $(this).attr('selectionKey');
    let productId = $(this).closest('.orderItemContainer').attr('productId');
    let optionId = $(this).attr('optionId');
    let product = website.products.find(item=> item.id == productId);
    if(typeof(product) === 'undefined'){return;}
    let option = product.product_options.find(item=> item.id == optionId);
    if(typeof(option) === 'undefined'){return;}
    $('#changeItemSelection').text('');
    for(const key in option.product_option_selections){
        selection = option.product_option_selections[key];
        $('#changeItemSelection').append(
            $('<div/>',{
                class:'placeOrder-itemSelectionChange pointer p5 hvr-bgc-c2',
                text:selection.name,
                selectionId:selection.id,
                optionId:option.id,
                itemKey:itemKey,
                selectionKey:selectionKey,
                productId:product.id,
            })
        )
    }
    $('#changeItemSelection').css({
        'display':'block',
        'left':$(this).offset().left,
        'top':$(this).offset().top + $(this).outerHeight(),
        'min-width':$(this).outerWidth(),
    })
    if($('#changeItemSelection').offset().top + $('#changeItemSelection').outerHeight() > $(window).height()){
        $('#changeItemSelection').css({
            'display':'block',
            'left':$(this).offset().left,
            'top':$(this).offset().top  - $('#changeItemSelection').outerHeight(),
            'min-width':$(this).outerWidth(),
        })
    }
})
$('html,body').on('click',function(){
    if($('.placeOrder-itemSelection:hover').length > 0 || $('#changeItemSelection:hover').length > 0 ){return}
    $('#changeItemSelection').hide();
})
$('html,body').on('click','.placeOrder-itemSelectionChange',function(e){
    e.stopImmediatePropagation();
    let itemKey = $(this).attr('itemKey');
    let selectionKey = $(this).attr('selectionKey');
    let productId = $(this).attr('productId');
    let optionId = $(this).attr('optionId');
    let selectionId = $(this).attr('selectionId');

    let product = website.products.find(item=> item.id == productId);
    if(typeof(product) === 'undefined'){return;}
    let option = product.product_options.find(item=> item.id == optionId);
    if(typeof(option) === 'undefined'){return;}
    let selection = option.product_option_selections.find(item=> item.id == selectionId);
    if(typeof(selection) === 'undefined'){return;}
    window.placeOrder.items[itemKey].order_item_option_selections[selectionKey] = {
        optionName:option.name,
        price:selection.price,
        product_option_id:option.id,
        product_option_selection_id:selection.id,
        selectionName:selection.name,
    }
    let itemTotal = parseFloat(window.placeOrder.items[itemKey].price);
    for(const key in window.placeOrder.items[itemKey].order_item_option_selections){
        itemTotal = itemTotal + parseFloat(window.placeOrder.items[itemKey].order_item_option_selections[key].price);
    }
    itemTotal = itemTotal * parseInt(window.placeOrder.items[itemKey].qty);
    window.placeOrder.items[itemKey].total = itemTotal;
    drawPlaceOrderItems();
    $('#changeItemSelection').hide();
})
///////////////
$('html,body').on('change focusout','.placeOrder-itemNotice',function(e){
    e.stopImmediatePropagation();
    let itemKey = $(this).closest('.orderItemContainer').attr('key');
    window.placeOrder.items[itemKey].itemNotice = $(this).val();
    drawPlaceOrderCheck();
})
////
$('#changeItemSelection').on('mouseleave',function(e){
    $('#changeItemSelection').hide();
})
