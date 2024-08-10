require('./draw_header.js')
require('./header_logo.js')


require('./draw_header_editor.js')// need to be removed

//events
$('body').on('dblclick','.website_header',function(e){
    if($('.header_navList:hover').length > 0){return}
    if($('.header_logo:hover').length > 0){return}
    if($('.header_iconsList:hover').length > 0){return}
    draw_editor_popup_header_settings()
})
$('body').on('contextmenu','.website_header',function(e){
    if($('.header_navList:hover').length > 0){return}
    if($('.header_logo:hover').length > 0){return}
    if($('.header_iconsList:hover').length > 0){return}
    show_contextMenu('website_header',$(this).attr('key_tree'),{x:e.pageX,y:e.pageY})
})
$('body').on('click','.website_header',function(e){
    if($('.header_navList:hover').length > 0){return}
    if($('.header_logo:hover').length > 0){return}
    if($('.header_iconsList:hover').length > 0){return}
    select($(this).attr('key_tree'));
})
//
$('body').on('dblclick','.header_logo',function(e){
    draw_editor_popup_header_logo_alignment()
})
$('body').on('dblclick','.header_navList ',function(e){
    draw_editor_popup_header_navList()
})
$('body').on('contextmenu','.header_component',function(e){
    show_contextMenu('header_component',$(this).attr('key_tree'),{x:e.pageX,y:e.pageY})
})
$('body').on('click','.header_component',function(e){
    select($(this).attr('key_tree'));
})
// $('body').on('click','.header_preview_container',function(e){
//     //e.stopImmediatePropagation();
//     let layout = window.header_layouts[$(this).attr('key')];
//     for(const key in layout.container){
//         window.template.website_header.elems.children.header_wrapper.css[key] = layout.container[key];
//     }
//     for(const key in layout.elem1){
//         window.template.website_header.elems.children.header_wrapper.children.header_logo.css[key] = layout.elem1[key];
//     }
//     for(const key in layout.elem2){
//         window.template.website_header.elems.children.header_wrapper.children.header_navList.css[key] = layout.elem2[key];
//     }
//     for(const key in layout.elem3){
//         window.template.website_header.elems.children.header_wrapper.children.header_iconsList.css[key] = layout.elem3[key];
//     }
//     new_action();
// })
// //
// $('body').on('mousedown','.header_nav_list_sorter',function(e){
//     //e.stopImmediatePropagation();
//     if($('.header_nav_list_sorter_div').length == 0){
//         $('.edit_header_navList_container').append(
//             $('<div/>',{class:'editor_popup_row header_nav_list_sorter_div',item_sort:$(this).attr('item_sort'),style:'position:absolute;top:0;left:0;width:100%'}).append(
//                 $(this).closest('.editor_popup_row').html()
//             )
//         )
//         $('.header_nav_list_sorter_div').css({'top':(parseFloat(e.pageY) - parseFloat($('.edit_header_navList_container').offset().top) - 15)+'px'})
//     }
// })
// $('body').on('mousemove','.edit_header_navList_container',function(e){
//     //e.stopImmediatePropagation();
//     if($('.header_nav_list_sorter_div').length > 0){
//         $('.header_nav_list_sorter_div').css({'top':(parseFloat(e.pageY) - parseFloat($('.edit_header_navList_container').offset().top) - 15)+'px'})
//     }
// })
// $('body').on('mouseleave','.edit_header_navList_container',function(e){
//     //e.stopImmediatePropagation();
//     if($('.header_nav_list_sorter_div').length > 0){
//         $('.header_nav_list_sorter_div').remove();
//     }
// })
// $('body').on('mouseup','.header_nav_list_sorter_div',function(e){
//     //e.stopImmediatePropagation();
//         let from_key_tree = $('.header_nav_list_sorter_div').find('.header_nav_list_sorter').attr('key_tree');
//         let from_sort = $('.header_nav_list_sorter_div').find('.header_nav_list_sorter').attr('item_sort');
//         let to_key_tree;
//         let to_sort;
//         $('.edit_header_navList_container').children().each(function(e){
//             if($(this).offset().top < $('.header_nav_list_sorter_div').offset().top && (parseFloat($(this).offset().top) + parseFloat($(this).outerHeight())) > $('.header_nav_list_sorter_div').offset().top){
//                 to_key_tree = $(this).find('.header_nav_list_sorter').attr('key_tree');
//                 to_sort = $(this).find('.header_nav_list_sorter').attr('item_sort');
//             }
//         })
//         get_key_tree(from_key_tree).elem.sort = to_sort;
//         get_key_tree(to_key_tree).elem.sort = from_sort;
//         new_action();
// })
// //
// $('body').on('mousedown','.header_icon_list_sorter',function(e){
//     //e.stopImmediatePropagation();
//     if($('.header_icon_list_sorter_div').length == 0){
//         $('.edit_header_iconList_container').append(
//             $('<div/>',{class:'editor_popup_row header_icon_list_sorter_div',icon_sort:$(this).attr('icon_sort'),style:'position:absolute;top:0;left:0;width:100%'}).append(
//                 $(this).closest('.editor_popup_row').html()
//             )
//         )
//         $('.header_icon_list_sorter_div').css({'top':(parseFloat(e.pageY) - parseFloat($('.edit_header_iconList_container').offset().top) - 15)+'px'})
//     }
// })
// $('body').on('mousemove','.edit_header_iconList_container',function(e){
//     //e.stopImmediatePropagation();
//     if($('.header_icon_list_sorter_div').length > 0){
//         $('.header_icon_list_sorter_div').css({'top':(parseFloat(e.pageY) - parseFloat($('.edit_header_iconList_container').offset().top) - 15)+'px'})
//     }
// })
// $('body').on('mouseleave','.edit_header_iconList_container',function(e){
//     //e.stopImmediatePropagation();
//     if($('.header_icon_list_sorter_div').length > 0){
//         $('.header_icon_list_sorter_div').remove();
//     }
// })
// $('body').on('mouseup','.header_icon_list_sorter_div',function(e){
//     //e.stopImmediatePropagation();
//         let from_key_tree = $('.header_icon_list_sorter_div').find('.header_icon_list_sorter').attr('key_tree');
//         let from_sort = $('.header_icon_list_sorter_div').find('.header_icon_list_sorter').attr('icon_sort');
//         let to_key_tree;
//         let to_sort;
//         $('.edit_header_iconList_container').children().each(function(e){
//             if($(this).offset().top < $('.header_icon_list_sorter_div').offset().top && (parseFloat($(this).offset().top) + parseFloat($(this).outerHeight())) > $('.header_icon_list_sorter_div').offset().top){
//                 to_key_tree = $(this).find('.header_icon_list_sorter').attr('key_tree');
//                 to_sort = $(this).find('.header_icon_list_sorter').attr('icon_sort');
//             }
//         })
//         get_key_tree(from_key_tree).elem.sort = to_sort;
//         get_key_tree(to_key_tree).elem.sort = from_sort;
//         new_action();
// })
// //

