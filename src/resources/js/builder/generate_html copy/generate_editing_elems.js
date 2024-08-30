draw_edit_btns = function(elem,key_tree){
    let html = '';
    elem.accessibility.includes('section_sizing') ? html = `${html}<button class="ico-sizing editor_section_sizing" tooltip="${texts.sizing}" key_tree="${key_tree}"></button>` :null;
    elem.accessibility.includes('section_spacing') ? html = `${html}<button class="ico-spacing editor_section_spacing" tooltip="${texts.spacing}" key_tree="${key_tree}"></button>` :null;
    elem.accessibility.includes('section_adapt_header') && elem.sort == 0 ? html = `${html}<button class="ico-header editor_section_adapt_header" tooltip="${texts.styling.adapt_header}" key_tree="${key_tree}"></button>` :null;
    elem.accessibility.includes('section_layout') ? html = `${html}<button class="ico-layout editor_section_layout" tooltip="${texts.section_layout}" key_tree="${key_tree}"></button>` :null;
    elem.accessibility.includes('section_driver') ? html = `${html}<button class="ico-driver editor_section_driver" tooltip="${texts.styling.section_driver}" key_tree="${key_tree}"></button>` :null;
    
    elem.accessibility.includes('edit_text') ? html = `${html}<button class="ico-edit_text edit_text" tooltip="${texts.edit_text}" key_tree="${key_tree}"></button>` :null;
    elem.accessibility.includes('select_image') ? html = `${html}<button class="ico-select_image select_image" tooltip="${texts.styling.select_image}" key_tree="${key_tree}"></button>` :null;
    elem.accessibility.includes('select_icon') ? html = `${html}<button class="ico-select_image editor_icon" tooltip="${texts.styling.select_icon}" key_tree="${key_tree}"></button>` :null;
    elem.accessibility.includes('select_font') ? html = `${html}<button class="ico-font_size select_font" tooltip="${texts.styling.font_style}" key_tree="${key_tree}"></button>` :null;
    elem.accessibility.includes('background') ? html = `${html}<button class="ico-background editor_background" tooltip="${texts.styling.background}" key_tree="${key_tree}"></button>` :null;
    elem.accessibility.includes('alignment') ? html = `${html}<button class="ico-alignment editor_alignment" tooltip="${texts.styling.alignment}" key_tree="${key_tree}"></button>` :null;
    html = `${html}<button class="ico-settings contextMenu" key_tree="${key_tree}"></button>`;
    return html;
}
generate_editing_elems_elem = function(elem,key_tree,style){
    let parent = get_element_parent_data(key_tree);
    let html = '';
    let edit_btns_elem_style = 'bottom:calc(100% + 5px);right:0px;';
    try{
        if(parent.css['flex-direction'] == 'row' && window.current_view == 'desktop'){
            edit_btns_elem_style = 'flex-direction:column;top:5px;right:calc(100% + 5px);';            
        }else if(parent.css_mobile['flex-direction'] == 'row' && window.current_view == 'mobile'){
            edit_btns_elem_style = 'flex-direction:column;top:5px;right:calc(100% + 5px);';            
        }
    }catch{}
    // html = `${html}<div class="elem" key_tree="${key_tree}" style="${$('.desktop_view').hasClass('mobile_view') ? style.mobile_container : style.desktop_container }" style_desktop="${style.desktop_container}" style_mobile="${style.mobile_container}">`;
    html = `${html}<div class="elem" key_tree="${key_tree}" style="${$('.desktop_view').hasClass('mobile_view') ? style.mobile_container : style.desktop_container }">`;
    html = `${html}<div class="edit_btns edit_btns_elem builder_font" style="${edit_btns_elem_style}">`;
    html = `${html}${draw_edit_btns(elem,key_tree)}`,
    html = `${html}</div>`;
    html = `${html}<div class="select_edit_elem_title builder_font contextMenu" key_tree="${key_tree}">${texts.elems[elem.elem_type]}</div>`;
    if(elem.accessibility.includes('padding')){
        let padding = window.current_view == 'desktop' ? elem.css.padding.split(' ') : elem.css_mobile.padding.split(' '); 
        html = `${html}<div class="edit_padding_top edit_elem_padding_top" style="height:${padding[0]}" key_tree="${key_tree}"></div>`;
        html = `${html}<div class="edit_padding_right edit_elem_padding_right" style="width:${padding[1]}" key_tree="${key_tree}"></div>`;
        html = `${html}<div class="edit_padding_bottom edit_elem_padding_bottom" style="height:${padding[2]}" key_tree="${key_tree}"></div>`;
        html = `${html}<div class="edit_padding_left edit_elem_padding_left" style="width:${padding[3]}" key_tree="${key_tree}"></div>`;
    }
    if(elem.accessibility.includes('margin')){   
        let margin = window.current_view == 'desktop' ? elem.css.margin.split(' ') : elem.css_mobile.margin.split(' '); 
        html = `${html}<div class="edit_margin_top edit_elem_margin_top" style="height:${margin[0]};top:-${margin[0]};" key_tree="${key_tree}"></div>`;
        html = `${html}<div class="edit_margin_right edit_elem_margin_right" style="width:${margin[1]};right:-${margin[1]};" key_tree="${key_tree}"></div>`;
        html = `${html}<div class="edit_margin_bottom edit_elem_margin_bottom" style="height:${margin[2]};bottom:-${margin[2]};" key_tree="${key_tree}"></div>`;
        html = `${html}<div class="edit_margin_left edit_elem_margin_left" style="width:${margin[3]};left:-${margin[3]};" key_tree="${key_tree}"></div>`;
    }
    // let variable_key = 'css';
    // window.current_view == 'mobile' ? variable_key = 'css_mobile' : null;
    // if(parent[variable_key]['flex-direction'] == 'column'){
    //     align_self_backward_icon = 'ico-position_left';
    //     align_self_backward_style = 'right:unset;left:-40px;top:calc(50% - 17px);';
    //     if(parent[variable_key]['align-items'] == 'flex-start' && elem[variable_key]['align-self'] == 'auto'){align_self_backward_style = `${align_self_backward_style}display:none !important;`}
    //     else if(elem[variable_key]['align-self'] == 'flex-start'){align_self_backward_style = `${align_self_backward_style}display:none !important;`}

    //     align_self_forward_icon = 'ico-position_right';
    //     align_self_forward_style = 'left:unset;right:-40px;top:calc(50% - 17px);'
    //     if(parent[variable_key]['align-items'] == 'flex-end' && elem[variable_key]['align-self'] == 'auto'){align_self_forward_style = `${align_self_forward_style}display:none !important;`}
    //     else if(elem[variable_key]['align-self'] == 'flex-end'){align_self_forward_style = `${align_self_forward_style}display:none !important;`}

    // }else if(parent[variable_key]['flex-direction'] == 'row'){
    //     align_self_backward_icon = 'ico-position_top';
    //     align_self_backward_style = 'top:-40px;left:calc(50% - 17px);';
    //     if(parent[variable_key]['align-items'] == 'flex-start' && elem[variable_key]['align-self'] == 'auto'){align_self_backward_style = `${align_self_backward_style}display:none !important;`}
    //     else if(elem[variable_key]['align-self'] == 'flex-start'){align_self_backward_style = `${align_self_backward_style}display:none !important;`}

    //     align_self_forward_icon = 'ico-position_bottom';
    //     align_self_forward_style = 'bottom:-40px;left:calc(50% - 17px);'
    //     if(parent[variable_key]['align-items'] == 'flex-end' && elem[variable_key]['align-self'] == 'auto'){align_self_forward_style = `${align_self_forward_style}display:none !important;`}
    //     else if(elem[variable_key]['align-self'] == 'flex-end'){align_self_forward_style = `${align_self_forward_style}display:none !important;`}

    // }
    // html = `${html}<div key_tree="${key_tree}" key="backward" class="edit_alignment_btn edit_elem_alignment_btn_self edit_alignment_btn_self ${align_self_backward_icon}" style="${align_self_backward_style}"></div>`
    // html = `${html}<div key_tree="${key_tree}" key="forward" class="edit_alignment_btn edit_elem_alignment_btn_self edit_alignment_btn_self ${align_self_forward_icon}" style="${align_self_forward_style}"></div>`

    return html;
}
generate_editing_elems_container = function(elem,key_tree,style){
    let parent = get_element_parent_data(key_tree);
    let html = '';
    let edit_btns_elem_style = 'bottom:calc(100% + 5px);right:0px;';
    try{
        if(parent.css['flex-direction'] == 'row' && window.current_view == 'desktop'){
            edit_btns_elem_style = 'flex-direction:column;top:5px;right:calc(100% + 5px);';            
        }else if(parent.css_mobile['flex-direction'] == 'row' && window.current_view == 'mobile'){
            edit_btns_elem_style = 'flex-direction:column;top:5px;right:calc(100% + 5px);';            
        }
    }catch{}
    html = `${html}<div class="container" key_tree="${key_tree}" style="${$('.desktop_view').hasClass('mobile_view') ? style.mobile_container : style.desktop_container }">`;
    html = `${html}<div class="edit_btns edit_btns_container builder_font" style="${edit_btns_elem_style}">`;
    html = `${html}${draw_edit_btns(elem,key_tree)}`,
    html = `${html}</div>`;
    html = `${html}<div class="select_edit_container_title builder_font contextMenu" key_tree="${key_tree}">${elem.name}</div>`;
    if(elem.accessibility.includes('padding')){
        let padding = window.current_view == 'desktop' ? elem.css.padding.split(' ') : elem.css_mobile.padding.split(' '); 
        html = `${html}<div class="edit_padding_top edit_container_padding_top" style="height:${padding[0]}" key_tree="${key_tree}"></div>`;
        html = `${html}<div class="edit_padding_right edit_container_padding_right" style="width:${padding[1]}" key_tree="${key_tree}"></div>`;
        html = `${html}<div class="edit_padding_bottom edit_container_padding_bottom" style="height:${padding[2]}" key_tree="${key_tree}"></div>`;
        html = `${html}<div class="edit_padding_left edit_container_padding_left" style="width:${padding[3]}" key_tree="${key_tree}"></div>`;
    }
    if(elem.accessibility.includes('margin')){   
        let margin = window.current_view == 'desktop' ? elem.css.margin.split(' ') : elem.css_mobile.margin.split(' '); 
        html = `${html}<div class="edit_margin_top edit_container_margin_top" style="height:${margin[0]};top:-${margin[0]};" key_tree="${key_tree}"></div>`;
        html = `${html}<div class="edit_margin_right edit_container_margin_right" style="width:${margin[1]};right:-${margin[1]};" key_tree="${key_tree}"></div>`;
        html = `${html}<div class="edit_margin_bottom edit_container_margin_bottom" style="height:${margin[2]};bottom:-${margin[2]};" key_tree="${key_tree}"></div>`;
        html = `${html}<div class="edit_margin_left edit_container_margin_left" style="width:${margin[3]};left:-${margin[3]};" key_tree="${key_tree}"></div>`;
    }

    // let variable_key = 'css';
    // window.current_view == 'mobile' ? variable_key = 'css_mobile' : null;
    // if(parent){
    //     if(parent[variable_key]['flex-direction'] == 'column'){
    //         align_self_backward_icon = 'ico-position_left';
    //         align_self_backward_style = 'right:unset;left:-40px;top:calc(50% - 17px);';
    //         if(parent[variable_key]['align-items'] == 'flex-start' && elem[variable_key]['align-self'] == 'auto'){align_self_backward_style = `${align_self_backward_style}display:none !important;`}
    //         else if(elem[variable_key]['align-self'] == 'flex-start'){align_self_backward_style = `${align_self_backward_style}display:none !important;`}
    
    //         align_self_forward_icon = 'ico-position_right';
    //         align_self_forward_style = 'left:unset;right:-40px;top:calc(50% - 17px);'
    //         if(parent[variable_key]['align-items'] == 'flex-end' && elem[variable_key]['align-self'] == 'auto'){align_self_forward_style = `${align_self_forward_style}display:none !important;`}
    //         else if(elem[variable_key]['align-self'] == 'flex-end'){align_self_forward_style = `${align_self_forward_style}display:none !important;`}
    
    //     }else if(parent[variable_key]['flex-direction'] == 'row'){
    //         align_self_backward_icon = 'ico-position_top';
    //         align_self_backward_style = 'top:-40px;left:calc(50% - 17px);';
    //         if(parent[variable_key]['align-items'] == 'flex-start' && elem[variable_key]['align-self'] == 'auto'){align_self_backward_style = `${align_self_backward_style}display:none !important;`}
    //         else if(elem[variable_key]['align-self'] == 'flex-start'){align_self_backward_style = `${align_self_backward_style}display:none !important;`}
    
    //         align_self_forward_icon = 'ico-position_bottom';
    //         align_self_forward_style = 'bottom:-40px;left:calc(50% - 17px);'
    //         if(parent[variable_key]['align-items'] == 'flex-end' && elem[variable_key]['align-self'] == 'auto'){align_self_forward_style = `${align_self_forward_style}display:none !important;`}
    //         else if(elem[variable_key]['align-self'] == 'flex-end'){align_self_forward_style = `${align_self_forward_style}display:none !important;`}
    
    //     }
    //     html = `${html}<div key_tree="${key_tree}" key="backward" class="edit_alignment_btn edit_container_alignment_btn_self edit_alignment_btn_self ${align_self_backward_icon}" style="${align_self_backward_style}"></div>`
    //     html = `${html}<div key_tree="${key_tree}" key="forward" class="edit_alignment_btn edit_container_alignment_btn_self edit_alignment_btn_self ${align_self_forward_icon}" style="${align_self_forward_style}"></div>`
    
    // }

    // let align_self_check = true;
    // window.current_view == 'mobile' ? variable_key = 'css_mobile' : null; 
    // for(const key in elem.children){
    //     if(elem.children[key][variable_key]['align-self'] != 'auto'){
    //         align_self_check = false;
    //     }
    // }

    // alignment_top_start_disabled = '';
    // alignment_top_center_disabled = '';
    // alignment_top_end_disabled = '';
    // alignment_left_start_disabled = '';
    // alignment_left_center_disabled = '';
    // alignment_left_end_disabled = '';

    // if(elem.css['flex-direction'] == 'column'){
    //     alignment_top_key = 'align-items';
    //     alignment_left_key = 'justify-content';
    //     if(align_self_check){
    //         if(elem[variable_key]['align-items'] == 'flex-start'){alignment_top_start_disabled = 'disabled'}
    //         if(elem[variable_key]['align-items'] == 'center'){alignment_top_center_disabled = 'disabled'}
    //         if(elem[variable_key]['align-items'] == 'flex-end'){alignment_top_end_disabled = 'disabled'}
    //     }
    //     if(elem[variable_key]['justify-content'] == 'flex-start'){alignment_left_start_disabled = 'disabled'}
    //     if(elem[variable_key]['justify-content'] == 'center'){alignment_left_center_disabled = 'disabled'}
    //     if(elem[variable_key]['justify-content'] == 'flex-end'){alignment_left_end_disabled = 'disabled'}

    // }else if(elem.css['flex-direction'] == 'row'){
    //     alignment_top_key = 'justify-content';
    //     alignment_left_key = 'align-items';
    //     if(align_self_check){
    //         if(elem[variable_key]['align-items'] == 'flex-start'){alignment_left_start_disabled = 'disabled'}
    //         if(elem[variable_key]['align-items'] == 'center'){alignment_left_center_disabled = 'disabled'}
    //         if(elem[variable_key]['align-items'] == 'flex-end'){alignment_left_end_disabled = 'disabled'}
    //     }
    //     if(elem[variable_key]['justify-content'] == 'flex-start'){alignment_top_start_disabled = 'disabled'}
    //     if(elem[variable_key]['justify-content'] == 'center'){alignment_top_center_disabled = 'disabled'}
    //     if(elem[variable_key]['justify-content'] == 'flex-end'){alignment_top_end_disabled = 'disabled'}
    // }
    // html = `${html}<div key="${alignment_top_key}" class="edit_container_alignment_top edit_alignment_btns_top" key_tree="${key_tree}">
    //     <button ${alignment_top_start_disabled} key="flex-start" class="edit_alignment_btn edit_alignment_btn_container ico-position_left"></button>
    //     <button ${alignment_top_center_disabled} key="center" class="edit_alignment_btn edit_alignment_btn_container ico-position_hcenter"></button>
    //     <button ${alignment_top_end_disabled} key="flex-end" class="edit_alignment_btn edit_alignment_btn_container ico-position_right"></button>
    // </div>`;
    // html = `${html}<div key="${alignment_left_key}" class="edit_container_alignment_left edit_alignment_btns_left" key_tree="${key_tree}">
    //     <button ${alignment_left_start_disabled} key="flex-start" class="edit_alignment_btn edit_alignment_btn_container ico-position_top"></button>
    //     <button ${alignment_left_center_disabled} key="center" class="edit_alignment_btn edit_alignment_btn_container ico-position_vcenter"></button>
    //     <button ${alignment_left_end_disabled} key="flex-end" class="edit_alignment_btn edit_alignment_btn_container ico-position_bottom"></button>
    // </div>`

    return html;
}
generate_editing_elems_section_block = function(elem,key_tree,style){
    let html = '';
    elem.children.sort((a,b)=>{
        return a.sort - b.sort;
    })
    // html = `${html}<div class="section_block" key_tree="${key_tree}" style="${$('.desktop_view').hasClass('mobile_view') ? style.mobile_container : style.desktop_container }" style_desktop="${style.desktop_container}" style_mobile="${style.mobile_container}">`;
    html = `${html}<div class="section_block" key_tree="${key_tree}" style="${$('.desktop_view').hasClass('mobile_view') ? style.mobile_container : style.desktop_container }">`;
    html = `${html}<div class="edit_btns edit_btns_section_block builder_font" style="bottom:calc(100% + 5px);left:0px;">`;
    html = `${html}${draw_edit_btns(elem,key_tree)}`,
    html = `${html}</div>`;
    html = `${html}<div class="select_section_block_title builder_font contextMenu" key_tree="${key_tree}">${texts.section_block}</div>`;
    if(elem.accessibility.includes('padding')){
        let padding = window.current_view == 'desktop' ? elem.css.padding.split(' ') : elem.css_mobile.padding.split(' '); 
        html = `${html}<div class="edit_padding_top edit_section_block_padding_top" style="height:${padding[0]}" key_tree="${key_tree}"></div>`;
        html = `${html}<div class="edit_padding_right edit_section_block_padding_right" style="width:${padding[1]}" key_tree="${key_tree}"></div>`;
        html = `${html}<div class="edit_padding_bottom edit_section_block_padding_bottom" style="height:${padding[2]}" key_tree="${key_tree}"></div>`;
        html = `${html}<div class="edit_padding_left edit_section_block_padding_left" style="width:${padding[3]}" key_tree="${key_tree}"></div>`;
    }
    if(elem.accessibility.includes('margin')){   
        let margin = window.current_view == 'desktop' ? elem.css.margin.split(' ') : elem.css_mobile.margin.split(' '); 
        html = `${html}<div class="edit_margin_top edit_section_block_margin_top" style="height:${margin[0]};top:-${margin[0]};" key_tree="${key_tree}"></div>`;
        html = `${html}<div class="edit_margin_right edit_section_block_margin_right" style="width:${margin[1]};right:-${margin[1]};" key_tree="${key_tree}"></div>`;
        html = `${html}<div class="edit_margin_bottom edit_section_block_margin_bottom" style="height:${margin[2]};bottom:-${margin[2]};" key_tree="${key_tree}"></div>`;
        html = `${html}<div class="edit_margin_left edit_section_block_margin_left" style="width:${margin[3]};left:-${margin[3]};" key_tree="${key_tree}"></div>`;
    }

    // let variable_key = 'css';
    // let align_self_check = true;
    // window.current_view == 'mobile' ? variable_key = 'css_mobile' : null; 
    // for(const key in elem.children){
    //     if(elem.children[key][variable_key]['align-self'] != 'auto'){
    //         align_self_check = false;
    //     }
    // }

    // alignment_top_start_disabled = '';
    // alignment_top_center_disabled = '';
    // alignment_top_end_disabled = '';
    // alignment_left_start_disabled = '';
    // alignment_left_center_disabled = '';
    // alignment_left_end_disabled = '';

    // if(elem.css['flex-direction'] == 'column'){
    //     alignment_top_key = 'align-items';
    //     alignment_left_key = 'justify-content';
    //     if(align_self_check){
    //         if(elem[variable_key]['align-items'] == 'flex-start'){alignment_top_start_disabled = 'disabled'}
    //         if(elem[variable_key]['align-items'] == 'center'){alignment_top_center_disabled = 'disabled'}
    //         if(elem[variable_key]['align-items'] == 'flex-end'){alignment_top_end_disabled = 'disabled'}
    //     }
    //     if(elem[variable_key]['justify-content'] == 'flex-start'){alignment_left_start_disabled = 'disabled'}
    //     if(elem[variable_key]['justify-content'] == 'center'){alignment_left_center_disabled = 'disabled'}
    //     if(elem[variable_key]['justify-content'] == 'flex-end'){alignment_left_end_disabled = 'disabled'}

    // }else if(elem.css['flex-direction'] == 'row'){
    //     alignment_top_key = 'justify-content';
    //     alignment_left_key = 'align-items';
    //     if(align_self_check){
    //         if(elem[variable_key]['align-items'] == 'flex-start'){alignment_left_start_disabled = 'disabled'}
    //         if(elem[variable_key]['align-items'] == 'center'){alignment_left_center_disabled = 'disabled'}
    //         if(elem[variable_key]['align-items'] == 'flex-end'){alignment_left_end_disabled = 'disabled'}
    //     }
    //     if(elem[variable_key]['justify-content'] == 'flex-start'){alignment_top_start_disabled = 'disabled'}
    //     if(elem[variable_key]['justify-content'] == 'center'){alignment_top_center_disabled = 'disabled'}
    //     if(elem[variable_key]['justify-content'] == 'flex-end'){alignment_top_end_disabled = 'disabled'}
    // }
    // html = `${html}<div key="${alignment_top_key}" class="edit_section_block_alignment_top edit_alignment_btns_top" key_tree="${key_tree}">
    //     <button ${alignment_top_start_disabled} key="flex-start" class="edit_alignment_btn edit_alignment_btn_container ico-position_left"></button>
    //     <button ${alignment_top_center_disabled} key="center" class="edit_alignment_btn edit_alignment_btn_container ico-position_hcenter"></button>
    //     <button ${alignment_top_end_disabled} key="flex-end" class="edit_alignment_btn edit_alignment_btn_container ico-position_right"></button>
    // </div>`;
    // html = `${html}<div key="${alignment_left_key}" class="edit_section_block_alignment_left edit_alignment_btns_left" key_tree="${key_tree}">
    //     <button ${alignment_left_start_disabled} key="flex-start" class="edit_alignment_btn edit_alignment_btn_container ico-position_top"></button>
    //     <button ${alignment_left_center_disabled} key="center" class="edit_alignment_btn edit_alignment_btn_container ico-position_vcenter"></button>
    //     <button ${alignment_left_end_disabled} key="flex-end" class="edit_alignment_btn edit_alignment_btn_container ico-position_bottom"></button>
    // </div>`

    return html;
}
generate_editing_elems_section_wrapper = function(elem,key_tree,style){
    let html = '';
    let padding_top = window.current_view == 'desktop' ? elem.css['padding-top'] : elem.css_mobile['padding-top']; 
    let padding_bottom = window.current_view == 'desktop' ? elem.css['padding-bottom'] : elem.css_mobile['padding-bottom']; 
    let margin_top = window.current_view == 'desktop' ? elem.css['margin-top'] : elem.css_mobile['margin-top']; 
    let margin_bottom = window.current_view == 'desktop' ? elem.css['margin-bottom'] : elem.css_mobile['margin-bottom']; 
    html = `${html}<div class="edit_padding_top_section" style="height:${padding_top}" key_tree="${key_tree}"></div>`;
    html = `${html}<div class="edit_padding_bottom_section" style="height:${padding_bottom}" key_tree="${key_tree}"></div>`;
    html = `${html}<div class="edit_margin_top_section" style="height:${margin_top};top:-${margin_top}" key_tree="${key_tree}"></div>`;
    html = `${html}<div class="edit_margin_bottom_section" style="height:${margin_bottom};bottom:-${margin_bottom}" key_tree="${key_tree}"></div>`;
    return html;
}
generate_editing_elems_section = function(elem,key_tree,style){
    let html = '';
    if(elem.has_driver == '1'){
        let driver_style = '';
        let driver_style_desktop = `height:${elem.driver.css.height};${elem.driver.position == 'top' ? `top:0;transform:${elem.driver.flip == '1' ? 'rotateY(180deg)' : ''};` : elem.driver.position == 'bottom' ? `bottom:0;transform:rotateZ(180deg) ${elem.driver.flip == '1' ? 'rotateY(180deg)' : ''};` : ''}`
        let driver_style_mobile = `height:${elem.driver.css_mobile.height};${elem.driver.position == 'top' ? `top:0;transform:${elem.driver.flip == '1' ? 'rotateY(180deg)' : ''};` : elem.driver.position == 'bottom' ? `bottom:0;transform:rotateZ(180deg) ${elem.driver.flip == '1' ? 'rotateY(180deg)' : ''};` : ''}`
        for(const key in elem.driver.svg_style){
            driver_style_desktop = `${driver_style_desktop} ${key}:${elem.driver.svg_style[key]};`
            driver_style_mobile = `${driver_style_mobile} ${key}:${elem.driver.svg_style[key]};`
        }
        if($('.desktop_view').hasClass('mobile_view')){
            driver_style = driver_style_mobile
        }else{
            driver_style = driver_style_desktop;
        }
        // html = `${html}<svg style="${driver_style}" style_desktop="${driver_style_desktop}" style_mobile="${driver_style_mobile}" `;
        html = `${html}<svg style="${driver_style}"`;
        for(const key in elem.driver.svg_attr){
            html = `${html} ${key}="${elem.driver.svg_attr[key]}"`
        }
        html = `${html}">`;
        for(const key in elem.driver.paths){
            html = `${html}<path d="${elem.driver.paths[key].path}" fill="${elem.driver.paths[key].color}"></path>`;
        }
        html = `${html}</svg> `;
    }

    let section = get_element_data(key_tree);
    html = `${html}<div class="select_section_title builder_font contextMenu pointer"  key_tree="${key_tree}"><div class="" >${section.name}</div></div>`;
    
    html = `${html}<div class="edit_btns edit_btns_section builder_font" style="top:100px;left:10px;flex-direction:column;">`;
    html = `${html}${draw_edit_btns(elem,key_tree)}`
    html = `${html}</div>`;

    if(elem.accessibility.includes('add_section')){
        html = `${html}<button class="btn btn-cancel add_section add_section_btn_style ico-add" section_sort="${elem.sort}" tooltip="${texts.add_section}"></button>`;
        if(elem.sort == 0){
            html = `${html}<button class="btn btn-cancel add_section add_first_section add_section_btn_style ico-add" style="bottom:unset; top: calc(-.5em - 13px);" section_sort="${elem.sort}" tooltip="${texts.add_section}"></button>`;
        }
    }
    return html;
}
generate_editing_elems_header_wrapper = function(elem,key_tree,style){
    let html = '';
    let padding;
    if(elem.accessibility.includes('padding')){
        try{
            padding = window.current_view == 'desktop' ? elem.css.padding.split(' ') : elem.css_mobile.padding.split(' '); 
        }catch{return '';}
        html = `${html}<div class="edit_padding_top edit_header_padding_top" style="height:${padding[0]}" key_tree="${key_tree}"></div>`;
        html = `${html}<div class="edit_padding_right edit_header_padding_right" style="width:${padding[1]}" key_tree="${key_tree}"></div>`;
        html = `${html}<div class="edit_padding_bottom edit_header_padding_bottom" style="height:${padding[2]}" key_tree="${key_tree}"></div>`;
        html = `${html}<div class="edit_padding_left edit_header_padding_left" style="width:${padding[3]}" key_tree="${key_tree}"></div>`;
    }
    html = `${html}<div class="select_website_header_title builder_font contextMenu" key_tree="website_header">${texts.website_tools.header}</div>`;
    html = `${html}<div class="edit_btns edit_btns_header" style="top:calc(100% - 2px * -1);right:0px;">
        <button class="fs101 ico-mobile_navbar_icon editor_header_mobileNav_icon select set_editor_popup_editor" tooltip="${texts.styling.header_mobileNav_icon}" key_tree="website_header.children.header_wrapper.children.header_mobileNav_icon"></button>
        <button class="fs101 ico-list editor_header_drop_down_list_item select set_editor_popup_editor" tooltip="${texts.styling.drop_down_list_item}" key_tree="website_header.children.header_drop_down_list_item"></button>
        <button class="fs101 ico-drop_down_list editor_header_drop_down_list select set_editor_popup_editor" tooltip="${texts.styling.drop_down_list}" key_tree="website_header.children.header_drop_down_list"></button>
        <button class="fs101 ico-icon editor_header_iconsList select set_editor_popup_editor" tooltip="${texts.styling.header_iconsList}" key_tree="website_header.children.header_wrapper.children.header_iconsList"></button>
        <button class="fs101 ico-navigation_list editor_header_navList select set_editor_popup_editor" tooltip="${texts.styling.header_navList}" key_tree="website_header.children.header_wrapper.children.header_navList"></button>
        <button class="fs101 ico-logo_restaurant_name editor_header_logo_alignment select set_editor_popup_editor" tooltip="${texts.styling.restauran_logo}" key_tree="website_header.children.header_wrapper.children.header_logo"></button>
        <button class="ico-header editor_header_settings" tooltip="${texts.header_settings}"></button>
        <button class="ico-settings contextMenu" key_tree="website_header"></button>
    </div>`
    return html;
}
generate_editing_elems_header_components = function(elem,key_tree,style){
    let html = '';
    let padding;
    try{
        padding = window.current_view == 'desktop' ? elem.css.padding.split(' ') : elem.css_mobile.padding.split(' '); 
        html = `${html}<div class="edit_padding_top edit_header_components_padding_top" style="height:${padding[0]}" key_tree="${key_tree}"></div>`;
        html = `${html}<div class="edit_padding_right edit_header_components_padding_right" style="width:${padding[1]}" key_tree="${key_tree}"></div>`;
        html = `${html}<div class="edit_padding_bottom edit_header_components_padding_bottom" style="height:${padding[2]}" key_tree="${key_tree}"></div>`;
        html = `${html}<div class="edit_padding_left edit_header_components_padding_left" style="width:${padding[3]}" key_tree="${key_tree}"></div>`;
    }catch{}
    let margin;
    try{
        margin = window.current_view == 'desktop' ? elem.css.margin.split(' ') : elem.css_mobile.margin.split(' '); 
        html = `${html}<div class="edit_margin_top edit_header_components_margin_top" style="height:${margin[0]};top:-${margin[0]};" key_tree="${key_tree}"></div>`;
        html = `${html}<div class="edit_margin_right edit_header_components_margin_right" style="width:${margin[1]};right:-${margin[1]}" key_tree="${key_tree}"></div>`;
        html = `${html}<div class="edit_margin_bottom edit_header_components_margin_bottom" style="height:${margin[2]};bottom:-${margin[2]}" key_tree="${key_tree}"></div>`;
        html = `${html}<div class="edit_margin_left edit_header_components_margin_left" style="width:${margin[3]};left:-${margin[3]}" key_tree="${key_tree}"></div>`;
    }catch{}

    return html;
}
generate_editing_elems_popup_window = function(elem,key_tree,style){
    let html = '';
    let padding;
    if(elem.accessibility.includes('padding')){
        try{
            padding = window.current_view == 'desktop' ? elem.css.padding.split(' ') : elem.css_mobile.padding.split(' '); 
        }catch{return '';}
        html = `${html}<div class="edit_padding_top edit_popup_padding_top" style="height:${padding[0]}" key_tree="${key_tree}"></div>`;
        html = `${html}<div class="edit_padding_right edit_popup_padding_right" style="width:${padding[1]}" key_tree="${key_tree}"></div>`;
        html = `${html}<div class="edit_padding_bottom edit_popup_padding_bottom" style="height:${padding[2]}" key_tree="${key_tree}"></div>`;
        html = `${html}<div class="edit_padding_left edit_popup_padding_left" style="width:${padding[3]}" key_tree="${key_tree}"></div>`;
    }
    html = `${html}<div class="select_popup_title builder_font contextMenu" key_tree="popup_window.children.popup_card">${texts.website_tools.popup_window}</div>`;
    html = `${html}<div class="edit_btns edit_btns_popup" style="flex-direction:column;top:50px;left:7px;">
    <button class="ico-settings contextMenu" key_tree="popup_window.children.popup_card"></button>
    <button class="fs101 ico-popup_window editor_popup_popup_widnow" tooltip="${texts.website_tools.popup_window}"></button>
    <button class="fs101 ico-close_icon editor_popup_popup_window_close_icon" tooltip="${texts.styling.close_icon}"></button>
    </div>`
    return html;
}