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
        class: 'section_block',
        class_selector: `section_block${child_key}`,
        background:get_default_style('background'),
        background_mobile:get_default_style('background'),
        css: {
            'display': 'flex',
            'position': 'relative',
            'box-sizing': 'border-box',
            'grid-area': child_num,
            //
            'flex-direction': 'column',
            'flex-wrap': 'nowrap',
            'align-items': 'center',
            'justify-content': 'center',
            //
            'padding-top': '10px',
            'padding-right': '10px',
            'padding-bottom': '10px',
            'padding-left': '10px',
            //
            'border-top':'0px none rgba(var(--color_4_1),1)',
            'border-right':'0px none rgba(var(--color_4_1),1)',
            'border-bottom':'0px none rgba(var(--color_4_1),1)',
            'border-left':'0px none rgba(var(--color_4_1),1)',

            'border-top-left-radius': '0px',
            'border-top-right-radius': '0px',
            'border-bottom-right-radius': '0px',
            'border-bottom-left-radius': '0px',
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
            'padding-top': '10px',
            'padding-right': '10px',
            'padding-bottom': '10px',
            'padding-left': '10px',
            //
            'border-top':'0px none rgba(var(--color_4_1),1)',
            'border-right':'0px none rgba(var(--color_4_1),1)',
            'border-bottom':'0px none rgba(var(--color_4_1),1)',
            'border-left':'0px none rgba(var(--color_4_1),1)',
            //
            'border-top-left-radius': '0px',
            'border-top-right-radius': '0px',
            'border-bottom-right-radius': '0px',
            'border-bottom-left-radius': '0px',
            //
            'box-shadow': 'none',
            //
        },
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
// window.home_elems = ['title', 'paragraph', 'image', 'button']
// window.elems = {};
// window.empty_langs = {}

