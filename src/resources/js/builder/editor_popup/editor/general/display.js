draw_editor_popup_display = function(){
    if(!accessibility_check(window.selected,'display')){return;}
    let editor_popup_align_self;
    show_editor_popup('editor',function(){
        let elem = get_element_data(window.selected);
        let show_key = 'block';
        if(elem.type == 'container'){show_key = 'flex'}
        let parent = get_element_parent_data(window.selected);
        let flex_direction;
        window.current_view == 'desktop' ? flex_direction = parent.css['flex-direction'] : window.current_view == 'mobile' ? flex_direction = parent.css_mobile['flex-direction'] :null;
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:true,
                editors:[
                    $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.display}),
                        draw_select_box({
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'display',
                            selections:[
                                {text:texts.styling.show,key:show_key},
                                {text:texts.styling.hide,key:'none'},
                            ]
                        })
                    ),
                     $('<div/>',{class:'editor_popup_col'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.align_self}),
                        flex_direction == 'column' ? 
                        draw_select_box({
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'align-self',
                            selections:[
                                {class:'ico-no',key:'auto'},
                                {class:'ico-position_left',key:'flex-start'},
                                {class:'ico-position_hcenter',key:'center'},
                                {class:'ico-position_right',key:'flex-end'},
                            ]
                        })
                        : flex_direction == 'row' ?
                        draw_select_box({
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'align-self',
                            selections:[
                                {class:'ico-no',key:'auto'},
                                {class:'ico-position_top',key:'flex-start'},
                                {class:'ico-position_vcenter',key:'center'},
                                {class:'ico-position_bottom',key:'flex-end'},
                            ]
                        })
                        :'',
                    ),
                    $('<div/>',{class:'editor_popup_col'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.overflow}),
                        draw_select_box({
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'overflow',
                            selections:[
                                {text:texts.styling.visible,key:'visible'},
                                {text:texts.styling.hidden,key:'hidden'},
                            ]
                        })
                    )
                ]
            })
        )
    })
    setTimeout(()=>{

        $('.editor_popup_title2').text(texts.styling.display)
        $(`.editor_popup_body_shortcut.editor_display`).addClass('editor_popup_body_shortcut_selected')
    });
}
draw_editor_popup_display_align_self = function(){

}
$('body').on('click','.editor_display',function(e){
    draw_editor_popup_display();
})