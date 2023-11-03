require('./imgs/storageBar.js') //done
require('./imgs/imgs.js') //done
require('./imgs/uploadImg.js') //done
require('./imgs/imgBrowser.js') //done


getImgs = function(){
    return new Promise(function(resolve,reject){
        if(!window.imgs_getMore || window.imgs_noMore ){resolve();return}
        window.imgs_getMore = false;
        $.ajax({
            url:'/imgs',
            type:'post',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                getImgs:true,
                skip:website.imgs.length,
            },
            success:function(r){
                if(r.imgs.length == 0){window.imgs_noMore = true;}
                for(const key in r.imgs){
                    website.imgs.push(r.imgs[key])
                }
                resolve(r.imgs);
            }
        }).done(function(){window.imgs_getMore = true;})
    })

}

$('#bodyPage').on('scroll',function(e){
    if(window.history.state.page == 'images' && window.imgs_getMore && !window.imgs_noMore){
        if($('#bodyPage')[0].scrollHeight - $('#bodyPage').scrollTop() < $('#bodyPage').innerHeight() + 100){
            getImgs().then(function(imgs){
                for(const key in imgs){
                    drawImg(imgs[key])
                }
            });
        }
    }
})
