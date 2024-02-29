drawRequestRefund = function(){
    $('.popupPage[page="refund"]').text('').append(
        $('<div/>',{class:'',html:texts.refundConfirmMsg.replace(':balance:',(parseFloat(data.balance/100).toFixed(2)))}),
        $('<div/>',{class:'row alnC jstfyE w100p mT40'}).append(
            $('<button/>',{class:'btn btn-cancel popupClose',text:texts.cancel}),
            $('<button/>',{class:'btn',id:'refundConfirm'}).append(
                $('<div/>',{class:'btnTxt',text:texts.refund}),
                $('<div/>',{class:'btnLoading'})
            )
        )
    )
}

$('html,body').on('click','#refundConfirm',function(e){
    e.stopImmediatePropagation();
    showBtnLoading($('#refundConfirm'))
    $.ajax({
        url:'/api',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            refund:true,
        },success:function(r){
            console.log(r)
            let amount_refunded = 0;
            for(const key in r.refunds){
                if(r.refunds[key].status == 'succeeded' || r.refunds[key].status == 'pending'){
                    amount_refunded = amount_refunded + r.refunds[key].amount
                }
            }
            data.balance = data.balance - amount_refunded;
            drawBalance();
            $('.popupPage[page="refund"]').text('').append(
                $('<div/>',{class:'m10 fs101 mxw500',html:texts.refundedMsg.replace(':balance:',parseFloat(amount_refunded/100).toFixed(2))}),
                $('<div/>',{class:'row alnC jstfyE w100p mT40'}).append(
                    $('<button/>',{class:'btn btn-cancel popupClose',text:texts.gotit}),
                )
            )
        }
    })
})
