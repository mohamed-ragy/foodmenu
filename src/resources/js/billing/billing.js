window.$ = require("jquery");
window.loadTouchEvents = require('jquery-touch-events');
// const { post } = require("jquery");
loadTouchEvents($);
require("../cpanel/tools/loading.js")

require('./currentPlan.js');
require('./activatePlan.js');
require('./paymentMethods.js');
require('./addPaymentMethod.js');
require('./addPaymentMethodEvent.js');
require('./invoices.js');
require('./cancelSubscription.js');
require('./updatePlan.js');
require('./refund.js');
require('./tooltip.js')


drawBalance = function(){
    if(data.balance > 0){
        $('#balance').text('').append(
            $('<div/>',{class:'mB20 wFC taE'}).append(
                $('<div/>',{class:'row alnC jstfyC'}).append(
                    $('<span/>',{class:'ico-info mie-3',tooltip:texts.balanceInfo}),
                    $('<span/>',{text:texts.balance,class:'bold'}),
                ),
                $('<div/>',{class:'fs102 bold',text:`$${(data.balance/100).toFixed(2)}`}),
                $('<a/>',{text:texts.refund,class:'pointer underline fs08 c-placeholder2 openPage',page:'refund'}),
            ),
        )
    }else{
        $('#balance').text('');
    }

}

drawBalance();
showPage = function(page){
    $('.page').addClass('page_hidden')
    setTimeout(()=>{
        $('.page').addClass('none')
        $(`.page[page="${page}"]`).removeClass('none')
        setTimeout(()=>{
            $(`.page[page="${page}"]`).removeClass('page_hidden')
        },100)
    },400)
}
showPopup = function(page){
    $('.popupContainer').removeClass('none')
    $('.popupPage').addClass('none')
    $(`.popupPage[page="${page}"]`).removeClass('none')
}

showPage('home');
$('#header').text('').append(
    $('<img/>',{src:'/storage/logo/f_green.png',class:'h40 mie-5 mB2'}),
    $('<span/>',{text:texts.billingCenter})
);
drawCurrentPlan();
drawPaymentMethods();
drawInvoices();

$('html,body').on('click','.popupClose',function(e){
    e.stopImmediatePropagation();
    $('.popupContainer').addClass('none')
    $('.popupPage').addClass('none')
})
$('html,body').on('click','.popupContainer',function(e){
    e.stopImmediatePropagation();
    if($('.popup:hover').length == 0){
        $('.popupContainer').addClass('none')
        $('.popupPage').addClass('none')
    }
})
$('html,body').on('click','.openPage',function(e){
    e.stopImmediatePropagation();
    $('#message').text('')
    $('#error-message').text('')
    switch($(this).attr('page')){
        case 'home':
            showPage('home')
            $('#header').text('').append(
                $('<img/>',{src:'/storage/logo/f_green.png',class:'h40 mie-5 mB2'}),
                $('<span/>',{text:texts.billingCenter})
            );
            drawCurrentPlan();
            drawPaymentMethods();
            drawInvoices();
        break;
        case 'addPaymentMethod':
            showPopup('paymentForm')
            $('#popupHeadTitle').text(texts.addPaymentMethod_c)
            $('#paymentFormTxt').text(texts.addPaymentMethod_c)
            window.payment_return_url = 'addPaymentMethod';
            drawAddPaymentMethod();
        break;
        case 'activatePlan':
            showPopup('activatePlan')
            $('#popupHeadTitle').text(texts.activatePlan)
            activatePlan();
        break;
        case 'cancelSubscription':
            showPopup('cancelSubscription')
            $('#popupHeadTitle').text(texts.cancelSubscription)

        break;
        case 'updatePlan':
            showPage('updatePlan')
            $('#header').text('').append(
                $('<img/>',{src:'/storage/logo/f_green.png',class:'h40 mie-5 mB2 openPage',page:'home'}),
                $('<span/>',{class:'bold pointer openPage',page:'home',text:texts.billingCenter}),
                $('<span/>',{class:'mX3 ico-right'}),
                $('<span/>',{text:texts.changePlan})
            );
            setUpdatePlans();
        break;
        case 'refund':
            showPopup('refund')
            $('#popupHeadTitle').text(texts.requestRefund)
            drawRequestRefund();
        break;
    }

})

