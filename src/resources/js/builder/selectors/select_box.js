draw_select_box = function(data){
    let elem_data = get_key_tree(data.keys_arr[0].key_tree);
    let elem_val = get_elem_val(elem_data,data.keys_arr[0].key,data.is_responsive ? '1':'0')
    let selector;

    let selector_container = $('<div/>',{class:`editor_popup_row ${data.selector_container_class === false ? '' : 'selector_container'} ${data.container_class ?? ''}`,is_responsive:data.is_responsive ? '1':'0'}).append(
        $('<div/>',{class:'row alnC jstfyS'}).append(
            data.is_responsive && data.responsive_icon !== false ? responsive_icon(elem_val.responsive_class) : '',
            $('<div/>',{text:data.name}),
        ),
        selector = $('<div/>',{class:`selector select_box_container ${data.selections_container_class ?? ''}`})
    )
    for(const key in data.keys_arr){
        for(const key2 in data.keys_arr[key]){
            selector.attr(key2,data.keys_arr[key][key2]);
            selector.attr(key2,data.keys_arr[key][key2]);
        }
    }
    for(const key in data.selections){
        let selection = data.selections[key];
        let selection_elem;
        selector.append(
            selection_elem = $('<div/>',{class:`select_box p5 ${elem_val.val == selection.key ? 'select_box_selected' : ''} ${data.selection_class ?? ''} ${selection.class}`,text:selection.text,key:selection.key})
        )
        if('show_elem' in selection){
            selection_elem.attr('show_elem',selection.show_elem)
        }
        if('hide_elem' in selection){
            selection_elem.attr('hide_elem',selection.hide_elem)
        }
    }
    if(data.name == null){
        return selector;
    }else{
        return selector_container;
    }
}
set_select_box = function(selector){
    let val = get_selector_val(selector);
    selector.find(`.select_box`).removeClass('select_box_selected');
    selector.find(`.select_box[key="${val}"]`).addClass('select_box_selected');

    if(typeof(selector.find('.select_box_selected').attr('show_elem')) !== 'undefined'){
        let show_elems = selector.find('.select_box_selected').attr('show_elem').split('.');
        for(const key in show_elems){
            $(`.${show_elems[key]}`).removeClass('none')
        }
    }
    if(typeof(selector.find('.select_box_selected').attr('hide_elem')) !== 'undefined'){
        let hide_elems = selector.find('.select_box_selected').attr('hide_elem').split('.')
        for(const key in hide_elems){
            $(`.${hide_elems[key]}`).addClass('none')
        }
    }
}

$('body').on('click','.select_box',function(e){
    // e.stopImmediatePropagation();
    let new_val = $(this).attr('key');
    set_elem_val($(this),new_val)

    if(typeof($(this).attr('show_elem')) !== 'undefined'){
        let show_elem = $(this).attr('show_elem').split('.')
        for(const key in show_elem){
            $(`.${show_elem[key]}`).removeClass('none')
        }
    }
    if(typeof($(this).attr('hide_elem')) !== 'undefined'){
        let hide_elem = $(this).attr('hide_elem').split('.')
        for(const key in hide_elem){
            $(`.${hide_elem[key]}`).addClass('none')
        }
    }
    $(this).closest('.select_box_container').children().removeClass('select_box_selected');
    $(this).addClass('select_box_selected')
    new_action();

})

