$('html,body').on('click','.color_select',function(e){
    e.stopImmediatePropagation();
    window.color_select_elem = $(this);
    $('.color_selector_palette_colors').text('').append(
        $('<div/>',{class:`color_select2 bgc_1`,key:'c1'}),
        $('<div/>',{class:`color_select2 bgc_2`,key:'c2'}),
        $('<div/>',{class:`color_select2 bgc_3`,key:'c3'}),
        $('<div/>',{class:`color_select2 bgc_4`,key:'c4'}),
        $('<div/>',{class:`color_select3 ico-plus`,key:'custom'}),
    ).removeClass('none').css({
        left:$(this).offset().left - 3,
        top:$(this).offset().top + $(this).outerHeight(),
    })

})
$('html,body').on('click','.color_select3',function(e){
    e.stopImmediatePropagation();
    let keys = window.color_select_elem.attr('key_tree').split('.');
    let template = window.template;
    for(const key in keys){
        template = template[keys[key]];
    }
    let r = template[window.color_select_elem.attr('key')].r;
    let g = template[window.color_select_elem.attr('key')].g;
    let b = template[window.color_select_elem.attr('key')].b;

    window.color_select_elem.find('.color_select_input').val(rgb_To_Hex(r,g,b))
    window.color_select_elem.find('.color_select_input')[0].click()
})
$('html,body').on('click','.color_select2',function(e){
    e.stopImmediatePropagation();
    let keys = window.color_select_elem.attr('key_tree').split('.');
    let template = window.template;
    for(const key in keys){
        template = template[keys[key]];
    }
    let r = window.template.website_colors[$(this).attr('key')].r
    let g = window.template.website_colors[$(this).attr('key')].g
    let b = window.template.website_colors[$(this).attr('key')].b

    template[window.color_select_elem.attr('key')].r = r;
    template[window.color_select_elem.attr('key')].g = g;
    template[window.color_select_elem.attr('key')].b = b;
    new_action();
    hidePopupSelectors();
});

$('html,body').on('input','.color_select_input',function(e){
    e.stopImmediatePropagation()
    let keys = $(this).closest('.color_select').attr('key_tree').split('.');
    let template = window.template;
    for(const key in keys){
        template = template[keys[key]];
    }
    let color = hex_to_rgb($(this).val())
    template[$(this).closest('.color_select').attr('key')] = color;
    undo_redo_actions();
})
$('html,body').on('change','.color_select_input',function(e){
    e.stopImmediatePropagation()
    new_action();
})
