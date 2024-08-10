draw_editor_popup_header_navList = function(){
    if(!accessibility_check(window.selected,'header_navList')){return;}
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            $('<div/>',{class:'w100p editor_popup_container',key:'header_navList'}).append(
                draw_editors_container({
                    is_responsive:false,
                    editors:[

                    ]
                })
            ),
            $('<div/>',{class:'w100p editor_popup_container none',key:'',parent_key:'header_navList'}).append(
                draw_editors_container({
                    is_responsive:false,
                    editors:[

                    ]
                })
            )
        )
    })
    $(`.editor_popup_body_shortcut.editor_header_navList`).addClass('editor_popup_body_shortcut_selected')
}
$('body').on('click','.editor_header_navList',function(e){
    draw_editor_popup_header_navList();
})