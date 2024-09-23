draw_editor_popup_website_form = function(){
    if(!accessibility_check(window.selected,'website_form')){return;}
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:true,
                editors:[
                    draw_editors_container({
                        is_responsive:false,
                        editors:[
                            $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
                                $('<div/>',{class:'fs09',text:texts.website_style.preview_form}),
                                draw_input_list({
                                    default_text:texts.website_style.select_preview_form,
                                    dummy:true,
                                    dummy_class:'change_preview_form_inputlist',
                                    selections:[
                                        {name:texts.website_pages.login,val:'login'},
                                        {name:texts.website_pages.signup,val:'signup'},
                                        {name:texts.website_pages.reset_password_1,val:'reset_password_1'}
                                    ]
                                })
                            ),
                        ]
                    }),
                    $('<div/>',{class:'editor_popup_col'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.align_elems}),
                        draw_select_box({
                            key_tree:'form_elements.website_form',
                            variable_key:'css',
                            key:'align-items',
                            selections:[
                                {class:'ico-position_left',key:'flex-start'},
                                {class:'ico-position_hcenter',key:'center'},
                                {class:'ico-position_right',key:'flex-end'},
                                {class:'ico-position_hstretch',key:'stretch'},
                            ]
                        })
                    ),
                    $('<div/>',{class:'editor_popup_col'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.gap_between_elems}),
                        draw_number_picker({
                            key_tree:'form_elements.website_form',
                            variable_key:'css',
                            key:'gap',
                            units:['px'],
                            step:1,
                        })
                    ),
                    $('<div/>',{class:'editor_popup_col'}).append(
                        $('<div/>',{class:'fs09',text:texts.website_style.form_elements}),
                        $('<div/>',{class:'row alnC jstfyC wrap w100p'}).append(
                            $('<div/>',{class:'editor_popup_form_elements editor_text_style select',key_tree:'form_elements.form_title'}).append(
                                $('<div/>',{class:'ico-title'}),
                                $('<div/>',{text:texts.website_style.form_title})
                            ),
                            $('<div/>',{class:'editor_popup_form_elements editor_text_style select',key_tree:'form_elements.form_message'}).append(
                                $('<div/>',{class:'ico-title'}),
                                $('<div/>',{text:texts.website_style.form_message})
                            ),
                            $('<div/>',{class:'editor_popup_form_elements editor_input_box select',key_tree:'form_elements.form_input_box'}).append(
                                $('<div/>',{class:'ico-rename'}),
                                $('<div/>',{text:texts.website_style.form_input_box})
                            ),
                            $('<div/>',{class:'editor_popup_form_elements editor_button select',key_tree:'form_elements.form_button'}).append(
                                $('<div/>',{class:'ico-button'}),
                                $('<div/>',{text:texts.website_style.form_button})
                            ),
                            $('<div/>',{class:'editor_popup_form_elements editor_check_box select',key_tree:'form_elements.form_check_box'}).append(
                                $('<div/>',{class:'ico-check_box'}),
                                $('<div/>',{text:texts.website_style.form_input_box})
                            ),
                            $('<div/>',{class:'editor_popup_form_elements editor_loading_spinner select',key_tree:'form_elements.form_loading_spinner'}).append(
                                $('<div/>',{class:'ico-loading_spinner'}),
                                $('<div/>',{text:texts.website_style.form_loading_spinner})
                            ),
                        )
                    )
                ]
            })
        )
        setTimeout(()=>{
            set_dummy_val($('.change_preview_form_inputlist'),window.selected_website_form)
            $('.editor_popup_title2').text(texts.website_style.website_form)
            $(`.editor_popup_body_shortcut.editor_website_form`).addClass('editor_popup_body_shortcut_selected')
        });
    });
}
$('body').on('click','.editor_website_form',function(e){
    draw_editor_popup_website_form();
})
$('body').on('change','.change_preview_form_inputlist',function(){
    let val = get_dummy_val($(this));
    window.selected_website_form = val;
    open_website_popup(val)
})
