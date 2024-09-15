draw_editor_popup_button = function(){
    if(!accessibility_check(window.selected,'button')){return;}
    show_editor_popup('editor',function(){
        let editor_btn_set_disabled;
        let elem = get_element_data(window.selected)
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:false,
                editors:[
                    elem.accessibility.includes('button_function') ?
                    $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.button_function}),
                        draw_button_function_editor({
                            key_tree:`${window.selected}`,
                            variable_key:'attr',
                            key:'href'
                        })
                    ):'',
                    elem.accessibility.includes('can_disabled') ?
                    $('<div/>',{class:`editor_popup_row ${!elem.accessibility.includes('button_function') ? 'editor_popup_brdrT_none' : ''}`}).append(
                        $('<div/>',{class:'fs09',text:texts.disabled}),
                        editor_btn_set_disabled = draw_switch_btn({
                            dummy:true,
                            dummy_class:'editor_btn_set_disabled'
                        })
                    ):'',
                    $('<div/>',{class:`editor_popup_col ${!elem.accessibility.includes('can_disabled') && !elem.accessibility.includes('button_function') ? 'editor_popup_brdrT_none':''}`}).append(
                        $('<div/>',{class:'fs09 bold',text:texts.styling.select_button}),
                        $('<div/>',{class:'row alnC jstfyE w100p mT10 mB5'}).append(
                            $('<div/>',{class:`button_preview_color ${window.preview_buttons_style.color == '1' ? 'button_preview_color_selected':''}`,color:'1',style:`background-color:rgba(var(--color_1_3))`}),
                            $('<div/>',{class:`button_preview_color ${window.preview_buttons_style.color == '2' ? 'button_preview_color_selected':''}`,color:'2',style:`background-color:rgba(var(--color_2_3))`}),
                            $('<div/>',{class:`button_preview_color ${window.preview_buttons_style.color == '3' ? 'button_preview_color_selected':''}`,color:'3',style:`background-color:rgba(var(--color_3_3))`}),
                            $('<div/>',{class:`button_preview_color ${window.preview_buttons_style.color == '4' ? 'button_preview_color_selected':''}`,color:'4',style:`background-color:rgba(var(--color_4_3))`}),
                        ),
                        $('<div/>',{class:'row alnC jstfyE w100p'}).append(
                            $('<div/>',{class:`button_preview_border_radius ${window.preview_buttons_style.border_radius == '0px' ? 'button_preview_border_radius_selected':''} ico-border_radius_1`,border_radius:'0px'}),
                            $('<div/>',{class:`button_preview_border_radius ${window.preview_buttons_style.border_radius == '10px' ? 'button_preview_border_radius_selected':''} ico-border_radius_2`,border_radius:'10px'}),
                            $('<div/>',{class:`button_preview_border_radius ${window.preview_buttons_style.border_radius == '20px' ? 'button_preview_border_radius_selected':''} ico-border_radius_3`,border_radius:'20px'}),
                            $('<div/>',{class:'button_preview_border'}),
                            $('<div/>',{class:`button_preview_padding ${window.preview_buttons_style.padding_size == '5px 10px 5px 10px' ? 'button_preview_padding_selected':''}`,text:'XS',padding_size:'5px 10px 5px 10px'}),
                            $('<div/>',{class:`button_preview_padding ${window.preview_buttons_style.padding_size == '8px 12px 8px 12px' ? 'button_preview_padding_selected':''}`,text:'S',padding_size:'8px 12px 8px 12px'}),
                            $('<div/>',{class:`button_preview_padding ${window.preview_buttons_style.padding_size == '10px 15px 10px 15px' ? 'button_preview_padding_selected':''}`,text:'M',padding_size:'10px 15px 10px 15px'}),
                            $('<div/>',{class:`button_preview_padding ${window.preview_buttons_style.padding_size == '10px 25px 10px 25px' ? 'button_preview_padding_selected':''}`,text:'L',padding_size:'10px 25px 10px 25px'}),
                            $('<div/>',{class:`button_preview_padding ${window.preview_buttons_style.padding_size == '10px 30px 10px 30px' ? 'button_preview_padding_selected':''}`,text:'XL',padding_size:'20px 30px 20px 30px'}),

                        ),
                        $('<div/>',{class:'buttons_preview_container mT20 w100p'})
                    )
                ]
            }),
        )
        draw_buttons_preview_container();
        if(elem.accessibility.includes('can_disabled')){
            'disabled' in elem.attr ? set_dummy_switch_btn($('.editor_btn_set_disabled'),'1')
            :set_dummy_switch_btn($('.editor_btn_set_disabled'),'0'); 
        }

        setTimeout(()=>{
            $('.editor_popup_title2').text('')
            $(`.editor_popup_body_shortcut.editor_button`).addClass('editor_popup_body_shortcut_selected')
        });
    });
}
$('body').on('change','.editor_btn_set_disabled',function(){
    let elem = get_element_data(window.selected);
    let val = get_dummy_val($(this))
    if(val == '1'){
        elem.attr.disabled = 'true';
    }else if(val == '0'){
        delete elem.attr.disabled;
    }
    new_action(window.selected)
})
$('body').on('click','.editor_button',function(e){
    draw_editor_popup_button();
})
//
draw_buttons_preview_container =function(){
    let buttons = get_buttons();
    $('.buttons_preview_container').text('')
    for(const key in buttons){
        let _button = buttons[key];
        let button = elem_button();
        button.class_selector = `button_preview_${key}`;
        for(const _key in _button.css){
            button.css[_key] = _button.css[_key];
        }
        for(const _key in _button.css_hover){
            button.css_hover[_key] = _button.css_hover[_key];
        }
        for(const _key in _button.css_click){
            button.css_click[_key] = _button.css_click[_key];
        }
        for(const _key in _button.css_disabled){
            button.css_disabled[_key] = _button.css_disabled[_key];
        }
        if('background' in _button){
            button.background = get_default_style('background');
            for(const _key in _button.background){
                button.background[_key] = _button.background[_key];
            }
        }
        if('background_hover' in _button){
            button.background_hover = get_default_style('background');
            for(const _key in _button.background_hover){
                button.background_hover[_key] = _button.background_hover[_key];
            }
        }
        if('background_click' in _button){
            button.background_click = get_default_style('background');
            for(const _key in _button.background_click){
                button.background_click[_key] = _button.background_click[_key];
            }
        }
        generate_elem_style(button);
        $('.buttons_preview_container').append(
            $('<button/>',{
                class:`button_preview button_preview_${key}`, 
                button_key:key,
                text:texts.elems.button_placholder,
            })
        )
    }
}
$('body').on('click','.button_preview_color',function(e){
    $('.button_preview_color').removeClass('button_preview_color_selected');
    $(this).addClass('button_preview_color_selected');
    window.preview_buttons_style.color = $(this).attr('color')
    draw_buttons_preview_container();
})
$('body').on('click','.button_preview_border_radius',function(e){
    $('.button_preview_border_radius').removeClass('button_preview_border_radius_selected');
    $(this).addClass('button_preview_border_radius_selected');
    window.preview_buttons_style.border_radius = $(this).attr('border_radius')
    draw_buttons_preview_container();
})
$('body').on('click','.button_preview_padding',function(e){
    $('.button_preview_padding').removeClass('button_preview_padding_selected');
    $(this).addClass('button_preview_padding_selected');
    window.preview_buttons_style.padding_size = $(this).attr('padding_size')
    draw_buttons_preview_container();
})
$('body').on('click','.button_preview',function(){
    let button_style = get_buttons($(this).attr('button_key'));
    let elem = get_element_data(window.selected);
    let button_default = elem_button();
    elem.css = button_default.css;
    elem.css_mobile = button_default.css_mobile;
    elem.css_hover = button_default.css_hover;
    elem.css_hover_mobile = button_default.css_hover_mobile;
    elem.css_click = button_default.css_click;
    elem.css_click_mobile = button_default.css_click_mobile;
    elem.css_disabled = button_default.css_disabled;
    elem.css_disabled_mobile = button_default.css_disabled_mobile;

    delete elem.background;
    delete elem.background_mobile;
    delete elem.background_hover;
    delete elem.background_hover_mobile;
    delete elem.background_click;
    delete elem.background_click_mobile;
    delete elem.background_disabled;
    delete elem.background_disabled_mobile;


    for(const key in button_style.css){
        elem.css[key] = button_style.css[key];
        elem.css_mobile[key] = button_style.css[key];
    }
    for(const key in button_style.css_hover){
        elem.css_hover[key] = button_style.css_hover[key];
        elem.css_hover_mobile[key] = button_style.css_hover[key];
    }
    for(const key in button_style.css_click){
        elem.css_click[key] = button_style.css_click[key];
        elem.css_click_mobile[key] = button_style.css_click[key];
    }
    for(const key in button_style.css_disabled){
        elem.css_disabled[key] = button_style.css_disabled[key]
        elem.css_disabled_mobile[key] = button_style.css_disabled[key]
    }

    if('background' in button_style){
        elem.background = JSON.parse(JSON.stringify(button_style.background));
        elem.background_mobile = JSON.parse(JSON.stringify(button_style.background));
    }
    if('background_hover' in button_style){
        elem.background_hover = JSON.parse(JSON.stringify(button_style.background_hover));
        elem.background_hover_mobile = JSON.parse(JSON.stringify(button_style.background_hover));
    }
    if('background_click' in button_style){
        elem.background_click = JSON.parse(JSON.stringify(button_style.background_click));
        elem.background_click_mobile = JSON.parse(JSON.stringify(button_style.background_click));
    }
    if('background_disabled' in button_style){
        elem.background_disabled = JSON.parse(JSON.stringify(button_style.background_disabled));
        elem.background_disabled_mobile = JSON.parse(JSON.stringify(button_style.background_disabled));
    }
    new_action(window.selected);

})