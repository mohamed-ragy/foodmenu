generate_editing_elems_elem = function(elem,key_tree,style){
    let html = '';
    // html = `${html}<div class="elem" key_tree="${key_tree}" style="${$('.desktop_view').hasClass('mobile_view') ? style.mobile_container : style.desktop_container }" style_desktop="${style.desktop_container}" style_mobile="${style.mobile_container}">`;
    html = `${html}<div class="elem" key_tree="${key_tree}" style="${$('.desktop_view').hasClass('mobile_view') ? style.mobile_container : style.desktop_container }">`;
    html = `${html}<div class="select_edit_elem_btns builder_font">`;
    elem.accessibility.includes('edit_text') ? html = `${html}<button class="ico-edit_text edit_text" key_tree="${key_tree}"></button>` :null;
    elem.accessibility.includes('select_image') ? html = `${html}<button class="ico-select_image select_image" key_tree="${key_tree}"></button>` :null;
    elem.accessibility.includes('select_icon') ? html = `${html}<button class="ico-select_image editor_icon" key_tree="${key_tree}"></button>` :null;
    html = `${html}<button class="ico-settings contextMenu" key_tree="${key_tree}"></button>`;
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
    let parent = get_elem_data(key_tree).section_block;
    let variable_key = 'css';
    window.current_view == 'mobile' ? variable_key = 'css_mobile' : null;
    if(parent[variable_key]['flex-direction'] == 'column'){
        align_self_backward_icon = 'ico-position_left';
        align_self_backward_style = 'right:unset;left:-40px;top:calc(50% - 17px);';
        if(parent[variable_key]['align-items'] == 'flex-start' && elem[variable_key]['align-self'] == 'auto'){align_self_backward_style = `${align_self_backward_style}display:none !important;`}
        else if(elem[variable_key]['align-self'] == 'flex-start'){align_self_backward_style = `${align_self_backward_style}display:none !important;`}

        align_self_forward_icon = 'ico-position_right';
        align_self_forward_style = 'left:unset;right:-40px;top:calc(50% - 17px);'
        if(parent[variable_key]['align-items'] == 'flex-end' && elem[variable_key]['align-self'] == 'auto'){align_self_forward_style = `${align_self_forward_style}display:none !important;`}
        else if(elem[variable_key]['align-self'] == 'flex-end'){align_self_forward_style = `${align_self_forward_style}display:none !important;`}

    }else if(parent[variable_key]['flex-direction'] == 'row'){
        align_self_backward_icon = 'ico-position_top';
        align_self_backward_style = 'top:-40px;left:calc(50% - 17px);';
        if(parent[variable_key]['align-items'] == 'flex-start' && elem[variable_key]['align-self'] == 'auto'){align_self_backward_style = `${align_self_backward_style}display:none !important;`}
        else if(elem[variable_key]['align-self'] == 'flex-start'){align_self_backward_style = `${align_self_backward_style}display:none !important;`}

        align_self_forward_icon = 'ico-position_bottom';
        align_self_forward_style = 'bottom:-40px;left:calc(50% - 17px);'
        if(parent[variable_key]['align-items'] == 'flex-end' && elem[variable_key]['align-self'] == 'auto'){align_self_forward_style = `${align_self_forward_style}display:none !important;`}
        else if(elem[variable_key]['align-self'] == 'flex-end'){align_self_forward_style = `${align_self_forward_style}display:none !important;`}

    }
    html = `${html}<div key_tree="${key_tree}" key="backward" class="edit_alignment_btn edit_alignment_btn_self ${align_self_backward_icon}" style="${align_self_backward_style}"></div>`
    html = `${html}<div key_tree="${key_tree}" key="forward" class="edit_alignment_btn edit_alignment_btn_self ${align_self_forward_icon}" style="${align_self_forward_style}"></div>`

    return html;
}
generate_editing_elems_section_block = function(elem,key_tree,style){
    let html = '';
    elem.children.sort((a,b)=>{
        return a.sort - b.sort;
    })
    // html = `${html}<div class="section_block" key_tree="${key_tree}" style="${$('.desktop_view').hasClass('mobile_view') ? style.mobile_container : style.desktop_container }" style_desktop="${style.desktop_container}" style_mobile="${style.mobile_container}">`;
    html = `${html}<div class="section_block" key_tree="${key_tree}" style="${$('.desktop_view').hasClass('mobile_view') ? style.mobile_container : style.desktop_container }">`;
    html = `${html}<div class="select_section_block_title builder_font contextMenu" key_tree="${key_tree}"><div class="ico-see_more"></div><div>${texts.section_block}</div></div>`;
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

    let variable_key = 'css';
    let align_self_check = true;
    window.current_view == 'mobile' ? variable_key = 'css_mobile' : null; 
    for(const key in elem.children){
        if(elem.children[key][variable_key]['align-self'] != 'auto'){
            align_self_check = false;
        }
    }

    alignment_top_start_disabled = '';
    alignment_top_center_disabled = '';
    alignment_top_end_disabled = '';
    alignment_left_start_disabled = '';
    alignment_left_center_disabled = '';
    alignment_left_end_disabled = '';

    if(elem.css['flex-direction'] == 'column'){
        alignment_top_key = 'align-items';
        alignment_left_key = 'justify-content';
        if(align_self_check){
            if(elem[variable_key]['align-items'] == 'flex-start'){alignment_top_start_disabled = 'disabled'}
            if(elem[variable_key]['align-items'] == 'center'){alignment_top_center_disabled = 'disabled'}
            if(elem[variable_key]['align-items'] == 'flex-end'){alignment_top_end_disabled = 'disabled'}
        }
        if(elem[variable_key]['justify-content'] == 'flex-start'){alignment_left_start_disabled = 'disabled'}
        if(elem[variable_key]['justify-content'] == 'center'){alignment_left_center_disabled = 'disabled'}
        if(elem[variable_key]['justify-content'] == 'flex-end'){alignment_left_end_disabled = 'disabled'}

    }else if(elem.css['flex-direction'] == 'row'){
        alignment_top_key = 'justify-content';
        alignment_left_key = 'align-items';
        if(align_self_check){
            if(elem[variable_key]['align-items'] == 'flex-start'){alignment_left_start_disabled = 'disabled'}
            if(elem[variable_key]['align-items'] == 'center'){alignment_left_center_disabled = 'disabled'}
            if(elem[variable_key]['align-items'] == 'flex-end'){alignment_left_end_disabled = 'disabled'}
        }
        if(elem[variable_key]['justify-content'] == 'flex-start'){alignment_top_start_disabled = 'disabled'}
        if(elem[variable_key]['justify-content'] == 'center'){alignment_top_center_disabled = 'disabled'}
        if(elem[variable_key]['justify-content'] == 'flex-end'){alignment_top_end_disabled = 'disabled'}
    }
    html = `${html}<div key="${alignment_top_key}" class="edit_container_alignment_top" key_tree="${key_tree}">
        <button ${alignment_top_start_disabled} key="flex-start" class="edit_alignment_btn edit_alignment_btn_container ico-position_left"></button>
        <button ${alignment_top_center_disabled} key="center" class="edit_alignment_btn edit_alignment_btn_container ico-position_hcenter"></button>
        <button ${alignment_top_end_disabled} key="flex-end" class="edit_alignment_btn edit_alignment_btn_container ico-position_right"></button>
    </div>`;
    html = `${html}<div key="${alignment_left_key}" class="edit_container_alignment_left" key_tree="${key_tree}">
        <button ${alignment_left_start_disabled} key="flex-start" class="edit_alignment_btn edit_alignment_btn_container ico-position_top"></button>
        <button ${alignment_left_center_disabled} key="center" class="edit_alignment_btn edit_alignment_btn_container ico-position_vcenter"></button>
        <button ${alignment_left_end_disabled} key="flex-end" class="edit_alignment_btn edit_alignment_btn_container ico-position_bottom"></button>
    </div>`

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

    let section = get_elem_data(key_tree).elem;
    html = `${html}<div class="select_section_title builder_font contextMenu pointer"  key_tree="${key_tree}"><div class="ico-align_center"></div><div class="" >${section.name}</div></div>`;
    if(elem.accessibility.includes('add_section')){
        html = `${html}<button class="btn btn-cancel add_section add_section_btn_style ico-add" section_sort="${elem.sort}" tooltip="${texts.add_section}"></button>`
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