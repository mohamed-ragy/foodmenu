$('html,body').on('click','.changeOrderPhoneNumberEditBtn',function(e){
    e.stopImmediatePropagation();
    $('.changeOrderPhoneNumber').select()
})
$('html,body').on('focus click input change','.changeOrderPhoneNumber',function(e){
    e.stopImmediatePropagation();
    getOrder(window.history.state.order).then(function(order){
        if(order.phoneNumber != $('.changeOrderPhoneNumber').val()){
            $('.orderPhoneNumbereNoSave').removeClass('none')
            $('.changeOrderPhoneNumberBtns').removeClass('none')
        }else{
            $('.orderPhoneNumbereNoSave').addClass('none')
            $('.changeOrderPhoneNumberBtns').addClass('none')
        }
    })
})
$('html,body').on('click','.cancelChangeOrderPhoneNumberBtn',function(e){
    e.stopImmediatePropagation();
    getOrder(window.history.state.order).then(function(order){
        $('.changeOrderPhoneNumber').val(order.phoneNumber)
        $('.orderPhoneNumbereNoSave').addClass('none')
        $('.changeOrderPhoneNumberBtns').addClass('none')
    })
})
$('html,body').on('click','.changeOrderPhoneNumberBtn',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    if(!confirmBtn($(this),e.pageX,e.pageY)){return;}
    showBtnLoading($('.changeOrderPhoneNumberBtn'))
    let phoneNumber = $('.changeOrderPhoneNumber').val();
    $.ajax({
        url:'orders',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            changePhoneNumber:true,
            order_id:window.history.state.order,
            phoneNumber:phoneNumber
        },success:function(r){
            hideBtnLoading($('.changeOrderPhoneNumberBtn'))
            if(r.changePhoneNumberStatus == 1){
                showAlert('success',r.msg,4000,true)
                website.incompleteOrders.find(item=>item._id == window.history.state.order).phoneNumber = phoneNumber;
                website.incompleteOrders.find(item=>item._id == window.history.state.order).phoneEdit_account_id = account.id;
                website.incompleteOrders.find(item=>item._id == window.history.state.order).phoneEdit_account_name = account.name;
                if(window.history.state.popupPage == 'order'){
                    drawPopupPage_order_fillData(window.history.state.order)
                }
            }else if(r.changePhoneNumberStatus == 1){
                showAlert('error',r.msg,4000,true)
            }
        }
    })
})
