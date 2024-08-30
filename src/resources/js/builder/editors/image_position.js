draw_image_position_editor = function(data){
    let editor = $('<div/>',{
        class:`editor image_position_editor `,
        key_tree:data.key_tree,
        variable_key:data.variable_key,
        key:data.key,
        render:data.render ?? '',
        generate_style:data.generate_style ?? data.key_tree,
    }).append(
        draw_input_list({
            dummy:true,
            dummy_class:'image_position_input_list',
            selections:[
                {name:texts.styling.center,val:'50% 50%'},
                {name:texts.styling.top,val:'50% 0%'},
                {name:texts.styling.bottom,val:'50% 100%'},
                {name:texts.styling.left,val:'0% 50%'},
                {name:texts.styling.right,val:'100% 50%'},
                {name:texts.styling.top_left,val:'0% 0%'},
                {name:texts.styling.top_right,val:'100% 0%'},
                {name:texts.styling.bottom_left,val:'0% 100%'},
                {name:texts.styling.bottom_right,val:'100% 100%'},
                {name:texts.styling.custom,val:'custom'},

            ]
        }),
        $('<div/>',{class:'editor_popup_row editor_popup_brdrT_none pY5 mT20'}).append(
            $('<div/>',{class:'fs09',text:'X'}),
            draw_select_range({
                dummy:true,
                dummy_class:'image_position_x',
                unit:'%',
                range:{min:0,max:100,step:1}
            })
        ),
        $('<div/>',{class:'editor_popup_row editor_popup_brdrT_none pY5'}).append(
            $('<div/>',{class:'fs09',text:'Y'}),
            draw_select_range({
                dummy:true,
                dummy_class:'image_position_y',
                unit:'%',
                range:{min:0,max:100,step:1}
            })
        ),
    );
    return editor;
}
set_image_position_editor = function(editor){
    let val = get_editor_val(editor);
    if(val == '--'){
        set_dummy_input_list(editor,'--');
        set_dummy_select_range(editor.find('.image_position_x'),'--')
        set_dummy_select_range(editor.find('.image_position_y'),'--')
    }else{
        if(
            val === '0% 0%' ||
            val === '0% 50%' ||
            val === '0% 100%' ||
            val === '50% 0%' ||
            val === '50% 50%' ||
            val === '50% 100%' ||
            val === '100% 0%' ||
            val === '100% 50%' ||
            val === '100% 100%'
        ){
            set_dummy_input_list(editor,val);
        }else{
            set_dummy_input_list(editor,'custom');
        }
    
        val = val.split(' ');
        set_dummy_select_range(editor.find('.image_position_x'),val[0])
        set_dummy_select_range(editor.find('.image_position_y'),val[1])
    }

}
//
$('body').on('change','.image_position_input_list',function(){
    let editor = $(this).closest('.image_position_editor');
    let new_val;
    if(get_dummy_val($(this)) !== 'custom'){
        new_val = get_dummy_val($(this));
        set_val(editor,new_val);
        let new_val = new_val.split(' ');
        set_dummy_select_range(editor.find('.image_position_x'),new_val[0])
        set_dummy_select_range(editor.find('.image_position_y'),new_val[1])
        new_action(editor.attr('generate_style'),editor.attr('render'));
        set_image_position_editor(editor)

    }
})
$('body').on('change','.image_position_x, .image_position_y',function(){
    let editor = $(this).closest('.image_position_editor');
    let new_val = `${get_dummy_val(editor.find('.image_position_x'))} ${get_dummy_val(editor.find('.image_position_y'))}`;
    set_val(editor,new_val);
    new_action(editor.attr('generate_style'),editor.attr('render'));
    set_image_position_editor(editor)

})
