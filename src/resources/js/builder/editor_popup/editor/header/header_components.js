draw_editor_popup_header_components = function(){
    if(!accessibility_check(window.selected,'header_components')){return;}
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            $('<div/>',{class:'w100p-20 m10 row alnC jstfyC wrap'}).append(
                $('<div/>',{class:'editor_popup_header_components editor_header_logo_alignment select set_editor_popup_editor',key_tree:'website_header.children.header_wrapper.children.header_logo'}).append(
                    $('<div/>',{class:'ico-logo_restaurant_name'}),
                    $('<div/>',{text:texts.styling.restauran_logo})
                ),
                $('<div/>',{class:'editor_popup_header_components editor_header_navList select set_editor_popup_editor',key_tree:'website_header.children.header_wrapper.children.header_navList'}).append(
                    $('<div/>',{class:'ico-navigation_list'}),
                    $('<div/>',{text:texts.styling.header_navList})
                ),
                $('<div/>',{class:'editor_popup_header_components editor_header_iconsList select set_editor_popup_editor',key_tree:'website_header.children.header_wrapper.children.header_iconsList'}).append(
                    $('<div/>',{class:'ico-icon'}),
                    $('<div/>',{text:texts.styling.header_iconsList})
                ),
                $('<div/>',{class:'editor_popup_header_components editor_header_drop_down_list select set_editor_popup_editor',key_tree:'website_header.children.header_drop_down_list'}).append(
                    $('<div/>',{class:'ico-drop_down_list'}),
                    $('<div/>',{text:texts.styling.drop_down_list})
                ),
                $('<div/>',{class:'editor_popup_header_components editor_header_drop_down_list_item select set_editor_popup_editor',key_tree:'website_header.children.header_drop_down_list_item'}).append(
                    $('<div/>',{class:'ico-list'}),
                    $('<div/>',{text:texts.styling.drop_down_list_item})
                ),
                $('<div/>',{class:'editor_popup_header_components editor_header_mobileNav_icon select set_editor_popup_editor',key_tree:'website_header.children.header_wrapper.children.header_mobileNav_icon'}).append(
                    $('<div/>',{class:'ico-mobile_navbar_icon'}),
                    $('<div/>',{text:texts.styling.header_mobileNav_icon})
                ),
            ),
        )
        setTimeout(()=>{
            $('.editor_popup_title2').text(texts.styling.header_components)
            $(`.editor_popup_body_shortcut.editor_header_components`).addClass('editor_popup_body_shortcut_selected')
        });
    });
}
$('body').on('click','.editor_header_components',function(e){
    draw_editor_popup_header_components();
})