get_blank_section = function() {
    return {
        name: ``,
        sort: 0,
        type: 'section',
        tag: 'section',
        accessibility:[
            'interactions','can_hover',
            'copy',
            'add_section',
            'section_swap',
            'section_dublicate',
            'section_delete',
            'rename',
            'section_sizing',
            'section_spacing',
            'section_adapt_header',
            'section_layout',
            'section_driver',
            'background','background_gradient','background_image',
        ],
        class_selector: hash(),
        css:{
            position: 'relative',
            'box-sizing': 'border-box',
            width: '100%',
        },
        attr:{
            adapt_header: '0',
            adapt_header_color: 'rgba(var(--color_4_7),1)',
        },
        class: '',
        children: {},
        has_driver: '0',
        driver: {
            svg_style: {
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: '100%',
                overflow: 'hidden',
                'line-height': '0',
                display: 'block',
            },
            svg_attr: {
                preserveAspectRatio: 'none',
                viewBox: '0 0 1200 120',
            },
            paths: [{
                path: 'M1200 120L0 16.48 0 0 1200 0 1200 120z',
                color: 'rgba(var(--color_4_7),1)',
            }],
            css: {
                height: '100px',
            },
            css_mobile: {
                height: '100px',
            },
            position: 'bottom',
            flip: '0',
        },

    };
}
get_section_block = function(child_num) {
    let child_key = hash();
    return {
        type: 'section_block',
        tag: 'div',
        accessibility:[
            'interactions','can_hover',
            'add_elem','add_elem_title','add_elem_paragraph','add_elem_image','add_elem_button','add_elem_icon','add_elem_container',
            'copy',
            'alignment',
            'arrange',
            'spacing','margin','padding',
            'styling','border','border_radius','box_shadow',
            'animation',
            'background','background_gradient','background_backdrop_filter','background_image',
            'block_elems',
        ],
        class: '',
        class_selector: `section_block${child_key}`,
        css:get_default_styles(['padding'],{
            'display': 'flex',
            'position': 'relative',
            'box-sizing': 'border-box',
            'grid-area': child_num,
            'z-index':child_num.replace('elem',''),
            'flex-direction': 'column',
            'flex-wrap': 'nowrap',
            'align-items': 'center',
            'justify-content': 'center',
            'margin':'0px 0px 0px 0px',
            'overflow':'visible',
            'gap':'0px',
        }),
        css_mobile:get_default_styles(['padding'],{
            'flex-direction': 'column',
            'flex-wrap': 'nowrap',
            'align-items': 'center',
            'justify-content': 'center',
            'margin':'0px 0px 0px 0px',
            'overflow':'visible',
            'gap':'0px',
        }),
        children: []
    }
}
apply_return_element_changes = function(object, path, value){
    const keys = path.split('.');
    let current = object;
    for (let i = 0; i < keys.length - 1; i++) {
        // current = current[keys[i]];
        const key = keys[i];
            // If current is undefined or null, create an empty object or array depending on the key
            if (!current[key]) {
                current[key] = isNaN(keys[i + 1]) ? {} : []; // Create {} for objects, [] for arrays
            }
            current = current[key];
    }
    if(value === null){
        delete current[keys[keys.length - 1]];
    }else{
        current[keys[keys.length - 1]] = value;
    }
}

