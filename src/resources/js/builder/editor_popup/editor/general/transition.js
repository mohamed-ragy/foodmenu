draw_editor_popup_transition = function(){
    if(!accessibility_check(window.selected,'transition')){return;}
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            draw_editors_container({
                is_responsive:false,
                editors:[
                    $('<div/>',{class:'editor_popup_col editor_popup_brdrT_none'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.transition}),
                        $('<div/>',{class:'row alnC jstfySB'}).append(
                            draw_input_list({
                                key_tree:window.selected,
                                variable_key:null,
                                key:'transition',
                                selections:get_inputList_obj('transitions'),
                            }),
                            $('<div/>',{class:'transition_preview fs103 pointer ico-play',key_tree:window.selected})
                        )
                    ),
                    $('<div/>',{class:'editor_popup_col'}).append(
                        $('<div/>',{class:'fs09',text:texts.styling.transition_duration}),
                        draw_number_picker({
                            key_tree:window.selected,
                            variable_key:'css',
                            key:'animation-duration',
                            units:['ms'],
                        })
                    ),
                ]
            })
        )
        setTimeout(()=>{
            $('.editor_popup_title2').text(texts.styling.transition)
        $(`.editor_popup_body_shortcut.editor_transition`).addClass('editor_popup_body_shortcut_selected')
        })
    })
}
$('body').on('click','.editor_transition',function(){
    draw_editor_popup_transition();
})
window.preview_transition = null;
$('body').on('click','.transition_preview',function(){
    let key_tree = $(this).attr('key_tree');
    let elem = get_element_data(key_tree);
    let this_btn = $(this);

    if($(this).hasClass('ico-pause')){
        clearTimeout(window.preview_transition );
        $('#website').find(`.edit[key_tree="${key_tree}"]`).removeClass(elem.transition);
        this_btn.removeClass('ico-pause').addClass('ico-play');
        return;
    }

    $('#website').find(`.edit[key_tree="${key_tree}"]`).addClass('stop_transitions');
    $('#website').find(`.edit[key_tree="${key_tree}"]`).removeClass(elem.transition);
    setTimeout(()=>{
        $('#website').find(`.edit[key_tree="${key_tree}"]`).removeClass('stop_transitions');
        $('#website').find(`.edit[key_tree="${key_tree}"]`).addClass(elem.transition);
    })
    this_btn.addClass('ico-pause').removeClass('ico-play');
    window.preview_transition = setTimeout(()=>{
        this_btn.removeClass('ico-pause').addClass('ico-play');
        $('#website').find(`.edit[key_tree="${key_tree}"]`).removeClass(elem.transition);
    },elem.css['animation-duration'].replace('ms',''))
})