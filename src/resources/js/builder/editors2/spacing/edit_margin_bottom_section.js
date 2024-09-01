$('body').on('mousedown','.edit_margin_bottom_section',function(e){
    let key_tree = $(this).closest('[key_tree]').attr('key_tree');
    let elem = get_element_data(key_tree);
    let margin_bottom;
    if(window.current_view == 'desktop'){
        margin_bottom = elem.css['margin-bottom']
    }else if(window.current_view == 'mobile'){
        margin_bottom = elem.css_mobile['margin-bottom']
    }
    window.edit_margin_bottom_section.elem = $(this);
    window.edit_margin_bottom_section.key_tree = key_tree;
    window.edit_margin_bottom_section.y = e.pageY;
    window.edit_margin_bottom_section.val = parseInt(margin_bottom);
    $(this).addClass('edit_margin_selected');
    hide_edit_btns();
})
edit_margin_bottom_section_fun = function(y){
    if(window.edit_margin_bottom_section.key_tree === undefined){return;}
    $('#website').css('cursor','n-resize')
    let elem = get_element_data(window.edit_margin_bottom_section.key_tree);
    let margin_bottom;
    if(window.current_view == 'desktop'){
        margin_bottom = elem.css['margin-bottom']
    }else if(window.current_view == 'mobile'){
        margin_bottom = elem.css_mobile['margin-bottom']
    }
    margin_bottom = ((parseInt(y) - parseInt(window.edit_margin_bottom_section.y))) + parseInt(window.edit_margin_bottom_section.val);
    if(margin_bottom < 0){margin_bottom = 0}
    if(margin_bottom > 200){margin_bottom = 200}

    if(margin_bottom > 5){
        margin_bottom = spacing_symmetry_y(margin_bottom);
    }
    window.edit_margin_bottom_section.elem.removeClass('edit_margin_symmetry')
    window.edit_margin_bottom_section.elem.text(margin_bottom)

    let new_margin = `${margin_bottom}px`
    if(window.current_view == 'desktop'){
        elem.css['margin-bottom'] = new_margin;
    }else if(window.current_view == 'mobile'){
        elem.css_mobile['margin-bottom'] = new_margin;
    }
    window.edit_margin_bottom_section.elem.height(new_margin).css('bottom',`-${new_margin}`)
    generate_elem_style(elem)
}