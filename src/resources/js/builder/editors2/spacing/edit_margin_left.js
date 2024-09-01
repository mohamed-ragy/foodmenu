$('body').on('mousedown','.edit_margin_left',function(e){
    let key_tree = $(this).closest('[key_tree]').attr('key_tree');
    let elem = get_element_data(key_tree);
    let margin;
    if(window.current_view == 'desktop'){
        margin = elem.css.margin.split(' ')
    }else if(window.current_view == 'mobile'){
        margin = elem.css_mobile.margin.split(' ')
    }
    window.edit_margin_left.elem = $(this);
    window.edit_margin_left.key_tree = key_tree;
    window.edit_margin_left.x = e.pageX;
    window.edit_margin_left.val = parseInt(margin[3]);
    $(this).addClass('edit_margin_selected')
    hide_edit_btns();
})
edit_margin_left_fun = function(x){
    if(window.edit_margin_left.key_tree === undefined){return;}
    $('#website').css('cursor','e-resize')
    let elem = get_element_data(window.edit_margin_left.key_tree);
    let margin;
    if(window.current_view == 'desktop'){
        margin = elem.css.margin.split(' ')
    }else if(window.current_view == 'mobile'){
        margin = elem.css_mobile.margin.split(' ')
    }
    margin[3] = (( parseInt(window.edit_margin_left.x) - parseInt(x))) + parseInt(window.edit_margin_left.val);
    if(margin[3] < 0){margin[3] = 0}
    if(margin[3] > 100){margin[3] = 100}

    if(margin[3] > 5){
        margin[3] = spacing_symmetry_x(margin[3]);
    }
    window.edit_margin_left.elem.removeClass('edit_margin_symmetry')
    window.edit_margin_left.elem.text(margin[3])

    let new_margin = `${margin[0]} ${margin[1]} ${margin[2]} ${margin[3]}px`
    if(window.current_view == 'desktop'){
        elem.css.margin = new_margin;
    }else if(window.current_view == 'mobile'){
        elem.css_mobile.margin = new_margin;
    }
    window.edit_margin_left.elem.width(`${margin[3]}px`).css('left',`-${margin[3]}px`)
    generate_elem_style(elem)
}