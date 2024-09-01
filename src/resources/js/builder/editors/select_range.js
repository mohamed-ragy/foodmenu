draw_select_range = function(data){
    let editor = $('<div/>',{
        class:`editor select_range ${data.dummy === true ? 'dummy_editor' : ''} ${data.dummy === true ? data.dummy_class : ''} ${data.editor_class ?? ''}`,
        key_tree:data.key_tree,
        variable_key:data.variable_key,
        key:data.key,
        render:data.render ?? data.key_tree,
    }).append(
        $('<div/>',{class:'select_range_minus turbo ico-minus',step:data.range.step}),
        $('<div/>',{class:'w100p'}).append(
            $('<div/>',{class:'select_range_slider',min:data.range.min,max:data.range.max,step:data.range.step,unit:data.unit}).append(
                $('<div/>',{class:'select_range_marker',onmove:'0'}),
                $('<div/>',{class:'select_range_slider_selected'})
            ),
        ),
        $('<div/>',{class:'select_range_plus turbo ico-plus',step:data.range.step}),
        $('<div/>',{class:'select_range_val'})
    )
    return editor;
}
set_select_range = function(editor){
    if(editor.hasClass('dummy_editor')){return;}
    let select_range_slider = editor.find('.select_range_slider')
    let val = get_editor_val(editor);
    if(val == '--'){
        select_range_slider.find('.select_range_marker').css('left',`0px`);
        select_range_slider.find('.select_range_slider_selected').css('width',`0px`);
        select_range_slider.closest('.select_range').find('.select_range_val').text('--')
    }else{
        select_range_slider.find('.select_range_marker').css('left',`${calc_select_range_ratio(select_range_slider,parseFloat(val))}px`);
        select_range_slider.find('.select_range_slider_selected').css('width',`${calc_select_range_ratio(select_range_slider,parseFloat(val))}px`);
        select_range_slider.closest('.select_range').find('.select_range_val').text(val)
    }
}
set_dummy_select_range = function(editor,val,immediate=false){
    let select_range_slider = editor.find('.select_range_slider')
    let min = select_range_slider.attr('min');
    let max = select_range_slider.attr('max');
    let step = select_range_slider.attr('step');
    let unit = select_range_slider.attr('unit');
    if(immediate){
        select_range_slider.find('.select_range_marker').addClass('stop_transitions')
        select_range_slider.find('.select_range_slider_selected').addClass('stop_transitions')
    }
    if(val !== null){
        select_range_slider.find('.select_range_marker').css('left',`${calc_select_range_ratio(select_range_slider,parseFloat(val))}px`);
        select_range_slider.find('.select_range_slider_selected').css('width',`${calc_select_range_ratio(select_range_slider,parseFloat(val))}px`);
        select_range_slider.closest('.select_range').find('.select_range_val').text(val)
    }else{
        select_range_slider.find('.select_range_marker').css('left',`0px`);
        select_range_slider.find('.select_range_slider_selected').css('width',`0px`);
        select_range_slider.closest('.select_range').find('.select_range_val').text('--')
    }
    if(immediate){
        setTimeout(()=>{
            select_range_slider.find('.select_range_marker').removeClass('stop_transitions')
            select_range_slider.find('.select_range_slider_selected').removeClass('stop_transitions')
        },200)
    }
}

