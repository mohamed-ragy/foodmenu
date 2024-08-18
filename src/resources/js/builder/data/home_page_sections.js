//accessibility
//interactions,can_hover,can_click,can_focus,can_disabled,can_parent_hover
//hover
//parent_hover
//click
//focus
//disabled
//copy
//add_section
//section_swap
//section_dublicate
//section_delete
//section_rename
//section_sizing
//section_spacing
//section_adapt_header
//section_layout
//section_driver
//add_elem
//add_elem_title
//add_elem_paragraph
//add_elem_image
//add_elem_button
//add_elem_icon
//alignment
//sizing
//width
//height
//spacing
//padding
//margin
//styling
//filter
//border
//border_radius
//box_shadow
//transform
//animation
//background
//block_elems
//block_arrange
//elem_swap
//elem_dublicate
//elem_delete
//button
//text
//edit_text
//image
//select_image
//icon
//select_icon
//display
//elem_arrange
//header_sizing
//header_layout
//header_logo_alignment
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
            'section_rename',
            'section_sizing',
            'section_spacing',
            'section_adapt_header',
            'section_layout',
            'section_driver',
            'background',
        ],
        class_selector: hash(),
        css:get_default_styles(['transition-duration','transition-delay','transition-timing-function'],{
            position: 'relative',
            'box-sizing': 'border-box',
            width: '100%',
        }),
        css_mobile:get_default_styles(['transition-duration','transition-delay','transition-timing-function'],{}),
        attr:{
            adapt_header: '0',
            adapt_header_color: 'rgba(var(--color_4_7),1)',
        },
        background:get_default_style('background'),
        background_mobile:get_default_style('background'),
        background_hover:get_default_style('background'),
        background_hover_mobile:get_default_style('background'),
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
                color: 'rgba(255,255,255,1)',
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
            'add_elem','add_elem_title','add_elem_paragraph','add_elem_image','add_elem_button','add_elem_icon',
            'copy',
            'alignment',
            'block_arrange',
            'spacing','margin','padding',
            'styling','border','border_radius','box_shadow',
            'animation',
            'background',
            'block_elems',
        ],
        class: '',
        class_selector: `section_block${child_key}`,
        background:get_default_style('background'),
        background_mobile:get_default_style('background'),
        background_hover:get_default_style('background'),
        background_hover_mobile:get_default_style('background'),
        css:get_default_styles(['padding','border','border-radius','box-shadow','transition-duration','transition-delay','transition-timing-function'],{
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
        }),
        css_mobile:get_default_styles(['padding','border','border-radius','box-shadow','transition-duration','transition-delay','transition-timing-function'],{
            'flex-direction': 'column',
            'flex-wrap': 'nowrap',
            'align-items': 'center',
            'justify-content': 'center',
            'margin':'0px 0px 0px 0px',
            'overflow':'visible',
        }),
        css_hover:get_default_styles(['border','border-radius','box-shadow'],{}),
        css_hover_mobile:get_default_styles(['border','border-radius','box-shadow'],{}),
        animation: get_default_style('animation'),
        animation_mobile: get_default_style('animation'),
        children: []
    }
}
get_sections_layouts = function() {
    return [{
            tag: 'div',
            type: 'section_wrapper',
            class_selector: `section_wrapper${hash()}`,
            css:get_default_style('section_wrapper',{
                'grid-template-areas': `'elem1'`,
                'grid-template-columns': 'repeat(1, 1fr)',
            }),
            css_mobile:get_default_style('section_wrapper_mobile',{
                'grid-template-areas': `'elem1'`,
                'grid-template-columns': 'repeat(1, 1fr)',
            }),
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
            css_mobile:get_default_style('section_wrapper_mobile',{
                'grid-template-areas': `'elem1''elem2'`,
                'grid-template-columns': 'repeat(1, 1fr)',
                'grid-template-rows': 'repeat(2, auto)',
            }),
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
            css_mobile:get_default_style('section_wrapper_mobile',{
                'grid-template-areas': `'elem1''elem2''elem3'`,
                'grid-template-columns': 'repeat(1, 1fr)',
                'grid-template-rows': 'repeat(3, auto)',
            }),
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
            css_mobile:get_default_style('section_wrapper_mobile',{
                'grid-template-areas': `'elem1''elem2''elem3'`,
                'grid-template-columns': 'repeat(1, 1fr)',
                'grid-template-rows': 'repeat(3, auto)',
            }),
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
            css_mobile:get_default_style('section_wrapper_mobile',{
                'grid-template-areas': `'elem1''elem2''elem3'`,
                'grid-template-columns': 'repeat(1, 1fr)',
                'grid-template-rows': 'repeat(3, auto)',
            }),
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
            css_mobile:get_default_style('section_wrapper_mobile',{
                'grid-template-areas': `'elem1''elem2''elem3'`,
                'grid-template-columns': 'repeat(1, 1fr)',
                'grid-template-rows': 'repeat(3, auto)',
            }),
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
            css_mobile:get_default_style('section_wrapper_mobile',{
                'grid-template-areas': `'elem1''elem2'`,
                'grid-template-columns': 'repeat(1, 1fr)',
                'grid-template-rows': 'repeat(2, auto)',
            }),
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
            css_mobile:get_default_style('section_wrapper_mobile',{
                'grid-template-areas': `'elem1''elem2''elem3'`,
                'grid-template-columns': 'repeat(1, 1fr)',
                'grid-template-rows': 'repeat(3, auto)',
            }),
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
            css_mobile:get_default_style('section_wrapper_mobile',{
                'grid-template-areas': `'elem1''elem2''elem3'`,
                'grid-template-columns': 'repeat(1, 1fr)',
                'grid-template-rows': 'repeat(3, auto)',
            }),
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
            css_mobile:get_default_style('section_wrapper_mobile',{
                'grid-template-areas': `'elem1''elem2''elem3''elem4'`,
                'grid-template-columns': 'repeat(1, 1fr)',
                'grid-template-rows': 'repeat(4, auto)',
            }),
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
            css_mobile:get_default_style('section_wrapper_mobile',{
                'grid-template-areas': `'elem1''elem2''elem3'`,
                'grid-template-columns': 'repeat(1, 1fr)',/////
                'grid-template-rows': 'repeat(3, auto)',
            }),
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
            css_mobile:get_default_style('section_wrapper_mobile',{
                'grid-template-areas': `'elem1''elem2''elem3''elem4'`,
                'grid-template-columns': 'repeat(1, 1fr)',
                'grid-template-rows': 'repeat(4, auto)',
            }),
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
            css_mobile:get_default_style('section_wrapper_mobile',{
                'grid-template-areas': `'elem1''elem2''elem3''elem4'`,
                'grid-template-columns': 'repeat(1, 1fr)',
                'grid-template-rows': 'repeat(4, auto)',
            }),
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
            css_mobile:get_default_style('section_wrapper_mobile',{
                'grid-template-areas': `'elem1''elem2''elem3''elem4'`,
                'grid-template-columns': 'repeat(1, 1fr)',
                'grid-template-rows': 'repeat(4, auto)',
            }),
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
            css_mobile:get_default_style('section_wrapper_mobile',{
                'grid-template-areas': `'elem1''elem2''elem3''elem4''elem5'`,
                'grid-template-columns': 'repeat(1, 1fr)',
                'grid-template-rows': 'repeat(5, auto)',
            }),
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
            css_mobile:get_default_style('section_wrapper_mobile',{
                'grid-template-areas': `'elem1''elem2''elem3''elem4''elem5'`,
                'grid-template-columns': 'repeat(1, 1fr)',
                'grid-template-rows': 'repeat(5, auto)',
            }),
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
            css_mobile:get_default_style('section_wrapper_mobile',{
                'grid-template-areas': `'elem1''elem2''elem3''elem4''elem5'`,
                'grid-template-columns': 'repeat(1, 1fr)',
                'grid-template-rows': 'repeat(5, auto)',
            }),
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
            css_mobile:get_default_style('section_wrapper_mobile',{
                'grid-template-areas': `'elem1''elem2''elem3''elem4''elem5''elem6'`,
                'grid-template-columns': 'repeat(1, 1fr)',
                'grid-template-rows': 'repeat(6, auto)',
            }),
            children: [
                get_section_block('elem1'),
                get_section_block('elem2'),
                get_section_block('elem3'),
                get_section_block('elem4'),
                get_section_block('elem5'),
                get_section_block('elem6'),
            ]
        },

    ]
}

