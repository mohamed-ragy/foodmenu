
appendToImgBrowser = function(img,imgBrowserClass,append){
    let imgInfo;let photographer_elem;
    if(img.type == 'pexels'){
        photographer_elem = $('<div/>',{class:'row mX5 fs07 mB10'}).append(
            $('<span/>',{html:`This image was taken by <a href="${img.photographer_url}" target="_blank">${img.photographer}</a> on Pexels.`})
        )
    }
    if(img.id == null){
        imgInfo = $('<div/>',{class:'w200 pB10 column alnS jstfyS fs08'}).append(
            $('<div/>',{text:img.name,class:'ellipsis mX5'})
        )
    }else{
        imgInfo = $('<div/>',{class:'w200 pB10 column alnS jstfyS fs08'}).append(
            $('<div/>',{class:'w200 ellipsis'}).append(
                $('<a/>',{text:img.name,class:'mX5 previewImg',img:img.id,tooltip:img.name}),
            ),
            $('<div/>',{class:'row mX5'}).append(
                $('<div/>',{class:'bold',text:`${texts.design.dimensions}: `}),
                $('<div/>',{class:'mX3',text:`${img.width} x ${img.height}`})
            )
        )
    }
    if(append == 'append'){
        $('#imgsBrowserContainer').append(
            $('<div/>',{class:`imgsImgCard-imgBrowser`}).append(
                $('<img/>',{class:`${imgBrowserClass} w200 h200 ofContain mxw100p`,imgId:img.id ?? '',src:img.thumbnail_url}),
                photographer_elem,
                imgInfo
            )
        )
    }else if(append == 'prepend'){
        $('#imgsBrowserContainer').prepend(
            $('<div/>',{class:`imgsImgCard-imgBrowser`}).append(
                $('<img/>',{class:`${imgBrowserClass} w200 h200 ofContain mxw100p`,imgId:img.id ?? '',src:img.thumbnail_url}),
                photographer_elem,
                imgInfo
            )
        )
    }

}

showImgBrowser = function(title,imgBrowserClass,append='append'){
    showPopup('imgBrowser',function(){
        let img = {id:null,name:'',url:''};
        $('.popupTitle').text(title)
        if(imgBrowserClass == 'imgBrowser-icon'){
            img.name = texts.design.noimg;
            img.url ='storage/imgs/cpanel/noimg.png';
            img.thumbnail_url ='storage/imgs/cpanel/noimg.png';
            appendToImgBrowser(img,imgBrowserClass,'append')
        }else if(imgBrowserClass == 'imgBrowser-logo'){
            img.name = texts.design.noimg;
            img.url ='storage/imgs/cpanel/noimg.png';
            img.thumbnail_url ='storage/imgs/cpanel/noimg.png';
            appendToImgBrowser(img,imgBrowserClass,'append')
        }else{
            img.name = texts.design.noimg;
            img.url ='storage/imgs/cpanel/noimg.png';
            img.thumbnail_url ='storage/imgs/cpanel/noimg.png';
            appendToImgBrowser(img,imgBrowserClass,'append')
        }
        getImgs().then(function(){
            for(const key in website.imgs){
                let img = website.imgs[key];
                appendToImgBrowser(img,imgBrowserClass,'append')
            }
            if(website.imgs.length == 0){
                $('#imgBrowserNoImgs').removeClass('none')
            }else{
                $('#imgBrowserNoImgs').addClass('none')
            }
        });
        window.imgBrowser.opened = true;
        window.imgBrowser.title = title;
        window.imgBrowser.imgBrowserClass = imgBrowserClass;
    })

}

$('body').on('wheel','.popupBody',function(e){
    if(window.imgBrowser.opened  && window.imgs_getMore && !window.imgs_noMore && $('.img_browser_tab[tab="storage"]').hasClass('img_browser_tab_selected')){
        if($('.popupBody')[0].scrollHeight - $('.popupBody').scrollTop() < $('.popupBody').innerHeight() + 300){
            getImgs(true).then(function(imgs){
                for(const key in imgs){
                    appendToImgBrowser(imgs[key],window.imgBrowser.imgBrowserClass,'append')
                }
            });
        }
    }
})

