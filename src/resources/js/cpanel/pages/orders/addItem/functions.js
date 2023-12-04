showAddOrderItemPopup = function(order_id){
    showPopup('addItem',function(){
        $('.popupBody').attr('order',order_id).addClass('mnh400').append(
            drawInputList ('','ico-products','',texts.orders.findProduct,'addItemProductList',texts.orders.findProduct,200,'addItemProductList-list',false,'','',''),
            $('<div/>',{id:'addItem-product'}),
        )
        for(const key in website.products){
            addToInputList($('#addItemProductList-list'),website.products[key].name,website.products[key].id)
        }
    })
}
drawAddItemPopupProduct = function(product){
    $('#addItem-product').text('').append(
        $('<div/>',{class:'row alnC jstfyS mY20'}).append(
            $('<img/>',{class:'h40 w40 br5 ofCover',src:product.thumbnail}),
            $('<div/>',{class:''}).append(
                $('<a/>',{class:'mis-5 popupPage popupId',text:product.name,product:product.name,popupPage:'product',popupId:'product'}),
                $('<div/>',{class:'fs08 mX5',text:`${website.currency}${product.price}`})
            )
        ),
        $('<div/>',{class:'placeOrderDetailsElem'}).append(
            $('<div/>',{class:'fs09',text:texts.orders.qty}),
            $('<div/>',{class:'numberPickerControls'}).append(
                $('<span/>',{class:'numberPickerArrow ico-left',id:'addOrderItem-qtyMins'}),
                $('<span/>',{class:'numberPickerValue wFC mnw50',text:'1',id:'addOrderItem-qty'}),
                $('<span/>',{class:'numberPickerArrow ico-right',id:'addOrderItem-qtyPlus'}),
            ),
        ),
        $('<div/>',{class:'w100p brdrB1',id:'addItemOptions'}),
        drawTextArea('','ico-edit','',texts.orders.specialRequest,'addOrderItem-itemNotice',200,'mY20','','h50'),
        $('<div/>',{class:'btnContainer mY40'}).append(
            $('<button/>',{class:'btn btn-cancel',id:'addItembtn-confirm',order:$('.popupBody').attr('order')}).append(
                $('<div/>',{class:'mie-5',text:texts.orders.addItem}),
                $('<div/>',{class:'',id:'addItembtn-itemTotal'})
            )
        )
    )
    for(const key in product.product_options){
        let option = product.product_options[key];
        let thisSelectionsContainer;
        $('#addItemOptions').append(
            $('<div/>',{class:'bold brdrT1 pY10 pX5',text:option.name}),
            thisSelectionsContainer = $('<div/>',{class:'w100p addItem-option'}),
        )
        for(const key in option.product_option_selections){
            let selection = option.product_option_selections[key];
            thisSelectionsContainer.append(
                $('<div/>',{class:'placeOrderDetailsElem addItem-selection'}).append(
                    $('<div/>',{class:'mie-30'}).append(
                        $('<span/>',{text:selection.name}),
                        $('<span/>',{class:'mis-3 fs07',text:`${website.currency}${selection.price}`})
                    ),
                    $('<div/>',{selection:selection.id,option:option.id,class:`addItem-selectionCheck ${selection.isDefault ? 'ico-check1' : 'ico-check0'}`})
                )
            )
        }
    }
}
calcAddOrderItemTotal = function(){
    let product = website.products.find(item => item.id == $('#addItemProductList').attr('key'));
    if(typeof(product) === 'undefined'){return;}
    let itemTotal = parseFloat(product.price);
    $('.addItem-selectionCheck.ico-check1').each(function(){
        let option = product.product_options.find(item=> item.id == $(this).attr('option'));
        if(typeof(option) === 'undefined'){return;}
        let selection = option.product_option_selections.find(item=> item.id == $(this).attr('selection'));
        if(typeof(selection) === 'undefined'){return}
        itemTotal = itemTotal + parseFloat(selection.price);
    })
    $('#addItembtn-itemTotal').text(`${website.currency}${(itemTotal * parseInt($('#addOrderItem-qty').text())).toFixed(2)}`)
}
//

//
