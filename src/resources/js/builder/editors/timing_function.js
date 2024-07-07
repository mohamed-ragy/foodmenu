draw_timing_function_editor = function(data){
    let timing_functions_preview_container;
    let editor = $('<div/>',{
        class:`editor timing_function_editor ${data.container_class ?? ''}`,
        key_tree:data.key_tree,
        variable_key:data.variable_key,
        key:data.key,
    }).append(
        timing_functions_preview_container = $('<div/>',{class:`timing_functions_preview_container mT20`})
    )
    let timing_functions = get_timing_functions();
    for(const key in timing_functions){
        let timing_function = timing_functions[key];
        timing_functions_preview_container.append(
            $('<div/>',{
                class:`timing_function_preview_container`,
                timing_function:timing_function.val,
            }).append(
                $('<div/>',{class:'timing_function_preview'}).append(
                    $('<div/>',{
                        class:'timing_function_preview_elem',
                        style:`animation-timing-function:${timing_function.val}`,
                    })
                ),
                $('<div/>',{class:'timing_function_preview_name',text:texts.select_elems[`_${timing_function.name}`]})
            )
        )
    }
    return editor;
}
set_timing_function_editor = function(editor){
    let val = get_editor_val(editor);
    editor.find('.timing_function_preview_container').removeClass('timing_function_preview_selected');
    editor.find(`.timing_function_preview_container[timing_function="${val}"]`).addClass('timing_function_preview_selected');
}
$('body').on('change','.timing_function_editor',function(){
})
$('body').on('click','.timing_function_preview_container',function(e){
    set_val($(this).closest('.editor'),$(this).attr('timing_function'))
    new_action();
    $(this).closest('.timing_function_editor').trigger('change')
})
