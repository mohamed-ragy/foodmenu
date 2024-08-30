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
    create_editor_popup('loading_spinner').then(()=>{draw_loading_spinner()});
    //
    create_editor_popup('editor')
    //
    draw_builder_header();
    set_page('home')
    window.template.settings.view == 'desktop' ? desktop_view() : window.template.settings.view == 'mobile' ? mobile_view() : desktop_view();
    // set_template_vars();
    window.last_saved_template = JSON.parse(JSON.stringify(window.template));

    setTimeout(()=>{
        // set_popup('login_popup')
        // show_popup_window();
        // window.selected = 'home.0.children.section_wrapper.children.0.children.0'
        // show_editor_popup('page_setup');
        // draw_editor_popup_text();
    },1000)

}
//
draw_builder_header = function(){
    $('.builder_header').text('').removeClass('none').append(
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
            $('<div/>',{class:'select_website_page',key:'privacy_policy',text:texts.website_pages.privacy_policy}),
            $('<div/>',{class:'select_website_page',key:'signup',text:texts.website_pages.signup}),
            $('<div/>',{class:'select_website_popup',key:'login_popup',text:texts.website_pages.login_popup}),
            $('<div/>',{class:'select_website_page',key:'user_profile',text:texts.website_pages.user_profile,style:'border:none'}),

        ),
        $('<div/>',{class:'website_tools_container none'}).append(
            $('<div/>',{class:'fs101 bold mY5  inter',text:texts.website_tools.websiteTools}),
            $('<div/>',{class:'fs09 c_white-11',text:texts.website_tools.website_tools_des}),
            $('<div/>',{class:'website_tools_elem',key:'website_header',text:texts.website_tools.header}),
            $('<div/>',{class:'website_tools_elem',key:'footer',text:texts.website_tools.footer}),
            $('<div/>',{class:'website_tools_elem',key:'mobileNav',text:texts.website_tools.mobileNav}),
            $('<div/>',{class:'website_tools_elem',key:'popup_window',text:texts.website_tools.popup_window}),
            $('<div/>',{class:'website_tools_elem',key:'live_chat',text:texts.website_tools.live_chat}),
            $('<div/>',{class:'website_tools_elem brdrB0',key:'announcement',text:texts.website_tools.announcement}),
        ),
        $('<div/>',{class:'website_style_container none'}).append(
            $('<div/>',{class:'fs101 bold mY5  inter',text:texts.website_style.websiteStyle}),
            $('<div/>',{class:'fs09 c_white-11',text:texts.website_style.websiteStyle_des}),
            $('<div/>',{class:'website_style_elem website_style_elem_css mT20',elem:'website_colors',text:texts.website_style.website_colors}),
            $('<div/>',{class:'website_style_elem website_style_elem_css',elem:'page_setup',text:texts.website_style.page_setup}),
            $('<div/>',{class:'website_style_elem website_style_elem_css brdrB0',elem:'loading_spinner',text:texts.website_style.loading_spinner}),
        ),
        $('<div/>',{class:'preview_languages_container none'}).append(
            $('<div/>',{class:'fs101 bold mY5  inter',text:texts.preview_language}),
            // loop down and add lang elems and dont forget to style it and then add the events
        ),
        $('<div/>',{class:'row alnC jstfyC'}).append(
            $('<div/>',{class:'header_icon ico-folder showSelectTemplate',tooltip:texts.selectTemplate}),
            $('<div/>',{class:'mX5 c_white-11 fs105',text:'|'}),
            $('<div/>',{class:'header_icon ico-style showWebsiteStyle',tooltip:texts.website_style.websiteStyle}),
            $('<div/>',{class:'mX5 c_white-11 fs105',text:'|'}),
            $('<div/>',{class:'header_icon ico-website_tools showWebsiteTools',tooltip:texts.website_tools.websiteTools}),
            $('<div/>',{class:'mX5 c_white-11 fs105',text:'|'}),
            $('<div/>',{class:'header_icon2 showWebsitePages row alnC jsfySB'}).append(
                $('<div/>',{class:'mnw200 website_page_name'}),
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
            $('<div/>',{class:'header_icon2 showWebsitePreviewLangs row alnC jsfySB',tooltip:texts.preview_language}).append(
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
        $('.preview_languages_container').append(
            $('<div/>',{class:'preview_languages_elem',key:window.website_data.languages[key].code,html:`${window.website_data.languages[key].name} <span class="fs09 c_white-10">( Ctrl + ${i} )</span>`})
        )
    }
}

show_website_pages_menu = function(){
    $('.website_pages_container').css({
        'top': $('header').height() + 2,
        'left' : $('.showWebsitePages').offset().left
    }).removeClass('none');
    $('.showWebsitePages').addClass('header_icon_selected')
}
hide_website_pages_menu = function(force=false){
    if($('.website_pages_container:hover').length == 0 && $('.showWebsitePages:hover').length == 0 || force){
        $('.website_pages_container').addClass('none')
        $('.showWebsitePages').removeClass('header_icon_selected')
    }
}
//
show_website_style_menu = function(){
    $('.website_style_container').css({
        'top': $('header').height() + 2,
        'left' : $('.showWebsiteStyle').offset().left
    }).removeClass('none');
    $('.showWebsiteStyle').addClass('header_icon_selected')
}
hide_website_style_menu = function(force=false){
    if($('.website_style_container:hover').length == 0 && $('.showWebsiteStyle:hover').length == 0 || force){
        $('.website_style_container').addClass('none')
        $('.showWebsiteStyle').removeClass('header_icon_selected')
    }
}
//
show_website_tools_menu = function(){
    $('.website_tools_container').css({
        'top': $('header').height() + 2,
        'left' : $('.showWebsiteTools').offset().left
    }).removeClass('none');
    $('.showWebsiteTools').addClass('header_icon_selected')
}
hide_website_tools_menu = function(force=false){
    if($('.website_tools_container:hover').length == 0 && $('.showWebsiteTools:hover').length == 0 || force){
        $('.website_tools_container').addClass('none')
        $('.showWebsiteTools').removeClass('header_icon_selected')
    }
}
//
show_preview_languages_menu = function(){
    $('.preview_languages_container').css({
        'top': $('header').height() + 2,
        'left' : $('.showWebsitePreviewLangs').offset().left
    }).removeClass('none');
    $('.showWebsitePreviewLangs').addClass('header_icon_selected')
}
hide_show_preview_languages_menu = function(force=false){
    if($('.preview_languages_container:hover').length == 0 && $('.showWebsitePreviewLangs:hover').length == 0 || force){
        $('.preview_languages_container').addClass('none')
        $('.showWebsitePreviewLangs').removeClass('header_icon_selected')
    }
}
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

        // if(window.website_popup_opened){
        //     show_popup_window();
        // }else{
        //     hide_popup_window();
        // }

        $('#website').scrollTop(0)
        if(window.selected){
            $('#website').scrollTop(($('#website').find(`[key_tree="${window.selected}"]`).offset().top) - ($('#website').offset().top) - 300)
        }
        set_editor_popup_editor();
    },500)
    window.template.settings.view = 'mobile';
    render_all();
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
        // if(window.website_popup_opened){
        //     show_popup_window();
        // }else{
        //     hide_popup_window()
        // }
        $('#website').scrollTop(0)
        if(window.selected){
            $('#website').scrollTop(($('#website').find(`[key_tree="${window.selected}"]`).offset().top) - ($('#website').offset().top) - 300)
        }
        set_editor_popup_editor();
    },500)
    window.template.settings.view = 'desktop';
    render_all();
}



