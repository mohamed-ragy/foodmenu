draw_editor_popup_section_driver = function(){
    show_editor_popup('editor',function(){
        let section = get_key_tree(window.selected).elem;
        $('#editor').find('.editor_popup_body').text('').append(
            $('<div/>',{class:'editor_popup_container w100p',key:'home_section_editor'}).append(
                draw_editor_show_container({
                    key:'home_section_editor_driver_settings',
                    name:texts.styling.driver_settings,
                    row_class:true,
                    container_class:'editor_popup_row_border_bottom',
                }),
                $('<div/>',{class:'fs09 mX10 mY10',text:texts.styling.driver_style}),
                $('<div/>',{class:'home_section_editor_driver_styles row wrap alnC jstfyC w100p'})
            ),
            $('<div/>',{class:'editor_popup_container w100p none',key:'home_section_editor_driver_settings',parent_key:'home_section_editor'}).append(
                draw_select_box({
                    keys_arr:[{key:'position',key_tree:`${window.selected}.driver`}],
                    name:texts.styling.driver_position,
                    selections:[
                        {text:texts.styling.top,key:'top'},
                        {text:texts.styling.bottom,key:'bottom'},
                    ],
                }),
                draw_switch_btn({
                    keys_arr:[{key:'flip',key_tree:`${window.selected}.driver`}],
                    name:texts.styling.flip
                }),
                $('<div/>',{class:`editor_popup_row `}).append(
                    $('<div/>',{class:'fs09',text:texts.styling.driver_color}),
                    $('<div/>',{class:'row alnC jstfyE editor_popup_section_driver_colors'})
                ),
                draw_number_picker({
                    keys_arr:[{key:'height',key_tree:`${window.selected}.driver.css`}],
                    name:texts.styling.driver_height,
                    step:10,
                    units:['px'],
                    is_responsive:true
                }),
            ),
        )
        for(const key in section.driver.paths){
            $('.editor_popup_section_driver_colors').append(
                draw_color_picker({
                    keys_arr:[{key_tree:`${window.selected}.driver.paths.${key}`,key:'color'}],
                    name:null
                })
            )
        }
        $('.home_section_editor_driver_styles').append(
            $('<div/>',{class:`${section.has_driver == '0' ? 'section_driver_preview_selected' : ''} section_driver_preview_none section_driver_preview_none row alnC jstfyC`}).append(
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
            $('.home_section_editor_driver_styles').append(
                $('<div/>',{class:`${is_selected ? 'section_driver_preview_selected' : ''} section_driver_preview`,key:key}).append(
                    `<svg ${attrs} style="${style};height:15px;transform:rotateZ(180deg);bottom:10px;">${paths}</svg>`,
                    $('<div/>',{class:'section_driver_preview_block'})
                )
            )
        }
        $(`.editor_popup_body_shortcut.editor_section_driver`).addClass('editor_popup_body_shortcut_selected')
    });
}
$('body').on('click','.editor_section_driver',function(e){
    draw_editor_popup_section_driver();
})
$('body').on('click','.section_driver_preview',function(e){
    let section_data = get_key_tree(window.selected);
    let section = section_data.elem;
    section.has_driver = '1';
    section.driver.paths = [];
    section.driver.svg_style = JSON.parse(JSON.stringify(window.drivers[$(this).attr('key')].svg_style));
    section.driver.svg_attr = JSON.parse(JSON.stringify(window.drivers[$(this).attr('key')].svg_attr));
    for(const key in window.drivers[$(this).attr('key')].paths){
        section.driver.paths.push({
            path:window.drivers[$(this).attr('key')].paths[key].path,
            color:window.drivers[$(this).attr('key')].paths[key].color.replaceAll('100','255'),
        })
    }
    $('.editor_popup_section_driver_colors').text('')
    for(const key in section.driver.paths){
        $('.editor_popup_section_driver_colors').append(
            draw_color_picker({
                keys_arr:[{key_tree:`${window.selected}.driver.paths.${key}`,key:'color'}],
                name:null
            })
        )
    }
    new_action();
    $('.section_driver_preview').removeClass('section_driver_preview_selected');
    $('.section_driver_preview_none').removeClass('section_driver_preview_selected');
    $(this).addClass('section_driver_preview_selected')
})
$('body').on('click','.section_driver_preview_none',function(e){
    let section_data = get_key_tree(window.selected);
    let section = section_data.elem;
    section.driver.paths = [];
    $('.editor_popup_section_driver_colors').text('')
    section.has_driver = '0';
    new_action();
    $('.section_driver_preview').removeClass('section_driver_preview_selected');
    $(this).addClass('section_driver_preview_selected')
})