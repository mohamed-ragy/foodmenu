$('body').on('mousedown','.edit_margin_right',function(e){
    let elem_data = get_elem_data($(this).attr('key_tree'));
    let margin;
    if(window.current_view == 'desktop'){
        margin = elem_data.elem.css.margin.split(' ')
    }else if(window.current_view == 'mobile'){
        margin = elem_data.elem.css_mobile.margin.split(' ')
    }
    window.edit_margin_right.elem = $(this);
    window.edit_margin_right.key_tree = $(this).attr('key_tree');
    window.edit_margin_right.x = e.pageX;
    window.edit_margin_right.val = parseInt(margin[1]);
    $(this).addClass('edit_margin_selected')
})
edit_margin_right_fun = function(x){
    if(window.edit_margin_right.key_tree === undefined){return;}
    $('#website').css('cursor','e-resize')
    let elem_data = get_elem_data(window.edit_margin_right.key_tree);
    let margin;
    if(window.current_view == 'desktop'){
        margin = elem_data.elem.css.margin.split(' ')
    }else if(window.current_view == 'mobile'){
        margin = elem_data.elem.css_mobile.margin.split(' ')
    }
    margin[1] = ((parseInt(x) - parseInt(window.edit_margin_right.x))) + parseInt(window.edit_margin_right.val);
    if(margin[1] < 0){margin[1] = 0}

    margin[1] = spacing_symmetry_x(margin[1]);
    window.edit_margin_right.elem.removeClass('edit_margin_symmetry')
    window.edit_margin_right.elem.text(margin[1])

    let new_margin = `${margin[0]} ${margin[1]}px ${margin[2]} ${margin[3]}`
    if(window.current_view == 'desktop'){
        elem_data.elem.css.margin = new_margin;
    }else if(window.current_view == 'mobile'){
        elem_data.elem.css_mobile.margin = new_margin;
    }
    $(`.edit_margin_right[key_tree="${window.edit_margin_right.key_tree}"]`).width(`${margin[1]}px`).css('right',`-${margin[1]}px`)
    window.edit_margin_right.elem.parent().css('margin',new_margin)
}