
$('html, body').on('click','.trackOrder',function(e){
    e.stopImmediatePropagation();
    let orderId = $(this).attr('orderId');
    showPopup($('#trackOrder-popup'),$('#trackOrderNumber'),function(){
        $('#trackOrderNumber').val(orderId);
        $('#trackOrderBtn').trigger('click');
    })
})
$('#trackOrderNumber').on('input change',function(){
    $('#trackOrderNumber').val($('#trackOrderNumber').val().replace( /[^\d+() -]/, '' ));
})
$('#trackOrderNumber').on('keypress',function(e){
    if(e.which == 13){
        $('#trackOrderBtn').trigger('click');
    }
})
$('#trackOrderBtn').on('click',function(){
    if($('#trackOrderNumber').val() == ''){return;}

    $('.trackOrderContainer').addClass('none');
    $('.trackOrderWrongNumber').addClass('vH');
    orderId = $('#trackOrderNumber').val();
    var status = {
        'status': 'user_trackOrder',
        'order':orderId,
    }
    userStatus(status);
    if(orderId in window.orders){
        window.trackingOrder = orderId;
        drawTrackOrder(window.orders[orderId])
    }else{
        showLoading($('#trackOrder-Loading'))
        $.ajax({
            url:'/website/order',
            type:'post',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                trackOrder:orderId,
            },success:function(response){
                hideLoading($('#trackOrder-Loading'))
                if(response.trackOrderStatus == 1){
                    window.orders[response.order.id] = response.order;
                    window.trackingOrder = response.order.id;
                    drawTrackOrder(window.orders[response.order.id])
                }else if(response.trackOrderStatus == 0){
                    $('.trackOrderWrongNumber').removeClass('vH');
                }
            }
        })
    }
})
$('html, body').on('click','.cancelOrderBtn',function(e){
    e.stopImmediatePropagation();
    let orderId = $(this).attr('orderId');
    $.ajax({
        url:'/website/order',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            cancelOrder:orderId,
        },success:function(response){
            if(response.cancelOrderStatus == 1){
                window.orders[response.order.id] = response.order;
                $('#trackOrderNumber').val(orderId);
                $('#trackOrderBtn').trigger('click');
            }
        }
    })
})
$('html, body').on('click','.orderAgainBtn',function(e){
    e.stopImmediatePropagation();
    let order = window.orders[$(this).attr('orderId')];
    window.cart = {};
    for(const key in order.order_items){
        let item = order.order_items[key];
        let productCheck = products.find(elem => elem.id == item.product_id);

        if(typeof(productCheck) !== 'undefined'){
            let itemId = '';
            let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
            for(let i = 0;i<=15;i++){
                itemId = itemId+ chars[Math.floor(Math.random() * chars.length)]
            }
            window.cart[itemId] = {
                productId:item.product_id,
                itemOptions:[],
                qty:item.qty,
                itemNotice:'',
            }
            for(const key in item.order_item_option_selections){
                option = item.order_item_option_selections[key];
                window.cart[itemId].itemOptions.push({
                    optionId:option.product_option_id,
                    selectionId:option.product_option_selection_id,
                })
            }
        }
    }
    setCart(function(){
        $('.cart').trigger('click');

    })
})
$('html, body').on('click','.orderToChat',function(e){
    e.stopImmediatePropagation();
    showLiveChatWindow();
    $('#liveChatmsgInput').val('o@'+$(this).attr('orderId'));
    $("#liveChatmsgBtn").trigger('click');
    hidePopup();
})
