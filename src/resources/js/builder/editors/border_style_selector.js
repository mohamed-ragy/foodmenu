draw_border_style_selector = function(data){
    return '';
    let elem_data = get_key_tree(data.key_tree);
    let show_selector_details = true;
    let border_style = get_elem_val(elem_data,'border-style',data.is_responsive ? '1':'0').val;
    border_style = border_style.split(' ')
    if(border_style[0] == border_style[1] && border_style[0] == border_style[2] && border_style[0] == border_style[3]){
        show_selector_details = false;
    }
    let selector_container = $('<div/>',{class:'w100p selector_container',is_responsive:data.is_responsive ? '1':'0',is_hover:data.is_hover ? '1':'0',key_tree:data.key_tree}).append(
        draw_select_box({
            keys_arr:[{key_tree:data.key_tree,key:'border-style'}],
            name:texts.styling.border_style,
            is_responsive:data.is_responsive,
            is_hover:data.is_hover,
            selections:[
                {text:texts.styling.none,key:'none none none none'},
                {text:texts.styling.solid,key:'solid solid solid solid'},
                {text:texts.styling.dashed,key:'dashed dashed dashed dashed'},
                {text:texts.styling.dotted,key:'dotted dotted dotted dotted'},
                {text:texts.styling.double,key:'double double double double'},
            ],
            before_name:$('<div/>',{class:`show_selector_details ico-arrowRight2 ${show_selector_details ? 'show_selector_details_selected' : '' }`}),
            selections_container_class:`selector_no_details ${show_selector_details ? 'selector_noDetails_hidden' : ''}`,
            selector_container_class:false,
        }),
        $('<div/>',{class:`pB20 w100p selector_details ${show_selector_details ? '' : 'selector_details_hidden'} selector border_style_selector_container`,key_tree:data.key_tree,key:'border-style'}).append(
            draw_dummy_select_box({
                name:texts.styling.border_top_style,
                is_hover:false,
                is_responsive:false,
                selector_container_class:false,
                selections:[
                    {text:texts.styling.none,key:'none'},
                    {text:texts.styling.solid,key:'solid'},
                    {text:texts.styling.dashed,key:'dashed'},
                    {text:texts.styling.dotted,key:'dotted'},
                    {text:texts.styling.double,key:'double'},
                ],
                val:border_style[0],
                container_class:'editor_popup_col_child editor_popup_row_border_top_none',
                selections_container_class:'border_top_style_selector',
                selection_class:'border_style_select_box border_top_style',
            }),
            draw_dummy_select_box({
                name:texts.styling.border_right_style,
                is_hover:false,
                is_responsive:false,
                selector_container_class:false,
                selections:[
                    {text:texts.styling.none,key:'none'},
                    {text:texts.styling.solid,key:'solid'},
                    {text:texts.styling.dashed,key:'dashed'},
                    {text:texts.styling.dotted,key:'dotted'},
                    {text:texts.styling.double,key:'double'},
                ],
                val:border_style[0],
                container_class:'editor_popup_col_child',
                selections_container_class:'border_right_style_selector',
                selection_class:'border_style_select_box border_right_style',
            }),
            draw_dummy_select_box({
                name:texts.styling.border_bottom_style,
                is_hover:false,
                is_responsive:false,
                selector_container_class:false,
                selections:[
                    {text:texts.styling.none,key:'none'},
                    {text:texts.styling.solid,key:'solid'},
                    {text:texts.styling.dashed,key:'dashed'},
                    {text:texts.styling.dotted,key:'dotted'},
                    {text:texts.styling.double,key:'double'},
                ],
                val:border_style[0],
                container_class:'editor_popup_col_child',
                selections_container_class:'border_bottom_style_selector',
                selection_class:'border_style_select_box border_bottom_style',
            }),
            draw_dummy_select_box({
                name:texts.styling.border_left_style,
                is_hover:false,
                is_responsive:false,
                selector_container_class:false,
                selections:[
                    {text:texts.styling.none,key:'none'},
                    {text:texts.styling.solid,key:'solid'},
                    {text:texts.styling.dashed,key:'dashed'},
                    {text:texts.styling.dotted,key:'dotted'},
                    {text:texts.styling.double,key:'double'},
                ],
                val:border_style[0],
                container_class:'editor_popup_col_child',
                selections_container_class:'border_left_style_selector',
                selection_class:'border_style_select_box border_left_style',
            }),
        )
    )

    return selector_container;
}
set_border_style_selector = function(selector){
    let border_style = get_selector_val(selector).split(' ')
    set_dummy_select_box(selector.find('.border_top_style_selector'),border_style[0])
    set_dummy_select_box(selector.find('.border_right_style_selector'),border_style[1])
    set_dummy_select_box(selector.find('.border_bottom_style_selector'),border_style[2])
    set_dummy_select_box(selector.find('.border_left_style_selector'),border_style[3])
}
//events
$('body').on('click','.border_style_select_box',function(){
    let border_style = get_selector_val($(this).closest('.selector')).split(' ');
    if($(this).hasClass('border_top_style')){
        border_style[0] = $(this).attr('key') 
    }else if($(this).hasClass('border_right_style')){
        border_style[1] = $(this).attr('key') 
    }else if($(this).hasClass('border_bottom_style')){
        border_style[2] = $(this).attr('key') 
    }else if($(this).hasClass('border_left_style')){
        border_style[3] = $(this).attr('key') 
    }
    let new_border_style = `${border_style[0]} ${border_style[1]} ${border_style[2]} ${border_style[3]}`;
    set_elem_val($(this),new_border_style);
    new_action();
})



