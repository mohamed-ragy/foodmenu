get_blank_home_section = function() {
    return {
        name: ``,
        sort: 0,
        adapt_header: '0',
        type: 'home_section',
        tag: 'section',
        class_selector: hash(),
        css: {
            position: 'relative',
            'box-sizing': 'border-box',
            width: '100%',
        },
        css_mobile:{},
        background:get_default_style('background'),
        background_mobile:get_default_style('background'),
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
get_home_section_block = function(child_num) {
    let child_key = hash();
    return {
        type: 'home_section_block',
        tag: 'div',
        class: '',
        class_selector: `section_block${child_key}`,
        background:get_default_style('background'),
        background_mobile:get_default_style('background'),
        css: {
            'display': 'flex',
            'position': 'relative',
            'box-sizing': 'border-box',
            'grid-area': child_num,
            'z-index':child_num.replace('elem',''),
            //
            'flex-direction': 'column',
            'flex-wrap': 'nowrap',
            'align-items': 'center',
            'justify-content': 'center',
            //
            'padding':'10px 20px 10px 20px',
            'margin':'5px 5px 5px 5px',
            //
            'border-top':'0px none rgba(var(--color_4_1),1)',
            'border-right':'0px none rgba(var(--color_4_1),1)',
            'border-bottom':'0px none rgba(var(--color_4_1),1)',
            'border-left':'0px none rgba(var(--color_4_1),1)',

            'border-radius':'0px 0px 0px 0px',

            //
            'box-shadow': 'none',
            //
        },
        css_mobile: {
            //
            'flex-direction': 'column',
            'flex-wrap': 'nowrap',
            'align-items': 'center',
            'justify-content': 'center',
            //
            'padding':'10px 20px 10px 20px',
            'margin':'5px 5px 5px 5px',
            //
            'border-top':'0px none rgba(var(--color_4_1),1)',
            'border-right':'0px none rgba(var(--color_4_1),1)',
            'border-bottom':'0px none rgba(var(--color_4_1),1)',
            'border-left':'0px none rgba(var(--color_4_1),1)',
            //
            'border-radius':'0px 0px 0px 0px',

            //
            'box-shadow': 'none',
            //
        },
        animation: get_default_style('animation'),
        animation_mobile: get_default_style('animation'),
        children: []
    }
}
get_home_sections_layouts = function() {
    return [{
            tag: 'div',
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
                get_home_section_block('elem1'),
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
                'grid-template-rows': 'repeat(2, 1fr)',
            }),
            children: [
                get_home_section_block('elem1'),
                get_home_section_block('elem2'),
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
                'grid-template-rows': 'repeat(3, 1fr)',
            }),
            children: [
                get_home_section_block('elem1'),
                get_home_section_block('elem2'),
                get_home_section_block('elem3'),
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
                'grid-template-rows': 'repeat(3, 1fr)',
            }),
            children: [
                get_home_section_block('elem1'),
                get_home_section_block('elem2'),
                get_home_section_block('elem3'),
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
                'grid-template-rows': 'repeat(3, 1fr)',
            }),
            children: [
                get_home_section_block('elem1'),
                get_home_section_block('elem2'),
                get_home_section_block('elem3'),
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
                'grid-template-rows': 'repeat(3, 1fr)',
            }),
            children: [
                get_home_section_block('elem1'),
                get_home_section_block('elem2'),
                get_home_section_block('elem3'),
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
                'grid-template-rows': 'repeat(2, 1fr)',
            }),
            children: [
                get_home_section_block('elem1'),
                get_home_section_block('elem2'),
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
                'grid-template-rows': 'repeat(3, 1fr)',
            }),
            children: [
                get_home_section_block('elem1'),
                get_home_section_block('elem2'),
                get_home_section_block('elem3'),
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
                'grid-template-rows': 'repeat(3, 1fr)',
            }),
            children: [
                get_home_section_block('elem1'),
                get_home_section_block('elem2'),
                get_home_section_block('elem3'),
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
                'grid-template-rows': 'repeat(4, 1fr)',
            }),
            children: [
                get_home_section_block('elem1'),
                get_home_section_block('elem2'),
                get_home_section_block('elem3'),
                get_home_section_block('elem4'),
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
                'grid-template-columns': 'auto',
                'grid-template-rows': 'auto',
            }),
            children: [
                get_home_section_block('elem1'),
                get_home_section_block('elem2'),
                get_home_section_block('elem3'),
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
                'grid-template-rows': 'repeat(4, 1fr)',
            }),
            children: [
                get_home_section_block('elem1'),
                get_home_section_block('elem2'),
                get_home_section_block('elem3'),
                get_home_section_block('elem4'),
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
                'grid-template-rows': 'repeat(4, 1fr)',
            }),
            children: [
                get_home_section_block('elem1'),
                get_home_section_block('elem2'),
                get_home_section_block('elem3'),
                get_home_section_block('elem4'),
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
                'grid-template-rows': 'repeat(4, 1fr)',
            }),
            children: [
                get_home_section_block('elem1'),
                get_home_section_block('elem2'),
                get_home_section_block('elem3'),
                get_home_section_block('elem4'),
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
                'grid-template-rows': 'repeat(5, 1fr)',
            }),
            children: [
                get_home_section_block('elem1'),
                get_home_section_block('elem2'),
                get_home_section_block('elem3'),
                get_home_section_block('elem4'),
                get_home_section_block('elem5'),
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
                'grid-template-rows': 'repeat(5, 1fr)',
            }),
            children: [
                get_home_section_block('elem1'),
                get_home_section_block('elem2'),
                get_home_section_block('elem3'),
                get_home_section_block('elem4'),
                get_home_section_block('elem5'),
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
                'grid-template-rows': 'repeat(5, 1fr)',
            }),
            children: [
                get_home_section_block('elem1'),
                get_home_section_block('elem2'),
                get_home_section_block('elem3'),
                get_home_section_block('elem4'),
                get_home_section_block('elem5'),
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
                'grid-template-rows': 'repeat(6, 1fr)',
            }),
            children: [
                get_home_section_block('elem1'),
                get_home_section_block('elem2'),
                get_home_section_block('elem3'),
                get_home_section_block('elem4'),
                get_home_section_block('elem5'),
                get_home_section_block('elem6'),
            ]
        },

    ]
}

