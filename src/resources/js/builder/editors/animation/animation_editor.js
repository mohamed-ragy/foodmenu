
draw_animation_editor = function(data){
    let animations_preview_container;
    let editor = $('<div/>',{
        class:`editor animation_editor w100p`,
        key_tree:data.key_tree,
        variable_key:data.variable_key,
        key:data.key,
        render:data.render ?? data.key_tree,
    }).append(
        $('<div/>',{class:'editor_popup_container w100p',key:'select_animation'}).append(
            $('<div/>',{class:'mX20 mY10 mT20 bold',text:texts.styling.select_animation}),
            animations_preview_container = $('<div/>',{class:'selector animations_preview_container w100p row wrap alnC jstfyC',key_tree:data.key_tree,key:'name'})
        ),
        $('<div/>',{class:'editor_popup_container w100p none',key:'customize_animation',parent_key:'select_animation'}).append(
            $('<div/>',{class:'editor_popup_row editor_popup_brdrT_none'}).append(
                $('<div/>',{class:'fs09',text:texts.styling.repeat_animation}),
                draw_switch_btn({
                    key_tree:data.key_tree,
                    variable_key:data.variable_key,
                    key:'repeat',
                    show_hide:'editor_popup_show_container[key="animation_up"].editor_popup_show_container[key="animation_up_out"].editor_popup_show_container[key="animation_down"]',
                }),
            ),
            draw_editor_show_container({
                name:texts.styling.animation_up_out,
                key:'animation_up_out',
                row_class:true,
            }),
            draw_editor_show_container({
                name:texts.styling.animation_up,
                key:'animation_up',
                row_class:true,
            }),
            draw_editor_show_container({
                name:texts.styling.animation_in,
                key:'animation_in',
                row_class:true,
            }),
            draw_editor_show_container({
                name:texts.styling.animation_down,
                key:'animation_down',
                row_class:true,
            }),
            draw_editor_show_container({
                name:texts.styling.animation_down_out,
                key:'animation_down_out',
                row_class:true,
            }),
        ),
    );
    let keyframes = ['up_out','up','in','down','down_out'];
    for(const key in keyframes){
        let keyframe = keyframes[key];
        editor.append(
            $('<div/>',{class:'editor_popup_container w100p none',key:`animation_${keyframe}`,parent_key:'customize_animation'}).append(
                $('<div/>',{class:'mX15 fs1 mY20 bold',text:texts.styling[`animation_${keyframe}`]}),
                $('<div/>',{class:'editor_popup_row editor_popup_brdrT_none'}).append(
                    $('<div/>',{class:'fs09',text:texts.styling.duration}),
                    draw_number_picker({
                        key_tree:data.key_tree,
                        variable_key:data.variable_key,
                        key:`${keyframe}_duration`,
                        units:['ms'],
                        step:1,
                        editor_class:'editor_preview_animation'
                    }),
                ),
                $('<div/>',{class:'editor_popup_row'}).append(
                    $('<div/>',{class:'fs09',text:texts.styling.delay}),
                    draw_number_picker({
                        key_tree:data.key_tree,
                        variable_key:data.variable_key,
                        key:`${keyframe}_delay`,
                        units:['ms'],
                        step:1,
                        editor_class:'editor_preview_animation'
                    }),
                ),
                draw_editor_show_container({
                    name:texts.styling.animation_timing_function,
                    key:`animation_${keyframe}_timing_function`,
                    row_class:true,
                }),
                draw_editor_show_container({
                    name:texts.styling.transform,
                    key:`animation_${keyframe}_transform`,
                    row_class:true,
                }),
                draw_editor_show_container({
                    name:texts.styling.filter,
                    key:`animation_${keyframe}_filter`,
                    row_class:true,
                    container_class:'editor_popup_row_border_bottom'
                }),    
            ),
            $('<div/>',{class:'editor_popup_container w100p none',key:`animation_${keyframe}_timing_function`,parent_key:`animation_${keyframe}`}).append(
                draw_timing_function_editor({
                    key_tree:data.key_tree,
                    variable_key:data.variable_key,
                    key:`${keyframe}_timing_function`,
                    editor_class:'editor_preview_animation2'
                })
            ),
            $('<div/>',{class:'editor_popup_container w100p none',key:`animation_${keyframe}_transform`,parent_key:`animation_${keyframe}`}).append(
                $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
                    $('<div/>',{class:'fs09',text:texts.styling.transform_origin}),
                    draw_input_list({
                        key_tree:data.key_tree,
                        variable_key:data.variable_key,
                        key:`${keyframe}_transform_origin`,
                        selections:[
                            {name:texts.styling.center,val:'center'},
                            {name:texts.styling.top,val:'top'},
                            {name:texts.styling.right,val:'right'},
                            {name:texts.styling.bottom,val:'bottom'},
                            {name:texts.styling.left,val:'left'},
                            {name:texts.styling.top_left,val:'top left'},
                            {name:texts.styling.top_right,val:'top right'},
                            {name:texts.styling.bottom_left,val:'bottom left'},
                            {name:texts.styling.bottom_right,val:'bottom right'},
                        ],
                        editor_class:'editor_preview_animation2'
                    }),
                ),
                draw_transform_editor({
                    key_tree:data.key_tree,
                    variable_key:data.variable_key,
                    key:`${keyframe}_transform`,
                    editor_class:'editor_preview_animation2'
                }),
            ),
            $('<div/>',{class:'editor_popup_container w100p none',key:`animation_${keyframe}_filter`,parent_key:`animation_${keyframe}`}).append(
                draw_filter_editor({
                    key_tree:data.key_tree,
                    variable_key:data.variable_key,
                    key:`${keyframe}_filter`,
                    editor_class:'editor_preview_animation2'
                })
            )
        )
    }
    for(const key in window.animations_previews){
        animations_preview_container.append(
            draw_animation_preview_model(window.animations_previews[key])
        )
        if(window.animations_previews[key].name == 'no_animation'){
            animations_preview_container.append(
                draw_animation_preview_model({preview_model:'custom'})
            )
        }
    }
    return editor;
}
set_animation_editor = function(editor){
    let animation_name = get_editor_val(editor);
    $('.animation_preview_container').removeClass('animation_preview_container_selected')
    $('.animation_preview_container_dump').removeClass('animation_preview_container_selected')
    if(animation_name == 'customized_animation'){
        $(`.animation_preview_container_dump[animation_name="${animation_name}"]`).addClass('animation_preview_container_selected')
    }else{
        $(`.animation_preview_container[animation_name="${animation_name}"]`).addClass('animation_preview_container_selected')
    }
}

