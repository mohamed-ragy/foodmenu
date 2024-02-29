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

const form = document.getElementById('payment-form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    showBtnLoading($('#submit'))
    if(window.payment_return_url == 'add_payment_method' ){
        const {error} = await stripe.confirmSetup({
            elements,
            confirmParams: {
            return_url: `${process.env.MIX_BILLING_CENTER_URL}/${window.lang}/payment/${window.payment_return_url}`,
            }
        });

        if (error) {
            hideBtnLoading($('#submit'))
            const messageContainer = document.querySelector('#error-message');
            messageContainer.textContent = error.message;
        } else {
            // hideBtnLoading($('#submit'))
        }
    }
    else if(window.payment_return_url == 'activate_plan'){
        const {error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${process.env.MIX_BILLING_CENTER_URL}/${lang}/payment/${window.payment_return_url}`,
            }
        });
        if (error) {
            hideBtnLoading($('#submit'))
            const messageContainer = document.querySelector('#error-message');
            messageContainer.textContent = error.message;
        } else {
            // hideBtnLoading($('#submit'))
        }
    }



});

