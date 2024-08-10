$('body').on('mousedown','.edit_padding_right',function(e){
    let elem_data = get_elem_data($(this).attr('key_tree'));
    let padding;
    if(window.current_view == 'desktop'){
        padding = elem_data.elem.css.padding.split(' ')
    }else if(window.current_view == 'mobile'){
        padding = elem_data.elem.css_mobile.padding.split(' ')
    }
    window.edit_padding_right.elem = $(this);
    window.edit_padding_right.key_tree = $(this).attr('key_tree');
    window.edit_padding_right.x = e.pageX;
    window.edit_padding_right.val = parseInt(padding[1]);
    $(this).addClass('edit_padding_selected')
})
edit_padding_right_fun = function(x){
    if(window.edit_padding_right.key_tree === undefined){return;}
    $('#website').css('cursor','e-resize')
    let elem_data = get_elem_data(window.edit_padding_right.key_tree);
    let padding;
    if(window.current_view == 'desktop'){
        padding = elem_data.elem.css.padding.split(' ')
    }else if(window.current_view == 'mobile'){
        padding = elem_data.elem.css_mobile.padding.split(' ')
    }
    padding[1] = ((parseInt(window.edit_padding_right.x) - parseInt(x))) + parseInt(window.edit_padding_right.val);
    if(padding[1] < 0){padding[1] = 0}

    padding[1] = spacing_symmetry_x(padding[1]);
    window.edit_padding_right.elem.removeClass('edit_padding_symmetry')
    window.edit_padding_right.elem.text(padding[1])

    let new_padding = `${padding[0]} ${padding[1]}px ${padding[2]} ${padding[3]}`
    if(window.current_view == 'desktop'){
        elem_data.elem.css.padding = new_padding;
    }else if(window.current_view == 'mobile'){
        elem_data.elem.css_mobile.padding = new_padding;
    }
    $(`.edit_padding_right[key_tree="${window.edit_padding_right.key_tree}"]`).width(`${padding[1]}px`)
    $(`.edit[key_tree="${window.edit_padding_right.key_tree}"]`).css('padding',new_padding)
}