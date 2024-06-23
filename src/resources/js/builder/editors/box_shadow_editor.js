draw_box_shadow_editor = function(data){
    let editor_popup_box_shadows
    let editor = $('<div/>',{
        class:`editor box_shadow_editor w100p`,
        key_tree:data.key_tree,
        variable_key:data.variable_key,
        key:data.key,
    }).append(
        $('<div/>',{class:'editor_popup_container w100p',key:'editor_box_shadow'}).append(
            draw_editor_show_container({
                key:'editor_box_shadow_customize',
                name:texts.styling.customize_shadow,
                row_class:true,
                container_class:'editor_popup_brdrT_none editor_popup_brdrB'
            }),
            $('<div/>',{class:'mX10 fs09 mT20',text:texts.styling.select_shadow}),
            editor_popup_box_shadows = $('<div/>',{class:'editor_popup_box_shadows'}).append(
                $('<div/>',{class:'box_shadow_preview row alnC jstfyC',key:'none'}).append(
                    $('<div/>',{class:'fs08',text:texts.styling.none})
                )
            )
        ),
        $('<div/>',{class:'editor_popup_container w100p none',key:'editor_box_shadow_customize',parent_key:'editor_box_shadow'}).append(
            $('<div/>',{class:'mX10 bold mY20 fs09',text:texts.styling.customize_shadow}),
            $('<div/>',{class:'editor_box_shadow_customize editor_popup_groups'}),
            $('<div/>',{class:'w100p row alnC jstfyE pB20'}).append(
                $('<div/>',{class:'btn btn-cancel editor_popup_box_shadow_add_layer',text:texts.styling.add_layer})
            ),
        )
        
    );
    let box_shadows = get_box_shadows();
    for(const key in box_shadows){
        editor_popup_box_shadows.append(
            $('<div/>',{
                class:'box_shadow_preview',
                key:key,
                style:`box-shadow:${box_shadows[key]}`

            })
        )
    }
    return editor;
}
set_box_shadow_editor = function(editor){
    let val = get_editor_val(editor);
    $(`.box_shadow_preview`).removeClass('box_shadow_preview_selected')
    if(val == 'none'){
        $(`.box_shadow_preview[key="none"]`).addClass('box_shadow_preview_selected')
    }else{
        let shadow_key;
        let box_shadows = get_box_shadows();
        for(const key in box_shadows){
            if(box_shadows[key] == val){
                $(`.box_shadow_preview[key="${key}"]`).addClass('box_shadow_preview_selected')
            }
        }
    }
    draw_customize_box_shadow(editor)
}
draw_customize_box_shadow = function(editor){
    let val = get_editor_val(editor);
    $('.editor_box_shadow_customize').text('')
    if(val == 'none'){return;}
    let shadows = val.split(', ')
    for(const key in shadows){
        let shadow = shadows[key].split(' ');
        let shadow_type;let shadow_color;let shadow_offset_x;let shadow_offset_y;let shadow_blur;let shadow_spread;
        $('.editor_box_shadow_customize').append(
            $('<div/>',{class:`editor_popup_group`}).append(
                $('<div/>',{class:'editor_popup_group_title'}).append(
                    // $('<div/>',{class:'row alnC jstfyS'}).append(
                        // $('<div/>',{class:'editor_popup_box_shadow_remove_layer ico-close mie-10 fs07 pointer cR',key:key,tooltip:texts.styling.remove_layer}),
                        $('<div/>',{text:`${texts.styling.layer} ${parseInt(key)+1}`}),
                    // ),
                
                    $('<div/>',{class:'ico-arrowDown2'})
                ),
                $('<div/>',{class:`editor_popup_group_content editor_popup_box_shadow_layer`}).append(
                    $('<div/>',{class:'row alnC jstfyE w100p'}).append(
                        $('<div/>',{class:'editor_popup_box_shadow_remove_layer pointer pointer cR fs08 mB10 mT5 ico-close',key:key,tooltip:texts.styling.remove_layer})
                    ),
                    $('<div/>',{class:'editor_popup_box_shadow_row editor_popup_brdrT_none'}).append(
                        $('<div/>',{class:'fs085',text:texts.styling.type}),
                        shadow_type = draw_select_box({
                            dummy:true,
                            dummy_class:'box_shadow_type',
                            selections:[
                                {text:texts.styling.outset,key:'outset'},
                                {text:texts.styling.inset,key:'inset'},
                            ]
                        })
                    ),
                    $('<div/>',{class:'editor_popup_box_shadow_row'}).append(
                        $('<div/>',{class:'fs085',text:texts.styling.color}),
                        shadow_color = draw_color_picker({
                            dummy:true,
                            dummy_class:'box_shadow_color',
                        })
                    ),
                    $('<div/>',{class:'editor_popup_box_shadow_row'}).append(
                        $('<div/>',{class:'fs085',text:texts.styling.offset_x}),
                        shadow_offset_x = draw_number_picker({
                            dummy:true,
                            dummy_class:'box_shadow_offset_x',
                            units:['px'],
                            step:1,
                        })
                    ),
                    $('<div/>',{class:'editor_popup_box_shadow_row'}).append(
                        $('<div/>',{class:'fs085',text:texts.styling.offset_y}),
                        shadow_offset_y = draw_number_picker({
                            dummy:true,
                            dummy_class:'box_shadow_offset_y',
                            units:['px'],
                            step:1,
                        })
                    ),
                    $('<div/>',{class:'editor_popup_box_shadow_row'}).append(
                        $('<div/>',{class:'fs085',text:texts.styling.blur}),
                        shadow_blur = draw_number_picker({
                            dummy:true,
                            dummy_class:'box_shadow_blur',
                            units:['px'],
                            step:1,
                        })
                    ),
                    $('<div/>',{class:'editor_popup_box_shadow_row'}).append(
                        $('<div/>',{class:'fs085',text:texts.styling.spread}),
                        shadow_spread = draw_number_picker({
                            dummy:true,
                            dummy_class:'box_shadow_spread',
                            units:['px'],
                            step:1,
                        })
                    ),
                )

            )
        )

        set_dummy_select_box(shadow_type,shadow.length == 6 ? 'inset' : 'outset');
        set_dummy_color_picker(shadow_color,shadow[0])
        set_dummy_number_picker(shadow_offset_x,shadow[1])
        set_dummy_number_picker(shadow_offset_y,shadow[2])
        set_dummy_number_picker(shadow_blur,shadow[3])
        set_dummy_number_picker(shadow_spread,shadow[4])
    }
}
//
$('body').on('click','.box_shadow_preview',function(){
    let shadow_key = $(this).attr('key');
    let editor = $(this).closest('.box_shadow_editor');
    let shadow;
    if(shadow_key == 'none'){shadow = 'none'}
    else{
        shadow = get_box_shadows(shadow_key);
    }
    set_val(editor,shadow);
    new_action();
    temp_preview_mode();
})
$('body').on('change',`.box_shadow_type, .box_shadow_color, .box_shadow_offset_x, .box_shadow_offset_y, .box_shadow_blur, .box_shadow_spread`,function(){
    let editor = $(this).closest('.box_shadow_editor')
    let new_val = ``;
    editor.find('.editor_popup_box_shadow_layer').each(function(index, elem){
        let color = get_dummy_val($(this).find('.box_shadow_color'));
        let x = get_dummy_val($(this).find('.box_shadow_offset_x'));
        let y = get_dummy_val($(this).find('.box_shadow_offset_y'));
        let blur = get_dummy_val($(this).find('.box_shadow_blur'));
        let spread = get_dummy_val($(this).find('.box_shadow_spread'));
        let type = get_dummy_val($(this).find('.box_shadow_type'));
        new_val = `${new_val}${color} ${x} ${y} ${blur} ${spread}${type == 'inset' ? ' inset' : ''}`
        if (index !== editor.find('.editor_popup_box_shadow_layer').length - 1) {
            new_val = `${new_val}, `
        }
    });
    set_val(editor,new_val);
    new_action(false,true);
    temp_preview_mode();
})
$('body').on('click','.editor_popup_box_shadow_add_layer',function(){
    let editor = $(this).closest('.box_shadow_editor');
    let val = get_editor_val(editor);
    let new_val;
    if(val == 'none'){
        new_val = `rgba(var(--color_4_1),0.1) 0px 0px 0px 0px`;
    }else{
        new_val = `${val}, rgba(var(--color_4_1),0.1) 0px 0px 0px 0px`;
    }
    set_val(editor,new_val);
    new_action();
    temp_preview_mode();
    setTimeout(()=>{
        editor.find('.editor_popup_box_shadow_layer').last().closest('.editor_popup_group').find('.editor_popup_group_title').trigger('click')
    })
})
$('body').on('click','.editor_popup_box_shadow_remove_layer',function(){
    let editor = $(this).closest('.box_shadow_editor');
    let val = get_editor_val(editor);
    let remove_layer = $(this).attr('key');
    let shadows = val.split(', ');
    let new_shadows = [];
    let new_val = '';
    for(const key in shadows){
        if(key != remove_layer){
            new_shadows.push(shadows[key]);
        }
    }
    for(const key in new_shadows){
        new_val = `${new_val}${new_shadows[key]}`;
        if(key != new_shadows.length - 1){
            new_val = `${new_val}, `;
        }
    }
    if(new_val == ''){new_val = 'none'}
    set_val(editor,new_val);
    new_action();
})