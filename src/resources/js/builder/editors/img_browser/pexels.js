request_pexels_search = function(search,page){
    $('#imgBrowser_imgs_container_pexels').text('');
    draw_imgBrowser_loading_imgs('pexels');
    $('.imgBrowser_pexels_pagination').removeClass('none');
    $('.imgBrowser_pexels_pagination_prev').addClass('imgBrowser_pexels_pagination_arrow_dump')
    $('.imgBrowser_pexels_pagination_next').addClass('imgBrowser_pexels_pagination_arrow_dump')
    let orientation = get_dummy_val($('.pexels_filters_orientation')) ?? ''
    let size = get_dummy_val($('.pexels_filters_size')) ?? ''
    let color = '';
    if($('.pexels_filters_color_container').attr('key') == 'color'){
        color = get_dummy_val($('.pexels_filters_color'))
        let color_nmae = color.replace('rgba(var(--','').replace('),1)','');
        color = window.template.website_colors.colors[color_nmae];
        if(typeof(color) === 'undefined'){
            color = window.template.website_colors.custom_colors[color_nmae]
        }
        color = rgbToHex(`rgb(${color.r},${color.g},${color.b})`).replace('#','');
    }
    $.ajax({
        url:'/imgs',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            search_pexels:search,
            page:page,
            orientation:orientation,
            size:size,
            color:color,
        },success:function(r){
            window.pexels_search_last = search;
            hideBtnLoading($('#imgBrowser_pexels_search_btn'))
            $('.popupBody').scrollTop(0)
            $('.imgBrowser_pexels_pagination_prev').removeClass('imgBrowser_pexels_pagination_arrow_dump')
            $('.imgBrowser_pexels_pagination_next').removeClass('imgBrowser_pexels_pagination_arrow_dump')
            window.pexels_search_results = r.imgs.photos;
            window.pexels_search_page = r.imgs.page;
            if(r.imgs.page == 1){$('.imgBrowser_pexels_pagination_prev').addClass('imgBrowser_pexels_pagination_arrow_dump')}
            if(r.imgs.page == Math.ceil(r.imgs.total_results / 80)){$('.imgBrowser_pexels_pagination_next').addClass('imgBrowser_pexels_pagination_arrow_dump')}
            $('#imgBrowser_imgs_container_pexels').text('');
            if(r.imgs.photos.length == 0 && r.imgs.page == 1){
                $('.imgBrowser_pexels_pagination').addClass('none');
                $('#imgBrowser_imgs_container_pexels').append(
                    $('<div/>',{class:'m10',text:texts.noResults})
                )
            }else{
                $('.imgBrowser_pexels_pagination_page_num').text(texts.pagination_page.replace(':page:',r.imgs.page).replace(':pages:',Math.ceil(r.imgs.total_results / 80)))
                for(const key in r.imgs.photos){
                    appendToImgBrowser_pexels(r.imgs.photos[key])
                }
            }

        }
    })
}
add_pexel_image_to_library = function(img_id,callback=()=>{}){
    let img = window.pexels_search_results.find(item=>item.id == img_id);
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
            console.log(r)
            if(r.code == 1){
                showAlert('success',texts.responses.imageAddToLibrary,4000,true);
                window.imgs.push(r.img);
                window.imgs.sort((a,b)=>{
                    return b.created_at - a.created_at;
                })
                let img = window.imgs.find(item=>item.id == r.img.id);
                appendToImgBrowser_storage(img,'prepend')
                callback(img);
            }else if(r.code == 0){
                showAlert('error',texts.responses.imageAddToLibraryFail,4000,true);
            }else if(r.code == 2){
                showAlert('error',texts.responses.imageAddToLibraryFail_noSpace,4000,true);
            }
        }
    })
}
appendToImgBrowser_pexels = function(img){

    let imgInfo = $('<div/>',{class:'w300 pY10 column alnS jstfyS fs08'}).append(
        $('<div/>',{class:'row mX5'}).append(
            $('<div/>',{class:'bold',text:`${texts.dimensions}: `}),
            $('<div/>',{class:'mX3',text:`${img.width} x ${img.height}`})
        ),
        $('<div/>',{class:'row mX5'}).append(
            $('<span/>',{html:`This image was taken by <a href="${img.photographer_url}" target="_blank">${img.photographer}</a> on Pexels.`})
        )
    )
    $('#imgBrowser_imgs_container_pexels').append(
        $('<div/>',{class:'imgsImgCard_pexels',imgId:img.id}).append(
            $('<div/>',{class:'imgsImgCard_pexels_imgContainer'}).append(
                $('<img/>',{class:`w300 h300 ofContain mxw100p`,src:img.src.medium}),
                $('<div/>',{class:'imgsImgCard_pexels_btns'}).append(
                    $('<button/>',{class:'btn imgsImgCard_pexels_btn pexels_ToLibrary_save'}).append(
                        $('<div/>',{class:'btnLoading'}),
                        $('<div/>',{class:'btnTxt',text:texts.selectAndAddToLibrary})
                    ),
                    $('<button/>',{class:'btn imgsImgCard_pexels_btn pexels_ToLibrary'}).append(
                        $('<div/>',{class:'btnLoading'}),
                        $('<div/>',{class:'btnTxt',text:texts.AddToLibrary})
                    ),
                ),
            ),
            imgInfo,

        )
    )
}

