draw_editor_popup_section_layout = function(){
    if(!accessibility_check(window.selected,'section_layout')){return;}
    show_editor_popup('editor',function(){
        $('#editor').find('.editor_popup_body').text('').append(
            $('<div/>',{class:'fs09 mX10 mT10 ',text:texts.change_layout}),
            $('<div/>',{class:'row wrap alnC jstfyC mT10',id:'section_editor_settings_change_layout'})
        )
        let section_layouts = get_sections_layouts();
        for(const key in section_layouts){
            let layout = section_layouts[key]
            let thisLayoutContainer;
            $('#section_editor_settings_change_layout').append(
                $('<div/>',{class:'change_section_layout_elem',layout:key}).append(
                    thisLayoutContainer = $('<div/>',{class:'section_layout_elem_S'})
                )
            )
            thisLayoutContainer.css({
                'grid-template-areas':layout.css['grid-template-areas'],
                'grid-template-columns':layout.css['grid-template-columns'],
            })
            let children_counter = 0;
            for(const key2 in layout.children){
                children_counter++;
                thisLayoutContainer.append(
                    $('<div/>',{class:'',style:`grid-area:elem${children_counter};background:var(--green-60);`})
                )
            }
        }
        setTimeout(()=>{
            $(`.editor_popup_body_shortcut.editor_section_layout`).addClass('editor_popup_body_shortcut_selected')
        });
    });
}
$('body').on('click','.editor_section_layout',function(e){
    draw_editor_popup_section_layout();
})
$('body').on('click','.change_section_layout_elem',function(e){
    let section_data = get_elem_data(window.selected);
    let section = section_data.elem;
    let old_section = JSON.parse(JSON.stringify(section));
    let section_layouts = get_sections_layouts();
    let layout = section_layouts[$(this).attr('layout')];
    section.children.section_wrapper = layout ;
    if(old_section.children.section_wrapper.children.length <= section.children.section_wrapper.children.length){
        for(const key in old_section.children.section_wrapper.children){
            section.children.section_wrapper.children[key].children = old_section.children.section_wrapper.children[key].children
        }
    }else if(old_section.children.section_wrapper.children.length > section.children.section_wrapper.children.length){
        for(const key in old_section.children.section_wrapper.children){
            if(key in section.children.section_wrapper.children){
                section.children.section_wrapper.children[key].children = old_section.children.section_wrapper.children[key].children
            }else{
                for(const key2 in old_section.children.section_wrapper.children[key].children){
                    section.children.section_wrapper.children[section.children.section_wrapper.children.length - 1].children.push(old_section.children.section_wrapper.children[key].children[key2])
                }
            }
        }
    }
    new_action();
})