calc_select_range_ratio = function(select_range_slider,val){
    let min = parseFloat(select_range_slider.attr('min'));
    let max = parseFloat(select_range_slider.attr('max'));
    let step = parseFloat(select_range_slider.attr('step'));
    let range = max - min;
    let normalizedValue = parseFloat(val) - min;
    let ratio = ((normalizedValue / range) * select_range_slider.width());
    step >= 1 ? ratio = Math.round(ratio) : ratio = parseFloat(ratio.toFixed(1));
    return ratio;
}
set_select_range_marker = function(select_range_slider,slider_position){
    let editor = select_range_slider.closest('.editor')
    let min = select_range_slider.attr('min');
    let max = select_range_slider.attr('max');
    let step = select_range_slider.attr('step');
    let unit = select_range_slider.attr('unit');
    let val = clac_select_range_val(select_range_slider,slider_position);
    if(val < min){val = min}
    if(val > max){val = max}
    select_range_slider.find('.select_range_slider_selected').css('width',`${calc_select_range_ratio(select_range_slider,val)}px`);
    select_range_slider.closest('.select_range').find('.select_range_val').text(val+unit)
    editor.trigger('change')
    if(editor.hasClass('dummy_editor')){return;}
}
clac_select_range_val = function(select_range_slider,slider_position){
    let min = select_range_slider.attr('min');
    let max = select_range_slider.attr('max');
    let step = select_range_slider.attr('step');
    let range = parseFloat(max) - parseFloat(min);
    let scaledValue = (parseFloat(slider_position) / select_range_slider.width()) * range;
    let val = scaledValue + parseFloat(min);
    val > parseFloat(max) ? val = parseFloat(max) : val < parseFloat(min) ? val = parseFloat(min) : null;
    if(step >= 1){val = Math.round(val)}else{val = parseFloat(val.toFixed(1))}
    return val;
}
//
$('body').on('change','.select_range',function(){
    let editor = $(this);
    if(editor.hasClass('dummy_editor')){return;}
    let new_val = editor.find('.select_range_val').text();
    set_val(editor,new_val)
    new_action(editor.attr('render'));
    set_select_range(editor);
})
$('body').on('mousedown','.select_range_slider',function(e){
    $(this).find('.select_range_marker').attr('onmove','1')
});
$('body').on('mousemove','.select_range_slider',function(e){
    if($(this).find('.select_range_marker').attr('onmove') == '1'){
        let elementOffset = $(this).offset();
        let clickX = e.pageX;
        let relativeX = clickX - elementOffset.left;
        if(relativeX < 0 ){relativeX = 0}
        if(relativeX > $(this).width() ){relativeX = $(this).width()}
        $(this).find('.select_range_marker').css('left',relativeX)
    }
});
$('body').on('mouseup','.select_range_slider',function(e){
    $(this).find('.select_range_marker').attr('onmove','0')
    let elementOffset = $(this).offset();
    let clickX = e.pageX;
    let relativeX = clickX - elementOffset.left;
    if(relativeX < 0 ){relativeX = 0}
    if(relativeX > $(this).width() ){relativeX = $(this).width()}
    $(this).find('.select_range_marker').css('left',relativeX)
    set_select_range_marker(
        $(this),
        relativeX,
    )
})
$('body').on('mouseleave','.select_range_slider',function(e){
    if($(this).find('.select_range_marker').attr('onmove') == '1'){
        $(this).find('.select_range_marker').attr('onmove','0')
        let elementOffset = $(this).offset();
        let clickX = e.pageX;
        let relativeX = clickX - elementOffset.left;
        if(relativeX < 0 ){relativeX = 0}
        if(relativeX > $(this).width() ){relativeX = $(this).width()}
        $(this).find('.select_range_marker').css('left',relativeX)
        set_select_range_marker(
            $(this),
            relativeX,
        )
    }
});

$('body').on('mousedown','.select_range_minus',function(e){
    let select_range_slider = $(this).closest('.select_range').find('.select_range_slider');
    let editor = $(this).closest('.editor')
    let min = select_range_slider.attr('min');
    let max = select_range_slider.attr('max');
    let step = select_range_slider.attr('step');
    let unit = select_range_slider.attr('unit');
    let val = editor.find('.select_range_val').text();
    if(val == '--'){
        return;
    }
    let new_val = parseFloat(val) - parseFloat(step);
    new_val = Math.round(new_val * 10) / 10;
    if(new_val < min){new_val = min}
    select_range_slider.find('.select_range_marker').css('left',`${calc_select_range_ratio(select_range_slider,new_val) }px`);
    select_range_slider.find('.select_range_slider_selected').css('width',`${calc_select_range_ratio(select_range_slider,new_val)}px`);
    editor.find('.select_range_val').text(new_val+unit);
    // $(this).closest('.select_range').trigger('change')

})
$('body').on('mousedown','.select_range_plus',function(e){
    let select_range_slider = $(this).closest('.select_range').find('.select_range_slider');
    let editor = $(this).closest('.editor')
    let min = select_range_slider.attr('min');
    let max = select_range_slider.attr('max');
    let step = select_range_slider.attr('step');
    let unit = select_range_slider.attr('unit');
    let val = editor.find('.select_range_val').text();
    if(val == '--'){
        return;
    }
    let new_val = parseFloat(val) + parseFloat(step);
    new_val = Math.round(new_val * 10) / 10;
    if(new_val > max){new_val = max}
    select_range_slider.find('.select_range_marker').css('left',`${calc_select_range_ratio(select_range_slider,new_val) }px`);
    select_range_slider.find('.select_range_slider_selected').css('width',`${calc_select_range_ratio(select_range_slider,new_val)}px`);
    editor.find('.select_range_val').text(new_val+unit);
    // $(this).closest('.select_range').trigger('change')
})
$('body').on('mouseup','.select_range_plus, .select_range_minus',function(e){
    $(this).closest('.select_range').trigger('change')
})