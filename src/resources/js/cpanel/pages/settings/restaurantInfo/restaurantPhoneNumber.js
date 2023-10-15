//////////////////////////////website phone number////////////////////////////////

PhoneNumberInputText = function(value){
    $('#setting-phoneNumbers').append(
        $('<div/>',{
            class:'inputTextContainer',
        }).append(
            $('<div/>',{
                class:'inputTextIcon',
            }).append(
                $('<span/>',{class:'ico-phone_number'})
            ),
            $('<input/>',{
                autocomplete:'new-password',
                autoHelp:'',
                value:value,
                class:'inputText websitePhoneNumberInput',
            }),
            $('<span/>',{
                class:'websitePhoneNumberInputDelete ico-delete',
                tooltip:texts.cpanel.public.delete,
            })
        ),
    );
}

$('html,body').on('input change','.websitePhoneNumberInput',function(e){
    e.stopImmediatePropagation();
    website_temp.phoneNumbers = [];
    $('.websitePhoneNumberInput').each(function(){
        if($(this).val() != ''){
            website_temp.phoneNumbers.push($(this).val());
        }
    });
    restaurant_information_unsave_chack();
})

$('html,body').on('click','.websitePhoneNumberInputDelete',function(e){
    e.stopImmediatePropagation();
    $(this).parent().remove();
    website_temp.phoneNumbers = [];
    $('.websitePhoneNumberInput').each(function(){
        if($(this).val() != ''){
            website_temp.phoneNumbers.push($(this).val());
        }
    });
    restaurant_information_unsave_chack();
})

getWebsitePhoneNumbers = function(){
    $('#setting-phoneNumbers').text('');
    if(website_temp.phoneNumbers.length == 0){
        PhoneNumberInputText('');
    }else{
        for(const key in website_temp.phoneNumbers){
            const phoneNumber = website_temp.phoneNumbers[key];
            if(phoneNumber != null && phoneNumber != ''){
                PhoneNumberInputText(phoneNumber);
            }
        }
    }
}


$('html,body').on('click','#setting-addPhoneNumberBtn',function(e){
    e.stopImmediatePropagation();
    PhoneNumberInputText('');
    restaurant_information_unsave_chack();
});

$('html,body').on('click','#setting-phoneNumberCancelBtn',function(e){
    e.stopImmediatePropagation();
    website_temp.phoneNumbers = JSON.parse(JSON.stringify(website.phoneNumbers))
    getWebsitePhoneNumbers();
    restaurant_information_unsave_chack();
});

$('html,body').on('click','#setting-phoneNumberSaveBtn',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    showBtnLoading($('#setting-phoneNumberSaveBtn'));
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            changeWebsitePhoneNumbers:true,
            websitePhoneNumbers:website_temp.phoneNumbers,
        },success:function(response){
            hideBtnLoading($('#setting-phoneNumberSaveBtn'));
            if(response.changeWebsitePhoneNumber == 1){
                showAlert('success',response.msg,4000,true);
                website.phoneNumbers = website_temp.phoneNumbers;
                window.guideHints.websitePhoneNumbers();
                restaurant_information_unsave_chack();
            }else if(response.changeWebsitePhoneNumber == 0){
                showAlert('error',response.msg,4000,true);

            }
        }
    })
});

phoneNumberNoSaveCheck = function(){
    if(JSON.stringify(website_temp.phoneNumbers) == JSON.stringify(website.phoneNumbers)){
        $('.websitePhoneNoSave').addClass('none');
        return true;
    }else{
        $('.websitePhoneNoSave').removeClass('none');
        return false;
    }
}
