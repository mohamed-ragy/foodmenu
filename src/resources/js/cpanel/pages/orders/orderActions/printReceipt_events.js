$('html,body').on('click','.printOrderReceipt',function(e){
    e.stopImmediatePropagation();
    printOrderReceipt($(this).attr('order'))
})
