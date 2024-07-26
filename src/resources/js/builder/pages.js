
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
    setTimeout(()=>{
        draw_page(page)
        $('#page').removeClass(`${window.template.page_setup.pageTransition}_out`).addClass(`${window.template.page_setup.pageTransition}_in`)
        scroll_elem_animation('top');
        setTimeout(()=>{
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
                    generate_html(window.template.home[key],`home.${key}`),
                )
            }
            try{
                select(window.selected);
            }catch{
                hide_editor_popup('editor')
            }
        break;
    }
    $('#website').scrollTop(website_scrolltop);

}

require('./pages/home.js')
