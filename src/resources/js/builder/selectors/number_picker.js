draw_number_picker = function(data){
    let elem_data = get_key_tree(data.keys_arr[0].key_tree);
    let elem_val = get_elem_val(elem_data,data.keys_arr[0].key,data.is_responsive ? '1':'0')
    let selector;
    let selector_container = $('<div/>',{class:`editor_popup_row ${data.selector_container_class === false ? '' : 'selector_container'} ${data.container_class ?? ''}`,is_responsive:data.is_responsive ? '1':'0'}).append(
        $('<div/>',{class:'row alnC jstfyS'}).append(
            data.is_responsive && data.responsive_icon !== false ? responsive_icon(elem_val.responsive_class) : '',
            $('<div/>',{text:data.name}),
            data.after_name ?? '',
        ),
        selector = $('<div/>',{class:`selector number_picker_container ${data.number_picker_container_class ?? ''}`,unit:data.unit,step:data.step}).append(
            $('<div/>',{class:'number_picker_btn turbo ico-minus',action:'minus'}),
            $('<div/>',{class:'number_picker_val'}).append(
                $('<input/>',{class:'number_picker_input',type:'number',value:elem_val.val.replace(data.unit,'')}),
            ),
            $('<div/>',{class:'number_picker_btn turbo ico-plus',action:'plus'}),
        )
    )

    for(const key in data.keys_arr){
        for(const key2 in data.keys_arr[key]){
            selector.attr(key2,data.keys_arr[key][key2]);
            selector.attr(key2,data.keys_arr[key][key2]);
        }
    }
    if(data.name == null){
        return selector;
    }else{
        return selector_container;
    }
}
set_number_picker = function(selector){
    let val = get_selector_val(selector);
    if(val == null){
        selector.find('.number_picker_input').val('')
    }else{
        selector.find('.number_picker_input').val(val.replace(selector.attr('unit'),''))
    }
}
$('body').on('change','.number_picker_input',function(e){
    let new_val = `${$(this).val()}${$(this).closest('.number_picker_container').attr('unit')}`;
    set_elem_val($(this),new_val)
    new_action();
})
$('body').on('click','.number_picker_btn',function(e){

    let new_val;
    let step = parseFloat($(this).closest('.number_picker_container').attr('step'));
    let val = parseFloat($(this).closest('.number_picker_container').find('.number_picker_input').val());
    if($(this).closest('.number_picker_container').find('.number_picker_input').val() == '' ){
        new_val = step;
    }else{
        if($(this).attr('action') == 'plus'){
            new_val = val + step;
        }else if($(this).attr('action') == 'minus'){
            new_val = val - step;
        }
        new_val = Math.round(new_val * 10) / 10;
    }
    $(this).closest('.number_picker_container').find('.number_picker_input').val(new_val)
    $(this).closest('.number_picker_container').find('.number_picker_input').trigger('change')
})
