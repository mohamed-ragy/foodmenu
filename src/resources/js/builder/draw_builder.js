draw_builder = function(template_id){
    window.template = JSON.parse(JSON.stringify(window.templates.find(item=>item._id == template_id)));
    for(const key in window.template){
        if(key != '_id' && key != 'website_id' && key != 'name' && key != 'created_at' && key != 'updated_at' ){
            window.template[key] = JSON.parse(window.template[key]);
        }
    }
    if(typeof(window.template) === 'undefined'){
        draw_select_template();
        return;
    }
    
    Coloris({
        format: 'rgb',
        forceAlpha: false,
        alpha: false,
        swatchesOnly: false,
        el:'.color_picker',
        focusInput:false,
        selectInput:false,
        clearButton: false,
        clearLabel:texts.styling.remove_color,
        defaultColor: 'rgba(0,0,0,0)',
        swatches: [],
      });

    window.template_edit_history = {};
    window.template_edit_history._0 = JSON.parse(JSON.stringify(window.template))
    window.template_current_edit = 0
    window.history.replaceState({},'',`/?template_id=${template._id}&preview_language=${window.preview_language}`)
    $('body').find('.editor_popup').remove()
    //
    create_editor_popup('website_colors').then(()=>{draw_website_colors();});
    create_editor_popup('page_setup').then(()=>{draw_page_setup()});
    // create_editor_popup('website_form').then(()=>{draw_website_form()});
    //
    create_editor_popup('editor')
    //
    draw_builder_header();
    render_website_popup();
    set_page(window.template.settings.selected_page)

    window.template.settings.view == 'desktop' ? desktop_view() : window.template.settings.view == 'mobile' ? mobile_view() : desktop_view();
    set_template_vars();
    window.last_saved_template = JSON.parse(JSON.stringify(window.template));

    setTimeout(()=>{
        if(window.template.settings.website_popup_opened == '1'){
            open_website_popup(template.settings.selected_popup ?? null);
        }
        //
        window.template.account[0].children.section_wrapper = get_user_account_sections()[0];
        new_action('all');
        // open_website_popup('login')
        // select('form_elements.form_input_box');
        // draw_editor_popup_input_box();
    },1000)

}
//
draw_builder_header = function(){
    $('.builder_header').text('').removeClass('none').append(
        $('<div/>',{class:'builder_header_menu none',menu:'website_pages'}).append(
            $('<div/>',{class:'fs101 bold mY5  inter',text:texts.website_pages.website_pages}),
            $('<div/>',{class:'fs09 c_white-11',text:texts.website_pages.website_pages_des}),
            $('<div/>',{class:'mT20 bold m5',text:texts.website_pages.main}),
            $('<div/>',{class:'builder_header_menu_elem select_website_page',key:'home',text:texts.website_pages.home}),
            $('<div/>',{class:'builder_header_menu_elem select_website_page',key:'category',text:texts.website_pages.category}),
            $('<div/>',{class:'builder_header_menu_elem select_website_page',key:'product',text:texts.website_pages.product}),
            $('<div/>',{class:'builder_header_menu_elem select_website_page',key:'about_us',text:texts.website_pages.about_us}),
            $('<div/>',{class:'builder_header_menu_elem select_website_page',key:'all_products',text:texts.website_pages.all_products}),
            $('<div/>',{class:'mT20 bold m5',text:texts.website_pages.orderingSystem}),
            $('<div/>',{class:'builder_header_menu_elem select_website_page',key:'cart',text:texts.website_pages.cart}),
            $('<div/>',{class:'builder_header_menu_elem select_website_page',key:'place_order',text:texts.website_pages.place_order}),
            $('<div/>',{class:'builder_header_menu_elem select_website_page',key:'track_order',text:texts.website_pages.track_order}),
            $('<div/>',{class:'builder_header_menu_elem select_website_page',key:'order_history',text:texts.website_pages.order_history}),
            $('<div/>',{class:'builder_header_menu_elem select_website_page',key:'addToCart',text:texts.website_pages.addToCart}),
            $('<div/>',{class:'mT20 bold m5',text:texts.website_pages.other}),
            $('<div/>',{class:'builder_header_menu_elem select_website_page',key:'privacy_policy',text:texts.website_pages.privacy_policy}),
            // $('<div/>',{class:'builder_header_menu_elem select_website_popup',key:'signup',text:texts.website_pages.signup}),
            // $('<div/>',{class:'builder_header_menu_elem select_website_popup select',key_tree:'form_elements.website_form',key:'login',text:texts.website_pages.login}),
            $('<div/>',{class:'builder_header_menu_elem select_website_page',key:'account',text:texts.website_pages.account,style:'border:none'}),

        ),
        $('<div/>',{class:'builder_header_menu none',menu:'website_tools'}).append(
            $('<div/>',{class:'fs101 bold mY5  inter',text:texts.website_tools.websiteTools}),
            $('<div/>',{class:'fs09 c_white-11',text:texts.website_tools.website_tools_des}),
            $('<div/>',{class:'builder_header_menu_elem website_tools_elem',key:'website_header',text:texts.website_tools.header}),
            $('<div/>',{class:'builder_header_menu_elem website_tools_elem',key:'footer',text:texts.website_tools.footer}),
            $('<div/>',{class:'builder_header_menu_elem website_tools_elem',key:'mobileNav',text:texts.website_tools.mobileNav}),
            $('<div/>',{class:'builder_header_menu_elem website_tools_elem',key:'popup_window',text:texts.website_tools.popup_window}),
            $('<div/>',{class:'builder_header_menu_elem website_tools_elem',key:'live_chat',text:texts.website_tools.live_chat}),
            $('<div/>',{class:'builder_header_menu_elem website_tools_elem',key:'announcement',text:texts.website_tools.announcement}),
        ),
        $('<div/>',{class:'builder_header_menu none',menu:'website_style'}).append(
            $('<div/>',{class:'fs101 bold mY5  inter',text:texts.website_style.websiteStyle}),
            $('<div/>',{class:'fs09 c_white-11',text:texts.website_style.websiteStyle_des}),
            $('<div/>',{class:'builder_header_menu_elem website_style_elem mT20',elem:'website_colors',text:texts.website_style.website_colors}),
            $('<div/>',{class:'builder_header_menu_elem website_style_elem',elem:'page_setup',text:texts.website_style.page_setup}),
            $('<div/>',{class:'builder_header_menu_elem_submenu',elem:'website_form'}).append(
                $('<div/>',{class:'',text:texts.website_style.form_elements}),
                $('<div/>',{class:'ico-arrowRight'}),
                $('<div/>',{class:'builder_header_submenu none'}).append(
                    $('<div/>',{class:'builder_header_menu_elem website_form_elem editor_website_form select',text:texts.website_style.website_form,key_tree:'form_elements.website_form'}),
                    $('<div/>',{class:'builder_header_menu_elem website_form_elem editor_text_style select',text:texts.website_style.form_title,key_tree:'form_elements.form_title'}),
                    $('<div/>',{class:'builder_header_menu_elem website_form_elem editor_input_box select',text:texts.website_style.form_input_box,key_tree:'form_elements.form_input_box'}),
                    $('<div/>',{class:'builder_header_menu_elem website_form_elem editor_button select',text:texts.website_style.form_button,key_tree:'form_elements.form_button'}),
                    $('<div/>',{class:'builder_header_menu_elem website_form_elem editor_check_box select',text:texts.website_style.form_check_box,key_tree:'form_elements.form_check_box'}),
                    $('<div/>',{class:'builder_header_menu_elem website_form_elem editor_loading_spinner select',text:texts.website_style.form_loading_spinner,key_tree:'form_elements.form_loading_spinner'}),
                )
            ),
        ),
        $('<div/>',{class:'builder_header_menu none',menu:'preview_languages'}).append(
            $('<div/>',{class:'fs101 bold mY5  inter',text:texts.preview_language}),
            // loop down and add lang elems and dont forget to style it and then add the events
        ),

        $('<div/>',{class:'row alnC jstfyC'}).append(
            $('<div/>',{class:'header_icon ico-folder showSelectTemplate',tooltip:texts.selectTemplate}),
            $('<div/>',{class:'mX5 c_white-11 fs105',text:'|'}),
            $('<div/>',{class:'header_icon ico-style show_builder_header_menu',onclick:`show_builder_header_menu('website_style')`,menu:'website_style',tooltip:texts.website_style.websiteStyle}),
            $('<div/>',{class:'mX5 c_white-11 fs105',text:'|'}),
            $('<div/>',{class:'header_icon ico-website_tools show_builder_header_menu',onclick:`show_builder_header_menu('website_tools')`,menu:'website_tools',tooltip:texts.website_tools.websiteTools}),
            $('<div/>',{class:'mX5 c_white-11 fs105',text:'|'}),
            $('<div/>',{class:'header_icon2 show_builder_header_menu',onclick:`show_builder_header_menu('website_pages')`,menu:'website_pages'}).append(
                $('<div/>',{class:'mnw200 current_page_name'}),
                $('<div/>',{class:'ico-arrowDown mis-20'}),
            ),
            // $('<div/>',{class:'ico-page_settings show_page_settings header_icon'}),

            $('<div/>',{class:'mX5 c_white-11 fs105',text:'|'}),
            $('<div/>',{class:'header_icon ico-undo header_icon_disabled undo',tooltip:`${texts.undo} <span class="fs08 c_white-11">${texts.keyboard_shortcuts.undo}</span>`}),
            $('<div/>',{class:'header_icon ico-redo header_icon_disabled redo',tooltip:`${texts.redo} <span class="fs08 c_white-11">${texts.keyboard_shortcuts.redo}</span>`}),
            $('<div/>',{class:'mX5 c_white-11 fs105',text:'|'}),
            $('<div/>',{class:'header_icon set_view_desktop ico-desktop header_icon_selected',tooltip:`${texts.desktopPreview} <span class="fs08 c_white-10">${texts.keyboard_shortcuts.desktopPreview}</span>`}),
            $('<div/>',{class:'header_icon set_view_mobile ico-mobile',tooltip:`${texts.mobilePreview} <span class="fs08 c_white-10">${texts.keyboard_shortcuts.mobilePreview}</span>`}),
            $('<div/>',{class:'mX5 c_white-11 fs105',text:'|'}),
            $('<div/>',{class:'header_icon set_preview_mode ico-eye',tooltip:`${texts.previewMode} <span class="fs08 c_white-10">${texts.keyboard_shortcuts.previewMode}</span>`}),
            $('<div/>',{class:'header_icon set_show_metrics ico-metrics',tooltip:`${texts.show_metrics} <span class="fs08 c_white-10">${texts.keyboard_shortcuts.show_metrics}</span>`}),
            $('<div/>',{class:'mX5 c_white-11 fs105',text:'|'}),
            $('<div/>',{class:'header_icon2 show_builder_header_menu',onclick:`show_builder_header_menu('preview_languages')`,menu:'preview_languages',tooltip:texts.preview_language}).append(
                $('<div/>',{class:'',text:window.website_data.languages[window.preview_language].name}),
                $('<div/>',{class:'ico-arrowDown mis-20'}),
            ),
            $('<div/>',{class:'mX5 c_white-11 fs105',text:'|'}),
            $('<div/>',{class:'header_icon ico-bug report_bug',tooltip:texts.report_bug}),

        ),
        $('<div/>',{class:'row alnC jstfyC'}).append(
            $('<div/>',{class:'header_icon2 mis-20',text:texts.livePreview}),
            $('<button/>',{id:'save',disabled:true,class:'btn save_btn'}).append(
                $('<div/>',{class:'btnTxt',text:texts.save}),
                $('<div/>',{class:'btnLoading'})
            ),
        )
    );
    let i = 0;
    for(const key in window.website_data.languages){
        i++
        $('.builder_header_menu[menu="preview_languages"]').append(
            $('<div/>',{class:'preview_languages_elem builder_header_menu_elem',key:window.website_data.languages[key].code,html:`${window.website_data.languages[key].name} <span class="fs09 c_white-10">( Ctrl + ${i} )</span>`})
        )
    }
}
show_builder_header_menu = function(menu){
    hide_builder_header_menu(true)
    $(`.builder_header_menu[menu="${menu}"]`).css({
        'top': $('header').height() + 2,
        'left':$(`.show_builder_header_menu[menu="${menu}"]`).offset().left
    })
    $(`.builder_header_menu[menu="${menu}"]`).removeClass('none');
    $(`.show_builder_header_menu`).removeClass('header_icon_selected')
    $(`.show_builder_header_menu[menu="${menu}"]`).addClass('header_icon_selected')
}
hide_builder_header_menu = function(force = false){
    if($('.builder_header_menu:hover').length == 0 && $('.show_builder_header_menu:hover').length == 0 || force){
        $('.builder_header_menu').addClass('none')
        $('.show_builder_header_menu').removeClass('header_icon_selected')
    }
}
$('body').on('mouseenter','.builder_header_menu_elem_submenu',function(){
    $(this).find('.builder_header_submenu').css({
        left:$(this).offset().left + $(this).outerWidth() - 5,
        top:$(this).offset().top + $(this).outerHeight() - 80,
    }).removeClass('none')
})
$('body').on('mouseleave','.builder_header_menu_elem_submenu',function(){
    $(this).find('.builder_header_submenu').addClass('none')
})
//
mobile_view = function(){
    window.current_view = 'mobile';
    set_responsive_selector();
    $('#website').addClass('mobile_view_scroll')
    $('.desktop_view').css({
        'height':window.template.settings.mobile_view_height,
        'width':window.template.settings.mobile_view_width,
    })
    $('.desktop_view').addClass('mobile_view');
    $('.set_view_desktop').removeClass('header_icon_selected')
    $('.set_view_mobile').addClass('header_icon_selected')
    $('#website').addClass('opacity0')
    setTimeout(()=>{
        $('#website').removeClass('opacity0')
        set_page_setup_vars();
        $('#website').scrollTop(0)
        if(window.selected){
            try{
                $('#website').scrollTop(($('#website').find(`[key_tree="${window.selected}"]`).offset().top) - ($('#website').offset().top) - 300)
            }catch{}
            fix_edit_btns_position(get_element_data(window.selected),window.selected);
        }
        set_editor_popup_editor();
    },500)
    window.template.settings.view = 'mobile';
    render('all');
}
desktop_view = function(){
    window.current_view = 'desktop';
    set_responsive_selector();
    $('.desktop_view').css({
        'height':'',
        'width':'',
    })
    $('#website').removeClass('mobile_view_scroll')
    $('.desktop_view').removeClass('mobile_view');
    $('.set_view_desktop').addClass('header_icon_selected')
    $('.set_view_mobile').removeClass('header_icon_selected')
    $('#website').addClass('opacity0')
    setTimeout(()=>{
        $('#website').removeClass('opacity0')
        set_page_setup_vars();
        $('#website').scrollTop(0)
        if(window.selected){
            try{
                $('#website').scrollTop(($('#website').find(`[key_tree="${window.selected}"]`).offset().top) - ($('#website').offset().top) - 300)
            }catch{}
            fix_edit_btns_position(get_element_data(window.selected),window.selected);
        }
        set_editor_popup_editor();
    },500)
    window.template.settings.view = 'desktop';
    render('all');
}
view_toggle = function(){
    if(!$('.desktop_view').hasClass('mobile_view')){
        mobile_view();
    }else{
        desktop_view()
    }
}
//events
$('body').on('click','.preview_languages_elem',function(e){
    window.preview_language = $(this).attr('key');
    hide_builder_header_menu(true);
    set_website_variable_data();
    set_page_setup_vars();
    render('all');
    set_all_editors();
    window.history.pushState({},'',`/?template_id=${window.template_id}&preview_language=${window.preview_language}`)
    $('.show_builder_header_menu[menu="preview_languages"]').children().first().text(window.website_data.languages[$(this).attr('key')].name)
})
//
$('body').on('click','.website_style_elem',function(e){
    hide_builder_header_menu(true);
    show_editor_popup($(this).attr('elem'));
})
$('body').on('click','.website_tools_elem',function(e){
    hide_builder_header_menu(true);
    if($(this).attr('key') == 'website_header'){
        select('website_header');
        draw_editor_popup_header_settings()
    }else if($(this).attr('key') == 'popup_window'){
        open_website_popup(null);
        select('popup_window.children.popup_card');
        draw_editor_popup_popup_widnow();
    }else{
        show_editor_popup($(this).attr('key'));
    }
});
$('body').on('click','.website_form_elem',function(){
    hide_builder_header_menu(true);
    show_website_form(window.template.settings.selected_website_form)
    // open_website_popup(window.template.settings.selected_website_form);
})
$('body').on('click','.select_website_page',function(e){
    set_page($(this).attr('key'))
    hide_builder_header_menu(true)
})
$('body').on('click','.select_website_popup',function(e){
    hide_builder_header_menu(true)
    open_website_popup($(this).attr('key'))
    $('.current_page_name').text(texts.website_pages[window.template.settings.selected_popup])
})
//
$('body').on('click','.set_view_desktop',function(e){
    desktop_view();
})
$('body').on('click','.set_view_mobile',function(e){
    mobile_view();
})
//
$('body').on('click','.set_preview_mode',function(e){
    preview_mode_toggle();
})
$('body').on('click','.set_show_metrics',function(e){
    heighlight_all_toggle();
})
//
var startX, startY, scrollTop;
window.mobile_view_scroll = {
    scroll:false,
    startX:0,
    startY:0,
    scrollTop:0,
}
$('body').on('mousedown','img',function(e){
    e.preventDefault();
})
$('body').on('mousedown','.mobile_view', function(event) {
    if(
        window.edit_padding_top.key_tree !== undefined ||
        window.edit_padding_top_section.key_tree !== undefined ||
        window.edit_padding_bottom.key_tree !== undefined ||
        window.edit_padding_bottom_section.key_tree !== undefined ||
        window.edit_margin_top.key_tree !== undefined ||
        window.edit_margin_top_section.key_tree !== undefined ||
        window.edit_margin_bottom.key_tree !== undefined ||
        window.edit_margin_bottom_section.key_tree !== undefined 

    ){return;}
    hide_edit_btns();
    window.mobile_view_scroll.scroll = true;
    window.mobile_view_scroll.startX = event.pageX;
    window.mobile_view_scroll.startY = event.pageY;

    if(window.template.settings.website_popup_opened == '1'){
        window.mobile_view_scroll.scrollTop = $('#website').find('.popup_container').scrollTop();
        window.mobile_view_scroll.scrollLeft = $('#website').find('.popup_container').scrollLeft();
    }else{
        window.mobile_view_scroll.scrollTop = $('#website').scrollTop();
        window.mobile_view_scroll.scrollLeft = $('#website').scrollLeft();
    }
});
$('body').on('mouseup', function(event) {
    if(window.mobile_view_scroll.scroll){
        window.mobile_view_scroll.scroll = false;
        show_edit_btns(window.selected)
    }
});
$('body').on('mousemove','.mobile_view', function(e) {
    if(!window.mobile_view_scroll.scroll){return;}
    e.preventDefault();
    let newX = e.pageX;
    let newY = e.pageY;
    let swipeDistanceY = newY - window.mobile_view_scroll.startY;
    let swipeDistanceX = newX - window.mobile_view_scroll.startX;
    if(window.template.settings.website_popup_opened == '1'){
        $('#website').find('.popup_container').scrollTop(window.mobile_view_scroll.scrollTop - swipeDistanceY);
        $('#website').find('.popup_container').scrollLeft(window.mobile_view_scroll.scrollLeft - swipeDistanceX);
    }else{
        $('#website').scrollTop(window.mobile_view_scroll.scrollTop - swipeDistanceY);
        $('#website').scrollLeft(window.mobile_view_scroll.scrollLeft - swipeDistanceX);
    }
});
//
$('body').on('mousedown','.resize_mobile_view',function(e){
    e.preventDefault();
    $('.mobile_view').attr('onresize','true');
    $('.mobile_view').attr('gapX_resize', (e.pageX * 2) );
    $('.mobile_view').attr('gapY_resize', (e.pageY) );

})
$('body').on('mouseup',function(e){
    $('.mobile_view').attr('onresize','false');
    $('.mobile_view').css('transition-duration','')
    $('.mobile_view').attr('tooltip',``)
})
$('body').on('mousemove',function(e){
    // e.preventDefault();
    //e.stopImmediatePropagation();
    if( $('.mobile_view').attr('onresize') == 'true' ){
        $('.mobile_view').css('transition-duration','0ms')

        $('.mobile_view').css({
            width:( ($('.mobile_view').attr('gapX_resize') - (e.pageX * 2)) * - 1 ) + $('.mobile_view').width(),
            height:( ($('.mobile_view').attr('gapY_resize') - (e.pageY)) * - 1 ) + $('.mobile_view').height(),
        });
        $('.mobile_view').attr('gapX_resize', e.pageX * 2);
        $('.mobile_view').attr('gapY_resize', e.pageY );


        if($('.mobile_view').width() >= window.template.page_setup.mobile_max_width.replace('px','')){
            $('.mobile_view').css('width',window.template.page_setup.mobile_max_width)
        }else if($('.mobile_view').width() <= 350 ){
            $('.mobile_view').css('width','350px')
        }
        window.template.settings.mobile_view_height = $('.mobile_view').height();
        window.template.settings.mobile_view_width = $('.mobile_view').width();
        $('.mobile_view').attr('tooltip',`${window.template.settings.mobile_view_width}/${window.template.settings.mobile_view_height}`)
    }
})
//
$('body').on('click','.report_bug',function(){
    show_popup(function(){
        $('.popupTitle').text(texts.report_bug)
        $('.popupCard').addClass('popupCard2 w400').removeClass('popupCard')
        $('.popupBody').append(
            drawTextArea('','ico-description','',texts.describeBug,'reportBugMsg','1000',''),
            $('<div/>',{class:'row alnC jstfyE mT20'}).append(
                $('<button/>',{class:'btn',id:'reportBugBtn'}).append(
                    $('<div/>',{class:'btnLoading'}),
                    $('<div/>',{class:'btnTxt',text:texts.report})
                )
            )
        )
    })
})
$('html,body').on('click','#reportBugBtn',function(e){
    e.stopImmediatePropagation();
    if($('#reportBugMsg').val() == ''){
        showAlert('error',texts.describeBug,4000,true)
        textareaError($('#reportBugMsg'))
        $('#reportBugMsg').select();
        return;
    }
    showBtnLoading($('#reportBugBtn'));
    $.ajax({
        url:'api',
        type:'post',
        data:{
            reportBug:$('#reportBugMsg').val(),
        },
        success:function(response){
            hideBtnLoading($('#reportBugBtn'));
            if(response.reportBugStatus == 1){
                showAlert('success',response.msg,4000,true);
                $('#reportBugMsg').val('').trigger('input');
                close_popup();
            }else if(response.reportBugStatus == 0){
                showAlert('error',response.msg,4000,true);
            }
        }
    })

})
