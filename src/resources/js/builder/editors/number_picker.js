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
        class:`editor number_picker_editor ${data.dummy === true ? 'dummy_editor' : ''} ${data.dummy === true ? data.dummy_class : ''} ${data.editor_class ?? ''}`,
        units:units,
        step:data.step,
        key_tree:data.key_tree,
        variable_key:data.variable_key,
        key:data.key,
        editor_details: data.editor_details ? '1' : '0',
        render:data.render ?? data.key_tree,
    }).append(
        $('<div/>',{class:'number_picker_val'}).append(
            $('<div/>',{class:'number_picker_btn turbo ico-minus',action:'minus'}),
            $('<input/>',{class:'number_picker_input',type:'text',value:''}),
            $('<div/>',{class:'number_picker_btn turbo ico-plus',action:'plus'}),
        ),
        $('<div/>',{class:'number_picker_unit_select',text:''}),
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
        editor.find('.number_picker_unit_select').text(val_unit)
        if(val_unit == 'auto'){
            editor.find('.number_picker_input').val('')
        }else{
            editor.find('.number_picker_input').val(val_num)
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
        editor.find('.number_picker_unit_select').text(val_unit)
        if(val_unit == 'auto'){
            editor.find('.number_picker_input').val('')
        }else{
            editor.find('.number_picker_input').val(val_num)
        }
    }
}
//
$('body').on('change','.number_picker_input',function(e){
    let editor = $(this).closest('.editor');
    if(editor.find('.number_picker_unit_select').text() == 'auto'){
        $(this).val('');
        set_val($(this),'auto')
        new_action(editor.attr('render'));
        set_number_picker(editor)
        return;
    }
    $(this).val(parseFloat($(this).val()))
    if(isNaN($(this).val())){
        $(this).val(editor.attr('step'))
    }
    if(editor.hasClass('dummy_editor')){return;}
    if(editor.find('.number_picker_unit_select').text() == '--'){
        editor.find('.number_picker_unit_select').text(editor.attr('units').split('.')[0])
    }
    let new_val = `${$(this).val()}${editor.find('.number_picker_unit_select').text()}`;
    set_val($(this),new_val)
    new_action(editor.attr('render'));
    set_number_picker(editor)
});
//
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
    if(editor.find('.number_picker_input').val() === '--' || editor.find('.number_picker_input').val() == ''){
        editor.find('.number_picker_input').val(editor.attr('step'))
    }
    editor.find('.number_picker_input').trigger('change')
});


$('body').on('mousedown','.number_picker_btn',function(e){
    let editor = $(this).closest('.editor');
    if(editor.find('.number_picker_unit_select').text() == 'auto'){
        $(this).val('');
        return;
    }
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
})

$('body').on('mouseup','.number_picker_btn',function(e){
    let editor = $(this).closest('.editor');
    if(editor.find('.number_picker_unit_select').text() == 'auto'){
        $(this).val('');
        return;
    }
    editor.find('.number_picker_input').trigger('change')
})