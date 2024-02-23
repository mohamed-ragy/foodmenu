

require('./functions/confirmBtn.js')//done//
require('./functions/coolDown.js')//done//
require('./functions/inputList.js')//done//
require('./functions/pushHistory.js')//done//
require('./functions/firstLoad.js')//done//
require('./functions/authorities.js')//done//
require('./functions/cpanelTitle.js')//done//
require('./functions/getDate.js')//done//
require('./functions/diffTime.js')//done//

counterIntervals = [];
counter = function(div,number,prefix,after='',toFixed=0){
    let checkNumber ;
    let divnumber = parseFloat(div.text().replace(after, ''));
    if(divnumber > number){
        checkNumber =  divnumber - number;
    }else if(divnumber < number){
        checkNumber =  number - divnumber;
    }

    let addToNumber = checkNumber / 30

    clearInterval(counterIntervals[prefix]);

    if(divnumber > number){
        counterIntervals[prefix] = setInterval(function(){
            divnumber = divnumber - addToNumber;
            div.text(after+divnumber.toFixed(toFixed))
            if(divnumber <= number){
                div.text(after+number.toFixed(toFixed))
                clearInterval(counterIntervals[prefix]);
            }
        },30)
    }else if(divnumber < number){
        counterIntervals[prefix] = setInterval(function(){
            divnumber = divnumber + addToNumber;
            div.text(after+divnumber.toFixed(toFixed))
            if(divnumber >= number){
                div.text(after+number.toFixed(toFixed))
                clearInterval(counterIntervals[prefix]);
            }
        },30)
    }else{
        div.text(after+number.toFixed(toFixed))
    }
}

ReloadForUpdate = function(){
    showAlert('warning',texts.cpanel.public.pageRefreshRequired1,100000000,true);
    setTimeout(function(){
        secondsToReload = 10;
        $('#updateRefreshRequiredContainer').text(texts.cpanel.public.pageRefreshRequired2+' '+secondsToReload+' '+texts.cpanel.public.pageRefreshRequired3);
        showPopup('updateRefreshRequired');
        setInterval(function(){
            $('#updateRefreshRequiredContainer').text(texts.cpanel.public.pageRefreshRequired2+' '+secondsToReload+' '+texts.cpanel.public.pageRefreshRequired3)
            secondsToReload = secondsToReload - 1;
            if(secondsToReload == 0){
                window.location.replace(window.location.pathname + window.location.search + window.location.hash);
            }
        },1000);
    },60000);
}
ReloadForUpdatePopup = function(){
    showPopup('updateRefreshRequired',function(){
        secondsToReload = 10;
        $('#updateRefreshRequiredContainer').text(texts.cpanel.public.pageRefreshRequired2+' '+secondsToReload+' '+texts.cpanel.public.pageRefreshRequired3);
        setInterval(function(){
            $('#updateRefreshRequiredContainer').text(texts.cpanel.public.pageRefreshRequired2+' '+secondsToReload+' '+texts.cpanel.public.pageRefreshRequired3)
            secondsToReload = secondsToReload - 1;
            if(secondsToReload == 0){
                window.location.replace(window.location.pathname + window.location.search + window.location.hash);
            }
        },1000);
    });

}
scrollToDiv = function(container,div,animationTime=500,space=50){
    container.stop();
    container.animate({
        'scrollTop':div.offset().top - space - container.offset().top + container.scrollTop(),
    },500,'swing');
}
drawLoadMore = function(id,containeClass=''){
    return $('<a/>',{id:id,class:`${containeClass} pointer hvr-tdNone row alnC jstfyE w100p-20 m10`}).append(
        $('<div/>',{text:texts.cpanel.public.loadMore,class:'mie-5'}),
        $('<div/>',{class:'ico-down'})
    )
}

bigInt = function(num){
    return parseInt(num).toLocaleString(account.language,{minimumFractionDigits: 0,maximumFractionDigits: 0})
}
bigFloat = function(num){
    return parseFloat(num).toLocaleString(account.language,{minimumFractionDigits: 0,maximumFractionDigits: 2})
}
//
let selectElemTimeout ;
highlightElem = function(elem){
    clearTimeout(selectElemTimeout)
    elem.addClass('highlightElem')
    selectElemTimeout = setTimeout(()=>{$('.highlightElem').removeClass('highlightElem')},5000)
}

//
