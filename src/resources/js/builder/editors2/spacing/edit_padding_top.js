$('body').on('mousedown','.edit_padding_top',function(e){
    let elem_data = get_elem_data($(this).attr('key_tree'));
    let padding;
    if(window.current_view == 'desktop'){
        padding = elem_data.elem.css.padding.split(' ')
    }else if(window.current_view == 'mobile'){
        padding = elem_data.elem.css_mobile.padding.split(' ')
    }
    window.edit_padding_top.elem = $(this);
    window.edit_padding_top.key_tree = $(this).attr('key_tree');
    window.edit_padding_top.y = e.pageY;
    window.edit_padding_top.val = parseInt(padding[0]);
    $(this).addClass('edit_padding_selected')
})
edit_padding_top_fun = function(y){
    if(window.edit_padding_top.key_tree === undefined){return;}
    $('#website').css('cursor','n-resize')
    let elem_data = get_elem_data(window.edit_padding_top.key_tree);
    let padding;
    if(window.current_view == 'desktop'){
        padding = elem_data.elem.css.padding.split(' ')
    }else if(window.current_view == 'mobile'){
        padding = elem_data.elem.css_mobile.padding.split(' ')
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
        elem_data.elem.css.padding = new_padding;
    }else if(window.current_view == 'mobile'){
        elem_data.elem.css_mobile.padding = new_padding;
    }
    $(`.edit_padding_top[key_tree="${window.edit_padding_top.key_tree}"]`).height(`${padding[0]}px`)
    $(`.edit[key_tree="${window.edit_padding_top.key_tree}"]`).css('padding',new_padding)
}