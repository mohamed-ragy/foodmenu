$('html,body').on('click','.loadMoreInvoices',function(e){
    e.stopImmediatePropagation();
    $('.loadMoreInvoices').children().addClass('none');
    $('.loadMoreInvoices').find('.loading').removeClass('none')

    $.ajax({
        url:'/api',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            loadMoreInvoices:$('.invoiceContainer').last().attr('created')
        },success:function(r){
            $('.loadMoreInvoices').children().removeClass('none');
            $('.loadMoreInvoices').find('.loading').addClass('none');
            for(const key in r.invoices){
                drawInvoice(r.invoices[key]);
                window.website.lastInvoices.push(r.invoices[key]);
            }
            if(window.website.lastInvoices.length < window.website.invoices_count){
                $('.loadMoreInvoices').removeClass('none')
            }else{
                $('.loadMoreInvoices').addClass('none')
            }
        }
    })



})
