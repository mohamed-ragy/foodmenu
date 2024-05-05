draw_switch_btn = function(data){
    let elem_data = get_key_tree(data.keys_arr[0].key_tree);
    let elem_val = get_elem_val(elem_data,data.keys_arr[0].key,data.is_responsive ? '1':'0')
    let selector;
    let selector_container = $('<div/>',{class:`editor_popup_row ${data.selector_container_class === false ? '' : 'selector_container'}`,is_responsive:data.is_responsive ? '1' : '0'}).append(
        $('<div/>',{class:'row alnC jstfyS'}).append(
            data.is_responsive && data.responsive_icon !== false ? responsive_icon(elem_val.responsive_class) : '',
            $('<div/>',{text:data.name}),
        ),
        selector = $('<div/>',{class:`selector switch_btn_action switch_btn ${elem_val.val == '1' ? 'switch_btn_selected' : ''}`,show_hide:data.show_hide})
    )

    for(const key in data.keys_arr){
        for(const key2 in data.keys_arr[key]){
            selector.attr(key2,data.keys_arr[key][key2]);
            selector.attr(key2,data.keys_arr[key][key2]);
        }
    }
    if(data.show_hide != null){
        setTimeout(()=>{
            let show_hide = data.show_hide.split('.');
            if(elem_val.val == '1'){
                for(const key in show_hide){
                    $(`.${show_hide[key]}`).removeClass('none')
                }
            }else if(elem_val.val == '0'){
                for(const key in show_hide){
                    $(`.${show_hide[key]}`).addClass('none')
                }
            }
        },100)
    }
    if(data.name == null){
        return selector;
    }else{
        return selector_container;
    }
}
set_switch_btn = function(selector){
    let val = get_selector_val(selector);
    if(val == '1'){
        selector.addClass('switch_btn_selected')
    }else if(val == '0'){
        selector.removeClass('switch_btn_selected')
    }
    if(typeof(selector.attr('show_hide')) !== 'undefined'){
        let show_hide = selector.attr('show_hide').split('.');
        if(val == '1'){
            for(const key in show_hide){
                $(`.${show_hide[key]}`).removeClass('none')
            }
        }else if(val == '0'){
            for(const key in show_hide){
                $(`.${show_hide[key]}`).addClass('none')
            }
        }
    }
}
$('body').on('click','.switch_btn_action',function(e){
    //e.stopImmediatePropagation();
    let new_val;
    if($(this).hasClass('switch_btn_selected')){
        $(this).removeClass('switch_btn_selected')
        new_val = '0';
    }else{
        $(this).addClass('switch_btn_selected')
        new_val = '1';
    }
    set_elem_val($(this),new_val)
    new_action();
    if(typeof($(this).attr('show_hide')) !== 'undefined'){
        let show_hide = $(this).attr('show_hide').split('.');
        if(new_val == '1'){
            for(const key in show_hide){
                $(`.${show_hide[key]}`).removeClass('none')
            }
        }else if(new_val == '0'){
            for(const key in show_hide){
                $(`.${show_hide[key]}`).addClass('none')
            }
        }
    }
})
