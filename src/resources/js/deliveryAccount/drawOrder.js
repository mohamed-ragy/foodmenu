drawOrder = function(order){
    console.log(order)
    let orderNoticeClass = '';
    order.notice == '' || order.notice == null ? orderNoticeClass = 'none' : null ;
    let userName = texts.guest;
    !order.isGuest ? userName = order.userName : null;
    let mapBtnClass = ''
    if(order.lat == 0 && order.lng == 0 ){mapBtnClass = 'none'}
    $('#ordersContainer').append(
        $('<div/>',{class:'orderContainer'}).append(
            $('<div/>',{text:`#${order.id}`,class:'bold fs101 pY5'}),
            $('<div/>',{class:'orderRow'}).append(
                $('<div/>',{class:'orderRowStart',text:`${texts.customer}`}),
                $('<div/>',{class:'mis-5',text:userName})
            ),
            $('<div/>',{class:'orderRow'}).append(
                $('<div/>',{class:'orderRowStart',text:`${texts.phoneNumber}`}),
                $('<a/>',{class:'mis-5 call',phoneNumber:order.phoneNumber,text:order.phoneNumber})
            ),
            $('<div/>',{class:'orderRow'}).append(
                $('<div/>',{class:'orderRowStart',text:`${texts.address}`}),
                $('<div/>',{class:'mis-5 row alnC jstfyC'}).append(
                    $('<button/>',{class:`btn ico-gps showMapBtn ${mapBtnClass}`,lat:order.lat,lng:order.lng}),
                    $('<div/>',{text:order.address})

                )
            ),
            $('<div/>',{class:'orderRow'}).append(
                $('<div/>',{class:'orderRowStart',text:`${texts.paymentMethod}`}),
                $('<div/>',{class:'mis-5',text:texts[order.paymentMethod]})
            ),
            $('<div/>',{class:'orderRow'}).append(
                $('<div/>',{class:'orderRowStart',text:`${texts.orderTotal}`}),
                $('<div/>',{class:'mis-5',text:window.currency+parseFloat(order.total).toFixed(2)})
            ),
            $('<div/>',{class:`orderRow orderCol ${orderNoticeClass}`}).append(
                $('<div/>',{class:'orderRowStart orderColStart',text:`${texts.orderNotice}`}),
                $('<div/>',{class:'mis-5',text:order.notice})
            ),
            $('<div/>',{class:'btnContainer column alnE jstfyE'}).append(
                $('<div/>',{class:'bold vH confirmTxt',text:'--'}),
                $('<button/>',{class:'btn delivered',text:texts.delivered,orderId:order.id}).append(
                    $('<div>',{class:'btnTxt'}),
                    $('<div>',{class:'btnLoading'})
                )
            )
        )
    )
}

$('html,body').on('click',function(){
    $('.delivered').removeClass('confirm-btn');
    $('.delivered').parent().find('.confirmTxt').removeClass().addClass('bold vH confirmTxt').text('--');
})

$('html,body').on('click','.delivered',function(e){
    e.stopImmediatePropagation();
    let thisBtn = $(this);
    if(!thisBtn.hasClass('confirm-btn')){
        thisBtn.addClass('confirm-btn');
        thisBtn.parent().find('.confirmTxt').removeClass().addClass('cO bold confirmTxt').text(texts.confirm);
        return;
    }
    thisBtn.removeClass('confirm-btn');
    thisBtn.parent().find('.confirmTxt').removeClass().addClass('bold vH confirmTxt').text('--');
    showBtnLoading(thisBtn)
    let orderId = $(this).attr('orderId')
    $.ajax({
        url:'/orders',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            orderDelivered:orderId
        },success:function(r){
            hideBtnLoading(thisBtn)
            if(r.orderDeliveredStatus == 1){
                thisBtn.closest('.orderContainer').addClass('bgc-c3')
                thisBtn.parent().text('').append(
                    $('<div/>',{class:'cG bold fs101',text:r.msg})
                )
            }else if(r.orderDeliveredStatus == 0){
                thisBtn.parent().find('.confirmTxt').removeClass().addClass('cR bold confirmTxt').text(r.msg);
            }
        }
    })

})


$('html,body').on('click','.call',function(e){
    e.stopImmediatePropagation();
    // window.open('tel:'+$(this).attr('phoneNumber'));
    window.open(`tel:${$(this).attr('phoneNumber')}`, '_self');
})
