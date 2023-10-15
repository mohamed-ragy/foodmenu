drawAddPaymentMethod = function(){
    $('#payment-form_loading').removeClass('none').addClass('vV')
    $('#payment-form').addClass('none')
    $.ajax({
        url:'/api',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            createPaymentIntent:true,
        },success:function(r){
            drawPaymentGateWay(r.client_secret);
            $('#payment-form').removeClass('none');
            $('#payment-form_loading').addClass('none').removeClass('vV')
        }
    })
}

window.stripe = Stripe('pk_test_51NV5sdIYxD8tIsOHZDYt4SyJYDtJtwOiVy9IFMJLSHXvo8DbuqAFTqP3PfCsfipnAsJnnhgseCQq6DqNRm08ri7L006J1AMtQz');
drawPaymentGateWay = function(client_secret){
    const appearance = {
        theme: 'none',
        // labels: 'floating',
        variables: {
            fontFamily:"'Nunito', sans-serif",
            fontSizeBase:'1em',
            borderRadius:'5px',
            colorPrimary:'#3b8c8e',
            colorBackground:'#ffffff',
            colorText:'#2b6f70',
            colorDanger:'#f12031',
        },
        rules: {
            '.Tab':{
                border: '1px solid transparent',
                boxShadow:'rgba(60, 64, 67, 0.2) 0px 0px 1px 0px, rgba(60, 64, 67, 0.1) 0px 0px 2px 0px',
            },
            '.Tab:hover': {
                boxShadow:'rgba(24, 75, 76, 0.2) 0px 0px 2px 0px, rgba(24, 75, 76, 0.4) 0px 0px 3px 0px',
            },
            '.Tab--selected': {
                borderColor: '#2b6f70',
            },
            '.Label':{
                color:'#565b5b',
                fontWeight:'bold',
            },
            '.Error':{
                fontSize:'.8em',
            },
            '.Input':{
                padding:'10px',
                backgroundColor:'#ffffff',
                color:'#5a5a5a',
                borderRadius:'5px',
                fontFamily:"'Nunito', sans-serif",
                border:'1px solid #dfdfdf',
            },
            '.Input:focus':{
                outline:'none',
                border:'1px solid #b6b6b6',
            },
            '.Input::placeholder':{
                color:'#b6b6b6',
            },
            '.Input--invalid':{
                borderColor:'#f12031',
            },

        }
    };
    const options = {
        clientSecret: client_secret,
        appearance,
        // Fully customizable with appearance API.
        // appearance: {/*...*/},
    };

    // Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 5
    window.elements = stripe.elements(options);

    // Create and mount the Payment Element
    const paymentElement = elements.create('payment');
    paymentElement.mount('#payment-element');


}

// let params = new URLSearchParams(window.location.search)
// if(params.get('setup_intent_client_secret') != null){
//     stripe.retrieveSetupIntent(params.get('setup_intent_client_secret')).then(({setupIntent}) => {
//         switch (setupIntent.status) {
//             case 'succeeded': {
//                 $('#message').removeClass().addClass('cG mB40 row alnS jstfyS').text('').append(
//                     $('<span/>',{class:'ico-success mT5 mie-5'}),
//                     $('<span/>',{text:texts.paymentMethodAdded})
//                 )
//             }
//             break;
//             case 'processing': {
//                 $('#message').removeClass().addClass('cG mB40 row alnC jstfyS').text('').append(
//                     $('<span/>',{class:'ico-success mie-5'}),
//                     $('<span/>',{text:texts.paymentMethodProcessing})
//                 )
//                 break;
//             }
//             case 'requires_payment_method': {
//                 $('#message').removeClass().addClass('cR mB40 row alnC jstfyS').text('').append(
//                     $('<div/>',{class:'ico-close fs09 mB3 mie-5'}),
//                     $('<div/>',{text:texts.paymentMethodFailed})
//                 )
//                 break;
//             }
//         }
//       });

// }
