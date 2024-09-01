$('body').on('mousedown','.edit_padding_bottom_section',function(e){
    let key_tree = $(this).closest('[key_tree]').attr('key_tree');
    let elem = get_element_data(key_tree);
    let padding_bottom;
    if(window.current_view == 'desktop'){
        padding_bottom = elem.css['padding-bottom']
    }else if(window.current_view == 'mobile'){
        padding_bottom = elem.css_mobile['padding-bottom']
    }
    window.edit_padding_bottom_section.elem = $(this);
    window.edit_padding_bottom_section.key_tree = key_tree;
    window.edit_padding_bottom_section.y = e.pageY;
    window.edit_padding_bottom_section.val = parseInt(padding_bottom);
    $(this).addClass('edit_padding_selected');
    hide_edit_btns();
})
edit_padding_bottom_section_fun = function(y){
    if(window.edit_padding_bottom_section.key_tree === undefined){return;}
    $('#website').css('cursor','n-resize')
    let elem = get_element_data(window.edit_padding_bottom_section.key_tree);
    let padding_bottom;
    if(window.current_view == 'desktop'){
        padding_bottom = elem.css['padding-bottom']
    }else if(window.current_view == 'mobile'){
        padding_bottom = elem.css_mobile['padding-bottom']
    }
    padding_bottom = ((parseInt(y) - parseInt(window.edit_padding_bottom_section.y))) + parseInt(window.edit_padding_bottom_section.val);
    if(padding_bottom < 0){padding_bottom = 0}
    if(padding_bottom > 200){padding_bottom = 200}

    if(padding_bottom > 5){
        padding_bottom = spacing_symmetry_y(padding_bottom);
    }
    window.edit_padding_bottom_section.elem.removeClass('edit_padding_symmetry')
    window.edit_padding_bottom_section.elem.text(padding_bottom)

    let new_padding = `${padding_bottom}px`
    if(window.current_view == 'desktop'){
        elem.css['padding-bottom'] = new_padding;
    }else if(window.current_view == 'mobile'){
        elem.css_mobile['padding-bottom'] = new_padding;
    }
    window.edit_padding_bottom_section.elem.height(new_padding)
    generate_elem_style(elem)
}