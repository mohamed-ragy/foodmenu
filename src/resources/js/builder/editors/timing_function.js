draw_timing_function_selector = function(data){
    return '';
    let elem_data = get_key_tree(data.keys_arr[0].key_tree);
    let elem_val = get_elem_val(elem_data,data.keys_arr[0].key,data.is_responsive ? '1':'0')
    let selector;
    let selector_container = $('<div/>',{class:`editor_popup_col ${data.selector_container_class === false ? '' : 'selector_container'} ${data.container_class ?? ''}`,is_responsive:data.is_responsive ? '1':'0',is_hover:data.is_hover ? '1':'0'}).append(
        draw_selector_name({data:data,name:data.name,responsive_class:elem_val.responsive_class}),
        selector = $('<div/>',{class:`selector timing_functions_preview_container`})
        
    )
    let timing_functions = get_timing_functions();
    for(const key in timing_functions){
        let timing_function = timing_functions[key];
        selector.append(
            $('<div/>',{
                class:`timing_function_preview_container ${elem_val.val == timing_function.val ? `timing_function_preview_selected` : ``}`,
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
    for(const key in data.keys_arr){
        for(const key2 in data.keys_arr[key]){
            selector.attr(key2,data.keys_arr[key][key2]);
            selector.attr(key2,data.keys_arr[key][key2]);
        }
    }
    return selector_container;
}
set_timing_function_selector = function(selector){
    let val = get_selector_val(selector);
    selector.find('.timing_function_preview_container').removeClass('timing_function_preview_selected');
    selector.find(`.timing_function_preview_container[timing_function="${val}"]`).addClass('timing_function_preview_selected');
}
$('body').on('click','.timing_function_preview_container',function(e){
    set_elem_val($(this).closest('.selector'),$(this).attr('timing_function'))
    new_action();
    preview_elem_animation_on_website($(this).closest('.selector').closest('.editor_popup_container').attr('parent_key'))

})