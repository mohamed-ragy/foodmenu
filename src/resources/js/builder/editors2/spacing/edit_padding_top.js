$('body').on('mousedown','.edit_padding_top',function(e){
    let key_tree = $(this).closest('[key_tree]').attr('key_tree');
    let elem = get_element_data(key_tree);
    let padding;
    if(window.current_view == 'desktop'){
        padding = elem.css.padding.split(' ')
    }else if(window.current_view == 'mobile'){
        padding = elem.css_mobile.padding.split(' ')
    }
    window.edit_padding_top.elem = $(this);
    window.edit_padding_top.key_tree = key_tree;
    window.edit_padding_top.y = e.pageY;
    window.edit_padding_top.val = parseInt(padding[0]);
    $(this).addClass('edit_padding_selected')
})
edit_padding_top_fun = function(y){
    if(window.edit_padding_top.key_tree === undefined){return;}
    $('#website').css('cursor','n-resize')
    let elem = get_element_data(window.edit_padding_top.key_tree);
    let padding;
    if(window.current_view == 'desktop'){
        padding = elem.css.padding.split(' ')
    }else if(window.current_view == 'mobile'){
        padding = elem.css_mobile.padding.split(' ')
    }
    padding[0] = ((parseInt(y) - parseInt(window.edit_padding_top.y))) + parseInt(window.edit_padding_top.val);
    if(padding[0] < 0){padding[0] = 0}
    if(padding[0] > 100){padding[0] = 100}
    if(padding[0] > 5){
        padding[0] = spacing_symmetry_y(padding[0]);
    }
    window.edit_padding_top.elem.removeClass('edit_padding_symmetry')
    window.edit_padding_top.elem.text(padding[0])

    let new_padding = `${padding[0]}px ${padding[1]} ${padding[2]} ${padding[3]}`
    if(window.current_view == 'desktop'){
        elem.css.padding = new_padding;
    }else if(window.current_view == 'mobile'){
        elem.css_mobile.padding = new_padding;
    }
    window.edit_padding_top.elem.height(`${padding[0]}px`)
    generate_elem_style(elem)
}