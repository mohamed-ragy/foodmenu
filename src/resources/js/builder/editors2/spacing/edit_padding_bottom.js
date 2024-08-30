$('body').on('mousedown','.edit_padding_bottom',function(e){
    let key_tree = $(this).closest('[key_tree]').attr('key_tree');
    let elem = get_element_data(key_tree);
    let padding;
    if(window.current_view == 'desktop'){
        padding = elem.css.padding.split(' ')
    }else if(window.current_view == 'mobile'){
        padding = elem.css_mobile.padding.split(' ')
    }
    window.edit_padding_bottom.elem = $(this);
    window.edit_padding_bottom.key_tree =key_tree
    window.edit_padding_bottom.y = e.pageY;
    window.edit_padding_bottom.val = parseInt(padding[2]);
    $(this).addClass('edit_padding_selected')
})
edit_padding_bottom_fun = function(y){
    if(window.edit_padding_bottom.key_tree === undefined){return;}
    $('#website').css('cursor','n-resize')
    let elem = get_element_data(window.edit_padding_bottom.key_tree);
    let padding;
    if(window.current_view == 'desktop'){
        padding = elem.css.padding.split(' ')
    }else if(window.current_view == 'mobile'){
        padding = elem.css_mobile.padding.split(' ')
    }
    padding[2] = ((parseInt(window.edit_padding_bottom.y) - parseInt(y))) + parseInt(window.edit_padding_bottom.val);
    if(padding[2] < 0){padding[2] = 0}
    if(padding[2] > 100){padding[2] = 100}
    if(padding[2] > 5){
        padding[2] = spacing_symmetry_y(padding[2]);
    }
    window.edit_padding_bottom.elem.removeClass('edit_padding_symmetry')
    window.edit_padding_bottom.elem.text(padding[2])

    let new_padding = `${padding[0]} ${padding[1]} ${padding[2]}px ${padding[3]}`
    if(window.current_view == 'desktop'){
        elem.css.padding = new_padding;
    }else if(window.current_view == 'mobile'){
        elem.css_mobile.padding = new_padding;
    }
    window.edit_padding_bottom.elem.height(`${padding[2]}px`)
    generate_elem_style(elem)
}