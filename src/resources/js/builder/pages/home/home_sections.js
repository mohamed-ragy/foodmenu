show_edit_home_section = function(section_key){
    // hidePopupSelectors();
    select_home_section(section_key);

    let section = window.template.home[section_key];
    if(typeof(section) == 'undefined'){return;}
    $('#editor').find('.editor_popup_title').text(section.name)
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_head_btn').addClass('none');
        $('#editor').addClass('mnw450').find('.editor_popup_body').text('').append(
            $('<div/>',{class:'editor_popup_container',key:'home_section_editor'}).append(
                $('<div/>',{class:'row alnC jstfyE w100p mY20'}).append(
                    $('<button/>',{class:'btn btn-cancel editor_popup_show_container',text:texts.change_layout,key:'change_layout'}),
                ),
                $('<div/>',{class:'editor_popup_row'}).append(
                    $('<div/>',{text:texts.styling.name}),
                    $('<input>',{class:'input_editor_popup input_editor_popup_section_name builder_font',value:section.name,key_tree:`home.${section_key}`})
                ),
                draw_input_list({
                    keys_arr:[{key:'min-height',key_tree:`home.${section_key}.children.section_wrapper.css`}],
                    name:texts.styling.min_height,
                    selections:[
                        {name:'auto',val:'auto',class:''},
                        {name:'var(--screen_height)',val:'var(--screen_height)',class:''},
                        {name:'var(--screen_height_minus_header)',val:'var(--screen_height_minus_header)',class:''},
                        {name:'400px',val:'400px',class:''},
                        {name:'500px',val:'500px',class:''},
                        {name:'600px',val:'600px',class:''},
                        {name:'700px',val:'700px',class:''},
                        {name:'800px',val:'800px',class:''},
                        {name:'900px',val:'900px',class:''},
                        {name:'1000px',val:'1000px',class:''},
                    ],
                }),
                draw_select_box({
                    keys_arr:[{key:'max-width',key_tree:`home.${section_key}.children.section_wrapper.css`}],
                    name:texts.styling.max_width,
                    selections:[{text:texts.styling.max_content,key:'var(--page_max_width)'},{text:texts.styling.full_page,key:'100%'}],
                    selection_class:'pX10'
                }),
                draw_number_picker({
                    keys_arr:[{key:'margin-top',key_tree:`home.${section_key}.children.section_wrapper.css`}],
                    name:texts.styling.margin_top,
                    step:10,
                    unit:'px',
                    is_responsive:true
                }),
                draw_number_picker({
                    keys_arr:[{key:'margin-bottom',key_tree:`home.${section_key}.children.section_wrapper.css`}],
                    name:texts.styling.margin_bottom,
                    step:10,
                    unit:'px',
                    is_responsive:true
                }),
                draw_number_picker({
                    keys_arr:[{key:'grid-gap',key_tree:`home.${section_key}.children.section_wrapper.css`},{key2:'padding',key_tree2:`home.${section_key}.children.section_wrapper.css`}],
                    name:texts.styling.blocks_gap,
                    step:1,
                    unit:'px',
                    is_responsive:true
                }),

                $('<div/>',{class:`${window.selected_section != 0 ? 'none' : ''}`}).append(
                    draw_switch_btn({
                        keys_arr:[{key:'adapt_header',key_tree:`home.${section_key}`}],
                        name:texts.styling.adapt_header,
                        show_hide:'adapted_header_font_color_selector'
                    })
                ),
                draw_color_picker({
                    keys_arr:[{key_tree:`website_header`,key:'adapted_font_color'}],
                    name:texts.styling.adapted_font_color,
                    is_important:false,
                    container_class:'adapted_header_font_color_selector'
                }),
                draw_select_box({
                    keys_arr:[{key:'background',key_tree:`home.${section_key}`}],
                    name:texts.styling.background,
                    selections:[
                        {text:texts.styling.color_theme,key:'color_theme',show_elem:'home_section_editor_color_theme',hide_elem:'home_section_editor_background'},
                        {text:texts.styling.image,key:'image',show_elem:'home_section_editor_background',hide_elem:'home_section_editor_color_theme'},
                    ],
                    selection_class:'pX10'
                }),
                $('<div/>',{class:`home_section_editor_color_theme 100p ${section.background != 'color_theme' ? 'none' : ''}`}).append(
                    draw_color_theme_Picker({
                        keys_arr:[{key:'color_theme',key_tree:`home.${section_key}`}],
                        name:texts.styling.color_theme
                    }),
                ),
                draw_editor_show_container({
                    key:'home_section_background_image',
                    name:texts.styling.background_image,
                    container_class:`home_section_editor_background ${section.background != 'image' ? 'none' : ''}`,
                    row_class:true,
                }),
                draw_editor_show_container({
                    key:'home_section_editor_driver_style',
                    name:texts.styling.driver,
                    row_class:true,
                }),
            ),
            $('<div/>',{class:'editor_popup_container none',key:'change_layout',parent_key:'home_section_editor'}).append(
                $('<div/>',{class:'inter fs1 bold',text:texts.change_layout}),
                $('<div/>',{class:'row wrap alnS jstfyS mT20',id:'home_section_editor_settings_change_layout'})
            ),
            $('<div/>',{class:'editor_popup_container w100p none',key:'home_section_background_image',parent_key:'home_section_editor'}).append(
                draw_image_selector([{key:'background-image',key_tree:`home.${section_key}.background_image`}]),
                draw_select_box({
                    keys_arr:[{key:'background-size',key_tree:`home.${section_key}.background_image`}],
                    name:texts.styling.imageSize,
                    selections:[
                        {text:texts.styling.cover,key:'cover'},
                        {text:texts.styling.contain,key:'contain'},
                    ],
                    is_responsive:true,
                }),
                draw_select_box({
                    keys_arr:[{key:'background-attachment',key_tree:`home.${section_key}.background_image`}],
                    name:texts.styling.imageStyle,
                    selections:[
                        {text:texts.styling.fixed,key:'fixed'},
                        {text:texts.styling.local,key:'local'},
                    ],
                    is_responsive:true,
                }),
                draw_image_position_selector({keys_arr:[{key:'background-position',key_tree:`home.${section_key}.background_image`}],is_responsive:true}),
                draw_select_box({
                    keys_arr:[{key:'background-repeat',key_tree:`home.${section_key}.background_image`}],
                    name:texts.styling.imageRepeat,
                    selections:[
                        {text:texts.styling.repeat,key:'repeat'},
                        {text:texts.styling.no_repeat,key:'no-repeat'},
                    ],
                    is_responsive:true,
                }),
                draw_input_list({
                    keys_arr:[{key:'background-blend-mode',key_tree:`home.${section_key}.background_image`}],
                    name:texts.styling.imageBlendMode,
                    selections:window.inputList_arr.background_blend_mode
                }),
                draw_color_picker({
                    keys_arr:[{key_tree:`home.${section_key}.background_image`,key:'background-color'}],
                    name:texts.styling.background_color,
                }),
            ),
            $('<div/>',{class:'editor_popup_container w100p none',key:'home_section_editor_driver_style',parent_key:'home_section_editor'}).append(
                draw_select_box({
                    keys_arr:[{key:'position',key_tree:`home.${section_key}.driver.css`}],
                    name:texts.styling.driver_position,
                    selections:[
                        {text:texts.styling.top,key:'top'},
                        {text:texts.styling.bottom,key:'bottom'},
                    ],
                }),
                draw_switch_btn({
                    keys_arr:[{key:'flip',key_tree:`home.${section_key}.driver`}],
                    name:texts.styling.flip
                }),
                $('<div/>',{class:`editor_popup_row `}).append(
                    $('<div/>',{text:texts.styling.driver_color}),
                    $('<div/>',{class:'row alnC jstfyE editor_popup_section_driver_colors'})
                ),
                draw_number_picker({
                    keys_arr:[{key:'height',key_tree:`home.${section_key}.driver.css`}],
                    name:texts.styling.driver_height,
                    step:10,
                    unit:'px',
                    is_responsive:true
                }),

                $('<div/>',{class:'fs1 bold mB5 mT20',text:texts.styling.driver_style}),
                $('<div/>',{class:'home_section_editor_driver_styles row wrap alnC jstfyC w100p'})
            )

        )
    })
    let section_layouts = get_home_sections_layouts();
    for(const key in section_layouts){
        let layout = section_layouts[key]
        let section_wrapper = layout.section_wrapper;
        let thisLayoutContainer;
        $('#home_section_editor_settings_change_layout').append(
            $('<div/>',{class:'change_home_section_layout_elem',layout:layout.layout}).append(
                thisLayoutContainer = $('<div/>',{class:'section_layout_elem_S'})
            )
        )
        thisLayoutContainer.css({
            'grid-template-areas':layout.section_wrapper.css['grid-template-areas'],
            'grid-template-columns':layout.section_wrapper.css['grid-template-columns'],
        })
        let children_counter = 0;
        for(const key2 in section_wrapper.children){
            children_counter++;
            thisLayoutContainer.append(
                $('<div/>',{class:'',style:`grid-area:elem${children_counter};outline:1px solid var(--white-4);`})
            )
        }
    }
    for(const key in window.template.home[selected_section].driver.paths){
        $('.editor_popup_section_driver_colors').append(
            draw_color_picker({
                keys_arr:[{key_tree:`home.${section_key}.driver.paths.${key}`,key:'color'}],
                name:null
            })
        )
    }
    $('.home_section_editor_driver_styles').append(
        $('<div/>',{class:'section_driver_preview_none section_driver_preview_none row alnC jstfyC'}).append(
            $('<div/>',{class:'ma fs09',text:texts.styling.none})
        )
    )
    for(const key in window.drivers){

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
        $('.home_section_editor_driver_styles').append(
            $('<div/>',{class:'section_driver_preview',key:key}).append(
                `<svg ${attrs} style="${style};height:20px;transform:rotateZ(180deg);bottom:30px;">${paths}</svg>`,
                $('<div/>',{class:'section_driver_preview_block'})
            )
        )
    }
    set_view_style();
}
select_home_section = function(section_key){
    deselect_all();
    hide_editor_popup('editor')
    window.selected_section = section_key;
    $(`section[key_tree="home.${section_key}"]`).addClass('section_selected')
}

