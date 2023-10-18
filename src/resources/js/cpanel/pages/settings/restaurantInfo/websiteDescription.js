/////////////////////description////////////////////////////////

$('html,body').on('input change','.websiteDescriptionTextarea',function(e){
    e.stopImmediatePropagation();
    for(const key in website.languages){
        let lang = website.languages[key];
        website_temp.websiteDescriptions[lang.code] = $(`#settings_websiteDescription_${lang.code}`).val();
    }
    restaurant_information_unsave_chack();
})
$('html,body').on('click','#settings-websiteDescriptionCancelBtn',function(e){
    e.stopImmediatePropagation();
    website_temp.websiteDescriptions = JSON.parse(JSON.stringify(website.websiteDescriptions))
    for(const key in website.languages){
        let lang = website.languages[key];
        $(`#settings_websiteDescription_${lang.code}`).val(website.websiteDescriptions[lang.code]);
    }
    restaurant_information_unsave_chack();

});
$('html,body').on('click','#settings-websiteDescriptionSaveBtn',function(){
    if(!coolDownChecker()){return;}
    showBtnLoading($('#settings-websiteDescriptionSaveBtn'));
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            saveWebsiteDescription:website_temp.websiteDescriptions,
        },
        success:function(response){
            hideBtnLoading($('#settings-websiteDescriptionSaveBtn'));
            if(response.saveWebsiteDescription == 1){
                showAlert('success',response.msg,4000,true);
                website.websiteDescriptions = JSON.parse(JSON.stringify(website_temp.websiteDescriptions))
                restaurant_information_unsave_chack();
                window.guideHints.websiteDescriptions();
            }else if(response.saveWebsiteDescription == 0){
                showAlert('error',response.msg,4000,true);

            }
        }

    });
});
websiteDescriptionsNoSaveFunction = function(){
    if(JSON.stringify(website.websiteDescriptions ) == JSON.stringify(website_temp.websiteDescriptions )){
        $('.websiteDescriptionNoSave').addClass('none');
        return true;
    }else{
        $('.websiteDescriptionNoSave').removeClass('none');
        return false;
    }
}
