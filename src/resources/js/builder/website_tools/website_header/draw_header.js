draw_website_header_html = function(){
    $('.website_header').remove();
    $('#page').before(generate_html(window.template.website_header.elems,'website_header.elems'))
    $('.website_header').addClass('stop_transitions')
    let sorted_header_navList = $('.header_navList').find('.header_navList_item').sort((a,b)=>{
        return parseInt($(a).attr('sort')) - parseInt($(b).attr('sort'))
    })
    $('.header_navList').append(sorted_header_navList)

    let sorted_header_iconList = $('.header_iconsList').children().sort((a,b)=>{
        return parseInt($(a).attr('sort')) - parseInt($(b).attr('sort'))
    })
    $('.header_iconsList').append(sorted_header_iconList)

    setTimeout(()=>{
        fix_header_nav_list();
        $('.website_header').removeClass('stop_transitions')
    },200)
}
set_adapted_header = function(){
    if(window.selected_page == null){return}
    if(typeof(window.template[window.selected_page][0]) === 'undefined'){return;}
    if(window.template[window.selected_page][0].attr.adapt_header == '1' && $('#website').scrollTop() == 0){
        $(':root').css('--adapt_header_color',window.template[window.selected_page][0].attr.adapt_header_color);
        $('.website_header').addClass('adapted_header')
        $('section').first().find('.select_section_title').css('top',$('.website_header').outerHeight())
    }else{
        $('.website_header').removeClass('adapted_header')

    }
}
fix_header_nav_list = function(){
    let header_width = $('.website_header').width();
    let header_children_width = $('.header_logo').outerWidth() + $('.header_navList').outerWidth() + $('.header_iconsList').outerWidth();
    let header_navList_children = $($('.header_navList').children().get().reverse());
    if(header_width < header_children_width){
        $('.header_list_see_more').removeClass('none')
        header_navList_children.each(function(){
            if(!$(this).hasClass('header_drop_down_list') && !$(this).hasClass('header_list_see_more') && !$(this).hasClass('header_list_foodmenu') && $(this).css('display') != 'none'){
                $(this).addClass('none');
                if(header_width >= $('.header_logo').outerWidth() + $('.header_navList').outerWidth() + $('.header_iconsList').outerWidth()){
                    return false;
                }
            }
        })
    }else{
        $('.header_list_see_more').addClass('none')
        $('.header_navList').children().each(function(){
            if(!$(this).hasClass('header_drop_down_list') && !$(this).hasClass('header_list_see_more') && !$(this).hasClass('header_list_foodmenu')){
                $(this).removeClass('none');
            }
        })
        if(header_width < $('.header_logo').outerWidth() + $('.header_navList').outerWidth() + $('.header_iconsList').outerWidth()){
            fix_header_nav_list();
        }
    }
}