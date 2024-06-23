draw_border_editor = function(data){
    let editor = $('<div/>',{
        class:`editor border_editor w100p-10 mX5 ${data.dummy === true ? 'dummy_editor' : ''} ${data.dummy === true ? data.dummy_class : ''}`,
        key_tree:data.key_tree,
        variable_key:data.variable_key,
        key:data.key,
        editor_details: data.editor_details ? '1' : '0',
    }).append(
        $('<div/>',{class:'row alnC jstfyC pY5 mY5 mB10 w100p'}).append(
            draw_number_picker({
                dummy:true,
                dummy_class:'border_editor_width wA mie-10',
                units:['px'],
                step:1,
                range:{min:0,max:10,step:1},
            }),
            draw_color_picker({
                dummy:true,
                dummy_class:'border_editor_color',
            }),
        ),
        draw_select_box({
            dummy:true,
            dummy_class:'border_editor_style',
            selections:[
                {text:texts.styling.none,key:'none'},
                {text:texts.styling.solid,key:'solid'},
                {text:texts.styling.dashed,key:'dashed'},
                {text:texts.styling.dotted,key:'dotted'},
                {text:texts.styling.double,key:'double'},
            ]
        }),
    );

    return editor;
}
set_border_editor = function(editor){
    if(editor.hasClass('dummy_editor')){return;}
    let val = get_editor_val(editor);
    let border  ;
    if(val == '--' || typeof(val) === 'undefined'){
        border = '-- -- --'.split(' ')
    }else{
        border = val.split(' ')
    }

    set_dummy_number_picker(editor.find('.border_editor_width'),border[0]);
    set_dummy_select_box(editor.find('.border_editor_style'),border[1]);
    set_dummy_color_picker(editor.find('.border_editor_color'),border[2]);
}
set_dummy_border_editor = function(editor,val){
    let border  ;
    if(val == '--' || typeof(val) === 'undefined'){
        border = '-- -- --'.split(' ')
    }else{
        border = val.split(' ')
    }
    set_dummy_number_picker(editor.find('.border_editor_width'),border[0]);
    set_dummy_select_box(editor.find('.border_editor_style'),border[1]);
    set_dummy_color_picker(editor.find('.border_editor_color'),border[2]);
    temp_preview_mode();
}
//events
$('body').on('change','.border_editor',function(e){
    if($(this).hasClass('dummy_editor')){return;}
    let new_val = `${get_dummy_val($(this).find('.border_editor_width'))} ${get_dummy_val($(this).find('.border_editor_style'))} ${get_dummy_val($(this).find('.border_editor_color'))}`;
    set_val($(this),new_val);
    new_action();
})
$('body').on('change','.border_editor_width, .border_editor_style, .border_editor_color',function(e){
    $(this).closest('.border_editor').trigger('change')
})
