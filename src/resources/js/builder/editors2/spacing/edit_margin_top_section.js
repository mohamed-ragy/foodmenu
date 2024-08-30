$('body').on('mousedown','.edit_margin_top_section',function(e){
    let key_tree = $(this).closest('[key_tree]').attr('key_tree');
    let elem = get_element_data(key_tree);
    let margin_top;
    if(window.current_view == 'desktop'){
        margin_top = elem.css['margin-top']
    }else if(window.current_view == 'mobile'){
        margin_top = elem.css_mobile['margin-top']
    }
    window.edit_margin_top_section.elem = $(this);
    window.edit_margin_top_section.key_tree = key_tree;
    window.edit_margin_top_section.y = e.pageY;
    window.edit_margin_top_section.val = parseInt(margin_top);
    $(this).addClass('edit_margin_selected')
})
edit_margin_top_section_fun = function(y){
    if(window.edit_margin_top_section.key_tree === undefined){return;}
    $('#website').css('cursor','n-resize')
    let elem = get_element_data(window.edit_margin_top_section.key_tree);
    let margin_top;
    if(window.current_view == 'desktop'){
        margin_top = elem.css['margin-top']
    }else if(window.current_view == 'mobile'){
        margin_top = elem.css_mobile['margin-top']
    }
    margin_top = ((parseInt(y) - parseInt(window.edit_margin_top_section.y))) + parseInt(window.edit_margin_top_section.val);
    if(margin_top < 0){margin_top = 0}
    if(margin_top > 200){margin_top = 200}
    if(margin_top > 5){
        margin_top = spacing_symmetry_y(margin_top);
    }
    window.edit_margin_top_section.elem.removeClass('edit_margin_symmetry')
    window.edit_margin_top_section.elem.text(margin_top)

    let new_margin = `${margin_top}px`
    if(window.current_view == 'desktop'){
        elem.css['margin-top'] = new_margin;
    }else if(window.current_view == 'mobile'){
        elem.css_mobile['margin-top'] = new_margin;
    }
    window.edit_margin_top_section.elem.height(new_margin).css('top',`-${new_margin}`)
    generate_elem_style(elem)
}