$('body').on('mousedown','.edit_padding_bottom',function(e){
    let elem_data = get_elem_data($(this).attr('key_tree'));
    let padding;
    if(window.current_view == 'desktop'){
        padding = elem_data.elem.css.padding.split(' ')
    }else if(window.current_view == 'mobile'){
        padding = elem_data.elem.css_mobile.padding.split(' ')
    }
    window.edit_padding_bottom.elem = $(this);
    window.edit_padding_bottom.key_tree = $(this).attr('key_tree');
    window.edit_padding_bottom.y = e.pageY;
    window.edit_padding_bottom.val = parseInt(padding[2]);
    $(this).addClass('edit_padding_selected')
})
edit_padding_bottom_fun = function(y){
    if(window.edit_padding_bottom.key_tree === undefined){return;}
    $('#website').css('cursor','n-resize')
    let elem_data = get_elem_data(window.edit_padding_bottom.key_tree);
    let padding;
    if(window.current_view == 'desktop'){
        padding = elem_data.elem.css.padding.split(' ')
    }else if(window.current_view == 'mobile'){
        padding = elem_data.elem.css_mobile.padding.split(' ')
    }
    padding[2] = ((parseInt(window.edit_padding_bottom.y) - parseInt(y))) + parseInt(window.edit_padding_bottom.val);
    if(padding[2] < 0){padding[2] = 0}
    if(padding[2] > 100){padding[2] = 100}

    padding[2] = spacing_symmetry_y(padding[2]);
    window.edit_padding_bottom.elem.removeClass('edit_padding_symmetry')
    window.edit_padding_bottom.elem.text(padding[2])

    let new_padding = `${padding[0]} ${padding[1]} ${padding[2]}px ${padding[3]}`
    if(window.current_view == 'desktop'){
        elem_data.elem.css.padding = new_padding;
    }else if(window.current_view == 'mobile'){
        elem_data.elem.css_mobile.padding = new_padding;
    }
    $(`.edit_padding_bottom[key_tree="${window.edit_padding_bottom.key_tree}"]`).height(`${padding[2]}px`)
    $(`.edit[key_tree="${window.edit_padding_bottom.key_tree}"]`).css('padding',new_padding)
}