// show_header_drop_down = function(list){
//     $('.header_drop_down_list').text('')
//     let item_style = `font-family:var(--${window.template.website_header.header_drop_down_list_item.font_style}_name);line-height:var(--${window.template.website_header.header_drop_down_list_item.font_style}_line_height);letter-spacing:var(--${window.template.website_header.header_drop_down_list_item.font_style}_letter_spacing);`;
//     let item_style_hover = `font-family:var(--${window.template.website_header.header_drop_down_list_item.font_style}_name);line-height:var(--${window.template.website_header.header_drop_down_list_item.font_style}_line_height);letter-spacing:var(--${window.template.website_header.header_drop_down_list_item.font_style}_letter_spacing);`;
//     for(const key2 in window.template.website_header.header_drop_down_list_item.css){
//         item_style = `${item_style}${key2}:${key2,window.template.website_header.header_drop_down_list_item.css[key2]};`
//         item_style_hover = `${item_style_hover}${key2}:${key2,window.template.website_header.header_drop_down_list_item.css[key2]};`
//     }
//     for(const key2 in window.template.website_header.header_drop_down_list_item.css_hover){
//         item_style_hover = `${item_style_hover}${key2}:${key2,window.template.website_header.header_drop_down_list_item.css_hover[key2]};`
//     }
//     switch(list){
//         case 'foodmenu':
//             for(const key in window.website_data.categories){
//                 let category = window.website_data.categories[key];
//                 $('.header_drop_down_list').append(
//                     $('<a/>',{
//                         class:'header_drop_down_list_item',
//                         style:item_style,href:`/${category.name}`,
//                         style_desktop:item_style,
//                         href:`/${category.name}`,
//                         style_hover:item_style_hover,
//                         text:category.names[window.preview_language],
//                         onmouseenter:"$(this).attr('style',$(this).attr('style_hover'))",
//                         onmouseleave:"$(this).attr('style',$(this).attr('style_desktop'))"
//                     })
//                 )
//             }

