show_header_drop_down = function(list){
    $('.header_drop_down_list').text('')
    switch(list){
        case 'foodmenu':
            for(const key in window.website.categories){
                let category = window.website.categories[key];
                $('.header_drop_down_list').append(
                    $('<a/>',{
                        class:'header_drop_down_list_item',
                        href:`/${window.lang}/${category.name}`,
                        text:category.names[window.lang],
                    })
                )
            }

        break;
        case 'user':
            if(window.auth.type == 'guest'){
                $('.header_drop_down_list').append(
                    $('<a/>',{
                        class:'header_drop_down_list_item',
                        text:window.text.authentication.login,
                    }),
                    $('<a/>',{
                        class:'header_drop_down_list_item',
                        text:window.text.authentication.signup,
                    })
                )
            }

        break;
        case 'language':
            for(const key in window.website.languages){
                let langauge = window.website.languages[key];
                $('.header_drop_down_list').append(
                    $('<a/>',{
                        class:'header_drop_down_list_item change_language',
                        text:langauge.name,
                        href:`/${langauge.code}/home`
                    })
                )
            }
        break;
        case 'see_more':
            $('.header_navList').children().each(function(){
                if(!$(this).hasClass('header_drop_down_list') && !$(this).hasClass('header_list_see_more') && !$(this).hasClass('header_list_foodmenu')){
                    if($(this).hasClass('none')){
                        $('.header_drop_down_list').append(
                            $('<a/>',{
                                class:'header_drop_down_list_item open_page',
                                page:$(this).children().first().attr('page'),
                                text:$(this).children().first().text(),
                            }),
                        )
                    }
                }
            })

        break;
    }
    $('.header_drop_down_list').removeClass('none')

}
$('body').on('mouseleave','header',function(e){
    $('.header_drop_down_list').addClass('none');
})
$('body').on('mouseover','.show_header_drop_down_list',function(e){
    show_header_drop_down($(this).attr('header_list'));
    $('.header_drop_down_list').css({
        'top':$(this).position().top + $(this).outerHeight(),
        'left':$(this).offset().left,
    })
    if($('.header_drop_down_list').offset().left + $('.header_drop_down_list').outerWidth() > $(window).width()){
        $('.header_drop_down_list').css({
            'left':$(window).width() - $('.header_drop_down_list').outerWidth(),
        })
    }
})
fix_header_nav_list = function(){
    let header_width = $('header').width();
    let header_children_width = $('.header_logo').outerWidth() + $('.header_navList').outerWidth() + $('.header_iconsList').outerWidth();
    let header_navList_children = $($('.header_navList').children().get().reverse());
    if(header_width < header_children_width){
        $('.header_list_see_more').removeClass('none')
        header_navList_children.each(function(){
            if(!$(this).hasClass('header_drop_down_list') && !$(this).hasClass('header_list_see_more') && !$(this).hasClass('header_list_foodmenu')  && $(this).css('display') != 'none'){
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