$('body').on('click','#imgBrowser_loadMore',function(e){
    scrollToDiv($('.popupBody'),$('#imgsBrowserContainer').children().last())
    getImgs(true).then(function(imgs){
        for(const key in imgs){
            appendToImgBrowser(imgs[key],window.imgBrowser.imgBrowserClass,'append')
        }
    });
})
//
$('body').on('click','.img_browser_tab',function(e){
    $('.img_browser_tab').removeClass('img_browser_tab_selected');
    $(this).addClass('img_browser_tab_selected');
    $('.img_browser_tab_container').addClass('none');
    $(`.img_browser_tab_container[key="${$(this).attr('key')}"]`).removeClass('none')
})
//////////////////
/////pexels//////
/////////////////
request_pexels_search = function(search,page){
    $('#imgsBrowserContainer_pexels').text('');
    for(i=1;i<6;i++){
        $('#imgsBrowserContainer_pexels').append(
            $('<div/>',{class:'imgsImgCard_loading w300'}).append(
                $('<div/>',{class:'cardLoading w300 h300'}),
                $('<div/>',{}).append(
                    $('<div/>',{class:'cardLoading h10 w100 br5 relative m10'}),
                    $('<div/>',{class:'cardLoading h10 w200 br5 relative m10'}),
                    $('<div/>',{class:'cardLoading h10 w200 br5 relative m10'})
                )
            )
        )
    }
    showBtnLoading($('#imgBrowser_pexels_search_btn'))
    $('.imgBrowser_pexels_pagination').removeClass('none');
    $('.imgBrowser_pexels_pagination_prev').addClass('imgBrowser_pexels_pagination_arrow_dump')
    $('.imgBrowser_pexels_pagination_next').addClass('imgBrowser_pexels_pagination_arrow_dump')
    $.ajax({
        url:'/imgs',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            search_pexels:search,
            page:page,
            orientation:$('#pexels_search_orientation').attr('key'),
            size:$('#pexels_search_size').attr('key'),
            // color:window.pexels_filters_color,
        },success:function(r){
            hideBtnLoading($('#imgBrowser_pexels_search_btn'))
            $('.popupBody').scrollTop(0)
            $('.imgBrowser_pexels_pagination_prev').removeClass('imgBrowser_pexels_pagination_arrow_dump')
            $('.imgBrowser_pexels_pagination_next').removeClass('imgBrowser_pexels_pagination_arrow_dump')
            window.imgBrowser.pexels_search_results = r.imgs.photos;
            window.imgBrowser.pexels_search_page = r.imgs.page;
            if(r.imgs.page == 1){$('.imgBrowser_pexels_pagination_prev').addClass('imgBrowser_pexels_pagination_arrow_dump')}
            if(r.imgs.page == Math.ceil(r.imgs.total_results / 80)){$('.imgBrowser_pexels_pagination_next').addClass('imgBrowser_pexels_pagination_arrow_dump')}
            $('#imgsBrowserContainer_pexels').text('');
            if(r.imgs.photos.length == 0 && r.imgs.page == 1){
                $('.imgBrowser_pexels_pagination').addClass('none');
                $('#imgsBrowserContainer_pexels').append(
                    $('<div/>',{class:'m10',text:texts.design.noResults})
                )
            }else{
                $('.imgBrowser_pexels_pagination_page_num').text(texts.design.pagination_page.replace(':page:',r.imgs.page).replace(':pages:',Math.ceil(r.imgs.total_results / 80)))
                for(const key in r.imgs.photos){
                    appendToImgBrowser_pexels(r.imgs.photos[key])
                }
            }

        }
    })
}
appendToImgBrowser_pexels = function(img){
    let imgInfo = $('<div/>',{class:'w300 pY10 column alnS jstfyS fs08'}).append(
        $('<div/>',{class:'row mX5'}).append(
            $('<div/>',{class:'bold',text:`${texts.design.dimensions}: `}),
            $('<div/>',{class:'mX3',text:`${img.width} x ${img.height}`})
        ),
        $('<div/>',{class:'row mX5'}).append(
            $('<span/>',{html:`This image was taken by <a href="${img.photographer_url}" target="_blank">${img.photographer}</a> on Pexels.`})
        )
    )
    $('#imgsBrowserContainer_pexels').append(
        $('<div/>',{class:'imgsImgCard_pexels',imgId:img.id}).append(
            $('<div/>',{class:'imgsImgCard_pexels_imgContainer'}).append(
                $('<img/>',{class:`w300 h300 ofContain mxw100p`,src:img.src.medium}),
                $('<div/>',{class:'imgsImgCard_pexels_btns'}).append(
                    $('<button/>',{class:'btn imgsImgCard_pexels_btn pexels_ToLibrary_save'}).append(
                        $('<div/>',{class:'btnLoading'}),
                        $('<div/>',{class:'btnTxt',text:texts.design.selectAndAddToLibrary})
                    ),
                    $('<button/>',{class:'btn imgsImgCard_pexels_btn pexels_ToLibrary'}).append(
                        $('<div/>',{class:'btnLoading'}),
                        $('<div/>',{class:'btnTxt',text:texts.design.AddToLibrary})
                    ),
                ),
            ),
            imgInfo,

        )
    )
}
add_pexel_image_to_library = function(img_id,callback=()=>{}){
    let img = window.imgBrowser.pexels_search_results.find(item=>item.id == img_id);
    if(typeof(img) === 'undefined'){return;}
    $.ajax({
        url:'/imgs',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            add_pexel_img:true,
            img_url:img.src.original,
            photographer:img.photographer,
            photographer_url:img.photographer_url,
        },success:function(r){
            hideBtnLoading($('.pexels_ToLibrary_save'))
            hideBtnLoading($('.pexels_ToLibrary'))
            if(r.code == 1){
                showAlert('success',texts.design.imageAddToLibrary,4000,true);
                website.imgs.push(r.img);
                website.imgs.sort((a,b)=>{
                    return b.created_at - a.created_at;
                })
                let img = website.imgs.find(item=>item.id == r.img.id);
                appendToImgBrowser(img,window.imgBrowser.imgBrowserClass,'prepend')
                callback(img);
            }else if(r.code == 0){
                showAlert('error',texts.design.imageAddToLibraryFail,4000,true);
            }else if(r.code == 2){
                showAlert('error',texts.design.imageAddToLibraryFail_noSpace,4000,true);
            }
        }
    })
}
//events
$('body').on('click','#imgBrowser_pexels_search_btn',function(e){
    if($('.pexels_search').val() == ''){return;}
    request_pexels_search($('.pexels_search').val(),1)
})
$('body').on('click','.imgBrowser_pexels_pagination_next',function(e){
    if($(this).hasClass('imgBrowser_pexels_pagination_arrow_dump')){return;}
    request_pexels_search($('.pexels_search').val(),parseInt(window.imgBrowser.pexels_search_page) + 1)
})
$('body').on('click','.imgBrowser_pexels_pagination_prev',function(e){
    if($(this).hasClass('imgBrowser_pexels_pagination_arrow_dump')){return;}
    request_pexels_search($('.pexels_search').val(),parseInt(window.imgBrowser.pexels_search_page) - 1)
})
$('body').on('click','.pexels_ToLibrary',function(e){
    showBtnLoading($('.pexels_ToLibrary_save'))
    showBtnLoading($('.pexels_ToLibrary'))
    add_pexel_image_to_library($(this).closest('.imgsImgCard_pexels').attr('imgId'))
})
$('body').on('click','.pexels_ToLibrary_save',function(e){
    showBtnLoading($('.pexels_ToLibrary_save'))
    showBtnLoading($('.pexels_ToLibrary'))
    add_pexel_image_to_library($(this).closest('.imgsImgCard_pexels').attr('imgId'),function(img){
        $(`.${window.imgBrowser.imgBrowserClass}[imgId="${img.id}"]`).trigger('click');
    })
})
