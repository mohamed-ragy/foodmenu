$('html,body').on('click','.select_box',function(e){
    e.stopImmediatePropagation();
    let keys = $(this).closest('.select_box_container').attr('key_tree').split('.');
    let template = window.template;
    for(const key in keys){
        template = template[keys[key]];
    }
    if($(this).closest('.select_box_container').hasClass('select_box_border_style')){
        let border_style = template[$(this).closest('.select_box_container').attr('key')].split(' ');
        let key_value = '';
        $(this).attr('key') == 'top' && $(this).hasClass('select_box_selected') ? key_value = key_value + 'none' : $(this).attr('key') == 'top' && !$(this).hasClass('select_box_selected') ? key_value = key_value + 'solid' : key_value = key_value + `${border_style[0]}`;
        $(this).attr('key') == 'right' && $(this).hasClass('select_box_selected') ? key_value = key_value + ' none' : $(this).attr('key') == 'right' && !$(this).hasClass('select_box_selected') ? key_value = key_value + ' solid' : key_value = key_value + ` ${border_style[1]}`;
        $(this).attr('key') == 'bottom' && $(this).hasClass('select_box_selected') ? key_value = key_value + ' none' : $(this).attr('key') == 'bottom' && !$(this).hasClass('select_box_selected') ? key_value = key_value + ' solid' : key_value = key_value + ` ${border_style[2]}`;
        $(this).attr('key') == 'left' && $(this).hasClass('select_box_selected') ? key_value = key_value + ' none' : $(this).attr('key') == 'left' && !$(this).hasClass('select_box_selected') ? key_value = key_value + ' solid' : key_value = key_value + ` ${border_style[3]}`;
        template[$(this).closest('.select_box_container').attr('key')] = key_value

    }else{
        template[$(this).closest('.select_box_container').attr('key')] = $(this).attr('key')
    }
    new_action();
})
