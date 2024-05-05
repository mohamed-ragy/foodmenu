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
    preview_page_transition_in_timeout = setTimeout(()=>{
        draw_page(page)
        scroll_elem_animation('top');
        $('#page').removeClass(`${window.template.page_setup.pageTransition}_out`).addClass(`${window.template.page_setup.pageTransition}_in`)
        preview_page_transition_out_timeout = setTimeout(()=>{
            $('#page').removeClass(`${window.template.page_setup.pageTransition}_in`)
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
            $(`section[key_tree="home.${window.selected_section}"]`).addClass('section_selected');
            $(`.section_block[key_tree="${window.selected_section_block}"]`).addClass('section_block_selected')
            $(`.edit_home_elem[key_tree="${window.selected_elem}"]`).addClass('edit_home_elem_selected')


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
    for(const key in elem.css){
        let val = elem.css[key];
        if(val == '100vh'){val = 'calc(100vh - 40px)'}
        if(elem.name == 'popup_container'){
            if(val == 'fixed' && key == 'position'){
                val = 'absolute'
            }if(key == 'display'){
                val = 'none';
            }
        }
        if('background' in elem){
            if(elem.background == 'none' && key == 'backdrop-filter'){
                val = 'unset';
            }
        }
        style_desktop_obj[key] = val;
    }

    if('background' in elem){
        if(elem.background == 'image'){
            for(const key in elem.background_image){
                let val = elem.background_image[key];
                if(key == 'background-image'){val = `url('${val}')`}
                style_desktop_obj[key] = val;
            }
        }
    }
    if('font_style' in elem){
        style_desktop_obj['font-family'] = `var(--${elem.font_style}_name)`;
        style_desktop_obj['line-height'] = `var(--${elem.font_style}_line_height)`;
        style_desktop_obj['letter-spacing'] = `var(--${elem.font_style}_letter_spacing)`;
    }


    //
    style_mobile_obj = JSON.parse(JSON.stringify(style_desktop_obj));
    for(const key in elem.css_mobile){
        let val = elem.css_mobile[key];
        if(val == '100vh'){val = 'calc(100vh - 40px)'}
        if(elem.name == 'popup_container'){
            if(val == 'fixed' && key == 'position'){
                val = 'absolute'
            }if(key == 'display'){
                val = 'none';
            }
        }
        if('background' in elem){
            if(elem.background == 'none' && key == 'backdrop-filter'){
                val = 'unset';
            }
        }
        style_mobile_obj[key] = val;
    }
    if('background' in elem){
        if(elem.background == 'image'){
            for(const key in elem.background_image_mobile){
                let val = elem.background_image_mobile[key];
                if(key == 'background-image'){val = `url('${val}')`}
                style_mobile_obj[key] = val;
            }
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
        style_hover_mobile_obj = JSON.parse(JSON.stringify(style_mobile_obj));
        for(const key in elem.css_hover){
            let val = elem.css_hover[key];
            style_hover_desktop_obj[key] = val;
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
    if('font_style' in elem){
        classes = `${classes} ${elem.font_style}`
    }
    if('class' in elem && elem.class != null){
        classes = `${classes} ${elem.class}`
    }
    if('color_theme' in elem ){
        if('background' in elem){
            if(elem.background == 'color_theme'){
                classes = `${classes} ${elem.color_theme}`
            }
        }else{
            classes = `${classes} ${elem.color_theme}`
        }
    }

    let attrs = ''
    if('attr' in elem){
        for(const key in elem['attr']){
            attrs = `${attrs} ${key}="${elem['attr'][key]}"`
        }
    }
    if('animation' in elem && typeof(elem.animation) === 'object'){
        attrs = `${attrs} elem_animation="true"`
    }

    //
    if(elem.type == 'home_elem'){
        classes = `${classes} edit_home_elem`
        attrs = `${attrs} elem="${elem.elem_type}"`

        if(elem.elem_type == 'title' || elem.elem_type == 'paragraph'){
            classes = `${classes} add_elem_popup_elem_contenteditable`
        }
    }

    switch(elem.type){
        // case 'loading_spinner':
        //     html = $('<div/>',{key_tree:key_tree,type:elem.type,class:`loading_spinner_container ${classes}`,size:elem.size,style:style}).append(
        //         window.template.loading_spinner.elem.replace(':size:',elem.size)
        //     )
        // break;
        default:
            // let contenteditable = false;
            // if(elem.formateable == '1'){
            //     contenteditable = true;
            // }
            html = `<${elem.tag} class="${classes}" style="${$('.desktop_view').hasClass('mobile_view') ? style_mobile : style_desktop }" key_tree="${key_tree}" style_desktop="${style_desktop}" style_mobile="${style_mobile}" ${attrs}`;

            if('css_hover' in elem){
                html = `${html} style_hover_desktop="${style_hover_desktop}" style_hover_mobile="${style_hover_mobile}" `;
                html = `${html} onmouseenter="if(window.current_view){$(this).attr('style',$(this).attr('style_hover_desktop'))}else{$(this).attr('style',$(this).attr('style_hover_mobile'))}"`;
                html = `${html} onmouseleave="if(window.current_view){$(this).attr('style',$(this).attr('style_desktop'))}else{$(this).attr('style',$(this).attr('style_mobile'))}"`;
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

                let section_key = get_key_tree(key_tree).elem_key;
                html = `${html}<button class="btn btn-cancel add_home_section add_home_section_btn_style ico-add" section_sort="${elem.sort}" tooltip="${texts.add_section}"></button>
                <div class="section_btns_container" style="${elem.adapt_header == '1' && elem.sort == 0 ? `margin-top:${$('.website_header').outerHeight()}px` :''}">
                    <button class="btn btn-cancel edit_home_section_btn builder_font ico-edit" tooltip="${texts.editSection}" section="${section_key}"></button>
                    <button class="btn btn-cancel dublicate_home_section_btn builder_font ico-copy" tooltip="${texts.dublicateSection}" section="${section_key}"></button>
                    <button class="btn btn-cancel swap_home_section_up_btn builder_font ico-arrowUp ${elem.sort == 0 ? 'none' :''}" tooltip="${texts.swapUp}" section="${section_key}"></button>
                    <button class="btn btn-cancel swap_home_section_down_btn builder_font ico-arrowDown ${elem.sort == window.template.home.length - 1 ? 'none':''}" tooltip="${texts.swapDown}" section="${section_key}"></button>
                    <button class="btn btn-delete delete_home_section_btn builder_font ico-delete" tooltip="${texts.deleteSection}" section="${section_key}"></button>
                </div>
                `;
            }else if(elem.type == 'section_block'){
                elem.children.sort((a,b)=>{
                    return a.sort - b.sort;
                })
                html = `${html}<div class="section_block_edit_btns">
                <button tooltip="${texts.edit_section_block}" key_tree="${key_tree}" class="btn btn-cancel section_block_edit_btn ico-edit"></button>
                <button tooltip="${texts.add_element}" key_tree="${key_tree}" class="btn btn-cancel section_add_elem_btn ico-plus"></button>
                </div>`;
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

                html = `${html}<div class="elem_edit_btns">
                ${contenteditable ? `<button tooltip="${texts.edit_text}" class="btn btn-cancel elem_edit_btn edit_home_text_elem_text ico-edit_text "></button>` : ''}
                <button tooltip="${texts.edit_element}" class="btn btn-cancel elem_edit_btn edit_home_elem_btn ico-edit "></button>
                <button tooltip="${texts.swapUp}" class="${elem.sort == 1 ? 'none' : '' } btn btn-cancel elem_edit_btn swap_up_home_elem ${arrow_sort_back}"></button>
                <button tooltip="${texts.swapDown}" class="${elem.sort == elem_parent.children.length ? 'none' : ''} btn btn-cancel elem_edit_btn swap_down_home_elem ${arrow_sort_next}"></button>
                <button tooltip="${texts.styling.remove_element}" class="btn btn-cancel elem_edit_btn delete_home_elem ico-close"></button>
                </div>`
            }


            for(const key in elem.children){
                html = `${html}${create_html(elem.children[key],`${key_tree}.children.${key}`)}`;
            }
            html = `${html}</${elem.tag}>`;

        break;
    }
    return html;
}

require('./pages/home.js')

deselect_all = function(){
    window.selected_section = null;
    window.selected_section_block = null;
    window.selected_elem = null;
    $('section').removeClass('section_selected')
    $(`.section_block`).removeClass('section_block_selected')
    $(`.edit_home_elem`).removeClass('edit_home_elem_selected')
}

heighlight_all = function(){
    $('.set_show_metrics').addClass('header_icon_selected')
    $('section[type="home_section"]').addClass('highlight')
    $('.section_wrapper').addClass('highlight')
    $('.section_block').addClass('highlight')
    $('.website_header').addClass('header_highlight')
    $('.edit_home_elem').addClass('header_highlight')
}
deheighlight_all = function(){
    $('.set_show_metrics').removeClass('header_icon_selected')
    $('section[type="home_section"]').removeClass('highlight')
    $('.section_wrapper').removeClass('highlight')
    $('.section_block').removeClass('highlight')
    $('.website_header').removeClass('header_highlight')
    $('.edit_home_elem').removeClass('header_highlight')
}
heighlight_all_toggle = function(){
    if( $('.set_show_metrics').hasClass('header_icon_selected')){
        deheighlight_all();
    }else{
        heighlight_all()
    }
}
set_preview_mode = function(){
    $('.set_preview_mode').addClass('header_icon_selected')
    $('section').addClass('section_clear')
    $('.website_header').addClass('selected_header_clear')
}
unset_preview_mode = function(){
    $('.set_preview_mode').removeClass('header_icon_selected')
    $('section').removeClass('section_clear')
    $('.website_header').removeClass('selected_header_clear')

}
preview_mode_toggle = function(){

    if( $('.set_preview_mode').hasClass('header_icon_selected')){
        unset_preview_mode();
    }else{
        set_preview_mode()
    }
}
//

