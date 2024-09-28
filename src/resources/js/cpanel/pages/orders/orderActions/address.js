$('body').on('click','.changeOrderAdressEditBtn',function(e){
    $('.changeOrderAdress').select()
})
$('body').on('focus click input change','.changeOrderAdress',function(e){
    getOrder(window.history.state.order).then(function(order){
        if(order.address != $('.changeOrderAdress').val()){
            $('.orderAdressNoSave').removeClass('none')
            $('.changeOrderAdressBtns').removeClass('none')
        }else{
            $('.orderAdressNoSave').addClass('none')
            $('.changeOrderAdressBtns').addClass('none')
        }
    })
})
$('body').on('click','.cancelChangeOrderAdressBtn',function(e){
    getOrder(window.history.state.order).then(function(order){
        $('.changeOrderAdress').val(order.address)
        $('.orderAdressNoSave').addClass('none')
        $('.changeOrderAdressBtns').addClass('none')
    })
})
$('body').on('click','.changeOrderAdressBtn',function(e){
    if(!coolDownChecker()){return;}
    if(!confirmBtn($(this),e.pageX,e.pageY)){return;}
    showBtnLoading($('.changeOrderAdressBtn'))
    let address = $('.changeOrderAdress').val();
    $.ajax({
        url:'orders',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            changeAddress:true,
            order_id:window.history.state.order,
            address:address
        },success:function(r){
            hideBtnLoading($('.changeOrderAdressBtn'))
            if(r.changeAddressStatus == 1){
                showAlert('success',r.msg,4000,true)
                website.incompleteOrders.find(item=>item._id == window.history.state.order).address = address;
                website.incompleteOrders.find(item=>item._id == window.history.state.order).addressEdit_account_id = account.id;
                website.incompleteOrders.find(item=>item._id == window.history.state.order).addressEdit_account_name = account.name;
                if(window.history.state.popupPage == 'order'){
                    drawPopupPage_order_fillData(window.history.state.order)
                }
            }else if(r.changeAddressStatus == 1){
                showAlert('error',r.msg,4000,true)
            }
        }
    })
})
