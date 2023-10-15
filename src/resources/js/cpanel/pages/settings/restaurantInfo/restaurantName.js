for(const key in website.languages){
    let lang = website.languages[key];
    $('html,body').on('input change',`#setting-restaurantName-${lang.code}`,function(e){
        e.stopImmediatePropagation();
        website_temp.websiteNames[lang.code] = $(`#setting-restaurantName-${lang.code}`).val();
        restaurant_information_unsave_chack();
    })
}
$('html,body').on('click','#setting-restaurantName-CancelBtn',function(e){
    e.stopImmediatePropagation();
    website_temp.websiteNames = JSON.parse(JSON.stringify(website.websiteNames));
    for(const key in website.languages){
        let lang = website.languages[key];
        $(`#setting-restaurantName-${lang.code}`).val(website_temp.websiteNames[lang.code]);
    }
    restaurant_information_unsave_chack();
});
$('html,body').on('click','#setting-restaurantName-SaveBtn',function(e){
    e.stopImmediatePropagation()
    if(!coolDownChecker()){return;}
    showBtnLoading($('#setting-restaurantName-SaveBtn'))
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            saveWebsiteName:website_temp.websiteNames,
        },
        success:function(response){
            hideBtnLoading($('#setting-restaurantName-SaveBtn'))
            if(response.saveWebsiteName == 1){
                showAlert('success',response.msg,4000,true);
                website.websiteNames = JSON.parse(JSON.stringify(website_temp.websiteNames));
                restaurant_information_unsave_chack();
                window.guideHints.websiteNames();
            }else if(response.saveWebsiteName == 0){
                showAlert('error',response.msg,4000,true);

            }
        }

    });
});
websiteNamesNoSaveFunction = function(){
    if(
        JSON.stringify(website.websiteNames) == JSON.stringify(website_temp.websiteNames)
    ){
        $('.websiteNameNoSave').addClass('none');
        return true;
    }else{
        $('.websiteNameNoSave').removeClass('none');
        return false;
    }
}
