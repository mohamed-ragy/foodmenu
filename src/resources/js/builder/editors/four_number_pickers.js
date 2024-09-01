draw_four_number_pickers = function(data){
    let editor = $('<div/>',{
        class:`w100p editor four_number_pickers_editor`,
        key_tree:data.key_tree,
        variable_key:data.variable_key,
        key:data.key,
        render:data.render ?? data.key_tree,
    }).append(
        $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none mB0 pB0'}).append(
            $('<div/>',{class:'row alnC jstfyS'}).append(
                $('<div/>',{class:'ico-arrowRight2 four_number_pickers_details_toggle'}),
                $('<div/>',{class:'fs09',text:data.names[0]}),
            ),
            draw_number_picker({
                dummy:true,
                dummy_class:'four_number_pickers_0',
                units:data.units,
                step:data.step,
                container_class:`four_number_pickers_detail_head ${data.editor_class ?? ''}`
            })
        ),
        $('<div/>',{class:'w100p four_number_pickers_detail_container'}).append(
            $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
                $('<div/>',{class:'fs09 mis-10',text:data.names[1]}),
                draw_number_picker({
                    dummy:true,
                    dummy_class:'four_number_pickers_1',
                    units:data.units,
                    step:data.step,
                    container_class:` ${data.editor_class ?? ''}`
                })
            ),
            $('<div/>',{class:'editor_popup_col'}).append(
                $('<div/>',{class:'fs09 mis-10',text:data.names[2]}),
                draw_number_picker({
                    dummy:true,
                    dummy_class:'four_number_pickers_2',
                    units:data.units,
                    step:data.step,
                    container_class:` ${data.editor_class ?? ''}`
                })
            ),
            $('<div/>',{class:'editor_popup_col'}).append(
                $('<div/>',{class:'fs09 mis-10',text:data.names[3]}),
                draw_number_picker({
                    dummy:true,
                    dummy_class:'four_number_pickers_3',
                    units:data.units,
                    step:data.step,
                    container_class:` ${data.editor_class ?? ''}`
                })
            ),
            $('<div/>',{class:'editor_popup_col'}).append(
                $('<div/>',{class:'fs09 mis-10',text:data.names[4]}),
                draw_number_picker({
                    dummy:true,
                    dummy_class:'four_number_pickers_4',
                    units:data.units,
                    step:data.step,
                    container_class:` ${data.editor_class ?? ''}`
                })
            ),
        )
    );

    return editor;
}
set_four_number_pickers = function(editor){
    let val = get_editor_val(editor);
    let val_arr;
    if(val == '--'){
        val_arr = ('-- -- -- --').split(' ')
    }else{
        val_arr = val.split(' ')
    }
    set_dummy_number_picker(editor.find('.four_number_pickers_1'),val_arr[0])
    set_dummy_number_picker(editor.find('.four_number_pickers_2'),val_arr[1])
    set_dummy_number_picker(editor.find('.four_number_pickers_3'),val_arr[2])
    set_dummy_number_picker(editor.find('.four_number_pickers_4'),val_arr[3])
    if(val_arr[0] == val_arr[1] && val_arr[0] == val_arr[2] && val_arr[0] == val_arr[3]){
        hide_four_number_pickers_details(editor);
        set_dummy_number_picker(editor.find('.four_number_pickers_0'),val_arr[0])
    }else{
        set_dummy_number_picker(editor.find('.four_number_pickers_0'),'--')
        show_four_number_pickers_details(editor);
    }
}
//
$('body').on('change','.four_number_pickers_0',function(){
    let editor = $(this).closest('.four_number_pickers_editor');
    let val = get_dummy_val($(this))
    set_val(editor,`${val} ${val} ${val} ${val}`);
    new_action(editor.attr('render'));
    set_four_number_pickers(editor);
    temp_preview_mode();
})
$('body').on('change','.four_number_pickers_1, .four_number_pickers_2, .four_number_pickers_3, .four_number_pickers_4',function(){
    let editor = $(this).closest('.four_number_pickers_editor');
    let val_1 = get_dummy_val(editor.find('.four_number_pickers_1'));
    let val_2 = get_dummy_val(editor.find('.four_number_pickers_2'));
    let val_3 = get_dummy_val(editor.find('.four_number_pickers_3'));
    let val_4 = get_dummy_val(editor.find('.four_number_pickers_4'));
     set_val(editor,`${val_1} ${val_2} ${val_3} ${val_4}`)
     new_action(editor.attr('render'));
     set_four_number_pickers(editor);
     temp_preview_mode();
})
//
$('body').on('click','.four_number_pickers_details_toggle',function(){
    if($(this).hasClass('ico-arrowRight2')){
        show_four_number_pickers_details($(this).closest('.four_number_pickers_editor'))
    }else if($(this).hasClass('ico-arrowDown2')){
        hide_four_number_pickers_details($(this).closest('.four_number_pickers_editor'))
    }
})
show_four_number_pickers_details = function(editor){
    editor.find('.four_number_pickers_details_toggle').removeClass('ico-arrowRight2').addClass('ico-arrowDown2')
    editor.find('.four_number_pickers_detail_container').addClass('four_number_pickers_detail_container_show')
    editor.find('.four_number_pickers_detail_head').addClass('none')
}
hide_four_number_pickers_details = function(editor){
    editor.find('.four_number_pickers_details_toggle').addClass('ico-arrowRight2').removeClass('ico-arrowDown2')
    editor.find('.four_number_pickers_detail_container').removeClass('four_number_pickers_detail_container_show')
    editor.find('.four_number_pickers_detail_head').removeClass('none')
}