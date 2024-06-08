draw_animation_selector = function(data){
    return '';
    let elem_data = get_key_tree(data.key_tree);
    let elem_val = get_elem_val(elem_data,'name',data.is_responsive ? '1':'0');
    let animations_preview_container;
    let selector_container = $('<div/>',{class:` ${data.selector_container_class === false ? '' : 'selector_container'} ${data.container_class ?? ''}`,is_responsive:data.is_responsive ? '1':'0'}).append(
        draw_selector_name({data:data,name:'',responsive_class:elem_val.responsive_class,container_class:'m10 pX5 bold w100p-20 fs101'}),
        $('<div/>',{class:'selector w100p',key_tree:data.key_tree,key:'name'}).append(
            $('<div/>',{class:'editor_popup_container w100p',key:'select_animation'}).append(
                draw_editor_show_container({
                    name:texts.styling.customize_animation,
                    key:'customize_animation',
                    row_class:true,
                }),
                $('<div/>',{class:'editor_popup_col'}).append(
                    $('<div/>',{class:' fs09',text:texts.styling.select_animation}),
                    animations_preview_container = $('<div/>',{class:'selector animations_preview_container w100p row wrap alnC jstfyC',key_tree:data.key_tree,key:'name'})
                )
            ),
        ),

        $('<div/>',{class:'editor_popup_container w100p none',key:'customize_animation',parent_key:'select_animation'}).append(
            // draw_rename_selector({
            //     keys_arr:[{key_tree:data.key_tree,key:'name'}],
            //     name:texts.styling.animation_name,
            // }),
            draw_switch_btn({
                keys_arr:[{key_tree:data.key_tree,key:'repeat'}],
                name:texts.styling.repeat_animation,
                show_hide:'editor_popup_show_container[key="animation_up"].editor_popup_show_container[key="animation_up_out.editor_popup_show_container[key="animation_down"]',
                is_responsive:true,
                responsive_icon:false,
                hover_icon:false,
                selector_container_class:false,
            }),
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
                container_class:'editor_popup_row_border_bottom'
            }),
        ),
    )
    let keyframes = ['up_out','up','in','down','down_out'];
    for(const key in keyframes){
        let keyframe = keyframes[key];
        selector_container.append(
            $('<div/>',{class:'editor_popup_container w100p none',key:`animation_${keyframe}`,parent_key:'customize_animation'}).append(
                $('<div/>',{class:'mX15 fs1 mB20 bold',text:texts.styling[`animation_${keyframe}`]}),
                draw_select_range({
                    keys_arr:[{key_tree:data.key_tree,key:`${keyframe}_duration`}],
                    unit:'ms',
                    range:{min:0,max:3000,step:1},
                    name:texts.styling.duration,
                    is_responsive:data.is_responsive,
                    selector_container_class:false,
                    responsive_icon:false,
                    hover_icon:false,
                    container_class:'editor_popup_row_border_top_none animation_select_range'
                }),
                draw_select_range({
                    keys_arr:[{key_tree:data.key_tree,key:`${keyframe}_delay`}],
                    unit:'ms',
                    range:{min:0,max:3000,step:1},
                    name:texts.styling.delay,
                    is_responsive:data.is_responsive,
                    selector_container_class:false,
                    responsive_icon:false,
                    hover_icon:false,
                    container_class:'animation_select_range'
                }),
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
                draw_timing_function_selector({
                    keys_arr:[{key_tree:data.key_tree,key:`${keyframe}_timing_function`}],
                    name:texts.styling.select_animation_timing,
                    is_responsive:data.is_responsive,
                    selector_container_class:false,
                    responsive_icon:false,
                    hover_icon:false,
                })
            ),
            $('<div/>',{class:'editor_popup_container w100p none',key:`animation_${keyframe}_transform`,parent_key:`animation_${keyframe}`}).append(
                draw_transform_selector({
                    keys_arr:[{key_tree:data.key_tree,key:`${keyframe}_transform`}],
                    selector_container_class:false,
                    is_responsive:data.is_responsive,
                    selector_container_class:false,
                    responsive_icon:false,
                    hover_icon:false,
                }),
            ),
            $('<div/>',{class:'editor_popup_container w100p none',key:`animation_${keyframe}_filter`,parent_key:`animation_${keyframe}`}).append(
                draw_filter_selector({
                    keys_arr:[{key_tree:data.key_tree,key:`${keyframe}_filter`}],
                    selector_container_class:false,
                    is_responsive:data.is_responsive,
                    selector_container_class:false,
                    responsive_icon:false,
                    hover_icon:false,
                })
            )
        )
    }
    for(const key in window.animations_previews){
        let is_selected;
        if(window.animations_previews[key].name == elem_val.val){
            is_selected = true;
        }
        animations_preview_container.append(
            draw_animation_preview_model(window.animations_previews[key],is_selected)
        )
    }

    return selector_container
}
set_animation_selector = function(selector){
    let val = get_selector_val(selector);
    selector.find('.animation_preview_container').removeClass('animation_preview_container_selected');
    if(val != null){
        selector.find(`.animation_preview_container[animation_name="${val}"]`).addClass('animation_preview_container_selected')
    }
}
draw_animation_preview_model = function(animation,is_selected){

    switch(animation.preview_model){
        case 'none':
            return $('<div/>',{animation_name:'no_animation',class:`animation_preview_container column alnC jstfyC ${is_selected ? 'animation_preview_container_selected' : ''}`}).append(
                    $('<div/>',{class:'ico-no cR fs103'}),
                    $('<div/>',{class:'fs08 mT5 c_white-10',text:texts.select_elems._no_animation})
                )
        break;
        case '1':
                return draw_animation_preview_model_1(animation,is_selected)
        break;
    }
}
draw_animation_preview_model_1 = function(animation,is_selected){
    return $('<div/>',{animation_name:animation.name,class:`animation_preview_container ${is_selected ? 'animation_preview_container_selected' : ''}`}).append(
        $('<div/>',{class:'animation_preview_scroll'}),
        $('<div/>',{class:'animation_preview'}).append(
            $('<div/>',{class:'animation_preview_body'}).append(
                $('<div/>',{class:'animation_preview_body_top'}).append(
                    $('<div/>',{class:'animation_preview_body_dummy_elem w30'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w50'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w50'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w50'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                ),
                $('<div/>',{class:'animation_preview_body_mid row alnC jstfyC'}).append(
                    $('<div/>',{class:' row alnC jstfyE h100p'}).append(
                        $('<img/>',{src:'./storage/imgs/burger_icon.png',class:`animation_preview_elem`,animation_name:animation.name})
                    ),
                    $('<div/>',{class:'mis-5'}).append(
                        $('<div/>',{class:'animation_preview_body_dummy_elem w30'}),
                        $('<div/>',{class:'animation_preview_body_dummy_elem w30'}),
                        $('<div/>',{class:'animation_preview_body_dummy_elem w50'}),
                        $('<div/>',{class:'animation_preview_body_dummy_elem w50'}),
                        $('<div/>',{class:'animation_preview_body_dummy_elem w50'}),
                        $('<div/>',{class:'animation_preview_body_dummy_elem w50'}),
                    ),
                ),
                $('<div/>',{class:'animation_preview_body_bottom'}).append(
                    $('<div/>',{class:'animation_preview_body_dummy_elem w30'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w50'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w50'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w50'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                    $('<div/>',{class:'animation_preview_body_dummy_elem w80'}),
                ),
            )
        )
    )
}
stop_preview_animations = function(){
    $('.animation_preview_scroll').css('transform',`translateY(0px)`)
    $('.animation_preview').scrollTop(0)
    clearTimeout(window.animations_preveiw_interval)
}
play_preview_animations = function(){
    stop_preview_animations();
    
    let x = 1;
    
    $('.animation_preview_elem').each(function(){
        let animation_name = $(this).attr('animation_name');
        let animation = window.animations_previews.find(item=>item.name == animation_name);
        $(this).attr('style','');
        $(this).css({
            // 'transition-timing-function':animation.timing_function,
            'transition-duration':`${animation.elem_duration}ms`
        })
        for(const key in animation.down){
            $(this).css(key,animation.down[key])
        }
    });
    window.animations_preveiw_interval = setInterval(() => {
        let scroll_bar;let scroll_top;let animation_style;let elem_timeout= 0;
        switch(x){
            case 1:scroll_bar='15';scroll_top=60;animation_style='in';elem_timeout=400;break;
            case 2:scroll_bar='30';scroll_top=120;animation_style='up';break;
            case 3:scroll_bar='15';scroll_top=60;animation_style='in';elem_timeout=400;break;
            case 4:scroll_bar='0';scroll_top=0;animation_style='down';break;
        }

        $('.animation_preview_scroll').css({'transform':`translateY(${scroll_bar}px)`})
        $('.animation_preview').animate({'scrollTop':scroll_top},500)

        $('.animation_preview_elem').each(function(){
            let animation_name = $(this).attr('animation_name');
            let animation = window.animations_previews.find(item=>item.name == animation_name);
            // $(this).attr('style','');
            $(this).css({
                // 'transition-timing-function':animation.timing_function,
                'transition-duration':`${animation.elem_duration}ms`
            })
            setTimeout(()=>{
                for(const key in animation[animation_style]){
                    $(this).css(key,animation[animation_style][key])
                }
            },x == 1 || x == 3 ? animation.elem_delay : 0)
        });
        if(x >= 4){x = 1;}else{x++;}
    },1500);
} 
//events
$('body').on('click','.editor_popup_show_container[key="customize_animation"]',function(e){
    set_elem_val($(this),'customized_animation')
    new_action();
})
$('body').on('mouseup','.animation_preview_container',function(){
    if($(this).hasClass('animation_preview_container_selected')){return;}
    let animation = JSON.parse(JSON.stringify(window.animations.find(item=>item.name == $(this).attr('animation_name'))));
    let responsive_elem = $(this).closest('.selector_container').find('.responsive');
    let key_tree = $(this).closest('.selector').attr('key_tree');
    let elem_data = get_key_tree(key_tree);
    for(const key in animation){
        if(responsive_elem.hasClass('responsive_desktop_mobile')){
            elem_data.elem[key] = animation[key];
            elem_data.elem_mobile[key] = animation[key];
        }else if(responsive_elem.hasClass('responsive_desktop')){
            elem_data.elem[key] = animation[key];
        }else if(responsive_elem.hasClass('responsive_mobile')){
            elem_data.elem_mobile[key] = animation[key];
        }else{
            elem_data.elem[key] = animation[key];
        }
    }
    new_action();
})
window.preview_elem_animation_on_website_timeout = null;
preview_elem_animation_on_website = function(keyframe){
    let elem = $('#website').find(`.section_block[key_tree="${window.selected}"]`);
    let elem_data = get_key_tree(elem.attr('key_tree')).elem;
    let animation = elem_data.animation;
    window.current_view == 'mobile' ? animation = elem_data.animation_mobile : null;
    switch (keyframe) {
        case 'animation_up_out':
            clearTimeout(window.preview_elem_animation_on_website_timeout)
            set_elem_animation_styles(elem,animation,'up',true)
            window.preview_elem_animation_on_website_timeout = setTimeout(()=>{
                set_elem_animation_styles(elem,animation,'up_out',false)
            },500)
        break;
        case 'animation_up':
            clearTimeout(window.preview_elem_animation_on_website_timeout)
            set_elem_animation_styles(elem,animation,'in',true)
            window.preview_elem_animation_on_website_timeout = setTimeout(()=>{
                set_elem_animation_styles(elem,animation,'up',false)
            },1000)
        break;
        case 'animation_in':
            clearTimeout(window.preview_elem_animation_on_website_timeout)
            set_elem_animation_styles(elem,animation,'down',true)
            window.preview_elem_animation_on_website_timeout = setTimeout(()=>{
                set_elem_animation_styles(elem,animation,'in',false)
            },1000)
        break;
        case 'animation_down':
            clearTimeout(window.preview_elem_animation_on_website_timeout)
            set_elem_animation_styles(elem,animation,'in',true)
            window.preview_elem_animation_on_website_timeout = setTimeout(()=>{
                set_elem_animation_styles(elem,animation,'down',false)
            },1000)
        break;
        case 'animation_down_out':
            clearTimeout(window.preview_elem_animation_on_website_timeout)
            set_elem_animation_styles(elem,animation,'down',true)
            window.preview_elem_animation_on_website_timeout = setTimeout(()=>{
                set_elem_animation_styles(elem,animation,'down_out',false)
            },1000)
        break;
    }
}
$('body').on('slide','.animation_select_range',function(){
    preview_elem_animation_on_website($(this).closest('.editor_popup_container').attr('key'))
})