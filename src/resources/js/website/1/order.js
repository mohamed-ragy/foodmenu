drawAddToCartOption = function(optionName){
    return $('<div/>',{
        class:'addToCartOptionContainer'
    }).append(
        $('<div/>',{
            class:'addToCartOption',
        }).append(
            $('<div/>',{text:optionName,class:'mX-5'})
        )
    )
}
drawAddToCartSelection = function(selectionName,isDefault,optionId,selectionId,selectionPrice){
    let checkClass = 'ic-check0'
    if(isDefault == 1){
        checkClass = 'ic-check1'
    }
    return $('<div/>',{
        class:'addToCartOptionSelection',
        optionId:optionId,
        selectionId:selectionId,
        selectionPrice:selectionPrice,
    }).append(
        $('<div/>',{text:selectionName,class:'mX-10'}),
        $('<div/>',{class:checkClass+' addToCartSelectionCheck mX-10'})
    )
}
drawCartItem = function(item,itemId){
    let product = null;
    product = products.find(elem => elem.id == item.productId);
    if(product == null){return;}
    let itemPrice = parseFloat(product.price);
    $('#cartItemsContainer').append(
        $('<div/>',{
            class:'cartItemContainer',
            itemId:itemId,
        }).append(
            $('<div/>',{
                class:'cartItem',
            }).append(
                $('<div/>',{class:'cartItemRemove ic-close',itemId:itemId,tooltip:texts.orders.removeItem}),
                $('<a/>',{href:`/${lang}/${product.catName}/${product.name}`, class:'productLink',productId:product.id}).append(
                    $('<img/>',{class:'cartItemImg',src:product.thumbnailUrl,productId:product.id}),
                ),
                $('<div/>',{class:'cartItemNameContainer'}).append(
                    $('<a/>',{
                        class:'cartItemName productLink',
                        text:product.nameLang,
                        href:`/${lang}/${product.catName}/${product.name}`,
                        productId:product.id
                    }),
                    $('<div/>',{class:'cartItemSelectionsContainer'})
                ),
                $('<div/>',{class:'cartItemPriceContainer'}).append(
                    $('<div/>',{
                        class:'cartItemQtyContainer',
                    }).append(
                        $('<div/>',{class:'cartItemQtyMinus',itemId:itemId}).append($('<div/>',{class:'ic-minus m-a'})),
                        $('<div/>',{text:item.qty,class:'cartItemQty',itemId:itemId,readonly:true}),
                        $('<div/>',{class:'cartItemQtyPlus',itemId:itemId}).append($('<div/>',{class:'ic-plus m-a'})),
                    ),
                    $('<div/>',{class:'cartItemPrice'})
                ),
                $('<div/>',{
                    class:'cartItemNoticeContainer',
                }).append(
                    $('<div/>',{
                        class:'ic-edit cartItemNoticeEdit',
                        itemId:itemId,
                    }),
                    $('<input/>',{
                        class:'cartItemNotice',
                        readonly:true,
                        value:item.itemNotice,
                        placeholder:texts.orders.specialRequest,
                        itemId:itemId,
                        maxLength:150,
                    }),

                )


            )

        )
    )
    if(lang == 'ar' || lang == 'eg' && website.customLang_rtl){
        $('.cartItemQtyMinus').css('border-radius','0 3px 3px 0px')
        $('.cartItemQtyPlus').css('border-radius','3px 0 0 3px')
    }
    if(item.itemOptions.length > 0){
        for(const key in item.itemOptions){
            let optionId = item.itemOptions[key].optionId;
            let selectionId = item.itemOptions[key].selectionId;
            let option = null;
            let selection = null;
            option = product.product_options.find(elem => elem.id == optionId);
            if(option != null){
                selection = option.product_option_selections.find(elem => elem.id == selectionId);
                if(selection != null){
                    let optionName = option.name;
                    let selectionName = selection.name;
                    if(option['name_'+lang] != '' && option['name_'+lang] != null){optionName = option['name_'+lang]}
                    if(selection['name_'+lang] != '' && selection['name_'+lang] != null){selectionName = selection['name_'+lang]}
                    $('.cartItemContainer[itemId="'+itemId+'"]').find('.cartItemSelectionsContainer').append(
                        $('<div/>',{
                            class:'cartItemSelection',
                            itemId:itemId,
                            optionId:optionId,
                            text:optionName+': '+selectionName,
                            // tooltip:optionName,
                        })
                    )
                    itemPrice = itemPrice + parseFloat(selection.price);
                }

            }

        }
    }
    itemPrice = itemPrice * item.qty;
    $('.cartItemContainer[itemId="'+itemId+'"]').find('.cartItemPrice').text(website.currency+(itemPrice.toFixed(2)))
    if(product.availability == false){
        $('.cartItemContainer[itemId="'+itemId+'"]').find('.cartItemPrice').addClass('lthrow')
        $('.cartItemContainer[itemId="'+itemId+'"]').find('.cartItemName').after(
            $('<span/>',{text:texts.orders.notAvailable,class:'cartItemUnavailable'})
        )
        $('.cartItemContainer[itemId="'+itemId+'"]').find('.cartItemName').css('color','var(--c-crtunav)')
        $('.cartItemContainer[itemId="'+itemId+'"]').find('.cartItemSelection').addClass('cartItemSelectionUnavailable');
        $('.cartItemContainer[itemId="'+itemId+'"]').find('.cartItemImg').addClass('cartItemImgUnavailable')
        $('.cartItemContainer[itemId="'+itemId+'"]').addClass('cartItemContainerUnavailable')
        $('.cartItemContainer[itemId="'+itemId+'"]').find('.cartItemQtyMinus').addClass('cartItemQtyUnavailable')
        $('.cartItemContainer[itemId="'+itemId+'"]').find('.cartItemQty').addClass('cartItemQtyUnavailable')
        $('.cartItemContainer[itemId="'+itemId+'"]').find('.cartItemQtyPlus').addClass('cartItemQtyUnavailable')
    }
    if(calcCartTotal() == 0){
        $('.cartPlaceOrderBtn').prop('disabled',true)
    }else{
        $('.cartPlaceOrderBtn').prop('disabled',false)
    }

}
addToCartAnimation = () => {
    $('.addToCartAnimation').css({
        top:$('.popupImg').offset().top,
        left:$('.popupImg').offset().left,
        width:$('.popupImg').width(),
        height:$('.popupImg').height(),
    }).removeClass('none').attr('src',$('.popupImg').attr('src'));
        $('.addToCartAnimation').css({
            top:$('#cartIcon').offset().top,
            left:$('#cartIcon').offset().left,
            width:$('#cartIcon').width(),
            height:$('#cartIcon').height(),
        });
    setTimeout(()=>{
        $('.addToCartAnimation').css({
            top:0,
            left:0,
            width:0,
            height:0,
        }).addClass('none').attr('src',null);
    },200)
}
noOnlineOrdering = function(){
    $('.placeOrder-orderType[orderType="pickup"]').addClass('none');
    $('.placeOrder-orderType[orderType="delivery"]').addClass('none');
    $('.placeOrder-howReceiveOrder').addClass('none');
    $('.placeOrderWarningContainer').removeClass('none');
    $('#placeOrderWarning').text(texts.orders.noOnlineOrdering)
    $('.placeOrder-orderDetails').addClass('none');
    $('#PlaceOrder-Btn').addClass('none');
}
placeOrderPopupResetElem = function(){
    $('.placeOrder-orderType').removeClass('placeOrder-orderTypeMini');
    $('.placeOrder-howReceiveOrder').removeClass('placeOrder-howReceiveOrderHidden');
    $('.placeOrder-orderDetails').removeClass('none');
    $('.placeOrder-orderDetails').addClass('vH')
    $('#PlaceOrder-Btn').addClass('vH')
    $('#placeOrder-popup').css('overflow','hidden')
    $('.placeOrderWarningContainer').addClass('none');
    $('#placeOrderWarning').text('');
    $('.placeOrderSucessContainer').addClass('none');
    $('#placeOrderSucess').text('');
    $('.placeOrderErrorContainer').addClass('none');
    $('#placeOrderError').text('');
    setTimeout(function(){
        $('#placeOrder-popup').scrollTop(0)
    },500)
}
placeOrderPopupFail = function(){
    $('.placeOrder-orderDetails').addClass('none')
    $('#PlaceOrder-Btn').addClass('vH')
    $('.placeOrder-orderType').addClass('none')
    $('.placeOrder-howReceiveOrder').addClass('none');
    $('.placeOrderWarningContainer').addClass('none');
    $('.placeOrderSucessContainer').addClass('none');
    $('.placeOrderErrorContainer').removeClass('none');
    $('#placeOrderError').text(texts.orders.orderPlaceFail);
}
placeOrderPopupSuccess = function(successText){
    $('.placeOrder-orderDetails').addClass('none')
    $('#PlaceOrder-Btn').addClass('vH')
    $('.placeOrder-orderType').addClass('none')
    $('.placeOrder-howReceiveOrder').addClass('none');
    $('.placeOrderWarningContainer').addClass('none');
    $('.placeOrderErrorContainer').addClass('none');
    $('.placeOrderSucessContainer').removeClass('none');
    $('#placeOrderSucess').text(successText);
}
placeOrderPopupShowDelivery = function(){
    $('.placeOrder-howReceiveOrder').addClass('placeOrder-howReceiveOrderHidden');
    $('.placeOrder-orderType').addClass('placeOrder-orderTypeMini');
    $('.placeOrder-orderDetails').removeClass('vH')
    $('#PlaceOrder-Btn').removeClass('vH')
    $('#placeOrder-popup').css('overflow','auto')
}
placeOrderPopupShowDeliveryUnavailable = function(){
    $('.placeOrder-howReceiveOrder').addClass('placeOrder-howReceiveOrderHidden');
    $('.placeOrder-orderType').addClass('placeOrder-orderTypeMini');
}
placeOrderPopupShowPickup = function(){
    $('.placeOrder-howReceiveOrder').addClass('placeOrder-howReceiveOrderHidden');
    $('.placeOrder-orderType').addClass('placeOrder-orderTypeMini');
    $('.placeOrder-orderDetails').removeClass('vH')
    $('#PlaceOrder-Btn').removeClass('vH')
    $('#placeOrder-popup').css('overflow','auto')
}
placeOrderPopupShowPickupUnavailable = function(){
    $('.placeOrder-howReceiveOrder').addClass('placeOrder-howReceiveOrderHidden');
    $('.placeOrder-orderType').addClass('placeOrder-orderTypeMini');
}
drawPlaceOrderReceipt = function(){
    $('#placeOrderReceiptContainer').text('')
    let orderReceipt = calcOrderReceipt();
    let ReceiptTax;
    let ReceiptTaxP;
    let ReceiptDeliveryCost;
    let DeliveryCostCanChange;
    let ReceiptDiscountTxt;
    let ReceiptDiscount;
    let itemsTotal;
    let subtotalMinimumCharge;
    let totalMinimumCharge;
    $('#placeOrderReceiptContainer').append(
        $('<div/>',{
            class:'placeOrderReceiptItem',
        }).append(
            $('<div/>',{}).append(
                $('<div/>',{text:texts.orders.cartTotal}),
                ReceiptDiscountTxt = $('<div/>',{class:'',text:'('+parseFloat(orderReceipt.discount)+'% '+texts.orders.discount+')'})
            ),
            $('<div/>',{class:'taE'}).append(
                subtotalMinimumCharge = $('<div/>',{class:'mX-5 cW ic-warning placeOrderReceiptIcon',tooltip:texts.orders.orderMinimumCharge+' '+website.currency+orderReceipt.minChargeAmount}),
                itemsTotal = $('<div/>',{text:orderReceipt.itemsTotal}),
                ReceiptDiscount = $('<div/>',{text:orderReceipt.discount_itemsTotal}),
            )
        ),
        ReceiptTax = $('<div/>',{
            class:'placeOrderReceiptItem',
        }).append(
            $('<div/>',{class:''}).append(
                $('<span/>',{text:texts.orders.Tax}),
                ReceiptTaxP = $('<span/>',{class:'fs-08 mX-3',text:'.'+orderReceipt.taxPercent+'%'})
            ),
            $('<div/>',{text:orderReceipt.orderTax})
        ),
        ReceiptDeliveryCost = $('<div/>',{
            class:'placeOrderReceiptItem',
        }).append(
            $('<div/>',{text:texts.orders.deliveryCost}),
            $('<div/>',{class:'row alnC jstfyC'}).append(
                DeliveryCostCanChange = $('<span/>',{class:'mX-5 cW ic-warning placeOrderReceiptIcon',tooltip:texts.orders.deliveryCostCanBeChanged}),
                $('<span/>',{text:orderReceipt.deliveryCost}),
            )
        ),
        $('<div/>',{
            class:'placeOrderReceiptItem',
        }).append(
            $('<div/>',{class:'row alnC jstfyC'}).append(
                $('<div/>',{text:texts.orders.orderTotal}),
            ),
            $('<div/>',{}).append(
                $('<div/>',{}).append(
                    totalMinimumCharge = $('<span/>',{class:'mX-5 cW ic-warning placeOrderReceiptIcon',tooltip:texts.orders.orderMinimumCharge+' '+website.currency+orderReceipt.minChargeAmount}),
                    $('<span/>',{text:website.currency+orderReceipt.total}),
                ),
            )
        ),
    )
    if(orderReceipt.orderTax == 0){
        ReceiptTax.hide();
    }else if(orderReceipt.taxPercent == 0){
        ReceiptTaxP.hide();
    }
    if(orderReceipt.deliveryCost == 0){
        ReceiptDeliveryCost.hide();
    }
    if(!website.showDeliveryCostChangable){
        DeliveryCostCanChange.hide();
    }
    if(parseFloat(orderReceipt.discount_itemsTotal) < parseFloat(orderReceipt.itemsTotal)){
        itemsTotal.addClass('lthrow')
    }else{
        ReceiptDiscount.hide();
        ReceiptDiscountTxt.hide();
    }
    if(orderReceipt.minCharge == 'items'){
        totalMinimumCharge.hide();
    }else if(orderReceipt.minCharge == 'total'){
        subtotalMinimumCharge.hide();
    }else{
        totalMinimumCharge.hide();
        subtotalMinimumCharge.hide();
    }

    $('#placeOrderTotal').text(website.currency+orderReceipt.total)
}
drawPromocodeApplied = function(){
    let discountcapDisplay  = 'display:none;';
    if(window.promocode.cap > 0){discountcapDisplay = ''}
    $('.promocodeApplied').text('');
    $('.promocodeApplied').append(
        $('<div/>',{class:'ic-sucess promocodeAppliedIcon'}),
        $('<div/>',{
            class:' m-5 column alnS jstfyS'
        }).append(
            $('<div/>',{
                text:window.promocode.code,
                class:'fs-09',
            }),
            $('<div/>',{
                text:window.promocode.discount+'% '+texts.orders.discount,
                class:'fs-07',
            }),
            $('<div/>',{
                text:website.currency+window.promocode.cap+' '+texts.orders.discountCap,
                class:'fs-07',
                style:discountcapDisplay,
            }),
            $('<span/>',{
                text:texts.orders.removePromocode,
                class:'removePromocode cE alnsE mT-5 fs-08 pointer',
            }),
        )
    )
}

