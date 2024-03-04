window.$ = require("jquery");
window.loadTouchEvents = require('jquery-touch-events');
loadTouchEvents($);
const stripe = Stripe('pk_test_51NV5sdIYxD8tIsOHZDYt4SyJYDtJtwOiVy9IFMJLSHXvo8DbuqAFTqP3PfCsfipnAsJnnhgseCQq6DqNRm08ri7L006J1AMtQz');
let params = new URLSearchParams(window.location.search)
require('../page_loading.js');
if(paymentType == 'add_payment_method'){
    if(params.get('setup_intent_client_secret') != null){
        stripe.retrieveSetupIntent(params.get('setup_intent_client_secret')).then(({setupIntent}) => {
            hide_page_loading();
            switch (setupIntent.status) {
                case 'succeeded': 
                    $('#message').addClass('msgBox_green').append(
                        $('<div/>',{class:'ico-success cG fs205 mB20'}),
                        $('<div/>',{text:texts.paymentMethodAdded})
                    )
                break;
                case 'processing': 
                    $('#message').addClass('msgBox_green').append(
                        $('<div/>',{class:'ico-success cG fs205 mB20'}),
                        $('<div/>',{text:texts.paymentMethodProcessing})
                    )
                break;
                case 'requires_payment_method': 
                    $('#message').addClass('msgBox_red').append(
                        $('<div/>',{class:'ico-no cR fs205 mB20'}),
                        $('<div/>',{text:texts.paymentMethodFailed})
                    )
                break;
                default:
                    $('#message').addClass('msgBox_red').append(
                        $('<div/>',{class:'ico-no cR fs205 mB20'}),
                        $('<div/>',{text:texts.unknownError})
                    )
                break;
            }
        });

    }
}else if(paymentType == 'retry_plan_payment'){
    if(params.get('payment_intent_client_secret') != null){
        stripe.retrievePaymentIntent(params.get('payment_intent_client_secret')).then(({paymentIntent}) => {
            hide_page_loading();
            const message = document.querySelector('#message')
            switch (paymentIntent.status) {
                case 'succeeded':
                    $('#message').addClass('msgBox_green').append(
                        $('<div/>',{class:'ico-success cG fs205 mB20'}),
                        $('<div/>',{text:texts.subscriptionActivated})
                    )
                break;
                case 'processing':
                    $('#message').addClass('msgBox_green').append(
                        $('<div/>',{class:'ico-success cG fs205 mB20'}),
                        $('<div/>',{text:texts.paymentMethodProcessing})
                    )
                break;
                case 'requires_payment_method':
                    $('#message').addClass('msgBox_red').append(
                        $('<div/>',{class:'ico-no cR fs205 mB20'}),
                        $('<div/>',{text:texts.paymentMethodFailed})
                    )
                break;
                default:
                    $('#message').addClass('msgBox_red').append(
                        $('<div/>',{class:'ico-no cR fs205 mB20'}),
                        $('<div/>',{text:texts.unknownError})
                    )
                break;
            }
          });
    }
}else if(paymentType == 'activate_plan'){
    if(params.get('payment_intent_client_secret') != null){
        stripe.retrievePaymentIntent(params.get('payment_intent_client_secret')).then(({paymentIntent}) => {
            hide_page_loading();
            const message = document.querySelector('#message')
            switch (paymentIntent.status) {
                case 'succeeded':
                    $('#message').addClass('msgBox_green').append(
                        $('<div/>',{class:'ico-success cG fs205 mB20'}),
                        $('<div/>',{text:texts.subscriptionActivated})
                    )
                break;
                case 'processing':
                    $('#message').addClass('msgBox_green').append(
                        $('<div/>',{class:'ico-success cG fs205 mB20'}),
                        $('<div/>',{text:texts.paymentMethodProcessing})
                    )
                break;
                case 'requires_payment_method':
                    $('#message').addClass('msgBox_red').append(
                        $('<div/>',{class:'ico-no cR fs205 mB20'}),
                        $('<div/>',{text:texts.paymentMethodFailed})
                    )
                break;
                default:
                    $('#message').addClass('msgBox_red').append(
                        $('<div/>',{class:'ico-no cR fs205 mB20'}),
                        $('<div/>',{text:texts.unknownError})
                    )
                break;
            }
          });
    }
}else if(paymentType == 'cancel_subscription'){
    checkSubscriptionStatus = function(){
        $.ajax({
            url:'/api',
            type:'post',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                checkSubscriptionStatus:true,
            },success:function(r){
                if( r.subscriptionStatus == 'canceled'){
                    hide_page_loading();
                    $('#message').addClass('msgBox_green').append(
                        $('<div/>',{class:'ico-success cG fs205 mB20'}),
                        $('<div/>',{text:texts.subscriptionCanceled})
                    )
                }else{
                    checkSubscriptionStatus();
                }
            }
        })
    }

    checkSubscriptionStatus();
}
else if(paymentType == 'update_subscription'){
    hide_page_loading();
    $('#message').addClass('msgBox_green').append(
        $('<div/>',{class:'ico-success cG fs205 mB20'}),
        $('<div/>',{text:texts.updateSubscription})
    )
}

