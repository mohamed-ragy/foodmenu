draw_image_position_selector = function(data){
    return '';
    let elem_data = get_key_tree(data.keys_arr[0].key_tree);
    let elem_val = get_elem_val(elem_data,data.keys_arr[0].key,data.is_responsive ? '1':'0');
    let selector;

    let val = elem_val.val.replaceAll('%','').split(' ');

    let selector_container = $('<div/>',{class:`editor_popup_col ${data.selector_container_class === false ? '' : 'selector_container'} ${data.container_class ?? ''}`,is_responsive:data.is_responsive ? '1':'0'}).append(
        draw_selector_name({data:data,name:texts.styling.imagePosition,responsive_class:elem_val.responsive_class}),
        selector = $('<div/>',{class:'selector image_position_btns_container'}).append(
            $('<div/>',{class:'row alnC jstfyC'}).append(
                $('<div/>',{}),
                $('<div/>',{class:'image_position_btn turbo ico-arrowUp',position_direction:'up',tooltip:`${val[1]}%`}),
                $('<div/>',{}),
                $('<div/>'),
            ),
            $('<div/>',{class:'row alnC jstfyC'}).append(
                $('<div/>',{class:'image_position_btn turbo ico-arrowLeft',position_direction:'left',tooltip:`${val[0]}%`}),
                $('<div/>',{class:'image_position_btn ico-dot_circle',position_direction:'center',tooltip:texts.styling.center}),
                $('<div/>',{class:'image_position_btn turbo ico-arrowRight',position_direction:'right',tooltip:`${val[0]}%`}),
            ),
            $('<div/>',{class:'row alnC jstfyC'}).append(
                $('<div/>'),
                $('<div/>',{}),
                $('<div/>',{class:'image_position_btn turbo ico-arrowDown',position_direction:'down',tooltip:`${val[1]}%`}),
                $('<div/>',{}),
            ),
        )
    )
    for(const key in data.keys_arr){
        for(const key2 in data.keys_arr[key]){
            selector.attr(key2,data.keys_arr[key][key2]);
        }
    }
    return selector_container;
}
set_image_position_selector = function(selector){
    let val = get_selector_val(selector);
    val = val.replaceAll('%','').split(' ');
    selector.find('.image_position_btn[position_direction="left"]').attr('tooltip',`${val[0]}%`)
    selector.find('.image_position_btn[position_direction="right"]').attr('tooltip',`${val[0]}%`)
    selector.find('.image_position_btn[position_direction="up"]').attr('tooltip',`${val[1]}%`)
    selector.find('.image_position_btn[position_direction="down"]').attr('tooltip',`${val[1]}%`)
    updateToolTip();
}
$('body').on('click','.image_position_btn',function(e){
    let selector = $(this).closest('.selector');
    let val = get_selector_val(selector);
    val = val.replaceAll('%','').split(' ');
    if(
        val[1] == 0 && $(this).attr('position_direction') == 'up' ||
        val[1] == 100 && $(this).attr('position_direction') == 'down' ||
        val[0] == 0 && $(this).attr('position_direction') == 'left' ||
        val[0] == 100 && $(this).attr('position_direction') == 'right'
    ){
        return;
    }
    switch ($(this).attr('position_direction')) {
        case 'up':
            val[1] <= 0 ? val[1] = 0 : val[1] = parseInt(val[1]) - 1;
        break;
        case 'down':
            val[1] >= 100 ? val[1] = 100 : val[1] = parseInt(val[1]) + 1;
        break;
        case 'left':
            val[0] <= 0 ? val[0] = 0 : val[0] = parseInt(val[0]) - 1;
        break;
        case 'right':
            val[0] >= 100 ? val[0] = 100 : val[0] = parseInt(val[0]) + 1;
        break;
        case 'center':
            val[0] = 50;
            val[1] = 50;
        break;
    }

    let new_val = `${val[0]}% ${val[1]}%`;
    set_elem_val($(this),new_val)
    set_image_position_selector(selector)
    new_action();
    updateToolTip();
})
