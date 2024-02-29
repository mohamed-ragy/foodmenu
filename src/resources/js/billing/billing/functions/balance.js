drawBalance = function(){
    
    if(website.balance > 0){
        $('#balance').text('').append(
            $('<div/>',{class:'mB20 wFC taE'}).append(
                $('<div/>',{class:'row alnBL jstfyC'}).append(
                    $('<span/>',{class:'ico-info mie-3 fs09',tooltip:texts.balanceInfo}),
                    $('<span/>',{text:texts.balance,class:'bold'}),
                ),
                $('<div/>',{class:'fs102 bold',text:`$${(website.balance/100).toFixed(2)}`}),
                $('<div/>',{text:texts.refund,class:'hvr-underline pointer fs08 c_white-10 openPopup',popup:'refund'}),
            ),
        )
    }else{
        $('#balance').text('');
    }
}

