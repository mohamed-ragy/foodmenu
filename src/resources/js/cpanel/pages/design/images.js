

require('./imgs/imgs.js') //done
require('./imgs/uploadImg.js') //done
require('./imgs/imgBrowser.js') //done


resetStorageBar = function(){
    let planStorage = window.plans[website.plan].storage
    let currentStorage = 0;
    for(const key in imgs){
        currentStorage = currentStorage + imgs[key].size;
    }
    currentStorage = (currentStorage /1024 /1024).toFixed(2);
    let storagePercent = (currentStorage / planStorage *100).toFixed(2);

    $('.imgs-storageBar-currentStorage').text(currentStorage);
    $('.imgs-storageBar-planStorage').text(planStorage);
    $('.storageBarinside').css({width:storagePercent+'%'});
    if(storagePercent == 0 ){
        $('.storageBarinside').css({'background-image':'transparent'});
        $('.storageBarinside').css({'color':'var(--c1txt)'});
    }
    else if(storagePercent > 0 && 50 >= storagePercent ){
        $('.storageBarinside').css({'background-image':'var(--bgbr-green)'});
        $('.storageBarinside').css({'color':'var(--green-txt)'});
    }
    else if(storagePercent > 50 && 85 >= storagePercent ){
        $('.storageBarinside').css({'background-image':'var(--bgbr-orange)'});
        $('.storageBarinside').css({'color':'var(--orange-txt)'});
    }
    else if(storagePercent > 85 && 100 >= storagePercent ){
        $('.storageBarinside').css({'background-image':'var(--bgbr-red)'});
        $('.storageBarinside').css({'color':'var(--red-txt)'});
    }
}
resetStorageBar();
