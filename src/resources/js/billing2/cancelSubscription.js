$('#cancelSubscriptionBtn').on('click',function(e){
    showBtnLoading($('#cancelSubscriptionBtn'))
    e.stopImmediatePropagation();
    $.ajax({
        url:'/api',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            cancelSubscription:true,
        },success:function(r){
            // hideBtnLoading($('#cancelSubscriptionBtn'))
            if(r.cancelSubscriptionStatus == 1){
                window.location.href = `/${lang}/payment/cancelSubscription`
            }
        }
    }).fail(function(r){
        // hideBtnLoading($('#cancelSubscriptionBtn'))
        $('.cancelSubscriptionMessage').addClass('cR').text(r.responseJSON.message)

    })
})
