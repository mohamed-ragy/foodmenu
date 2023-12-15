addItemToPlaceOrder = function(){
    let product = website.products.find(item => item.id == $('#addItemProductList').attr('key'));
    let qty = parseInt($('#addOrderItem-qty').text());
    let selections = [];
    $('.addItem-selectionCheck.ico-check1').each(function(){
        let option = product.product_options.find(item=>item.id == $(this).attr('option'));
        let selection = option.product_option_selections.find(item=>item.id == $(this).attr('selection'))
        selections.push({
            option_id:option.id,
            selection_id:selection.id,
        })
    })
    window.placeOrder.items.push({
        product_id:product.id,
        qty:qty,
        selections:selections,
        itemNotice:$('#addOrderItem-itemNotice').val(),
    })
    drawPlaceOrderItems();
    calcPlaceOrderItemsTotel();
}
drawPlaceOrderItems = function(){
    $('#placeOrder-itemsContainer').text('')
    for(const key in window.placeOrder.items){
        let item = window.placeOrder.items[key];
        let product = website.products.find(i => i.id == item.product_id);
        let qty = item.qty;
        let thisSelectionsContainer;
        $('#placeOrder-itemsContainer').append(
            $('<div/>',{class:'placeOrder-item',item:key,product:product.id}).append(
                $('<div/>',{class:'row alnC jstfySB w100p'}).append(
                    $('<div/>',{class:'ico-close fs08 placeOrder-deleteItem',tooltip:texts.cpanel.public.remove}),
                    $('<div/>',{class:'row alnC jstfyS mie-10'}).append(
                        $('<img/>',{src:product.thumbnail,class:'none-720 w40 h40 ofCover br5 mie-5'}),
                        $('<div/>',{class:'bold fs09',text:product.name}),
                    ),
                    $('<div/>',{class:'column alnE jstfyS grow1 mX10'}).append(
                        $('<div/>',{class:'numberPickerControls mB5 mX5'}).append(
                            $('<span/>',{class:'numberPickerArrow fs08 ico-left placeOrderItem-qtyMins'}),
                            $('<span/>',{class:'numberPickerValue fs08 wFC mnw50'}).append(
                                $('<span/>',{class:'c_white-10 mie-3',text:`${texts.orders.qtyS}:`}),
                                $('<span/>',{class:' placeOrderItem-qty',text:qty})
                            ),
                            $('<span/>',{class:'numberPickerArrow fs08 ico-right placeOrderItem-qtyPlus'}),
                        ),
                        thisSelectionsContainer = $('<div/>',{class:'row wrap alnS jstfyS '}),
                    ),
                    $('<div/>',{class:'fs09 mis-10 placeOrderItem-itemTotal'})
                ),
                $('<div/>',{class:'row alnC jstfyS w100p-10 m5 mT10',tooltip:texts.orders.specialRequest}).append(
                    $('<span/>',{class:'ico-edit fs08 pointer placeOrderItem-editItemNotice'}),
                    $('<input/>',{class:'placeOrderItem-itemNotice',value:item.itemNotice,placeholder:texts.orders.addSpecialRequest,maxLength:200}),
                )

            )
        )
        for(const key2 in item.selections){
            let option = product.product_options.find(i=>i.id == item.selections[key2].option_id);
            let selection = option.product_option_selections.find(i=>i.id == item.selections[key2].selection_id)
            thisSelectionsContainer.append(
                $('<div/>',{class:'placeOrderItem-selection',tooltip:option.name,option:option.id,selection:selection.id}).append(
                    $('<div/>',{class:'mie-10 fs08',text:`${selection.name}`}),
                    $('<div/>',{class:'ico-down fs07'})
                )
            )
        }
    }
    drawPlaceOrderCheck();
}
calcPlaceOrderItemsTotel = function(){
    let itemsTotal = 0;
    $('.placeOrder-item').each(function(){
        let product = website.products.find(item=>item.id == $(this).attr('product'));
        let itemTotal = parseFloat(product.price);
        let qty = parseInt($(this).find('.placeOrderItem-qty').text())
        $(this).find('.placeOrderItem-selection').each(function(){
            let option = product.product_options.find(item=>item.id == $(this).attr('option'));
            let selection = option.product_option_selections.find(item=>item.id == $(this).attr('selection'));
            itemTotal = itemTotal + parseFloat(selection.price);
        })
        itemTotal = itemTotal * qty
        $(this).find('.placeOrderItem-itemTotal').text(`${website.currency}${bigFloat(itemTotal)}`);
        itemsTotal = itemsTotal + itemTotal;
    });
    return itemsTotal;
}

//
