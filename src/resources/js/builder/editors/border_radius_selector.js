draw_select_border_radius = function(data){
    return '';
    let elem_data = get_key_tree(data.keys_arr[0]);
    let show_selector_details = true;
    let border_top_left_radius = get_elem_val(elem_data,'border-top-left-radius',data.is_responsive ? '1':'0').val
    let border_top_right_radius = get_elem_val(elem_data,'border-top-right-radius',data.is_responsive ? '1':'0').val
    let border_bottom_right_radius = get_elem_val(elem_data,'border-bottom-right-radius',data.is_responsive ? '1':'0').val
    let border_bottom_left_radius = get_elem_val(elem_data,'border-bottom-left-radius',data.is_responsive ? '1':'0').val
    if(border_top_left_radius == border_top_right_radius && border_top_left_radius == border_bottom_right_radius && border_top_left_radius == border_bottom_left_radius){
        show_selector_details = false;
    }

    let border_radius_keys_arr = [
        {key_tree:data.keys_arr[0],key:'border-top-left-radius'},
        {key_tree2:data.keys_arr[0],key2:'border-top-right-radius'},
        {key_tree3:data.keys_arr[0],key3:'border-bottom-right-radius'},
        {key_tree4:data.keys_arr[0],key4:'border-bottom-left-radius'},
    ];
    let border_top_left_radius_keys_arr = [{key_tree:data.keys_arr[0],key:'border-top-left-radius'}]
    let border_top_right_radius_keys_arr = [{key_tree:data.keys_arr[0],key:'border-top-right-radius'}]
    let border_bottom_right_radius_keys_arr = [{key_tree:data.keys_arr[0],key:'border-bottom-right-radius'}]
    let border_bottom_left_radius_keys_arr = [{key_tree:data.keys_arr[0],key:'border-bottom-left-radius'}]
    if(typeof(data.keys_arr[1]) !== 'undefined'){
        border_radius_keys_arr = [
            {key_tree:data.keys_arr[0],key:'border-top-left-radius'},
            {key_tree2:data.keys_arr[0],key2:'border-top-right-radius'},
            {key_tree3:data.keys_arr[0],key3:'border-bottom-right-radius'},
            {key_tree4:data.keys_arr[0],key4:'border-bottom-left-radius'},

            {key_tree5:data.keys_arr[1],key5:'border-top-left-radius'},
            {key_tree6:data.keys_arr[1],key6:'border-top-right-radius'},
            {key_tree7:data.keys_arr[1],key7:'border-bottom-right-radius'},
            {key_tree8:data.keys_arr[1],key8:'border-bottom-left-radius'},
        ];

        border_top_left_radius_keys_arr = [{key_tree:data.keys_arr[0],key:'border-top-left-radius'},{key_tree2:data.keys_arr[1],key2:'border-top-left-radius'}]
        border_top_right_radius_keys_arr = [{key_tree:data.keys_arr[0],key:'border-top-right-radius'},{key_tree2:data.keys_arr[1],key2:'border-top-right-radius'}]
        border_bottom_right_radius_keys_arr = [{key_tree:data.keys_arr[0],key:'border-bottom-right-radius'},{key_tree2:data.keys_arr[1],key2:'border-bottom-right-radius'}]
        border_bottom_left_radius_keys_arr = [{key_tree:data.keys_arr[0],key:'border-bottom-left-radius'},{key_tree2:data.keys_arr[1],key2:'border-bottom-left-radius'}]
    }
    let elem = $('<div/>',{class:'w100p select_border_radius_container selector_container',is_responsive:data.is_responsive ? '1':'0',is_hover:data.is_hover ? '1':'0'}).append(
        draw_number_picker({
            keys_arr:border_radius_keys_arr,
            name:texts.styling.border_radius,
            units:data.units,
            step:data.step,
            is_responsive:data.is_responsive,
            is_hover:data.is_hover,
            selector_container_class:false,
            before_name:$('<div/>',{class:`show_selector_details ico-arrowRight2 ${show_selector_details ? 'show_selector_details_selected' : '' }`}),
            number_picker_container_class:`selector_no_details ${show_selector_details ? 'selector_noDetails_hidden' : ''}`,

        }),
        $('<div/>',{class:`pB20 w100p selector_details ${show_selector_details ? '' : 'selector_details_hidden'}`}).append(
            draw_number_picker({
                keys_arr:border_top_left_radius_keys_arr,
                name:texts.styling.top_left_corner,
                step:data.step,
                units:data.units,
                is_responsive:data.is_responsive,
                is_hover:data.is_hover,
                selector_container_class:false,
                responsive_icon:false,
                hover_icon:false,
                container_class:'editor_popup_col_child'
            }),
            draw_number_picker({
                keys_arr:border_top_right_radius_keys_arr,
                name:texts.styling.top_right_corner,
                step:data.step,
                units:data.units,
                is_responsive:data.is_responsive,
                is_hover:data.is_hover,
                selector_container_class:false,
                responsive_icon:false,
                hover_icon:false,
                container_class:'editor_popup_col_child'
            }),
            draw_number_picker({
                keys_arr:border_bottom_right_radius_keys_arr,
                name:texts.styling.bottom_left_corner,
                step:data.step,
                units:data.units,
                is_responsive:data.is_responsive,
                is_hover:data.is_hover,
                selector_container_class:false,
                responsive_icon:false,
                hover_icon:false,
                container_class:'editor_popup_col_child'
            }),
            draw_number_picker({
                keys_arr:border_bottom_left_radius_keys_arr,
                name:texts.styling.bottom_right_corner,
                step:data.step,
                units:data.units,
                is_responsive:data.is_responsive,
                is_hover:data.is_hover,
                selector_container_class:false,
                responsive_icon:false,
                hover_icon:false,
                container_class:'editor_popup_col_child'
            }),
        )

    )

    return elem;
}
