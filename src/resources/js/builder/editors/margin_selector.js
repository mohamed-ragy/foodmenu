draw_select_margin = function(data){
    return '';
    let elem_data = get_key_tree(data.key_tree)
    let show_margin_details = true;
    let margin_top_desktop;let margin_top_mobile;
    let margin_right_desktop;let margin_right_mobile;
    let margin_bottom_desktop;let margin_bottom_mobile;
    let margin_left_desktop;let margin_left_mobile;
    let margin_top;
    let margin_right;
    let margin_bottom;
    let margin_left;
    if(data.is_responsive){
        margin_top_desktop = elem_data.elem['margin-top'];
        margin_right_desktop = elem_data.elem['margin-right'];
        margin_bottom_desktop = elem_data.elem['margin-bottom'];
        margin_left_desktop = elem_data.elem['margin-left'];

        margin_top_mobile = elem_data.elem_mobile['margin-top'];
        margin_right_mobile = elem_data.elem_mobile['margin-right'];
        margin_bottom_mobile = elem_data.elem_mobile['margin-bottom'];
        margin_left_mobile = elem_data.elem_mobile['margin-left'];

        if(
            margin_top_desktop == margin_right_desktop && margin_top_desktop == margin_bottom_desktop && margin_top_desktop == margin_left_desktop &&
            margin_top_mobile == margin_right_mobile && margin_top_mobile == margin_bottom_mobile && margin_top_mobile == margin_left_mobile
        ){
            show_margin_details = false;
        }

        if(
            margin_top_desktop == margin_top_mobile &&
            margin_right_desktop == margin_right_mobile &&
            margin_bottom_desktop == margin_bottom_mobile &&
            margin_left_desktop == margin_left_mobile
        ){
            margin_top = margin_top_desktop
            margin_right = margin_right_desktop
            margin_bottom = margin_bottom_desktop
            margin_left = margin_left_desktop
            if(window.current_view == 'mobile'){
                margin_top = margin_top_mobile
                margin_right = margin_right_mobile
                margin_bottom = margin_bottom_mobile
                margin_left = margin_left_mobile
            }
        }
    }else{
        margin_top = elem_data.elem['margin-top'];
        margin_right = elem_data.elem['margin-right'];
        margin_bottom = elem_data.elem['margin-bottom'];
        margin_left = elem_data.elem['margin-left'];
        if(margin_top == margin_right && margin_top == margin_left && margin_top == margin_bottom){
            show_margin_details = false;
        }
    }



    let margin_keys_arr = [
        {key_tree:data.key_tree,key:'margin-top'},
        {key_tree2:data.key_tree,key2:'margin-right'},
        {key_tree3:data.key_tree,key3:'margin-bottom'},
        {key_tree4:data.key_tree,key4:'margin-left'},
    ];
    let margin_top_keys_arr = [{key_tree:data.key_tree,key:'margin-top'}]
    let margin_right_keys_arr = [{key_tree:data.key_tree,key:'margin-right'}]
    let margin_bottom_keys_arr = [{key_tree:data.key_tree,key:'margin-bottom'}]
    let margin_left_keys_arr = [{key_tree:data.key_tree,key:'margin-left'}]


    let elem = $('<div/>',{class:'w100p select_margin_container selector_container',is_responsive:data.is_responsive ? '1':'0'}).append(
        draw_number_picker({
            keys_arr:margin_keys_arr,
            name:texts.styling.margin,
            units:data.units,
            step:data.step,
            is_responsive:data.is_responsive,
            selector_container_class:false,
            after_name:$('<div/>',{class:`select_margin_details ico-see_more ${show_margin_details ? 'select_margin_details_selected' : '' }`}),
            number_picker_container_class:`margin_no_details ${show_margin_details ? 'none' : ''}`,

        }),
        $('<div/>',{class:`pB20 w100p margin_details ${show_margin_details ? '' : 'none'}`}).append(
            draw_number_picker({
                keys_arr:margin_top_keys_arr,
                name:texts.styling.margin_top,
                step:data.step,
                units:data.units,
                is_responsive:data.is_responsive,
                selector_container_class:false,
                responsive_icon:false,
                container_class:'editor_popup_row_child'
            }),
            draw_number_picker({
                keys_arr:margin_right_keys_arr,
                name:texts.styling.margin_right,
                step:data.step,
                units:data.units,
                is_responsive:data.is_responsive,
                selector_container_class:false,
                responsive_icon:false,
                container_class:'editor_popup_row_child'
            }),
            draw_number_picker({
                keys_arr:margin_bottom_keys_arr,
                name:texts.styling.margin_bottom,
                step:data.step,
                units:data.units,
                is_responsive:data.is_responsive,
                selector_container_class:false,
                responsive_icon:false,
                container_class:'editor_popup_row_child'
            }),
            draw_number_picker({
                keys_arr:margin_left_keys_arr,
                name:texts.styling.margin_left,
                step:data.step,
                units:data.units,
                is_responsive:data.is_responsive,
                selector_container_class:false,
                responsive_icon:false,
                container_class:'editor_popup_row_child'
            }),
        )

    )
    return elem;
}
$('body').on('click','.select_margin_details',function(e){
    //e.stopImmediatePropagation();
    if($(this).hasClass('select_margin_details_selected')){
        $(this).removeClass('select_margin_details_selected');
        $(this).closest('.select_margin_container').find('.margin_details').addClass('none');
        $(this).closest('.select_margin_container').find('.margin_no_details').removeClass('none')
    }else{
        $(this).addClass('select_margin_details_selected');
        $(this).closest('.select_margin_container').find('.margin_details').removeClass('none');
        $(this).closest('.select_margin_container').find('.margin_no_details').addClass('none')
    }
})
