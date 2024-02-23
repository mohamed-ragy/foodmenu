require('./imgs/storageBar.js') //done//
require('./imgs/imgs.js') //done//
require('./imgs/uploadImg.js') //done//
require('./imgs/imgBrowser.js') //done//

getImg = function(img_id){
    return new Promise(function(resolve,reject){
        let img = website.imgs.find(item=>item.id == img_id);
        if(typeof(img) === 'undefined'){
            $.ajax({
                url:'/imgs',
                type:'post',
                data:{
                    _token:$('meta[name="csrf-token"]').attr('content'),
                    getImg:img_id,
                },
                success:function(r){
                    if(r.img == null){
                        reject();
                        return;
                    }else{
                        resolve(r.img);
                        return;
                    }
                }
            })
        }else{
            resolve(img);
            return;
        }
    })

}

getImgs = function(force=false){
    return new Promise(function(resolve,reject){
        if(website.imgs.length > 0 && !force){resolve();return}
        if(!window.imgs_getMore || window.imgs_noMore ){resolve();return}
        for(i=1;i<6;i++){
            $('#imgs_imgsContainer').append(
                $('<div/>',{class:'imgsImgCard_loading w300'}).append(
                    $('<div/>',{class:'cardLoading w300 h300'}),
                    $('<div/>',{}).append(
                        $('<div/>',{class:'cardLoading h10 w100 br5 relative m10'}),
                        $('<div/>',{class:'cardLoading h10 w200 br5 relative m10'}),
                        $('<div/>',{class:'cardLoading h10 w200 br5 relative m10'})
                    )
                )
            )
            $('#imgsBrowserContainer').append(
                $('<div/>',{class:'imgsImgCard_loading w200'}).append(
                    $('<div/>',{class:'cardLoading w200 h200'}),
                    $('<div/>',{}).append(
                        $('<div/>',{class:'cardLoading h10 w100 br5 relative m10'}),
                        $('<div/>',{class:'cardLoading h10 w150 br5 relative m10'}),
                        $('<div/>',{class:'cardLoading h10 w150 br5 relative m10'})
                    )
                )
            )
        }

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
                if(r.imgs.length == 0){
                    window.imgs_noMore = true;
                    $('#imgs_loadMore').addClass('none');
                    $('#imgBrowser_loadMore').addClass('none');
                }else{
                    $('#imgs_loadMore').removeClass('none');
                    $('#imgBrowser_loadMore').removeClass('none');
                }
                for(const key in r.imgs){
                    website.imgs.push(r.imgs[key])
                }
                $('.imgsImgCard_loading').remove('')
                resolve(r.imgs);
            }
        }).done(function(){window.imgs_getMore = true;})
    })

}

$('#bodyPage').on('scroll',function(e){
    if(window.history.state.page == 'images' && window.imgs_getMore && !window.imgs_noMore){
        if($('#bodyPage')[0].scrollHeight - $('#bodyPage').scrollTop() < $('#bodyPage').innerHeight() + 100){
            getImgs(true).then(function(imgs){
                for(const key in imgs){
                    drawImg(imgs[key])
                }
            });
        }
    }
})
$('html,body').on('click','#imgs_loadMore',function(e){
    e.stopImmediatePropagation();
    scrollToDiv($('#bodyPage'),$('#imgs_imgsContainer').children().last())
    getImgs(true).then(function(imgs){
        for(const key in imgs){
            drawImg(imgs[key])
        }
    });
})

//
