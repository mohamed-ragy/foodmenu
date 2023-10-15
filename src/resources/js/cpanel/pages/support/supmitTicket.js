setSubmitTicketInputList = function(){
    ticketCodes = {
        0:'account',
        1:'billingAndSubscription',
        2:'productsAndCategories',
        3:'orders',
        4:'users',
        5:'deliveryAccounts',
        6:'websiteSystem',
        7:'design',
        8:'controlPanel',
        9:'liveChat',
        10:'other',
    }
    for(const key in ticketCodes){
        addToInputList($('#support-submitTicket-ticketCodeList'),texts.support[ticketCodes[key]],key)
    }
}
$('html,body').on('click','#support-submitTicket-attachAnImg',function(e){
    e.stopImmediatePropagation();
    if($('#support-submitTicket-attachedImgs').children().length > 3){
        showAlert('warning',texts.support.maxTicketAttachments,10000,true);
    }else{
        $('#support-submitTicket-attachImgInputFile').trigger('click');
    }
});

$('html,body').on('change','#support-submitTicket-attachImgInputFile',function(e){
    e.stopImmediatePropagation();
    $('#support-submitTicket-attachAnImg').hide();
    showBtnLoading($('#support-submitTicket-submitTicketBtn'));
    showLoading($('#supprt-submitTicket-attachImgLoading'))
    attachedImg =  $('#support-submitTicket-attachImgInputFile').prop('files')[0];
    if(attachedImg){
        if(attachedImg.type == 'image/png' || attachedImg.type == 'image/jpeg' || attachedImg.type == 'image/gif' || attachedImg.type == 'image/bmp' || attachedImg.type == 'image/webp'){
            if(attachedImg.size < ( 1024*1024 ) ){
                data = new FormData($('#support-submitTicket-attachImgForm')[0]);
                $.ajax({
                    url:'/imgs',
                    type:'post',
                    data:data,
                    cache:false,
                    contentType:false,
                    processData:false,
                    success:function(response){
                        hideLoading($('#supprt-submitTicket-attachImgLoading'))
                        hideBtnLoading($('#support-submitTicket-submitTicketBtn'));
                        $('#support-submitTicket-attachAnImg').show();
                        $('#support-submitTicket-attachImgInputFile').val('');
                        if(response.ticketUploadImgStatus == 0){
                            showAlert('error',response.error,4000,true);
                        }else if(response.ticketUploadImgStatus == 1){
                            showAlert('success',response.msg,4000,true);
                            $('#support-submitTicket-attachedImgs').append(
                                $('<div/>',{
                                    class:'support-attachedImgContainer',
                                    url:response.url,
                                }).append(
                                    $('<img/>',{
                                        src:'/storage/'+response.url,
                                        class:'support-attachedImg',
                                    }),
                                    $('<div/>',{
                                        class:'support-attachedImgRemove ',
                                        tooltip:texts.support.removeAttachment,
                                    }).append(
                                        $('<span/>',{class:'ico-close'}),
                                    )
                                )

                            )
                        }
                    }
                })
            }else{
                showAlert('warning',texts.support.imgTooBig,4000,true);
                hideLoading($('#supprt-submitTicket-attachImgLoading'))
                hideBtnLoading($('#support-submitTicket-submitTicketBtn'));
                $('#support-submitTicket-attachAnImg').show();
                $('#support-submitTicket-attachImgInputFile').val('');
            }
        }else{
            showAlert('error',texts.imgs.imgWrongType,6000,true);
            hideLoading($('#supprt-submitTicket-attachImgLoading'))
            hideBtnLoading($('#support-submitTicket-submitTicketBtn'));
            $('#support-submitTicket-attachAnImg').show();
            $('#support-submitTicket-attachImgInputFile').val('');
        }
    }
});

$('html,body').on('click','.support-attachedImgRemove',function(e){
    e.stopImmediatePropagation();
    $('#support-submitTicket-attachAnImg').hide();
    showBtnLoading($('#support-submitTicket-submitTicketBtn'));
    showLoading($('#supprt-submitTicket-attachImgLoading'))
    attachmentContainer = $(this).parent();
    $.ajax({
        url:'/imgs',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            deleteTicketAttachment:attachmentContainer.attr('url'),
        },success:function(response){
            hideLoading($('#supprt-submitTicket-attachImgLoading'))
            hideBtnLoading($('#support-submitTicket-submitTicketBtn'));
            $('#support-submitTicket-attachAnImg').show();
            if(response.deleteTicketAttachmentStatus == 1){
                attachmentContainer.remove();
            }else if(response.deleteTicketAttachmentStatus == 0){
                showAlert('error',response.msg,4000,true);
            }
        }
    })
})

$('html,body').on('click','#support-submitTicket-submitTicketBtn',function(e){
    e.stopImmediatePropagation()
    if($('#support-submitTicket-ticketTitle').val() == ''){
        showAlert('error',texts.support.ticketTitleRequired,4000,true);
        inputTextError($('#support-submitTicket-ticketTitle'))
    }else if($('#support-submitTicket-ticketCode').val() == ''){
        showAlert('error',texts.support.ticketCodeRequired,4000,true);
        inputListError($('#support-submitTicket-ticketCode'))
    }
    else if($('#support_submitTicket_ticketDescription').val() == ''){
        showAlert('error',texts.support.ticketDescriptionRequired,4000,true);
        textareaError($('#support_submitTicket_ticketDescription'))
    }else{
        showBtnLoading($('#support-submitTicket-submitTicketBtn'));
        ticketImgs = [];
        ticketComments = {};
        $('#support-submitTicket-attachedImgs').children().each(function(){
            ticketImgs.push($(this).attr('url'));
        })
        $.ajax({
            url:'/support',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                submitTicket:true,
                ticketTitle:$('#support-submitTicket-ticketTitle').val(),
                ticketCode:$('#support-submitTicket-ticketCode').attr('key'),
                ticketLanguage:account.language,
                ticketMsg:$('#support_submitTicket_ticketDescription').val(),
                ticketComments:JSON.stringify(ticketComments),
                ticketImgs:JSON.stringify(ticketImgs),
            },
            success:function(response){
                hideBtnLoading($('#support-submitTicket-submitTicketBtn'));
                if(response.submitTicketStatus == 1){
                    showAlert('success',response.msg,4000,true);
                    $('#support-submitTicket-ticketTitle').val('');
                    $('#support-submitTicket-ticketCode').attr('key','')
                    $('#support-submitTicket-ticketCode').val('');
                    ticketConversation = {};
                    ticketComments = {};
                    ticketImgs = [];
                    $('#support_submitTicket_ticketDescription').val('');
                    $('#support-submitTicket-attachedImgs').text('');
                    showPopupPage('ticket_browser',{ticket:response.ticket.id})
                }else if(response.submitTicketStatus == 0){
                    showAlert('error',response.msg,4000,true);
                }
            }
        })

    }
});
