$('body').on('mousedown','.edit_margin_bottom',function(e){
    let key_tree = $(this).closest('[key_tree]').attr('key_tree');
    let elem = get_element_data(key_tree);
    let margin;
    if(window.current_view == 'desktop'){
        margin = elem.css.margin.split(' ')
    }else if(window.current_view == 'mobile'){
        margin = elem.css_mobile.margin.split(' ')
    }
    window.edit_margin_bottom.elem = $(this);
    window.edit_margin_bottom.key_tree = key_tree;
    window.edit_margin_bottom.y = e.pageY;
    window.edit_margin_bottom.val = parseInt(margin[2]);
    $(this).addClass('edit_margin_selected')
})
edit_margin_bottom_fun = function(y){
    if(window.edit_margin_bottom.key_tree === undefined){return;}
    $('#website').css('cursor','n-resize')
    let elem = get_element_data(window.edit_margin_bottom.key_tree);
    let margin;
    if(window.current_view == 'desktop'){
        margin = elem.css.margin.split(' ')
    }else if(window.current_view == 'mobile'){
        margin = elem.css_mobile.margin.split(' ')
    }
    margin[2] = ( parseInt(y) - parseInt(window.edit_margin_bottom.y)) + parseInt(window.edit_margin_bottom.val);
    if(margin[2] < 0){margin[2] = 0}
    if(margin[2] > 100){margin[2] = 100}

    if(margin[2] > 5){
        margin[2] = spacing_symmetry_y(margin[2]);
    }
    window.edit_margin_bottom.elem.removeClass('edit_margin_symmetry')
    window.edit_margin_bottom.elem.text(margin[2])

    let new_margin = `${margin[0]} ${margin[1]} ${margin[2]}px ${margin[3]}`
    if(window.current_view == 'desktop'){
        elem.css.margin = new_margin;
    }else if(window.current_view == 'mobile'){
        elem.css_mobile.margin = new_margin;
    }
    window.edit_margin_bottom.elem.height(`${margin[2]}px`).css('bottom',`-${margin[2]}px`)
    generate_elem_style(elem)
}