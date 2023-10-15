

const form = document.getElementById('payment-form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    showBtnLoading($('#submit'))
    const {error} = await stripe.confirmPayment({
    //`Elements` instance that was used to create the Payment Element
    elements,
    confirmParams: {
        return_url: `${process.env.MIX_APP_URL}/en/register`,
    }
    });

    if (error) {
        hideBtnLoading($('#submit'))

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Show error to your customer (for example, payment
    // details incomplete)
    const messageContainer = document.querySelector('#error-message');
    messageContainer.textContent = error.message;
    } else {
        hideBtnLoading($('#submit'))
        step4();
    // Your customer will be redirected to your `return_url`. For some payment
    // methods like iDEAL, your customer will be redirected to an intermediate
    // site first to authorize the payment, then redirected to the `return_url`.
    }
});
