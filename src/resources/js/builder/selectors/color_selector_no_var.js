$('html,body').on('click','.color_select_no_var',function(e){
    e.stopImmediatePropagation();
    window.color_select_elem = $(this);
    $('.color_selector_palette_colors').text('').append(
        $('<div/>',{class:`color_select2_no_var bgc_1`,key:'c1'}),
        $('<div/>',{class:`color_select2_no_var bgc_2`,key:'c2'}),
        $('<div/>',{class:`color_select2_no_var bgc_3`,key:'c3'}),
        $('<div/>',{class:`color_select2_no_var bgc_4`,key:'c4'}),
        $('<div/>',{class:`color_select3_no_var ico-plus`,key:'custom'}),
    ).removeClass('none').css({
        left:$(this).offset().left - 3,
        top:$(this).offset().top + $(this).outerHeight(),
    })
})
$('html,body').on('click','.color_select3_no_var',function(e){
    e.stopImmediatePropagation();
    let keys = window.color_select_elem.attr('key_tree').split('.');
    let template = window.template;
    for(const key in keys){
        template = template[keys[key]];
    }

    window.color_select_elem.find('.color_select_no_var_input').val(template[window.color_select_elem.attr('key')])
    window.color_select_elem.find('.color_select_no_var_input')[0].click()
})
$('html,body').on('click','.color_select2_no_var',function(e){
    e.stopImmediatePropagation();
    let keys = window.color_select_elem.attr('key_tree').split('.');
    let template = window.template;
    for(const key in keys){
        template = template[keys[key]];
    }
    let r = window.template.website_colors[$(this).attr('key')].r
    let g = window.template.website_colors[$(this).attr('key')].g
    let b = window.template.website_colors[$(this).attr('key')].b

    template[window.color_select_elem.attr('key')] = rgb_To_Hex(r,g,b);

    new_action();
    hidePopupSelectors();
});

$('html,body').on('input','.color_select_no_var_input',function(e){
    e.stopImmediatePropagation()
    let keys = $(this).closest('.color_select_no_var').attr('key_tree').split('.');
    let template = window.template;
    for(const key in keys){
        template = template[keys[key]];
    }
    template[$(this).closest('.color_select_no_var').attr('key')] = $(this).val();
    undo_redo_actions();
})
$('html,body').on('change','.color_select_no_var_input',function(e){
    e.stopImmediatePropagation()
    new_action();
})
