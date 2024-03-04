process_data = function(r){
    window.stripe = Stripe('pk_test_51NV5sdIYxD8tIsOHZDYt4SyJYDtJtwOiVy9IFMJLSHXvo8DbuqAFTqP3PfCsfipnAsJnnhgseCQq6DqNRm08ri7L006J1AMtQz');
    window.lang = r.lang;
    window.texts = r.texts;
    window.plans = r.plans;
    window.website = r.website;
    window.website.balance < 0 ? window.website.balance = window.website.balance * -1 : null;
    window.website.plan_price = 0;
    window.website.billingPeriod == 'year' ? window.website.plan_price = window.plans[window.website.plan].yearlyCost :
    window.website.billingPeriod == 'month' ? window.website.plan_price = window.plans[window.website.plan].monthlyCost : null;
    window.website.paymentMethods = r.paymentMethods;
    window.website.lastInvoices = r.lastInvoices;
    window.website.invoices_count = r.invoices_count;

    
    
    hide_page_loading();
    drawBalance();
    showPage('home');
}
