$('body').on('click','.printOrderReceipt',function(e){
    printOrderReceipt($(this).attr('order'))
})
