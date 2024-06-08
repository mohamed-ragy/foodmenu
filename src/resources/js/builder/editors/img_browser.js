
require('./img_browser/pexels.js')
require('./img_browser/user_storage.js')

draw_image_selector = function(keys_arr){
    let elem_data = get_key_tree(keys_arr[0].key_tree);
    let elem_val = get_elem_val(elem_data,keys_arr[0].key,'0')
    let selector;
    let selector_container =  $('<div/>',{class:`editor_popup_row selector_container`,is_responsive:'0'}).append(
        $('<div/>',{class:'fs09',text:texts.styling.image}),
        selector = $('<div/>',{class:'selector editor_popup_img_select select_img'}).append(
            $('<img/>',{class:'editor_popup_img_select_img',src:elem_val.val}),
            $('<div/>',{class:'ico-edit editor_popup_img_select_edit_icon'})
        )
    )

    for(const key in keys_arr){
        for(const key2 in keys_arr[key]){
            selector.attr(key2,keys_arr[key][key2]);
            selector.attr(key2,keys_arr[key][key2]);
        }
    }

    return selector_container;
}
set_image_selector = function(selector){
    let val = get_selector_val(selector);
    selector.find('.editor_popup_img_select_img').attr('src',val)

}
//
$('body').on('click','.select_img',function(e){
    //e.stopImmediatePropagation();
    window.pexels_search_last = '';
    let key_tree = $(this).attr('key_tree');
    let key = $(this).attr('key');
    show_popup(function(){
        window.pexels_filters_orientation = '';
        window.pexels_filters_size = '';
        window.pexels_filters_color = '';
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
                $('<div/>',{class:'row wrap alnC jstfyC',id:'imgBrowser_imgs_container_storage',key_tree:key_tree,key:key}),

                $('<div/>',{class:`w100p-20 row alnC jstfyE m10 ${window.imgs_noMore ? 'none' : ''}`}).append(
                    $('<a/>',{id:'imgs_loadMore',text:texts.load_more})
                )
            ),
            $('<div/>',{class:'tab_content none',tab_content:'img_browser_pexels',key_tree:key_tree,key:key}).append(
                $('<div/>',{class:'row alnS jstfyS w100p'}).append(
                    $('<div/>',{class:'w100p'}).append(
                        $('<div/>',{class:'pexels_search_container'}).append(
                            $('<div/>',{class:'ico-search pexels_search_icon'}),
                            $('<input/>',{class:'builder_font pexels_search mie-5',id:'pexels_search',placeholder:texts.pexels_search_placeholder}),
                        ),
                        $('<div/>',{class:'w100p row alnC jstfySB'}).append(
                            $('<a/>',{href:'https://www.pexels.com',target:'_blank',class:'wFC mY5 mX15 row alnC jstfyS'}).append(
                                $('<img/>',{class:'br3 h20 w20 ofCover imgPL mie-5',src:'https://images.pexels.com/lib/api/pexels.png'}),
                                $('<div/>',{class:'fs08 c_white-11',text:'Photos provided by Pexels'})
                            ),
                            $('<div/>',{class:'row alnC jstfyE mX10 mY5'}).append(
                                $('<div/>',{class:'inputList_container_no_action',id:'imgBrowser_pexels_filters_orientation',key:'pexels_filters_orientation'}).append(
                                    $('<div/>',{class:'inputList_container_no_action_selected',key:'pexels_filters_orientation',text:texts.allOrientations}),
                                    $('<div/>',{class:'ico-arrowDown'}),
                                    $('<div/>',{class:'none inputList_elems_temp'}).append(
                                        $('<div/>',{class:`inputList_elem_no_action`,text:texts.allOrientations,key:''}),
                                        $('<div/>',{class:`inputList_elem_no_action`,text:texts.landscape,key:'landscape'}),
                                        $('<div/>',{class:`inputList_elem_no_action`,text:texts.portrait,key:'portrait'}),
                                        $('<div/>',{class:`inputList_elem_no_action`,text:texts.square,key:'square'}),
                                    )
                                ),
                                $('<div/>',{class:'inputList_container_no_action mX5',key:'pexels_filters_size'}).append(
                                    $('<div/>',{class:'inputList_container_no_action_selected',key:'pexels_filters_size',text:texts.allSizes}),
                                    $('<div/>',{class:'ico-arrowDown'}),
                                    $('<div/>',{class:'none inputList_elems_temp'}).append(
                                        $('<div/>',{class:`inputList_elem_no_action`,text:texts.allSizes,key:''}),
                                        $('<div/>',{class:`inputList_elem_no_action`,text:texts.large,key:'large'}),
                                        $('<div/>',{class:`inputList_elem_no_action`,text:texts.medium,key:'medium'}),
                                        $('<div/>',{class:`inputList_elem_no_action`,text:texts.small,key:'small'}),
                                    )
                                ),
                                $('<div/>',{class:'pexels_search_color'}).append(
                                    $('<div/>',{class:'mX3 color_picker_pexels_search_txt',text:texts.allColors}),
                                    $('<div/>',{class:'color_picker_container mis-5'}).append(
                                        $('<input/>',{class:'color_picker color_picker_pexels_search none dummy_color_picker',type:'text',style:`background-color:transparent;`,value:''}),
                                    ),
                                )
                            )
                        ),
                    ),
                    $('<button/>',{class:'btn mY0 mis-0',id:'imgBrowser_pexels_search_btn'}).append(
                        $('<div/>',{class:'btnLoading'}),
                        $('<div/>',{class:'btnTxt',text:texts.search})
                    ),
                ),

                $('<div/>',{class:'row wrap alnC jstfyC mY40',id:'imgBrowser_imgs_container_pexels',key_tree:key_tree,key:key}),
                $('<div/>',{class:'row alnC jstfyC'}).append(
                    $('<div/>',{class:'imgBrowser_pexels_pagination none'}).append(
                        $('<div/>',{class:'imgBrowser_pexels_pagination_prev ico-arrowLeft'}),
                        $('<div/>',{class:'imgBrowser_pexels_pagination_page_num',text:''}),
                        $('<div/>',{class:'imgBrowser_pexels_pagination_next ico-arrowRight'}),
                    )
                )

            )
        )
        for(const key in window.imgs){
            appendToImgBrowser_storage(window.imgs[key],'append')
        }
        if(window.imgs.length == 0){
            getImgs();
        }
        window.is_imgBrowser_opened = true;
    });
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
    //e.stopImmediatePropagation();
    if($(this).find('.imgsimgBtns').is(':hover')){return;}
    let elem = get_key_tree($('#imgBrowser_imgs_container_storage').attr('key_tree')).elem;
    let img_src = window.imgs.find(item=>item.id == $(this).find('img').attr('imgId')).url;
    elem[$('#imgBrowser_imgs_container_storage').attr('key')] = img_src;
    new_action();
    close_popup();
})
//
$('body').on('click','.copyImageLink',function(e){
    //e.stopImmediatePropagation();
    let imgUrl = window.imgs.find(item=>item.id == $(this).attr('img')).url
    navigator.clipboard.writeText(`https://${website.url}${imgUrl}`).then(function(){
        showAlert('normal',texts.design.copyed,4000,true);
    });
});
//
$('body').on('click','.deleteImg',function(e){
    //e.stopImmediatePropagation();
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
    //e.stopImmediatePropagation();
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
