$('html,body').on('click','.set_Default_payment_method',function(e){
    e.stopImmediatePropagation();
    if(window.website.subscription_status == 'canceled' || window.website.subscription_status == 'incomplete_expired'){return;}
    $('.set_Default_payment_method').removeClass('ico-check0').addClass('loading_s vV mA');
    let paymentMethod_id = $(this).closest('.paymentMethodContainer').attr('paymentMethod_id');
    $.ajax({
        url:'/api',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            setPaymentMethodDefault:paymentMethod_id,
        },success:function(r){
            for(const key in window.website.paymentMethods){
                if(window.website.paymentMethods[key].id == paymentMethod_id){
                    window.website.paymentMethods[key].is_default = 1;
                }else{
                    window.website.paymentMethods[key].is_default = 0;
                }
            }
            draw_payment_methods();
        }
    })
})

$('html,body').on('click','#delete_payment_method_confirm',function(e){
    e.stopImmediatePropagation();
    showBtnLoading($('#delete_payment_method_confirm'))
    let paymentMethod_id = $(this).attr('paymentMethod_id');
    $.ajax({
        url:'/api',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            deletePaymentMethod:paymentMethod_id,
        },success:function(r){
            hideBtnLoading($('#delete_payment_method_confirm'))
            closePopup();
            for(const key in window.website.paymentMethods){
                if(window.website.paymentMethods[key].id == paymentMethod_id){
                    delete window.website.paymentMethods[key];
                }
            }
            draw_payment_methods();
        }
    })
})
