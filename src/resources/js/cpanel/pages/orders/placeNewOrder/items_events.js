
$('html,body').on('click','#placeOrder-addItemBtn',function(e){
    e.stopImmediatePropagation();
    showAddOrderItemPopup('0');
})
//
$('html,body').on('click','.placeOrderItem-qtyMins',function(e){
    e.stopImmediatePropagation();
    let key = $(this).closest('.placeOrder-item').attr('item');
    let qty = window.placeOrder.items[key].qty;
    if(qty == 1){return}else{
        window.placeOrder.items[key].qty = qty - 1;
        drawPlaceOrderItems();
    }
})
$('html,body').on('click','.placeOrderItem-qtyPlus',function(e){
    e.stopImmediatePropagation();
    let key = $(this).closest('.placeOrder-item').attr('item');
    let qty = window.placeOrder.items[key].qty;
    window.placeOrder.items[key].qty = qty + 1;
    drawPlaceOrderItems();
})
//
$('html,body').on('click','.placeOrderItem-selection',function(e){
    e.stopImmediatePropagation();
    let product = website.products.find(i=>i.id == $(this).closest('.placeOrder-item').attr('product'));
    let option = product.product_options.find(i=>i.id == $(this).attr('option'));
    let thisSelection = option.product_option_selections.find(i=>i.id == $(this).attr('selection'));
    let item = $(this).closest('.placeOrder-item').attr('item');
    let thisSelectionsContainer;
    $('#changeItemSelection').text('').css({
        left:$(this).offset().left,
        top:$(this).offset().top + $(this).outerHeight()
    }).removeClass('none').append(
        $('<div/>',{class:'column alnS jstfyS'}).append(
            $('<div/>',{class:'fs09 bold mY5 mX5',text:option.name}),
            thisSelectionsContainer = $('<div/>',{class:''})
        )
    )
    for(const key in option.product_option_selections){
        let selection = option.product_option_selections[key];
        if(selection.id != thisSelection.id){
            thisSelectionsContainer.append(
                $('<div/>',{class:'placeOrderDetailsElem placeOrder-changeItemSelection-selection',item:item,option:option.id,selection:selection.id}).append(
                    $('<div/>',{class:'fs08 mie-20',text:selection.name}),
                    $('<div/>',{class:'fs07',text:`${website.currency}${selection.price}`})
                )
            )
        }
    }
})
//
$('html,body').on('click','.placeOrder-changeItemSelection-selection',function(e){
    e.stopImmediatePropagation();
    let key = $(this).attr('item');
    let item = window.placeOrder.items[key];
    window.placeOrder.items[key].selections.find(i=>i.option_id == $(this).attr('option')).selection_id = parseInt($(this).attr('selection'));
    drawPlaceOrderItems();
    $('#changeItemSelection').addClass('none')
})
$(document).on('click',function(){
    if($('#changeItemSelection').is(':hover')){return;}
    $('#changeItemSelection').addClass('none')
})
//
$('html,body').on('click','.placeOrder-deleteItem',function(e){
    e.stopImmediatePropagation();
    let item = $(this).closest('.placeOrder-item').attr('item');
    for(const key in window.placeOrder.items){
        if(key == item){
            window.placeOrder.items.splice(key,1);
            drawPlaceOrderItems();
        }
    }
})

//
$('html,body').on('click','.placeOrderItem-editItemNotice',function(e){
    e.stopImmediatePropagation();
    $(this).parent().find('.placeOrderItem-itemNotice').focus();
})

//
