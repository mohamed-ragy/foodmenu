
const form = document.getElementById('payment-form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    showBtnLoading($('#submit'))
    if(window.payment_return_url == 'addPaymentMethod' ){
        const {error} = await stripe.confirmSetup({
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
    else if(window.payment_return_url == 'activatePlan'){
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


