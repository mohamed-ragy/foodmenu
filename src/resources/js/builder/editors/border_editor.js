draw_border_editor = function(data){
    let editor = $('<div/>',{
        class:`border_editors w100p-10 mX5`,
    }).append(
        $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
            $('<div/>',{class:'row alnC jstfyS'}).append(
                $('<div/>',{class:'ico-arrowRight2 border_editor_details_toggle'}),
                $('<div/>',{class:'fs09',text:texts.styling.border}),
            ),
            draw_border_editors('all','border_editor_detail_head',data)
        ),
        $('<div/>',{class:'border_editor_detail_container'}).append(
            $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
                $('<div/>',{class:'fs09',text:texts.styling.border_top}),
                draw_border_editors('border-top','',data),
            ),
            $('<div/>',{class:'editor_popup_col'}).append(
                $('<div/>',{class:'fs09',text:texts.styling.border_right}),
                draw_border_editors('border-right','',data),
            ),
            $('<div/>',{class:'editor_popup_col'}).append(
                $('<div/>',{class:'fs09',text:texts.styling.border_bottom}),
                draw_border_editors('border-bottom','',data),
            ),
            $('<div/>',{class:'editor_popup_col'}).append(
                $('<div/>',{class:'fs09',text:texts.styling.border_left}),
                draw_border_editors('border-left','',data),
            ),
        )

    );

    return editor;
}
draw_border_editors = function(key,container_class,data){
    return $('<div/>',{
        class:`w100p editor border_editor ${container_class}`,
        key:key,
        key_tree:data.key_tree,
        variable_key:data.variable_key,
        render:data.render ?? '',
        generate_style:data.generate_style ?? data.key_tree,
    }).append(
        $('<div/>',{class:'row alnC jstfyC pY5 mY5 mB10 w100p'}).append(
            draw_number_picker({
                dummy:true,
                dummy_class:'border_editor_width wA mie-10',
                units:['px'],
                step:1,
                range:{min:0,max:10,step:1},
            }),
            draw_color_picker({
                dummy:true,
                dummy_class:'border_editor_color',
            }),
        ),
        draw_select_box({
            dummy:true,
            dummy_class:'border_editor_style',
            selections:[
                {text:texts.styling.none,key:'none'},
                {text:texts.styling.solid,key:'solid'},
                {text:texts.styling.dashed,key:'dashed'},
                {text:texts.styling.dotted,key:'dotted'},
                {text:texts.styling.double,key:'double'},
            ]
        }),
    )
}
set_border_editors = function(editors_container){
    let border_top_editor = editors_container.find('.border_editor[key="border-top"]')
    let border_right_editor = editors_container.find('.border_editor[key="border-right"]')
    let border_bottom_editor = editors_container.find('.border_editor[key="border-bottom"]')
    let border_left_editor = editors_container.find('.border_editor[key="border-left"]')
    
    let border_top = get_editor_val(border_top_editor)
    let border_right = get_editor_val(border_right_editor)
    let border_bottom = get_editor_val(border_bottom_editor)
    let border_left = get_editor_val(border_left_editor)

    let border;
    let border_editor = editors_container.find('.border_editor[key="all"]')
    if(border_top == border_right && border_top == border_bottom && border_top == border_left){
        hide_border_editor_details(editors_container);
        border = border_top;
    }else{
        show_border_editor_details(editors_container)
        border = '--'
    }

    if(border == '--' || typeof(border) === 'undefined'){border = '-- -- --'.split(' ')}else{border = border.split(' ')}
    set_dummy_number_picker(border_editor.find('.border_editor_width'),border[0]);
    set_dummy_select_box(border_editor.find('.border_editor_style'),border[1]);
    set_dummy_color_picker(border_editor.find('.border_editor_color'),border[2]);

    if(border_top == '--' || typeof(border_top) === 'undefined'){border_top = '-- -- --'.split(' ')}else{border_top = border_top.split(' ')}
    set_dummy_number_picker(border_top_editor.find('.border_editor_width'),border_top[0]);
    set_dummy_select_box(border_top_editor.find('.border_editor_style'),border_top[1]);
    set_dummy_color_picker(border_top_editor.find('.border_editor_color'),border_top[2]);

    if(border_right == '--' || typeof(border_right) === 'undefined'){border_right = '-- -- --'.split(' ')}else{border_right = border_right.split(' ')}
    set_dummy_number_picker(border_right_editor.find('.border_editor_width'),border_right[0]);
    set_dummy_select_box(border_right_editor.find('.border_editor_style'),border_right[1]);
    set_dummy_color_picker(border_right_editor.find('.border_editor_color'),border_right[2]);

    if(border_bottom == '--' || typeof(border_bottom) === 'undefined'){border_bottom = '-- -- --'.split(' ')}else{border_bottom = border_bottom.split(' ')}
    set_dummy_number_picker(border_bottom_editor.find('.border_editor_width'),border_bottom[0]);
    set_dummy_select_box(border_bottom_editor.find('.border_editor_style'),border_bottom[1]);
    set_dummy_color_picker(border_bottom_editor.find('.border_editor_color'),border_bottom[2]);

    if(border_left == '--' || typeof(border_left) === 'undefined'){border_left = '-- -- --'.split(' ')}else{border_left = border_left.split(' ')}
    set_dummy_number_picker(border_left_editor.find('.border_editor_width'),border_left[0]);
    set_dummy_select_box(border_left_editor.find('.border_editor_style'),border_left[1]);
    set_dummy_color_picker(border_left_editor.find('.border_editor_color'),border_left[2]);

}

//events
$('body').on('change','.border_editor',function(e){
    let editor = $(this);
    if(editor.attr('key') == 'all'){
        let new_val = `${get_dummy_val(editor.find('.border_editor_width'))} ${get_dummy_val(editor.find('.border_editor_style'))} ${get_dummy_val(editor.find('.border_editor_color'))}`;
        editor.closest('.border_editors').find('.border_editor').each(function(){
            if($(this).attr('key') != 'all'){
                set_val($(this),new_val);
            }
        })

    }else{
        let new_val = `${get_dummy_val(editor.find('.border_editor_width'))} ${get_dummy_val(editor.find('.border_editor_style'))} ${get_dummy_val(editor.find('.border_editor_color'))}`;
        set_val(editor,new_val);
    }
    new_action(editor.attr('generate_style'),editor.attr('render'));
    set_border_editors(editor.closest('.border_editors'))
    temp_preview_mode();
})
$('body').on('change','.border_editor_width, .border_editor_style, .border_editor_color',function(e){
    $(this).closest('.border_editor').trigger('change')
})


//
$('body').on('click','.border_editor_details_toggle',function(){
    if($(this).hasClass('ico-arrowRight2')){
        show_border_editor_details($(this).closest('.border_editors'))
    }else if($(this).hasClass('ico-arrowDown2')){
        hide_border_editor_details($(this).closest('.border_editors'))
    }
})
show_border_editor_details = function(editor){
    editor.find('.border_editor_details_toggle').removeClass('ico-arrowRight2').addClass('ico-arrowDown2')
    editor.find('.border_editor_detail_container').addClass('four_number_pickers_detail_container_show')
    editor.find('.border_editor_detail_head').addClass('none')
}
hide_border_editor_details = function(editor){
    editor.find('.border_editor_details_toggle').addClass('ico-arrowRight2').removeClass('ico-arrowDown2')
    editor.find('.border_editor_detail_container').removeClass('four_number_pickers_detail_container_show')
    editor.find('.border_editor_detail_head').removeClass('none')
}