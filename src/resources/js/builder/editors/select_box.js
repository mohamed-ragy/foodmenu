draw_select_box = function(data){
    let editor = $('<div/>',{
        class:`editor select_box_editor ${data.dummy === true ? 'dummy_editor' : ''} ${data.dummy === true ? data.dummy_class : ''} ${data.editor_class ?? ''}`,
        key_tree:data.key_tree,
        variable_key:data.variable_key,
        key:data.key,
        render:data.render ?? '',
        generate_style:data.generate_style ?? data.key_tree,
    });
    for(const key in data.selections){
        let selection = data.selections[key];
        let selection_elem;
        editor.append(
            selection_elem = $('<div/>',{class:`select_box ${selection.class}`,text:selection.text,key:selection.key})
        )
        if('show_elem' in selection){
            selection_elem.attr('show_elem',selection.show_elem)
        }
        if('hide_elem' in selection){
            selection_elem.attr('hide_elem',selection.hide_elem)
        }
    }
    return editor;
}
set_select_box = function(editor){
    if(editor.hasClass('dummy_editor')){return;}
    let val = get_editor_val(editor)
    editor.find(`.select_box`).removeClass('select_box_selected');
    editor.find(`.select_box[key="${val}"]`).addClass('select_box_selected');

    if(typeof(editor.find('.select_box_selected').attr('show_elem')) !== 'undefined'){
        let show_elems = editor.find('.select_box_selected').attr('show_elem').split('.');
        for(const key in show_elems){
            $(`.${show_elems[key]}`).removeClass('none')
        }
    }
    if(typeof(editor.find('.select_box_selected').attr('hide_elem')) !== 'undefined'){
        let hide_elems = editor.find('.select_box_selected').attr('hide_elem').split('.')
        for(const key in hide_elems){
            $(`.${hide_elems[key]}`).addClass('none')
        }
    }
}
set_dummy_select_box = function(editor,val){
    editor.find(`.select_box`).removeClass('select_box_selected');
    editor.find(`.select_box[key="${val}"]`).addClass('select_box_selected');
    if(typeof(editor.find('.select_box_selected').attr('show_elem')) !== 'undefined'){
        let show_elems = editor.find('.select_box_selected').attr('show_elem').split('.');
        for(const key in show_elems){
            $(`.${show_elems[key]}`).removeClass('none')
        }
    }
    if(typeof(editor.find('.select_box_selected').attr('hide_elem')) !== 'undefined'){
        let hide_elems = editor.find('.select_box_selected').attr('hide_elem').split('.')
        for(const key in hide_elems){
            $(`.${hide_elems[key]}`).addClass('none')
        }
    }
}
//
$('body').on('change','.select_box_editor',function(){
    let editor = $(this);
    if(editor.hasClass('dummy_editor')){return;}
    let new_val = editor.find('.select_box_selected').attr('key');
    set_val(editor,new_val);
    new_action(editor.attr('generate_style'),editor.attr('render'));
})
$('body').on('click','.select_box',function(e){
    let editor = $(this).closest('.editor');
    editor.find('.select_box').removeClass('select_box_selected');
    $(this).addClass('select_box_selected');

    if(typeof($(this).attr('show_elem')) !== 'undefined'){
        let show_elem = $(this).attr('show_elem').split('.')
        for(const key in show_elem){
            $(`.${show_elem[key]}`).removeClass('none')
        }
    }
    if(typeof($(this).attr('hide_elem')) !== 'undefined'){
        let hide_elem = $(this).attr('hide_elem').split('.')
        for(const key in hide_elem){
            $(`.${hide_elem[key]}`).addClass('none')
        }
    }
    editor.trigger('change');

})

