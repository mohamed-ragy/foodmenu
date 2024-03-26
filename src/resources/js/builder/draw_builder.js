draw_builder = function(template_id){
    window.template = JSON.parse(JSON.stringify(window.templates.find(item=>item._id == template_id)));
    if(typeof(window.template) === 'undefined'){
        draw_select_template();
        return;
    }
    window.last_saved_template = JSON.parse(JSON.stringify(window.template));
    window.template_edit_history = {};
    window.template_edit_history._0 = JSON.parse(JSON.stringify(window.template))
    window.template_current_edit = 0

    window.history.replaceState({},'',`/?template_id=${template._id}&preview_language=${window.preview_language}`)

    $('body').find('.editor_popup').remove()
    //
    create_editor_popup('website_colors').then(draw_website_colors());
    set_website_colors_settings();

    create_editor_popup('font_style').then(draw_font_style());
    set_font_style_settings();

    create_editor_popup('page_setup').then(draw_page_setup());
    set_page_setup_settings();

    create_editor_popup('form_elements').then(draw_form_elements());
    set_form_elements_settings();
    //
    create_editor_popup('loading_spinner').then(draw_loading_spinner());
    set_loading_spinner_settings();
    //
    create_editor_popup('editor')
    //
    draw_builder_header();
    desktop_view();
    set_page('home')
}
//
draw_builder_header = function(){
    $('header').text('').removeClass('none').append(
        $('<div/>',{class:'website_pages_container none'}).append(
            $('<div/>',{class:'fs101 bold mY5  inter',text:texts.website_pages.website_pages}),
            $('<div/>',{class:'fs09 c_white-11',text:texts.website_pages.website_pages_des}),
            $('<div/>',{class:'mT20 bold m5',text:texts.website_pages.main}),
            $('<div/>',{class:'select_website_page',key:'home',text:texts.website_pages.home}),
            $('<div/>',{class:'select_website_page',key:'category',text:texts.website_pages.category}),
            $('<div/>',{class:'select_website_page',key:'product',text:texts.website_pages.product}),
            $('<div/>',{class:'select_website_page',key:'about_us',text:texts.website_pages.about_us}),
            $('<div/>',{class:'select_website_page',key:'all_products',text:texts.website_pages.all_products}),
            $('<div/>',{class:'mT20 bold m5',text:texts.website_pages.orderingSystem}),
            $('<div/>',{class:'select_website_page',key:'cart',text:texts.website_pages.cart}),
            $('<div/>',{class:'select_website_page',key:'place_order',text:texts.website_pages.place_order}),
            $('<div/>',{class:'select_website_page',key:'track_order',text:texts.website_pages.track_order}),
            $('<div/>',{class:'select_website_page',key:'order_history',text:texts.website_pages.order_history}),
            $('<div/>',{class:'select_website_page',key:'addToCart',text:texts.website_pages.addToCart}),
            $('<div/>',{class:'mT20 bold m5',text:texts.website_pages.other}),
            $('<div/>',{class:'select_website_page',key:'loading_screen',text:texts.website_pages.loading_screen}),
            $('<div/>',{class:'select_website_page',key:'privacy_policy',text:texts.website_pages.privacy_policy}),
            $('<div/>',{class:'select_website_page',key:'signup',text:texts.website_pages.signup}),
            $('<div/>',{class:'select_website_page',key:'login',text:texts.website_pages.login}),
            $('<div/>',{class:'select_website_page',key:'user_profile',text:texts.website_pages.user_profile}),

        ),
        $('<div/>',{class:'website_tools_container none'}).append(
            $('<div/>',{class:'fs101 bold mY5  inter',text:texts.website_tools.websiteTools}),
            $('<div/>',{class:'fs09 c_white-11',text:texts.website_tools.website_tools_des}),
            $('<div/>',{class:'website_tools_elem',key:'header',text:texts.website_tools.header}),
            $('<div/>',{class:'website_tools_elem',key:'footer',text:texts.website_tools.footer}),
            $('<div/>',{class:'website_tools_elem',key:'mobileNav',text:texts.website_tools.mobileNav}),
            $('<div/>',{class:'website_tools_elem',key:'popup',text:texts.website_tools.popup}),
            $('<div/>',{class:'website_tools_elem',key:'live_chat',text:texts.website_tools.live_chat}),
            $('<div/>',{class:'website_tools_elem brdrB0',key:'announcement',text:texts.website_tools.announcement}),
        ),
        $('<div/>',{class:'website_style_container none'}).append(
            $('<div/>',{class:'fs101 bold mY5  inter',text:texts.website_style.websiteStyle}),
            $('<div/>',{class:'fs09 c_white-11',text:texts.website_style.websiteStyle_des}),
            $('<div/>',{class:'website_style_elem mT20',elem:'website_colors',text:texts.website_style.website_colors}),
            $('<div/>',{class:'website_style_elem',elem:'font_style',text:texts.website_style.font_style}),
            $('<div/>',{class:'website_style_elem',elem:'page_setup',text:texts.website_style.page_setup}),
            $('<div/>',{class:'website_style_elem',elem:'form_elements',text:texts.website_style.form_elements}),
            $('<div/>',{class:'website_style_elem brdrB0',elem:'loading_spinner',text:texts.website_style.loading_spinner}),
        ),
        $('<div/>',{class:'row alnC jstfyC'}).append(
            $('<div/>',{class:'header_icon ico-folder showSelectTemplate',tooltip:texts.selectTemplate}),
            $('<div/>',{class:'mX5 c_white-11 fs105',text:'|'}),
            $('<div/>',{class:'header_icon ico-style showWebsiteStyle',tooltip:texts.websiteStyle}),
            $('<div/>',{class:'mX5 c_white-11 fs105',text:'|'}),
            $('<div/>',{class:'header_icon ico-website_tools showWebsiteTools',tooltip:texts.website_tools.websiteTools}),
            $('<div/>',{class:'mX5 c_white-11 fs105',text:'|'}),
            $('<div/>',{class:'header_icon2 showWebsitePages row alnC jsfySB'}).append(
                $('<div/>',{class:'mnw200 website_page_name'}),
                $('<div/>',{class:'ico-arrowDown mis-20'}),
            ),
            // $('<div/>',{class:'ico-page_settings show_page_settings header_icon'}),

            $('<div/>',{class:'mX5 c_white-11 fs105',text:'|'}),
            $('<div/>',{class:'header_icon ico-undo header_icon_disabled undo',tooltip:texts.undo}),
            $('<div/>',{class:'header_icon ico-redo header_icon_disabled redo',tooltip:texts.redo}),
            $('<div/>',{class:'mX5 c_white-11 fs105',text:'|'}),
            $('<div/>',{class:'header_icon set_view_desktop ico-desktop header_icon_selected',tooltip:texts.desktopPreview}),
            $('<div/>',{class:'header_icon set_view_mobile ico-mobile',tooltip:texts.mobilePreview}),
            $('<div/>',{class:'mX5 c_white-11 fs105',text:'|'}),
            $('<div/>',{class:'header_icon set_preview_mode ico-eye',tooltip:texts.previewMode}),
            $('<div/>',{class:'header_icon set_show_metrics ico-metrics',tooltip:texts.show_metrics}),
            $('<div/>',{class:'mX5 c_white-11 fs105',text:'|'}),
        ),
        $('<div/>',{class:'row alnC jstfyC'}).append(
            $('<div/>',{class:'header_icon2 mis-20',text:texts.livePreview}),
            $('<button/>',{id:'save',disabled:true,class:'btn m5 mis-10'}).append(
                $('<div/>',{class:'btnTxt',text:texts.save}),
                $('<div/>',{class:'btnLoading'})
            ),
        )
    );
}