view_toggle = function(){
    if(!$('.desktop_view').hasClass('mobile_view')){
        mobile_view();
    }else{
        desktop_view()
    }
}
//events
$('body').on('click','.showWebsitePreviewLangs',function(e){
    // e.stopImmediatePropagation();
    show_preview_languages_menu();
})
$('body').on('click','.preview_languages_elem',function(e){
    window.preview_language = $(this).attr('key');
    hide_show_preview_languages_menu(true);
    set_website_variable_data()
    render_all();
    window.history.pushState({},'',`/?template_id=${window.template_id}&preview_language=${window.preview_language}`)
    $('.showWebsitePreviewLangs').children().first().text(window.website_data.languages[$(this).attr('key')].name)
})
//
$('body').on('click','.showWebsitePages',function(e){
    // e.stopImmediatePropagation();
    show_website_pages_menu();
})
$('body').on('click','.showWebsiteStyle',function(e){
    // e.stopImmediatePropagation();
    show_website_style_menu();
})
$('body').on('click','.showWebsiteTools',function(e){
    // e.stopImmediatePropagation();
    show_website_tools_menu();
})
//
$('body').on('click','.website_style_elem',function(e){
    // e.stopImmediatePropagation();
    console.log($(this).attr('elem'))
    hide_website_style_menu(true);
    show_editor_popup($(this).attr('elem'));
    // if($(this).attr('elem') == 'loading_spinner'){
    //     get_loading_spinners();
    // }
})
$('body').on('click','.website_tools_elem',function(e){
    hide_website_tools_menu(true);
    if($(this).attr('key') == 'website_header'){
        select('website_header');
        draw_editor_popup_header_settings()
    }else if($(this).attr('key') == 'popup_window'){
        window.selected_popup = 'popup_window';
        $('.showWebsitePages').find('.website_page_name').text(texts.website_pages[window.selected_page])
        show_popup_window();
        select('popup_window.children.popup_card');
        draw_editor_popup_popup_widnow();
    }else{
        show_editor_popup($(this).attr('key'));
    }

})
$('body').on('click','.select_website_page',function(e){
    // e.stopImmediatePropagation();
    set_page($(this).attr('key'))
    hide_website_pages_menu(true)
})
$('body').on('click','.select_website_popup',function(e){
    // e.stopImmediatePropagation();
    set_popup($(this).attr('key'))
    hide_website_pages_menu(true)
})
//
$('body').on('click','.set_view_desktop',function(e){
    // e.stopImmediatePropagation();
    desktop_view();
})
$('body').on('click','.set_view_mobile',function(e){
    // e.stopImmediatePropagation();
    mobile_view();
})
//
$('body').on('click','.set_preview_mode',function(e){
    // e.stopImmediatePropagation();
    preview_mode_toggle();
})
$('body').on('click','.set_show_metrics',function(e){
    // e.stopImmediatePropagation();
    heighlight_all_toggle();
})
//
var startX, startY, scrollTop;
window.mobile_view_scroll = {
    scroll:false,
    // startX:0,
    startY:0,
    scrollTop:0,
}
$('body').on('mousedown','img',function(e){
    e.preventDefault();
})
$('body').on('mousedown','.mobile_view', function(event) {
    if(
        $('.edit_padding_top_section:hover').length > 0 ||
        $('.edit_padding_bottom_section:hover').length > 0 ||
        $('.edit_padding_right_section:hover').length > 0 ||
        $('.edit_padding_left_section:hover').length > 0 ||

        $('.edit_margin_top_section:hover').length > 0 ||
        $('.edit_margin_bottom_section:hover').length > 0 ||
        $('.edit_margin_right_section:hover').length > 0 ||
        $('.edit_margin_left_section:hover').length > 0 ||

        $('.edit_padding_top_section:hover').length > 0 ||
        $('.edit_padding_bottom_section:hover').length > 0 ||
        $('.edit_margin_top_section:hover').length > 0 ||
        $('.edit_margin_bottom_section:hover').length > 0
    ){return;}
    window.mobile_view_scroll.scroll = true;
    // window.mobile_view_scroll.startX = event.pageX;
    window.mobile_view_scroll.startY = event.pageY;
    window.mobile_view_scroll.scrollTop = $('#website').scrollTop();
    window.mobile_view_scroll.scrollLeft = $('#website').scrollLeft();
});
$('body').on('mouseup', function(event) {
    window.mobile_view_scroll.scroll = false;
});
$('body').on('mousemove','.mobile_view', function(e) {
    if(!window.mobile_view_scroll.scroll){return;}
    // let newX = e.pageX;
    let newY = e.pageY;
    let swipeDistanceY = newY - window.mobile_view_scroll.startY;
    // let swipeDistanceX = newX - window.mobile_view_scroll.startX;
    // if (Math.abs(swipeDistanceY) > Math.abs(newX - window.mobile_view_scroll.startX)) {
    e.preventDefault();
    // e.stopImmediatePropagation();
    $('#website').scrollTop(window.mobile_view_scroll.scrollTop - swipeDistanceY);
    // $('#website').scrollLeft(window.mobile_view_scroll.scrollLeft - swipeDistanceX);
    // }
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
