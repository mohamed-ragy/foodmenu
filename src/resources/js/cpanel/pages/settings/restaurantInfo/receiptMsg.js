
/////////////////////receipt msg////////////////////////////////
websiteReceiptMsgsNoSaveFunction = function(){
    if(JSON.stringify(website.website_receiptMsgs) == JSON.stringify(website_temp.website_receiptMsgs)){
        $('.receiptMsgNoSave').addClass('none');
        return true;
    }else{
        $('.receiptMsgNoSave').removeClass('none');
        return false;
    }
}
for(const key in website.languages){
    let lang = website.languages[key];
    $('html,body').on('input change',`#settings_ReceiptMsg_${lang.code}`,function(e){
        e.stopImmediatePropagation();
        website_temp.website_receiptMsgs[lang.code] = $(`#settings_ReceiptMsg_${lang.code}`).val();
        restaurant_information_unsave_chack();
    })

}


$('html,body').on('click','#settings-receiptMsgCancelBtn',function(e){
    e.stopImmediatePropagation();
    website_temp.website_receiptMsgs = JSON.parse(JSON.stringify(website.website_receiptMsgs));
    for(const key in website.languages){
        let lang = website.languages[key];
        $(`#settings_ReceiptMsg_${lang.code}`).val(website.website_receiptMsgs[lang.code]);
    }
    restaurant_information_unsave_chack();
});
$('html,body').on('click','#settings-receiptMsgSaveBtn',function(){
    if(!coolDownChecker()){return;}
    showBtnLoading($('#settings-receiptMsgSaveBtn'));
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            saveWebsiteReceiptMsgs:website_temp.website_receiptMsgs,
        },
        success:function(response){
            hideBtnLoading($('#settings-receiptMsgSaveBtn'));
            if(response.saveWebsiteReceiptMsgs == 1){
                showAlert('success',response.msg,4000,true);
                website.website_receiptMsgs = JSON.parse(JSON.stringify(website_temp.website_receiptMsgs));
                restaurant_information_unsave_chack();
                window.guideHints.websiteReceiptMsgs();
            }else if(response.saveWebsiteReceiptMsgs == 0){
                showAlert('error',response.msg,4000,true);

            }
        }

    });
});
