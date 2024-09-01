genrate_editing_elems = function(elem,key_tree){
    let html = '';
    if(elem.type == 'elem'){
        html = `${html}${generate_editing_elems_elem(elem,key_tree)}`;
    }
    else if(elem.type == 'section_block'){
        html = `${html}${generate_editing_elems_section_block(elem,key_tree)}`;
    }
    else if(elem.type == 'container'){
        html = `${html}${generate_editing_elems_container(elem,key_tree,)}`;
    }
    else if(elem.type == 'section_wrapper'){
            html = `${html}${generate_editing_elems_section_wrapper(elem,key_tree)}`;
    }
    else if(elem.type == 'section'){
        html = `${html}${generate_editing_elems_section(elem,key_tree)}`;
    }
    ////header////
    else if(elem.type == 'header_wrapper'){
        html = `${html}${generate_editing_elems_header_wrapper(elem,key_tree)}`;
    }
    else if(elem.type == 'header_component'){
        html = `${html}${generate_editing_elems_header_components(elem,key_tree)}`;
    }
    ////popup////
    else if(elem.type == 'popup_card'){
        html = `${html}${generate_editing_elems_popup_window(elem,key_tree)}`
    }
    return html;
}

//

generate_editing_elems_elem = function(elem,key_tree){
    let html = '';
    html = `${html}<div class="select_edit_elem_title builder_font contextMenu" key_tree="${key_tree}">${texts.elems[elem.elem_type]}</div>`;
    html = `${html}${draw_spacing_edit_elems(elem,'edit_elem_')}`

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
generate_editing_elems_container = function(elem,key_tree){
    let html = '';
    html = `${html}<div class="select_edit_container_title rename builder_font contextMenu" key_tree="${key_tree}">${elem.name}</div>`;
    html = `${html}${draw_spacing_edit_elems(elem,'edit_container_')}`

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
generate_editing_elems_section_block = function(elem,key_tree){
    let html = '';
    elem.children.sort((a,b)=>{
        return a.sort - b.sort;
    })
    html = `${html}<div class="select_section_block_title builder_font contextMenu" key_tree="${key_tree}">${texts.section_block}</div>`;
    html = `${html}${draw_spacing_edit_elems(elem,'edit_section_block_')}`

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
    html = `${html}${draw_spacing_edit_elems(elem,'')}`
    return html;
}
generate_editing_elems_section = function(elem,key_tree){
    let html = '';
    if(elem.has_driver == '1'){
        let driver_style = {};
        let driver_selector = `${elem.class_selector}_driver`;
        remove_css_rule(`.${driver_selector}`)
        window.current_view == 'desktop' ? driver_style.height = elem.driver.css.height : window.current_view == 'mobile' ? driver_style.height = elem.driver.css_mobile.height : null;
        elem.driver.position == 'top' ? driver_style.top = '0' : elem.driver.position == 'bottom' ? driver_style.bottom = '0' : null;
        elem.driver.position == 'top' ? driver_style.transform = `${elem.driver.flip == '1' ? 'rotateY(180deg)' : ''}` : elem.driver.position == 'bottom' ? driver_style.transform = `rotateZ(180deg) ${elem.driver.flip == '1' ? 'rotateY(180deg)' : ''}` : null;
        for(const key in elem.driver.svg_style){
            driver_style[key] = elem.driver.svg_style[key];
        }
        html = `${html}<svg class="${driver_selector}"`;
        for(const key in elem.driver.svg_attr){
            html = `${html} ${key}="${elem.driver.svg_attr[key]}"`
        }
        html = `${html}">`;
        for(const key in elem.driver.paths){
            html = `${html}<path d="${elem.driver.paths[key].path}" fill="${elem.driver.paths[key].color}"></path>`;
        }
        html = `${html}</svg> `;
        apply_css_rule(`.${driver_selector}`,driver_style)
    }

    let section = get_element_data(key_tree);
    html = `${html}<div class="select_section_title rename builder_font contextMenu pointer" key_tree="${key_tree}"><div class="" >${section.name}</div></div>`;

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
    html = `${html}${draw_spacing_edit_elems(elem,'edit_header_')}`

    html = `${html}<div class="select_website_header_title builder_font contextMenu" key_tree="website_header">${texts.website_tools.header}</div>`;
    return html;
}
generate_editing_elems_header_components = function(elem,key_tree,style){
    let html = '';
    html = `${html}${draw_spacing_edit_elems(elem,'edit_header_components_')}`
    return html;
}
generate_editing_elems_popup_window = function(elem,key_tree,style){
    let html = '';
    html = `${html}${draw_spacing_edit_elems(elem,'edit_popup_')}`
    html = `${html}<div class="select_popup_title builder_font contextMenu" key_tree="popup_window.children.popup_card">${texts.website_tools.popup_window}</div>`;
    return html;
}