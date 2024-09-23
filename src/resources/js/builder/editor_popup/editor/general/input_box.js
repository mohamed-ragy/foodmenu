draw_editor_popup_input_box = function(){
    if(!accessibility_check(window.selected,'input_box')){return;}
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:false,
                editors:[
                    $('<div/>',{class:' bold m10',text:texts.styling.select_input_box}),
                    $('<div/>',{class:`editor_popup_row editor_popup_brdrT_none pY10`}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.color}),
                        $('<div/>',{class:'row alnC jstfyE'}).append(
                            $('<div/>',{class:`input_box_preview_color ${window.preview_input_boxs_style.color == '1' ? 'input_box_preview_color_selected':''}`,color:'1',style:`background-color:rgba(var(--color_1_3))`}),
                            $('<div/>',{class:`input_box_preview_color ${window.preview_input_boxs_style.color == '2' ? 'input_box_preview_color_selected':''}`,color:'2',style:`background-color:rgba(var(--color_2_3))`}),
                            $('<div/>',{class:`input_box_preview_color ${window.preview_input_boxs_style.color == '3' ? 'input_box_preview_color_selected':''}`,color:'3',style:`background-color:rgba(var(--color_3_3))`}),
                            $('<div/>',{class:`input_box_preview_color ${window.preview_input_boxs_style.color == '4' ? 'input_box_preview_color_selected':''}`,color:'4',style:`background-color:rgba(var(--color_4_3))`}),
                        )
                    ),
                    $('<div/>',{class:`editor_popup_row pY10`}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.border_radius}),
                        $('<div/>',{class:'row alnC jstfyE'}).append(
                            $('<div/>',{class:`input_box_preview_border_radius ${window.preview_input_boxs_style.border_radius == '0px' ? 'input_box_preview_border_radius_selected':''} ico-border_radius_1`,border_radius:'0px'}),
                            $('<div/>',{class:`input_box_preview_border_radius ${window.preview_input_boxs_style.border_radius == '5px' ? 'input_box_preview_border_radius_selected':''} ico-border_radius_2`,border_radius:'5px'}),
                            $('<div/>',{class:`input_box_preview_border_radius ${window.preview_input_boxs_style.border_radius == '20px' ? 'input_box_preview_border_radius_selected':''} ico-border_radius_3`,border_radius:'20px'}),
                        ),
                    ),
                    $('<div/>',{class:`editor_popup_row pY10`}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.padding}),
                        $('<div/>',{class:'row alnC jstfyE'}).append(
                            $('<div/>',{class:`input_box_preview_padding ${window.preview_input_boxs_style.padding_size == '5px 10px 5px 10px' ? 'input_box_preview_padding_selected':''}`,text:'S',padding_size:'5px 10px 5px 10px'}),
                            $('<div/>',{class:`input_box_preview_padding ${window.preview_input_boxs_style.padding_size == '8px 10px 8px 10px' ? 'input_box_preview_padding_selected':''}`,text:'M',padding_size:'8px 10px 8px 10px'}),
                            $('<div/>',{class:`input_box_preview_padding ${window.preview_input_boxs_style.padding_size == '10px 15px 10px 15px' ? 'input_box_preview_padding_selected':''}`,text:'L',padding_size:'10px 15px 10px 15px'}),
                        )
                    ),
                    $('<div/>',{class:'editor_popup_row editor_popup_brdrB'}).append(
                        $('<div/>',{class:'fs09',text:texts.preview_error_style}),
                        draw_switch_btn({
                            dummy:true,
                            dummy_class:'input_box_preview_error_switch_btn'
                        })
                    ),
                    $('<div/>',{class:`editor_popup_col editor_popup_brdrT_none`}).append(
                        $('<div/>',{class:'input_boxs_preview_container mT20 w100p'})
                    )
                ]
            })
        )
        draw_input_boxs_preview_container();
        setTimeout(()=>{
            $('.editor_popup_title2').text(texts.styling.input_box)
            $(`.editor_popup_body_shortcut.editor_input_box`).addClass('editor_popup_body_shortcut_selected')
        });
    })
}
$('body').on('click','.editor_input_box',function(){
    draw_editor_popup_input_box();
})
//
draw_input_boxs_preview_container = function(){
    let input_boxs = get_input_boxs();
    $('.input_boxs_preview_container').text('');
    let elem = get_element_data(window.selected).children.input_box;
    for(const key in input_boxs){
        let _input_box = input_boxs[key];
        let input_box = elem_preivew_input_box(key);
        let is_selected = true;
        for(const _key in _input_box.css){
            try{
                elem.css[_key] !== _input_box.css[_key] ? is_selected = false : null;
            }catch{}
            input_box.css[_key] = _input_box.css[_key];
        }
        for(const _key in _input_box.css_hover){
            try{
                elem.css_hover[_key] !== _input_box.css_hover[_key] ? is_selected = false : null;
            }catch{}
            input_box.css_hover[_key] = _input_box.css_hover[_key];
        }
        for(const _key in _input_box.css_focus){
            try{
                elem.css_focus[_key] !== _input_box.css_focus[_key] ? is_selected = false : null;
            }catch{}
            input_box.css_focus[_key] = _input_box.css_focus[_key];
        }
        for(const _key in _input_box.css_error){
            try{
                elem.css_error[_key] !== _input_box.css_error[_key] ? is_selected = false : null;
            }catch{}
            input_box.css_error[_key] = _input_box.css_error[_key];
        }
        for(const _key in _input_box.css_placeholder){
            try{
                elem.css_placeholder[_key] !== _input_box.css_placeholder[_key] ? is_selected = false : null;
            }catch{}
            input_box.css_placeholder[_key] = _input_box.css_placeholder[_key];
        }
        if('background' in _input_box){
            input_box.background = {};
            for(const _key in _input_box.background){
                try{
                    elem.background[_key] !== _input_box.background[_key] ? is_selected = false : null;
                }catch{}
                input_box.background[_key] = _input_box.background[_key];
            }
        }else if('background' in elem){ is_selected = false}

        if('background_hover' in _input_box){
            input_box.background_hover = {};
            for(const _key in _input_box.background_hover){
                try{
                    elem.background_hover[_key] !== _input_box.background_hover[_key] ? is_selected = false : null;
                }catch{}
                input_box.background_hover[_key] = _input_box.background_hover[_key];
            }
        }else if('background_hover' in elem){ is_selected = false}
        
        if('background_focus' in _input_box){   
            input_box.background_focus = {};
            for(const _key in _input_box.background_focus){
                try{
                    elem.background_focus[_key] !== _input_box.background_focus[_key] ? is_selected = false : null;
                }catch{}
                input_box.background_focus[_key] = _input_box.background_focus[_key];
            }
        }else if('background_focus' in elem){ is_selected = false}
    
        if('background_error' in _input_box){   
            input_box.background_error = {};
            for(const _key in _input_box.background_error){
                try{
                    elem.background_error[_key] !== _input_box.background_error[_key] ? is_selected = false : null;
                }catch{}
                input_box.background_error[_key] = _input_box.background_error[_key];
            }
        }else if('background_error' in elem){ is_selected = false}
        generate_elem_style(input_box);
        let has_error_class = false;
        if(get_dummy_val($('.input_box_preview_error_switch_btn')) == '1'){has_error_class = true;}
        $('.input_boxs_preview_container').append(
            $('<div/>',{class:'row alnC jstfyC w100p'}).append(
                $('<div/>',{class:`${is_selected ? 'ico-check1 cG' : 'ico-check0'} pointer input_box_preview_select`,input_box_key:key}),
                $('<input/>',{
                    class:`input_box_preview input_box_preview_${key} ${has_error_class ? `input_box_preview_${key}_error` : ''}`, 
                    input_box_key:key,
                    style:`font-family:var(--page_font_style)`,
                    placeholder:texts.styling.input_box_placeholder,
                })
            )
        )
    }
}
$('body').on('change','.input_box_preview_error_switch_btn',function(){
    let val = get_dummy_val($(this));
    let elem = get_element_data(window.selected);
    if(val == '1'){
        $('.input_boxs_preview_container').find('.input_box_preview').each(function(){
            let input_box_key = $(this).attr('input_box_key');
            $(this).addClass(`input_box_preview_${input_box_key}_error`)
        })
        $(`.${elem.children.input_box.class_selector}`).addClass(`${elem.children.input_box.class_selector}_error`)
        $(`.${elem.children.validation_message.class_selector}`).text(texts.website_style.validation_message_ex)
        window.preview_input_boxs_style.preview_error = '1'
    }else{
        $('.input_boxs_preview_container').find('.input_box_preview').each(function(){
            let input_box_key = $(this).attr('input_box_key');
            $(this).removeClass(`input_box_preview_${input_box_key}_error`)
        })
        $(`.${elem.children.input_box.class_selector}`).removeClass(`${elem.children.input_box.class_selector}_error`)
        $(`.${elem.children.validation_message.class_selector}`).text('')
        window.preview_input_boxs_style.preview_error = '0'
    }
    set_all_editors();
})
$('body').on('click','.input_box_preview_padding',function(e){
    $('.input_box_preview_padding').removeClass('input_box_preview_padding_selected');
    $(this).addClass('input_box_preview_padding_selected');
    window.preview_input_boxs_style.padding_size = $(this).attr('padding_size')
    draw_input_boxs_preview_container();
})
$('body').on('click','.input_box_preview_color',function(e){
    $('.input_box_preview_color').removeClass('input_box_preview_color_selected');
    $(this).addClass('input_box_preview_color_selected');
    window.preview_input_boxs_style.color = $(this).attr('color')
    draw_input_boxs_preview_container();
})
$('body').on('click','.input_box_preview_border_radius',function(e){
    $('.input_box_preview_border_radius').removeClass('input_box_preview_border_radius_selected');
    $(this).addClass('input_box_preview_border_radius_selected');
    window.preview_input_boxs_style.border_radius = $(this).attr('border_radius')
    draw_input_boxs_preview_container();
})
$('body').on('click','.input_box_preview_select',function(){
    $('.input_box_preview_select').removeClass('ico-check1 cG').addClass('ico-check0')
    $(this).addClass('ico-check1 cG').removeClass('ico-check0')
    let input_box_style = get_input_boxs($(this).attr('input_box_key'));
    let elem = get_element_data(window.selected).children.input_box;
    let input_box_default = elem_preivew_input_box();
    elem.css = input_box_default.css;
    delete elem.css_mobile;
    elem.css_hover = input_box_default.css_hover;
    delete elem.css_hover_mobile;
    elem.css_focus = input_box_default.css_focus;
    delete elem.css_focus_mobile;
    elem.css_error = input_box_default.css_error;
    delete elem.css_error_mobile;

    input_box_default.css_placeholder.visibility = elem.css_placeholder.visibility
    elem.css_placeholder = input_box_default.css_placeholder;

    delete elem.background;
    delete elem.background_mobile;
    delete elem.background_hover;
    delete elem.background_hover_mobile;
    delete elem.background_focus;
    delete elem.background_focus_mobile;
    delete elem.background_error;
    delete elem.background_error_mobile;

    for(const key in input_box_style.css){
        elem.css[key] = input_box_style.css[key];
    }
    for(const key in input_box_style.css_hover){
        elem.css_hover[key] = input_box_style.css_hover[key];
    }
    for(const key in input_box_style.css_focus){
        elem.css_focus[key] = input_box_style.css_focus[key];
    }
    for(const key in input_box_style.css_error){
        elem.css_error[key] = input_box_style.css_error[key];
    }
    for(const key in input_box_style.css_placeholder){
        elem.css_placeholder[key] = input_box_style.css_placeholder[key];
    }

    if('background' in input_box_style){
        elem.background = JSON.parse(JSON.stringify(input_box_style.background));
    }
    if('background_hover' in input_box_style){
        elem.background_hover = JSON.parse(JSON.stringify(input_box_style.background_hover));
    }
    if('background_focus' in input_box_style){
        elem.background_focus = JSON.parse(JSON.stringify(input_box_style.background_focus));
    }
    if('background_error' in input_box_style){
        elem.background_error = JSON.parse(JSON.stringify(input_box_style.background_error));
    }


    new_action(window.selected);
});