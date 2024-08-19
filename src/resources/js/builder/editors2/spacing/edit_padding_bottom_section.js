$('body').on('mousedown','.edit_padding_bottom_section',function(e){
    let elem_data = get_elem_data($(this).attr('key_tree'));
    let padding_bottom;
    if(window.current_view == 'desktop'){
        padding_bottom = elem_data.elem.css['padding-bottom']
    }else if(window.current_view == 'mobile'){
        padding_bottom = elem_data.elem.css_mobile['padding-bottom']
    }
    window.edit_padding_bottom_section.elem = $(this);
    window.edit_padding_bottom_section.key_tree = $(this).attr('key_tree');
    window.edit_padding_bottom_section.y = e.pageY;
    window.edit_padding_bottom_section.val = parseInt(padding_bottom);
    $(this).addClass('edit_padding_selected');
    console.log('gaga')
})
edit_padding_bottom_section_fun = function(y){
    if(window.edit_padding_bottom_section.key_tree === undefined){return;}
    $('#website').css('cursor','n-resize')
    let elem_data = get_elem_data(window.edit_padding_bottom_section.key_tree);
    let padding_bottom;
    if(window.current_view == 'desktop'){
        padding_bottom = elem_data.elem.css['padding-bottom']
    }else if(window.current_view == 'mobile'){
        padding_bottom = elem_data.elem.css_mobile['padding-bottom']
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
        elem_data.elem.css['padding-bottom'] = new_padding;
    }else if(window.current_view == 'mobile'){
        elem_data.elem.css_mobile['padding-bottom'] = new_padding;
    }
    $(`.edit_padding_bottom_section[key_tree="${window.edit_padding_bottom_section.key_tree}"]`).height(new_padding)
    $(`.section_wrapper[key_tree="${window.edit_padding_bottom_section.key_tree}"]`).css('padding-bottom',new_padding)
}