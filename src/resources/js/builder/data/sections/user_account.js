get_user_account_sections = function(key){
    let sections = {};
    let _key = 0;
    sections[_key] = get_sections_layouts(0,{
        // 'children.0.sort':'0',
        'children.0.css.flex-direction':'row',
        'children.0.css.align-items':'flex-start',
        'children.0.children':[
            elem_container({
                'name':'User profile menu',
                'accessibility':get_default_style('container_limited_accessibility'),
                'css.padding':'10px 0px 10px 0px',
                'css.align-items':'stretch',
                'children':[
                    elem_title({
                        'name':'User profile element',
                        'tag':null,
                        'general_class':'1',
                        'class_selector':'user_account_menu_elem',
                        'font_style':{},
                        'accessibility':[...get_default_style('text_limited_accessibility')
                            .filter(item => item !== 'arrange' && item !== 'elem_swap'),
                            'hover','click','selected','can_selected'],
                        'css.font-size':'1.1em',
                        'css.white-space':'nowrap',
                        'css.cursor':'pointer',
                        'css.padding':'5px 5px 5px 5px',
                        'css.margin':'0px 0px 0px 0px',
                        'css_selected.color':'rgba(var(--color_1_3),1)',
                    }),
                    {
                        'tag':'div',
                        'type':'elem',
                        'name':'User profile element',
                        'access_key_tree':'parent.children.0',
                        'general_class_selector':'user_account_menu_elem',
                        'text':{'key':'authentication.account_information'},
                        'attr':{'account_page':'account_information'},
                    },
                    {
                        'tag':'div',
                        'type':'elem',
                        // 'elem_type':'title',
                        'name':'User profile element',
                        '_name':'hidden',
                        'access_key_tree':'parent.children.0',
                        'general_class_selector':'user_account_menu_elem',
                        'text':{'key':'authentication.change_account_password'},
                        'attr':{'account_page':'change_account_password'}
                        
                    },
                    {
                        'tag':'div',
                        'type':'elem',
                        // 'elem_type':'title',
                        'name':'User profile element',
                        '_name':'hidden',
                        'access_key_tree':'parent.children.0',
                        'general_class_selector':'user_account_menu_elem',
                        'text':{'key':'authentication.my_orders'},
                        'attr':{'account_page':'my_orders'}
                    },
                    {
                        'tag':'div',
                        'type':'elem',
                        // 'elem_type':'title',
                        'name':'User profile element',
                        '_name':'hidden',
                        'access_key_tree':'parent.children.0',
                        'general_class_selector':'user_account_menu_elem',
                        'text':{'key':'authentication.my_addresses'},
                        'attr':{'account_page':'my_addresses'}
                        
                    },
                ]
            }),
            elem_container({
                'accessibility':get_default_style('container_limited_accessibility'),
                'css.width':'100%',
                'children':[
                    {
                        'type':'form_elements',
                        'name':'Account information form',
                        'access_key_tree':'form_elements.website_form',
                        'tag':'div',
                        'general_class_selector':'website_form',
                        'class':'account_page_content none',
                        'attr':{'account_page':'account_information'},
                        'children':[
                            {'general_html':'form_elements.form_loading_spinner'},
                            {
                                'type':'form_element',
                                'form_element':'form_title',
                                'access_key_tree':'form_elements.form_title',
                                'tag':'div',
                                'general_class_selector':'form_title',
                                'text':{'key':'authentication.account_information'}
                            },
                            {
                                'type':'form_element',
                                'form_element':'form_message',
                                'access_key_tree':'form_elements.form_message',
                                'tag':'div',
                                'general_class_selector':'form_message',
                            },
                            {
                                'general_html':'form_elements.form_input_box',
                                'replace':{
                                    'class':'account_information_name',
                                    'children.input_label.text.key':'authentication.name',
                                    'children.input_box.placeholder.key':'authentication.name',
                                    'children.input_box.attr.type':'text',
                                }
                            },
                            {
                                'general_html':'form_elements.form_input_box',
                                'replace':{
                                    '_name':'hidden',
                                    'class':'account_information_email',
                                    'children.input_label.text.key':'authentication.email',
                                    'children.input_box.placeholder.key':'authentication.email',
                                    'children.input_box.attr.type':'text',
                                }
                            },
                            {
                                'general_html':'form_elements.form_input_box',
                                'replace':{
                                    '_name':'hidden',
                                    'class':'account_information_phone_number',
                                    'children.input_label.text.key':'authentication.phone_number',
                                    'children.input_box.placeholder.key':'authentication.phone_number',
                                    'children.input_box.attr.type':'text',
                                }
                            },
                            {
                                'type':'form_element',
                                'form_element':'form_button',
                                'access_key_tree':'form_elements.form_button',
                                'tag':'button',
                                'general_class_selector':'form_button',
                                'text':{'key':'other.save'},
                                'class':'account_information_button'
                            }
                        ]
                    },
                    {
                        'type':'form_elements',
                        'name':'Change account password form',
                        'access_key_tree':'form_elements.website_form',
                        'tag':'div',
                        'general_class_selector':'website_form',
                        'class':'account_page_content none',
                        'attr':{'account_page':'change_account_password'},
                        'children':[
                            {'general_html':'form_elements.form_loading_spinner'},
                            {
                                'type':'form_element',
                                'form_element':'form_title',
                                'access_key_tree':'form_elements.form_title',
                                'tag':'div',
                                'general_class_selector':'form_title',
                                'text':{'key':'authentication.change_account_password'}
                            },
                            {
                                'type':'form_element',
                                'form_element':'form_message',
                                'access_key_tree':'form_elements.form_message',
                                'tag':'div',
                                'general_class_selector':'form_message',
                            },
                            {
                                'general_html':'form_elements.form_input_box',
                                'replace':{
                                    'class':'change_account_password_current_password',
                                    'children.input_label.text.key':'authentication.current_password',
                                    'children.input_box.placeholder.key':'authentication.current_password',
                                    'children.input_box.attr.type':'password',
                                }
                            },
                            {
                                'general_html':'form_elements.form_input_box',
                                'replace':{
                                    '_name':'hidden',
                                    'class':'change_account_password_new_password',
                                    'children.input_label.text.key':'authentication.new_password',
                                    'children.input_box.placeholder.key':'authentication.new_password',
                                    'children.input_box.attr.type':'password',
                                }
                            },
                            {
                                'general_html':'form_elements.form_input_box',
                                'replace':{
                                    '_name':'hidden',
                                    'class':'change_account_password_new_password_confirm',
                                    'children.input_label.text.key':'authentication.new_password_confirm',
                                    'children.input_box.placeholder.key':'authentication.new_password_confirm',
                                    'children.input_box.attr.type':'password',
                                }
                            },
                            {
                                'type':'form_element',
                                'form_element':'form_button',
                                'access_key_tree':'form_elements.form_button',
                                'tag':'button',
                                'general_class_selector':'form_button',
                                'text':{'key':'other.save'},
                                'class':'change_account_password_button'
                            }
                        ]
                    }
                ]
            })
        ]
    });
    console.log(sections[_key])

    return sections
}
