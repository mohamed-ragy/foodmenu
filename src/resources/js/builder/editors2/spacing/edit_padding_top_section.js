$('body').on('mousedown','.edit_padding_top_section',function(e){
    let key_tree = $(this).closest('[key_tree]').attr('key_tree');
    let elem = get_element_data(key_tree);
    let padding_top;
    if(window.current_view == 'desktop'){
        padding_top = elem.css['padding-top']
    }else if(window.current_view == 'mobile'){
        padding_top = elem.css_mobile['padding-top']
    }
    window.edit_padding_top_section.elem = $(this);
    window.edit_padding_top_section.key_tree = key_tree;
    window.edit_padding_top_section.y = e.pageY;
    window.edit_padding_top_section.val = parseInt(padding_top);
    $(this).addClass('edit_padding_selected')
    hide_edit_btns();
})
edit_padding_top_section_fun = function(y){
    if(window.edit_padding_top_section.key_tree === undefined){return;}
    $('#website').css('cursor','n-resize')
    let elem = get_element_data(window.edit_padding_top_section.key_tree);
    let padding_top;
    if(window.current_view == 'desktop'){
        padding_top = elem.css['padding-top']
    }else if(window.current_view == 'mobile'){
        padding_top = elem.css_mobile['padding-top']
    }
    padding_top = ((parseInt(y) - parseInt(window.edit_padding_top_section.y))) + parseInt(window.edit_padding_top_section.val);
    if(padding_top < 0){padding_top = 0}
    if(padding_top > 200){padding_top = 200}
    if(padding_top > 5){
        padding_top = spacing_symmetry_y(padding_top);
    }
    window.edit_padding_top_section.elem.removeClass('edit_padding_symmetry')
    window.edit_padding_top_section.elem.text(padding_top)

    let new_padding = `${padding_top}px`
    if(window.current_view == 'desktop'){
        elem.css['padding-top'] = new_padding;
    }else if(window.current_view == 'mobile'){
        elem.css_mobile['padding-top'] = new_padding;
    }
    window.edit_padding_top_section.elem.height(new_padding)
    generate_elem_style(elem)
}