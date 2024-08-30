$('body').on('mousedown','.edit_margin_top',function(e){
    let key_tree = $(this).closest('[key_tree]').attr('key_tree');
    let elem = get_element_data(key_tree);
    let margin;
    if(window.current_view == 'desktop'){
        margin = elem.css.margin.split(' ')
    }else if(window.current_view == 'mobile'){
        margin = elem.css_mobile.margin.split(' ')
    }
    window.edit_margin_top.elem = $(this);
    window.edit_margin_top.key_tree = key_tree;
    window.edit_margin_top.y = e.pageY;
    window.edit_margin_top.val = parseInt(margin[0]);
    $(this).addClass('edit_margin_selected')
})
edit_margin_top_fun = function(y){
    if(window.edit_margin_top.key_tree === undefined){return;}
    $('#website').css('cursor','n-resize')
    let elem = get_element_data(window.edit_margin_top.key_tree);
    let margin;
    if(window.current_view == 'desktop'){
        margin = elem.css.margin.split(' ')
    }else if(window.current_view == 'mobile'){
        margin = elem.css_mobile.margin.split(' ')
    }
    margin[0] = (parseInt(y) - parseInt(window.edit_margin_top.y) ) + parseInt(window.edit_margin_top.val);
    if(margin[0] < 0){margin[0] = 0}
    if(margin[0] > 100){margin[0] = 100}
    if(margin[0] > 5){
        margin[0] = spacing_symmetry_y(margin[0]);
    }
    window.edit_margin_top.elem.removeClass('edit_margin_symmetry')
    window.edit_margin_top.elem.text(margin[0])

    let new_margin = `${margin[0]}px ${margin[1]} ${margin[2]} ${margin[3]}`
    if(window.current_view == 'desktop'){
        elem.css.margin = new_margin;
    }else if(window.current_view == 'mobile'){
        elem.css_mobile.margin = new_margin;
    }
    window.edit_margin_top.elem.height(`${margin[0]}px`).css('top',`-${margin[0]}px`)
    generate_elem_style(elem)
}