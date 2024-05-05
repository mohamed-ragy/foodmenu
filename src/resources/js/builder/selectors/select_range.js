draw_select_range = function(data){
    let elem_data = get_key_tree(data.keys_arr[0].key_tree);
    let elem_val = get_elem_val(elem_data,data.keys_arr[0].key,data.is_responsive ? '1' : '0')
    let selector;
    let select_range;
    let selector_container = $('<div/>',{class:`editor_popup_row ${data.selector_container_class === false ? '' : 'selector_container'} ${data.container_class ?? ''}`,is_responsive:data.is_responsive ? '1':'0'}).append(
        $('<div/>',{class:'row alnC jstfyS'}).append(
            data.is_responsive && data.responsive_icon !== false ? responsive_icon(elem_val.responsive_class) : '',
            $('<div/>',{text:data.name}),
            data.after_name ?? '',
        ),
        selector = $('<div/>',{class:`selector select_range_container ${data.select_range_container_class ?? ''}`}).append(
            $('<div/>',{class:'select_range_minus turbo ico-minus fs05 pointer pY10 pX10',step:data.range.step}),
            $('<div/>',{class:'select_range_slider',min:data.range.min,max:data.range.max,step:data.range.step,unit:data.unit}).append(
                select_range = $('<div/>',{class:'select_range',onmove:'0'}),
            ),
            $('<div/>',{class:'select_range_plus turbo ico-plus fs05 pointer pY10 pis-10',step:data.range.step}),
        )
    )
    for(const key in data.keys_arr){
        for(const key2 in data.keys_arr[key]){
            selector.attr(key2,data.keys_arr[key][key2]);
            selector.attr(key2,data.keys_arr[key][key2]);
        }
    }
    select_range.css('left',calc_select_range_ratio(data.range.min,data.range.max,data.range.step,elem_val.val));
    if(data.name == null){
        return selector;
    }else{
        return selector_container;
    }
}
draw_dummy_select_range = function(data){
    let select_range;
    let dummy_selector = $('<div/>',{class:`editor_popup_row dummy_selector_container ${data.container_class ?? ''}`}).append(
        $('<div/>',{class:'row alnC jstfyS'}).append(
            $('<div/>',{text:data.name}),
        ),
        $('<div/>',{class:`select_range_container dummy_select_range ${data.select_range_container_class ?? ''}`}).append(
            $('<div/>',{class:'select_range_minus turbo ico-minus fs05 pointer pY10 pX10',step:data.range.step}),
            $('<div/>',{class:'select_range_slider',min:data.range.min,max:data.range.max,step:data.range.step,unit:data.unit,slider_val:data.val}).append(
                select_range = $('<div/>',{class:'select_range',onmove:'0'}),
            ),
            $('<div/>',{class:'select_range_plus turbo ico-plus fs05 pointer pY10 pis-10',step:data.range.step}),
        )
    )
    select_range.css('left',calc_select_range_ratio(data.range.min,data.range.max,data.range.step,data.val));
    return dummy_selector;

}
set_dummy_select_range_slider = function(dummy_selector_container,val){
    let select_range_slider = dummy_selector_container.find('.select_range_slider')
    let min = select_range_slider.attr('min');
    let max = select_range_slider.attr('max');
    let step = select_range_slider.attr('step');
    let unit = select_range_slider.attr('unit');
    if(val !== null){
        select_range_slider.find('.select_range').css('left',`${calc_select_range_ratio(min,max,step,parseFloat(val))}px`);
        select_range_slider.closest('.select_range_container').attr('tooltip',`${val}`)
        select_range_slider.attr('slider_val',val)
        updateToolTip();
    }else{
        select_range_slider.closest('.select_range_container').attr('tooltip',`--`)
        select_range_slider.find('.select_range').css('left',`0px`);
        select_range_slider.attr('slider_val','0px')
    }
}
set_select_range_slider = function(selector){
    let select_range_slider = selector.find('.select_range_slider')
    let min = select_range_slider.attr('min');
    let max = select_range_slider.attr('max');
    let step = select_range_slider.attr('step');
    let unit = select_range_slider.attr('unit');
    let val = get_selector_val(selector);
    if(val !== null){
        select_range_slider.find('.select_range').css('left',`${calc_select_range_ratio(min,max,step,parseFloat(val))}px`);
        select_range_slider.closest('.select_range_container').attr('tooltip',`${val}`)
        updateToolTip();
    }else{
        select_range_slider.closest('.select_range_container').attr('tooltip',`--`)
        select_range_slider.find('.select_range').css('left',`0px`);
    }

}
calc_select_range_ratio = function(min,max,step,val){
    let range = max - min;
    let normalizedValue = parseFloat(val) - min;
    let ratio = ((normalizedValue / range) * 120) - 7;
    step >= 1 ? ratio = Math.round(ratio) : ratio = parseFloat(ratio.toFixed(1));
    return ratio;
}
set_select_range = function(select_range_slider,slider_position){
    let selector = select_range_slider.closest('.selector')
    let min = select_range_slider.attr('min');
    let max = select_range_slider.attr('max');
    let step = select_range_slider.attr('step');
    let unit = select_range_slider.attr('unit');
    let val = clac_select_range_val(min,max,step,slider_position);
    if(val < min){val = min}
    if(val > max){val = max}
    if(select_range_slider.closest('.select_range_container').hasClass('dummy_select_range')){
        select_range_slider.attr('slider_val',val+unit)
        select_range_slider.closest('.dummy_selector_container').trigger('slide')
    }else{
        set_elem_val(selector,val+unit)
        new_action();
    }
    return val+unit;
}
clac_select_range_val = function(min,max,step,slider_position){
    let range = parseFloat(max) - parseFloat(min);
    let scaledValue = (parseFloat(slider_position) / 120) * range;
    let val = scaledValue + parseFloat(min);
    val > parseFloat(max) ? val = parseFloat(max) : val < parseFloat(min) ? val = parseFloat(min) : null;
    if(step >= 1){val = Math.round(val)}else{val = parseFloat(val.toFixed(1))}
    return val;
}
$('body').on('mousedown','.select_range_slider',function(e){
    //e.stopImmediatePropagation();
    $(this).find('.select_range').attr('onmove','1')
});
$('body').on('mousemove','.select_range_slider',function(e){
    // //e.stopImmediatePropagation();
    let elementOffset = $(this).offset();
    let clickX = e.pageX;
    let relativeX = clickX - elementOffset.left;
    if(relativeX < 0 ){relativeX = 0}
    if(relativeX > 120 ){relativeX = 120}
    $(this).closest('.select_range_container').attr('tooltip',clac_select_range_val($(this).attr('min'),$(this).attr('max'),$(this).attr('step'),relativeX)+$(this).attr('unit'))
    if($(this).find('.select_range').attr('onmove') == '1'){
        $(this).find('.select_range').css('left',relativeX - 7)
    }

});
$('body').on('mouseup','.select_range_slider',function(e){
    //e.stopImmediatePropagation();
    $(this).find('.select_range').attr('onmove','0')
    let elementOffset = $(this).offset();
    let clickX = e.pageX;
    let relativeX = clickX - elementOffset.left;
    if(relativeX < 0 ){relativeX = 0}
    if(relativeX > 120 ){relativeX = 120}
    $(this).find('.select_range').css('left',relativeX - 7)
    set_select_range(
        $(this),
        relativeX,
    )
})
$('body').on('mouseleave','.select_range_slider',function(e){
    // //e.stopImmediatePropagation();
    if($(this).find('.select_range').attr('onmove') == '1'){
        $(this).find('.select_range').attr('onmove','0')
        let elementOffset = $(this).offset();
        let clickX = e.pageX;
        let relativeX = clickX - elementOffset.left;
        if(relativeX < 0 ){relativeX = 0}
        if(relativeX > 120 ){relativeX = 120}
        $(this).find('.select_range').css('left',relativeX - 7)
        set_select_range(
            $(this),
            relativeX,
        )
    }
});
$('body').on('mouseover','.select_range_minus, .select_range_plus',function(e){
    let select_range_slider = $(this).closest('.select_range_container').find('.select_range_slider');
    let selector = $(this).closest('.selector')
    let val;
    if(select_range_slider.closest('.select_range_container').hasClass('dummy_select_range')){
        val = select_range_slider.attr('slider_val');
    }else{
        val = get_selector_val(selector);
    }
    if(val !== null){
        select_range_slider.closest('.select_range_container').attr('tooltip',`${val}`)
    }else{
        select_range_slider.closest('.select_range_container').attr('tooltip',`--`)
    }
    updateToolTip();
});
$('body').on('click','.select_range_minus',function(e){
    //e.stopImmediatePropagation();
    let select_range_slider = $(this).closest('.select_range_container').find('.select_range_slider');
    let selector = $(this).closest('.selector')
    let min = select_range_slider.attr('min');
    let max = select_range_slider.attr('max');
    let step = select_range_slider.attr('step');
    let unit = select_range_slider.attr('unit');
    let val;
    if($(this).closest('.select_range_container').hasClass('dummy_select_range')){
        val = select_range_slider.attr('slider_val')
    }else{
        val = get_selector_val(selector);
    }
    if(val === null){return;}
    let new_val = parseFloat(val) - parseFloat(step);
    new_val = Math.round(new_val * 10) / 10;
    if(new_val < min){new_val = min}
    if($(this).closest('.select_range_container').hasClass('dummy_select_range')){
        select_range_slider.attr('slider_val',new_val+unit)
        select_range_slider.find('.select_range').css('left',`${calc_select_range_ratio(min,max,step,new_val) }px`);
        select_range_slider.closest('.select_range_container').attr('tooltip',`${new_val}${unit}`)
        updateToolTip();
        select_range_slider.closest('.dummy_selector_container').trigger('slide')
    }else{
        set_elem_val(selector,new_val+unit)
        select_range_slider.find('.select_range').css('left',`${calc_select_range_ratio(min,max,step,new_val) }px`);
        select_range_slider.closest('.select_range_container').attr('tooltip',`${new_val}${unit}`)
        updateToolTip();
        new_action();
    }

})
$('body').on('click','.select_range_plus',function(e){
    //e.stopImmediatePropagation();
    let select_range_slider = $(this).closest('.select_range_container').find('.select_range_slider');
    let selector = $(this).closest('.selector')
    let min = select_range_slider.attr('min');
    let max = select_range_slider.attr('max');
    let step = select_range_slider.attr('step');
    let unit = select_range_slider.attr('unit');
    let val;
    if($(this).closest('.select_range_container').hasClass('dummy_select_range')){
        val = select_range_slider.attr('slider_val')
    }else{
        val = get_selector_val(selector);
    }
    if(val === null){return;}
    let new_val = parseFloat(val) + parseFloat(step);
    new_val = Math.round(new_val * 10) / 10;
    if(new_val > max){new_val = max}
    if($(this).closest('.select_range_container').hasClass('dummy_select_range')){
        select_range_slider.attr('slider_val',new_val+unit)
        select_range_slider.find('.select_range').css('left',`${calc_select_range_ratio(min,max,step,new_val) }px`);
        select_range_slider.closest('.select_range_container').attr('tooltip',`${new_val}${unit}`)
        updateToolTip();
        select_range_slider.closest('.dummy_selector_container').trigger('slide')
    }else{
        set_elem_val(selector,new_val+unit)
        select_range_slider.find('.select_range').css('left',`${calc_select_range_ratio(min,max,step,new_val) }px`);
        select_range_slider.closest('.select_range_container').attr('tooltip',`${new_val}${unit}`)
        updateToolTip();
        new_action();
    }

})
