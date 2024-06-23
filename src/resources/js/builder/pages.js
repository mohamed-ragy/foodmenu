
set_page = function(page){
    $('.showWebsitePages').find('.website_page_name').text(texts.website_pages[page])
    switch (page) {
        case 'home':
            page_transition(page);
        break;

        default:
            break;
    }
}
page_transition = function(page){
    $('#page').removeClass(`${window.template.page_setup.pageTransition}_in`)
    $('#page').addClass(`${window.template.page_setup.pageTransition}_out`)
    // $('#website').css('overflow-x','hidden');
    preview_page_transition_in_timeout = setTimeout(()=>{
        draw_page(page)
        $('#page').removeClass(`${window.template.page_setup.pageTransition}_out`).addClass(`${window.template.page_setup.pageTransition}_in`)
        scroll_elem_animation('top');
        preview_page_transition_out_timeout = setTimeout(()=>{
            $('#page').removeClass(`${window.template.page_setup.pageTransition}_in`)
            // $('#website').css('overflow-x','');
            set_adapted_header();
        },window.template.page_setup.transitionDuration.replace('ms',''))
    },window.template.page_setup.transitionDuration.replace('ms',''))
}
draw_page = function(page){
    let website_scrolltop = $('#website').scrollTop();
    $('#page').text('')
    window.selected_page = page;
    switch(page){
        case 'home':
            window.template.home.sort((a,b)=>{
                return parseInt(a.sort) - parseInt(b.sort);
            })
            if(window.template.home.length == 0){
                $('#page').append(
                    $('<div/>',{class:'add_first_section_btn_container add_home_section',section_sort:'-1'}).append(
                        $('<div/>',{class:'add_first_section_btn ico-add'}),
                        $('<div/>',{text:texts.add_section,class:'builder_font mT10'})
                    )
                )
            }
            for(const key in window.template.home){
                $('#page').append(
                    create_html(window.template.home[key],`home.${key}`),
                )
            }
            // try{
            select(window.selected);
            // }catch{}
            // $(`section[key_tree="home.${window.selected_section}"]`).addClass('section_selected');
            // $(`.section_block[key_tree="${window.selected_section_block}"]`).addClass('section_block_selected')
            // $(`.home_elem[key_tree="${window.selected_elem}"]`).addClass('edit_home_elem_selected')
        break;
    }
    $('#website').scrollTop(website_scrolltop);

}
create_html = function(elem,key_tree){
    let html = '';
    //
    //styling
    let style_desktop_obj = {};
    let style_mobile_obj = {};
    let style_hover_desktop_obj = {};
    let style_hover_mobile_obj = {};
    for(let key in elem.css){
        let val = elem.css[key];
        if(val == '100vh'){val = 'calc(100vh - 40px)'}
        if(elem.name == 'popup_container'){
            if(val == 'fixed' && key == 'position'){
                val = 'absolute'
            }if(key == 'display'){
                val = 'none';
            }
        }
        if('animation' in elem){
            if(elem.animation.name != 'no_animation' || elem.animation_mobile.name != 'no_animation'){
                if(key == 'transform'){
                    val = 'unset'
                }
                if(key == 'filter'){
                    val = 'unset'
                }
            }
        }
        style_desktop_obj[key] = val;
    }

    if('background' in elem){
        if(elem.background.type == 'none'){
            style_desktop_obj['background-color'] = 'unset';
        }else if(elem.background.type == 'color'){
            style_desktop_obj['background-color'] = elem.background.color;
        }else if(elem.background.type == 'gradient'){
            style_desktop_obj['background'] = elem.background.gradient;
        }else if(elem.background.type == 'backdrop_filter'){
            style_desktop_obj['background-color'] = elem.background.backdrop_filter_color;
            style_desktop_obj['backdrop-filter'] = elem.background.backdrop_filter;

        }else if(elem.background.type == 'image'){
            style_desktop_obj['background-image'] = `url('${elem.background.background_image}')`
            style_desktop_obj['background-size'] = elem.background.background_size;
            style_desktop_obj['background-attachment'] = elem.background.background_attachment;
            style_desktop_obj['background-repeat'] = elem.background.background_repeat;
            style_desktop_obj['background-position'] = elem.background.background_position;
            style_desktop_obj['background-blend-mode'] = elem.background.background_blend_mode;
            style_desktop_obj['background-color'] = elem.background.background_blend_mode_color;
        }
    }
    if('font_style' in elem){
        if(typeof(elem.font_style) === 'object'){
            if(window.preview_language in elem.font_style){
                style_desktop_obj['font-family'] = elem.font_style[window.preview_language];
            }
        }
    //     style_desktop_obj['line-height'] = `var(--${elem.font_style}_line_height)`;
    //     style_desktop_obj['letter-spacing'] = `var(--${elem.font_style}_letter_spacing)`;
    }


    //
    style_mobile_obj = JSON.parse(JSON.stringify(style_desktop_obj));
    for(let key in elem.css_mobile){
        let val = elem.css_mobile[key];
        if(val == '100vh'){val = 'calc(100vh - 40px)'}
        if(elem.name == 'popup_container'){
            if(val == 'fixed' && key == 'position'){
                val = 'absolute'
            }if(key == 'display'){
                val = 'none';
            }
        }
        if('animation' in elem){
            if(elem.animation.name != 'no_animation' || elem.animation_mobile.name != 'no_animation'){
                if(key == 'transform'){
                    val = 'unset'
                }
                if(key == 'filter'){
                    val = 'unset'
                }
            }
        }
        style_mobile_obj[key] = val;
    }
    if('background_mobile' in elem){
        if(elem.background_mobile.type == 'none'){
            style_mobile_obj['background-color'] = 'unset';
        }else if(elem.background_mobile.type == 'color'){
            style_mobile_obj['background-color'] = elem.background_mobile.color;
        }else if(elem.background_mobile.type == 'gradient'){
            style_mobile_obj['background'] = elem.background_mobile.gradient;
        }else if(elem.background_mobile.type == 'backdrop_filter'){
            style_mobile_obj['background-color'] = elem.background_mobile.backdrop_filter_color;
            style_mobile_obj['backdrop-filter'] = elem.background_mobile.backdrop_filter;

        }else if(elem.background_mobile.type == 'image'){
            style_mobile_obj['background-image'] = `url('${elem.background_mobile.background_image}')`
            style_mobile_obj['background-size'] = elem.background_mobile.background_size;
            style_mobile_obj['background-attachment'] = elem.background_mobile.background_attachment;
            style_mobile_obj['background-repeat'] = elem.background_mobile.background_repeat;
            style_mobile_obj['background-position'] = elem.background_mobile.background_position;
            style_mobile_obj['background-blend-mode'] = elem.background_mobile.background_blend_mode;
            style_mobile_obj['background-color'] = elem.background_mobile.background_blend_mode_color;
        }
    }
    ///
    if(elem.type == 'home_section' && elem.has_driver == '1'){
        style_desktop_obj[`padding-${elem.driver.position}`] = elem.driver.css.height;
        style_mobile_obj[`padding-${elem.driver.position}`] = elem.driver.css_mobile.height;
    }
    if(elem.type == 'home_section' && elem.sort == 0 && elem.adapt_header == '1'){
        style_desktop_obj[`margin-top`] = `-${$('.website_header').outerHeight()}px`;
        style_mobile_obj[`margin-top`] = `-${$('.website_header').outerHeight()}px`;
        if(elem.has_driver == '1' && elem.driver.position == 'top'){
            style_desktop_obj[`padding-${elem.driver.position}`] = `calc(${elem.driver.css.height} + ${$('.website_header').outerHeight}px`;
            style_mobile_obj[`padding-${elem.driver.position}`] = `calc(${elem.driver.css_mobile.height} + ${$('.website_header').outerHeight}px`;
        }else{
            style_desktop_obj[`padding-top`] = `${$('.website_header').outerHeight()}px`;
            style_mobile_obj[`padding-top`] = `${$('.website_header').outerHeight()}px`;
        }

    }
    //
    let style_desktop = ``;
    let style_mobile = ``;
    for(const key in style_desktop_obj){
        style_desktop = `${style_desktop}${key}:${style_desktop_obj[key]};`
    }
    for(const key in style_mobile_obj){
        style_mobile = `${style_mobile}${key}:${style_mobile_obj[key]};`
    }
    //
    if('css_hover' in elem){
        style_hover_desktop_obj = JSON.parse(JSON.stringify(style_desktop_obj));
        for(let key in elem.css_hover){
            let val = elem.css_hover[key];
            style_hover_desktop_obj[key] = val;
        }
    // }
    // if('css_mobile_hover' in elem){
        style_hover_mobile_obj = JSON.parse(JSON.stringify(style_mobile_obj));
        for(let key in elem.css_mobile_hover){
            let val = elem.css_mobile_hover[key];
            style_hover_mobile_obj[key] = val;
        }
    }
    let style_hover_desktop = '';
    let style_hover_mobile = '';
    for(const key in style_hover_desktop_obj){
        style_hover_desktop = `${style_hover_desktop}${key}:${style_hover_desktop_obj[key]};`
    }
    for(const key in style_hover_mobile_obj){
        style_hover_mobile = `${style_hover_mobile}${key}:${style_hover_mobile_obj[key]};`
    }
    //


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
    // if('font_style' in elem){
    //     classes = `${classes} ${elem.font_style}`
    // }
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
        classes = `${classes} home_elem`
        attrs = `${attrs} elem="${elem.elem_type}"`

        if(elem.elem_type == 'title' || elem.elem_type == 'paragraph'){
            classes = `${classes} add_elem_popup_elem_contenteditable`
        }
    }
    html = '';
    switch(elem.type){
        // case 'loading_spinner':
        //     html = $('<div/>',{key_tree:key_tree,type:elem.type,class:`loading_spinner_container ${classes}`,size:elem.size,style:style}).append(
        //         window.template.loading_spinner.elem.replace(':size:',elem.size)
        //     )
        // break;
        default:
            // if(elem.type == 'home_section_block'){
            //     elem.children.sort((a,b)=>{
            //         return a.sort - b.sort;
            //     })

            //     // let section_block_title_desktop = `${elem.css['border-style'].split(' ')[0] !== 'none' ? `bottom:calc(100% + ${elem.css['border-width']});` : ''}${elem.css['border-style'].split(' ')[1] !== 'none' ? `right:calc(-1px - ${elem.css['border-width']})` : ''}`; 
            //     // let section_block_title_mobile = `${elem.css_mobile['border-style'].split(' ')[0] !== 'none' ? `bottom:calc(100% + ${elem.css_mobile['border-width']})` : ''};${elem.css_mobile['border-style'].split(' ')[1] !== 'none' ?  `right:calc(-1px - ${elem.css_mobile['border-width']})` : ''}`; 
            //     // html = `${html}<div key_tree="${key_tree}" class="section_block" style="transform:${window.current_view == 'desktop' ? style_desktop_obj['transform'] : window.current_view == 'mobile' ? style_mobile_obj['transform'] : ''};grid-area:${window.current_view == 'desktop' ? style_desktop_obj['grid-area'] : window.current_view == 'mobile' ? style_mobile_obj['grid-area'] : ''}" style_desktop="transform:${style_desktop_obj['transform']};grid-area:${style_desktop_obj['grid-area']}" style_mobile="transform:${style_mobile_obj['transform']};grid-area:${style_mobile_obj['grid-area']}"><div style="${window.current_view == 'desktop' ? section_block_title_desktop : window.current_view == 'mobile' ? section_block_title_mobile : ''}" style_desktop="${section_block_title_desktop}" style_mobile="${section_block_title_mobile}" class="select_section_block_title builder_font contextMenu" key_tree="${key_tree}"><div class="ico-see_more"></div><div>${texts.section_block}</div></div>`;
            //     html = `${html}<div key_tree="${key_tree}" class="section_block" style="transform:${window.current_view == 'desktop' ? style_desktop_obj['transform'] : window.current_view == 'mobile' ? style_mobile_obj['transform'] : ''};grid-area:${window.current_view == 'desktop' ? style_desktop_obj['grid-area'] : window.current_view == 'mobile' ? style_mobile_obj['grid-area'] : ''}" style_desktop="transform:${style_desktop_obj['transform']};grid-area:${style_desktop_obj['grid-area']}" style_mobile="transform:${style_mobile_obj['transform']};grid-area:${style_mobile_obj['grid-area']}"><div class="select_section_block_title builder_font contextMenu" key_tree="${key_tree}"><div class="ico-see_more"></div><div>${texts.section_block}</div></div>`;
            //     style_desktop = `${style_desktop.replace('transform','')};height:100%;width:100%;`;
            //     style_hover_desktop = `${style_hover_desktop.replace('transform','')};height:100%;width:100%;`;
            //     style_mobile = `${style_mobile.replace('transform','')};height:100%;width:100%;`;
            //     style_hover_mobile = `${style_hover_mobile.replace('transform','')};height:100%;width:100%;`;
            // }


            html = `${html}<${elem.tag} class="${classes}" style="${$('.desktop_view').hasClass('mobile_view') ? style_mobile : style_desktop }" key_tree="${key_tree}" style_desktop="${style_desktop}" style_mobile="${style_mobile}" ${attrs}`;

            if('css_hover' in elem){
                let mouseenter = `onmouseenter="if(window.current_view == 'desktop'){$(this).attr('style',$(this).attr('style_hover_desktop'))}else{$(this).attr('style',$(this).attr('style_hover_mobile'))}"`;
                let mouseleave = `onmouseleave="if(window.current_view == 'desktop'){$(this).attr('style',$(this).attr('style_desktop'))}else{$(this).attr('style',$(this).attr('style_mobile'))}"`;
                if('animation' in elem){
                    if(elem.animation.name != 'no_animation' || elem.animation_mobile.name != 'no_animation' ){
                        mouseenter = '';
                        mouseleave = '';
                    }
                }
                html = `${html} style_hover_desktop="${style_hover_desktop}" style_hover_mobile="${style_hover_mobile}" ${mouseenter} ${mouseleave}`;
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
                html = `${html}<div class="select_section_title builder_font"><div class="ico-align_center contextMenu" key_tree="${key_tree}"></div><div>${section.name}</div></div>`;
                html = `${html}<button class="btn btn-cancel add_home_section add_home_section_btn_style ico-add" section_sort="${elem.sort}" tooltip="${texts.add_section}"></button>`
            }else if(elem.type == 'home_section_block'){
                elem.children.sort((a,b)=>{
                    return a.sort - b.sort;
                })

                // let section_block_title_desktop = `${elem.css['border-style'].split(' ')[0] !== 'none' ? `bottom:calc(100% + ${elem.css['border-width']});` : ''}${elem.css['border-style'].split(' ')[1] !== 'none' ? `right:calc(-${elem.css['border-width']})` : ''}`; 
                // let section_block_title_mobile = `${elem.css_mobile['border-style'].split(' ')[0] !== 'none' ? `bottom:calc(100% + ${elem.css_mobile['border-width']})` : ''};${elem.css_mobile['border-style'].split(' ')[1] !== 'none' ?  `right:calc(-${elem.css_mobile['border-width']})` : ''}`; 
                // html = `${html}<div style="${window.current_view == 'desktop' ? section_block_title_desktop : window.current_view == 'mobile' ? section_block_title_mobile : ''}" style_desktop="${section_block_title_desktop}" style_mobile="${section_block_title_mobile}" class="select_section_block_title builder_font contextMenu" key_tree="${key_tree}"><div class="ico-see_more"></div><div>${texts.section_block}</div></div>`;
                html = `${html}<div class="select_section_block_title builder_font contextMenu" key_tree="${key_tree}"><div class="ico-see_more"></div><div>${texts.section_block}</div></div>`;
            }
            else if(elem.type == 'home_elem'){
                
                let elem_parent = get_key_tree(key_tree).parent;
                let contenteditable = elem.elem_type == 'title' ? true : elem.elem_type == 'paragraph' ? true : false;

                let arrow_sort_back = 'ico-arrowUp';
                let arrow_sort_next = 'ico-arrowDown';
                if(window.current_view == 'mobile'){elem_parent.css_mobile['flex-direction'] == 'row' ? arrow_sort_back = 'ico-arrowLeft' : ''}
                if(window.current_view == 'mobile'){elem_parent.css_mobile['flex-direction'] == 'row' ? arrow_sort_next = 'ico-arrowRight' : ''}
                if(window.current_view == 'desktop'){elem_parent.css['flex-direction'] == 'row' ? arrow_sort_back = 'ico-arrowLeft' : ''}
                if(window.current_view == 'desktop'){elem_parent.css['flex-direction'] == 'row' ? arrow_sort_next = 'ico-arrowRight' : ''}

                // html = `${html}<div class="elem_edit_btns">
                // ${contenteditable ? `<button tooltip="${texts.edit_text}" class="btn btn-cancel elem_edit_btn edit_home_text_elem_text ico-edit_text "></button>` : ''}
                // <button tooltip="${texts.edit_element}" class="btn btn-cancel elem_edit_btn edit_home_elem_btn ico-edit "></button>
                // <button tooltip="${texts.swapUp}" class="${elem.sort == 1 ? 'none' : '' } btn btn-cancel elem_edit_btn swap_up_home_elem ${arrow_sort_back}"></button>
                // <button tooltip="${texts.swapDown}" class="${elem.sort == elem_parent.children.length ? 'none' : ''} btn btn-cancel elem_edit_btn swap_down_home_elem ${arrow_sort_next}"></button>
                // <button tooltip="${texts.styling.remove_element}" class="btn btn-cancel elem_edit_btn delete_home_elem ico-close"></button>
                // </div>`
                // let elem_title_desktop = `${elem.css['border-style'].split(' ')[0] !== 'none' ? `bottom:calc(100% + ${elem.css['border-width']});` : ''}${elem.css['border-style'].split(' ')[1] !== 'none' ? `left:calc(-1px - ${elem.css['border-width']})` : ''}`; 
                // let elem_title_mobile = `${elem.css_mobile['border-style'].split(' ')[0] !== 'none' ? `bottom:calc(100% + ${elem.css_mobile['border-width']})` : ''};${elem.css_mobile['border-style'].split(' ')[1] !== 'none' ?  `left:calc(-1px - ${elem.css_mobile['border-width']})` : ''}`; 
                // html = `${html}<div style="${window.current_view == 'desktop' ? elem_title_desktop : window.current_view == 'mobile' ? elem_title_mobile : ''}" style_desktop="${elem_title_desktop}" style_mobile="${elem_title_mobile}" class="select_edit_elem_title builder_font contextMenu" key_tree="${key_tree}"><div class="ico-see_more"></div><div>${texts.elems[elem.elem_type]}</div></div>`;
                html = `${html}<div class="select_edit_elem_title builder_font contextMenu" key_tree="${key_tree}"><div class="ico-see_more"></div><div>${texts.elems[elem.elem_type]}</div></div>`;

            }


            for(const key in elem.children){
                html = `${html}${create_html(elem.children[key],`${key_tree}.children.${key}`)}`;
            }
            html = `${html}</${elem.tag}>`;

            if(elem.type == 'home_section_block'){
                // html = `${html}</div>`;
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

// deselect_all = function(){
//     window.selected_section = null;
//     window.selected_section_block = null;
//     window.selected_elem = null;
//     $('section').removeClass('section_selected')
//     $(`.section_block`).removeClass('section_block_selected')
//     $(`.home_elem`).removeClass('edit_home_elem_selected')
// }