default_title = function(){
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
            'padding-top': '5px',
            'padding-right': '5px',
            'padding-bottom': '5px',
            'padding-left': '5px',
            //
            'margin-top': '5px',
            'margin-right': '5px',
            'margin-bottom': '5px',
            'margin-left': '5px',
            //
            'border-top':'0px none rgba(var(--color_4_1),1)',
            'border-right':'0px none rgba(var(--color_4_1),1)',
            'border-bottom':'0px none rgba(var(--color_4_1),1)',
            'border-left':'0px none rgba(var(--color_4_1),1)',
            //
            'border-top-left-radius': '0px',
            'border-top-right-radius': '0px',
            'border-bottom-right-radius': '0px',
            'border-bottom-left-radius': '0px',
            //
            'box-shadow': 'none',
            //
            'filter':get_default_style('filter'),

        },
        css_mobile:{
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
            'padding-top': '5px',
            'padding-right': '5px',
            'padding-bottom': '5px',
            'padding-left': '5px',
            //
            'margin-top': '5px',
            'margin-right': '5px',
            'margin-bottom': '5px',
            'margin-left': '5px',
            //
            'border-top':'0px none rgba(var(--color_4_1),1)',
            'border-right':'0px none rgba(var(--color_4_1),1)',
            'border-bottom':'0px none rgba(var(--color_4_1),1)',
            'border-left':'0px none rgba(var(--color_4_1),1)',
            //
            'border-top-left-radius': '0px',
            'border-top-right-radius': '0px',
            'border-bottom-right-radius': '0px',
            'border-bottom-left-radius': '0px',
            //
            'box-shadow': 'none',
            //
            'filter':get_default_style('filter'),

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
get_titles = function(){
    let titles = {};
    titles[0] = default_title();
    titles[1] = default_title();
    titles[2] = default_title();

    titles[0].css['box-shadow'] = 'rgba(var(--color_4_1),0.1) 0px 1px 10px 0px, rgba(var(--color_4_1),0.1) 0px 1px 2px 0px';
    titles[0].css['font-size'] = '3.5em';
    titles[0].css['font-weight'] = 'bold';
    titles[0].css['padding-top'] = '20px';
    titles[0].css['padding-bottom'] = '20px';
    titles[0].css['padding-right'] = '20px';
    titles[0].css['padding-left'] = '20px';
    titles[0].font_style.en = 'Marhey';
    
    return titles;
}
get_home_elem = function(elem) {

    let this_hash = hash();
    switch (elem) {
        case 'image':
            return {
                type: 'home_elem',
                elem_type: 'image',
                tag: 'div',
                class_selector: `img${this_hash}`,
                css: {
                    'position': 'relative',
                    'box-sizing': 'border-box',
                    'display': 'flex',
                    'width': 'auto',
                    'height': 'auto',
                    //
                    // 'animation-duration':'100ms',
                    //
                    'border-color': 'rgba(0,0,0,1)',
                    'border-style': 'solid solid solid solid',
                    'border-width': '0px',
                    'border-top-left-radius': '0px',
                    'border-top-right-radius': '0px',
                    'border-bottom-right-radius': '0px',
                    'border-bottom-left-radius': '0px',
                    //

                    'box-shadow': '0px 0px 0px 0px rgba(0,0,0,0)',

                    'align-self': 'center',
                    'padding-top': '0px',
                    'padding-right': '0px',
                    'padding-bottom': '0px',
                    'padding-left': '0px',
                    'margin-top': '0px',
                    'margin-right': '0px',
                    'margin-bottom': '0px',
                    'margin-left': '0px',
                    'transform': 'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
                    'filter':'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
                    'z-index': '0',

                    'transition-duration': '0ms',
                    'transition-delay': '0ms',
                    'transition-timing-function': 'linear'
                },
                css_mobile: {

                    'border-top-left-radius': '0px',
                    'border-top-right-radius': '0px',
                    'border-bottom-right-radius': '0px',
                    'border-bottom-left-radius': '0px',

                    'align-self': 'center',
                    'padding-top': '0px',
                    'padding-right': '0px',
                    'padding-bottom': '0px',
                    'padding-left': '0px',
                    'margin-top': '0px',
                    'margin-right': '0px',
                    'margin-bottom': '0px',
                    'margin-left': '0px',
                    'transform': 'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
                    'filter':'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
                    'z-index': '0',

                    'transition-duration': '0ms',
                    'transition-delay': '0ms',
                    'transition-timing-function': 'linear',

                    'box-shadow': '0px 0px 0px 0px rgba(0,0,0,0)',
                },
                // attr:{
                //     animation:'no_animation',
                //     animation_delay:'0ms',
                // },
                animation: {
                    animate_on: 'on_enter',

                    animationUp: '0',
                    animationUp_transform: 'translate(0px,0px) rotateZ(0deg) scale(1)',
                    animationUp_opacity: '1',
                    animationUp_font_color: '',
                    animationUp_background_color: '',
                    animationUp_backdrop_filter: 'blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%)',

                    animationDown: '0',
                    animationDown_transform: 'translate(0px,0px) rotateZ(0deg) scale(1)',
                    animationDown_opacity: '1',
                    animationDown_font_color: '',
                    animationDown_background_color: '',
                    animationDown_backdrop_filter: 'blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%)',
                },
                animation_mobile: {
                    animate_on: 'on_enter',

                    animationUp: '0',
                    animationUp_transform: 'translate(0px,0px) rotateZ(0deg) scale(1)',
                    animationUp_opacity: '1',
                    animationUp_font_color: '',
                    animationUp_background_color: '',
                    animationUp_backdrop_filter: 'blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%)',

                    animationDown: '0',
                    animationDown_transform: 'translate(0px,0px) rotateZ(0deg) scale(1)',
                    animationDown_opacity: '1',
                    animationDown_font_color: '',
                    animationDown_background_color: '',
                    animationDown_backdrop_filter: 'blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%)',
                },
                children: [{
                    type: 'image',
                    elem_type: 'image',
                    tag: 'img',
                    class_selector: `img_${this_hash}`,
                    css: {
                        'max-width': '100%',
                        'width': '300px',
                        'height': '300px',
                        'position': 'relative',
                        //
                        'border-top-left-radius': '0px',
                        'border-top-right-radius': '0px',
                        'border-bottom-right-radius': '0px',
                        'border-bottom-left-radius': '0px',
                        //
                        'object-fit': 'contain',
                        'object-position': '50% 50%',
                    },
                    css_mobile: {
                        'width': '300px',
                        'height': '300px',
                        'object-fit': 'contain',
                        'object-position': '50% 50%',

                        'border-top-left-radius': '0px',
                        'border-top-right-radius': '0px',
                        'border-bottom-right-radius': '0px',
                        'border-bottom-left-radius': '0px',
                    },
                    attr: {
                        src: '/storage/imgs/cpanel/noimg.png',

                    }
                }]
            }

            break;
        case 'title':
            for (const key in window.website_data.languages) {
                window.empty_langs[window.website_data.languages[key].code] = `<span class="format format_container" style="font-weight:700;">${texts.elems.title_placholder}</span>`
            }
            return {
                type: 'home_elem',
                elem_type: 'title',
                tag: 'h1',
                class_selector: `h1${this_hash}`,
                font_style: 'font_1',
                css: {
                    'box-sizing': 'border-box',
                    //
                    // 'color': 'unset',
                    // 'background-color': 'rgba(0,0,0,0)',
                    // 'backdrop-filter': 'blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%)',
                    // 'text-shadow': '0px 0px rgba(0,0,0,0)',
                    // 'font-weight': 'bold',
                    // 'border-color': 'rgba(0,0,0,1)',
                    // 'border-style': 'solid solid solid solid',
                    // 'border-width': '0px',
                    // 'border-top-left-radius': '0px',
                    // 'border-top-right-radius': '0px',
                    // 'border-bottom-right-radius': '0px',
                    // 'border-bottom-left-radius': '0px',
                    // 'box-shadow': '0px 0px 0px 0px rgba(0,0,0,0)',
                    // 'animation-duration':'100ms',
                    //
                    // 'text-align': 'center',
                    // 'align-self': 'center',
                    // 'font-size': '2em',
                    // 'max-width': '100%',
                    // 'padding-top': '0px',
                    // 'padding-right': '0px',
                    // 'padding-bottom': '0px',
                    // 'padding-left': '0px',
                    // 'margin-top': '0px',
                    // 'margin-right': '0px',
                    // 'margin-bottom': '0px',
                    // 'margin-left': '0px',
                    // 'width': 'auto',
                    // 'transform': 'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
                    // 'filter':'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
                    // 'z-index': '0',

                    // 'transition-duration': '0ms',
                    // 'transition-delay': '0ms',
                    // 'transition-timing-function': 'linear'
                },
                css_mobile: {
                    // 'text-align': 'center',
                    // 'align-self': 'center',
                    // 'font-size': '2em',
                    // 'max-width': '100%',
                    // 'padding-top': '0px',
                    // 'padding-right': '0px',
                    // 'padding-bottom': '0px',
                    // 'padding-left': '0px',
                    // 'margin-top': '0px',
                    // 'margin-right': '0px',
                    // 'margin-bottom': '0px',
                    // 'margin-left': '0px',
                    // 'width': 'auto',
                    // 'transform': 'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
                    // 'filter':'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
                    // 'z-index': '0',

                    // 'backdrop-filter': 'blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%)',
                    // 'text-shadow': '0px 0px rgba(0,0,0,0)',

                    // 'transition-duration': '0ms',
                    // 'transition-delay': '0ms',
                    // 'transition-timing-function': 'linear'

                },
                animation: get_default_style('animation'),
                animation_mobile: get_default_style('animation'),
                class: '',
                text: {
                    key: `h1${this_hash}`,
                    val: window.empty_langs
                },
                // attr:{
                //     animation:'no_animation',
                //     animation_delay:'0ms',
                // }
            }
            break;
        case 'paragraph':
            for (const key in window.website_data.languages) {
                window.empty_langs[window.website_data.languages[key].code] = `<span class="format format_container">${texts.elems.paragraph_placholder}</span>`
            }
            return {
                type: 'home_elem',
                elem_type: 'paragraph',
                tag: 'div',
                class_selector: `p${this_hash}`,
                font_style: 'font_1',
                css: {
                    'box-sizing': 'border-box',
                    //
                    'color': 'unset',
                    'background-color': 'rgba(0,0,0,0)',
                    'backdrop-filter': 'blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%)',
                    'text-shadow': '0px 0px rgba(0,0,0,0)',
                    'font-weight': 'normal',
                    'border-color': 'rgba(0,0,0,1)',
                    'border-style': 'solid solid solid solid',
                    'border-width': '0px',
                    'border-top-left-radius': '0px',
                    'border-top-right-radius': '0px',
                    'border-bottom-right-radius': '0px',
                    'border-bottom-left-radius': '0px',
                    'box-shadow': '0px 0px 0px 0px rgba(0,0,0,0)',
                    // 'animation-duration':'100ms',
                    //
                    'text-align': 'center',
                    'align-self': 'center',
                    'font-size': '1em',
                    'max-width': '100%',
                    'padding-top': '0px',
                    'padding-right': '0px',
                    'padding-bottom': '0px',
                    'padding-left': '0px',
                    'margin-top': '0px',
                    'margin-right': '0px',
                    'margin-bottom': '0px',
                    'margin-left': '0px',
                    'width': 'auto',
                    'transform': 'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
                    'filter':'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
                    'z-index': '0',

                    'transition-duration': '0ms',
                    'transition-delay': '0ms',
                    'transition-timing-function': 'linear'
                },
                css_mobile: {
                    'text-align': 'center',
                    'align-self': 'center',
                    'font-size': '1em',
                    'max-width': '100%',
                    'padding-top': '0px',
                    'padding-right': '0px',
                    'padding-bottom': '0px',
                    'padding-left': '0px',
                    'margin-top': '0px',
                    'margin-right': '0px',
                    'margin-bottom': '0px',
                    'margin-left': '0px',
                    'width': 'auto',
                    'transform': 'translate(0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)',
                    'filter':'opacity(100%) blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%) drop-shadow(0px 0px 0px rgba(0,0,0,0))',
                    'z-index': '0',

                    'transition-duration': '0ms',
                    'transition-delay': '0ms',
                    'transition-timing-function': 'linear'
                },
                animation: {
                    animate_on: 'on_enter',

                    animationUp: '0',
                    animationUp_transform: 'translate(0px,0px) rotateZ(0deg) scale(1)',
                    animationUp_opacity: '1',
                    animationUp_font_color: '',
                    animationUp_background_color: '',
                    animationUp_backdrop_filter: 'blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%)',

                    animationDown: '0',
                    animationDown_transform: 'translate(0px,0px) rotateZ(0deg) scale(1)',
                    animationDown_opacity: '1',
                    animationDown_font_color: '',
                    animationDown_background_color: '',
                    animationDown_backdrop_filter: 'blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%)',
                },
                animation_mobile: {
                    animate_on: 'on_enter',

                    animationUp: '0',
                    animationUp_transform: 'translate(0px,0px) rotateZ(0deg) scale(1)',
                    animationUp_opacity: '1',
                    animationUp_font_color: '',
                    animationUp_background_color: '',
                    animationUp_backdrop_filter: 'blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%)',

                    animationDown: '0',
                    animationDown_transform: 'translate(0px,0px) rotateZ(0deg) scale(1)',
                    animationDown_opacity: '1',
                    animationDown_font_color: '',
                    animationDown_background_color: '',
                    animationDown_backdrop_filter: 'blur(0px) brightness(100%) contrast(100%) saturate(100%) grayscale(0%) hue-rotate(0deg) invert(0%) sepia(0%)',
                },
                class: '',
                text: {
                    key: `p${this_hash}`,
                    val: window.empty_langs
                },
                // attr:{
                //     animation:'no_animation',
                //     animation_delay:'0ms',
                // }
            }
            break;
        default:
            break;
    }
}