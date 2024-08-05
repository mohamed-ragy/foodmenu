
set_page = function(page){
    $('.showWebsitePages').find('.website_page_name').text(texts.website_pages[page])
    page_transition(page);
    // switch (page) {
        // case 'home':
        // page_transition(page);
        // break;


        // default:
            // break;
    // }
}
page_transition = function(page){
    $('#page').removeClass(`${window.template.page_setup.pageTransition}_in`)
    $('#page').addClass(`${window.template.page_setup.pageTransition}_out`)
    // $('#website').css('overflow-x','hidden');
    window.selected = null;
    hide_editor_popup('editor')
    setTimeout(()=>{
        draw_page(page)
        $('#page').removeClass(`${window.template.page_setup.pageTransition}_out`).addClass(`${window.template.page_setup.pageTransition}_in`)
        scroll_elem_animation('top');
        $('#website').scrollTop(0)
        window.selected_page = page;
        setTimeout(()=>{
            $('#page').removeClass(`${window.template.page_setup.pageTransition}_in`)
            // $('#website').css('overflow-x','');
            set_adapted_header();
        },window.template.page_setup.transitionDuration.replace('ms',''))
    },window.template.page_setup.transitionDuration.replace('ms',''))
}
draw_page = function(page){
    if(page == null){return;}
    let website_scrolltop = $('#website').scrollTop();
    $('#page').text('')
    window.selected_page = page;
    draw_website_header_html();
    set_template_vars();
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
}
//
delete_selected = function(){
    let elem_data = get_elem_data(window.selected);
    if(elem_data.elem.type == 'section'){
        if(!accessibility_check(window.selected,'section_delete')){return;}
        window.template[window.selected_page].splice(elem_data.elem.sort,1)
        for(const key in window.template[window.selected_page]){
            window.template[window.selected_page][key].sort = parseInt(key);
        }
    }else if(elem_data.elem.type == 'elem'){
        let this_elem_sort = elem_data.elem.sort;
        let new_children = [];
        let parent = elem_data.section_block;
        for(const key in parent.children){
            if(parent.children[key].sort != this_elem_sort){
                new_children.push(parent.children[key]);
            }
        }
        for(const key in new_children){
            new_children[key].sort = key;
        }
        parent.children = new_children;
    }

    hide_editor_popup('editor')
    window.selected = undefined;
    new_action();
}
///
require('./pages/section.js')
require('./pages/add_section.js')
require('./pages/section_block.js')
require('./pages/elem.js')
require('./pages/add_elem.js')






//
