////////////////////////////////country////////////////////////////////////////////
$('body').on('click','#system-countrySaveBtn',function(e){
    if(!coolDownChecker()){return;}
    showBtnLoading($('#system-countrySaveBtn'))
    let saveCountry = $('#system-countries').attr('key')
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            saveCountry:saveCountry,
        },
        success:function(response){
            hideBtnLoading($('#system-countrySaveBtn'))
            if(response.saveCountryStatus == 1){
                showAlert('success',response.msg,4000,true);
                website.country_code = saveCountry;
                website_temp.country_code = saveCountry;
                $('#system-countryFlag').attr('src','storage/imgs/flags/'+saveCountry+'.png');
                system_unsave_check();
            }else if(response.saveCountryStatus == 0){
                showAlert('error',response.msg,4000,true);
                $('#settings-general-countryLoading').css('visibility','hidden');
                system_unsave_check();
            }
        }
    })

});
$('body').on('click','#system-countryCancelBtn',function(e){
    if(!account.authorities[4]){return;}
    website_temp.country_code = website.country_code
    $('#system-countryFlag').attr('src','storage/imgs/flags/'+website.country_code+'.png');
    $('#system-countriesList').children().each(function(){
        if($(this).attr('key') == website.country_code){
            $(this).trigger('click');
        }
    })
    system_unsave_check();
});

countryunSavedCheck = function(){
    if(!account.authorities[4]){return true;}
    if(website.country_code == website_temp.country_code){
        $('.system-countrynoSave').addClass('none');
        return true;
    }else{
        $('.system-countrynoSave').removeClass('none');
        return false;
    }
}

$('body').on('click','#system-countriesList .inputListElement',function(e){
    website_temp.country_code = $(this).attr('key');
    if($(this).attr('key') != null && $(this).attr('key') != ''){
        $('#system-countryFlag').attr('src','storage/imgs/flags/'+website_temp.country_code+'.png');
    }
    system_unsave_check()
})
$('body').on('keyup','#system-countries',function(e){
    website_temp.country_code = $('#system-countries').attr('key');
    if($('#system-countries').attr('key') != null && $('#system-countries').attr('key') != ''){
        $('#system-countryFlag').attr('src','storage/imgs/flags/'+website_temp.country_code+'.png');
    }
    system_unsave_check()
});
getCountries = function(){
    for(const key in window.countries){
        const country = window.countries[key];
        let countryName;
        if(account.language == 'en'){countryName = country.en;}
        else if(account.language == 'ar'){countryName = country.ar;}
        else if(account.language == 'fr'){countryName = country.fr;}
        else if(account.language == 'de'){countryName = country.de;}
        else if(account.language == 'it'){countryName = country.it;}
        else if(account.language == 'es'){countryName = country.es;}
        else if(account.language == 'ru'){countryName = country.ru;}
        else if(account.language == 'ua'){countryName = country.ua;}
        else{countryName = country.en;}

        addToInputList($('#system-countriesList'),countryName,country.code);

        if(website_temp.country_code == country.code){
            $('#system-countries').val(countryName);
            $('#system-countries').attr('key',country.code);
            $('#system-countryFlag').attr('src','storage/imgs/flags/'+country.code+'.png');
        }
    }
    system_unsave_check();
}
