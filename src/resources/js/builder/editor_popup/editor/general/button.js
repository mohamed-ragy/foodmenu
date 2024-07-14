draw_editor_popup_button = function(){
    show_editor_popup('editor',function(){
        let buttons_preview_container;
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:false,
                editors:[
                    $('<div/>',{class:'editor_popup_container w100p',key:'editor_button'}).append(
                        $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.button_function}),
                            draw_button_function_editor({
                                key_tree:`${window.selected}.attr`,
                                variable_key:null,
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
                            buttons_preview_container = $('<div/>',{class:'w100p column alnC jstfyC'})
                        )
                    ),
                    $('<div/>',{class:'editor_popup_container w100p none',key:'editor_button_customize',parent_key:'editor_button'}).append(
                        // $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
                        //     $('<div/>',{class:'fs09',text:texts.styling.button_function}),
                        //     draw_button_function_editor({
                        //         key_tree:`${window.selected}.attr`,
                        //         variable_key:null,
                        //         key:'href'
                        //     })
                        // )
                    ),
                    
                ]
            }),
        )
        let buttons = get_buttons();
        for(const key in buttons){
            let button = buttons[key];
            let button_style_arr = home_elem_button().css;
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
            }
            for(const key in button.css_hover){
                button_style_hover = `${button_style_hover};${key}:${button.css_hover[key]}`
            }
            for(const key in button.css_click){
                button_style_click = `${button_style_click};${key}:${button.css_click[key]}`
            }
            buttons_preview_container.append(
                $('<a/>',{
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
        $(`.editor_popup_body_shortcut.editor_button`).addClass('editor_popup_body_shortcut_selected')
    });
}
$('body').on('click','.editor_button',function(e){
    draw_editor_popup_button();
})