//events
$('body').on('click','.section_driver_preview',function(e){
    // e.stopImmediatePropagation();
    window.template.home[window.selected_section].has_driver = '1';
    window.template.home[window.selected_section].driver.paths = [];
    window.template.home[window.selected_section].driver.svg_style = JSON.parse(JSON.stringify(window.drivers[$(this).attr('key')].svg_style));
    window.template.home[window.selected_section].driver.svg_attr = JSON.parse(JSON.stringify(window.drivers[$(this).attr('key')].svg_attr));
    for(const key in window.drivers[$(this).attr('key')].paths){
        window.template.home[window.selected_section].driver.paths.push({
            path:window.drivers[$(this).attr('key')].paths[key].path,
            color:window.drivers[$(this).attr('key')].paths[key].color.replaceAll('100','255'),
        })
    }
    $('.editor_popup_section_driver_colors').text('')
    for(const key in window.template.home[window.selected_section].driver.paths){
        $('.editor_popup_section_driver_colors').append(
            draw_color_picker({
                keys_arr:[{key_tree:`home.${window.selected_section}.driver.paths.${key}`,key:'color'}],
                name:null
            })
        )
    }

    new_action();
})
$('body').on('click','.section_driver_preview_none',function(e){
    // e.stopImmediatePropagation();
    window.template.home[window.selected_section].driver.paths = [];
    $('.editor_popup_section_driver_colors').text('')
    window.template.home[window.selected_section].has_driver = '0';
    editor_popup_to_parent($('.editor_popup_container[key="home_section_editor"]'))
    new_action();
})
//
$('body').on('click','.change_home_section_layout_elem',function(e){
    // e.stopImmediatePropagation();
    let section_layouts = get_home_sections_layouts();
    let layout = JSON.parse(JSON.stringify(section_layouts.find(item=>item.layout == $(this).attr('layout')).section_wrapper));
    window.template.home[window.selected_section].children.section_wrapper = layout
    new_action();
    editor_popup_to_parent($('.editor_popup_container[key="home_section_editor"]'))
})
///
$('body').on('mouseup touchend','section',function(e){
    // e.stopImmediatePropagation();
    if($('.section_btns_container:hover').length > 0){return;}
    if($('.section_block:hover').length > 0){return}
    if($('.section_btns_container:hover').length != 0){return}
    if(window.selected_page == 'home'){
        select_home_section(get_key_tree($(this).attr("key_tree")).elem_key)
    }
})
$('body').on('click','.edit_home_section_btn',function(e){
    // e.stopImmediatePropagation();
    show_edit_home_section($(this).attr('section'))
})
///
$('body').on('input change','.input_editor_popup_section_name',function(e){
    // e.stopImmediatePropagation();
    get_key_tree($(this).attr('key_tree')).elem.name = $(this).val();
    new_action();
    $('#editor').find('.editor_popup_title').text($(this).val())
})

