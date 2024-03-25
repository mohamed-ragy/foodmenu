set_page = function(page){
    $('.showWebsitePages').find('.website_page_name').text(texts.website_pages[page])
    page_transition(page);
    // switch (page) {
    //     case 'loading_screen':
    //         break;

    //     default:
    //         break;
    // }
}
page_transition = function(page){
    $('#website').removeClass(`${window.template.page_setup.pageTransition}_in`)
    $('#website').addClass(`${window.template.page_setup.pageTransition}_out`)
    preview_page_transition_in_timeout = setTimeout(()=>{
        draw_page(page)
        $('#website').removeClass(`${window.template.page_setup.pageTransition}_out`).addClass(`${window.template.page_setup.pageTransition}_in`)
        preview_page_transition_out_timeout = setTimeout(()=>{
            $('#website').removeClass(`${window.template.page_setup.pageTransition}_in`)
        },window.template.page_setup.transitionDuration.replace('ms',''))
    },window.template.page_setup.transitionDuration.replace('ms',''))
}
draw_section = function(key_tree){
    let section_key_tree = key_tree.split('.');
    let section = window.template;
    for(const key in section_key_tree){
        section = section[section_key_tree[key]];
    }
    $(`section[key_tree="${key_tree}"]`).replaceWith(
        create_html(section,key_tree)
    )
    $(`section[key_tree="${key_tree}"]`).find('.section_container').addClass('section_selected')
    set_edit_section(section);
}
draw_page = function(page){
    $('#page').text('')
    window.selected_page = page;
    switch(page){
        case 'home':
            window.template.home.sort((a,b)=>{
                return b.sort - a.sort;
            })
            for(const key in window.template.home){
                $('#page').append(
                    create_html(window.template.home[key],`home.${key}`)
                )
            }

        break;
    }
}
create_html = function(elem,key_tree){
    let html = '';
    //
    let style = '';
    let style_desktop = '';
    let style_mobile = '';
    for(const key in elem.style){
        let val = elem.style[key];
        if(key == 'background-image' && val != 'unset'){val = `url("${val}")`}
        style = `${style} ${key}:${val};`
        style_desktop = `${style_desktop} ${key}:${val};`
        style_mobile = `${style_mobile} ${key}:${val};`
    }
    for(const key in elem.style_mobile){
        let val = elem.style_mobile[key];
        if(key == 'background-image' && val != 'unset'){val = `url("${val}")`}
        style_mobile = `${style_mobile} ${key}:${val};`
    }

    let text ='';
    if('text' in elem){
        if('val' in elem.text){
            text = elem.text.val[window.preview_language]
        }else{
            text =  window.website_texts.text[elem.text.key]
        }
    }
    let classes = '';
    // if('attr' in elem){
    //     if('class' in elem.attr){
    //         classes = elem.attr.class;
    //     }
    // }
    if(typeof(elem['class']) !== 'undefined'){
        if(elem['class'] != null){
            classes = `${classes} ${elem['class']}`
        }
    }
    if(typeof(elem['color_theme']) !== 'undefined'){
        if(elem['color_theme'] != null){
            classes = `${classes} ${elem['color_theme']}`
        }
    }
    switch(elem.tag){
        // case 'loading_spinner':
        //     html = $('<div/>',{key_tree:key_tree,type:elem.type,class:`loading_spinner_container ${classes}`,size:elem.size,style:style}).append(
        //         window.template.loading_spinner.elem.replace(':size:',elem.size)
        //     )
        // break;
        default:
            let contenteditable = false;
            if(elem.formateable == '1'){
                contenteditable = true;
            }
            html = $(`<${elem.tag}/>`,{
                class:classes,
                // contenteditable:contenteditable,
                type:elem.type,
                text:text,
                key_tree:key_tree,
                style:style,
                style_desktop:style_desktop,
                style_mobile:style_mobile,
            });
            for(const key in elem.children){
                html.append(
                    create_html(elem.children[key],`${key_tree}.children.${key}`)
                )
            }
        break;
    }


    if(elem.type == 'section'){
        html.append(
            $('<button/>',{class:'btn btn-cancel edit_section_btn editor_font',text:texts.editSection,key_tree:key_tree})
        )
    }
    //     let section_style = '';
    //     for(const key in elem.section_container.style){section_style = `${section_style} ${key}:${elem.section_container.style[key]};`}
    //     //
    //     return $('<section/>',{class:`${elem.section_container.class} ${elem.section_container.color_theme}`,style:section_style}).append(html)
    // }else{
    return html;
    // }
}
