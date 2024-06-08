draw_font_style_selector = function(key_tree,key){
    return '';
    let elem_data = get_key_tree(key_tree);
    let elem_val = get_elem_val(elem_data,key,'0')
    let selector;
    let selector_container = $('<div/>',{class:'editor_popup_col selector_container',is_responsive:'0'}).append(
        $('<div/>',{text:texts.styling.font_style}),
        selector = $('<div/>',{class:'selector font_style_selector_container',key_tree:key_tree,key:key}).append(
            $('<div/>',{class:'font_style_selector_val',text:window.fonts.find(item=>item.name == elem_val.val).text ?? '',style:`font-family:${elem_val.val}`}),
            $('<div/>',{class:'ico-arrowDown'}),
        ),
    )
    return selector_container;
}
set_font_style_selector = function(selector){
    let val = get_selector_val(selector);
    selector.find('.font_style_selector_val').text(window.fonts.find(item=>item.name == val).text ?? '').css('font-family',val)
}
$('body').on('click','.font_style_selector_container',function(e){
    // e.stopImmediatePropagation();
    window.selected_font_style_selector = $(this);
    $('.font_style_selector_elems').text('').removeClass('none').css({
        left:$(this).offset().left,
        top:$(this).offset().top + $(this).outerHeight(),
    })
    for(const key in window.fonts){
        $('.font_style_selector_elems').append(
            $('<div/>',{class:`font_style_selector_elem`,style:`font-family:${window.fonts[key].name}`,text:window.fonts[key].text,key:window.fonts[key].name}),
        )
    }
})
$('body').on('click','.font_style_selector_elem',function(e){
    // e.stopImmediatePropagation();
    let new_val = $(this).attr('key')
    set_elem_val(window.selected_font_style_selector,new_val)
    window.selected_font_style_selector.find('.font_style_selector_val')
        .text(window.fonts.find(item=>item.name == $(this).attr('key')).text)
        .css('font-family',$(this).attr('key'));

    new_action();
})
