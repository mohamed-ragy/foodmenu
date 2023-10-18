currenciesNoSaveCheck = function(){
    if(
        JSON.stringify(website_temp.currencies) == JSON.stringify(website.currencies)
    ){
        $('.currencySymbolNoSave').addClass('none');
        return true;
    }else{
        $('.currencySymbolNoSave').removeClass('none');
        return false;
    }
}

$('html,body').on('input change','.websiteCurrencyInputText',function(e){
    e.stopImmediatePropagation();
    for(const key in website.languages){
        let lang = website.languages[key];
        website_temp.currencies[lang.code] = $(`#setting-enCurrency_${lang.code}`).val();
    }
    restaurant_information_unsave_chack();
})
$('html,body').on('click','#settings-currencyCancelBtn',function(e){
    e.stopImmediatePropagation();
    website_temp.currencies = JSON.parse(JSON.stringify(website.currencies));
    for(const key in website.languages){
        let lang = website.languages[key];
        $(`#setting-enCurrency_${lang.code}`).val(website.currencies[lang.code]);
    }
    restaurant_information_unsave_chack();
});
$('html,body').on('click','#settings-currencySaveBtn',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    showBtnLoading($('#settings-currencySaveBtn'))
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            saveCurrencies:website_temp.currencies,

        },success:function(response){
            hideBtnLoading($('#settings-currencySaveBtn'))
            if(response.saveCurrencyStatus == 1){
                showAlert('success',response.msg,4000,true);
                website.currencies = JSON.parse(JSON.stringify(website_temp.currencies));
                for(const key in website.languages){
                    if(website.languages[key].receiptDefault){
                        website.currency = website.currencies[website.languages[key].code];
                    }
                }
                restaurant_information_unsave_chack();
                window.guideHints.websiteCurrencies();
            }else if(response.saveCurrencyStatus == 0){
                showAlert('error',response.msg,4000,true);
                restaurant_information_unsave_chack();
            }
        }
    })
});

