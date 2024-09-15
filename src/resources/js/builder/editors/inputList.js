draw_input_list = function(data){
    let inputList_elems_temp;
    let editor = $('<div/>',{
        class:`editor inputList_editor ${data.dummy === true ? 'dummy_editor' : ''} ${data.dummy === true ? data.dummy_class : ''} ${data.editor_class ?? ''}`,
        key_tree:data.key_tree,
        variable_key:data.variable_key,
        key:data.key,
        render:data.render ?? data.key_tree,
    }).append(
        $('<div/>',{class:`inputList_val`,text:data.default_text ?? ''}),
        $('<div/>',{class:'ico-arrowDown cG'}),
        inputList_elems_temp = $('<div/>',{class:'none inputList_elems_temp'}),
    )
    for(const key in data.selections){
        let selection = data.selections[key];
        if(selection !== null){
            let selection_elem;
            inputList_elems_temp.append(
                selection_elem = $('<div/>',{class:`inputList_elem ${selection.class}`,text:selection.name,key:selection.val,style:selection.style ?? ''}),
            )
            if('show_elem' in selection){
                selection_elem.attr('show_elem',selection.show_elem)
            }
            if('hide_elem' in selection){
                selection_elem.attr('hide_elem',selection.hide_elem)
            }
        }
    }
    return editor;
}
set_input_list = function(editor){
    if(editor.hasClass('dummy_editor')){return;}
    let val = get_editor_val(editor)
    if(val == '--' || typeof(val) === 'undefined'){
        editor.find('.inputList_val').text('--')
        editor.find(`[show_elem]`).each(function(){
            let show_elems = $(this).attr('show_elem').split('.');
            for(const key in show_elems){
                $(`.${show_elems[key]}`).addClass('none')
            }
        })
        editor.find(`[hide_elem]`).each(function(){
            let hide_elems = $(this).attr('hide_elems').split('.');
            for(const key in hide_elems){
                $(`.${hide_elems[key]}`).addClass('none')
            }
        })
    }else{
        let val_text = editor.find(`.inputList_elem[key="${val}"]`).text()
        editor.find('.inputList_val').text(val_text)
        editor.attr('val',val ?? '');

        if(typeof(editor.find(`.inputList_elem[key="${val}"]`).attr('show_elem')) !== 'undefined'){
            let show_elems = editor.find(`.inputList_elem[key="${val}"]`).attr('show_elem').split('.');
            for(const key in show_elems){
                $(`.${show_elems[key]}`).removeClass('none')
            }
        }
        if(typeof(editor.find(`.inputList_elem[key="${val}"]`).attr('hide_elem')) !== 'undefined'){
            let hide_elems = editor.find(`.inputList_elem[key="${val}"]`).attr('hide_elem').split('.')
            for(const key in hide_elems){
                $(`.${hide_elems[key]}`).addClass('none')
            }
        }
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
    let editor = $(this);
    if(editor.hasClass('dummy_editor')){return;}
    set_val(editor,editor.attr('val'));
    new_action(editor.attr('render'));
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
    let selected_elem = $(this).find('.inputList_elem_selected');
    let target_elem;
    if(e.which == 38){
        if(!selected_elem.is(":first-child")){
            e.preventDefault();
            target_elem = selected_elem.prev()
        }
    }else if(e.which == 40){
        if(!selected_elem.is(":last-child")){
            e.preventDefault();
            target_elem = selected_elem.next()
        }
    }
    if(typeof(target_elem) !== 'undefined'){
        let new_val = target_elem.attr('key');
        window.selected_inputList.find('.inputList_val').text(target_elem.text())
        window.selected_inputList.attr('val',new_val);
        $('.inputList_elems').find(`.inputList_elem`).removeClass("inputList_elem_selected");
        target_elem.addClass("inputList_elem_selected")
        $('.inputList_elems').scrollTop(0)
        $('.inputList_elems').scrollTop(target_elem.position().top)
        window.selected_inputList.trigger('change')
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
    $('.inputList_elems').addClass('none')
})
