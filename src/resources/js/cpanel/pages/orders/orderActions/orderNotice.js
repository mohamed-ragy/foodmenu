$('body').on('click','.changeOrderNoticeEditBtn',function(e){
    $('.changeOrderNotice').select()
})
$('body').on('focus click input change','.changeOrderNotice',function(e){
    getOrder(window.history.state.order).then(function(order){
        if(order.notice != $('.changeOrderNotice').val()){
            $('.orderNoticeNoSave').removeClass('none')
            $('.changeOrderNoticeBtns').removeClass('none')
        }else{
            $('.orderNoticeNoSave').addClass('none')
            $('.changeOrderNoticeBtns').addClass('none')
        }
    })
})
$('body').on('click','.cancelChangeOrderNoticeBtn',function(e){
    getOrder(window.history.state.order).then(function(order){
        $('.changeOrderNotice').val(order.notice)
        $('.orderNoticeNoSave').addClass('none')
        $('.changeOrderNoticeBtns').addClass('none')
    })
})
$('body').on('click','.changeOrderNoticeBtn',function(e){
    if(!coolDownChecker()){return;}
    if(!confirmBtn($(this),e.pageX,e.pageY)){return;}
    showBtnLoading($('.changeOrderNoticeBtn'))
    let newNotice = $('.changeOrderNotice').val();
    $.ajax({
        url:'orders',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            changeOrderNotice:true,
            order_id:window.history.state.order,
            newNotice:newNotice
        },success:function(r){
            hideBtnLoading($('.changeOrderNoticeBtn'))
            if(r.changeOrderNoticeStatus == 1){
                showAlert('success',r.msg,4000,true)
                website.incompleteOrders.find(item=>item._id == window.history.state.order).notice = newNotice;
                website.incompleteOrders.find(item=>item._id == window.history.state.order).noticeEdit_account_id = account.id;
                website.incompleteOrders.find(item=>item._id == window.history.state.order).noticeEdit_account_name = account.name;
                if(window.history.state.popupPage == 'order'){
                    drawPopupPage_order_fillData(window.history.state.order)
                }
            }else if(r.changeOrderNoticeStatus == 1){
                showAlert('error',r.msg,4000,true)
            }
        }
    })
})