elem_title = function(){
    let empty_langs = {};
    let font_styles = {};
    for (const key in window.website_data.languages) {
        empty_langs[window.website_data.languages[key].code] = `<span style="font-weight: normal; font-style: normal; text-decoration: none; font-size: 1em;" class="format_container">${texts.elems.title_placholder}</span>`
        font_styles[window.website_data.languages[key].code] = 'default';
    }
    let this_hash = hash();
    return {
        type: 'elem',
        elem_type: 'title',
        tag: 'h1',
        accessibility:[
            'interactions','can_hover','can_click','can_parent_hover',
            'elem_swap','elem_dublicate','elem_delete',
            'copy',
            'text','edit_text',
            'display',
            'elem_arrange',
            'sizing','width','height',
            'spacing','margin','padding',
            'styling','filter','border','border_radius','box_shadow','transform',
            'animation',
            'background',
        ],
        class_selector: `h1${this_hash}`,
        font_style: {},
        background:get_default_style('background'),
        background_mobile:get_default_style('background'),
        background_hover:get_default_style('background'),
        background_hover_mobile:get_default_style('background'),
        css:get_default_styles(['width','height','padding','margin','border','border-radius','box-shadow','filter','transform','transform-origin','transition-duration','transition-delay','transition-timing-function'],{
            'box-sizing': 'border-box',
            'position': 'relative',
            'z-index':'1',
            'display':'block',
            'overflow':'visible',
            'align-self':'auto',
            //
            'font-weight':'normal',
            'line-height':'1.3em',
            'letter-spacing':'0.05em',
            'font-size':'1.5em',
            'text-align':'start',
        }),
        css_mobile:get_default_styles(['width','height','padding','margin','border','border-radius','box-shadow','filter','transform','transform-origin','transition-duration','transition-delay','transition-timing-function'],{
            'display':'block',
            'overflow':'visible',
            'align-self':'auto',
            //
            'font-weight':'normal',
            'line-height':'1.3em',
            'letter-spacing':'0.05em',
            'font-size':'1.5em',
            'text-align':'start',
        }),
        css_hover:get_default_styles(['border','border-radius','box-shadow','filter','transform','transform-origin'],{}),
        css_hover_mobile:get_default_styles(['border','border-radius','box-shadow','filter','transform','transform-origin'],{}),
        css_click:get_default_styles(['border','border-radius','box-shadow','filter','transform','transform-origin'],{}),
        css_click_mobile:get_default_styles(['border','border-radius','box-shadow','filter','transform','transform-origin'],{}),
        animation: get_default_style('animation'),
        animation_mobile: get_default_style('animation'),
        class: '',
        text: {
            key: `h1${this_hash}`,
            val: empty_langs
        },
    }
}
elem_paragraph = function(){
    let empty_langs = {};
    let font_styles = {};
    for (const key in window.website_data.languages) {
        empty_langs[window.website_data.languages[key].code] = `<span style="font-weight: normal; font-style: normal; text-decoration: none; font-size: 1em;" class="format_container">${texts.elems.paragraph_placholder}</span>`
        font_styles[window.website_data.languages[key].code] = 'default';
    }
    let this_hash = hash();
    return {
        type: 'elem',
        elem_type: 'paragraph',
        tag: 'p',
        accessibility:[
            'interactions','can_hover','can_click','can_parent_hover',
            'elem_swap','elem_dublicate','elem_delete',
            'copy',
            'text','edit_text',
            'display',
            'elem_arrange',
            'sizing','width','height',
            'spacing','margin','padding',
            'styling','filter','border','border_radius','box_shadow','transform',
            'animation',
            'background',
        ],
        class_selector: `p${this_hash}`,
        font_style: {},
        background:get_default_style('background'),
        background_mobile:get_default_style('background'),
        background_hover:get_default_style('background'),
        background_hover_mobile:get_default_style('background'),
        css:get_default_styles(['width','height','padding','margin','border','border-radius','box-shadow','filter','transform','transform-origin','transition-duration','transition-delay','transition-timing-function'],{
            'box-sizing': 'border-box',
            'position': 'relative',
            'z-index':'1',
            'display':'block',
            'overflow':'visible',
            'align-self':'auto',
            //
            'line-height':'1.3em',
            'letter-spacing':'0.05em',
            'font-size':'1em',
            'text-align':'start',
        }),
        css_mobile:get_default_styles(['width','height','padding','margin','border','border-radius','box-shadow','filter','transform','transform-origin','transition-duration','transition-delay','transition-timing-function'],{
            'display':'block',
            'overflow':'visible',
            'align-self':'auto',
            //
            'line-height':'1.3em',
            'letter-spacing':'0.05em',
            'font-size':'1em',
            'text-align':'start',
        }),
        css_hover:get_default_styles(['border','border-radius','box-shadow','filter','transform','transform-origin'],{}),
        css_hover_mobile:get_default_styles(['border','border-radius','box-shadow','filter','transform','transform-origin'],{}),
        css_click:get_default_styles(['border','border-radius','box-shadow','filter','transform','transform-origin'],{}),
        css_click_mobile:get_default_styles(['border','border-radius','box-shadow','filter','transform','transform-origin'],{}),
        animation: get_default_style('animation'),
        animation_mobile: get_default_style('animation'),
        class: '',
        text: {
            key: `p${this_hash}`,
            val: empty_langs
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
            'elem_arrange',
            'sizing','width','height',
            'spacing','margin','padding',
            'styling','filter','border','border_radius','box_shadow','transform',
            'animation',
        ],
        class_selector: `img${this_hash}`,
        css:get_default_styles(['width','height','padding','margin','border','border-radius','box-shadow','filter','transform','transform-origin','transition-duration','transition-delay','transition-timing-function'],{
            'box-sizing': 'border-box',
            'position': 'relative',
            'z-index':'1',
            'display':'block',
            'overflow':'hidden',
            'align-self':'auto',
            'object-position':'center',
            'object-fit':'contain',
            'aspect-ratio':'auto',
        }),
        css_mobile:get_default_styles(['width','height','padding','margin','border','border-radius','box-shadow','filter','transform','transform-origin','transition-duration','transition-delay','transition-timing-function'],{
            'display':'block',
            'overflow':'hidden',
            'align-self':'auto',
            'object-position':'center',
            'object-fit':'contain',
            'aspect-ratio':'auto',
        }),
        css_hover:get_default_styles(['border','border-radius','box-shadow','filter','transform','transform-origin'],{}),
        css_hover_mobile:get_default_styles(['border','border-radius','box-shadow','filter','transform','transform-origin'],{}),
        css_click:get_default_styles(['border','border-radius','box-shadow','filter','transform','transform-origin'],{}),
        css_click_mobile:get_default_styles(['border','border-radius','box-shadow','filter','transform','transform-origin'],{}),
        animation: get_default_style('animation'),
        animation_mobile: get_default_style('animation'),
        class: '',
        attr:{
            src:'',
            alt:`img${this_hash}`,
        }
    }
}
elem_button = function(){
    let empty_langs = {};
    let font_styles = {};
    for (const key in window.website_data.languages) {
        empty_langs[window.website_data.languages[key].code] = `<span class="format format_container" style="">${texts.elems.button_placholder}</span>`
        font_styles[window.website_data.languages[key].code] = 'default';
    }
    let this_hash = hash();
    return {
        type: 'elem',
        elem_type: 'button',
        tag: 'button',
        accessibility:[
            'interactions','hover','click','disabled','can_hover','can_click','can_disabled','can_parent_hover',
            'elem_swap','elem_dublicate','elem_delete',
            'copy',
            'button',
            'text','edit_text',
            'display',
            'elem_arrange',
            'sizing','width','height',
            'spacing','margin','padding',
            'styling','filter','border','border_radius','box_shadow','transform',
            'animation',
        ],
        class_selector: `btn${this_hash}`,
        font_style: {},
        css:get_default_styles(['width','height','margin','border','border-radius','box-shadow','filter','transform','transform-origin','transition-duration','transition-delay','transition-timing-function'],{
            'box-sizing': 'border-box',
            'position': 'relative',
            'cursor':'pointer',
            'z-index':'1',
            'display':'block',
            'overflow':'visible',
            'align-self':'auto',
            'font-weight':'normal',
            'line-height':'1.3em',
            'letter-spacing':'0.05em',
            'font-size':'1em',
            'text-align':'center',
            'padding':'10px 20px 10px 20px',
        }),
        css_mobile:get_default_styles(['width','height','margin','border','border-radius','box-shadow','filter','transform','transform-origin','transition-duration','transition-delay','transition-timing-function'],{
            'display':'block',
            'overflow':'visible',
            'align-self':'auto',
            'font-weight':'normal',
            'line-height':'1.3em',
            'letter-spacing':'0.05em',
            'font-size':'1em',
            'text-align':'center',
            'padding':'10px 20px 10px 20px',
        }),
        css_hover:get_default_styles(['border','border-radius','box-shadow','filter','transform','transform-origin'],{}),
        css_hover_mobile:get_default_styles(['border','border-radius','box-shadow','filter','transform','transform-origin'],{}),
        css_click:get_default_styles(['border','border-radius','box-shadow','filter','transform','transform-origin'],{}),
        css_click_mobile:get_default_styles(['border','border-radius','box-shadow','filter','transform','transform-origin'],{}),
        css_disabled:get_default_styles(['border','border-radius','box-shadow','filter','transform','transform-origin'],{
            'cursor':'not-allowed',
            'color':`rgba(var(--color_4_3),1)`,
            'background-color':`rgba(var(--color_4_4),1)`,
        }),
        css_disabled_mobile:get_default_styles(['border','border-radius','box-shadow','filter','transform','transform-origin'],{
            'color':`rgba(var(--color_4_3),1)`,
            'background-color':`rgba(var(--color_4_4),1)`,
        }),
        animation: get_default_style('animation'),
        animation_mobile: get_default_style('animation'),
        class:'',
        text: {
            key: `btn${this_hash}`,
            val: empty_langs
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
            'elem_arrange',
            'spacing','margin','padding',
            'styling','filter','border','border_radius','box_shadow','transform',
            'animation',
        ],
        class_selector: `icon${this_hash}`,
        css:get_default_styles(['padding','margin','border','border-radius','box-shadow','filter','transform','transform-origin','transition-duration','transition-delay','transition-timing-function'],{
            'box-sizing': 'border-box',
            'position': 'relative',
            'z-index':'1',
            'display':'block',
            'overflow':'hidden',
            'align-self':'auto',
            'width': '150px',
            'height': 'auto',
        }),
        css_mobile:get_default_styles(['padding','margin','border','border-radius','box-shadow','filter','transform','transform-origin','transition-duration','transition-delay','transition-timing-function'],{
            'display':'block',
            'overflow':'hidden',
            'align-self':'auto',
            'width': '150px',
            'height': 'auto',
        }),
        css_hover:get_default_styles(['border','border-radius','box-shadow','filter','transform','transform-origin'],{}),
        css_hover_mobile:get_default_styles(['border','border-radius','box-shadow','filter','transform','transform-origin'],{}),
        css_click:get_default_styles(['border','border-radius','box-shadow','filter','transform','transform-origin'],{}),
        css_click_mobile:get_default_styles(['border','border-radius','box-shadow','filter','transform','transform-origin'],{}),
        animation: get_default_style('animation'),
        animation_mobile: get_default_style('animation'),
        class: '',
        attr:{
            src:''
        }
    }
}