home_elem_title = function(){
    let empty_langs = {};
    let font_styles = {};
    for (const key in window.website_data.languages) {
        empty_langs[window.website_data.languages[key].code] = `<span class="format format_container" style="">${texts.elems.title_placholder}</span>`
        font_styles[window.website_data.languages[key].code] = 'default';
    }
    let this_hash = hash();
    return {
        type: 'home_elem',
        elem_type: 'title',
        tag: 'h1',
        class_selector: `h1${this_hash}`,
        font_style: {},
        background:get_default_style('background'),
        background_mobile:get_default_style('background'),
        css:{
            'box-sizing': 'border-box',
            'position': 'relative',
            'z-index':'1',
            //
            'display':'block',
            'overflow':'visible',
            'align-self':'auto',
            //
            'width': 'auto',
            'min-width': 'auto',
            'max-width': '100%',
            'height': 'auto',
            'min-height': 'auto',
            'max-height': '100%',
            //
            'font-weight':'normal',
            'line-height':'1.3em',
            'letter-spacing':'0.05em',
            'font-size':'1.5em',
            'text-align':'start',
            //
            'padding':'10px 20px 10px 20px',
            //
            'margin':'5px 5px 5px 5px',
            //
            'border-top':'0px none rgba(var(--color_4_1),1)',
            'border-right':'0px none rgba(var(--color_4_1),1)',
            'border-bottom':'0px none rgba(var(--color_4_1),1)',
            'border-left':'0px none rgba(var(--color_4_1),1)',
            //
            'border-radius':'0px 0px 0px 0px',
            //
            'box-shadow': 'none',
            //
            'filter':get_default_style('filter'),
            'transform':get_default_style('transform'),
            'transform-origin':'center',

        },
        css_mobile:{
            'display':'block',
            'overflow':'visible',
            'align-self':'auto',
            //
            'width': 'auto',
            'min-width': 'auto',
            'max-width': '100%',
            'height': 'auto',
            'min-height': 'auto',
            'max-height': '100%',
            //
            'font-weight':'normal',
            'line-height':'1.3em',
            'letter-spacing':'0.05em',
            'font-size':'1.5em',
            'text-align':'start',
            //
            'padding':'10px 20px 10px 20px',
            //
            'margin':'5px 5px 5px 5px',
            //
            'border-top':'0px none rgba(var(--color_4_1),1)',
            'border-right':'0px none rgba(var(--color_4_1),1)',
            'border-bottom':'0px none rgba(var(--color_4_1),1)',
            'border-left':'0px none rgba(var(--color_4_1),1)',
            //
            'border-radius':'0px 0px 0px 0px',

            //
            'box-shadow': 'none',
            //
            'filter':get_default_style('filter'),
            'transform':get_default_style('transform'),
            'transform-origin':'center',

        },
        animation: get_default_style('animation'),
        animation_mobile: get_default_style('animation'),
        class: '',
        text: {
            key: `h1${this_hash}`,
            val: empty_langs
        },
    }
}
home_elem_paragraph = function(){
    let empty_langs = {};
    let font_styles = {};
    for (const key in window.website_data.languages) {
        empty_langs[window.website_data.languages[key].code] = `<span class="format format_container" style="">${texts.elems.paragraph_placholder}</span>`
        font_styles[window.website_data.languages[key].code] = 'default';
    }
    let this_hash = hash();
    return {
        type: 'home_elem',
        elem_type: 'paragraph',
        tag: 'p',
        class_selector: `p${this_hash}`,
        font_style: {},
        background:get_default_style('background'),
        background_mobile:get_default_style('background'),
        css:{
            'box-sizing': 'border-box',
            'position': 'relative',
            'z-index':'1',
            //
            'display':'block',
            'overflow':'visible',
            'align-self':'auto',
            //
            'width': 'auto',
            'min-width': 'auto',
            'max-width': '100%',
            'height': 'auto',
            'min-height': 'auto',
            'max-height': '100%',
            //
            // 'font-weight':'normal',
            'line-height':'1.3em',
            'letter-spacing':'0.05em',
            'font-size':'1em',
            'text-align':'start',
            //
            'padding':'10px 20px 10px 20px',
            //
            'margin':'5px 5px 5px 5px',
            //
            'border-top':'0px none rgba(var(--color_4_1),1)',
            'border-right':'0px none rgba(var(--color_4_1),1)',
            'border-bottom':'0px none rgba(var(--color_4_1),1)',
            'border-left':'0px none rgba(var(--color_4_1),1)',
            //
            'border-radius':'0px 0px 0px 0px',

            //
            'box-shadow': 'none',
            //
            'filter':get_default_style('filter'),
            'transform':get_default_style('transform'),
            'transform-origin':'center',

        },
        css_mobile:{
            'display':'block',
            'overflow':'visible',
            'align-self':'auto',
            //
            'width': 'auto',
            'min-width': 'auto',
            'max-width': '100%',
            'height': 'auto',
            'min-height': 'auto',
            'max-height': '100%',
            //
            // 'font-weight':'normal',
            'line-height':'1.3em',
            'letter-spacing':'0.05em',
            'font-size':'1em',
            'text-align':'start',
            //
            'padding':'10px 20px 10px 20px',
            //
            'margin':'5px 5px 5px 5px',
            //
            'border-top':'0px none rgba(var(--color_4_1),1)',
            'border-right':'0px none rgba(var(--color_4_1),1)',
            'border-bottom':'0px none rgba(var(--color_4_1),1)',
            'border-left':'0px none rgba(var(--color_4_1),1)',
            //
            'border-radius':'0px 0px 0px 0px',

            //
            'box-shadow': 'none',
            //
            'filter':get_default_style('filter'),
            'transform':get_default_style('transform'),
            'transform-origin':'center',

        },
        animation: get_default_style('animation'),
        animation_mobile: get_default_style('animation'),
        class: '',
        text: {
            key: `p${this_hash}`,
            val: empty_langs
        },
    }
}
home_elem_image = function(){
    let this_hash = hash();
    return {
        type: 'home_elem',
        elem_type: 'image',
        tag: 'img',
        class_selector: `img${this_hash}`,
        css:{
            'box-sizing': 'border-box',
            'position': 'relative',
            'z-index':'1',
            //
            'display':'block',
            'overflow':'hidden',
            'align-self':'auto',
            //
            'width': 'auto',
            'min-width': 'auto',
            'max-width': '100%',
            'height': 'auto',
            'min-height': 'auto',
            'max-height': '100%',
            //
            'padding':'10px 20px 10px 20px',
            //
            'margin':'5px 5px 5px 5px',
            
            'border-top':'0px none rgba(var(--color_4_1),1)',
            'border-right':'0px none rgba(var(--color_4_1),1)',
            'border-bottom':'0px none rgba(var(--color_4_1),1)',
            'border-left':'0px none rgba(var(--color_4_1),1)',
            //
            'border-radius':'0px 0px 0px 0px',

            //
            'box-shadow': 'none',
            //
            'filter':get_default_style('filter'),
            'transform':get_default_style('transform'),
            'transform-origin':'center',
            //
            'object-position':'center',
            'object-fit':'contain',
            'aspect-ratio':'auto',
        },
        css_mobile:{
            'display':'block',
            'overflow':'hidden',
            'align-self':'auto',
            //
            'width': 'auto',
            'min-width': 'auto',
            'max-width': '100%',
            'height': 'auto',
            'min-height': 'auto',
            'max-height': '100%',
            //
            'padding':'10px 20px 10px 20px',
            //
            'margin':'5px 5px 5px 5px',
            
            'border-top':'0px none rgba(var(--color_4_1),1)',
            'border-right':'0px none rgba(var(--color_4_1),1)',
            'border-bottom':'0px none rgba(var(--color_4_1),1)',
            'border-left':'0px none rgba(var(--color_4_1),1)',
            //
            'border-radius':'0px 0px 0px 0px',

            //
            'box-shadow': 'none',
            //
            'filter':get_default_style('filter'),
            'transform':get_default_style('transform'),
            'transform-origin':'center',
            //
            'object-position':'center',
            'object-fit':'contain',
            'aspect-ratio':'auto',
        },
        animation: get_default_style('animation'),
        animation_mobile: get_default_style('animation'),
        class: '',
        attr:{
            src:''
        }
    }
}
home_elem_button = function(){
    let empty_langs = {};
    let font_styles = {};
    for (const key in window.website_data.languages) {
        empty_langs[window.website_data.languages[key].code] = `<span class="format format_container" style="">${texts.elems.button_placholder}</span>`
        font_styles[window.website_data.languages[key].code] = 'default';
    }
    let this_hash = hash();
    return {
        type: 'home_elem',
        elem_type: 'button',
        tag: 'button',
        class_selector: `btn${this_hash}`,
        font_style: {},
        css:{
            'text-decoration':'none',
            'box-sizing': 'border-box',
            'position': 'relative',
            'cursor':'pointer',
            'z-index':'1',
            //
            'display':'block',
            'overflow':'visible',
            'align-self':'auto',
            //
            'width': 'auto',
            'min-width': 'auto',
            'max-width': '100%',
            'height': 'auto',
            'min-height': 'auto',
            'max-height': '100%',
            //
            'font-weight':'normal',
            'line-height':'1.3em',
            'letter-spacing':'0.05em',
            'font-size':'1em',
            'text-align':'center',
            //
            'padding':'10px 20px 10px 20px',
            //
            'margin':'5px 5px 5px 5px',
            //
            'border-top':'0px none rgba(var(--color_4_1),1)',
            'border-right':'0px none rgba(var(--color_4_1),1)',
            'border-bottom':'0px none rgba(var(--color_4_1),1)',
            'border-left':'0px none rgba(var(--color_4_1),1)',
            //
            'border-radius':'0px 0px 0px 0px',

            //
            'box-shadow': 'none',
            //
            'filter':get_default_style('filter'),
            'transform':get_default_style('transform'),
            'transform-origin':'center',
            //
            'transition-duration':'200ms',

        },
        css_mobile:{
            'display':'block',
            'overflow':'visible',
            'align-self':'auto',
            //
            'width': 'auto',
            'min-width': 'auto',
            'max-width': '100%',
            'height': 'auto',
            'min-height': 'auto',
            'max-height': '100%',
            //
            'font-weight':'normal',
            'line-height':'1.3em',
            'letter-spacing':'0.05em',
            'font-size':'1em',
            'text-align':'start',
            //
            'padding':'10px 20px 10px 20px',
            //
            'margin':'5px 5px 5px 5px',
            //
            'border-top':'0px none rgba(var(--color_4_1),1)',
            'border-right':'0px none rgba(var(--color_4_1),1)',
            'border-bottom':'0px none rgba(var(--color_4_1),1)',
            'border-left':'0px none rgba(var(--color_4_1),1)',
            //
            'border-radius':'0px 0px 0px 0px',

            //
            'box-shadow': 'none',
            //
            'filter':get_default_style('filter'),
            'transform':get_default_style('transform'),
            'transform-origin':'center',
            //

        },
        css_hover:{
            'text-decoration':'none',
            'border-top':'0px none rgba(var(--color_4_1),1)',
            'border-right':'0px none rgba(var(--color_4_1),1)',
            'border-bottom':'0px none rgba(var(--color_4_1),1)',
            'border-left':'0px none rgba(var(--color_4_1),1)',
        },
        css_hover_mobile:{
            'border-top':'0px none rgba(var(--color_4_1),1)',
            'border-right':'0px none rgba(var(--color_4_1),1)',
            'border-bottom':'0px none rgba(var(--color_4_1),1)',
            'border-left':'0px none rgba(var(--color_4_1),1)',
        },
        css_click:{
            'border-top':'0px none rgba(var(--color_4_1),1)',
            'border-right':'0px none rgba(var(--color_4_1),1)',
            'border-bottom':'0px none rgba(var(--color_4_1),1)',
            'border-left':'0px none rgba(var(--color_4_1),1)',
        },
        css_click_mobile:{
            'border-top':'0px none rgba(var(--color_4_1),1)',
            'border-right':'0px none rgba(var(--color_4_1),1)',
            'border-bottom':'0px none rgba(var(--color_4_1),1)',
            'border-left':'0px none rgba(var(--color_4_1),1)',
        },
        css_disabled:{
            'cursor':'not-allowed',
            'color':`rgba(var(--color_4_3),1)`,
            'background-color':`rgba(var(--color_4_4),1)`,
            'border-top':'0px none rgba(var(--color_4_1),1)',
            'border-right':'0px none rgba(var(--color_4_1),1)',
            'border-bottom':'0px none rgba(var(--color_4_1),1)',
            'border-left':'0px none rgba(var(--color_4_1),1)',
        },
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
home_elem_icon = function(){
    let this_hash = hash();
    return {
        type: 'home_elem',
        elem_type: 'icon',
        tag: 'img',
        class_selector: `icon${this_hash}`,
        css:{
            'box-sizing': 'border-box',
            'position': 'relative',
            'z-index':'1',
            //
            'display':'block',
            'overflow':'hidden',
            'align-self':'auto',
            //
            'width': '150px',
            'height': 'auto',
            //
            'padding':'10px 20px 10px 20px',
            //
            'margin':'5px 5px 5px 5px',
            
            'border-top':'0px none rgba(var(--color_4_1),1)',
            'border-right':'0px none rgba(var(--color_4_1),1)',
            'border-bottom':'0px none rgba(var(--color_4_1),1)',
            'border-left':'0px none rgba(var(--color_4_1),1)',
            //
            'border-radius':'0px 0px 0px 0px',
            //
            'box-shadow': 'none',
            //
            'filter':get_default_style('filter'),
            'transform':get_default_style('transform'),
            'transform-origin':'center',
            //
        },
        css_mobile:{
            'display':'block',
            'overflow':'hidden',
            'align-self':'auto',
            //
            'width': '150px',
            'height': 'auto',
            //
            'padding':'10px 20px 10px 20px',
            //
            'margin':'5px 5px 5px 5px',
            
            'border-top':'0px none rgba(var(--color_4_1),1)',
            'border-right':'0px none rgba(var(--color_4_1),1)',
            'border-bottom':'0px none rgba(var(--color_4_1),1)',
            'border-left':'0px none rgba(var(--color_4_1),1)',
            //
            'border-radius':'0px 0px 0px 0px',

            //
            'box-shadow': 'none',
            //
            'filter':get_default_style('filter'),
            'transform':get_default_style('transform'),
            'transform-origin':'center',
            //
        },
        animation: get_default_style('animation'),
        animation_mobile: get_default_style('animation'),
        class: '',
        attr:{
            src:''
        }
    }
}