show_website_pages_menu = function(){
    hide_website_style_menu()
    hide_website_tools_menu();
    $('.website_pages_container').css({
        'top': $('header').height() + 2,
        'left' : $('.showWebsitePages').offset().left
    }).removeClass('none');
    $('.showWebsitePages').addClass('header_icon_selected')
}
hide_website_pages_menu = function(force=false){
    if($('.website_pages_container:hover').length == 0 || force){
        $('.website_pages_container').addClass('none')
        $('.showWebsitePages').removeClass('header_icon_selected')
    }
}
//
show_website_style_menu = function(){
    hide_website_pages_menu();
    hide_website_tools_menu();
    $('.website_style_container').css({
        'top': $('header').height() + 2,
        'left' : $('.showWebsiteStyle').offset().left
    }).removeClass('none');
    $('.showWebsiteStyle').addClass('header_icon_selected')
}
hide_website_style_menu = function(force=false){
    if($('.website_style_container:hover').length == 0 || force){
        $('.website_style_container').addClass('none')
        $('.showWebsiteStyle').removeClass('header_icon_selected')
    }
}
//
show_website_tools_menu = function(){
    hide_website_pages_menu();
    hide_website_style_menu();
    $('.website_tools_container').css({
        'top': $('header').height() + 2,
        'left' : $('.showWebsiteTools').offset().left
    }).removeClass('none');
    $('.showWebsiteTools').addClass('header_icon_selected')
}
hide_website_tools_menu = function(force=false){
    if($('.website_tools_container:hover').length == 0 || force){
        $('.website_tools_container').addClass('none')
        $('.showWebsiteTools').removeClass('header_icon_selected')
    }
}
//
mobile_view = function(){
    window.current_view = 'mobile';
    set_view_style();
    $('.desktop_view').addClass('mobile_view');
    $('.set_view_desktop').removeClass('header_icon_selected')
    $('.set_view_mobile').addClass('header_icon_selected')
}
desktop_view = function(){
    window.current_view = 'desktop';
    set_view_style();
    $('.desktop_view').removeClass('mobile_view');
    $('.set_view_desktop').addClass('header_icon_selected')
    $('.set_view_mobile').removeClass('header_icon_selected')
}
set_view_style = function(){
    if(window.current_view == 'mobile'){
        $('[style_mobile]').each(function(){
            $(this).attr('style',$(this).attr('style_mobile'))
        })
    }else if(window.current_view == 'desktop'){
        $('[style_desktop]').each(function(){
            $(this).attr('style',$(this).attr('style_desktop'))
        })
    }
    setTimeout(function(){
        $(':root').css('--screen_height',`${$('#page').outerHeight()}px`)
    },300)
}

