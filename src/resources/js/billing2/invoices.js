drawInvoices = function(){
    $('#invoices').text('').append(
        $('<div/>',{text:texts.invoiceHistory,class:'bold mB10 pB10 brdrBottomS w100p'}),
        $('<table/>',{id:'invoicesContainer',class:'invoicesContainer'}),
    );
    for(const key in data.lastInvoices){
        let invoice = data.lastInvoices[key];
        drawInvoice(invoice);


    }

    if(data.lastInvoices.length < data.invoices_count){
        $('.loadMoreInvoices').removeClass('none')
    }else{
        $('.loadMoreInvoices').addClass('none')
    }
}

drawInvoice = function(invoice){
    let invoice_created_at = new Date(invoice.created_at)
    let invoiceStatus = '';
    // let payBtn = '';
    switch(invoice.status){
        case 'draft':
            invoiceStatus = $('<div/>',{class:'invoiceStatus invoiceStatus_gray',text:texts[invoice.status]});
        break;
        case 'open':
            invoiceStatus = $('<div/>',{class:'invoiceStatus invoiceStatus_orange',text:texts[invoice.status]});
            // payBtn = $('<button/>',{class:'openPage btn btn_s',page:'payInvoice',invoiceId:invoice.id,text:texts.pay})
        break;
        case 'paid':
            invoiceStatus = $('<div/>',{class:'invoiceStatus invoiceStatus_green',text:texts[invoice.status]});
        break;
        case 'void':
            invoiceStatus = $('<div/>',{class:'invoiceStatus invoiceStatus_red',text:texts[invoice.status]});
        break;
        case 'uncollectible':
            invoiceStatus = $('<div/>',{class:'invoiceStatus invoiceStatus_red',text:texts[invoice.status]});
        break;
    }
    invoice_created_at = new Date(invoice.created* 1000).toLocaleString(lang,{year:'numeric', month: 'short', day: 'numeric'});
    // invoice_created_at = created.toLocaleString(lang,{year:'numeric', month: 'short', day: 'numeric'});
    $('#invoicesContainer').append(
        $('<tr/>',{class:'invoiceContainer',created:invoice.created}).append(
            $('<td/>',{class:'fs08-720 pY10 pX10 pX5-720 ellipsis',text:invoice_created_at}),
            $('<td/>',{class:'fs08-720 pY10 pX10 pX5-720 ',text:`$${parseFloat(invoice.amount_due/100).toFixed(2)}`}),
            $('<td/>',{class:'fs08-720 pY10 pX10 pX5-720'}).append(invoiceStatus),
            $('<td/>',{class:'fs08-720 pY10 pX10 pX5-720 ellipsis none-720',text:invoice.description}),
            // $('<td/>',{class:'fs08-720 pY10 pX10 pX5-720'}).append(payBtn),
            $('<td/>',{class:'fs08-720 pY10 pX10 pX5-720'}).append(
                $('<a/>',{class:'ico-open unset pointer hvr-cBlack hvr-tdNone',href:`/${lang}/invoice/${invoice.id}`,target:'_blank'})
            ),
        ),
    )
}

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
                data.lastInvoices.push(r.invoices[key]);
            }
            if(data.lastInvoices.length < r.invoices_count){
                $('.loadMoreInvoices').removeClass('none')
            }else{
                $('.loadMoreInvoices').addClass('none')
            }
        }
    })



})
