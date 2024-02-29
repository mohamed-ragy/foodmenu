$('html,body').on('click','#cancel_subscription_btn',function(e){
    showBtnLoading($('#cancel_subscription_btn'))
    e.stopImmediatePropagation();
    $.ajax({
        url:'/api',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            cancel_subscription:true,
            password:$('#cancel_subscription_password').val(),
        },success:function(r){
            if(r.cancelSubscriptionStatus == 1){
                window.location.href = `/${lang}/payment/cancel_subscription`
            }else if(r.cancelSubscriptionStatus == 0){
                hideBtnLoading($('#cancel_subscription_btn'))
                $('.cancelSubscriptionMessage').addClass('cR').text(r.msg)
                $('#cancel_subscription_password').val('').select()
            }else if(r.cancelSubscriptionStatus == 2){
                $('.popupBody').text('').append(
                    $('<div/>',{class:'cR fs101 m5 bold',text:r.msg})
                )
                $('.popupClose').addClass('none')
                $('#popupHeadTitle').text(texts.wrongPassword)
                setTimeout(()=>{
                    window.location.href = process.env.MIX_CPANEL_URL;
                },30000)
            }
        }
    }).fail(function(r){
        hideBtnLoading($('#cancel_subscription_btn'))
        $('.cancelSubscriptionMessage').addClass('cR').text(r.responseJSON.message)

    })
})