view_toggle = function(){
    if(!$('.desktop_view').hasClass('mobile_view')){
        mobile_view();
    }else{
        desktop_view()
    }
}
//events
$('html,body').on('click','.showWebsitePages',function(e){
    e.stopImmediatePropagation();
    show_website_pages_menu();
})
$('html,body').on('click','.showWebsiteStyle',function(e){
    e.stopImmediatePropagation();
    show_website_style_menu();
})
$('html,body').on('click','.showWebsiteTools',function(e){
    e.stopImmediatePropagation();
    show_website_tools_menu();
})
//
$('html,body').on('click','.website_style_elem',function(e){
    e.stopImmediatePropagation();
    hide_website_style_menu(true);
    $('.editor_popup').addClass('editor_popup_dump')
    show_editor_popup($(this).attr('elem'));
    if($(this).attr('elem') == 'loading_spinner'){
        get_loading_spinners();
    }
})
$('html,body').on('click','.website_tools_elem',function(e){
    e.stopImmediatePropagation();
    hide_website_tools_menu(true);
    $('.editor_popup').addClass('editor_popup_dump')
    show_editor_popup($(this).attr('key'));
})
$('html,body').on('click','.select_website_page',function(e){
    e.stopImmediatePropagation();
    set_page($(this).attr('key'))
    hide_website_pages_menu(true)
})
//
$('html,body').on('click','.set_view_desktop',function(e){
    e.stopImmediatePropagation();
    desktop_view();
})
$('html,body').on('click','.set_view_mobile',function(e){
    e.stopImmediatePropagation();
    mobile_view();
})
//
$('html,body').on('click','.set_preview_mode',function(e){
    e.stopImmediatePropagation();
    preview_mode_toggle();
})
$('html,body').on('click','.set_show_metrics',function(e){
    e.stopImmediatePropagation();
    heighlight_all_toggle();
})
