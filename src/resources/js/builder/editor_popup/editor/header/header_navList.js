draw_editor_popup_header_navList = function(){
    if(!accessibility_check(window.selected,'header_navList')){return;}
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            $('<div/>',{class:'w100p editor_popup_container',key:'header_navList'}).append(
                draw_editors_container({
                    is_responsive:false,
                    editors:[
                        draw_editor_show_container({
                            key:'header_navList_manage',
                            name:texts.styling.manage_items,
                            row_class:true,
                            container_class:'editor_popup_brdrT_none'
                        }),
                        draw_editor_show_container({
                            key:'header_navList_items_style',
                            name:texts.styling.items_style,
                            row_class:true,
                        }),
                        $('<div/>',{class:'editor_popup_col'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.gap_between_items}),
                            draw_number_picker({
                                key_tree:'website_header.children.header_wrapper.children.header_navList',
                                variable_key:'css',
                                key:'gap',
                                units:['px'],
                                step:1,
                            })
                        ),
                    ]
                })
            ),
            $('<div/>',{class:'w100p editor_popup_container none',key:'header_navList_items_style',parent_key:'header_navList'}).append(
                draw_editors_container({
                    is_responsive:false,
                    interactions:['hover','click'],
                    editors:[
                        draw_editor_show_container({
                            key:'header_navList_font_style',
                            name:texts.styling.font_style,
                            row_class:true,
                            container_class:'editor_popup_brdrT_none'
                        }),
                        $('<div/>',{class:'editor_popup_row'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.font_color}),
                            draw_color_picker({
                                key_tree:'website_header.children.header_wrapper.children.header_navList.children.header_navList_item',
                                variable_key:'css',
                                key:'color',
                            })
                        ),
                        $('<div/>',{class:'editor_popup_col'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.font_size}),
                            draw_number_picker({
                                key_tree:'website_header.children.header_wrapper.children.header_navList.children.header_navList_item',
                                variable_key:'css',
                                key:'font-size',
                                units:['px','em'],
                                step:1,
                            }),
                        ),
                        $('<div/>',{class:'editor_popup_col'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.font_weight}),
                            draw_select_box({
                                key_tree:'website_header.children.header_wrapper.children.header_navList.children.header_navList_item',
                                variable_key:'css',
                                key:'font-weight',
                                selections:[{text:texts.styling.bold,key:'bold'},{text:texts.styling.normal,key:'normal'}],
                            })
                        ),
                        $('<div/>',{class:'editor_popup_col'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.italic}),
                            draw_select_box({
                                key_tree:'website_header.children.header_wrapper.children.header_navList.children.header_navList_item',
                                variable_key:'css',
                                key:'font-style',
                                selections:[{text:texts.styling.italic,key:'italic'},{text:texts.styling.normal,key:'normal'}],
                            })
                        ),
                        $('<div/>',{class:'editor_popup_col'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.underline}),
                            draw_select_box({
                                key_tree:'website_header.children.header_wrapper.children.header_navList.children.header_navList_item',
                                variable_key:'css',
                                key:'text-decoration',
                                selections:[{text:texts.styling.underline,key:'underline'},{text:texts.styling.normal,key:'none'}],
                            })
                        ),
                    ]
                })
            ),
            $('<div/>',{class:'w100p editor_popup_container none',key:'header_navList_manage',parent_key:'header_navList'}).append(
                draw_editors_container({
                    is_responsive:false,
                    editors:[
                        $('<div>',{class:'edit_header_navList_container'})
                    ]
                })
            ),
            $('<div/>',{class:'w100p editor_popup_container none',key:'header_navList_font_style',parent_key:'header_navList_items_style'}).append(
                draw_editors_container({
                    is_responsive:false,
                    editors:[
                        draw_font_style_picker({
                            key_tree:'website_header.children.header_wrapper.children.header_navList',
                            variable_key:'font_style',
                        })
                    ]
                })

            )
        )
    })
    setTimeout(()=>{
        draw_edit_header_navList();
        $('.editor_popup_title2').text('')
        $(`.editor_popup_body_shortcut.editor_header_navList`).addClass('editor_popup_body_shortcut_selected')
    });
}
$('body').on('click','.editor_header_navList',function(e){
    if(window.current_view !== 'desktop'){
        desktop_view();
    }
    draw_editor_popup_header_navList();
})

