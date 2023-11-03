getImagesStorage = function(force=false){
    return new Promise(function(resolve,reject){
        if(website.imgs_storage != null && !force){return resolve(website.imgs_storage)}
        $.ajax({
            url: '/imgs',
            type: 'post',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                gitStorageSize:true,
            },
            success:function(r){
                return resolve(r)
            }
        })
    })

}
resetStorageBar = function(){
    getImagesStorage().then(function(currentStorage){
        let planStorage = window.plans[website.plan].storage
        currentStorage = (currentStorage /1024 /1024).toFixed(2);
        let storagePercent = (currentStorage / planStorage *100).toFixed(2);

        $('.imgs-storageBar-currentStorage').text(currentStorage);
        $('.imgs-storageBar-planStorage').text(planStorage);
        $('.storageBarinside').css({width:storagePercent+'%'});
        $('.storageBarinside').removeClass('bgc_O bgc_R bgc_G');
        if(storagePercent > 0 && 50 >= storagePercent ){
            $('.storageBarinside').addClass('bgc_G')
        }else if(storagePercent > 50 && 85 >= storagePercent ){
            $('.storageBarinside').addClass('bgc_O')
        }else if(storagePercent > 85 && 100 >= storagePercent ){
            $('.storageBarinside').addClass('bgc_R')
        }
    })

}
