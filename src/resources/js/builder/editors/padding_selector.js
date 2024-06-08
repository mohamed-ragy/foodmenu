draw_four_number_pickers = function(data){
    let editor = $('<div/>',{
        // class:`editor four_number_pickers`,
        // key_tree:data.key_tree,
        // variable_key:data.variable_key,
        // key:data.key,
    }).append(
        // $('<div/>',{class:`editor_popup_col editor_popup_brdrT_none`}).append(
        //     $('<div/>',{class:'fs09',text:data.name}),
        //     draw_number_picker({
        //         step:data.step,
        //         units:data.units,
        //         dummy:true,
        //         dummy_class:'four_editor_0'
        //     }),
        // ),
        $('<div/>',{class:`editor_popup_col editor_popup_brdrT_none`}).append(
            $('<div/>',{class:'fs09',text:data.name1}),
            draw_number_picker({
                step:data.step,
                units:data.units,
                dummy:true,
                dummy_class:'four_editor_1'
            }),
        ),
        $('<div/>',{class:`editor_popup_col editor_popup_brdrT_none`}).append(
            $('<div/>',{class:'fs09',text:data.name2}),
            draw_number_picker({
                step:data.step,
                units:data.units,
                dummy:true,
                dummy_class:'four_editor_2'
            }),
        ),
        $('<div/>',{class:`editor_popup_col editor_popup_brdrT_none`}).append(
            $('<div/>',{class:'fs09',text:data.name3}),
            draw_number_picker({
                step:data.step,
                units:data.units,
                dummy:true,
                dummy_class:'four_editor_3'
            }),
        ),
        $('<div/>',{class:`editor_popup_col editor_popup_brdrT_none`}).append(
            $('<div/>',{class:'fs09',text:data.name4}),
            draw_number_picker({
                step:data.step,
                units:data.units,
                dummy:true,
                dummy_class:'four_editor_4'
            }),
        ),
    )
    return editor;
}
set_four_number_pickers = function(editor){
    let val = get_editor_val(editor);
    if(val == '--'){
        set_dummy_number_picker(editor.find('.four_editor_0'),'--')
    }else{
        val = val.split(' ');
        if(val[0] == val[1] && val[0] == val[2] && val[0] == val[3]){
            set_dummy_number_picker(editor.find('.four_editor_0'),val[0])
        }else{
            set_dummy_number_picker(editor.find('.four_editor_0'),'--')
        }
        set_dummy_number_picker(editor.find('.four_editor_1'),val[0])
        set_dummy_number_picker(editor.find('.four_editor_2'),val[1])
        set_dummy_number_picker(editor.find('.four_editor_3'),val[2])
        set_dummy_number_picker(editor.find('.four_editor_4'),val[3])
    }
}
$('body').on('change','.four_editor_0',function(){
    let new_val = `${$(this).find('.number_picker_input').val()}${$(this).find('.number_picker_unit_select').text()}`;
    new_val = `${new_val} ${new_val} ${new_val} ${new_val}`;
    set_val($(this).closest('.four_number_pickers'),new_val)
    new_action();
})
$('body').on('change','.four_editor_1',function(){
    let new_val = `${$(this).find('.number_picker_input').val()}${$(this).find('.number_picker_unit_select').text()}`;
    let editor = $(this).closest('.four_number_pickers');
    let val = get_editor_val(editor);
    if(val == '--'){
        new_val = `${new_val} ${new_val} ${new_val} ${new_val}`
    }else{
        val = val.split(' ')
        new_val = `${new_val} ${val[1]} ${val[2]} ${val[3]}`
    }
    set_val($(this).closest('.four_number_pickers'),new_val)
    new_action();
})


draw_select_padding = function(data){


    return '';
    let elem_data = get_key_tree(data.key_tree);
    let show_selector_details = true;
    let padding_top = get_elem_val(elem_data,'padding-top',data.is_responsive ? '1':'0').val
    let padding_bottom = get_elem_val(elem_data,'padding-bottom',data.is_responsive ? '1':'0').val
    let padding_right = get_elem_val(elem_data,'padding-right',data.is_responsive ? '1':'0').val
    let padding_left = get_elem_val(elem_data,'padding-left',data.is_responsive ? '1':'0').val
    if(padding_top == padding_bottom && padding_top == padding_right && padding_top == padding_left){
        show_selector_details = false;
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


    let selector_container = $('<div/>',{class:'w100p select_padding_container selector_container',is_responsive:data.is_responsive ? '1':'0',is_hover:data.is_hover ? '1':'0'}).append(
        draw_number_picker({
            keys_arr:padding_keys_arr,
            name:texts.styling.padding,
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
                keys_arr:padding_top_keys_arr,
                name:texts.styling.padding_top,
                step:data.step,
                units:data.units,
                is_responsive:data.is_responsive,
                is_hover:data.is_hover,
                selector_container_class:false,
                responsive_icon:false,
                hover_icon:false,
                container_class:'editor_popup_col_child editor_popup_row_border_top_none'
            }),
            draw_number_picker({
                keys_arr:padding_right_keys_arr,
                name:texts.styling.padding_right,
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
                keys_arr:padding_bottom_keys_arr,
                name:texts.styling.padding_bottom,
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
                keys_arr:padding_left_keys_arr,
                name:texts.styling.padding_left,
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
    return selector_container;
}
