$(document).ready(()=>{
    if(loginCheck){
        window.cart = JSON.parse(user.cart);
        Object.keys(window.cart).length == 0 ? $('.cartItemsNumber').addClass('none') : $('.cartItemsNumber').text(Object.keys(window.cart).length).removeClass('none')
    }else{
        if(typeof Cookies.get('cart') !== 'undefined'){
            window.cart = JSON.parse(Cookies.get('cart'));
            Object.keys(window.cart).length == 0 ? $('.cartItemsNumber').addClass('none') : $('.cartItemsNumber').text(Object.keys(window.cart).length).removeClass('none')
        }else{
            window.cart = {};
            setCart();
            window.cart = JSON.parse(Cookies.get('cart'));
        }
    }
    $('.cartItemsNumber').text(Object.keys(window.cart).length)
    drawCart();
    for(const key in window.cart){
        let product = products.find(elem => elem.id == window.cart[key].productId);
        if(product === 'undefined'){
            window.cart.splice(key,1);
        }
    }
})
setCart = function(callback = function(){}){
    if(loginCheck){
        $.ajax({
            url:'/website/order',
            type:'post',
            data:{
                _token:$('meta[name="cstf-token"]').attr('content'),
                setCart:JSON.stringify(window.cart),
            },success:function(){
                callback();
                $('.cartItemsNumber').text(Object.keys(window.cart).length)
                Object.keys(window.cart).length == 0 ? $('.cartItemsNumber').addClass('none') : $('.cartItemsNumber').text(Object.keys(window.cart).length).removeClass('none')
                drawCart();
            }
        })

    }else{
        Cookies.remove('cart')
        Cookies.set('cart', JSON.stringify(window.cart), { expires: website.cart_lifeTime / 1440 });
        callback();
        Object.keys(window.cart).length == 0 ? $('.cartItemsNumber').addClass('none') : $('.cartItemsNumber').text(Object.keys(window.cart).length).removeClass('none')
        drawCart();
    }

}
drawCart = function(){
    $('#cartItemsContainer').text('');
    if(Object.keys(window.cart).length == 0){
        $('.cartPlaceOrderBtn').addClass('none');
        $('#cartItemsContainer').text(texts.orders.cartEmpty)
    }else{
        $('.cartPlaceOrderBtn').removeClass('none');
        for(const key in window.cart){
            cartItem = window.cart[key];
            drawCartItem(cartItem,key)
        }
        $('#cartTotal').text(website.currency+calcCartTotal())
    }


}
calcCartTotal = function(){
    let cartTotal = 0;
        //3azma ba2a --change selection in cart
    for(const key in window.cart){
        let itemTotal = 0;
        let item = window.cart[key];
        let product = null;
        product = products.find(elem => elem.id == item.productId);
        if(product != null && product.availability == true){
            itemTotal = parseFloat(product.price);
            for(const key in item.itemOptions){
                let option = null;
                option = product.product_options.find(elem => elem.id == item.itemOptions[key].optionId)
                if(option != null){
                    let selection = null;
                    selection = option.product_option_selections.find(elem => elem.id == item.itemOptions[key].selectionId)
                    if(selection != null){
                        itemTotal = itemTotal + parseFloat(selection.price);
                    }
                }
            }

        }
        cartTotal = cartTotal + (itemTotal * item.qty);
    }
    return cartTotal.toFixed(2);
}

