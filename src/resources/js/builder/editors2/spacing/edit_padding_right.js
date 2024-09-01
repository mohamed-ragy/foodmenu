$('body').on('mousedown','.edit_padding_right',function(e){
    let key_tree = $(this).closest('[key_tree]').attr('key_tree');
    let elem = get_element_data(key_tree);
    let padding;
    if(window.current_view == 'desktop'){
        padding = elem.css.padding.split(' ')
    }else if(window.current_view == 'mobile'){
        padding = elem.css_mobile.padding.split(' ')
    }
    window.edit_padding_right.elem = $(this);
    window.edit_padding_right.key_tree = key_tree
    window.edit_padding_right.x = e.pageX;
    window.edit_padding_right.val = parseInt(padding[1]);
    $(this).addClass('edit_padding_selected')
    hide_edit_btns();
})
edit_padding_right_fun = function(x){
    if(window.edit_padding_right.key_tree === undefined){return;}
    $('#website').css('cursor','e-resize')
    let elem = get_element_data(window.edit_padding_right.key_tree);
    let padding;
    if(window.current_view == 'desktop'){
        padding = elem.css.padding.split(' ')
    }else if(window.current_view == 'mobile'){
        padding = elem.css_mobile.padding.split(' ')
    }
    padding[1] = ((parseInt(window.edit_padding_right.x) - parseInt(x))) + parseInt(window.edit_padding_right.val);
    if(padding[1] < 0){padding[1] = 0}
    if(padding[1] > 100){padding[1] = 100}

    if(padding[1] > 5){
        padding[1] = spacing_symmetry_x(padding[1]);
    }
    window.edit_padding_right.elem.removeClass('edit_padding_symmetry')
    window.edit_padding_right.elem.text(padding[1])

    let new_padding = `${padding[0]} ${padding[1]}px ${padding[2]} ${padding[3]}`
    if(window.current_view == 'desktop'){
        elem.css.padding = new_padding;
    }else if(window.current_view == 'mobile'){
        elem.css_mobile.padding = new_padding;
    }
    window.edit_padding_right.elem.width(`${padding[1]}px`)
    generate_elem_style(elem)
}