draw_interactions_picker = function(data){
    let editor = $('<div/>',{
        class:`editor interactions_picker`,
        key_tree:data.key_tree,
        variable_key:null,
        key:'accessibility',
        render:data.render ?? data.key_tree,
    }).append(
        $('<div/>',{class:'editor_popup_row editor_popup_brdrT_none'}).append(
            $('<div/>',{class:'row alnC jstfyC'}).append(
                $('<div/>',{class:'ico-hover mie-10'}),
                $('<div/>',{class:'fs09',text:texts.hover}),
            ),
            draw_switch_btn({
                dummy:true,
                dummy_class:'interactions_hover',
                disabled:true,
                show_hide:'interactions_parent_hover_container',
            })
        ),
        $('<div/>',{class:'interactions_parent_hover_container_container w100p'}).append(
            $('<div/>',{class:'editor_popup_row interactions_parent_hover_container'}).append(
                $('<div/>',{class:'fs09',text:texts.trigger_parent_hover}),
                draw_switch_btn({
                    dummy:true,
                    dummy_class:'interactions_parent_hover',
                    disabled:true,
                })
            ),
        ),
        $('<div/>',{class:'editor_popup_row'}).append(
            $('<div/>',{class:'row alnC jstfyC'}).append(
                $('<div/>',{class:'ico-click fs101 mie-10'}),
                $('<div/>',{class:'fs09',text:texts.click}),
            ),
            draw_switch_btn({
                dummy:true,
                dummy_class:'interactions_click',
                disabled:true,
            })
        ),
        $('<div/>',{class:'editor_popup_row '}).append(
            $('<div/>',{class:'row alnC jstfyC'}).append(
                $('<div/>',{class:'ico-rename mie-10'}),
                $('<div/>',{class:'fs09',text:texts.focus}),
            ),
            draw_switch_btn({
                dummy:true,
                dummy_class:'interactions_focus',
                disabled:true,
            })
        ),
        $('<div/>',{class:'editor_popup_row '}).append(
            $('<div/>',{class:'row alnC jstfyC'}).append(
                $('<div/>',{class:'ico-no mie-10'}),
                $('<div/>',{class:'fs09',text:texts.disabled}),
            ),
            draw_switch_btn({
                dummy:true,
                dummy_class:'interactions_disabled',
                disabled:true,
            })
        ),
    );
    return editor;
}
set_interactions_picker = function(editor){
    let elem = get_element_data(editor.attr('key_tree'));
    if(elem.type == 'elem'){
        editor.find('.interactions_parent_hover_container_container').removeClass('none');


        
    }else{
        editor.find('.interactions_parent_hover_container_container').addClass('none')
    }
    let accessibility = get_editor_val(editor);
    if(accessibility.includes('can_hover')){editor.find('.interactions_hover').removeClass('switch_btn_disabled')}
    if(accessibility.includes('can_parent_hover')){editor.find('.interactions_parent_hover').removeClass('switch_btn_disabled')}
    if(accessibility.includes('can_click')){editor.find('.interactions_click').removeClass('switch_btn_disabled')}
    if(accessibility.includes('can_focus')){editor.find('.interactions_focus').removeClass('switch_btn_disabled')}
    if(accessibility.includes('can_disabled')){editor.find('.interactions_disabled').removeClass('switch_btn_disabled')}
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

    switch(key_tree){

        case 'website_header.children.header_wrapper.children.header_iconsList':
            set_interactions_accessibility(editor,'website_header.children.header_wrapper.children.header_iconsList_icon',val,key)
        break;
        case 'popup_window.children.popup_card':
            set_interactions_accessibility(editor,'popup_window.children.popup_card.children.popup_close',val,key)
        break;
        default:
            new_action(key_tree);
            if(key == 'parent_hover' && val == '0' || key == 'hover' && val == '0'){
                let parent = get_element_parent_data(editor.attr('key_tree'));
                if(parent !== undefined){
                    generate_elem_style(parent)
                }
            }
        break;
    }
}