setOrderStatus = function(orderId,status){
    // let status = order.status;
    // let orderId = order.id;
    // if(order.status == 0){orderStatusIcon = 'ic-pending'}
    // else if(order.status == 1 ||order.status == 5 || order.status == 6 || order.status == 7){orderStatusIcon = 'ic-sucess'}
    // else if(order.status == 2){orderStatusIcon = 'ic-error'}
    // else if(order.status == 3){orderStatusIcon = 'ic-delivery'}
    // else if(order.status == 4){orderStatusIcon = 'ic-pickup'}
    let icon;
    let text;
    let bar ={};
    switch(status){
        case 0:
            icon = 'ic-pending cW';
            text = texts.orders.pending;
            bar = {'width':'10%','background-color':'var(--cw)'}
        break;
        case 1:
            icon = 'ic-sucess cW';
            text = texts.orders.accepted;
            bar = {'width':'25%','background-color':'var(--cw)'}
        break;
        case 2:
            icon = 'ic-error cE';
            text = texts.orders.canceled;
            bar = {'width':'100%','background-color':'var(--ce)'}
        break;
        case 3:
            icon = 'ic-delivery cW';
            text = texts.orders.withDelivery;
            bar = {'width':'50%','background-color':'var(--cw)'}
        break;
        case 4:
            icon = 'ic-pickup cW';
            text = texts.orders.readyForPickup;
            bar = {'width':'50%','background-color':'var(--cw)'}
        break;
        case 5:
            icon = 'ic-delivered cS';
            text = texts.orders.delivered;
            bar = {'width':'100%','background-color':'var(--cs)'}
        break;
        case 6:
            icon = 'ic-pickedup cS';
            text = texts.orders.pickedUp;
            bar = {'width':'100%','background-color':'var(--cs)'}
        break;
        case 7:
            icon = 'ic-dinein cS';
            text = texts.orders.dinein;
            bar = {'width':'100%','background-color':'var(--cs)'}
        break;
        case 8:
            icon = 'ic-dinein cW';
            text = texts.orders.diningin;
            bar = {'width':'50%','background-color':'var(--cw)'}
        break;
    }
    $('.orderStatusIcon-'+orderId).removeClass('ic-pending ic-sucess ic-error ic-delivery ic-pickup cE cW cS').addClass(icon)
    $('.orderStatusTxt-'+orderId).text(text)
    setTimeout(function(){
        $('.orderStatusIcon-'+orderId).removeClass('vH ic-pending ic-sucess ic-error ic-delivery ic-pickup cE cW cS').addClass(icon)
        $('.orderStatusTxt-'+orderId).text(text).removeClass('vH');
    },500);
    setTimeout(function(){
        $('.orderStatusBar-'+orderId).css(bar)
    },750)

}
drawTrackOrder = function(order){
    let orderStatusIcon;
    let orderType;
    let addressStyle ='display:none;';
    let deliveryCostStyle = 'display:none;';
    let taxStyle = 'display:none;';
    let serviceStyle = 'display:none;';
    let thisOrderItems;
    let itemsTotalStyle = '';
    let itemsTotalDiscountStyle = 'display:none;';
    let cancelOrderBtnStyle = 'display:none;';
    let orderAgainBtnStyle = 'display:none;';
    let orderToChatStyle = 'display:none;';
    if(website.liveChat){
        orderToChatStyle = '';
        if(!website.guestLiveChat && !loginCheck){
            orderToChatStyle = 'display:none;';
        }
    }
    if(order.status == 2 || order.status == 5 || order.status == 6 || order.status == 7){
        orderAgainBtnStyle = '';
    }
    if(order.status == 0 && website.cancelOrder){cancelOrderBtnStyle = '';}
    if(parseFloat(order.discount_itemsTotal) < parseFloat(order.itemsTotal)){
        itemsTotalStyle = 'text-decoration: line-through;';
        itemsTotalDiscountStyle = '';
    }
    if(order.tax > 0){taxStyle = '';}
    if(order.service > 0){serviceStyle = '';}
    if(order.deliveryCost > 0){deliveryCostStyle = '';}
    if(order.type == 0){
        orderType = texts.orders.homeDelivery;
        addressStyle = '';
    }else if(order.type == 1){orderType = texts.orders.orderPickup}
    else if(order.type == 2){orderType = texts.orders.dinein}
    $('.trackOrderContainer').text('');
    $('.trackOrderContainer').removeClass('none');
    $('.trackOrderContainer').append(
        $('<div/>',{
            class:'m-10 w-100-20 column alnC jstfyC'
        }).append(
            $('<div/>',{class:'column alnS jstfyS w-100p fs-102'}).append(
                $('<div/>',{
                    class:'row alnC jstfyC',
                }).append(
                    $('<div/>',{class:'placeOrderorderStatusAnimation vH trackOrderStatusIcon orderStatusIcon-'+order.id}),
                    $('<div/>',{class:'placeOrderorderStatusAnimation vH mX-5 orderStatusTxt-'+order.id,})
                ),
                $('<div/>',{
                    class:'trackOrderStatusBar'
                }).append($('<div/>',{style:'width:1%;',class:'orderStatusBar orderStatusBar-'+order.id}))
            ),
            $('<button/>',{
                text:texts.orders.copyItemsToCart,
                class:'alnsS mB-20 orderAgainBtn',
                orderId:order.id,
                style:orderAgainBtnStyle,
            }),
            $('<button/>',{
                text:texts.orders.cancelOrder,
                class:'alnsS mB-20 cancelOrderBtn',
                orderId:order.id,
                style:cancelOrderBtnStyle,
            }),
            $('<div/>',{
                class:'trackOrderElems',
            }).append(
                $('<div/>',{
                    class:'trackOrderElem',
                }).append(
                    $('<div/>',{text:texts.orders.orderNumber,class:'trackOrderElemStart'}),
                    $('<div/>',{class:'trackOrderElemEnd row alnC jstfyC'}).append(
                        $('<span/>',{class:'ic-chat orderToChat',orderId:order.id,style:orderToChatStyle,tooltip:texts.orders.orderToChat}),
                        $('<span/>',{text:order.id}),
                    ),
                ),
                $('<div/>',{
                    class:'trackOrderElem',
                }).append(
                    $('<div/>',{text:texts.orders.orderPlaced,class:'trackOrderElemStart'}),
                    $('<div/>',{text:getDateAndTime(order.placed_at),class:'trackOrderElemEnd'}),
                ),
                $('<div/>',{
                    class:'trackOrderElem',
                }).append(
                    $('<div/>',{text:texts.orders.orderType,class:'trackOrderElemStart'}),
                    $('<div/>',{text:orderType,class:'trackOrderElemEnd'}),
                ),
                $('<div/>',{
                    class:'trackOrderElem',
                }).append(
                    $('<div/>',{text:texts.authentication.phoneNumber,class:'trackOrderElemStart'}),
                    $('<div/>',{text:order.phoneNumber,class:'trackOrderElemEnd'}),
                ),
                $('<div/>',{
                    class:'trackOrderElem',
                    style:addressStyle,
                }).append(
                    $('<div/>',{text:texts.orders.deliverTo,class:'trackOrderElemStart'}),
                    $('<div/>',{text:order.address,class:'trackOrderElemEnd'}),
                ),
            ),
            $('<div/>',{class:'mT-30 alnsS',text:texts.orders.orderReceipt}),
            $('<div/>',{
                class:'trackOrderElems',
            }).append(
                $('<div/>',{
                    class:'trackOrderElem',
                }).append(
                    $('<div/>',{class:'trackOrderElemStart'}).append(
                        $('<div/>',{text:texts.orders.cartTotal}),
                        $('<div/>',{style:itemsTotalDiscountStyle,text:parseInt(order.discount)+'% '+texts.orders.discount})
                    ),
                    $('<div/>',{class:'trackOrderElemEnd'}).append(
                        $('<div/>',{style:itemsTotalStyle,class:'taE',text:parseFloat(order.itemsTotal).toFixed(2)}),
                        $('<div/>',{style:itemsTotalDiscountStyle,class:'taE',text:parseFloat(order.discount_itemsTotal).toFixed(2)}),
                    ),
                ),
                $('<div/>',{
                    class:'trackOrderElem',
                    style:deliveryCostStyle,
                }).append(
                    $('<div/>',{text:texts.orders.deliveryCost,class:'trackOrderElemStart'}),
                    $('<div/>',{text:website.currency+parseFloat(order.deliveryCost).toFixed(2),class:'trackOrderElemEnd'}),
                ),
                $('<div/>',{
                    class:'trackOrderElem',
                    style:taxStyle,
                }).append(
                    $('<div/>',{text:texts.orders.Tax,class:'trackOrderElemStart'}),
                    $('<div/>',{text:website.currency+parseFloat(order.tax).toFixed(2),class:'trackOrderElemEnd'}),
                ),
                $('<div/>',{
                    class:'trackOrderElem',
                    style:serviceStyle,
                }).append(
                    $('<div/>',{text:texts.orders.service,class:'trackOrderElemStart'}),
                    $('<div/>',{text:website.currency+parseFloat(order.service).toFixed(2),class:'trackOrderElemEnd'}),
                ),
                $('<div/>',{
                    class:'trackOrderElem',
                }).append(
                    $('<div/>',{text:texts.orders.orderTotal,class:'trackOrderElemStart'}),
                    $('<div/>',{text:website.currency+parseFloat(order.total).toFixed(2),class:'trackOrderElemEnd'}),
                ),
            ),
            $('<div/>',{class:'mT-30 alnsS',text:texts.orders.orderItems}),
            thisOrderItems = $('<div/>',{
                class:'trackOrderElems'
            }),

        )
    )
    for(const key in order.order_items){
        let item = order.order_items[key];
        let product = null;
        let itemOptionsC;
        product = products.find(elem => elem.id == item.product_id)
        if(typeof(product) === 'undefined'){
            thisOrderItems.append(
                $('<div/>',{
                    class:'trackOrderItemC',
                }).append(
                    $('<img/>',{class:'trackOrderItemImg',src:'/storage/imgs/noimg.png'}),
                    $('<div/>',{class:'column alnS jstfyS'}).append(
                        $('<div/>',{text:item.productName,class:'trackOrderItemName'}),
                        $('<div/>',{class:'fs-07 mX-10',text:texts.orders.quantity+': '+item.qty}),
                        itemOptionsC = $('<div/>',{class:'mX-5 fs-07 row wrap alnS jstfyS'})
                    )
                )
            )

            if(item.order_item_option_selections.length > 0 ){
                for(const key in item.order_item_option_selections){
                    let itemOption = item.order_item_option_selections[key];
                    itemOptionsC.append(
                        $('<div/>',{class:'trackOrderItemOption',text:itemOption.optionName+': '+itemOption.selectionName})
                    )
                }
            }
        }else{
            thisOrderItems.append(
                $('<div/>',{
                    class:'trackOrderItemC',
                }).append(
                    $('<a/>',{
                        class:'productLink',
                        productId:product.id,
                        href:'/'+lang+'/'+product.catName+'/'+product.name,
                    }).append(
                        $('<img/>',{productId:product.id,class:'trackOrderItemImg',src:product.thumbnailUrl}),
                    ),
                    $('<div/>',{class:'column alnS jstfyS'}).append(
                        $('<a/>',{productId:product.id,text:product.nameLang,class:'trackOrderItemName productLink',href:'/'+lang+'/'+product.catName+'/'+product.name}),
                        $('<div/>',{class:'fs-07 mX-10',text:texts.orders.quantity+': '+item.qty}),
                        itemOptionsC = $('<div/>',{class:'mX-5 fs-07 row wrap alnS jstfyS'})
                    )
                )
            )
            if(item.order_item_option_selections.length > 0 ){
                for(const key in item.order_item_option_selections){
                    let itemOption = item.order_item_option_selections[key];
                    let option = product.product_options.find(elem => elem.id == itemOption.product_option_id);
                    let optionName = option.name;
                    if(option['name_'+lang] != '' && option['name_'+lang] != null){optionName = option['name_'+lang]}
                    let selection = option.product_option_selections.find(elem => elem.id == itemOption.product_option_selection_id);
                    let selectionName = selection.name;
                    if(selection['name_'+lang] != '' && selection['name_'+lang] != null){selectionName = selection['name_'+lang];}
                    itemOptionsC.append(
                        $('<div/>',{class:'trackOrderItemOption',text:optionName+': '+selectionName})
                    )
                }
            }
        }

    }
    setOrderStatus(order.id,order.status)
}
drawOrderHistoryCard = function(order,append='append'){
    $('#noOrderHistory').hide();
    if(append == 'append'){
        $('#orderHistoryContainer').append(
            $('<div/>',{
                class:'orderHistoryElemC trackOrder',
                placedAt:order.placed_at,
                orderId:order.id,
            }).append(
                $('<div/>',{
                    class:'m-10 w-100-20 column alnC jstfyC'
                }).append(
                    $('<div/>',{class:'column alnS jstfyS w-100p fs-102'}).append(
                        $('<div/>',{
                            class:'row wrap alnC jstfySB w-100p fs-08'
                        }).append(
                            $('<div/>',{
                                text:texts.orders.orderNumber+': '+order.id,
                                class:'mY-5',
                            }),
                            $('<div/>',{
                                class:'row alnC jstfyC mY-5',
                            }).append(
                                $('<div/>',{class:'trackOrderStatusIcon p-4 orderStatusIcon-'+order.id}),
                                $('<div/>',{class:'mX-5 orderStatusTxt-'+order.id,})
                            ),
                        ),
                        $('<div/>',{
                            class:'trackOrderStatusBar mT-5'
                        }).append($('<div/>',{style:'width:1%;',class:'orderStatusBar orderStatusBar-'+order.id}))
                    ),
                    $('<div/>',{
                        text:texts.orders.orderPlaced+' '+diffTime(order.placed_at),
                        class:'fs-07 alnsS'
                    })
                )
            )
        )
    }else if(append == 'prepend'){
        $('#orderHistoryContainer').perpend(
            $('<div/>',{
                class:'orderHistoryElemC trackOrder',
                placedAt:order.placed_at,
                orderId:order.id,
            }).append(
                $('<div/>',{
                    class:'m-10 w-100-20 column alnC jstfyC'
                }).append(
                    $('<div/>',{class:'column alnS jstfyS w-100p fs-102'}).append(
                        $('<div/>',{
                            class:'row wrap alnC jstfySB w-100p fs-08'
                        }).append(
                            $('<div/>',{
                                text:texts.orders.orderNumber+': '+order.id,
                                class:'mY-5',
                            }),
                            $('<div/>',{
                                class:'row alnC jstfyC mY-5',
                            }).append(
                                $('<div/>',{class:'trackOrderStatusIcon p-4 orderStatusIcon-'+order.id}),
                                $('<div/>',{class:'mX-5 orderStatusTxt-'+order.id,})
                            ),
                        ),
                        $('<div/>',{
                            class:'trackOrderStatusBar mT-5'
                        }).append($('<div/>',{style:'width:1%;',class:'orderStatusBar orderStatusBar-'+order.id}))
                    ),
                    $('<div/>',{
                        text:texts.orders.orderPlaced+' '+diffTime(order.placed_at),
                        class:'fs-07 alnsS'
                    })
                )
            )
        )
    }

    setOrderStatus(order.id,order.status)
}
