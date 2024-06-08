draw_number_picker = function(data){
    let units = '';
    for(const key in data.units){
        let unit = data.units[key];
        if(key == 0){
            units = `${unit}`
        }else{
            units = `${units}.${unit}`
        }
    }
    let editor = $('<div/>',{
        class:`editor number_picker_editor ${data.dummy === true ? 'dummy_editor' : ''} ${data.dummy === true ? data.dummy_class : ''}`,
        units:units,
        step:data.step,
        key_tree:data.key_tree,
        variable_key:data.variable_key,
        key:data.key,
    }).append(
        $('<div/>',{class:'number_picker_val'}).append(
            $('<div/>',{class:'number_picker_btn turbo ico-minus',action:'minus'}),
            $('<input/>',{class:'number_picker_input',type:'text',value:''}),
            $('<div/>',{class:'number_picker_btn turbo ico-plus',action:'plus'}),
        ),
        $('<div/>',{class:'number_picker_unit_select',text:''}),
        data.lock ? $('<div/>',{class:'number_picker_lock ico-unlock'}) : '',
        data.is_hover ? $('<div/>',{class:'remove_hover number_picker_remove_hover ico-remove_hover none',tooltip:texts.remove_hover}) : '',
    );
    return editor;
}

set_number_picker = function(editor){
    if(editor.hasClass('dummy_editor')){return;}
    let val = get_editor_val(editor)
    if(val == '--' || typeof(val) === 'undefined'){
        editor.find('.number_picker_input').val('--')
        editor.find('.number_picker_unit_select').text('--')
    }else{
        let val_num; let val_unit;
        let units = editor.attr('units').split('.');
        for(const key in units){
            let unit = units[key];
            if(val.includes(unit)){
                val_num = val.replace(unit,'');
                val_unit = val.replace(val_num,'');
            }
        }
        editor.find('.number_picker_input').val(val_num)
        editor.find('.number_picker_unit_select').text(val_unit)
    }

    if(editor.find('.number_picker_lock').length > 0){
        let is_locked = 0;
        editor.closest('.editors_container').find('.number_picker_editor').each(function(){
            if(
                $(this).find('.number_picker_input').val() === editor.find('.number_picker_input').val() && 
                $(this).find('.number_picker_unit_select').text() === editor.find('.number_picker_unit_select').text()
            ){
                is_locked++;
            }
        })
        if(is_locked ==  editor.closest('.editors_container').find('.number_picker_lock').length){
            editor.closest('.editors_container').find('.number_picker_lock').removeClass('ico-unlock').addClass('ico-lock')
        }else{
            editor.closest('.editors_container').find('.number_picker_lock').addClass('ico-unlock').removeClass('ico-lock')
        }
    }
}
set_dummy_number_picker = function(editor,val){
    if(val == '--'){
        editor.find('.number_picker_input').val('--')
        editor.find('.number_picker_unit_select').text('--')
    }else{
        let val_num; let val_unit;
        let units = editor.attr('units').split('.');
        for(const key in units){
            let unit = units[key];
            if(val.includes(unit)){
                val_num = val.replace(unit,'');
                val_unit = val.replace(val_num,'');
            }
        }
        editor.find('.number_picker_input').val(val_num)
        editor.find('.number_picker_unit_select').text(val_unit)
    }
}
//
$('body').on('change','.number_picker_input',function(e){
    let editor = $(this).closest('.editor');
    $(this).val(parseFloat($(this).val()))
    if(isNaN($(this).val())){
        $(this).val(editor.attr('step'))
    }
    if(editor.hasClass('dummy_editor')){return;}
    if(editor.find('.number_picker_unit_select').text() == '--'){
        editor.find('.number_picker_unit_select').text(editor.attr('units').split('.')[0])
    }
    let new_val = `${$(this).val()}${editor.find('.number_picker_unit_select').text()}`;
    let editors_container = editor.closest('.editors_container');
    if(editors_container.find('.number_picker_lock').hasClass('ico-lock')){
        editors_container.find('.number_picker_editor').each(function(){
            set_val($(this),new_val)
        })
    }else{
        set_val($(this),new_val)
    }
    new_action();
});
//
$('body').on('click','.number_picker_lock',function(){
    if($(this).hasClass('ico-lock')){
        $(this).closest('.editors_container').find('.number_picker_lock').removeClass('ico-lock').addClass('ico-unlock');
    }else{
        $(this).closest('.editors_container').find('.number_picker_lock').removeClass('ico-unlock').addClass('ico-lock');
    }
})
$('body').on('click','.number_picker_unit_select',function(e){
    let editor = $(this).closest('.editor');
    let units = editor.attr('units').split('.');
    window.selected_number_picker = editor;
    $('.number_picker_units').addClass('none').text('');
    for(const key in units){
        let unit = units[key];
        $('.number_picker_units').append(
            $('<div/>',{class:'number_picker_units_elem',text:unit})
        )
    }
    setTimeout(()=>{
        $('.number_picker_units').removeClass('none').css({
            left:$(this).offset().left,
            top:$(this).offset().top,
        })
    },10)
})

$('body').on('click','.number_picker_units_elem',function(e){
    let editor = window.selected_number_picker;
    editor.find('.number_picker_unit_select').text($(this).text());
    $('.number_picker_units').addClass('none')
    window.selected_number_picker = null;
    if(editor.find('.number_picker_input').val() === '--'){
        editor.find('.number_picker_input').val(editor.attr('step'))
    }
    editor.find('.number_picker_input').trigger('change')
});


$('body').on('mousedown','.number_picker_btn',function(e){
    let editor = $(this).closest('.editor');
    let step = parseFloat(editor.attr('step'));
    let val_num = editor.find('.number_picker_input').val();
    if(val_num == '--' ){
        val_num = step;
        editor.find('.number_picker_unit_select').text(editor.attr('units').split('.')[0]);
    }else{
        val_num = parseFloat(val_num)
        if($(this).attr('action') == 'plus'){
            val_num = val_num + step;
        }else if($(this).attr('action') == 'minus'){
            val_num = val_num - step;
        }
        val_num = Math.round(val_num * 10) / 10;
    }
    editor.find('.number_picker_input').val(val_num)
    // editor.find('.number_picker_input').trigger('change')
})

$('body').on('mouseup','.number_picker_btn',function(e){
    let editor = $(this).closest('.editor');
    editor.find('.number_picker_input').trigger('change')
})