draw_editor_popup_header_iconsList = function(){
    if(!accessibility_check(window.selected,'header_iconsList')){return;}
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:false,
                editors:[
                        $('<div/>',{class:'w100p editor_popup_container',key:'header_iconsList'}).append(
                                draw_editor_show_container({
                                    key:'header_iconsList_manage',
                                    name:texts.styling.manage_icons,
                                    row_class:true,
                                    container_class:'editor_popup_brdrT_none'
                                }),
                                draw_editor_show_container({
                                    key:'header_iconsList_icons_color',
                                    name:texts.styling.icon_color,
                                    row_class:true,
                                }),
                                $('<div/>',{class:'editor_popup_col'}).append(
                                    $('<div/>',{class:'fs09',text:texts.styling.gap_between_icons}),
                                    draw_number_picker({
                                        key_tree:window.selected,
                                        variable_key:'css',
                                        key:'gap',
                                        units:['px'],
                                        step:1,
                                    })
                                ),
                        ),
                        $('<div/>',{class:'w100p editor_popup_container none',key:'header_iconsList_icons_color',parent_key:'header_iconsList'}).append(
                            draw_editors_container({
                                is_responsive:false,
                                interactions:['hover','click'],
                                editors:[
                                    $('<div/>',{class:'editor_popup_row editor_popup_brdrT_none'}).append(
                                        $('<div/>',{class:'fs09',text:texts.styling.icon_color}),
                                        draw_color_picker({
                                            key_tree:'website_header.children.header_wrapper.children.header_iconsList.children.header_iconsList_icon',
                                            variable_key:'css',
                                            key:'fill',
                                            editor_class:'header_iconsList_icon_color',
                                        })
                                    )
                                ]
                            })
                        ),
                        $('<div/>',{class:'w100p editor_popup_container none',key:'header_iconsList_manage',parent_key:'header_iconsList'}).append(
                            $('<div>',{class:'edit_header_iconsList_container'})
                        ),
                        $('<div/>',{class:'w100p editor_popup_container none',key:'header_iconsList_header_cart',parent_key:'header_iconsList_manage'}).append(
                            $('<div/>',{class:'editor_popup_row editor_popup_brdrT_none'}).append(
                                $('<div/>',{class:'fs09',text:texts.styling.icon}),
                                draw_svg_icon_picker({  
                                    key_tree:`website_header.children.header_wrapper.children.header_iconsList.children.header_cart.children`,
                                    variable_key:null,
                                    key:'icon',
                                    icon_type:'cart',
                                }),
                            ),
                            $('<div/>',{class:'editor_popup_col'}).append(
                                $('<div/>',{class:'fs09',text:texts.styling.icon_size}),
                                draw_select_range({
                                    key_tree:`website_header.children.header_wrapper.children.header_iconsList.children.header_cart.children.icon`,
                                    variable_key:'css',
                                    key:'width',
                                    range:{min:10,max:50,step:1},
                                    unit:'px',
                                })
                            ),
                            $('<div/>',{class:'editor_popup_row'}).append(
                                $('<div/>',{class:'fs09',text:texts.styling.cart_items_number}),
                                draw_select_box({
                                    key_tree:`website_header.children.header_wrapper.children.header_iconsList.children.header_cart.children.header_icon_cart_num`,
                                    variable_key:'css',
                                    key:'display',
                                    selections:[{text:texts.styling.show,key:'inline',show_elem:'edit_header_icon_cart_num_container'},{text:texts.styling.hide,key:'none',hide_elem:'edit_header_icon_cart_num_container'}]
                                })
                            ),
                            $('<div/>',{class:'editor_popup_row edit_header_icon_cart_num_container'}).append(
                                $('<div/>',{class:'fs09',text:texts.styling.cart_items_number_color}),
                                draw_color_picker({
                                    key_tree:`website_header.children.header_wrapper.children.header_iconsList.children.header_cart.children.header_icon_cart_num`,
                                    variable_key:'css',
                                    key:'color',
                                })
                            ),
                            $('<div/>',{class:'editor_popup_col edit_header_icon_cart_num_container'}).append(
                                $('<div/>',{class:'fs09',text:texts.styling.cart_items_number_size}),
                                draw_select_range({
                                    key_tree:`website_header.children.header_wrapper.children.header_iconsList.children.header_cart.children.header_icon_cart_num`,
                                    variable_key:'css',
                                    key:'font-size',
                                    range:{min:10,max:20,step:1},
                                    unit:'px',
                                })
                            ),
                        ),
                        $('<div/>',{class:'w100p editor_popup_container none',key:'header_iconsList_header_user',parent_key:'header_iconsList_manage'}).append(
                            $('<div/>',{class:'editor_popup_row editor_popup_brdrT_none'}).append(
                                $('<div/>',{class:'fs09',text:texts.styling.icon}),
                                draw_svg_icon_picker({
                                    key_tree:`website_header.children.header_wrapper.children.header_iconsList.children.header_user.children`,
                                    variable_key:null,
                                    key:'icon',
                                    icon_type:'user',
                                }),
                            ),
                            $('<div/>',{class:'editor_popup_col'}).append(
                                $('<div/>',{class:'fs09',text:texts.styling.icon_size}),
                                draw_select_range({
                                    key_tree:`website_header.children.header_wrapper.children.header_iconsList.children.header_user.children.icon`,
                                    variable_key:'css',
                                    key:'width',
                                    range:{min:10,max:50,step:1},
                                    unit:'px',
                                })
                            ),
                        ),
                        $('<div/>',{class:'w100p editor_popup_container none',key:'header_iconsList_header_language',parent_key:'header_iconsList_manage'}).append(
                            $('<div/>',{class:'editor_popup_row editor_popup_brdrT_none'}).append(
                                $('<div/>',{class:'fs09',text:texts.styling.icon}),
                                draw_svg_icon_picker({
                                    key_tree:`website_header.children.header_wrapper.children.header_iconsList.children.header_language.children`,
                                    variable_key:null,
                                    key:'icon',
                                    icon_type:'language',
                                })
                            ),
                            $('<div/>',{class:'editor_popup_col'}).append(
                                $('<div/>',{class:'fs09',text:texts.styling.icon_size}),
                                draw_select_range({
                                    key_tree:`website_header.children.header_wrapper.children.header_iconsList.children.header_language.children.icon`,
                                    variable_key:'css',
                                    key:'width',
                                    range:{min:10,max:50,step:1},
                                    unit:'px',
                                })
                            ),
                        ),
                    ]
                })
        )
    })
    setTimeout(()=>{
        draw_edit_header_iconsList();
        $('.editor_popup_title2').text('')
        $(`.editor_popup_body_shortcut.editor_header_iconsList`).addClass('editor_popup_body_shortcut_selected')
    });
}
$('body').on('click','.editor_header_iconsList',function(e){
    if(window.current_view !== 'desktop'){
        desktop_view();
    }
    draw_editor_popup_header_iconsList();
})
draw_edit_header_iconsList = function(){
    let sorted_header_iconList = Object.entries(window.template.website_header.children.header_wrapper.children.header_iconsList.children).sort(function(a,b){
        return parseInt(a[1].attr.sort) - parseInt(b[1].attr.sort);
    });
    $('.edit_header_iconsList_container').text('');
    for(const key in sorted_header_iconList){
        
        let icon_key = sorted_header_iconList[key][0];
        let icon = sorted_header_iconList[key][1];
        let sort = icon.attr.sort;
        if(icon_key != 'header_iconsList_icon'){
            $('.edit_header_iconsList_container').append(
                $('<div/>',{class:'editor_popup_row editor_popup_show_container pointer',key:`header_iconsList_${icon_key}`}).append(
                    $('<div/>',{class:'row alnC jstfyS'}).append(
                        $('<div/>',{class:'ico-drag mie-10 c_white-11 fs101 cursorMove header_icon_list_sorter',icon_sort:sort,key_tree:`website_header.children.header_wrapper.children.header_iconsList.children.${icon_key}.attr`}),
                        $('<div/>',{class:'fs09',text:texts.styling[icon_key]}),
                    ),
                    $('<div/>',{class:'ico-arrowRight'})
                ),
            )
        }
    }
    $('.edit_header_iconsList_container').find('.editor_popup_row').first().addClass('editor_popup_brdrT_none');
    set_all_editors()
}
$('body').on('mousedown','.header_icon_list_sorter',function(e){
    if($('.header_icon_list_sorter_div').length == 0){
        $('.edit_header_iconsList_container').append(
            $('<div/>',{class:'header_icon_list_sorter_div',icon_sort:$(this).attr('icon_sort'),style:''}).append(
                $(this).closest('.editor_popup_row').html()
            )
        )
        $('.header_icon_list_sorter_div').css({'top':(parseFloat(e.pageY) - parseFloat($('.edit_header_iconsList_container').offset().top) - 15)+'px'})
    }
})
$('body').on('mousemove','.edit_header_iconsList_container',function(e){
    if($('.header_icon_list_sorter_div').length > 0){
        $('.header_icon_list_sorter_div').css({'top':(parseFloat(e.pageY) - parseFloat($('.edit_header_iconsList_container').offset().top) - 15)+'px'})
    }
})
$('body').on('mouseleave','.edit_header_iconsList_container',function(e){
    if($('.header_icon_list_sorter_div').length > 0){
        $('.header_icon_list_sorter_div').remove();
    }
})
$('body').on('mouseup','.edit_header_iconsList_container',function(e){
    if($('.header_icon_list_sorter_div').length == 0){return;}
    try{
        let from_key_tree = $('.header_icon_list_sorter_div').find('.header_icon_list_sorter').attr('key_tree');
        let from_sort = $('.header_icon_list_sorter_div').find('.header_icon_list_sorter').attr('icon_sort');
        let to_key_tree;
        let to_sort;
        $('.edit_header_iconsList_container').children().each(function(e){
            if($(this).offset().top < $('.header_icon_list_sorter_div').offset().top && (parseFloat($(this).offset().top) + parseFloat($(this).outerHeight())) > $('.header_icon_list_sorter_div').offset().top){
                to_key_tree = $(this).find('.header_icon_list_sorter').attr('key_tree');
                to_sort = $(this).find('.header_icon_list_sorter').attr('icon_sort');
            }
        })
        get_element_data(from_key_tree).sort = to_sort;
        get_element_data(to_key_tree).sort = from_sort;
        $('.header_icon_list_sorter_div').remove();
        new_action('','header');
        draw_edit_header_iconsList();
    }catch{
        $('.header_icon_list_sorter_div').remove();
    }
})
//
$('body').on('change','.header_iconsList_icon_color',function(){
    let editor = $(this);
    let val = get_editor_val(editor)
    editor.attr('key','stroke');
    set_val(editor,val);
    editor.attr('key','color');
    set_val(editor,val);
    editor.attr('key','fill');
    new_action(editor.attr('key_tree'),'header');

})
// 