//         break;
//         case 'user':
//             $('.header_drop_down_list').append(
//                 $('<a/>',{
//                     class:'header_drop_down_list_item',
//                     style:item_style,
//                     style_desktop:item_style,
//                     style_hover:item_style_hover,
//                     text:window.website_texts.text.authentication.login,
//                     onmouseenter:"$(this).attr('style',$(this).attr('style_hover'))",
//                     onmouseleave:"$(this).attr('style',$(this).attr('style_desktop'))"
//                 }),
//                 $('<a/>',{
//                     class:'header_drop_down_list_item',
//                     style:item_style,
//                     style_desktop:item_style,
//                     style_hover:item_style_hover,
//                     text:window.website_texts.text.authentication.signup,
//                     onmouseenter:"$(this).attr('style',$(this).attr('style_hover'))",
//                     onmouseleave:"$(this).attr('style',$(this).attr('style_desktop'))"
//                 })
//             )
//         break;
//         case 'language':
//             for(const key in window.website_data.languages){
//                 let language = window.website_data.languages[key];
//                 $('.header_drop_down_list').append(
//                     $('<a/>',{
//                         class:'header_drop_down_list_item',
//                         style:item_style,
//                         style_desktop:item_style,
//                         style_hover:item_style_hover,
//                         text:language.name,
//                         onmouseenter:"$(this).attr('style',$(this).attr('style_hover'))",
//                         onmouseleave:"$(this).attr('style',$(this).attr('style_desktop'))"
//                     }),
//                 )
//             }
//         break;
//         case 'see_more':
//             $('.header_navList').children().each(function(){
//                 if(!$(this).hasClass('header_drop_down_list') && !$(this).hasClass('header_list_see_more') && !$(this).hasClass('header_list_foodmenu')){
//                     if($(this).hasClass('none')){
//                         $('.header_drop_down_list').append(
//                             $('<a/>',{
//                                 class:'header_drop_down_list_item open_page',
//                                 page:$(this).children().first().attr('page'),
//                                 style:item_style,
//                                 style_desktop:item_style,
//                                 style_hover:item_style_hover,
//                                 text:$(this).children().first().text(),
//                                 onmouseenter:"$(this).attr('style',$(this).attr('style_hover'))",
//                                 onmouseleave:"$(this).attr('style',$(this).attr('style_desktop'))"
//                             }),
//                         )
//                     }
//                 }
//             })

//         break;
//     }
//     $('.header_drop_down_list').removeClass('none').css({
//         'top':$(`.show_header_drop_down_list[header_list="${list}"]`).position().top + $(`.show_header_drop_down_list[header_list="${list}"]`).outerHeight(),
//         'left':$(`.show_header_drop_down_list[header_list="${list}"]`).offset().left,
//     })
//     if($('.header_drop_down_list').offset().left + $('.header_drop_down_list').outerWidth() > $(window).width()){
//         $('.header_drop_down_list').css({
//             'left':$(window).width() - $('.header_drop_down_list').outerWidth(),
//         })
//     }
//     if(window.show_header_drop_down_list == false){
//         $('.header_drop_down_list').addClass(window.template.website_header.elems.children.header_wrapper.children.header_navList.children.header_drop_down_list.animation_name)
//     }
//     window.show_header_drop_down_list = true;
// }
// $('body').on('mouseleave','.website_header',function(e){
//     // //e.stopImmediatePropagation();
//     $('.header_drop_down_list').addClass('none');
//     window.show_header_drop_down_list = false;
// })
// $('body').on('mouseover','.show_header_drop_down_list, .preview_header_drop_down_list',function(e){
//     // //e.stopImmediatePropagation();
//     show_header_drop_down($(this).attr('header_list'));
// })
// $('body').on('click','.editor_popup_head_btn[key="header_editor"]',function(e){
//     $('.header_drop_down_list').addClass('none');
//     window.show_header_drop_down_list = false;
// })
// ///
// $('body').on('click','.header_drop_down_list_animation_preview',function(e){
//     //e.stopImmediatePropagation();
//     $('.header_drop_down_list').addClass('none');
//     window.show_header_drop_down_list = false;
//     setTimeout(()=>{
//         show_header_drop_down('foodmenu');
//     },200)
// })
// //

