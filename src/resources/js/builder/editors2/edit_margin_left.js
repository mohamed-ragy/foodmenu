$('body').on('mousedown','.edit_margin_left',function(e){
    let elem_data = get_elem_data($(this).attr('key_tree'));
    let margin;
    if(window.current_view == 'desktop'){
        margin = elem_data.elem.css.margin.split(' ')
    }else if(window.current_view == 'mobile'){
        margin = elem_data.elem.css_mobile.margin.split(' ')
    }
    window.edit_margin_left.elem = $(this);
    window.edit_margin_left.key_tree = $(this).attr('key_tree');
    window.edit_margin_left.x = e.pageX;
    window.edit_margin_left.val = parseInt(margin[3]);
    $(this).addClass('edit_margin_selected')
})
edit_margin_left_fun = function(x){
    if(window.edit_margin_left.key_tree === undefined){return;}
    $('#website').css('cursor','e-resize')
    let elem_data = get_elem_data(window.edit_margin_left.key_tree);
    let margin;
    if(window.current_view == 'desktop'){
        margin = elem_data.elem.css.margin.split(' ')
    }else if(window.current_view == 'mobile'){
        margin = elem_data.elem.css_mobile.margin.split(' ')
    }
    margin[3] = (( parseInt(window.edit_margin_left.x) - parseInt(x))) + parseInt(window.edit_margin_left.val);
    if(margin[3] < 0){margin[3] = 0}

    margin[3] = spacing_symmetry_x(margin[3]);
    window.edit_margin_left.elem.removeClass('edit_margin_symmetry')
    window.edit_margin_left.elem.text(margin[3])

    let new_margin = `${margin[0]} ${margin[1]} ${margin[2]} ${margin[3]}px`
    if(window.current_view == 'desktop'){
        elem_data.elem.css.margin = new_margin;
    }else if(window.current_view == 'mobile'){
        elem_data.elem.css_mobile.margin = new_margin;
    }
    $(`.edit_margin_left[key_tree="${window.edit_margin_left.key_tree}"]`).width(`${margin[3]}px`).css('left',`-${margin[3]}px`)
    window.edit_margin_left.elem.parent().css('margin',new_margin)
}