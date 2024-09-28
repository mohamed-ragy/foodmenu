
set_page = function(page){
    window.template.settings.selected_page = page;
    $('.current_page_name').text(texts.website_pages[page])
    page_transition(page);
    // hide_popup_window();
}
page_transition = function(page){
    $('#page').removeClass(`${window.template.page_setup.pageTransition}_in`)
    $('#page').addClass(`${window.template.page_setup.pageTransition}_out`)
    // $('#website').css('overflow-x','hidden');
    unselect();
    hide_editor_popup('editor')
    setTimeout(()=>{
        render_page(page)
        $('#page').removeClass(`${window.template.page_setup.pageTransition}_out`).addClass(`${window.template.page_setup.pageTransition}_in`)
        scroll_elem_animation('top');
        $('#website').scrollTop(0)
        window.template.settings.selected_page = page;
        setTimeout(()=>{
            $('#page').removeClass(`${window.template.page_setup.pageTransition}_in`)
            // $('#website').css('overflow-x','');
            set_adapted_header();
        },window.template.page_setup.transitionDuration.replace('ms',''))
    },window.template.page_setup.transitionDuration.replace('ms',''))
}
render_page = function(page){
    set_adapted_header();
    if(page == null){return;}
    let website_scrolltop = $('#website').scrollTop();
    $('#page').text('')
    window.template.settings.selected_page = page;
    //
    window.template[page].sort((a,b)=>{
        return parseInt(a.sort) - parseInt(b.sort);
    })
    for(const key in window.template[page]){
        $('#page').append(
            generate_html(window.template[page][key],`${page}.${key}`),
        )
    }
    switch(page){
        case 'home':
            if(window.template.home.length == 0){
                $('#page').append(
                    $('<div/>',{class:'add_first_section_btn_container add_section',section_sort:'-1'}).append(
                        $('<div/>',{class:'add_first_section_btn ico-add'}),
                        $('<div/>',{text:texts.add_section,class:'builder_font mT10'})
                    )
                )
            }
        break;

    }
    $('#website').scrollTop(website_scrolltop);
    try{
        select(window.selected);
    }catch{
        hide_editor_popup('editor')
    }
    console.log(`${page} page rendered`)
}
//
delete_selected = function(){
    let elem = get_element_data(window.selected);
    let parent = get_element_parent_data(window.selected);
    if(elem === undefined){return;}
    let class_selector = elem.class_selector;
    if(elem.type == 'section'){
        if(!accessibility_check(window.selected,'section_delete')){return;}
        window.template[window.template.settings.selected_page].splice(elem.sort,1)
        for(const key in window.template[window.template.settings.selected_page]){
            window.template[window.template.settings.selected_page][key].sort = parseInt(key);
        }
        render('page')
    }else if(elem.type == 'elem' || elem.type == 'container'){
        let this_elem_sort = elem.sort;
        let new_children = [];
        for(const key in parent.children){
            if(parent.children[key].sort != this_elem_sort){
                new_children.push(parent.children[key]);
            }
        }
        for(const key in new_children){
            new_children[key].sort = key;
        }
        parent.children = new_children;
        $(`.${class_selector}`).remove();
        $(`.${class_selector}_container`).remove();
    }

    hide_editor_popup('editor')
    unselect();
    new_action('page');

}

///
require('./pages/section.js')
require('./pages/add_section.js')
require('./pages/section_block.js')
require('./pages/elem.js')
require('./pages/container.js')
require('./pages/add_elem.js')
//
require('./pages/login.js')






//
