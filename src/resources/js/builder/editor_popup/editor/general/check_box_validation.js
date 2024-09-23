draw_editor_popup_check_box_validation = function(){
    if(!accessibility_check(window.selected,'check_box_validation')){return;}
    show_editor_popup('editor',function(){
        let key_tree = window.selected;
        let elem = get_element_data(key_tree);
        if('styling_target' in elem){
            key_tree = elem.styling_target.check_box_validation ?? key_tree
        }
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:false,
                editors:[
                    $('<div/>',{class:'editor_popup_row editor_popup_brdrT_none'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.preview_validation_message}),
                        draw_switch_btn({
                            dummy:true,
                            dummy_class:'check_box_preview_validation_message'
                        })
                    ),
                    $('<div/>',{class:'editor_popup_row'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.color}),
                        draw_color_picker({
                            key_tree:key_tree,
                            variable_key:'css',
                            key:'color',
                        })
                    ),
                    $('<div/>',{class:'editor_popup_col'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.font_size}),
                        draw_number_picker({
                            key_tree:key_tree,
                            variable_key:'css',
                            key:'font-size',
                            units:['px','em'],
                            step:1,
                        }),
                    ),
                ]
            })
        )
        setTimeout(()=>{
            $('.editor_popup_title2').text(texts.styling.validation_message)
            $(`.editor_popup_body_shortcut.editor_check_box_validation`).addClass('editor_popup_body_shortcut_selected')
        });
    })
}

$('body').on('click','.editor_check_box_validation',function(){
    draw_editor_popup_check_box_validation();
})
$('body').on('change','.check_box_preview_validation_message',function(){
    let val = get_dummy_val($(this));
    let elem = get_element_data(window.selected);
    if(val == '1'){
        $(`.${elem.children.validation_message.class_selector}`).text(texts.website_style.validation_message_ex)
        window.check_box_preview_validation_message = '1'
    }else{
        $(`.${elem.children.validation_message.class_selector}`).text('')
        window.check_box_preview_validation_message = '0'
    }
    set_all_editors();
})