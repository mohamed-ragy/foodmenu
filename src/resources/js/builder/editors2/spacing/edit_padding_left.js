$('body').on('mousedown','.edit_padding_left',function(e){
    let elem_data = get_elem_data($(this).attr('key_tree'));
    let padding;
    if(window.current_view == 'desktop'){
        padding = elem_data.elem.css.padding.split(' ')
    }else if(window.current_view == 'mobile'){
        padding = elem_data.elem.css_mobile.padding.split(' ')
    }
    window.edit_padding_left.elem = $(this);
    window.edit_padding_left.key_tree = $(this).attr('key_tree');
    window.edit_padding_left.x = e.pageX;
    window.edit_padding_left.val = parseInt(padding[3]);
    $(this).addClass('edit_padding_selected')
})
edit_padding_left_fun = function(x){
    if(window.edit_padding_left.key_tree === undefined){return;}
    $('#website').css('cursor','e-resize')
    let elem_data = get_elem_data(window.edit_padding_left.key_tree);
    let padding;
    if(window.current_view == 'desktop'){
        padding = elem_data.elem.css.padding.split(' ')
    }else if(window.current_view == 'mobile'){
        padding = elem_data.elem.css_mobile.padding.split(' ')
    }
    padding[3] = ((parseInt(x) - parseInt(window.edit_padding_left.x))) + parseInt(window.edit_padding_left.val);
    if(padding[3] < 0){padding[3] = 0}

    padding[3] = spacing_symmetry_x(padding[3]);
    window.edit_padding_left.elem.removeClass('edit_padding_symmetry')
    window.edit_padding_left.elem.text(padding[3])

    let new_padding = `${padding[0]} ${padding[1]} ${padding[2]} ${padding[3]}px`
    if(window.current_view == 'desktop'){
        elem_data.elem.css.padding = new_padding;
    }else if(window.current_view == 'mobile'){
        elem_data.elem.css_mobile.padding = new_padding;
    }
    $(`.edit_padding_left[key_tree="${window.edit_padding_left.key_tree}"]`).width(`${padding[3]}px`)
    $(`.edit[key_tree="${window.edit_padding_left.key_tree}"]`).css('padding',new_padding)
}