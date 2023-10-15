window.$ = require("jquery");
window.loadTouchEvents = require('jquery-touch-events');
const { post } = require("jquery");
loadTouchEvents($);

const stripe = Stripe('pk_test_51NV5sdIYxD8tIsOHZDYt4SyJYDtJtwOiVy9IFMJLSHXvo8DbuqAFTqP3PfCsfipnAsJnnhgseCQq6DqNRm08ri7L006J1AMtQz');

let params = new URLSearchParams(window.location.search)

if(paymentType == 'addPaymentMethod'){
    if(params.get('setup_intent_client_secret') != null){
        stripe.retrieveSetupIntent(params.get('setup_intent_client_secret')).then(({setupIntent}) => {
            $('.loading').addClass('none');
            $('.backToBillingCenter').removeClass('none');
            let messageTxt;
            switch (setupIntent.status) {
                case 'succeeded': {
                    $('#message').addClass(' fs103 row alnS jstfyC w100p').text('').append(
                        $('<span/>',{class:'ico-success cG fs1 mie-5 mT5'}),
                        $('<span/>',{text:texts.paymentMethodAdded})
                    )
                }
                break;
                case 'processing': {
                    $('#message').addClass('cG fs103 row alnS jstfyC w100p').text('').append(
                        $('<span/>',{class:'ico-success cG fs1 mie-5 mT5'}),
                        $('<span/>',{text:texts.paymentMethodProcessing})
                    )
                break;
                }
                case 'requires_payment_method': {
                    $('#message').addClass(' fs103 row alnS jstfyC w100p').text('').append(
                        $('<div/>',{class:'ico-close cR mie-10 fs09 mB2'}),
                        $('<div/>',{text:messageTxt = texts.paymentMethodFailed})
                    )
                break;
                }
                default:
                    $('#message').addClass(' fs103 row alnS jstfyC w100p').text('').append(
                        $('<div/>',{class:'ico-close cR mie-10 fs09 mB2'}),
                        $('<div/>',{text:texts.unknownError})
                    )
                break;
            }
        });

    }
}else if(paymentType == 'activatePlan'){
    if(params.get('payment_intent_client_secret') != null){
        stripe.retrievePaymentIntent(params.get('payment_intent_client_secret')).then(({paymentIntent}) => {
            $('.loading').addClass('none');
            $('.backToBillingCenter').removeClass('none');
            const message = document.querySelector('#message')
            switch (paymentIntent.status) {
                case 'succeeded':
                    $('#message').addClass(' fs103 row alnS jstfyC w100p').text('').append(
                        $('<span/>',{class:'ico-success cG fs1 mie-5 mT5'}),
                        $('<span/>',{text:texts.subscriptionActivated})
                    )
                break;
                case 'processing':
                    $('#message').addClass('cG fs103 row alnS jstfyC w100p').text('').append(
                        $('<span/>',{class:'ico-success cG fs1 mie-5 mT5'}),
                        $('<span/>',{text:texts.paymentMethodProcessing})
                    )
                break;
                case 'requires_payment_method':
                    $('#message').addClass(' fs103 row alnS jstfyC w100p').text('').append(
                        $('<div/>',{class:'ico-close cR mie-10 fs09 mB2'}),
                        $('<div/>',{text:messageTxt = texts.paymentMethodFailed})
                    )
                break;
                default:
                    $('#message').addClass(' fs103 row alnS jstfyC w100p').text('').append(
                        $('<div/>',{class:'ico-close cR mie-10 fs09 mB2'}),
                        $('<div/>',{text:texts.unknownError})
                    )
                break;
            }
          });
    }
}else if(paymentType == 'retryPlanPayment'){
    if(params.get('payment_intent_client_secret') != null){
        stripe.retrievePaymentIntent(params.get('payment_intent_client_secret')).then(({paymentIntent}) => {
            $('.loading').addClass('none');
            $('.backToBillingCenter').removeClass('none');
            const message = document.querySelector('#message')
            switch (paymentIntent.status) {
                case 'succeeded':
                    $('#message').addClass(' fs103 row alnS jstfyC w100p').text('').append(
                        $('<span/>',{class:'ico-success cG fs1 mie-5 mT5'}),
                        $('<span/>',{text:texts.subscriptionActivated})
                    )
                break;
                case 'processing':
                    $('#message').addClass('cG fs103 row alnS jstfyC w100p').text('').append(
                        $('<span/>',{class:'ico-success cG fs1 mie-5 mT5'}),
                        $('<span/>',{text:texts.paymentMethodProcessing})
                    )
                break;
                case 'requires_payment_method':
                    $('#message').addClass(' fs103 row alnS jstfyC w100p').text('').append(
                        $('<div/>',{class:'ico-close cR mie-10 fs09 mB2'}),
                        $('<div/>',{text:messageTxt = texts.paymentMethodFailed})
                    )
                break;
                default:
                    $('#message').addClass(' fs103 row alnS jstfyC w100p').text('').append(
                        $('<div/>',{class:'ico-close cR mie-10 fs09 mB2'}),
                        $('<div/>',{text:texts.unknownError})
                    )
                break;
            }
          });
    }
}else if(paymentType == 'cancelSubscription'){
    $('.loading').removeClass('none');
    $('.backToBillingCenter').addClass('none');

    checkSubscriptionStatus = function(){
        $.ajax({
            url:'/api',
            type:'post',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                checkSubscriptionStatus:true,
            },success:function(r){
                if( r.subscriptionStatus == 'canceled'){
                    $('.loading').addClass('none');
                    $('.backToBillingCenter').removeClass('none');
                    $('#message').addClass(' fs103 row alnS jstfyC w100p').text('').append(
                        $('<span/>',{class:'ico-success cG fs1 mie-5 mT5'}),
                        $('<span/>',{text:texts.subscriptionCanceled})
                    )
                }else{
                    checkSubscriptionStatus();
                }
            }
        })
    }

    checkSubscriptionStatus();
}else if(paymentType == 'updateSubscription'){
    $('.loading').addClass('none');
    $('.backToBillingCenter').removeClass('none');
    $('#message').addClass(' fs103 row alnS jstfyC w100p').text('').append(
        $('<span/>',{class:'ico-success cG fs1 mie-5 mT5'}),
        $('<span/>',{text:texts.updateSubscription})
    )
}

