require('./generate_html/generate_style.js')
require('./generate_html/events.js')


generate_html = function(elem,key_tree){
    let html = '';
    let style = generate_style(elem);

    let text ='';
    if('text' in elem){
        if('val' in elem.text){
            text = elem.text.val[window.preview_language]
        }else{
            let text_key = elem.text.key.split('.')
            text =  window.website_texts.text[text_key[0]][text_key[1]]
        }
    }
    let elem_html = '';
    if('html' in elem){
        elem_html = elem['html'];
    }
    let classes = '';
    if('class_selector' in elem){
        if(elem.class_selector == 'header_icon_cart_num'){
            text = `${text}0`
        }
        classes = `${classes} ${elem.class_selector}`
    }

    if('class' in elem && elem.class != null){
        classes = `${classes} ${elem.class}`
    }

    let attrs = ''
    if('attr' in elem){
        for(const key in elem['attr']){
            attrs = `${attrs} ${key}="${elem['attr'][key]}"`
        }
    }
    if('animation' in elem){
        if(elem.animation.name != 'no_animation'){
            attrs = `${attrs} animation="${elem.animation.name}" `
        }
    }
    if('animation_mobile' in elem){
        if(elem.animation_mobile.name != 'no_animation'){
            attrs = `${attrs} animation_mobile="${elem.animation_mobile.name}" `
        }
    }
    //
    if(elem.type == 'home_elem'){
        attrs = `${attrs} elem="${elem.elem_type}"`
    }
    html = '';
    switch(elem.type){
        // case 'loading_spinner':
        //     html = $('<div/>',{key_tree:key_tree,type:elem.type,class:`loading_spinner_container ${classes}`,size:elem.size,style:style}).append(
        //         window.template.loading_spinner.elem.replace(':size:',elem.size)
        //     )
        // break;
        default:
            if(elem.type == 'home_elem'){
                html = `${html}<div class="home_elem" key_tree="${key_tree}" style="${$('.desktop_view').hasClass('mobile_view') ? style.mobile_container : style.desktop_container }" style_desktop="${style.desktop_container}" style_mobile="${style.mobile_container}">`;
                html = `${html}<div class="select_edit_elem_title builder_font contextMenu" key_tree="${key_tree}" contextMenu_type="home_elem"><div class="ico-see_more"></div><div>${texts.elems[elem.elem_type]}</div></div>`;
            }
            if(elem.type == 'home_section_block'){
                elem.children.sort((a,b)=>{
                    return a.sort - b.sort;
                })
                html = `${html}<div class="section_block" key_tree="${key_tree}" style="${$('.desktop_view').hasClass('mobile_view') ? style.mobile_container : style.desktop_container }" style_desktop="${style.desktop_container}" style_mobile="${style.mobile_container}">`;
                html = `${html}<div class="select_section_block_title builder_font contextMenu" key_tree="${key_tree}" contextMenu_type="home_section_block"><div class="ico-see_more"></div><div>${texts.section_block}</div></div>`;
            }

            html = `${html}<${elem.tag} class="${classes}" style="${$('.desktop_view').hasClass('mobile_view') ? style.mobile : style.desktop }" key_tree="${key_tree}" style_desktop="${style.desktop}" style_mobile="${style.mobile}" ${attrs}`;

            if('css_hover' in elem){
                html = `${html} hover_style="null"`
            }
            if('css_click' in elem){
                html = `${html} click_style="null"`
            }
            html = `${html}">${text}${elem_html}`

            if(elem.type == 'home_section'){
                if(elem.has_driver == '1'){
                    let driver_style = '';
                    let driver_style_desktop = `height:${elem.driver.css.height};${elem.driver.position == 'top' ? `top:0;transform:${elem.driver.flip == '1' ? 'rotateY(180deg)' : ''};` : elem.driver.position == 'bottom' ? `bottom:0;transform:rotateZ(180deg) ${elem.driver.flip == '1' ? 'rotateY(180deg)' : ''};` : ''}`
                    let driver_style_mobile = `height:${elem.driver.css_mobile.height};${elem.driver.position == 'top' ? `top:0;transform:${elem.driver.flip == '1' ? 'rotateY(180deg)' : ''};` : elem.driver.position == 'bottom' ? `bottom:0;transform:rotateZ(180deg) ${elem.driver.flip == '1' ? 'rotateY(180deg)' : ''};` : ''}`
                    for(const key in elem.driver.svg_style){
                        driver_style_desktop = `${driver_style_desktop} ${key}:${elem.driver.svg_style[key]};`
                        driver_style_mobile = `${driver_style_mobile} ${key}:${elem.driver.svg_style[key]};`
                    }
                    if($('.desktop_view').hasClass('mobile_view')){
                        driver_style = driver_style_mobile
                    }else{
                        driver_style = driver_style_desktop;
                    }
                    html = `${html}<svg style="${driver_style}" style_desktop="${driver_style_desktop}" style_mobile="${driver_style_mobile}" `;
                    for(const key in elem.driver.svg_attr){
                        html = `${html} ${key}="${elem.driver.svg_attr[key]}"`
                    }
                    html = `${html}">`;
                    for(const key in elem.driver.paths){
                        html = `${html}<path d="${elem.driver.paths[key].path}" fill="${elem.driver.paths[key].color}"></path>`;
                    }
                    html = `${html}</svg> `;
                }

                let section = get_elem_data(key_tree).elem;
                html = `${html}<div class="select_section_title builder_font"><div class="ico-align_center contextMenu" key_tree="${key_tree}" contextMenu_type="home_section"></div><div>${section.name}</div></div>`;
                html = `${html}<button class="btn btn-cancel add_home_section add_home_section_btn_style ico-add" section_sort="${elem.sort}" tooltip="${texts.add_section}"></button>`
            }
            // }


            for(const key in elem.children){
                html = `${html}${generate_html(elem.children[key],`${key_tree}.children.${key}`)}`;
            }
            html = `${html}</${elem.tag}>`;

            if(elem.type == 'home_elem' || elem.type == 'home_section_block'){
                html = `${html}</div>`;
            }
        break;
    }
    return html;
}


reset_class_selectors = function(elem){
    let _small_hash = small_hash();
    if('class_selector' in elem){
        elem.class_selector = elem.class_selector+_small_hash;
    }
    if('text' in elem){
        if('key' in elem.text){
            elem.text.key = elem.text.key+_small_hash;
        }
    }
    if('children' in elem){
        for(const key in elem.children){
            reset_class_selectors(elem.children[key])
        }
    }
}
