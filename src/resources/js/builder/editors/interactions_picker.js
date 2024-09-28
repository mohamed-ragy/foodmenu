draw_interactions_picker = function(data){
    let editor = $('<div/>',{
        class:`editor interactions_picker`,
        key_tree:data.key_tree,
        variable_key:null,
        key:'accessibility',
        render:data.render ?? data.key_tree,
    }).append(
        $('<div/>',{class:'editor_popup_row editor_popup_brdrT_none interactions_hover_container none'}).append(
            $('<div/>',{class:'row alnC jstfyC'}).append(
                $('<div/>',{class:'ico-hover mie-10'}),
                $('<div/>',{class:'fs09',text:texts.hover}),
            ),
            draw_switch_btn({
                dummy:true,
                dummy_class:'interactions_hover',
                show_hide:'interactions_parent_hover_container',
            })
        ),
        $('<div/>',{class:'interactions_parent_hover_container_container w100p'}).append(
            $('<div/>',{class:'editor_popup_row interactions_parent_hover_container none'}).append(
                $('<div/>',{class:'fs09',text:texts.trigger_parent_hover}),
                draw_switch_btn({
                    dummy:true,
                    dummy_class:'interactions_parent_hover',
                })
            ),
        ),
        $('<div/>',{class:'editor_popup_row interactions_click_container none'}).append(
            $('<div/>',{class:'row alnC jstfyC'}).append(
                $('<div/>',{class:'ico-click fs101 mie-10'}),
                $('<div/>',{class:'fs09',text:texts.click}),
            ),
            draw_switch_btn({
                dummy:true,
                dummy_class:'interactions_click',
            })
        ),
        $('<div/>',{class:'editor_popup_row interactions_focus_container none'}).append(
            $('<div/>',{class:'row alnC jstfyC'}).append(
                $('<div/>',{class:'ico-rename mie-10'}),
                $('<div/>',{class:'fs09',text:texts.focus}),
            ),
            draw_switch_btn({
                dummy:true,
                dummy_class:'interactions_focus',
            })
        ),
        $('<div/>',{class:'editor_popup_row interactions_disabled_container none'}).append(
            $('<div/>',{class:'row alnC jstfyC'}).append(
                $('<div/>',{class:'ico-no mie-10'}),
                $('<div/>',{class:'fs09',text:texts.disabled}),
            ),
            draw_switch_btn({
                dummy:true,
                dummy_class:'interactions_disabled',
            })
        ),
        $('<div/>',{class:'editor_popup_row interactions_error_container none'}).append(
            $('<div/>',{class:'row alnC jstfyC'}).append(
                $('<div/>',{class:'ico-no mie-10'}),
                $('<div/>',{class:'fs09',text:texts.error}),
            ),
            draw_switch_btn({
                dummy:true,
                dummy_class:'interactions_error',
            })
        ),
        $('<div/>',{class:'editor_popup_row interactions_selected_container none'}).append(
            $('<div/>',{class:'row alnC jstfyC'}).append(
                $('<div/>',{class:'ico-no mie-10'}),
                $('<div/>',{class:'fs09',text:texts.selected}),
            ),
            draw_switch_btn({
                dummy:true,
                dummy_class:'interactions_selected',
            })
        ),
    );
    return editor;
}
set_interactions_picker = function(editor){
    let elem = get_element_data(editor.attr('key_tree'));
    if('styling_target' in elem){
        if('interactions' in elem.styling_target){
            elem = get_element_data(elem.styling_target.interactions); 
        }
    }
    if(elem.type == 'elem'){
        editor.find('.interactions_parent_hover_container_container').removeClass('none');
    }else{
        editor.find('.interactions_parent_hover_container_container').addClass('none');
    }
    let accessibility = elem.accessibility;
    if(accessibility.includes('can_hover')){editor.find('.interactions_hover_container').removeClass('none')}
    if(accessibility.includes('can_parent_hover')){editor.find('.interactions_parent_hover_container').removeClass('none')}
    if(accessibility.includes('can_click')){editor.find('.interactions_click_container').removeClass('none')}
    if(accessibility.includes('can_focus')){editor.find('.interactions_focus_container').removeClass('none')}
    if(accessibility.includes('can_disabled')){editor.find('.interactions_disabled_container').removeClass('none')}
    if(accessibility.includes('can_error')){editor.find('.interactions_error_container').removeClass('none')}
    if(accessibility.includes('can_selected')){editor.find('.interactions_selected_container').removeClass('none')}
    if(accessibility.includes('hover')){
        set_dummy_val(editor.find('.interactions_hover'),'1')
    }else{
        set_dummy_val(editor.find('.interactions_hover'),'0')
    }
    if(accessibility.includes('parent_hover')){
        set_dummy_val(editor.find('.interactions_parent_hover'),'1')
    }else{
        set_dummy_val(editor.find('.interactions_parent_hover'),'0')
    }

    if(accessibility.includes('click')){
        set_dummy_val(editor.find('.interactions_click'),'1')
    }else{
        set_dummy_val(editor.find('.interactions_click'),'0')
    }

    if(accessibility.includes('focus')){
        set_dummy_val(editor.find('.interactions_focus'),'1')
    }else{
        set_dummy_val(editor.find('.interactions_focus'),'0')
    }

    if(accessibility.includes('disabled')){
        set_dummy_val(editor.find('.interactions_disabled'),'1')
    }else{
        set_dummy_val(editor.find('.interactions_disabled'),'0')
    }

    if(accessibility.includes('error')){
        set_dummy_val(editor.find('.interactions_error'),'1')
    }else{
        set_dummy_val(editor.find('.interactions_error'),'0')
    }
    if(accessibility.includes('selected')){
        set_dummy_val(editor.find('.interactions_selected'),'1')
    }else{
        set_dummy_val(editor.find('.interactions_selected'),'0')
    }
}
$('body').on('change','.interactions_hover',function(){
    let val = get_dummy_val($(this));
    let editor = $(this).closest('.interactions_picker')
    let key_tree = editor.attr('key_tree');
    set_interactions_accessibility(editor,key_tree,val,'hover')
})
$('body').on('change','.interactions_parent_hover',function(){
    let val = get_dummy_val($(this));
    let editor = $(this).closest('.interactions_picker')
    let key_tree = editor.attr('key_tree');
    set_interactions_accessibility(editor,key_tree,val,'parent_hover')
})
$('body').on('change','.interactions_click',function(){
    let val = get_dummy_val($(this));
    let editor = $(this).closest('.interactions_picker')
    let key_tree = editor.attr('key_tree');
    set_interactions_accessibility(editor,key_tree,val,'click')
})
$('body').on('change','.interactions_focus',function(){
    let val = get_dummy_val($(this));
    let editor = $(this).closest('.interactions_picker')
    let key_tree = editor.attr('key_tree');
    set_interactions_accessibility(editor,key_tree,val,'focus')
})
$('body').on('change','.interactions_disabled',function(){
    let val = get_dummy_val($(this));
    let editor = $(this).closest('.interactions_picker')
    let key_tree = editor.attr('key_tree');
    set_interactions_accessibility(editor,key_tree,val,'disabled')
})
$('body').on('change','.interactions_error',function(){
    let val = get_dummy_val($(this));
    let editor = $(this).closest('.interactions_picker')
    let key_tree = editor.attr('key_tree');
    set_interactions_accessibility(editor,key_tree,val,'error')
})
$('body').on('change','.interactions_selected',function(){
    let val = get_dummy_val($(this));
    let editor = $(this).closest('.interactions_picker')
    let key_tree = editor.attr('key_tree');
    set_interactions_accessibility(editor,key_tree,val,'selected')
})
set_interactions_accessibility = function(editor,key_tree,val,key){
    let elem = get_element_data(key_tree);
    if(val == '0'){
        let index = elem.accessibility.indexOf(key);
        if (index !== -1) {
            elem.accessibility.splice(index, 1);
        }
        if(key == 'hover'){
            let index2 = elem.accessibility.indexOf('parent_hover');
            if (index2 !== -1) {
                elem.accessibility.splice(index2, 1);
            }
            set_interactions_picker(editor)
        }
    }else if(val == '1'){
        elem.accessibility.push(key);
    }

    if('styling_target' in elem){
        if('interactions' in elem.styling_target){
            set_interactions_accessibility(editor,elem.styling_target.interactions,val,key)
        }
    }
    new_action(key_tree);
    if(key == 'parent_hover' && val == '0' || key == 'hover' && val == '0'){
        let parent = get_element_parent_data(editor.attr('key_tree'));
        if(parent !== undefined){
            generate_elem_style(parent)
        }
    }
}
