draw_editor_popup_button = function(){
    if(!accessibility_check(window.selected,'button')){return;}
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:false,
                editors:[
                    $('<div/>',{class:'editor_popup_container w100p',key:'editor_button'}).append(
                        $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.button_function}),
                            draw_button_function_editor({
                                key_tree:`${window.selected}`,
                                variable_key:'attr',
                                key:'href'
                            })
                        ),
                        draw_editor_show_container({
                            key:'editor_button_customize',
                            name:texts.styling.customize_button,
                            row_class:true,
                        }),
                        $('<div/>',{class:'editor_popup_col'}).append(
                            $('<div/>',{class:'fs09 bold',text:texts.styling.select_button}),
                            $('<div/>',{class:'w100p row alnC jstfyE mB20'}).append(
                                $('<div/>',{class:'button_preview_color button_preview_color_selected',color:'1',style:`background-color:rgba(var(--color_1_4))`}),
                                $('<div/>',{class:'button_preview_color',color:'2',style:`background-color:rgba(var(--color_2_4))`}),
                                $('<div/>',{class:'button_preview_color',color:'3',style:`background-color:rgba(var(--color_3_4))`}),
                                $('<div/>',{class:'button_preview_color',color:'4',style:`background-color:rgba(var(--color_4_4))`}),
                            ),
                            $('<div/>',{class:'buttons_preview_container w100p row wrap alnC jstfyC'})
                        )
                    ),
                    $('<div/>',{class:'editor_popup_container w100p none',key:'editor_button_customize',parent_key:'editor_button'}).append(
                        draw_editors_container({
                            is_responsive:true,
                            interactions:['hover','click','disabled'],
                            editors:[
                                $('<div/>',{class:'editor_popup_row editor_popup_brdrT_none'}).append(
                                    $('<div/>',{class:'fs09',text:texts.styling.font_color}),
                                    draw_color_picker({
                                        key_tree:window.selected,
                                        variable_key:'css',
                                        key:'color',
                                    }),
                                ),
                                $('<div/>',{class:'editor_popup_row editor_popup_brdrB'}).append(
                                    $('<div/>',{class:'fs09',text:texts.styling.bg_color}),
                                    draw_color_picker({
                                        key_tree:window.selected,
                                        variable_key:'css',
                                        key:'background-color',
                                    }),
                                ),
                                draw_border_editor({
                                    key_tree:window.selected,
                                    variable_key:'css',
                                })
                            ]
                        })
                    ),
                ]
            }),
        )
        draw_buttons_preview_container();
        setTimeout(()=>{
            $('.editor_popup_title2').text('')
            $(`.editor_popup_body_shortcut.editor_button`).addClass('editor_popup_body_shortcut_selected')
        });
    });
}
$('body').on('click','.editor_button',function(e){
    draw_editor_popup_button();
})
//
draw_buttons_preview_container =function(){
    let buttons = get_buttons($('.button_preview_color_selected').attr('color'));
    $('.buttons_preview_container').text('')
    for(const key in buttons){
        let button = buttons[key];
        let button_style_arr = elem_button().css;
        let button_style = '';
        let button_style_hover = '';
        let button_style_click = '';
        for(const key in button_style_arr){
            button_style = `${button_style};${key}:${button_style_arr[key]}`
            button_style_hover = `${button_style_hover};${key}:${button_style_arr[key]}`
            button_style_click = `${button_style_click};${key}:${button_style_arr[key]}`
        }
        
        for(const key in button.css){
            button_style = `${button_style};${key}:${button.css[key]}`
            if(typeof(button.css_hover[key]) === 'undefined'){
                button_style_hover = `${button_style_hover};${key}:${button.css[key]}`
            }
            if(typeof(button.css_click[key]) === 'undefined'){
                button_style_click = `${button_style_click};${key}:${button.css[key]}`
            }
        }
        for(const key in button.css_hover){
            button_style_hover = `${button_style_hover};${key}:${button.css_hover[key]}`
        }
        for(const key in button.css_click){
            button_style_click = `${button_style_click};${key}:${button.css_click[key]}`
        }
        $('.buttons_preview_container').append(
            $('<button/>',{
                class:'button_preview', 
                button_key:key,
                text:texts.elems.button_placholder,
                style:button_style,
                style_regular:button_style,
                style_hover:button_style_hover,
                style_click:button_style_click,
                onmouseenter:`$(this).attr('style',$(this).attr('style_hover'))`,
                onmouseleave:`$(this).attr('style',$(this).attr('style_regular'))`,
                onmousedown:`$(this).attr('style',$(this).attr('style_click'));`,
                onmouseup:`$(this).attr('style',$(this).attr('style_hover'));`,
            })
        )
    }
}
$('body').on('click','.button_preview_color',function(e){
    $('.button_preview_color').removeClass('button_preview_color_selected');
    $(this).addClass('button_preview_color_selected');
    draw_buttons_preview_container();
})
$('body').on('click','.button_preview',function(){
    let button_style = get_buttons($('.button_preview_color_selected').attr('color'),$(this).attr('button_key'));
    let elem = get_element_data(window.selected);
    let button_default = elem_button();
    elem.css = button_default.css;
    elem.css_mobile = button_default.css_mobile;
    elem.css_hover = button_default.css_hover;
    elem.css_hover_mobile = button_default.css_hover_mobile;
    elem.css_click = button_default.css_click;
    elem.css_click_mobile = button_default.css_click_mobile;
    elem.css_disabled = button_default.css_disabled;
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
    }
    new_action(window.selected);

})