///
$('body').on('click','.delete_home_section_btn',function(e){
    // e.stopImmediatePropagation();
    let selected_section = window.selected_section;
    if(window.selected_section == $(this).attr('section')){
        selected_section = null;
    }
    window.template.home.splice($(this).attr('section'),1)
    for(const key in window.template.home){
        if(selected_section == window.template.home[key].sort ){
            selected_section = key;
        }
        window.template.home[key].sort = parseInt(key);

    }
    hide_editor_popup('editor')
    deselect_all();
    new_action();

    if(selected_section != null){
        show_edit_home_section(selected_section)
    }

})
//
$('body').on('click','.swap_home_section_down_btn',function(e){
    // e.stopImmediatePropagation();
    let from_sort =  parseInt(window.template.home[$(this).attr('section')].sort);
    let to_sort =  parseInt(window.template.home[$(this).attr('section')].sort) + 1;
    $(`section[key_tree="home.${from_sort}"]`).css({
        'transform':`translateY(${$(`section[key_tree="home.${to_sort}"]`).height()}px)`,
    })
    $(`section[key_tree="home.${to_sort}"]`).css({
        'transform':`translateY(-${$(`section[key_tree="home.${from_sort}"]`).height()}px)`,
    })
    setTimeout(()=>{
        for(const key in window.template.home){
            if(window.template.home[key].sort == to_sort){
                window.template.home[key].sort = from_sort;
            }
        }
        window.template.home[$(this).attr('section')].sort = to_sort;
        hide_editor_popup('editor')
        deselect_all();
        new_action();
        show_edit_home_section(to_sort)
        $('#website').animate({scrollTop:$(`section[key_tree="home.${to_sort}"]`).position().top},500)
    },200)

})
$('body').on('click','.swap_home_section_up_btn',function(e){
    // e.stopImmediatePropagation();
    let from_sort =  parseInt(window.template.home[$(this).attr('section')].sort);
    let to_sort =  parseInt(window.template.home[$(this).attr('section')].sort) - 1;
    $(`section[key_tree="home.${from_sort}"]`).css({
        'transform':`translateY(-${$(`section[key_tree="home.${to_sort}"]`).height()}px)`,
    })
    $(`section[key_tree="home.${to_sort}"]`).css({
        'transform':`translateY(${$(`section[key_tree="home.${from_sort}"]`).height()}px)`,
    })
    setTimeout(()=>{
        for(const key in window.template.home){
            if(window.template.home[key].sort == to_sort){
                window.template.home[key].sort = from_sort;
            }
        }
        window.template.home[$(this).attr('section')].sort = to_sort;
        hide_editor_popup('editor')
        deselect_all();
        new_action();
        show_edit_home_section(to_sort)
        $('#website').animate({scrollTop:$(`section[key_tree="home.${to_sort}"]`).position().top},500)
    },200)
})
$('body').on('click','.dublicate_home_section_btn',function(e){
    // e.stopImmediatePropagation();
    let new_section = JSON.parse(JSON.stringify(window.template.home[$(this).attr('section')]));
    $(`section[key_tree="home.${$(this).attr('section')}"]`).css({
        'margin-bottom': `${ $(`section[key_tree="home.${$(this).attr('section')}"]`).height()}px`
    })
    setTimeout(()=>{
        for(const key in window.template.home){
            if(window.template.home[key].sort > new_section.sort ){
                window.template.home[key].sort = parseInt(window.template.home[key].sort) + 1
            }
        }
        new_section.sort = parseInt(new_section.sort) + 1
        new_section.name = texts.copy_untitled_section.replace(':name:',new_section.name)
         reset_section_class_selectors(new_section)
        window.template.home.push((new_section));
        window.template.home.sort((a,b)=>{
            return a.sort - b.sort;
        })

        new_action();
        $('#website').animate({scrollTop:$(`section[key_tree="home.${parseInt($(this).attr('section')) + 1}"]`).position().top - 50},300)
        show_edit_home_section(parseInt($(this).attr('section')) + 1)

    },200)

});
reset_section_class_selectors = function(elem){
    if('class_selector' in elem){
        elem.class_selector = elem.class_selector+small_hash();
    }
    if('children' in elem){
        for(const key in elem.children){
            reset_section_class_selectors(elem.children[key])
        }
    }
}
//
set_adapted_header = function(){
    if(typeof(window.template.home[0]) === 'undefined'){return;}
    if(window.template.home[0].adapt_header == '1' && $('#website').scrollTop() == 0){
        $('.website_header').addClass('adapted_header')
    }else{
        $('.website_header').removeClass('adapted_header')

    }
}

////
$('body').on('click','.elem_text_selector_editor a',function(e){
    e.stopImmediatePropagation();
})
$('body').on('click','.scroll_to_section',function(e){
    // e.stopImmediatePropagation();
    e.preventDefault();
    $('#website').animate({
        scrollTop:$(`.${$(this).attr('section')}`).position().top,
    },500)
})