get_sections_layouts = function(key = null,changes = null) {
    let layouts = [{
            tag: 'div',
            type: 'section_wrapper',
            class_selector: `section_wrapper${hash()}`,
            css:get_default_style('section_wrapper',{
                'grid-template-areas': `'elem1'`,
                'grid-template-columns': 'repeat(1, 1fr)',
            }),
            css_mobile:{
                'grid-template-areas': `'elem1'`,
                'grid-template-columns': 'repeat(1, 1fr)',
            },
            children: [
                get_section_block('elem1'),
            ]
        },
        {
            tag: 'div',
            type: 'section_wrapper',
            class_selector: `section_wrapper${hash()}`,
            css:get_default_style('section_wrapper',{
                'grid-template-areas': `'elem1 elem2'`,
                'grid-template-columns': 'repeat(2, minmax(auto,1fr))',
            }),
            css_mobile:{
                'grid-template-areas': `'elem1''elem2'`,
                'grid-template-columns': 'repeat(1, 1fr)',
                'grid-template-rows': 'repeat(2, auto)',
            },
            children: [
                get_section_block('elem1'),
                get_section_block('elem2'),
            ]
        },
        {
            tag: 'div',
            type: 'section_wrapper',
            class_selector: `section_wrapper${hash()}`,
            css:get_default_style('section_wrapper',{
                'grid-template-areas': `'elem1 elem3''elem2 elem3'`,
                'grid-template-rows': 'repeat(2, minmax(50px,auto))',
                'grid-template-columns': 'repeat(2, minmax(auto,1fr))',
            }),
            css_mobile:{
                'grid-template-areas': `'elem1''elem2''elem3'`,
                'grid-template-columns': 'repeat(1, 1fr)',
                'grid-template-rows': 'repeat(3, auto)',
            },
            children: [
                get_section_block('elem1'),
                get_section_block('elem2'),
                get_section_block('elem3'),
            ]
        },
        {
            tag: 'div',
            type: 'section_wrapper',
            class_selector: `section_wrapper${hash()}`,
            css:get_default_style('section_wrapper',{
                'grid-template-areas': `'elem1 elem2''elem1 elem3'`,
                'grid-template-rows': 'repeat(2, minmax(50px,auto))',
                'grid-template-columns': 'repeat(2, minmax(auto,1fr))',
            }),
            css_mobile:{
                'grid-template-areas': `'elem1''elem2''elem3'`,
                'grid-template-columns': 'repeat(1, 1fr)',
                'grid-template-rows': 'repeat(3, auto)',
            },
            children: [
                get_section_block('elem1'),
                get_section_block('elem2'),
                get_section_block('elem3'),
            ]
        },
        {
            tag: 'div',
            type: 'section_wrapper',
            class_selector: `section_wrapper${hash()}`,
            css:get_default_style('section_wrapper',{
                'grid-template-areas': `'elem1 elem1 elem2''elem1 elem1 elem3'`,
                'grid-template-rows': 'repeat(2, minmax(50px,auto))',
                'grid-template-columns': 'repeat(3, minmax(auto,1fr))',
            }),
            css_mobile:{
                'grid-template-areas': `'elem1''elem2''elem3'`,
                'grid-template-columns': 'repeat(1, 1fr)',
                'grid-template-rows': 'repeat(3, auto)',
            },
            children: [
                get_section_block('elem1'),
                get_section_block('elem2'),
                get_section_block('elem3'),
            ]
        },
        {
            tag: 'div',
            type: 'section_wrapper',
            class_selector: `section_wrapper${hash()}`,
            css:get_default_style('section_wrapper',{
                'grid-template-areas': `'elem1 elem3 elem3''elem2 elem3 elem3'`,
                'grid-template-rows': 'repeat(2, minmax(50px,auto))',
                'grid-template-columns': 'repeat(3, minmax(auto,1fr))',
            }),
            css_mobile:{
                'grid-template-areas': `'elem1''elem2''elem3'`,
                'grid-template-columns': 'repeat(1, 1fr)',
                'grid-template-rows': 'repeat(3, auto)',
            },
            children: [
                get_section_block('elem1'),
                get_section_block('elem2'),
                get_section_block('elem3'),
            ]
        },
        {
            tag: 'div',
            type: 'section_wrapper',
            class_selector: `section_wrapper${hash()}`,
            css:get_default_style('section_wrapper',{
                'grid-template-areas': `'elem1' 'elem2'`,
                'grid-template-rows': 'repeat(2, minmax(50px,auto))',
                'grid-template-columns': 'repeat(1, 1fr)',
            }),
            css_mobile:{
                'grid-template-areas': `'elem1''elem2'`,
                'grid-template-columns': 'repeat(1, 1fr)',
                'grid-template-rows': 'repeat(2, auto)',
            },
            children: [
                get_section_block('elem1'),
                get_section_block('elem2'),
            ]
        },
        {
            tag: 'div',
            type: 'section_wrapper',
            class_selector: `section_wrapper${hash()}`,
            css:get_default_style('section_wrapper',{
                'grid-template-areas': `'elem1 elem1' 'elem2 elem3'`,
                'grid-template-rows': 'repeat(2, minmax(50px,auto))',
                'grid-template-columns': 'repeat(2, minmax(auto,1fr))',
            }),
            css_mobile:{
                'grid-template-areas': `'elem1''elem2''elem3'`,
                'grid-template-columns': 'repeat(1, 1fr)',
                'grid-template-rows': 'repeat(3, auto)',
            },
            children: [
                get_section_block('elem1'),
                get_section_block('elem2'),
                get_section_block('elem3'),
            ]
        },
        {
            tag: 'div',
            type: 'section_wrapper',
            class_selector: `section_wrapper${hash()}`,
            css:get_default_style('section_wrapper',{
                'grid-template-areas': `'elem1 elem2' 'elem3 elem3'`,
                'grid-template-rows': 'repeat(2, minmax(50px,auto))',
                'grid-template-columns': 'repeat(2, minmax(auto,1fr))',
            }),
            css_mobile:{
                'grid-template-areas': `'elem1''elem2''elem3'`,
                'grid-template-columns': 'repeat(1, 1fr)',
                'grid-template-rows': 'repeat(3, auto)',
            },
            children: [
                get_section_block('elem1'),
                get_section_block('elem2'),
                get_section_block('elem3'),
            ]
        },
        {
            tag: 'div',
            type: 'section_wrapper',
            class_selector: `section_wrapper${hash()}`,
            css:get_default_style('section_wrapper',{
                'grid-template-areas': `'elem1 elem2' 'elem3 elem4'`,
                'grid-template-rows': 'repeat(2, minmax(50px,auto))',
                'grid-template-columns': 'repeat(2, minmax(auto,1fr))',
            }),
            css_mobile:{
                'grid-template-areas': `'elem1''elem2''elem3''elem4'`,
                'grid-template-columns': 'repeat(1, 1fr)',
                'grid-template-rows': 'repeat(4, auto)',
            },
            children: [
                get_section_block('elem1'),
                get_section_block('elem2'),
                get_section_block('elem3'),
                get_section_block('elem4'),
            ]
        },
        {
            tag: 'div',
            type: 'section_wrapper',
            class_selector: `section_wrapper${hash()}`,
            css:get_default_style('section_wrapper',{
                'grid-template-areas': `'elem1 elem2 elem3'`,
                'grid-template-columns': 'repeat(3, minmax(auto,1fr))',
            }),
            css_mobile:{
                'grid-template-areas': `'elem1''elem2''elem3'`,
                'grid-template-columns': 'repeat(1, 1fr)',/////
                'grid-template-rows': 'repeat(3, auto)',
            },
            children: [
                get_section_block('elem1'),
                get_section_block('elem2'),
                get_section_block('elem3'),
            ]
        },
        {
            tag: 'div',
            type: 'section_wrapper',
            class_selector: `section_wrapper${hash()}`,
            css:get_default_style('section_wrapper',{
                'grid-template-areas': `'elem1 elem3 elem4''elem2 elem3 elem4'`,
                'grid-template-rows': 'repeat(2, minmax(50px,auto))',
                'grid-template-columns': 'repeat(3, minmax(auto,1fr))',
            }),
            css_mobile:{
                'grid-template-areas': `'elem1''elem2''elem3''elem4'`,
                'grid-template-columns': 'repeat(1, 1fr)',
                'grid-template-rows': 'repeat(4, auto)',
            },
            children: [
                get_section_block('elem1'),
                get_section_block('elem2'),
                get_section_block('elem3'),
                get_section_block('elem4'),
            ]
        },
        {
            tag: 'div',
            type: 'section_wrapper',
            class_selector: `section_wrapper${hash()}`,
            css:get_default_style('section_wrapper',{
                'grid-template-areas': `'elem1 elem2 elem4''elem1 elem3 elem4'`,
                'grid-template-rows': 'repeat(2, minmax(50px,auto))',
                'grid-template-columns': 'repeat(3, minmax(auto,1fr))',
            }),
            css_mobile:{
                'grid-template-areas': `'elem1''elem2''elem3''elem4'`,
                'grid-template-columns': 'repeat(1, 1fr)',
                'grid-template-rows': 'repeat(4, auto)',
            },
            children: [
                get_section_block('elem1'),
                get_section_block('elem2'),
                get_section_block('elem3'),
                get_section_block('elem4'),
            ]
        },
        {
            tag: 'div',
            type: 'section_wrapper',
            class_selector: `section_wrapper${hash()}`,
            css:get_default_style('section_wrapper',{
                'grid-template-areas': `'elem1 elem2 elem3''elem1 elem2 elem4'`,
                'grid-template-rows': 'repeat(2, minmax(50px,auto))',
                'grid-template-columns': 'repeat(3, minmax(auto,1fr))',
            }),
            css_mobile:{
                'grid-template-areas': `'elem1''elem2''elem3''elem4'`,
                'grid-template-columns': 'repeat(1, 1fr)',
                'grid-template-rows': 'repeat(4, auto)',
            },
            children: [
                get_section_block('elem1'),
                get_section_block('elem2'),
                get_section_block('elem3'),
                get_section_block('elem4'),
            ]
        },
        {
            tag: 'div',
            type: 'section_wrapper',
            class_selector: `section_wrapper${hash()}`,
            css:get_default_style('section_wrapper',{
                'grid-template-areas': `'elem1 elem3 elem5''elem2 elem4 elem5'`,
                'grid-template-rows': 'repeat(2, minmax(50px,auto))',
                'grid-template-columns': 'repeat(3, minmax(auto,1fr))',
            }),
            css_mobile:{
                'grid-template-areas': `'elem1''elem2''elem3''elem4''elem5'`,
                'grid-template-columns': 'repeat(1, 1fr)',
                'grid-template-rows': 'repeat(5, auto)',
            },
            children: [
                get_section_block('elem1'),
                get_section_block('elem2'),
                get_section_block('elem3'),
                get_section_block('elem4'),
                get_section_block('elem5'),
            ]
        },
        {
            tag: 'div',
            type: 'section_wrapper',
            class_selector: `section_wrapper${hash()}`,
            css:get_default_style('section_wrapper',{
                'grid-template-areas': `'elem1 elem3 elem4''elem2 elem3 elem5'`,
                'grid-template-rows': 'repeat(2, minmax(50px,auto))',
                'grid-template-columns': 'repeat(3, minmax(auto,1fr))',
            }),
            css_mobile:{
                'grid-template-areas': `'elem1''elem2''elem3''elem4''elem5'`,
                'grid-template-columns': 'repeat(1, 1fr)',
                'grid-template-rows': 'repeat(5, auto)',
            },
            children: [
                get_section_block('elem1'),
                get_section_block('elem2'),
                get_section_block('elem3'),
                get_section_block('elem4'),
                get_section_block('elem5'),
            ]
        },
        {
            tag: 'div',
            type: 'section_wrapper',
            class_selector: `section_wrapper${hash()}`,
            css:get_default_style('section_wrapper',{
                'grid-template-areas': `'elem1 elem2 elem4''elem1 elem3 elem5'`,
                'grid-template-rows': 'repeat(2, minmax(50px,auto))',
                'grid-template-columns': 'repeat(3, minmax(auto,1fr))',
            }),
            css_mobile:{
                'grid-template-areas': `'elem1''elem2''elem3''elem4''elem5'`,
                'grid-template-columns': 'repeat(1, 1fr)',
                'grid-template-rows': 'repeat(5, auto)',
            },
            children: [
                get_section_block('elem1'),
                get_section_block('elem2'),
                get_section_block('elem3'),
                get_section_block('elem4'),
                get_section_block('elem5'),
            ]
        },
        {
            tag: 'div',
            type: 'section_wrapper',
            class_selector: `section_wrapper${hash()}`,
            css:get_default_style('section_wrapper',{
                'grid-template-areas': `'elem1 elem3 elem5''elem2 elem4 elem6'`,
                'grid-template-rows': 'repeat(2, minmax(50px,auto))',
                'grid-template-columns': 'repeat(3, minmax(auto,1fr))',
            }),
            css_mobile:{
                'grid-template-areas': `'elem1''elem2''elem3''elem4''elem5''elem6'`,
                'grid-template-columns': 'repeat(1, 1fr)',
                'grid-template-rows': 'repeat(6, auto)',
            },
            children: [
                get_section_block('elem1'),
                get_section_block('elem2'),
                get_section_block('elem3'),
                get_section_block('elem4'),
                get_section_block('elem5'),
                get_section_block('elem6'),
            ]
        },

    ];
    if(key !== null){
        let selected_layout = { ...layouts[key] };
        if(changes !== null){
            Object.keys(changes).forEach(changeKey => {
                apply_return_element_changes(selected_layout, changeKey, changes[changeKey]);
            });
            for(const _key in selected_layout.children){
                selected_layout.children[_key].sort = parseInt(_key);
                for(const _key2 in selected_layout.children[_key].children){
                    selected_layout.children[_key].children[_key2].sort = parseInt(_key2)
                }
            }
        }
        return selected_layout;
    }else{
        return layouts
    }
}
elem_title = function(changes=null){
    let this_hash = hash();
    let title = {
        type: 'elem',
        elem_type: 'title',
        tag: 'h1',
        accessibility:[
            'interactions','can_hover','can_click','can_parent_hover',
            'elem_swap','elem_dublicate','elem_delete',
            'copy',
            'text_style','edit_text','text_color','select_font',
            'display',
            'arrange',
            'sizing','width','height',
            'spacing','margin','padding',
            'styling','filter','border','border_radius','box_shadow','transform',
            'animation',
            'background','background_gradient','background_backdrop_filter','background_image',
        ],
        class_selector: `h1${this_hash}`,
        font_style: {},
        css:get_default_styles(['width','height','padding','margin'],{
            'box-sizing': 'border-box',
            'position': 'relative',
            'z-index':'1',
            'display':'block',
            'overflow':'visible',
            'align-self':'auto',
            //
            'font-weight':'normal',
            'line-height':'inherit',
            'letter-spacing':'inherit',
            'font-size':'1.5em',
            'text-align':'start',
        }),
        css_mobile:get_default_styles(['width','height','padding','margin'],{
            'display':'block',
            'overflow':'visible',
            'align-self':'auto',
            //
            'font-weight':'normal',
            'line-height':'inherit',
            'letter-spacing':'inherit',
            'font-size':'1.5em',
            'text-align':'start',
        }),
        class: '',
        text: {
            key: `h1${this_hash}`,
            val: {}
        },
    }
    if(changes !== null){
        Object.keys(changes).forEach(changeKey => {
            apply_return_element_changes(title, changeKey, changes[changeKey]);
        });
    }
    return title;
}
elem_paragraph = function(){
    let this_hash = hash();
    return {
        type: 'elem',
        elem_type: 'paragraph',
        tag: 'p',
        accessibility:[
            'interactions','can_hover','can_click','can_parent_hover',
            'elem_swap','elem_dublicate','elem_delete',
            'copy',
            'text_style','edit_text','text_color','select_font',
            'display',
            'arrange',
            'sizing','width','height',
            'spacing','margin','padding',
            'styling','filter','border','border_radius','box_shadow','transform',
            'animation',
            'background','background_gradient','background_backdrop_filter','background_image',
        ],
        class_selector: `p${this_hash}`,
        font_style: {},
        css:get_default_styles(['width','height','padding','margin'],{
            'box-sizing': 'border-box',
            'position': 'relative',
            'z-index':'1',
            'display':'block',
            'overflow':'visible',
            'align-self':'auto',
            //
            'line-height':'inherit',
            'letter-spacing':'inherit',
            'font-size':'1em',
            'text-align':'start',
        }),
        css_mobile:get_default_styles(['width','height','padding','margin'],{
            'display':'block',
            'overflow':'visible',
            'align-self':'auto',
            //
            'line-height':'inherit',
            'letter-spacing':'inherit',
            'font-size':'1em',
            'text-align':'start',
        }),
        class: '',
        text: {
            key: `p${this_hash}`,
            val: {}
        },
    }
}
elem_image = function(){
    let this_hash = hash();
    return {
        type: 'elem',
        elem_type: 'image',
        tag: 'img',
        accessibility:[
            'interactions','can_hover','can_click','can_parent_hover',
            'elem_swap','elem_dublicate','elem_delete',
            'copy',
            'image','select_image',
            'display',
            'arrange',
            'sizing','width','height',
            'spacing','margin','padding',
            'styling','filter','border','border_radius','box_shadow','transform',
            'animation',
        ],
        class_selector: `image${this_hash}`,
        css:get_default_styles(['width','height','padding','margin'],{
            'box-sizing': 'border-box',
            'position': 'relative',
            'z-index':'1',
            'display':'block',
            'overflow':'hidden',
            'align-self':'auto',
            'object-position':'center center',
            'object-fit':'contain',
            'aspect-ratio':'auto',
        }),
        css_mobile:get_default_styles(['width','height','padding','margin'],{
            'display':'block',
            'overflow':'hidden',
            'align-self':'auto',
            'object-position':'center center',
            'object-fit':'contain',
            'aspect-ratio':'auto',
        }),
        css_hover:{},
        css_hover_mobile:{},
        css_click:{},
        css_click_mobile:{},
        class: '',
        attr:{
            src:'',
            alt:`img${this_hash}`,
        }
    }
}
elem_button = function(){
    let this_hash = hash();
    return {
        type: 'elem',
        elem_type: 'button',
        tag: 'button',
        accessibility:[
            'interactions','hover','click','focus','disabled','can_hover','can_click','can_focus','can_disabled','can_parent_hover',
            'elem_swap','elem_dublicate','elem_delete',
            'copy',
            'button','button_function',
            'text_style','text_color','edit_text','select_font',
            'display',
            'arrange',
            'sizing','width','height',
            'spacing','margin','padding',
            'styling','filter','border','border_radius','box_shadow','transform',
            'animation',
            'background','background_gradient','background_backdrop_filter',
        ],
        class_selector: `btn${this_hash}`,
        font_style: {},
        css:get_default_styles(['width','height'],{
            'box-sizing': 'border-box',
            'position': 'relative',
            'cursor':'pointer',
            'z-index':'1',
            'display':'block',
            'overflow':'visible',
            'align-self':'auto',
            'font-weight':'normal',
            'line-height':'inherit',
            'letter-spacing':'inherit',
            'font-size':'1em',
            'text-align':'center',
            'padding':'10px 20px 10px 20px',
            'margin':'0px 0px 0px 0px',
        }),
        css_mobile:get_default_styles(['width','height'],{
            'display':'block',
            'overflow':'visible',
            'align-self':'auto',
            'font-weight':'normal',
            'line-height':'inherit',
            'letter-spacing':'inherit',
            'font-size':'1em',
            'text-align':'center',
            'padding':'10px 20px 10px 20px',
            'margin':'0px 0px 0px 0px',
        }),
        css_hover:{},
        css_hover_mobile:{},
        css_click:{},
        css_click_mobile:{},
        css_focus:{},
        css_focus_mobile:{},
        css_disabled:{
            'cursor':'not-allowed',
            'pointer-events':'none',
            'color':`rgba(var(--color_4_6),1)`,
        },
        css_disabled_mobile:{
            'color':`rgba(var(--color_4_6),1)`,
        },
        class:'',
        text: {
            key: `btn${this_hash}`,
            val: {}
        },
        attr:{
            href:'null',
        },
    }
}
elem_icon = function(){
    let this_hash = hash();
    return {
        type: 'elem',
        elem_type: 'icon',
        tag: 'img',
        accessibility:[
            'interactions','can_hover','can_click','can_parent_hover',
            'elem_swap','elem_dublicate','elem_delete',
            'copy',
            'icon','select_icon',
            'display',
            'arrange',
            'spacing','margin','padding',
            'styling','filter','border','border_radius','box_shadow','transform',
            'animation',
        ],
        class_selector: `icon${this_hash}`,
        css:get_default_styles(['padding','margin'],{
            'box-sizing': 'border-box',
            'position': 'relative',
            'z-index':'1',
            'display':'block',
            'overflow':'hidden',
            'align-self':'auto',
            'width': '150px',
            'height': 'auto',
        }),
        css_mobile:get_default_styles(['padding','margin'],{
            'display':'block',
            'overflow':'hidden',
            'align-self':'auto',
            'width': '150px',
            'height': 'auto',
        }),
        class: '',
        attr:{
            src:''
        }
    }
}
elem_container = function(changes = null){
    let child_key = hash();
    let container =  {
        type:'container',
        name:texts.elems.container,
        tag:'div',
        accessibility:[
            'interactions','can_hover','can_parent_hover',
            'add_elem','add_elem_title','add_elem_paragraph','add_elem_image','add_elem_button','add_elem_icon',
            'rename',
            'copy',
            'elem_swap','elem_dublicate','elem_delete',
            'alignment',
            'display',
            'arrange',
            'sizing','width','height',
            'spacing','margin','padding',
            'styling','border','border_radius','box_shadow','transform','filter',
            'animation',
            'background','background_gradient','background_backdrop_filter','background_image',
            'block_elems',
        ],  
        class: '',
        class_selector: `container${child_key}`,
        css:get_default_styles(['width','height','padding','margin'],{
            'display': 'flex',
            'position': 'relative',
            'box-sizing': 'border-box',
            'z-index':'1',
            'flex-direction': 'column',
            'flex-wrap': 'nowrap',
            'align-items': 'center',
            'justify-content': 'center',
            'align-self':'auto',
            'overflow':'visible',
            'gap':'10px',
        }),
        css_mobile:get_default_styles(['width','height','padding','margin'],{
            'flex-direction': 'column',
            'flex-wrap': 'nowrap',
            'align-items': 'center',
            'justify-content': 'center',
            'align-self':'auto',
            'overflow':'visible',
            'gap':'10px',
        }),
        children: []
    }
    if(changes !== null){
        Object.keys(changes).forEach(changeKey => {
            apply_return_element_changes(container, changeKey, changes[changeKey]);
        });
        for(const _key in container.children){
            container.children[_key].sort = _key
        }
    }
    return container;
}