draw_edit_header_navList = function(){
    let sorted_header_navList = Object.entries(window.template.website_header.children.header_wrapper.children.header_navList.children).sort(function(a, b) {
        return parseInt(a[1].attr.sort) - parseInt(b[1].attr.sort);
    });
    $('.edit_header_navList_container').text('');
    for(const key in sorted_header_navList){
        let item_key = sorted_header_navList[key][0];
        let item = sorted_header_navList[key][1];
        let sort = item.attr.sort;
        if(item_key != 'header_navList_item' && item_key != 'header_list_see_more' ){
            $('.edit_header_navList_container').append(
                $('<div/>',{class:'editor_popup_row pX5 pY10'}).append(
                    $('<div/>',{class:'row alnC jstfyC fs09'}).append(
                        $('<div/>',{class:'ico-drag mie-10 c_white-11 fs101 cursorMove header_nav_list_sorter',item_sort:sort,key_tree:`website_header.children.header_wrapper.children.header_navList.children.${item_key}.attr`}),
                        $('<div/>',{text:texts.styling[item_key]}),
                    ),
                    draw_select_box({
                        key_tree:`website_header.children.header_wrapper.children.header_navList.children.${item_key}.css`,
                        variable_key:null,
                        key:'display',
                        selections:[{text:texts.styling.show,key:'block'},{text:texts.styling.hide,key:'none'}],
                        editor_class:'wA'
                    })
                )
            )
        }
        $('.edit_header_navList_container').find('.editor_popup_row').first().addClass('editor_popup_brdrT_none')
    }
    set_all_editors()
}
//
$('body').on('mousedown','.header_nav_list_sorter',function(e){
    if($('.header_nav_list_sorter_div').length == 0){
        $('.edit_header_navList_container').append(
            $('<div/>',{class:'header_nav_list_sorter_div',item_sort:$(this).attr('item_sort'),style:''}).append(
                $(this).closest('.editor_popup_row').html()
            )
        )
        $('.header_nav_list_sorter_div').css({'top':(parseFloat(e.pageY) - parseFloat($('.edit_header_navList_container').offset().top) - 15)+'px'})
    }
})
$('body').on('mousemove','.edit_header_navList_container',function(e){
    if($('.header_nav_list_sorter_div').length > 0){
        $('.header_nav_list_sorter_div').css({'top':(parseFloat(e.pageY) - parseFloat($('.edit_header_navList_container').offset().top) - 15)+'px'})
    }
})
$('body').on('mouseleave','.edit_header_navList_container',function(e){
    if($('.header_nav_list_sorter_div').length > 0){
        $('.header_nav_list_sorter_div').remove();
    }
})
$('body').on('mouseup','.edit_header_navList_container',function(e){
    if($('.header_nav_list_sorter_div').length == 0){return;}
    try{
        let from_key_tree = $('.header_nav_list_sorter_div').find('.header_nav_list_sorter').attr('key_tree');
        let from_sort = $('.header_nav_list_sorter_div').find('.header_nav_list_sorter').attr('item_sort');
        let to_key_tree;
        let to_sort;
        $('.edit_header_navList_container').children().each(function(e){
            if($(this).offset().top < $('.header_nav_list_sorter_div').offset().top && (parseFloat($(this).offset().top) + parseFloat($(this).outerHeight())) > $('.header_nav_list_sorter_div').offset().top){
                to_key_tree = $(this).find('.header_nav_list_sorter').attr('key_tree');
                to_sort = $(this).find('.header_nav_list_sorter').attr('item_sort');
            }
        })
        get_element_data(from_key_tree).sort = to_sort;
        get_element_data(to_key_tree).sort = from_sort;
        $('.header_nav_list_sorter_div').remove();
        new_action('','header');
        draw_edit_header_navList();
    }catch{
        $('.header_nav_list_sorter_div').remove();
    }

})