$('html, body').on('click','.cart',function(e){
    e.stopImmediatePropagation();
    var status = {
        'status' :'user_checkingCart',
    };
    userStatus(status)
    showPopup($('#cart-popup'))
})
$('html, body').on('click','.cartItemRemove',function(e){
    e.stopImmediatePropagation();
    showLoading($('#cart-Loading'))
    delete window.cart[$(this).attr('itemId')];
    setCart(function(){
        hideLoading($('#cart-Loading'))
    })
})
$('html, body').on('click','.cartItemQtyPlus',function(e){
    e.stopImmediatePropagation();
    let product = null;
    let item = window.cart[$(this).attr('itemId')];
    product = products.find(elem => elem.id == item.productId);
    if(product == null || product.availability == false){return;}
    showLoading($('#cart-Loading'))
    window.cart[$(this).attr('itemId')].qty = parseInt(window.cart[$(this).attr('itemId')].qty) + 1;
    setCart(function(){
        hideLoading($('#cart-Loading'))
    });
})
$('html, body').on('click','.cartItemQtyMinus',function(e){
    e.stopImmediatePropagation();
    let product = null;
    let item = window.cart[$(this).attr('itemId')];
    product = products.find(elem => elem.id == item.productId);
    if(product == null || product.availability == false){return;}
    if(window.cart[$(this).attr('itemId')].qty == 1){return;}

    showLoading($('#cart-Loading'))
    window.cart[$(this).attr('itemId')].qty = parseInt(window.cart[$(this).attr('itemId')].qty) - 1;
    setCart(function(){
        hideLoading($('#cart-Loading'))
    });
})
$('html, body').on('click','.cartItemSelection',function(e){
    e.stopImmediatePropagation();
    $('.cart-changeSelection').addClass('none')
    $('.cart-changeSelection').text('')
    let product = null;
    let item = window.cart[$(this).attr('itemId')];
    product = products.find(elem => elem.id == item.productId);
    if(product == null || product.availability == false){return;}
    $('.tooltipPopup').addClass('none');
    let option = null;
    option = product.product_options.find(elem => elem.id == $(this).attr('optionId'))
    if(option == null){return;}
    for(const key in option.product_option_selections){
        let selection = option.product_option_selections[key];
        let selectionName = selection.name;
        if(selection['name_'+lang] != null && selection['name_'+lang] != ''){
            selectionName = selection['name_'+lang];
        }
        $('.cart-changeSelection').append(
            $('<div/>',{
                class:'cartChangeSelectionSelection',
                itemId:$(this).attr('itemId'),
                optionId:$(this).attr('optionId'),
                selectionId:selection.id,
                text:selectionName,
            })
        );
    }

    // if(e.pageY < ($(window).height()/2)){
        $('.cart-changeSelection').css({
            'top':$(this).offset().top ,
            'left':$(this).offset().left,
        }).removeClass('none');
    // }else if(e.pageY > ($(window).height()/2)){
    //     $('.cart-changeSelection').css({
    //         'top':$(this).offset().top ,
    //         'left':$(this).offset().left,
    //     }).removeClass('none');
    // }
})
$(document).on('click',function(){
    $('.cart-changeSelection').text('')
    $('.cart-changeSelection').addClass('none');
})
$('.cart-changeSelection').on('mouseleave',function(){
    $('.cart-changeSelection').text('');
    $('.cart-changeSelection').addClass('none');
})
$('html, body').on('click','.cartChangeSelectionSelection',function(e){
    e.stopImmediatePropagation();
    if(window.cart[$(this).attr('itemId')].itemOptions.find(elem => elem.optionId == $(this).attr('optionId')).selectionId == $(this).attr('selectionId')){
        $('.cart-changeSelection').text('');
        $('.cart-changeSelection').addClass('none');
        return;
    }
    showLoading($('#cart-Loading'))
    window.cart[$(this).attr('itemId')].itemOptions.find(elem => elem.optionId == $(this).attr('optionId')).selectionId = $(this).attr('selectionId')
    $('.cart-changeSelection').text('');
    $('.cart-changeSelection').addClass('none');
    setCart(function(){
        hideLoading($('#cart-Loading'))
    });
})
$('html, body').on('click','.cartItemNoticeEdit',function(e){
    e.stopImmediatePropagation();
    $('.cartItemContainer[itemId="'+$(this).attr('itemId')+'"]').find('.cartItemNotice').select();
})
$('html, body').on('focus mouseenter','.cartItemNotice',function(e){
    $(this).attr('readonly',false);

});
$('html, body').on('focusout','.cartItemNotice',function(e){
    e.stopImmediatePropagation();
    $(this).attr('readonly',true);
    if(window.cart[$(this).attr('itemId')].itemNotice != $(this).val()){
        window.cart[$(this).attr('itemId')].itemNotice = $(this).val();
        showLoading($('#cart-Loading'))
        setCart(function(){
            hideLoading($('#cart-Loading'))
        });
    }
})
$('html, body').on('keypress','.cartItemNotice',function(e){
    if(e.which == 13){
        $(this).trigger('focusout')
    }
});
$('.cartPlaceOrderBtn').on('mouseenter',function(e){
    // e.stopImmediatePropagation();
    $('.cartItemNotice').each(function(){
        if($(this).is(':focus')){
            $(this).trigger('focusout');
        }
    })
})
$('.cartPlaceOrderBtn').on('click',function(){
    if(calcCartTotal() == 0){return;}
    if(!loginCheck && !website.guestOrders){
        window.loginWithCart = true;
        showPopup($('#login-popup'),$('#login-email'),function(){
            $('#loginWarning').text(texts.orders.loginToOrder);
            $('#loginWarning').removeClass('vH')
        })
    }else{
        showPopup($('#placeOrder-popup'),null,function(){
            var status = {
                'status': 'user_placeOrder',
            }
            userStatus(status);
            placeOrderPopupReset();
        })
    }
})
