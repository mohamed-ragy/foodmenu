$('body').on('click','.order-selection',function(e){
    e.stopImmediatePropagation();
    let item = website.incompleteOrders.find(o=>o._id == window.history.state.order).order_items.find(i=>i._id == $(this).closest('.order-item').attr('item'));
    let product = website.products.find(p=>p.id == item.product_id);
    if(typeof(product) === 'undefined'){return;}
    let option = product.product_options.find(i=>i.id == $(this).attr('option'));
    if(typeof(option) === 'undefined'){return;}
    let thisSelection = option.product_option_selections.find(i=>i.id == $(this).attr('selection'));
    if(typeof(thisSelection) === 'undefined'){return;}
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
                $('<div/>',{class:'orderDetailsElem pointer order-changeItemSelection-selection',item:item._id,option:option.id,selection:selection.id}).append(
                    $('<div/>',{class:'fs08 mie-20',text:selection.name}),
                    $('<div/>',{class:'fs07',text:`${website.currency}${selection.price}`})
                )
            )
        }
    }
})
$('body').on('click','.order-changeItemSelection-selection',function(e){
    let item_id = $(this).attr('item');
    let option_id = $(this).attr('option');
    let selection_id = $(this).attr('selection');
    if(!coolDownChecker()){return;}
    if(!confirmBtn($(this),e.pageX,e.pageY)){return;}
    $(`.order-selection[option="${option_id}"]`).text('').append($('<div/>',{class:'loading_s vV'}));
    $('#changeItemSelection').text('').addClass('none');
    $.ajax({
        url:'orders',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            changeItemSelection:true,
            order_id:window.history.state.order,
            item_id:item_id,
            option_id:option_id,
            selection_id:selection_id,
        },success:function(r){
            if(r.changeItemSelectionStat == 1){
                website.incompleteOrders.find(o=>o._id == window.history.state.order).order_items.find(i=>i._id == item_id).total = r.item_total;
                website.incompleteOrders.find(o=>o._id == window.history.state.order).order_items.find(i=>i._id == item_id).order_item_option_selections = r.item_order_item_option_selections;
                website.incompleteOrders.find(o=>o._id == window.history.state.order).itemsTotal = r.itemsTotal;
                website.incompleteOrders.find(o=>o._id == window.history.state.order).discount_itemsTotal = r.discount_itemsTotal;
                website.incompleteOrders.find(o=>o._id == window.history.state.order).tax = r.tax;
                website.incompleteOrders.find(o=>o._id == window.history.state.order).service = r.service;
                website.incompleteOrders.find(o=>o._id == window.history.state.order).total = r.total;
                website.incompleteOrders.find(o=>o._id == window.history.state.order).itemsEdit_account_name = account.name;
                website.incompleteOrders.find(o=>o._id == window.history.state.order).itemsEdit_account_id = account.id;
                website.incompleteOrders.find(o=>o._id == window.history.state.order).order_items_original = r.order_items_original;
                if(window.history.state.page == 'incomplete_orders'){
                    drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
                }
                if(window.history.state.popupPage == 'order' && window.history.state.order == window.history.state.order){
                    drawPopupPage_order_fillData(window.history.state.order)
                }
                showAlert('success',r.msg,4000,true)
            }else if(r.changeItemQtyStat == 1){
                showAlert('error',r.msg,4000,true)
            }
        }
    });
})
