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
draw_page = function(page){
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
                        $('<div/>',{class:'add_first_section_btn  ico-add'}),
                        $('<div/>',{text:texts.add_section,class:' mT10'})
                    )
                )
            }
            for(const key in window.template.home){
                $('#page').append(
                    create_html(window.template.home[key],`home.${key}`),

                )
            }
            $(`section[key_tree="home.${window.selected_section}"]`).addClass('section_selected')
        break;
    }
}
create_html = function(elem,key_tree){
    let html = '';
    //
    let style = '';
    let style_desktop = '';
    let style_mobile = '';
    if('background_style' in elem){
        for(const key in elem.background_style){
            let val = elem.background_style[key];
            if(key == 'background-image'){val = `url("${val}")`}
            style = `${style} ${key}:${val};`
            style_desktop = `${style_desktop} ${key}:${val};`
            style_mobile = `${style_mobile} ${key}:${val};`
        }
    }

    for(const key in elem.style){
        let val = elem.style[key];
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

    if(window.selected_page == 'home'){
        if(elem.type == 'home_section'){
            let section_key = key_tree.split('.')[1]
            html.append(
                $('<button/>',{class:'btn btn-cancel add_home_section add_home_section_btn_style ico-add',section_sort:elem.sort,tooltip:texts.add_section}),
                $('<div/>',{class:'section_btns_container'}).append(
                    $('<button/>',{class:'btn btn-cancel edit_home_section_btn editor_font ico-edit',tooltip:texts.editSection,section:section_key}),
                    $('<button/>',{class:'btn btn-cancel dublicate_home_section_btn editor_font ico-copy',tooltip:texts.duplicate,section:section_key}),
                    $('<button/>',{class:`btn btn-cancel swap_home_section_up_btn editor_font ico-arrowUp ${elem.sort == 0 ? 'none' :''}`,tooltip:texts.swapUp,section:section_key}),
                    $('<button/>',{class:`btn btn-cancel swap_home_section_down_btn editor_font ico-arrowDown ${elem.sort == window.template.home.length - 1 ? 'none':''}`,tooltip:texts.swapDown,section:section_key}),
                    $('<button/>',{class:'btn btn-delete delete_home_section_btn editor_font ico-delete',tooltip:texts.deleteSection,section:section_key}),
                )
            )
            html.prepend(

            )
        }
    }

    return html;
}

require('./pages/home.js')

deselect_all = function(){
    window.selected_section = null;
    $('section').removeClass('section_selected')
}

heighlight_all = function(){
    $('.set_show_metrics').addClass('header_icon_selected')
    $('section[type="home_section"]').addClass('highlight')
    $('.home_section_container').addClass('highlight')
    $('.home_section_elements_container').addClass('highlight')
}
deheighlight_all = function(){
    $('.set_show_metrics').removeClass('header_icon_selected')
    $('section[type="home_section"]').removeClass('highlight')
    $('.home_section_container').removeClass('highlight')
    $('.home_section_elements_container').removeClass('highlight')
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
}
unset_preview_mode = function(){
    $('.set_preview_mode').removeClass('header_icon_selected')
    $('section').removeClass('section_clear')
}
preview_mode_toggle = function(){

    if( $('.set_preview_mode').hasClass('header_icon_selected')){
        unset_preview_mode();
    }else{
        set_preview_mode()
    }
}
