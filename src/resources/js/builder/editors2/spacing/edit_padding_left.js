$('body').on('mousedown','.edit_padding_left',function(e){
    let key_tree = $(this).closest('[key_tree]').attr('key_tree');
    let elem = get_element_data(key_tree);
    let padding;
    if(window.current_view == 'desktop'){
        padding = elem.css.padding.split(' ')
    }else if(window.current_view == 'mobile'){
        padding = elem.css_mobile.padding.split(' ')
    }
    window.edit_padding_left.elem = $(this);
    window.edit_padding_left.key_tree = key_tree
    window.edit_padding_left.x = e.pageX;
    window.edit_padding_left.val = parseInt(padding[3]);
    $(this).addClass('edit_padding_selected')
    hide_edit_btns();
})
edit_padding_left_fun = function(x){
    if(window.edit_padding_left.key_tree === undefined){return;}
    $('#website').css('cursor','e-resize')
    let elem = get_element_data(window.edit_padding_left.key_tree);
    let padding;
    if(window.current_view == 'desktop'){
        padding = elem.css.padding.split(' ')
    }else if(window.current_view == 'mobile'){
        padding = elem.css_mobile.padding.split(' ')
    }
    padding[3] = ((parseInt(x) - parseInt(window.edit_padding_left.x))) + parseInt(window.edit_padding_left.val);
    if(padding[3] < 0){padding[3] = 0}
    if(padding[3] > 100){padding[3] = 100}

    if(padding[3] > 5){
        padding[3] = spacing_symmetry_x(padding[3]);
    }
    window.edit_padding_left.elem.removeClass('edit_padding_symmetry')
    window.edit_padding_left.elem.text(padding[3])

    let new_padding = `${padding[0]} ${padding[1]} ${padding[2]} ${padding[3]}px`
    if(window.current_view == 'desktop'){
        elem.css.padding = new_padding;
    }else if(window.current_view == 'mobile'){
        elem.css_mobile.padding = new_padding;
    }
    window.edit_padding_left.elem.width(`${padding[3]}px`)
    generate_elem_style(elem)
}