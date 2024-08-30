draw_editor_popup_section_driver = function(){
    if(!accessibility_check(window.selected,'section_driver')){return;}
    show_editor_popup('editor',function(){
        let section = get_element_data(window.selected);
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:false,
                editors:[
                    $('<div/>',{class:'editor_popup_container w100p',key:'section_driver'}).append(
                        draw_editor_show_container({
                            key:'section_driver_settings',
                            name:texts.styling.driver_settings,
                            row_class:true,
                            container_class:'editor_popup_brdrT_none'
                        }),
                        draw_editor_show_container({
                            key:'section_driver_height',
                            name:texts.styling.driver_height,
                            row_class:true,
                        }),
                        $('<div/>',{class:'editor_popup_col'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.driver_style}),
                            $('<div/>',{class:'editor_popup_section_drivers_preview row wrap alnC jstfyC w100p mT20'})
                        )
                    ),
                    $('<div/>',{class:'editor_popup_container w100p none',key:'section_driver_settings',parent_key:'section_driver'}).append(
                        $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.driver_position}),
                            draw_select_box({
                                key_tree:`${window.selected}`,
                                variable_key:'driver',
                                key:'position',
                                selections:[
                                    {text:texts.styling.top,key:'top'},
                                    {text:texts.styling.bottom,key:'bottom'},
                                ],
                            })
                        ),
                        $('<div/>',{class:'editor_popup_row'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.flip}),
                            draw_switch_btn({
                                key_tree:`${window.selected}`,
                                variable_key:'driver',
                                key:'flip'
                            }),
                        ),
                        $('<div/>',{class:`editor_popup_row `}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.driver_color}),
                            $('<div/>',{class:'row alnC jstfyE editor_popup_section_driver_colors'})
                        ),
                    ),
                    $('<div/>',{class:'editor_popup_container w100p none',key:'section_driver_height',parent_key:'section_driver'}).append(
                        draw_editors_container({
                            is_responsive:true,
                            editors:[
                                $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
                                    $('<div/>',{class:'fs09',text:texts.styling.driver_height}),
                                    draw_number_picker({
                                        key_tree:`${window.selected}.driver`,
                                        variable_key:'css',
                                        key:'height',
                                        step:10,
                                        units:['px'],
                                    }),
                                )
                            ]
                        }),
                    ),
                ]
            }),
        )


        for(const key in section.driver.paths){
            $('.editor_popup_section_driver_colors').append(
                $('<div/>',{class:'mX5'}).append(
                    draw_color_picker({
                        key_tree:`${window.selected}.driver.paths`,
                        variable_key:key,
                        key:'color',
                    })
                )
            )
        }
        $('.editor_popup_section_drivers_preview').append(
            $('<div/>',{class:`${section.has_driver == '0' ? 'section_driver_preview_selected' : ''} section_driver_preview_none row alnC jstfyC`}).append(
                $('<div/>',{class:'ma fs09',text:texts.styling.none})
            )
        )
        for(const key in window.drivers){
            let is_selected = true;
            for(const key2 in window.drivers[key].paths){
                if(key2 in section.driver.paths){
                    if(section.driver.paths[key2].path != window.drivers[key].paths[key2].path){
                        is_selected = false;
                    }
                }else{
                    is_selected = false;
                }

            }
            let attrs = '';let style = '';
            for(const key2 in window.drivers[key].svg_attr){
                attrs = `${attrs} ${key2}="${window.drivers[key].svg_attr[key2]}"`;
            }
            for(const key2 in window.drivers[key].svg_style){
                style = `${style} ${key2}:${window.drivers[key].svg_style[key2]};`;
            }
            let paths = '';
            for(const key2 in window.drivers[key].paths){
                paths = `${paths}<path fill="${window.drivers[key].paths[key2].color}" d="${window.drivers[key].paths[key2].path}"></path>`
            }
            $('.editor_popup_section_drivers_preview').append(
                $('<div/>',{class:`${is_selected ? 'section_driver_preview_selected' : ''} section_driver_preview`,key:key}).append(
                    `<svg ${attrs} style="${style};height:15px;transform:rotateZ(180deg);bottom:10px;">${paths}</svg>`,
                    $('<div/>',{class:'section_driver_preview_block'})
                )
            )
        }
        ///
        setTimeout(()=>{
            $('.editor_popup_title2').text(texts.styling.section_driver)
            $(`.editor_popup_body_shortcut.editor_section_driver`).addClass('editor_popup_body_shortcut_selected')
        });
    });
}
$('body').on('click','.editor_section_driver',function(e){
    draw_editor_popup_section_driver();
})
$('body').on('click','.section_driver_preview',function(e){
    let section = get_element_data(window.selected);
    section.has_driver = '1';
    section.driver.paths = [];
    section.driver.svg_style = JSON.parse(JSON.stringify(window.drivers[$(this).attr('key')].svg_style));
    section.driver.svg_attr = JSON.parse(JSON.stringify(window.drivers[$(this).attr('key')].svg_attr));
    for(const key in window.drivers[$(this).attr('key')].paths){
        section.driver.paths.push({
            path:window.drivers[$(this).attr('key')].paths[key].path,
            color:window.drivers[$(this).attr('key')].paths[key].color.replaceAll('255,255,255','var(--color_4_7)'),
        })
    }
    $('.editor_popup_section_driver_colors').text('')
    for(const key in section.driver.paths){
        $('.editor_popup_section_driver_colors').append(
            $('<div/>',{class:'mX5'}).append(
                draw_color_picker({
                    key_tree:`${window.selected}.driver.paths`,
                    variable_key:key,
                    key:'color',
                })
            )
        )
    }
    new_action('','page');
    $('.section_driver_preview').removeClass('section_driver_preview_selected');
    $('.section_driver_preview_none').removeClass('section_driver_preview_selected');
    $(this).addClass('section_driver_preview_selected')
})
$('body').on('click','.section_driver_preview_none',function(e){
    let section = get_element_data(window.selected);
    section.driver.paths = [];
    $('.editor_popup_section_driver_colors').text('')
    section.has_driver = '0';
    new_action('','page');
    $('.section_driver_preview').removeClass('section_driver_preview_selected');
    $(this).addClass('section_driver_preview_selected')
})