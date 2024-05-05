draw_color_theme_Picker = function(data){
    let elem_data = get_key_tree(data.keys_arr[0].key_tree);
    let elem_val = get_elem_val(elem_data,data.keys_arr[0].key,data.is_responsive ? '1':'0')
    let selector;
    let selector_container = $('<div/>',{class:`editor_popup_row ${data.selector_container_class === false ? '' : 'selector_container'}`,is_responsive:data.is_responsive ? '1':'0'}).append(
        $('<div/>',{class:'row alnC jstfyS'}).append(
            data.is_responsive && data.responsive_icon !== false ? responsive_icon(elem_val.responsive_class) : '',
            $('<div/>',{text:data.name}),
        ),
        selector = $('<div/>',{class:`selector color_theme_picker_container ${elem_val.val}`}).append(
            $('<div/>',{class:'mie-5',text:texts.styling[elem_val.val]}),
            $('<div/>',{class:'ico-arrowDown mis-5'}),
        )
    )

    for(const key in data.keys_arr){
        for(const key2 in data.keys_arr[key]){
            selector.attr(key2,data.keys_arr[key][key2]);
            selector.attr(key2,data.keys_arr[key][key2]);
        }
    }
    return selector_container;
}
set_color_theme_Picker = function(selector){
    let val = get_selector_val(selector);
    color_theme_Picker_container.removeClass().addClass(`color_theme_picker_container selector ${val}`).children().first().text(texts.styling[val])
}
$('body').on('click','.color_theme_picker_container',function(e){
    // e.stopImmediatePropagation();
    window.selected_color_theme_picker = $(this);
    let elem_val = get_selector_val($(this));
    $('.color_theme_picker_themes').text('').append(
        elem_val.val != 'transparent' && $(this).attr('key') != 'page_color_theme' ? $('<div/>',{class:'color_theme_picker_theme',text:texts.styling.transparent,key:'transparent'}) : '',
        elem_val.val != 'color_theme_1' ? $('<div/>',{class:'color_theme_picker_theme color_theme_1',text:texts.styling.color_theme_1,key:'color_theme_1'}) : '',
        elem_val.val != 'color_theme_2' ? $('<div/>',{class:'color_theme_picker_theme color_theme_2',text:texts.styling.color_theme_2,key:'color_theme_2'}) : '',
        elem_val.val != 'color_theme_3' ? $('<div/>',{class:'color_theme_picker_theme color_theme_3',text:texts.styling.color_theme_3,key:'color_theme_3'}) : '',
        elem_val.val != 'color_theme_4' ? $('<div/>',{class:'color_theme_picker_theme color_theme_4',text:texts.styling.color_theme_4,key:'color_theme_4'}) : '',
    ).removeClass('none').css({
        left:$(this).offset().left,
        top:$(this).offset().top + $(this).outerHeight(),
    })
})
$('body').on('click','.color_theme_picker_theme',function(e){
    // e.stopImmediatePropagation();
    let new_val = $(this).attr('key');
    set_elem_val(window.selected_color_theme_picker,new_val)
    window.selected_color_theme_picker.removeClass().addClass(`color_theme_picker_container selector ${new_val}`).children().first().text($(this).text())
    $('.color_theme_picker_themes').addClass('none')
    new_action();
})
