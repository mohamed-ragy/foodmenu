draw_input_list = function(data){
    let inputList_elems_temp;
    let editor = $('<div/>',{
        class:`editor inputList_editor ${data.dummy === true ? 'dummy_editor' : ''} ${data.dummy === true ? data.dummy_class : ''}`,
        key_tree:data.key_tree,
        variable_key:data.variable_key,
        key:data.key,
    }).append(
        $('<div/>',{class:`inputList_val`}),
        $('<div/>',{class:'ico-arrowDown cG'}),
        inputList_elems_temp = $('<div/>',{class:'none inputList_elems_temp'}),
    )
    for(const key in data.selections){
        let selection = data.selections[key];
        inputList_elems_temp.append(
            $('<div/>',{class:`inputList_elem ${selection.class}`,text:texts.select_elems[`_${selection.name}`],key:selection.val}),
        )
    }
    return editor;
}
set_input_list = function(editor){
    if(editor.hasClass('dummy_editor')){return;}
    let val = get_editor_val(editor)
    if(val == '--' || typeof(val) === 'undefined'){
        editor.find('.inputList_val').text('--')
    }else{
        let val_text = editor.find(`.inputList_elem[key="${val}"]`).text()
        editor.find('.inputList_val').text(val_text)
        editor.attr('val',val);
    }

    try{
        if(
            window.selected_inputList.attr('key_tree') === editor.attr('key_tree') &&
            window.selected_inputList.attr('variable_key') === editor.attr('variable_key') &&
            window.selected_inputList.attr('key') === editor.attr('key') 
        ){
            $('.inputList_elems').find('.inputList_elem').removeClass('inputList_elem_selected');
            $('.inputList_elems').find(`.inputList_elem[key="${val}"]`).addClass('inputList_elem_selected');
        }
    }catch{}
}
set_dummy_input_list = function(editor,val){
    let val_text = editor.find(`.inputList_elem[key="${val}"]`).text()
    editor.find('.inputList_val').text(val_text)
    editor.attr('val',val);
}
//
$('body').on('change','.inputList_editor',function(){
    if($(this).hasClass('dummy_editor')){return;}
    set_val($(this),$(this).attr('val'));
    new_action();
})
$('body').on('click','.inputList_editor',function(e){
    let editor = $(this).closest('.editor');
    window.selected_inputList = editor;
    $('.inputList_elems').addClass('none').text('').append(
        $(this).find('.inputList_elems_temp').html()
    )
    setTimeout(()=>{
        $('.inputList_elems').removeClass('none').css({
            left:$(this).offset().left,
            top:$(this).offset().top,
        });
        if(!editor.hasClass('dummy_editor')){
            let val = get_editor_val(editor);
            $('.inputList_elems').find(`.inputList_elem[key="${val}"]`).addClass("inputList_elem_selected")
            $('.inputList_elems').scrollTop(0)
            try{
                $('.inputList_elems').scrollTop($('.inputList_elems').find(`.inputList_elem[key="${val}"]`).position().top)
            }catch{}
            $('.inputList_elems').focus()
        }
    },10)
})
//
$('body').on('keydown','.inputList_elems',function(e){
    let selected_elem = $(this).find('.inputList_elem_selected')
    if(e.which == 38){
        if(!selected_elem.is(":first-child")){
            e.preventDefault();
            selected_elem.prev().trigger('click')
        }
    }else if(e.which == 40){
        if(!selected_elem.is(":last-child")){
            e.preventDefault();
            selected_elem.next().trigger('click')
        }
    }
})
//
$('body').on('click','.inputList_elem',function(e){
    let new_val = $(this).attr('key');
    window.selected_inputList.find('.inputList_val').text($(this).text())
    window.selected_inputList.attr('val',new_val);
    $('.inputList_elems').find(`.inputList_elem`).removeClass("inputList_elem_selected");
    $(this).addClass("inputList_elem_selected")
    $('.inputList_elems').scrollTop(0)
    $('.inputList_elems').scrollTop($(this).position().top)
    window.selected_inputList.trigger('change')
})
