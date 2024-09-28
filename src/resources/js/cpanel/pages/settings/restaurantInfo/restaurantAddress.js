
websiteAddressNoSaveCheck  =  function(){
    if(
        JSON.stringify(website.addresses) == JSON.stringify(website_temp.addresses)
    ){
        $('.websiteAddressNoSave').addClass('none');
        return true;
    }else{
        $('.websiteAddressNoSave').removeClass('none');
        return false;
    }
}

$('body').on('input change','.restaurantAddressInputText',function(e){
    for(const key in website.languages){
        let lang = website.languages[key];
        website_temp.addresses[lang.code] = $(`#setting-restaurantAddress_${lang.code}`).val();
    }
    restaurant_information_unsave_chack();
})
$('body').on('click','#setting-websiteAddressCancelBtn',function(e){
    website_temp.addresses = JSON.parse(JSON.stringify(website.addresses));
    for(const key in website.languages){
        let lang = website.languages[key];
        $(`#setting-restaurantAddress_${lang.code}`).val(website.addresses[lang.code])
    }
    restaurant_information_unsave_chack();
})

$('body').on('click','#setting-websiteAddressSaveBtn',function(){
    if(!coolDownChecker()){return;}
    showBtnLoading($('#setting-websiteAddressSaveBtn'));
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            websiteAddresses:website_temp.addresses,
        },success:function(response){
            hideBtnLoading($('#setting-websiteAddressSaveBtn'));
            if(response.changeWebsiteAddress == 1){
                showAlert('success',response.msg,4000,true);
                website.addresses = JSON.parse(JSON.stringify(website_temp.addresses));
                restaurant_information_unsave_chack();
                window.guideHints.websiteAddressess();
            }else if(response.changeWebsiteAddress == 0){
                showAlert('error',response.msg,4000,true);
            }
        }
    })

});
