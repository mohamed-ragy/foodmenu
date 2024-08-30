// 
$('body').on('click','.select_image',function(e){
    draw_editor_popup_image();
    $('#editor').find('.editor_image_select_image').find('.select_image_editor_image').trigger('click');
})
//
draw_select_image = function(data){
    let editor = $('<div/>',{
        class:`editor select_image_editor ${data.editor_class ?? ''}`,
        key_tree:data.key_tree,
        variable_key:data.variable_key,
        key:data.key,
        render:data.render ?? '',
        generate_style:data.generate_style ?? data.key_tree,
    }).append(
        $('<img/>',{class:'select_image_editor_image'}),
        $('<div/>',{class:'ico-edit select_image_editor_icon'})
    )

    return editor;
}
set_select_image = function(editor){
    let val = get_editor_val(editor);
    if(val == '--'){
        editor.find('.select_image_editor_image').attr('src','/storage/imgs/cpanel/noimg.png')
    }else{
        editor.find('.select_image_editor_image').attr('src',val.replace('.','_thumbnail.'))
    }
}
//
show_select_image_popup = function(){
    show_popup(function(){
        $('.popupTitle').text(window.texts.selectImg)
        $('.popupBody').addClass('').text('').append(
            $('<div/>',{class:'tabs_container'}).append(
                $('<div/>',{text:texts.myLibrary,class:'tab tab_selected',tab:'img_browser_user_storage'}),
                $('<div/>',{text:texts.freeImgs,class:'tab',tab:'img_browser_pexels'}),
            ),
            $('<div/>',{class:'tab_content',tab_content:'img_browser_user_storage'}).append(
                $('<div/>',{class:'w100p-20 row alnC jstfyE m10'}).append(
                    $('<button/>',{class:'btn imgs-uploadImgBtn'}).append(
                        $('<div/>',{class:'btnLoading'}),
                        $('<div/>',{class:'btnTxt',text:texts.uploadImg})
                    ),
                ),
                $('<div/>',{class:'row wrap alnC jstfyC',id:'imgBrowser_imgs_container_storage'}),

                $('<div/>',{class:`w100p-20 row alnC jstfyE m10 ${window.imgs_noMore ? 'none' : ''}`}).append(
                    $('<a/>',{id:'imgs_loadMore',text:texts.load_more})
                )
            ),
            $('<div/>',{class:'tab_content none',tab_content:'img_browser_pexels'}).append(
                $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                    $('<div/>',{class:'w100p'}).append(
                        $('<div/>',{class:'pexels_search_container'}).append(
                            $('<div/>',{class:'ico-search pexels_search_icon'}),
                            $('<input/>',{class:'builder_font pexels_search mie-5',id:'pexels_search',placeholder:texts.pexels_search_placeholder}),
                        ),
                        $('<div/>',{class:'w100p-30 mX15 mY5 row alnC jstfySB'}).append(
                            $('<a/>',{href:'https://www.pexels.com',target:'_blank',class:'wFC mY5 row alnC jstfyS'}).append(
                                $('<img/>',{class:'br3 h20 w20 ofCover imgPL mie-5',src:'https://images.pexels.com/lib/api/pexels.png'}),
                                $('<div/>',{class:'fs08 tnw c_white-11',text:'Photos provided by Pexels'})
                            ),
                            $('<div/>',{class:'pexels_search_filters_toggle'}).append(
                                $('<div/>',{text:texts.filters}),
                                $('<div/>',{class:'ico-search_filters'}),
                            )
                        ),
                    ),
                    $('<button/>',{class:'btn mY0 mis-0',id:'imgBrowser_pexels_search_btn'}).append(
                        $('<div/>',{class:'btnLoading'}),
                        $('<div/>',{class:'btnTxt',text:texts.search})
                    ),
                ),
                $('<div/>',{class:'pexels_search_filters none'}).append(
                    draw_input_list({
                        dummy:true,
                        dummy_class:'pexels_filters_orientation',
                        selections:[
                            {name:texts.allOrientations,val:''},
                            {name:texts.landscape,val:'landscape'},
                            {name:texts.portrait,val:'portrait'},
                            {name:texts.square,val:'square'},
                        ]
                    }),
                    draw_input_list({
                        dummy:true,
                        dummy_class:'pexels_filters_size',
                        selections:[
                            {name:texts.allSizes,val:''},
                            {name:texts.large,val:'large'},
                            {name:texts.medium,val:'medium'},
                            {name:texts.small,val:'small'},
                        ]
                    }),
                    $('<div/>',{class:'pexels_filters_color_container',key:'allColors'}).append(
                        $('<div/>',{class:'mX3 pexels_filters_color_txt',text:texts.allColors}),
                        draw_color_picker({
                            dummy:true,
                            dummy_class:'pexels_filters_color',
                            alpha:false,
                        })
                    )
                ),
                $('<div/>',{class:'row wrap alnC jstfyC mY40',id:'imgBrowser_imgs_container_pexels'}),
                $('<div/>',{class:'row alnC jstfyC'}).append(
                    $('<div/>',{class:'imgBrowser_pexels_pagination none'}).append(
                        $('<div/>',{class:'imgBrowser_pexels_pagination_prev ico-arrowLeft'}),
                        $('<div/>',{class:'imgBrowser_pexels_pagination_page_num',text:''}),
                        $('<div/>',{class:'imgBrowser_pexels_pagination_next ico-arrowRight'}),
                    )
                )

            )
        )
        set_dummy_input_list($('.pexels_filters_orientation'),'')
        set_dummy_input_list($('.pexels_filters_size'),'')
        set_dummy_color_picker($('.pexels_filters_color'),'--')
        for(const key in window.imgs){
            appendToImgBrowser_storage(window.imgs[key],'append')
        }
        if(window.imgs.length == 0){
            getImgs();
        }
        window.is_imgBrowser_opened = true;
    });
}
$('body').on('click','.select_image_editor',function(e){
    window.pexels_search_last = '';
    window.select_image_editor = $(this);
    show_select_image_popup();
})
//
//
draw_imgBrowser_loading_imgs = function(type){
    let container;
    if(type == 'storage'){container = $('#imgBrowser_imgs_container_storage')}
    else if(type == 'pexels'){container = $('#imgBrowser_imgs_container_pexels')}
    for(i=1;i<6;i++){
        container.append(
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
}
$('body').on('click','.imgsImgCard',function(e){
    if($(this).find('.imgsimgBtns').is(':hover')){return;}
    let img_src = window.imgs.find(item=>item.id == $(this).find('img').attr('imgId')).url;
    set_val(window.select_image_editor,img_src)
    new_action(window.select_image_editor.attr('generate_style'),window.select_image_editor.attr('render'));
    $(`.${get_element_data(window.selected).class_selector}`).attr('src',img_src)
    set_select_image(window.select_image_editor);
    close_popup();
    window.select_image_editor.trigger('change');
    window.select_image_editor = null;
})
//
$('body').on('click','.copyImageLink',function(e){
    let imgUrl = window.imgs.find(item=>item.id == $(this).attr('img')).url
    navigator.clipboard.writeText(`https://${window.website_data.url}${imgUrl}`).then(function(){
        showAlert('normal',texts.copied,4000,true);
    });
});
//
$('body').on('click','.deleteImg',function(e){
     let img = window.imgs.find(item=> item.id == $(this).attr('img'));
     $('.popupContainer').append(
        $('<div/>',{class:'popupCard2'}).append(
            $('<div/>',{class:'popupHead'}).append(
                $('<div/>',{class:'popupTitle'}),
                $('<div/>',{class:'popupCloseStyle popup2Close ico-close'}),
            ),
            $('<div/>',{class:'popupBody'}).append(
                $('<div/>',{class:'msgBox_orange'}).append(
                    $('<span/>',{class:'fs103 taC bold',text:texts.imgDeleteConfirm,}),
                    $('<img/>',{src:img.thumbnail_url,class:'deleteImgConfirmImg'}),
                ),
                $('<div/>',{class:'w100p-20 row alnC jstfyE m10'}).append(
                    $('<button/>',{class:'btn btn-cancel popup2Close mie-5',text:texts.cancel}),
                    $('<button/>',{id:'deleteImage-confirmBtn',img:img.id,class:'btn btn-delete'}).append(
                        $('<span/>',{class:'btnTxt',text:texts.delete}),
                        $('<span/>',{class:'btnLoading'})
                    )
                )
            )
        )
    )
})
$('body').on('click','#deleteImage-confirmBtn',function(e){
    let imgId = $(this).attr('img');
    showBtnLoading($('#deleteImage-confirmBtn'))
    $.ajax({
        url: '/imgs',
        type: 'post',
        data:{
            _token : $('meta[name="csrf-token"]').attr("content"),
            deleteImg:true,
            imgId:imgId,
        },
        success:function(response){
            hideBtnLoading($('#deleteImage-confirmBtn'))
            if(response.deleteImgStatus == 1){
                showAlert('success',response.msg,4000,true);
                for(const key in window.imgs){
                    if(window.imgs[key].id == imgId){
                        window.imgs.splice(key,1);
                    }
                }
                $(`.imgsImgCard[imgId="${imgId}"]`).remove();
                $('.popup2Close').trigger('click');
            }else if(response.deleteImgStatus == 0){
                showAlert('error',response.msg,4000,true);
            }
        }
    });
})
