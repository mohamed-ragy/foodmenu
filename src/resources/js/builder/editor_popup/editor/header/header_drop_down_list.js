draw_editor_header_drop_down_list = function(){
    if(!accessibility_check(window.selected,'header_drop_down_list')){return;}
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:false,
                editors:[
                    $('<div/>',{class:'editor_popup_row editor_popup_brdrT_none pointer editor_header_drop_down_list_item select',key_tree:'website_header.children.header_drop_down_list_item'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.drop_down_list_item}),
                        $('<div/>',{class:'fs08 ico-arrowRight'})
                    ),
                    $('<div/>',{class:'editor_popup_col'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.gap_between_items}),
                        draw_number_picker({
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'gap',
                            units:['px'],
                        })
                    ),
                ]
            })
        )
        setTimeout(()=>{
            $('.editor_popup_title2').text('')
            $(`.editor_popup_body_shortcut.editor_header_drop_down_list`).addClass('editor_popup_body_shortcut_selected')
        });
    })
}
draw_editor_header_drop_down_list_item = function(){
    if(!accessibility_check(window.selected,'header_drop_down_list_item')){return;}
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:false,
                interactions:['hover','click'],
                editors:[
                    $('<div/>',{class:'w100p editor_popup_container',key:'header_drop_down_list_item'}).append(
                        $('<div/>',{class:'editor_popup_row editor_popup_brdrT_none'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.text_color}),
                            draw_color_picker({
                                key_tree:window.selected,
                                variable_key:'css',
                                key:'color',
                            })
                        ),
                        draw_editor_show_container({key:'header_drop_down_list_font_style',name:texts.styling.font_style,row_class:true,container_class:''}),
                        $('<div/>',{class:'editor_popup_col'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.font_size}),
                            draw_number_picker({
                                key_tree:window.selected,
                                variable_key:'css',
                                key:'font-size',
                                units:['px','em']
                            })
                        ),
                        $('<div/>',{class:'editor_popup_col'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.font_weight}),
                            draw_select_box({
                                key_tree:window.selected,
                                variable_key:'css',
                                key:'font-weight',
                                selections:[{text:texts.styling.bold,key:'bold'},{text:texts.styling.normal,key:'normal'}],
                            })
                        ),
                        $('<div/>',{class:'editor_popup_col'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.italic}),
                            draw_select_box({
                                key_tree:window.selected,
                                variable_key:'css',
                                key:'font-style',
                                selections:[{text:texts.styling.italic,key:'italic'},{text:texts.styling.normal,key:'normal'}],
                            })
                        ),
                        $('<div/>',{class:'editor_popup_col'}).append(
                            $('<div/>',{class:'fs09',text:texts.styling.underline}),
                            draw_select_box({
                                key_tree:window.selected,
                                variable_key:'css',
                                key:'text-decoration',
                                selections:[{text:texts.styling.underline,key:'underline'},{text:texts.styling.normal,key:'none'}],
                            })
                        ),
                    ),
                    $('<div/>',{class:'w100p editor_popup_container none',key:'header_drop_down_list_font_style',parent_key:'header_drop_down_list_item'}).append(
                        draw_font_style_picker({
                            key_tree:'website_header.children.header_drop_down_list',
                            variable_key:'font_style',
                        })
                    )
                ]
            })
        )
        setTimeout(()=>{
            $('.editor_popup_title2').text('')
            $(`.editor_popup_body_shortcut.editor_header_drop_down_list_item`).addClass('editor_popup_body_shortcut_selected')
        })
    })
}
$('body').on('click','.editor_header_drop_down_list',function(e){
    if(window.current_view !== 'desktop'){
        desktop_view();
    }
    // select('website_header.children.header_drop_down_list')
    draw_editor_header_drop_down_list();
})
$('body').on('click','.editor_header_drop_down_list_item',function(e){
    if(window.current_view !== 'desktop'){
        desktop_view();
    }
    // select('website_header.children.header_drop_down_list_item')
    draw_editor_header_drop_down_list_item();
})
show_header_drop_down_list = function(list){
    hide_header_drop_down_list();
    $('.header_drop_down_list').text('')
    // let list_item_style = generate_style(get_element_data('website_header.children.header_drop_down_list_item')).desktop;
    // let list_item_style = 
    // generate_style(get_element_data('website_header.children.header_drop_down_list_item'));
    switch(list){
        case 'foodmenu':
            for(const key in window.website_data.categories){
                let category = window.website_data.categories[key];
                $('.header_drop_down_list').append(
                    $('<a/>',{
                        class:'header_drop_down_list_item',
                        hover_style:'website_header.children.header_drop_down_list_item',
                        click_style:'website_header.children.header_drop_down_list_item',
                        // href:`/${category.name}`,
                        text:category.names[window.preview_language],
                    })
                )
            }
        break;
        case 'user':
            $('.header_drop_down_list').append(
                $('<a/>',{
                    class:'header_drop_down_list_item',
                    hover_style:'website_header.children.header_drop_down_list_item',
                    click_style:'website_header.children.header_drop_down_list_item',
                    text:window.website_texts.text.authentication.login,
                }),
                $('<a/>',{
                    class:'header_drop_down_list_item',
                    hover_style:'website_header.children.header_drop_down_list_item',
                    click_style:'website_header.children.header_drop_down_list_item',
                    text:window.website_texts.text.authentication.signup,
                })
            )
        break;
        case 'language':
            for(const key in window.website_data.languages){
                let language = window.website_data.languages[key];
                $('.header_drop_down_list').append(
                    $('<a/>',{
                        class:'header_drop_down_list_item',
                        hover_style:'website_header.children.header_drop_down_list_item',
                        click_style:'website_header.children.header_drop_down_list_item',
                        style:`display:flex;align-items:center;justify-content:flex-start;`,
                    }).append(
                        $('<img/>',{style:'margin-inline-end:10px;width:20px;height:20px;border-radius:50%;object-fit:cover;',src:`/storage/imgs/flags/${language.flag}.png`}),
                        $('<span/>',{text:language.name})
                    ),
                )
            }
        break;
        case 'see_more':
            $('.header_navList').children().each(function(){
                if(!$(this).hasClass('header_drop_down_list') && !$(this).hasClass('header_list_see_more') && !$(this).hasClass('header_list_foodmenu')){
                    if($(this).hasClass('none')){
                        $('.header_drop_down_list').append(
                            $('<a/>',{
                                class:'header_drop_down_list_item',
                                hover_style:'website_header.children.header_drop_down_list_item',
                                click_style:'website_header.children.header_drop_down_list_item',
                                text:$(this).children().first().text(),
                            }),
                        )
                    }
                }
            })

        break;
    }
    $('.header_drop_down_list').removeClass('none').css({
        'top':$(`.show_header_drop_down_list[header_list="${list}"]`).offset().top + $(`.show_header_drop_down_list[header_list="${list}"]`).outerHeight() + 5,
        'left':$(`.show_header_drop_down_list[header_list="${list}"]`).offset().left,
    })
    if($('.header_drop_down_list').offset().left + $('.header_drop_down_list').outerWidth() > $(window).width()){
        $('.header_drop_down_list').css({
            'left':$(window).width() - $('.header_drop_down_list').outerWidth(),
        })
    }
    $('.header_drop_down_list').addClass(window.template.website_header.children.header_drop_down_list.transition)
}
hide_header_drop_down_list = function(){
    $('.header_drop_down_list').removeClass(window.template.website_header.children.header_drop_down_list.transition).addClass('none')

}
$('body').on('mouseleave','.website_header, .header_drop_down_list',function(e){
    if(window.selected !== 'website_header.children.header_drop_down_list_item' && window.selected !== 'website_header.children.header_drop_down_list'){
        hide_header_drop_down_list();
    }
})
$('body').on('mouseenter','.show_header_drop_down_list, .preview_header_drop_down_list',function(e){
    show_header_drop_down_list($(this).attr('header_list'));
})