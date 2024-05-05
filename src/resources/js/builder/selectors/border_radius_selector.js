draw_select_border_radius = function(data){
    let elem_data = get_key_tree(data.keys_arr[0]);
    let show_border_radius_details = true;
    let border_top_left_radius;let border_top_left_radius_desktop;let border_top_left_radius_mobile;
    let border_top_right_radius;let border_top_right_radius_desktop;let border_top_right_radius_mobile;
    let border_bottom_right_radius;let border_bottom_right_radius_desktop;let border_bottom_right_radius_mobile;
    let border_bottom_left_radius;let border_bottom_left_radius_desktop;let border_bottom_left_radius_mobile;



    if(data.is_responsive){
        border_top_left_radius_desktop = elem_data.elem['border-top-left-radius'];
        border_top_right_radius_desktop = elem_data.elem['border-top-right-radius'];
        border_bottom_right_radius_desktop = elem_data.elem['border-bottom-right-radius'];
        border_bottom_left_radius_desktop = elem_data.elem['border-bottom-left-radius'];

        border_top_left_radius_mobile = elem_data.elem_mobile['border-top-left-radius'];
        border_top_right_radius_mobile = elem_data.elem_mobile['border-top-right-radius'];
        border_bottom_right_radius_mobile = elem_data.elem_mobile['border-bottom-right-radius'];
        border_bottom_left_radius_mobile = elem_data.elem_mobile['border-bottom-left-radius'];
        if(
            border_top_left_radius_desktop == border_top_right_radius_desktop &&
            border_top_left_radius_desktop == border_bottom_right_radius_desktop &&
            border_top_left_radius_desktop == border_bottom_left_radius_desktop &&
            border_top_left_radius_mobile == border_top_right_radius_mobile &&
            border_top_left_radius_mobile == border_bottom_right_radius_mobile &&
            border_top_left_radius_mobile == border_bottom_left_radius_mobile
        ){
            show_border_radius_details = false;
        }
        if(
            border_top_left_radius_desktop == border_top_left_radius_mobile &&
            border_top_right_radius_desktop == border_top_right_radius_mobile &&
            border_bottom_right_radius_desktop == border_bottom_right_radius_mobile &&
            border_bottom_left_radius_desktop == border_bottom_left_radius_mobile
        ){
            border_top_left_radius = border_top_left_radius_desktop
            border_top_right_radius = border_top_right_radius_desktop
            border_bottom_right_radius = border_bottom_right_radius_desktop
            border_bottom_left_radius = border_bottom_left_radius_desktop
            if(window.current_view == 'mobile'){
                border_top_left_radius = border_top_left_radius_mobile
                border_top_right_radius = border_top_right_radius_mobile
                border_bottom_right_radius = border_bottom_right_radius_mobile
                border_bottom_left_radius = border_bottom_left_radius_mobile
            }
        }
    }else{
        border_top_left_radius = elem_data.elem['border-top-left-radius'];
        border_top_right_radius = elem_data.elem['border-top-right-radius'];
        border_bottom_right_radius = elem_data.elem['border-bottom-right-radius'];
        border_bottom_left_radius = elem_data.elem['border-bottom-left-radius'];
        if(border_top_left_radius == border_top_right_radius && border_top_left_radius == border_bottom_right_radius && border_top_left_radius == border_bottom_left_radius){
            show_border_radius_details = false;

        }
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
    let elem = $('<div/>',{class:'w100p select_border_radius_container selector_container',is_responsive:data.is_responsive ? '1':'0'}).append(
        draw_number_picker({
            keys_arr:border_radius_keys_arr,
            name:texts.styling.border_radius,
            unit:data.unit,
            step:data.step,
            is_responsive:data.is_responsive,
            selector_container_class:false,
            after_name:$('<div/>',{class:`select_border_radius_details ico-see_more ${show_border_radius_details ? 'select_border_radius_details_selected' : '' }`}),
            number_picker_container_class:`border_radius_no_details ${show_border_radius_details ? 'none' : ''}`,

        }),
        $('<div/>',{class:`pB20 w100p border_radius_details ${show_border_radius_details ? '' : 'none'}`}).append(
            draw_number_picker({
                keys_arr:border_top_left_radius_keys_arr,
                name:texts.styling.top_left_corner,
                step:data.step,
                unit:data.unit,
                is_responsive:data.is_responsive,
                selector_container_class:false,
                responsive_icon:false,
                container_class:'editor_popup_row_child'
            }),
            draw_number_picker({
                keys_arr:border_top_right_radius_keys_arr,
                name:texts.styling.top_right_corner,
                step:data.step,
                unit:data.unit,
                is_responsive:data.is_responsive,
                selector_container_class:false,
                responsive_icon:false,
                container_class:'editor_popup_row_child'
            }),
            draw_number_picker({
                keys_arr:border_bottom_right_radius_keys_arr,
                name:texts.styling.bottom_left_corner,
                step:data.step,
                unit:data.unit,
                is_responsive:data.is_responsive,
                selector_container_class:false,
                responsive_icon:false,
                container_class:'editor_popup_row_child'
            }),
            draw_number_picker({
                keys_arr:border_bottom_left_radius_keys_arr,
                name:texts.styling.bottom_right_corner,
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
$('body').on('click','.select_border_radius_details',function(e){
    // e.stopImmediatePropagation();
    if($(this).hasClass('select_border_radius_details_selected')){
        $(this).removeClass('select_border_radius_details_selected');
        $(this).closest('.select_border_radius_container').find('.border_radius_details').addClass('none');
        $(this).closest('.select_border_radius_container').find('.border_radius_no_details').removeClass('none')
    }else{
        $(this).addClass('select_border_radius_details_selected');
        $(this).closest('.select_border_radius_container').find('.border_radius_details').removeClass('none');
        $(this).closest('.select_border_radius_container').find('.border_radius_no_details').addClass('none')
    }
})
