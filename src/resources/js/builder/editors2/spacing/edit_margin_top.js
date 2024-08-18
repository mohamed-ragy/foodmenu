$('body').on('mousedown','.edit_margin_top',function(e){
    let elem_data = get_elem_data($(this).attr('key_tree'));
    let margin;
    if(window.current_view == 'desktop'){
        margin = elem_data.elem.css.margin.split(' ')
    }else if(window.current_view == 'mobile'){
        margin = elem_data.elem.css_mobile.margin.split(' ')
    }
    window.edit_margin_top.elem = $(this);
    window.edit_margin_top.key_tree = $(this).attr('key_tree');
    window.edit_margin_top.y = e.pageY;
    window.edit_margin_top.val = parseInt(margin[0]);
    $(this).addClass('edit_margin_selected')
})
edit_margin_top_fun = function(y){
    if(window.edit_margin_top.key_tree === undefined){return;}
    $('#website').css('cursor','n-resize')
    let elem_data = get_elem_data(window.edit_margin_top.key_tree);
    let margin;
    if(window.current_view == 'desktop'){
        margin = elem_data.elem.css.margin.split(' ')
    }else if(window.current_view == 'mobile'){
        margin = elem_data.elem.css_mobile.margin.split(' ')
    }
    margin[0] = (parseInt(y) - parseInt(window.edit_margin_top.y) ) + parseInt(window.edit_margin_top.val);
    if(margin[0] < 0){margin[0] = 0}
    if(margin[0] > 100){margin[0] = 100}

    margin[0] = spacing_symmetry_y(margin[0]);
    window.edit_margin_top.elem.removeClass('edit_margin_symmetry')
    window.edit_margin_top.elem.text(margin[0])

    let new_margin = `${margin[0]}px ${margin[1]} ${margin[2]} ${margin[3]}`
    if(window.current_view == 'desktop'){
        elem_data.elem.css.margin = new_margin;
    }else if(window.current_view == 'mobile'){
        elem_data.elem.css_mobile.margin = new_margin;
    }
    $(`.edit_margin_top[key_tree="${window.edit_margin_top.key_tree}"]`).height(`${margin[0]}px`).css('top',`-${margin[0]}px`)
    window.edit_margin_top.elem.parent().css('margin',new_margin)
}