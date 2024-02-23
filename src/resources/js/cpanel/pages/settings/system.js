
require('./system/systemSettings.js');//done//
require('./system/privacyPolicy.js');//done//
require('./system/deleteHistoryData.js');//done//
require('./system/country.js');//done//
require('./system/timeZone.js');//done//

region_nosaveCheck = function(){
    timeZoneNoSaveCheck();
    countryunSavedCheck();
    if(
        timeZoneNoSaveCheck() && countryunSavedCheck()
    ){
        $('.region-noSave').addClass('none');
        return true;
    }else{
        $('.region-noSave').removeClass('none');
        return false
    }
}
getCountriesTimezones = function(callback=()=>{}){
    if(!window.countriesAndTimezonesFirstLoad){
        $.getJSON('./storage/json/catz.json',function(j){
            window.countries = j.countries;
            window.timeZones = j.timeZones;
            window.cityToTz = j.cityToTz;
        }).done(function(){
            window.countriesAndTimezonesFirstLoad = true;
            window.countries.sort( (a, b) => {
                var textA = a[account.language].toUpperCase();
                var textB = b[account.language].toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            window.timeZones.sort( (a, b) => {
                var textA = a[account.language].toUpperCase();
                var textB = b[account.language].toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            getCountries();
            getTimeZones();
            getCustomLangFlags();
            getBrowserDialCode();
            callback();
        })
    }else{
        getCountries();
        getTimeZones();
        getCustomLangFlags();
        getBrowserDialCode();
        callback();
    }


}
