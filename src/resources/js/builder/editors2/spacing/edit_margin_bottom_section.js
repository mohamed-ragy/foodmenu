$('body').on('mousedown','.edit_margin_bottom_section',function(e){
    let elem_data = get_elem_data($(this).attr('key_tree'));
    let margin_bottom;
    if(window.current_view == 'desktop'){
        margin_bottom = elem_data.elem.css['margin-bottom']
    }else if(window.current_view == 'mobile'){
        margin_bottom = elem_data.elem.css_mobile['margin-bottom']
    }
    window.edit_margin_bottom_section.elem = $(this);
    window.edit_margin_bottom_section.key_tree = $(this).attr('key_tree');
    window.edit_margin_bottom_section.y = e.pageY;
    window.edit_margin_bottom_section.val = parseInt(margin_bottom);
    $(this).addClass('edit_margin_selected');
    console.log('gaga')
})
edit_margin_bottom_section_fun = function(y){
    if(window.edit_margin_bottom_section.key_tree === undefined){return;}
    $('#website').css('cursor','n-resize')
    let elem_data = get_elem_data(window.edit_margin_bottom_section.key_tree);
    let margin_bottom;
    if(window.current_view == 'desktop'){
        margin_bottom = elem_data.elem.css['margin-bottom']
    }else if(window.current_view == 'mobile'){
        margin_bottom = elem_data.elem.css_mobile['margin-bottom']
    }
    margin_bottom = ((parseInt(y) - parseInt(window.edit_margin_bottom_section.y))) + parseInt(window.edit_margin_bottom_section.val);
    if(margin_bottom < 0){margin_bottom = 0}

    margin_bottom = spacing_symmetry_y(margin_bottom);
    window.edit_margin_bottom_section.elem.removeClass('edit_margin_symmetry')
    window.edit_margin_bottom_section.elem.text(margin_bottom)

    let new_margin = `${margin_bottom}px`
    if(window.current_view == 'desktop'){
        elem_data.elem.css['margin-bottom'] = new_margin;
    }else if(window.current_view == 'mobile'){
        elem_data.elem.css_mobile['margin-bottom'] = new_margin;
    }
    $(`.edit_margin_bottom_section[key_tree="${window.edit_margin_bottom_section.key_tree}"]`).height(new_margin).css('bottom',`-${new_margin}`)
    $(`.section_wrapper[key_tree="${window.edit_margin_bottom_section.key_tree}"]`).css('margin-bottom',new_margin)
}