show_header_drop_down = function(list){
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
                        class:'header_drop_down_list_item open_popup',
                        input_focus:'.login_email .form_input_box_input',
                        popup:'login',
                        text:get_text('authentication.login'),
                    }),
                    $('<a/>',{
                        class:'header_drop_down_list_item open_popup',
                        popup:'signup',
                        input_focus:'.signup_name .form_input_box_input',
                        text:get_text('authentication.signup'),
                    })
                )
            }else if(window.auth.type == 'user'){
                $('.header_drop_down_list').append(
                    $('<a/>',{
                        class:'header_drop_down_list_item open_page',
                        page:'account',
                        page_params:'account_page:account_information;',
                        account_page:'account_information',
                        text:get_text('authentication.account_information'),
                    }),
                ),
                $('.header_drop_down_list').append(
                    $('<a/>',{
                        class:'header_drop_down_list_item open_page',
                        page:'account',
                        page_params:'account_page:change_account_password;',
                        account_page:'change_account_password',
                        text:get_text('authentication.change_account_password'),
                    }),
                ),
                $('.header_drop_down_list').append(
                    $('<a/>',{
                        class:'header_drop_down_list_item open_page',
                        page:'account',
                        page_params:'account_page:my_orders;',
                        account_page:'my_orders',
                        text:get_text('authentication.my_orders'),
                    }),
                ),
                $('.header_drop_down_list').append(
                    $('<a/>',{
                        class:'header_drop_down_list_item open_page',
                        page:'account',
                        page_params:'account_page:my_addresses;',
                        account_page:'my_addresses',
                        text:get_text('authentication.my_addresses'),
                    }),
                ),
                $('.header_drop_down_list').append(
                    $('<a/>',{
                        class:'header_drop_down_list_item logout',
                        text:get_text('authentication.logout'),
                    }),
                )
            }

        break;
        case 'language':
            for(const key in window.website.languages){
                let language = window.website.languages[key];
                $('.header_drop_down_list').append(
                    $('<a/>',{
                        class:'header_drop_down_list_item change_language',
                        href:`/${language.code}/home`,
                        style:`display:flex;align-items:center;justify-content:flex-start;`,
                    }).append(
                        $('<img/>',{style:'margin-inline-end:10px;width:20px;height:20px;border-radius:50%;object-fit:cover;',src:`/storage/imgs/flags/${language.flag}.png`}),
                        $('<span/>',{text:language.name})
                    )
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
$('body').on('mouseenter','.show_header_drop_down_list',function(e){
    $('.header_drop_down_list').text('').addClass('none');
    setTimeout(()=>{
        show_header_drop_down($(this).attr('header_list'));
        $('.header_drop_down_list').css({
            'top':$(this).offset().top + $(this).outerHeight() + 5,
            'left':$(this).offset().left,
        })
        if($('.header_drop_down_list').offset().left + $('.header_drop_down_list').outerWidth() > $(window).width()){
            $('.header_drop_down_list').css({
                'left':$(window).width() - $('.header_drop_down_list').outerWidth(),
            })
        }
    })
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
set_adapt_header = function(){
    if($('body').scrollTop() == 0 && $('section').first().attr('adapt_header') == '1'){
        $(':root').css('--adapt_header_color',$('section').first().attr('adapt_header_color'))
        $('header').addClass("adapted_header")
    }else{
        $('header').removeClass("adapted_header")
    }
}