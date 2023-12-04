drawPopupPage_place_new_order = function(){
    $('#popupPageTitle').append(
        $('<span/>',{class:'ellipsis',text:texts.cpanel.menu.place_new_order}),
        $('<span/>',{class:'ico-help help-icon',helpId:''})
    );
    $('#popupPageBody').text('').addClass('mxw100p-40 w500 p20').append(
        $('<div/>',{class:'popupPageTabs'}).append(
            $('<div/>',{class:'popupPageTabArrow popupPageTabArrowLeft ico-left'}),
            $('<div/>',{class:'popupPageTabsContainer'}).append(
                $('<div/>',{tab:'order_details',class:'popupPageTab popupPageTab_selected alnBL',text:texts.orders.order_details}),
                $('<div/>',{tab:'order_items',class:'popupPageTab alnBL',text:texts.orders.order_items}),
            ),
            $('<div/>',{class:'popupPageTabArrow popupPageTabArrowRight ico-right'}),
        ),
        $('<div/>',{class:'popupPageTabContainer popupPageTabContainer_selected',tab:'order_details'}).append(
            $('<div/>',{class:'column w100p alnS jstfyS brdrB1'}).append(
                $('<div/>',{class:'fs09 pY10 w100p bold',text:texts.orders.orderType}),
                $('<div/>',{class:'placeOrderDetailsElem placeOrderTypeElem',type:'2'}).append(
                    $('<div/>',{class:'row alnC jstfyS mie-10'}).append(
                        $('<div/>',{class:'ico-dineIn'}),
                        $('<div/>',{class:'fs09 mis-5',text:texts.orders.dineIn})
                    ),
                    $('<div/>',{class:'ico-check0 placeOrderTypeElemCheck'})
                ),
                $('<div/>',{class:'placeOrderDetailsElem placeOrderTypeElem',type:'1'}).append(
                    $('<div/>',{class:'row alnC jstfyS mie-10'}).append(
                        $('<div/>',{class:'ico-pickup'}),
                        $('<div/>',{class:'fs09 mis-5',text:texts.orders.pickup})
                    ),
                    $('<div/>',{class:'ico-check0 placeOrderTypeElemCheck'})
                ),
                $('<div/>',{class:'placeOrderDetailsElem placeOrderTypeElem',type:'0'}).append(
                    $('<div/>',{class:'row alnC jstfyS mie-10'}).append(
                        $('<div/>',{class:'ico-delivery'}),
                        $('<div/>',{class:'fs09 mis-5',text:texts.orders.delivery})
                    ),
                    $('<div/>',{class:'ico-check0 placeOrderTypeElemCheck'})
                ),
            ),
            $('<div/>',{class:'column w100p alnS jstfyS brdrB1 mT20 placeOrderPaymentMethodsContainer'}).append(
                $('<div/>',{class:'fs09 pY10 w100p bold',text:texts.orders.paymentMethod}),
                $('<div/>',{class:'placeOrderDetailsElem placeOrderPaymentMethodElem',method:'cash_on_delivery'}).append(
                    $('<div/>',{class:'row alnC jstfyS mie-10'}).append(
                        $('<div/>',{class:'ico-money'}),
                        $('<div/>',{class:'fs09 mis-5',text:texts.orders.cash_on_delivery})
                    ),
                    $('<div/>',{class:'ico-check0 placeOrderPaymentMethodElemCheck'})
                ),
                $('<div/>',{class:'placeOrderDetailsElem placeOrderPaymentMethodElem',method:'card_on_delivery'}).append(
                    $('<div/>',{class:'row alnC jstfyS mie-10'}).append(
                        $('<div/>',{class:'ico-card'}),
                        $('<div/>',{class:'fs09 mis-5',text:texts.orders.card_on_delivery})
                    ),
                    $('<div/>',{class:'ico-check0 placeOrderPaymentMethodElemCheck'})
                ),
                $('<div/>',{class:'placeOrderDetailsElem placeOrderPaymentMethodElem',method:'cash_at_restaurant'}).append(
                    $('<div/>',{class:'row alnC jstfyS mie-10'}).append(
                        $('<div/>',{class:'ico-money'}),
                        $('<div/>',{class:'fs09 mis-5',text:texts.orders.cash_at_restaurant})
                    ),
                    $('<div/>',{class:'ico-check0 placeOrderPaymentMethodElemCheck'})
                ),
                $('<div/>',{class:'placeOrderDetailsElem placeOrderPaymentMethodElem',method:'card_at_restaurant'}).append(
                    $('<div/>',{class:'row alnC jstfyS mie-10'}).append(
                        $('<div/>',{class:'ico-card'}),
                        $('<div/>',{class:'fs09 mis-5',text:texts.orders.card_at_restaurant})
                    ),
                    $('<div/>',{class:'ico-check0 placeOrderPaymentMethodElemCheck'})
                ),
            ),
            $('<div/>',{class:'column w100p alnS jstfyS mT20'}).append(
                $('<div/>',{class:'fs09 pY10 w100p bold',text:texts.orders.placeOrderFor}),
                $('<div/>',{class:'placeOrderDetailsElem placeOrderForElem',type:'user'}).append(
                    $('<div/>',{class:'row alnC jstfyS mie-10'}).append(
                        $('<div/>',{class:'ico-user'}),
                        $('<div/>',{class:'fs09 mis-5',text:texts.cpanel.public.user})
                    ),
                    $('<div/>',{class:'ico-check0 placeOrderForElemCheck'})
                ),
                $('<div/>',{class:'placeOrderDetailsElem placeOrderForElem brdrB1 mB10',type:'guest'}).append(
                    $('<div/>',{class:'row alnC jstfyS mie-10'}).append(
                        $('<div/>',{class:'ico-guest'}),
                        $('<div/>',{class:'fs09 mis-5',text:texts.cpanel.public.guest})
                    ),
                    $('<div/>',{class:'ico-check0 placeOrderForElemCheck'})
                ),
                drawInputList('','ico-users','',texts.users.findUser,'placeOrder-usersInputList',texts.users.findUserPlaceholder,250,'placeOrder-usersInputListList',false,'zx2000','findUserList','findUser'),
                drawInputText('','ico-phone_number','',texts.orders.phoneNumber,'placeOrder-phoneNumber','text',texts.orders.phoneNumber,'200','clearVal','','',false,''),
                drawInputText('','ico-address','',texts.orders.address,'placeOrder-address','text',texts.orders.address,'200','clearVal','inputTextContainer_100p','',false,''),
                $('<div/>',{class:'w100p h200 none',id:'placeOrder-userLocation'}),
                $('<div/>',{class:'w100p-20 mX10 mT5 row alnC jstfyE fs09'}).append($('<a/>',{id:'placeOrder-locationToggle',action:'show'})),
            ),
            $('<div/>',{class:'column w100p alnS jstfyS brdrB1 mT20'}).append(
                drawTextArea('','ico-description','',texts.orders.orderComment,'placeOrder-comment','1000','','','')
            )
        ),
        $('<div/>',{class:'popupPageTabContainer ',tab:'order_items'}).append(
            $('<div/>',{class:'btnContainer mY20'}).append($('<button/>',{class:'btn btn-cancel',id:'placeOrder-addItemBtn',text:texts.orders.addItem})),
            $('<div/>',{class:'brdrB1 mY30',id:'placeOrder-itemsContainer'}),
            $('<div/>',{class:'brdrB1 mY30',id:'placeOrder-receipt'}),
        ),
        $('<div/>',{class:'btnContainer mY20'}).append(
            $('<button/>',{class:'btn btn-cancel mie-10',id:'placeOrder-cancelBtn',text:texts.cpanel.public.cancel}),
            $('<button/>',{class:'btn',id:'placeOrder-btn'}).append(
                $('<div/>',{class:'btnLoading'}),
                $('<div/>',{class:'btnTxt',text:texts.orders.placeOrder})
            ),
        )
    )
    placeOrder_load();
}
