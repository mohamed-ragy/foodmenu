$('body').on('mousedown','.edit_margin_right',function(e){
    let key_tree = $(this).closest('[key_tree]').attr('key_tree');
    let elem = get_element_data(key_tree);
    let margin;
    if(window.current_view == 'desktop'){
        margin = elem.css.margin.split(' ')
    }else if(window.current_view == 'mobile'){
        margin = elem.css_mobile.margin.split(' ')
    }
    window.edit_margin_right.elem = $(this);
    window.edit_margin_right.key_tree = key_tree;
    window.edit_margin_right.x = e.pageX;
    window.edit_margin_right.val = parseInt(margin[1]);
    $(this).addClass('edit_margin_selected')
})
edit_margin_right_fun = function(x){
    if(window.edit_margin_right.key_tree === undefined){return;}
    $('#website').css('cursor','e-resize')
    let elem = get_element_data(window.edit_margin_right.key_tree);
    let margin;
    if(window.current_view == 'desktop'){
        margin = elem.css.margin.split(' ')
    }else if(window.current_view == 'mobile'){
        margin = elem.css_mobile.margin.split(' ')
    }
    margin[1] = ((parseInt(x) - parseInt(window.edit_margin_right.x))) + parseInt(window.edit_margin_right.val);
    if(margin[1] < 0){margin[1] = 0}
    if(margin[1] > 100){margin[1] = 100}

    if(margin[1] > 5){
        margin[1] = spacing_symmetry_x(margin[1]);
    }
    window.edit_margin_right.elem.removeClass('edit_margin_symmetry')
    window.edit_margin_right.elem.text(margin[1])

    let new_margin = `${margin[0]} ${margin[1]}px ${margin[2]} ${margin[3]}`
    if(window.current_view == 'desktop'){
        elem.css.margin = new_margin;
    }else if(window.current_view == 'mobile'){
        elem.css_mobile.margin = new_margin;
    }
    window.edit_margin_right.elem.width(`${margin[1]}px`).css('right',`-${margin[1]}px`)
    generate_elem_style(elem)
}