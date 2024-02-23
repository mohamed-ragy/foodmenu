drawPopupPage_order = function(order_id){
    getOrder(order_id).then((order)=>{
        checkUseenNotifications(['orders.new_order_user','orders.canceled_by_user','orders.delivered_by_delivery'],'order_id',order_id)
        $('#popupPageTitle').append(
            $('<span/>',{class:'ellipsis',text:texts.orders.orderHashNumber.replace(':order:',order.id)}),
        );
        $('#popupPageBody').text('').addClass('mxw100p-40 w600 p20').append(
            $('<div/>',{class:'popupPageTabs'}).append(
                $('<div/>',{class:'popupPageTabArrow popupPageTabArrowLeft ico-left'}),
                $('<div/>',{class:'popupPageTabsContainer'}).append(
                    $('<div/>',{tab:'order_details',class:'popupPageTab popupPageTab_selected alnBL',text:texts.orders.order_details}),
                    $('<div/>',{tab:'order_items',class:'popupPageTab alnBL',text:texts.orders.order_items}),
                    $('<div/>',{tab:'order_activites',class:'popupPageTab popupPageTab_order_activites alnBL',text:texts.orders.order_activites}),
                ),
                $('<div/>',{class:'popupPageTabArrow popupPageTabArrowRight ico-right'}),
            ),
            $('<div/>',{class:'popupPageTabContainer popupPageTabContainer_selected order_popupPage_orderDetails',tab:'order_details',autoHelp:order.status == 5 || order.status == 6 || order.status == 7 || order.status == 2 ? '' : 'incomplete_order_details'}),
            $('<div/>',{class:'popupPageTabContainer order_popupPage_orderItems',tab:'order_items'}).append(
                $('<div/>',{class:`btnContainer mY20 ${order.status == 5 || order.status == 6 || order.status == 7 || order.status == 2 ? 'none' : ''}`}).append($('<button/>',{class:'btn btn-cancel',id:'order-addItemBtn',text:texts.orders.addItem})),
                $('<div/>',{class:'brdrB1 mY50',id:'order-itemsContainer'}),
                $('<div/>',{class:'area mY50'}).append(
                    $('<div/>',{class:'areaTitle',text:texts.orders.orderReceipt}),
                    $('<div/>',{class:'',id:'order-receipt',autoHelp:order.status == 5 || order.status == 6 || order.status == 7 || order.status == 2 ? '' : 'order_receipt'}),
                ),
                $('<div/>',{class:`area mY50 ${order.order_items_original == null ? 'none' : ''}`}).append(
                    $('<div/>',{class:'areaTitle',text:texts.orders.originalItems}),
                    $('<div/>',{class:'',id:'order-original_items'}),
                )
            ),
            $('<div/>',{class:'popupPageTabContainer order_popupPage_orderActivities',tab:'order_activites',autoHelp:'order_activities'}),

        )
        drawPopupPage_order_fillData(order_id)
    },function(){
        showPopup_notFound(texts.orders.orderNotFound)
        popupPageClose(false);
    })
}
drawPopupPage_order_fillData = function(order_id){
    getOrder(order_id).then((order)=>{
        drawPopupPage_order_details(order);
        drawPoupPage_order_items(order);
        drawPoupPage_order_receipt(order);
    });

}
drawPopupPage_order_details = function(order){
    $('.order_popupPage_orderDetails').text('').append(
        $('<div/>',{class:'bold500 fs101 mB5',text:texts.orders.orderInfo}),
        $('<div/>',{class:'orderDetailsElem'}).append(
            $('<div/>',{class:'mie-40'}).append(
                $('<div/>',{text:texts.orders.type}),
                $('<div/>',{class:`fs08 ${order.typeEdit_account_id == null ? 'none' : ''}`,html:texts.orders.lastModified.replace(':account:',`<a class="popupPage popupId" popupId="sub_account" popupPage="sub_account" subaccount="${order.typeEdit_account_id}" >${order.typeEdit_account_name}</a>`)})
            ),
            drawPopupPage_order_details_orderTypeElem(order),
        ),
        $('<div/>',{class:'orderDetailsElem'}).append(
            $('<div/>',{class:'mie-40',text:texts.orders.status}),
            orderRow_data(order).statusTag
        ),
        $('<div/>',{class:`orderDetailsElem ${order.paymentMethod == null || order.paymentMethod == '' ? 'none' : ''}`}).append(
            $('<div/>',{class:'mie-40',text:texts.orders.paymentMethod}),
            $('<div/>',{class:'',text:texts.orders[order.paymentMethod]})
        ),
        $('<div/>',{class:`orderDetailsElem ${order.status == 0 || order.status == 1 || order.status == 3 || order.status == 4 || order.status == 8 ? 'none' : ''}`}).append(
            $('<div/>',{class:'mie-40',text:texts.orders.collectReviewsSeen}),
            $('<div/>',{class:'',text:order.collectReviewSeen ? texts.orders.seen : texts.orders.unSeen})
        ),
        drawPopupPage_order_details_orderNotice(order),
        $('<div/>',{class:'mY30 pageSection_brdrB'}),
        $('<div/>',{class:'bold500 fs101 mB5',text:texts.orders.customer}),
        $('<div/>',{class:'orderDetailsElem'}).append(
            $('<div/>',{class:'mie-40',text:texts.orders.customer}),
            $('<div/>',{class:'',html:order.isGuest ? texts.cpanel.public.guest : `<a class="popupPage popupId" popupId="user" popupPage="user" user="${order.user_id}">${order.userName}</a>`})
        ),
        drawPopupPage_order_details_phoneNumber(order),
        drawPopupPage_order_details_address(order),
    )

}
drawPopupPage_order_details_orderTypeElem = function(order){
    let changeable; let typeIcon; let typeColor;
    order.status == 0 || order.status == 1 ? changeable = true : changeable = false;
    order.type == 0 ? typeIcon = 'ico-delivery' : order.type == 1 ? typeIcon = 'ico-pickup fs09' : order.type == 2 ? typeIcon = 'ico-dineIn' : null;
    order.type == 0 ? typeColor = 'c_delivery' : order.type == 1 ? typeColor = 'c_pickup' : order.type == 2 ? typeColor = 'c_dineIn' : null;
    return $('<div/>',{class:'orderTypeTagContainer'}).append(
        $('<div/>',{class:'loading none m0'}),
        $('<div/>',{class:`orderTypeTag ${typeColor} ${changeable ? 'pointer changeOrderType' : ''} `}).append(
            $('<span/>',{class:`${typeIcon}`}),
            $('<span/>',{class:'mX5 ellipsis',text:texts.orders[`type_${order.type}`]}),
            $('<span/>',{class:`ico-down fs08 mis-10 ${changeable ? '' : 'none'}`})
        )
    )
}
drawPopupPage_order_details_orderNotice = function(order){
    if(order.status == 0 || order.status == 1 || order.status == 3 || order.status == 4 || order.status == 8){
        return $('<div/>',{class:'orderDetailsElem br5 column alnS jstfyS'}).append(
            $('<div/>',{class:'mie-50 row alnC jstfyS'}).append(
                $('<div/>',{class:'none fs08 mie-5 ico-warning cO orderNoticeNoSave',tooltip:texts.cpanel.public.unsaved}),
                $('<div/>',{text:texts.orders.orderComment,class:''}),
                $('<div/>',{class:'ico-edit mis-5 fs08 pointer changeOrderNoticeEditBtn',tooltip:texts.cpanel.public.edit})
            ),
            $('<textarea/>',{maxlength:500,text:order.notice,class:'changeOrderNotice textarea h50 fs1 brdr0 bgc-c1 br3 p5 mY5 w100p-10',value:order.notice}),
            $('<div/>',{class:`fs08 ${order.noticeEdit_account_id == null ? 'none' : ''}`,html:texts.orders.lastModified.replace(':account:',`<a class="popupPage popupId" popupId="sub_account" popupPage="sub_account" subaccount="${order.noticeEdit_account_id}" >${order.noticeEdit_account_name}</a>`)}),
            $('<div/>',{class:'row alnC jstfyE w100p changeOrderNoticeBtns none'}).append(
                $('<button/>',{class:'btn btn_s btn-cancel cancelChangeOrderNoticeBtn',text:texts.cpanel.public.cancel}),
                $('<button/>',{class:'btn btn_s changeOrderNoticeBtn'}).append(
                    $('<div/>',{class:'btnLoading_s'}),
                    $('<div/>',{class:'btnTxt',text:texts.cpanel.public.save})
                )
            )
        )
    }else{
        if(order.notice != null && order.notice != ''){
            return $('<div/>',{class:'orderDetailsElem column alnS jstfyS'}).append(
                $('<div/>',{text:texts.orders.orderComment,class:'mie-50'}),
                $('<div/>',{text:order.notice,class:'mxw330 mX10 mT5'}),
                $('<div/>',{class:`fs08 mT20 ${order.noticeEdit_account_id == null ? 'none' : ''}`,html:texts.orders.lastModified.replace(':account:',`<a class="popupPage popupId" popupId="sub_account" popupPage="sub_account" subaccount="${order.noticeEdit_account_id}" >${order.noticeEdit_account_name}</a>`)}),

            )
        }
    }
}
drawPopupPage_order_details_phoneNumber = function(order){
    if(order.status == 0 || order.status == 1 || order.status == 3 || order.status == 4 || order.status == 8){
        return $('<div/>',{class:'orderDetailsElem'}).append(
            $('<div/>',{class:''}).append(
                $('<div/>',{class:'mie-40 row alnC jstfyS'}).append(
                    $('<div/>',{class:'none fs08 mie-5 ico-warning cO orderPhoneNumbereNoSave',tooltip:texts.cpanel.public.unsaved}),
                    $('<div/>',{text:texts.orders.phoneNumber,class:'tnw'}),
                    $('<div/>',{class:'ico-edit mis-5 fs08 pointer changeOrderPhoneNumberEditBtn',tooltip:texts.cpanel.public.edit})
                ),
                $('<div/>',{class:`fs08  ${order.phoneEdit_account_id == null ? 'none' : ''}`,html:texts.orders.lastModified.replace(':account:',`<a class="popupPage popupId" popupId="sub_account" popupPage="sub_account" subaccount="${order.phoneEdit_account_id}" >${order.phoneEdit_account_name}</a>`)}),
            ),

            $('<div/>',{class:'column alnS jstfyS'}).append(
                $('<input/>',{class:'inputText br5 taE changeOrderPhoneNumber',type:'text',value:order.phoneNumber}),
                $('<div/>',{class:'row alnC jstfyE w100p changeOrderPhoneNumberBtns none'}).append(
                    $('<button/>',{class:'btn btn_s btn-cancel cancelChangeOrderPhoneNumberBtn',text:texts.cpanel.public.cancel}),
                    $('<button/>',{class:'btn btn_s changeOrderPhoneNumberBtn'}).append(
                        $('<div/>',{class:'btnLoading_s'}),
                        $('<div/>',{class:'btnTxt',text:texts.cpanel.public.save})
                    )
                )
            )
        )
    }else{
        return $('<div/>',{class:'orderDetailsElem'}).append(
            $('<div/>',{class:'mie-40'}).append(
                $('<div/>',{text:texts.orders.phoneNumber}),
                $('<div/>',{class:`fs08  ${order.phoneEdit_account_id == null ? 'none' : ''}`,html:texts.orders.lastModified.replace(':account:',`<a class="popupPage popupId" popupId="sub_account" popupPage="sub_account" subaccount="${order.phoneEdit_account_id}" >${order.phoneEdit_account_name}</a>`)}),
            ),
            $('<div/>',{class:'',text:order.phoneNumber}),
        );
    }

}
drawPopupPage_order_details_address = function(order){
    if(order.status == 0 || order.status == 1 || order.status == 3 || order.status == 4 || order.status == 8){
        return $('<div/>',{class:`orderDetailsElem ${order.type != 0 ? 'none' : ''}`}).append(
            $('<div/>',{class:''}).append(
                $('<div/>',{class:'mie-40 row alnC jstfyS'}).append(
                    $('<div/>',{class:'none fs08 mie-5 ico-warning cO orderAdressNoSave',tooltip:texts.cpanel.public.unsaved}),
                    $('<div/>',{text:texts.orders.address,class:'tnw'}),
                    $('<div/>',{class:'ico-edit mis-5 fs08 pointer changeOrderAdressEditBtn',tooltip:texts.cpanel.public.edit})
                ),
                $('<div/>',{class:`fs08  ${order.addressEdit_account_id == null ? 'none' : ''}`,html:texts.orders.lastModified.replace(':account:',`<a class="popupPage popupId" popupId="sub_account" popupPage="sub_account" subaccount="${order.addressEdit_account_id}" >${order.addressEdit_account_name}</a>`)}),
            ),

            $('<div/>',{class:'column alnS jstfyS'}).append(
                $('<input/>',{class:'inputText br5 taE changeOrderAdress grow2',type:'text',value:order.address}),
                $('<div/>',{class:'row alnC jstfyE w100p changeOrderAdressBtns none'}).append(
                    $('<button/>',{class:'btn btn_s btn-cancel cancelChangeOrderAdressBtn',text:texts.cpanel.public.cancel}),
                    $('<button/>',{class:'btn btn_s changeOrderAdressBtn'}).append(
                        $('<div/>',{class:'btnLoading_s'}),
                        $('<div/>',{class:'btnTxt',text:texts.cpanel.public.save})
                    )
                )
            )
        )
    }else{
        return $('<div/>',{class:`orderDetailsElem ${order.type != 0 ? 'none' : ''}`}).append(
            $('<div/>',{class:'mie-40'}).append(
                $('<div/>',{text:texts.orders.address}),
                $('<div/>',{class:`fs08  ${order.addressEdit_account_id == null ? 'none' : ''}`,html:texts.orders.lastModified.replace(':account:',`<a class="popupPage popupId" popupId="sub_account" popupPage="sub_account" subaccount="${order.addressEdit_account_id}" >${order.addressEdit_account_name}</a>`)}),
            ),
            $('<div/>',{class:'taE',text:order.address}),
        );
    }
}
//
drawPoupPage_order_items = function(order){
    $('#order-itemsContainer').text('');
    let order_complete = false;
    order.status == 5 || order.status == 6 || order.status == 7 || order.status == 2 ? order_complete = true : null;
    !order_complete ? $('#order-itemsContainer').attr('autoHelp','incomplete_order_items') : $('#order-itemsContainer').attr('autoHelp',null);
    for(const key in order.order_items){
        let item = order.order_items[key];
        let product = website.products.find(i=>i.id == item.product_id);
        let product_exist = false;
        if(typeof(product) !== 'undefined'){product_exist = true;}
        let qty = item.qty;
        let thisSelectionsContainer;
        $('#order-itemsContainer').append(
            $('<div/>',{class:'order-item',item:item._id}).append(
                $('<div/>',{class:'row alnC jstfySB w100p'}).append(
                    $('<div/>',{class:`${order_complete ? 'none' : ''}ico-close fs08 p3 br3 order-deleteItem`,tooltip:texts.cpanel.public.remove}),
                    $('<div/>',{class:'row alnC jstfyS mie-10'}).append(
                        $('<img/>',{src:product_exist ? product.thumbnail : './storage/imgs/cpanel/noimg.png',class:'none-720 w40 h40 ofCover br5 mie-5'}),
                        $('<div/>',{class:''}).append(
                            $('<div/>',{class:'bold fs09',text:item.productName}),
                            $('<div/>',{class:`fs08 ${order_complete ? '' : 'none'}`,text:`${texts.orders.qty}:${qty}`}),
                        ),
                    ),
                    $('<div/>',{class:'column alnE jstfyS grow1 mX10'}).append(
                        $('<div/>',{class:`${order_complete ? 'none' : ''} numberPickerControls mB5 mX5`}).append(
                            $('<span/>',{class:`numberPickerArrow fs08 ico-left order-qtyMins`}),
                            $('<span/>',{class:`numberPickerValue fs08 wFC mnw50`}).append(
                                $('<span/>',{class:'c_white-10 mie-3',text:`${texts.orders.qtyS}:`}),
                                $('<span/>',{class:' order-qty',text:qty})
                            ),
                            $('<span/>',{class:`numberPickerArrow fs08 ico-right order-qtyPlus`}),
                        ),
                        thisSelectionsContainer = $('<div/>',{class:'row wrap alnS jstfyS '}),
                    ),
                    $('<div/>',{class:'fs09 mis-10',text:`${website.currency}${bigFloat(item.total)}`})
                ),
                $('<div/>',{class:`${order_complete ? 'none' : ''} order-itemNoticeContainer row alnC jstfyS w100p-10 m5 mT10`,tooltip:texts.orders.specialRequest}).append(
                    $('<span/>',{class:'ico-edit fs08 pointer order-editItemNotice'}),
                    $('<input/>',{class:'order-itemNotice',value:item.itemNotice,placeholder:texts.orders.addSpecialRequest,maxLength:200}),
                ),
                $('<div/>',{class:`${order_complete ? '' : 'none'} ${item.itemNotice == '' || item.itemNotice == null ? 'none' : ''} row alnC jstfyS w100p-10 m5 mT10`}).append(
                    $('<span/>',{class:'fs08 c_white-10 mie-5',text:`${texts.orders.specialRequest}:`}),
                    $('<span/>',{class:'fs08 ',text:item.itemNotice}),
                )
            )
        )

        for(const key2 in item.order_item_option_selections){
            let selection = item.order_item_option_selections[key2];
            thisSelectionsContainer.append(
                $('<div/>',{class:`order-selection ${order_complete ? '' : 'pointer'}`,option:selection.product_option_id,selection:selection.product_option_selection_id}).append(
                    $('<div/>',{class:'fs08'}).append(
                        $('<span/>',{class:'mie-3 c_white-10',text:`${selection.optionName}:`}),
                        $('<span/>',{class:'',text:`${selection.selectionName}`}),
                    ),
                    $('<div/>',{class:`ico-down fs07 mis-10 ${order_complete ? 'none' : ''}`})
                )
            )
        }
    }
    $('#order-itemsContainer').append(
        $('<div/>',{class:`fs08 mT10 ${order.itemsEdit_account_id == null ? 'none' : ''}`,html:texts.orders.itemsLastModified.replace(':account:',`<a class="popupPage popupId" popupId="sub_account" popupPage="sub_account" subaccount="${order.itemsEdit_account_id}" >${order.itemsEdit_account_name}</a>`)}),
    )

    $('#order-original_items').text('')
    if(order.order_items_original != null){
        $('#order-original_items').closest('.area').removeClass('none')
        for(const key in order.order_items_original){
            let item = order.order_items_original[key];
            let product = website.products.find(i=>i.id == item.product_id);
            let product_exist = false;
            if(typeof(product) !== 'undefined'){product_exist = true;}
            let qty = item.qty;
            let thisSelectionsContainer;
            $('#order-original_items').append(
                $('<div/>',{class:`order-original_item ${key == 0 ? 'brdrT0' : ''}`}).append(
                    $('<div/>',{class:'row alnC jstfySB w100p'}).append(
                        $('<div/>',{class:'row alnC jstfyS mie-10'}).append(
                            $('<img/>',{src:product_exist ? product.thumbnail : './storage/imgs/cpanel/noimg.png',class:'blackWhite none-720 w40 h40 ofCover br5 mie-5'}),
                            $('<div/>',{class:''}).append(
                                $('<div/>',{class:'bold fs09',text:item.productName}),
                                $('<div/>',{class:`fs08`,text:`${texts.orders.qty}:${qty}`}),
                            ),
                        ),
                        $('<div/>',{class:'column alnE jstfyS grow1 mX10'}).append(
                            thisSelectionsContainer = $('<div/>',{class:'row wrap alnS jstfyS '}),
                        ),
                        $('<div/>',{class:'fs09 mis-10',text:`${website.currency}${bigFloat(item.total)}`})
                    )
                )
            )
            for(const key2 in item.order_item_option_selections){
                let selection = item.order_item_option_selections[key2];
                thisSelectionsContainer.append(
                    $('<div/>',{class:`order-selection`}).append(
                        $('<div/>',{class:'fs08'}).append(
                            $('<span/>',{class:'mie-3 c_white-10',text:`${selection.optionName}:`}),
                            $('<span/>',{class:'',text:`${selection.selectionName}`}),
                        ),
                    )
                )
            }
        }
    }
}
drawPoupPage_order_receipt = function(order){
    let changeable = false;
    order.status == 0 || order.status == 1 || order.status == 3 || order.status == 4 || order.status == 8 ? changeable = true : null ;
    let discount_elem = ''
    let discountBy_elem = '';
    if(order.discount_by == 1){
        discountBy_elem = $('<div/>',{class:`fs08 `,html:texts.orders.addedByAcount.replace(':account:',`<a class="popupPage popupId" popupId="sub_account" popupPage="sub_account" subaccount="${order.discount_account_id}" >${order.discount_account_name}</a>`)})
    }else if(order.discount_by == 2){
        discountBy_elem = $('<div/>',{class:'fs08',text:texts.orders.addByScheduledDiscounts})
    }else if(order.discount_by == 3){
        discountBy_elem = $('<div/>',{class:`fs08 `,html:texts.orders.addByPromocode.replace(':code:',`<a class="popupPage" popupPage="manage_promo_code" promocode="${order.discount_promocode}" >${order.discount_promocode}</a>`)})
    }
    if(changeable){
        discount_elem = $('<div/>',{class:'order-receiptElem brdrT0'}).append(
            $('<div/>',{class:''}).append(
                $('<div/>',{class:'row alnC jstfyS'}).append(
                    $('<div/>',{class:'none fs08 mie-5 ico-warning cO order-discountNoSave',tooltip:texts.cpanel.public.unsaved}),
                    $('<div/>',{class:'fs09',text:texts.orders.discount}),
                ),
                discountBy_elem,
            ),
            $('<div/>',{class:''}).append(
                $('<div/>',{class:'numberPickerControls jstfyE mX5 bgc_trans mB5'}).append(
                    $('<span/>',{class:'numberPickerArrow fs08 ico-left',id:'order-discountD'}),
                    $('<span/>',{class:'numberPickerValue fs08 wFC mnw50'}).append(
                        $('<span/>',{id:'order-discount',text:order.discount}),
                        $('<span/>',{text:'%'})
                    ),
                    $('<span/>',{class:'numberPickerArrow fs08 ico-right',id:'order-discountU'}),
                ),
                $('<div/>',{class:'row alnC jstfyE w100p changeOrderDiscountBtns none'}).append(
                    $('<button/>',{class:'btn btn_s btn-cancel cancelChangeOrderDiscountBtn',text:texts.cpanel.public.cancel}),
                    $('<button/>',{class:'btn btn_s changeOrderDiscountBtn'}).append(
                        $('<div/>',{class:'btnLoading_s'}),
                        $('<div/>',{class:'btnTxt',text:texts.cpanel.public.save})
                    )
                )
            )

        )
    }else if(order.discount > 0){
        discount_elem = $('<div/>',{class:'order-receiptElem'}).append(
            $('<div/>',{class:''}).append(
                $('<div/>',{class:'fs09',text:texts.orders.discount}),
                discountBy_elem,
            ),
            $('<div/>',{class:'fs09',text:`${bigFloat(order.discount)}%`}),
        )
    }
    ////subtotal
    let subTotalElem_text = $('<div/>',{class:'fs09',text:texts.orders.subTotal});
    let subTotalElem = $('<div/>',{class:'fs09',text:bigFloat(order.discount_itemsTotal)});
    if(order.discount > 0){
        subTotalElem = $('<div/>',{class:'column alnE jstfyS'}).append(
            $('<div/>',{class:'lThrough',text:bigFloat(order.itemsTotal)}),
            $('<div/>',{class:'',text:bigFloat(order.discount_itemsTotal)}),
        );
    }
    ////tax
    let taxElem_text = $('<div/>',{class:'fs09',text:texts.orders.tax});
    let taxElem = $('<div/>',{class:'fs09',text:bigFloat(order.tax)});
    if(order.taxPercent > 0){
        taxElem_text = $('<div/>').append(
            $('<span/>',{class:'fs09 mie-3',text:texts.orders.tax}),
            $('<span/>',{class:'fs07',text:`${bigFloat(order.taxPercent)}%`}),
        );
    }
    ////service
    let serviceElem_text = $('<div/>',{class:'fs09',text:texts.orders.service});
    let serviceElem = $('<div/>',{class:'fs09',text:bigFloat(order.service)});
    if(order.servicePercent > 0){
        serviceElem_text = $('<div/>').append(
            $('<span/>',{class:'fs09 mie-3',text:texts.orders.service}),
            $('<span/>',{class:'fs07',text:`${bigFloat(order.servicePercent)}%`}),
        );
    }
    /////delivery cost
    let deliveryCostElem_text = $('<div/>',{class:'mie-40'}).append(
        $('<div/>',{class:'row alnC jstfyS'}).append(
            $('<div/>',{class:'none fs08 mie-5 ico-warning cO order-deliveryCostNoSave',tooltip:texts.cpanel.public.unsaved}),
            $('<div/>',{class:'fs09',text:texts.orders.deliveryCost}),
        ),
        $('<div/>',{class:`fs08  ${order.deliveryEdit_account_id == null ? 'none' : ''}`,html:texts.orders.lastModified.replace(':account:',`<a class="popupPage popupId" popupId="sub_account" popupPage="sub_account" subaccount="${order.deliveryEdit_account_id}" >${order.deliveryEdit_account_name}</a>`)}),
    );
    let deliveryCostElem = $('<div/>',{class:'row alnC jstfyE'}).append(
        $('<div/>',{class:'fs09 ',text:bigFloat(order.deliveryCost)}),
    )
    if(changeable && order.type == 0){
        deliveryCostElem = $('<div/>',{class:''}).append(
            $('<div/>',{class:'mB5 row alnC jstfyE'}).append(
                $('<input/>',{class:'taE ordersReceipt_deliveryCost',id:'order-deliveryCost',value:bigFloat(order.deliveryCost)}),
                $('<div/>',{class:'ico-edit pointer fs09 mis-5',type:'number',id:'order-editDeliveryCost',tooltip:texts.cpanel.public.edit})
            ),
            $('<div/>',{class:'row alnC jstfyE w100p changeOrderDeliveryCostBtns none'}).append(
                $('<button/>',{class:'btn btn_s btn-cancel cancelChangeOrderDeliveryCostBtn',text:texts.cpanel.public.cancel}),
                $('<button/>',{class:'btn btn_s changeOrderDeliveryCostBtn'}).append(
                    $('<div/>',{class:'btnLoading_s'}),
                    $('<div/>',{class:'btnTxt',text:texts.cpanel.public.save})
                )
            )
        )
    }
    ////
    $('#order-receipt').text('').append(
        discount_elem,
        $('<div/>',{class:'order-receiptElem'}).append(
            subTotalElem_text,
            subTotalElem,
        ),
        $('<div/>',{class:`order-receiptElem ${order.tax == 0 ? 'none' : null}`}).append(
            taxElem_text,
            taxElem,
        ),
        $('<div/>',{class:`order-receiptElem ${order.service == 0 ? 'none' : null}`}).append(
            serviceElem_text,
            serviceElem,
        ),
        $('<div/>',{class:`order-receiptElem ${order.deliveryCost == 0 ? 'none' : null}`}).append(
            deliveryCostElem_text,
            deliveryCostElem,
        ),
        $('<div/>',{class:'order-receiptElem'}).append(
            $('<div/>',{class:'fs09',text:texts.orders.total}),
            $('<div/>',{class:'fs09',text:`${website.currency}${bigFloat(order.total)}`}),
        ),
    )

}
//
draw_orderActivities_loading = function(){
    $('.order_popupPage_orderActivities').text('').append(
        $('<div/>',{class:'orderActivity_container'}).append(
            $('<div/>',{class:`orderActivity_left`}).append(
                $('<div/>',{class:'w50 h10 cardLoading br5 mT5',}),
            ),
            $('<div/>',{class:`orderActivity_iconContainer`}).append($('<div/>',{class:`orderActivity_icon bgc_white-1 cardLoading h20 w20 br50p`})),
            $('<div/>',{class:`orderActivity_right`}).append(
                $('<div/>',{class:'cardLoading w250 h10 br5 mT5'}),
            ),
        ),
        $('<div/>',{class:'orderActivity_container'}).append(
            $('<div/>',{class:`orderActivity_left`}).append(
                $('<div/>',{class:'w50 h10 cardLoading br5 mT5',}),
            ),
            $('<div/>',{class:`orderActivity_iconContainer`}).append($('<div/>',{class:`orderActivity_icon bgc_white-1 cardLoading h20 w20 br50p`})),
            $('<div/>',{class:`orderActivity_right`}).append(
                $('<div/>',{class:'cardLoading w300 h10 br5 mT5'}),
            ),
        ),
        $('<div/>',{class:'orderActivity_container'}).append(
            $('<div/>',{class:`orderActivity_left`}).append(
                $('<div/>',{class:'w50 h10 cardLoading br5 mT5',}),
            ),
            $('<div/>',{class:`orderActivity_iconContainer`}).append($('<div/>',{class:`orderActivity_icon bgc_white-1 cardLoading h20 w20 br50p`})),
            $('<div/>',{class:`orderActivity_right`}).append(
                $('<div/>',{class:'cardLoading w250 h10 br5 mT5'}),
            ),
        ),
        $('<div/>',{class:'orderActivity_container'}).append(
            $('<div/>',{class:`orderActivity_left`}).append(
                $('<div/>',{class:'w50 h10 cardLoading br5 mT5',}),
            ),
            $('<div/>',{class:`orderActivity_iconContainer`}).append($('<div/>',{class:`orderActivity_icon bgc_white-1 cardLoading h20 w20 br50p`})),
            $('<div/>',{class:`orderActivity_right`}).append(
                $('<div/>',{class:'cardLoading w200 h10 br5 mT5'}),
            ),
        ),
        $('<div/>',{class:'orderActivity_container'}).append(
            $('<div/>',{class:`orderActivity_left`}).append(
                $('<div/>',{class:'w50 h10 cardLoading br5 mT5',}),
            ),
            $('<div/>',{class:`orderActivity_iconContainer_last`}).append($('<div/>',{class:`orderActivity_icon bgc_white-1 cardLoading h20 w20 br50p`})),
            $('<div/>',{class:`orderActivity_right`}).append(
                $('<div/>',{class:'cardLoading w300 h10 br5 mT5'}),
            ),
        ),
    )
}
drawOrderActivities = function(activities){
    $('.order_popupPage_orderActivities').text('')
    for(const key in activities){
        let activity  = activities[key];
        let icon = '';
        let date = getDate(activity.created_at).date.restaurant;
        let time = getDate(activity.created_at).time.restaurant;
        let delivery;let account; let user;
        let seeChanges = '';
        let text = texts.orders[activity.code]
        if(activity.user_id){
            user = activity.user_id == null ? texts.cpanel.public.aGuest : `<a class="popupPage popupId" popupPage="user" popupId="user" user="${activity.user_id}">${activity.user_name}</a>`;
            text = text.replace(':user:',user);
        }
        if(activity.account_id){
            account = `<a class="popupPage popupId" popupPage="sub_account" popupId="sub_account" subaccount="${activity.account_id}">${activity.account_name}</a>`;
            text = text.replace(':account:',account);
        }
        if(activity.delivery_id){
            delivery = `<a class="popupPage popupId" popupPage="delivery_account" popupId="delivery" delivery="${activity.delivery_id}">${activity.delivery_name.split('@')[0]}</a>`;
            text = text.replace(':delivery:',delivery);
        }
        switch(activity.code){
            case 'order.new_order_by_user':
                if(activity.user_id){
                    text = text.replace(':user:',user);
                }else{
                    text = text.replace(':user:',texts.cpanel.public.aGuest);
                }
                icon = 'ico-pending c_white-10'
            break;
            case 'order.canceled_by_user':
                icon = 'ico-no cR'
            break;
            case 'order.new_order_by_account':
                icon = 'ico-accepted cG'
            break;
            case 'order.accepted':
                icon = 'ico-accepted cG'
            break;
            case 'order.canceled_by_account':
                icon = 'ico-no cR'
            break;
            case 'order.ready_for_pickup':
                icon = 'ico-pickup cO'
            break;
            case 'order.picked_up':
                icon = 'ico-pickup cG'
            break;
            case 'order.out_for_delivery':
                icon = 'ico-delivery cO'
            break;
            case 'order.to_delivery_man':
                icon = 'ico-delivery cO'
            break;
            case 'order.delivered_by_account':
                icon = 'ico-delivery cG'
            break;
            case 'order.delivered_by_delivery':
                icon = 'ico-delivery cG'
            break;
            case 'order.diningin':
                icon = 'ico-dineIn cO'
            break;
            case 'order.dinedin':
                icon = 'ico-dineIn cG'
            break;
            case 'order.update.notice':
                icon = 'ico-description c_white-10';
                seeChanges = $('<a/>',{class:'order-seeChanges order-seeChanges-orderNotice',activity:activity._id,text:texts.orders.seeChanges})
            break;
            case 'order.update.phoneNumber':
                icon = 'ico-phone_number c_white-10';
                text = text.replace(':old_phone:',`<span class="cR">${activity.old_phoneNumber}</span>`).replace(':new_phone:',`<span class="cB">${activity.new_phoneNumber}</span>`)
            break;
            case 'order.update.address':
                icon = 'ico-gps c_white-10';
                seeChanges = $('<a/>',{class:'order-seeChanges order-seeChanges-address',activity:activity._id,text:texts.orders.seeChanges})
            break;
            case 'order.update.type':
                icon = activity.new_type == 0 ? 'ico-delivery c_delivery' : activity.new_type == 1 ? 'ico-pickup c_pickup' : activity.new_type == 2  ? 'ico-dineIn c_dineIn' : null;
                text = text.replace(':new_type:',`<span class="${activity.new_type == 0 ? 'c_delivery' : activity.new_type == 1 ? 'c_pickup' : activity.new_type == 2  ? 'c_dineIn' : ''}">${texts.orders[`type_${activity.new_type}`]}</span>`)
                text = text.replace(':old_type:',`<span class="${activity.old_type == 0 ? 'c_delivery' : activity.old_type == 1 ? 'c_pickup' : activity.old_type == 2  ? 'c_dineIn' : ''}">${texts.orders[`type_${activity.old_type}`]}</span>`)
            break;
            case 'order.update.discount':
                icon = 'ico-percent c_white-10';
                text = text.replace(':old_discount:',`<span class="cR">${bigFloat(activity.old_discount)}%</span>`).replace(':new_discount:',`<span class="cB">${bigFloat(activity.new_discount)}%</span>`)
            break;
            case 'order.update.deliveryCost':
                icon = 'ico-delivery c_white-10';
                text = text.replace(':old_DeliveryCost:',`<span class="cR">${website.currency}${bigFloat(activity.old_DeliveryCost)}</span>`).replace(':new_deliveryCost:',`<span class="cB">${website.currency}${bigFloat(activity.new_deliveryCost)}</span>`)
            break;
            case 'order.update.addItem':
                icon = 'ico-products cG';
                text = text.replace(':qty:',activity.new_qty).replace(':product:',`<a class="popupPage popupId" product="${activity.product_name}" popupPage="product" popupId="product">${activity.product_name}</a>`)
            break;
            case 'order.update.removeItem':
                icon = 'ico-products cR';
                text = text.replace(':product:',`<a class="popupPage popupId" product="${activity.product_name}" popupPage="product" popupId="product">${activity.product_name}</a>`)
            break;
            case 'order.update.itemNotice':
                icon = 'ico-description c_white-10';
                text = text.replace(':product:',`<a class="popupPage popupId" product="${activity.product_name}" popupPage="product" popupId="product">${activity.product_name}</a>`)
                seeChanges = $('<a/>',{class:'order-seeChanges order-seeChanges-itemNotice',activity:activity._id,text:texts.orders.seeChanges})
            break;
            case 'order.update.qty':
                icon = 'ico-products c_white-10';
                text = text.replace(':product:',`<a class="popupPage popupId" product="${activity.product_name}" popupPage="product" popupId="product">${activity.product_name}</a>`).replace(':old_qty:',`<span class="cR">${activity.old_qty}</span>`).replace(':new_qty:',`<span class="cB">${activity.new_qty}</span>`)
            break;
            case 'order.update.selection':
                icon = 'ico-list c_white-10';
                text = text.replace(':product:',`<a class="popupPage popupId" product="${activity.product_name}" popupPage="product" popupId="product">${activity.product_name}</a>`)
                .replace(':option:',`<span class="bold">${activity.option_name}</span>`)
                .replace(':old_selection:',`<span class="cR">${activity.old_selection}</span>`)
                .replace(':new_selection:',`<span class="cB">${activity.new_selection}</span>`)
            break;
        }
        $('.order_popupPage_orderActivities').append(
            $('<div/>',{class:'orderActivity_container'}).append(
                $('<div/>',{class:`orderActivity_left`}).append(
                    $('<div/>',{class:'fs09',text:time}),
                    $('<div/>',{class:'fs08 c_white-9',text:date}),
                ),
                $('<div/>',{class:`orderActivity_iconContainer ${key == activities.length - 1 ? 'orderActivity_iconContainer_last' : ''}`}).append($('<div/>',{class:`orderActivity_icon ${icon}`})),
                $('<div/>',{class:`orderActivity_right`}).append(
                    $('<div/>',{html:text}),
                    seeChanges,
                ),
            )
        )
    }
}
//
