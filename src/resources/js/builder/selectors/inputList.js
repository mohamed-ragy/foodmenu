draw_input_list = function(data){
    let elem_data = get_key_tree(data.keys_arr[0].key_tree);
    let elem_val = get_elem_val(elem_data,data.keys_arr[0].key,data.is_responsive ? '1':'0')
    let selector;
    let inputList_elems_temp;

    let selector_container = $('<div/>',{class:`editor_popup_row ${data.selector_container_class === false ? '' : 'selector_container'} ${data.container_class ?? ''}`,is_responsive:data.is_responsive ? '1':'0'}).append(
        $('<div/>',{class:'row alnC jstfyS'}).append(
            data.is_responsive && data.responsive_icon !== false ? responsive_icon(elem_val.responsive_class) : '',
            $('<div/>',{text:data.name}),
        ),
        $('<div/>',{class:'row alnC jstfyE'}).append(
            selector = $('<div/>',{class:'selector inputList_container'}).append(
                $('<div/>',{class:`inputList_val `}),
                $('<div/>',{class:'ico-arrowDown'}),
                inputList_elems_temp = $('<div/>',{class:'none inputList_elems_temp'}),
            ),
            data.after
        )
    )

    for(const key in data.keys_arr){
        for(const key2 in data.keys_arr[key]){
            selector.attr(key2,data.keys_arr[key][key2]);
            selector.attr(key2,data.keys_arr[key][key2]);
        }
    }
    for(const key in data.selections){
        let selection = data.selections[key];
        if(selection.val == elem_val.val){
            selector.find('.inputList_val').text(texts.select_elems[`_${selection.name}`])
        }
        inputList_elems_temp.append(
            $('<div/>',{class:`inputList_elem ${selection.class} ${selection.val == elem_val.val ? 'inputList_elem_selected' : ''}`,text:texts.select_elems[`_${selection.name}`],key:selection.val}),
        )
    }
    return selector_container;
}
set_input_list = function(selector){
    let val = get_selector_val(selector);
    let val_text = selector.find(`.inputList_elem[key="${val}"]`).text()
    selector.find('.inputList_val').text(val_text)
    $('.inputList_elem').removeClass('inputList_elem_selected');
    $('.inputList_elems').find('.inputList_elem').each(function(){
        if(val == $(this).attr('key')){
            $(this).addClass('inputList_elem_selected')
        }
    })
}
$('body').on('click','.inputList_container',function(e){
    //e.stopImmediatePropagation();
    window.selected_inputList = $(this);
    $('.inputList_elems').text('').append(
        $(this).find('.inputList_elems_temp').html()
    ).removeClass('none').css({
        left:$(this).offset().left,
        top:$(this).offset().top + $(this).outerHeight(),
    })
})
$('body').on('click','.inputList_elem',function(e){
    //e.stopImmediatePropagation();
    let new_val = $(this).attr('key');
    $('.inputList_elem').removeClass('inputList_elem_selected');
    $(this).addClass('inputList_elem_selected')
    set_elem_val(window.selected_inputList,new_val)
    window.selected_inputList.find('.inputList_val').text($(this).text())
    new_action();
    if(window.selected_inputList.closest('.selector_container').hasClass('animation_style_elem_animation')){
        let selector = window.selected_inputList;
        let elem = get_key_tree(selector.attr('key_tree').replace('.css','').replace('.css_mobile',''));
        let elem_animation = window.current_view == 'desktop' ? elem.elem.animation : window.current_view == 'mobile' ? elem.elem.animation_mobile : null;
        let animation_direction = '';
        if(elem_animation.animationUp == '1'){
            animation_direction = 'animationUp'
        }else if(elem_animation.animationDown == '1'){
            animation_direction = 'animationDown'
        }
        if(animation_direction !==''){
            $('#website').find(`[key_tree="${elem.elem_key_tree}"]`).css({
                'transition-duration':'0ms',
                'transition-delay':'0ms',
                'transform':elem_animation[`${animation_direction}_transform`],
                'opacity':elem_animation[`${animation_direction}_opacity`],
            });
            let elem_css = window.current_view == 'desktop' ? elem.elem.css : window.current_view == 'mobile' ? elem.elem.css_mobile : null;
            setTimeout(()=>{
                $('#website').find(`[key_tree="${elem.elem_key_tree}"]`).css({
                    'transition-duration':elem_css['transition-duration'],
                    'transition-delay':elem_css['transition-delay'],
                    'transform':elem_css['transform'],
                    'opacity':1,
                })
            },10)
        }
    }
    else{
        $('.inputList_elems').addClass('none')
    }
})
//
$('body').on('click','.inputList_container_no_action',function(e){
    // e.stopImmediatePropagation();
    $('.inputList_elems').attr('key',$(this).attr('key')).text('').append(
        $(this).find('.inputList_elems_temp').html()
    ).removeClass('none').css({
        left:$(this).offset().left,
        top:$(this).offset().top + $(this).outerHeight(),
    })
})
$('body').on('click','.inputList_elem_no_action',function(e){
    //e.stopImmediatePropagation();
    $(`.inputList_container_no_action_selected[key="${$('.inputList_elems').attr('key')}"]`).text($(this).text())
    window[$('.inputList_elems').attr('key')] = $(this).attr('key');
    $('.inputList_elems').addClass('none');
})