//
$('body').on('click','.editor_popup_show_container[key="animation_up_out"]',function(){
    let elem_data = get_element_data(window.selected);
    let elem = $(`.${elem_data.class_selector}_container`);
    $('#website').scrollTop(elem.offset().top - $('#website').offset().top + $('#website').scrollTop() - 20)
    setTimeout(()=>{
        set_elem_animation(elem_data.class_selector,'up_out',false)
    })
})
$('body').on('click','.editor_popup_show_container[key="animation_up"]',function(){
    let elem_data = get_element_data(window.selected);
    let elem = $(`.${elem_data.class_selector}_container`);
    $('#website').scrollTop(elem.offset().top - $('#website').offset().top + $('#website').scrollTop() - 70)
    setTimeout(()=>{
        set_elem_animation(elem_data.class_selector,'up',false)
    })
})
$('body').on('click','.editor_popup_show_container[key="animation_in"]',function(){
    let elem_data = get_element_data(window.selected);
    let elem = $(`.${elem_data.class_selector}_container`);
    $('#website').scrollTop(elem.offset().top - $('#website').offset().top + $('#website').scrollTop() - (($('#website').height() / 6) * 2))
    setTimeout(()=>{
        set_elem_animation(elem_data.class_selector,'in',false)
    })
})
$('body').on('click','.editor_popup_show_container[key="animation_down"]',function(){
    let elem_data = get_element_data(window.selected);
    let elem = $(`.${elem_data.class_selector}_container`);
    $('#website').scrollTop(elem.offset().top - $('#website').offset().top + $('#website').scrollTop() - $('#website').height() + elem.height() + 50)
    setTimeout(()=>{
        set_elem_animation(elem_data.class_selector,'down',false)
    })
})
$('body').on('click','.editor_popup_show_container[key="animation_down_out"]',function(){
    let elem_data = get_element_data(window.selected);
    let elem = $(`.${elem_data.class_selector}_container`);
    $('#website').scrollTop(elem.offset().top - $('#website').offset().top + $('#website').scrollTop() - $('#website').height() + elem.height())
    setTimeout(()=>{
        set_elem_animation(elem_data.class_selector,'down_out',false)
    })
})
$('body').on('mouseup','.animation_preview_container',function(){
    if($(this).hasClass('animation_preview_container_selected')){return;}
    let animation = JSON.parse(JSON.stringify(window.animations.find(item=>item.name == $(this).attr('animation_name'))));
    let editor = $(this).closest('.animation_editor');
    let responsive_key = get_responseive_key(editor)
    let key_tree = editor.attr('key_tree');
    let elem = get_element_data(key_tree);
    if(responsive_key == '0'){
        elem.animation = {};
    }else if(responsive_key == 'general'){
        elem.animation = {};
        elem.animation_mobile = {};
    }else if(responsive_key == 'desktop'){
        elem.animation = {};
        if(!('animation_mobile' in elem)){elem.animation_mobile = get_default_style('animation')}
    }else if(responsive_key == 'mobile'){
        elem.animation_mobile = {};
        if(!('animation' in elem)){elem.animation = get_default_style('animation')}
    }
    for(const key in animation){
        if(responsive_key == '0'){
            elem.animation[key] = animation[key];
        }else if(responsive_key == 'general'){
            elem.animation[key] = animation[key];
            elem.animation_mobile[key] = animation[key];
        }else if(responsive_key == 'desktop'){
            elem.animation[key] = animation[key];
        }else if(responsive_key == 'mobile'){
            elem.animation_mobile[key] = animation[key];
        }
    }    
    new_action(editor.attr('render'));
    if(animation.name == 'no_animation'){
        $(`.${elem.class_selector}`).removeAttr('animation' )
    }else{
        $(`.${elem.class_selector}`).attr('animation','true')
    }
    set_animation_editor(editor)
})


//events
$('body').on('click','.editor_popup_show_container[key="customize_animation"]',function(e){
    let editor = $(this).closest('.animation_editor');
    let key_tree = editor.attr('key_tree');
    let elem = get_element_data(key_tree);
    set_val(editor,'customized_animation')
    $(`.${elem.class_selector}`).attr('animation','true')
    new_action(editor.attr('render'));
    set_animation_editor(editor)
})

