draw_select_padding = function(data){
    let elem_data = get_key_tree(data.key_tree);
    let show_padding_details = true;
    let padding_top_desktop;let padding_top_mobile;
    let padding_right_desktop;let padding_right_mobile;
    let padding_bottom_desktop;let padding_bottom_mobile;
    let padding_left_desktop;let padding_left_mobile;
    let padding_top;
    let padding_right;
    let padding_bottom;
    let padding_left;
    if(data.is_responsive){
        padding_top_desktop = elem_data.elem['padding-top'];
        padding_right_desktop = elem_data.elem['padding-right'];
        padding_bottom_desktop = elem_data.elem['padding-bottom'];
        padding_left_desktop = elem_data.elem['padding-left'];

        padding_top_mobile = elem_data.elem_mobile['padding-top'];
        padding_right_mobile = elem_data.elem_mobile['padding-right'];
        padding_bottom_mobile = elem_data.elem_mobile['padding-bottom'];
        padding_left_mobile = elem_data.elem_mobile['padding-left'];

        if(
            padding_top_desktop == padding_right_desktop && padding_top_desktop == padding_bottom_desktop && padding_top_desktop == padding_left_desktop &&
            padding_top_mobile == padding_right_mobile && padding_top_mobile == padding_bottom_mobile && padding_top_mobile == padding_left_mobile
        ){
            show_padding_details = false;
        }

        if(
            padding_top_desktop == padding_top_mobile &&
            padding_right_desktop == padding_right_mobile &&
            padding_bottom_desktop == padding_bottom_mobile &&
            padding_left_desktop == padding_left_mobile
        ){
            padding_top = padding_top_desktop
            padding_right = padding_right_desktop
            padding_bottom = padding_bottom_desktop
            padding_left = padding_left_desktop
            if(window.current_view == 'mobile'){
                padding_top = padding_top_mobile
                padding_right = padding_right_mobile
                padding_bottom = padding_bottom_mobile
                padding_left = padding_left_mobile
            }
        }
    }else{
        padding_top = elem_data.elem['padding-top'];
        padding_right = elem_data.elem['padding-right'];
        padding_bottom = elem_data.elem['padding-bottom'];
        padding_left = elem_data.elem['padding-left'];
        if(padding_top == padding_right && padding_top == padding_left && padding_top == padding_bottom){
            show_padding_details = false;
        }
    }



    let padding_keys_arr = [
        {key_tree:data.key_tree,key:'padding-top'},
        {key_tree2:data.key_tree,key2:'padding-right'},
        {key_tree3:data.key_tree,key3:'padding-bottom'},
        {key_tree4:data.key_tree,key4:'padding-left'},
    ];
    let padding_top_keys_arr = [{key_tree:data.key_tree,key:'padding-top'}]
    let padding_right_keys_arr = [{key_tree:data.key_tree,key:'padding-right'}]
    let padding_bottom_keys_arr = [{key_tree:data.key_tree,key:'padding-bottom'}]
    let padding_left_keys_arr = [{key_tree:data.key_tree,key:'padding-left'}]


    let select_range;let select_range_slider;
    let elem = $('<div/>',{class:'w100p select_padding_container selector_container',is_responsive:data.is_responsive ? '1':'0'}).append(
        draw_number_picker({
            keys_arr:padding_keys_arr,
            name:texts.styling.padding,
            unit:data.unit,
            step:data.step,
            is_responsive:data.is_responsive,
            selector_container_class:false,
            after_name:$('<div/>',{class:`select_padding_details ico-see_more ${show_padding_details ? 'select_padding_details_selected' : '' }`}),
            number_picker_container_class:`padding_no_details ${show_padding_details ? 'none' : ''}`,

        }),
        $('<div/>',{class:`pB20 w100p padding_details ${show_padding_details ? '' : 'none'}`}).append(
            draw_number_picker({
                keys_arr:padding_top_keys_arr,
                name:texts.styling.padding_top,
                step:data.step,
                unit:data.unit,
                is_responsive:data.is_responsive,
                selector_container_class:false,
                responsive_icon:false,
                container_class:'editor_popup_row_child'
            }),
            draw_number_picker({
                keys_arr:padding_right_keys_arr,
                name:texts.styling.padding_right,
                step:data.step,
                unit:data.unit,
                is_responsive:data.is_responsive,
                selector_container_class:false,
                responsive_icon:false,
                container_class:'editor_popup_row_child'
            }),
            draw_number_picker({
                keys_arr:padding_bottom_keys_arr,
                name:texts.styling.padding_bottom,
                step:data.step,
                unit:data.unit,
                is_responsive:data.is_responsive,
                selector_container_class:false,
                responsive_icon:false,
                container_class:'editor_popup_row_child'
            }),
            draw_number_picker({
                keys_arr:padding_left_keys_arr,
                name:texts.styling.padding_left,
                step:data.step,
                unit:data.unit,
                is_responsive:data.is_responsive,
                selector_container_class:false,
                responsive_icon:false,
                container_class:'editor_popup_row_child'
            }),
        )

    )
    return elem;
}
$('body').on('click','.select_padding_details',function(e){
    //e.stopImmediatePropagation();
    if($(this).hasClass('select_padding_details_selected')){
        $(this).removeClass('select_padding_details_selected');
        $(this).closest('.select_padding_container').find('.padding_details').addClass('none');
        $(this).closest('.select_padding_container').find('.padding_no_details').removeClass('none')
    }else{
        $(this).addClass('select_padding_details_selected');
        $(this).closest('.select_padding_container').find('.padding_details').removeClass('none');
        $(this).closest('.select_padding_container').find('.padding_no_details').addClass('none')
    }
})