//events
$('body').on('click','.pexels_search_filters_toggle',function(){
    if($(this).hasClass('pexels_search_filters_toggle_selected')){
        $(this).removeClass('pexels_search_filters_toggle_selected')
        $('.pexels_search_filters').addClass('none')
    }else{
        $(this).addClass('pexels_search_filters_toggle_selected')
        $('.pexels_search_filters').removeClass('none')
    }
})
$('body').on('change','.pexels_filters_color',function(){
    $('.pexels_filters_color_container').attr('key','color');
    $('.pexels_filters_color_txt').text('').append(
        $('<span/>',{class:'ico-close pexels_filters_remove_color pointer fs08 mie-10 cR'}),
        $('<span/>',{text:texts.website_style.remove_color})
    )
})
$('body').on('click','.pexels_filters_remove_color',function(){
    $('.pexels_filters_color_container').attr('key','allColors');
    $('.pexels_filters_color_txt').text(texts.allColors)
    set_dummy_color_picker($('.pexels_filters_color'),'--')
})

$('body').on('click','#imgBrowser_pexels_search_btn',function(e){
    if($('.pexels_search').val() == ''){
        showAlert('error',texts.responses.pexels_search_no_keywords,4000,true);
        $('.pexels_search').focus();
        return;
    }
    request_pexels_search($('.pexels_search').val(),1)
})
///
$('body').on('click','.imgBrowser_pexels_pagination_next',function(e){
    if($(this).hasClass('imgBrowser_pexels_pagination_arrow_dump')){return;}
    request_pexels_search(window.pexels_search_last,parseInt(window.pexels_search_page) + 1)
})
$('body').on('click','.imgBrowser_pexels_pagination_prev',function(e){
    if($(this).hasClass('imgBrowser_pexels_pagination_arrow_dump')){return;}
    request_pexels_search(window.pexels_search_last,parseInt(window.pexels_search_page) - 1)
})
//
$('body').on('click','.pexels_ToLibrary',function(e){
    showBtnLoading($('.pexels_ToLibrary_save'))
    showBtnLoading($('.pexels_ToLibrary'))
    add_pexel_image_to_library($(this).closest('.imgsImgCard_pexels').attr('imgId'))
})
$('body').on('click','.pexels_ToLibrary_save',function(e){
    showBtnLoading($('.pexels_ToLibrary_save'))
    showBtnLoading($('.pexels_ToLibrary'))
    add_pexel_image_to_library($(this).closest('.imgsImgCard_pexels').attr('imgId'),function(img){
        img_src = img.url;
        set_val(window.select_image_editor,img_src)
        new_action(window.select_image_editor.attr('render'));
        set_select_image(window.select_image_editor);
        $(`.${get_element_data(window.selected).class_selector}`).attr('src',img_src)
        close_popup();
    })
})
