
require('./placeNewOrder/details_events.js')
require('./placeNewOrder/details_functions.js')
//
require('./placeNewOrder/items_events.js')
require('./placeNewOrder/items_functions.js')
//
require('./placeNewOrder/check_functions.js')
require('./placeNewOrder/check_events.js')
//
require('./placeNewOrder/load.js')
require('./placeNewOrder/reset.js')
//

$('html,body').on('click','#placeOrder-cancelBtn',function(e){
    e.stopImmediatePropagation();
    window.placeOrder = {
        isGuest:false,
        user_id:null,
        userName:null,
        phoneNumber:'',
        address:'',
        lat:'0',
        lng:'0',
        type:'2',
        notice:'',
        paymentMethod:null,
        items:[],
        deliveryCost:parseFloat(website.deliveryCost),
        discount:0,
    }
    popupPageClose(true)

})
//
$('html,body').on('click','#placeOrder-btn',function(e){
    e.stopImmediatePropagation();

    if(!window.placeOrder.isGuest && window.placeOrder.user_id == null ||  !window.placeOrder.isGuest && window.placeOrder.userName == null ){
        showAlert('error',texts.orders.placeOrderErrorSelectUser,4000,true);
        $('.popupPageTab[tab="order_details"]').trigger('click');
        inputListError($('#placeOrder-usersInputList'));
        return;
    }
    if(
        window.placeOrder.type == '0' && window.placeOrder.phoneNumber == '' ||
        window.placeOrder.type == '1' && window.placeOrder.phoneNumber == '' ||
        window.placeOrder.type == '2' && window.placeOrder.phoneNumber == ''

    ){
        showAlert('error',texts.orders.placeOrderErrorPhoneNumberRequired,4000,true);
        $('.popupPageTab[tab="order_details"]').trigger('click');
        inputTextError($('#placeOrder-phoneNumber'));
        return;
    }
    if(window.placeOrder.type == '0' && window.placeOrder.address == ''){
        showAlert('error',texts.orders.placeOrderErrorAddressRequired,4000,true);
        $('.popupPageTab[tab="order_details"]').trigger('click');
        inputTextError($('#placeOrder-address'));
        return;
    }
    if(window.placeOrder.items.length == 0){
        $('.popupPageTab[tab="order_items"]').trigger('click');
        showAlert('error',texts.orders.placeOrderErrorNoItems,4000,true)
        return;
    }

    if(!coolDownChecker()){return;}
    if(!confirmBtn($(this),e.pageX,e.pageY)){return;}
    showBtnLoading($('#placeOrder-btn'))
    $.ajax({
        url:'orders',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            placeNewOrder:true,

            isGuest:window.placeOrder.isGuest,
            user_id:window.placeOrder.user_id,
            userName:window.placeOrder.userName,
            phoneNumber:window.placeOrder.phoneNumber,
            address:window.placeOrder.address,
            lat:window.placeOrder.lat,
            lng:window.placeOrder.lng,

            orderType:window.placeOrder.type,
            orderNotice:window.placeOrder.notice,
            paymentMethod:window.placeOrder.paymentMethod,

            deliveryCost:window.placeOrder.deliveryCost,
            discount:window.placeOrder.discount,
            orderItems:window.placeOrder.items,

        },success:function(r){
            hideBtnLoading($('#placeOrder-btn'))
            if(r.placeOrderStat == 1){
                website.incompleteOrders.push(r.order);
                //add Order to incomplete orders table
                if(window.history.state.page == 'incomplete_orders'){
                    drawIncompleteOrdersTable(window.history.state.tab ?? 'all_orders',window.history.state.order_by ?? 'placed_at',window.history.state.sort ?? 'desc');
                }
                popupPageClose(true)
                window.placeOrder = {
                    isGuest:false,
                    user_id:null,
                    userName:null,
                    phoneNumber:'',
                    address:'',
                    lat:'0',
                    lng:'0',
                    type:'2',
                    notice:'',
                    paymentMethod:null,
                    items:[],
                    deliveryCost:parseFloat(website.deliveryCost),
                    discount:0,
                }
                showAlert('success',r.msg,4000,true);
            }else if(r.placeOrderStat == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })
})


//
