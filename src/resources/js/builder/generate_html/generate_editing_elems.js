generate_editing_elems_elem = function(elem,key_tree,style){
    let html = '';
    select_class = '';
    // html = `${html}<div class="elem" key_tree="${key_tree}" style="${$('.desktop_view').hasClass('mobile_view') ? style.mobile_container : style.desktop_container }" style_desktop="${style.desktop_container}" style_mobile="${style.mobile_container}">`;
    html = `${html}<div class="elem" key_tree="${key_tree}" style="${$('.desktop_view').hasClass('mobile_view') ? style.mobile_container : style.desktop_container }">`;
    html = `${html}<div class="select_edit_elem_title builder_font contextMenu" key_tree="${key_tree}" contextMenu_type="elem"><div class="ico-see_more"></div><div>${texts.elems[elem.elem_type]}</div></div>`;
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
    return html;
}
generate_editing_elems_section_block = function(elem,key_tree,style){
    let html = '';
    select_class = '';
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