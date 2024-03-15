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

    window.history.replaceState({},'',`/?template_id=${template._id}`)

    $('body').find('.editor_popup').remove()
    //

    create_editor_popup('website_colors').then(draw_website_colors());
    set_colors_vars();

    create_editor_popup('font_style').then(draw_font_style());
    set_font_style_vars();

    create_editor_popup('page_setup').then(draw_page_setup());
    set_page_setup_vars();

    create_editor_popup('form_elements').then();

    //
    draw_builder_header();
    draw_website();
    set_component('home')
}
//

draw_builder_header = function(){
    $('header').text('').removeClass('none').append(
        $('<div/>',{class:'components_container none'}).append(
            $('<div/>',{class:'fs101 bold mY5  inter',text:texts.components.websiteComponents}),
            $('<div/>',{class:'fs09 c_white-11',text:texts.components.websiteComponents_des}),
            $('<div/>',{class:'mT20 bold m5',text:texts.components.main}),
            $('<div/>',{class:'select_component',component:'home',text:texts.components.home}),
            $('<div/>',{class:'select_component',component:'category',text:texts.components.category}),
            $('<div/>',{class:'select_component',component:'product',text:texts.components.product}),
            $('<div/>',{class:'select_component',component:'about_us',text:texts.components.about_us}),
            $('<div/>',{class:'select_component',component:'privacy_policy',text:texts.components.privacy_policy}),
            $('<div/>',{class:'select_component',component:'all_products',text:texts.components.all_products}),
            $('<div/>',{class:'mT20 bold m5',text:texts.components.orderingSystem}),
            $('<div/>',{class:'select_component',component:'cart',text:texts.components.cart}),
            $('<div/>',{class:'select_component',component:'place_order',text:texts.components.place_order}),
            $('<div/>',{class:'select_component',component:'track_order',text:texts.components.track_order}),
            $('<div/>',{class:'select_component',component:'order_history',text:texts.components.order_history}),
            $('<div/>',{class:'select_component',component:'addToCart',text:texts.components.addToCart}),
            $('<div/>',{class:'mT20 bold m5',text:texts.components.websiteTools}),
            $('<div/>',{class:'select_component',component:'header',text:texts.components.header}),
            $('<div/>',{class:'select_component',component:'footer',text:texts.components.footer}),
            $('<div/>',{class:'select_component',component:'scrollbar',text:texts.components.scrollbar}),
            $('<div/>',{class:'select_component',component:'mobileNav',text:texts.components.mobileNav}),
            $('<div/>',{class:'select_component',component:'popup',text:texts.components.popup}),
            $('<div/>',{class:'select_component',component:'live_chat',text:texts.components.live_chat}),
            $('<div/>',{class:'select_component brdrB0',component:'announcement',text:texts.components.announcement}),
        ),

        $('<div/>',{class:'website_style_container none'}).append(
            $('<div/>',{class:'fs101 bold mY5  inter',text:texts.website_style.websiteStyle}),
            $('<div/>',{class:'fs09 c_white-11',text:texts.website_style.websiteStyle_des}),
            $('<div/>',{class:'website_style_elem mT20',elem:'website_colors',text:texts.website_style.website_colors}),
            $('<div/>',{class:'website_style_elem',elem:'font_style',text:texts.website_style.font_style}),
            $('<div/>',{class:'website_style_elem',elem:'page_setup',text:texts.website_style.page_setup}),
            $('<div/>',{class:'website_style_elem brdrB0',elem:'form_elements',text:texts.website_style.form_elements}),
        ),
        $('<div/>',{class:'row alnC jstfyC'}).append(
            $('<div/>',{class:'header_icon ico-folder showSelectTemplate',tooltip:texts.selectTemplate}),
            $('<div/>',{class:'mX5 c_white-11 fs105',text:'|'}),
            $('<div/>',{class:'header_icon ico-style showWebsiteStyle',tooltip:texts.websiteStyle}),
            $('<div/>',{class:'mX5 c_white-11 fs105',text:'|'}),
            $('<div/>',{class:'header_icon2 showComponents row alnC jsfySB'}).append(
                $('<div/>',{class:'mnw200 component_name'}),
                $('<div/>',{class:'ico-arrowDown mis-20'})
            ),

            $('<div/>',{class:'mX5 c_white-11 fs105',text:'|'}),
            $('<div/>',{class:'header_icon ico-undo header_icon_disabled undo',tooltip:texts.undo}),
            $('<div/>',{class:'header_icon ico-redo header_icon_disabled redo',tooltip:texts.redo}),
            $('<div/>',{class:'mX5 c_white-11 fs105',text:'|'}),
            $('<div/>',{class:'header_icon ico-desktop header_icon_selected',tooltip:texts.desktopPreview}),
            $('<div/>',{class:'header_icon ico-mobile',tooltip:texts.mobilePreview}),

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
set_component = function(component){
    $('.showComponents').find('.component_name').text(texts.components[component])
}
show_components_menu = function(){
    hide_website_style_menu()
    $('.components_container').css({
        'top': $('header').height() + 2,
        'left' : $('.showComponents').offset().left
    }).removeClass('none');
    $('.showComponents').addClass('header_icon_selected')
}
hide_components_menu = function(force=false){
    if(!$('.components_container').is(':hover') || force){
        $('.components_container').addClass('none')
        $('.showComponents').removeClass('header_icon_selected')
    }
}
show_website_style_menu = function(){
    hide_components_menu();
    $('.website_style_container').css({
        'top': $('header').height() + 2,
        'left' : $('.showWebsiteStyle').offset().left
    }).removeClass('none');
    $('.showWebsiteStyle').addClass('header_icon_selected')
}
hide_website_style_menu = function(force=false){
    if(!$('.website_style_container').is(':hover') || force){
        $('.website_style_container').addClass('none')
        $('.showWebsiteStyle').removeClass('header_icon_selected')
    }
}
//events
$('html,body').on('click','.showComponents',function(e){
    e.stopImmediatePropagation();
    show_components_menu();
})
$('html,body').on('click','.showWebsiteStyle',function(e){
    e.stopImmediatePropagation();
    show_website_style_menu();
})
//
$('html,body').on('click','.website_style_elem',function(e){
    e.stopImmediatePropagation();
    hide_website_style_menu(true);
    $('.editor_popup').addClass('editor_popup_dump')

    show_editor_popup($(this).attr('elem'));

})
