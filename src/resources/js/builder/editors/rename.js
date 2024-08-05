draw_rename_editor = function(data){
    let editor = $('<input/>',{
        class:`editor rename_editor builder_font`,
        key_tree:data.key_tree,
        variable_key:data.variable_key,
        key:data.key,
    })
    return editor;
}
set_rename_editor = function(editor){
    let val = get_editor_val(editor);
    editor.val(val);

    let key_tree = editor.attr('key_tree');
    let variable_key = editor.attr('variable_key');
    let key = editor.attr('key');
    let elem_data = get_elem_data(key_tree,variable_key,key);

    if(elem_data.elem.type == 'section'){
        $('#editor').find('.editor_popup_title').text(val)
    }
}
$('body').on('change','.rename_editor',function(e){
    let editor = $(this);
    let new_val = $(this).val();
    set_val($(this),new_val)
    new_action();
    let key_tree = editor.attr('key_tree');
    let variable_key = editor.attr('variable_key');
    let key = editor.attr('key');
    let elem_data = get_elem_data(key_tree,variable_key,key);

    if(elem_data.elem.type == 'section'){
        $('#editor').find('.editor_popup_title').text(new_val)
    }
})