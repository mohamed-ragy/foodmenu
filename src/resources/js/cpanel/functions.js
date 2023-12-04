

require('./functions/confirmBtn.js')
require('./functions/coolDown.js')
require('./functions/inputList.js')
require('./functions/pushHistory.js')
require('./functions/firstLoad.js')
require('./functions/authorities.js')
require('./functions/cpanelTitle.js')
require('./functions/getDate.js')
require('./functions/diffTime.js')

counterIntervals = [];
counter = function(div,number,prefix,after='',toFixed=0){
    let checkNumber ;
    let divnumber = parseFloat(div.text().replace(after, ''));
    if(divnumber > number){
        checkNumber =  divnumber - number;
    }else if(divnumber < number){
        checkNumber =  number - divnumber;
    }

    let addToNumber = checkNumber / 50

    clearInterval(counterIntervals[prefix]);

    if(divnumber > number){
        counterIntervals[prefix] = setInterval(function(){
            divnumber = divnumber - addToNumber;
            div.text(after+divnumber.toFixed(toFixed))
            if(divnumber <= number){
                div.text(after+number.toFixed(toFixed))
                clearInterval(counterIntervals[prefix]);
            }
        },50)
    }else if(divnumber < number){
        counterIntervals[prefix] = setInterval(function(){
            divnumber = divnumber + addToNumber;
            div.text(after+divnumber.toFixed(toFixed))
            if(divnumber >= number){
                div.text(after+number.toFixed(toFixed))
                clearInterval(counterIntervals[prefix]);
            }
        },50)
    }else{
        div.text(after+number.toFixed(toFixed))
    }
}

MultiLoginCheckANdAutoLogout = function(accountId){
    setInterval(function(){
        $.ajax({
            url:'notifications',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                lastSeen:true,
            }
        });
    },60000 * 5);
}
MultiLoginCheckANdAutoLogout();

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


//
