hash = function() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 20) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return `_${result}`;
}
get_blank_home_section = function(){
    return{
        name:`${texts.untitled_section} ${parseInt(window.template.home.length) + 1}`,
        sort:0,
        tag:'section',
        class_selector:hash(),
        css:{'padding' :'10px', },
        background:'color_theme',
        color_theme:'transparent',
        background_image:{
            'background-image' : '/storage/imgs/cpanel/noimg2.png',
            'background-attachment' : 'local',
            'background-position-x' : 'center',
            'background-position-y' : 'center',
            'background-repeat' : 'no-repeat',
            'background-size' : 'cover',
            'background-blend-mode' : 'normal',
            'background-color' : '#ffffff',
        },
        class:'',
        children:{},
    };
}
get_home_section_child = function(child_num){
    let child_key = hash();
    return {
            tag:'div',
            class:'section_elements_wrapper',
            class_selector : `elements_wrapper${child_key}`,
            css:{
                'grid-area' : child_num,
                'align-items' : 'flex-start',
                'justify-content' : 'flex-start',
                'padding' :'0px',
            },
    }
}
get_home_sections_layouts = function() {
    return [
        {
            layout:'0',
            section_wrapper:{
                tag:'div',
                class_selector:`section_wrapper${hash()}`,
                css:{
                    'min-height':'500px',
                    display:'grid',
                    'grid-template-areas':'"elem1"',
                    'grid-template-columns':'repeat(1, 1fr)',
                    'grid-gap':'10px',
                },
                css_mobile:{
                    'grid-template-areas':'"elem1"',
                    'grid-template-columns':'repeat(1, 1fr)',
                },
                class:'section_wrapper',
                children:{
                    [`section_wrapper${hash()}`]:get_home_section_child('elem1'),
                }
            },
        },
        {
            layout:'2',
            section_wrapper:{
                tag:'div',
                type:'section_wrapper',
                class:'section_wrapper',
                class_selector:`section_wrapper${hash()}`,
                css:{
                    'min-height':'500px',
                    display:'grid',
                    'grid-template-areas':'"elem1 elem2"',
                    'grid-template-columns':'repeat(2, 1fr)',
                    'grid-gap':'10px',
                },
                css_mobile:{
                    'grid-template-areas':'"elem1""elem2"',
                    'grid-template-columns':'repeat(1, 1fr)',
                },
                children:{
                    [`elements_container_${hash()}`]:get_home_section_child('elem1'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem2'),
                }
            },
        },
        {
            layout:'14',
            preview_class:'section_layout_14',
            preview_html:`<div class="section_layout_14 section_layout_elem"><div><div></div><div></div></div><div></div></div>`,
            section_wrapper:{
                tag:'div',
                type:'section_wrapper',
                class:'section_wrapper',
                class_selector:`section_wrapper${hash()}`,
                css:{
                    'min-height':'500px',
                    display:'grid',
                    'grid-template-areas':'"elem1 elem3""elem2 elem3"',
                    'grid-template-columns':'repeat(2, 1fr)',
                    'grid-gap':'10px',
                },
                css_mobile:{
                    'grid-template-areas':'"elem1""elem2""elem3"',
                    'grid-template-columns':'repeat(1, 1fr)',
                },
                children:{
                    [`elements_container_${hash()}`]:get_home_section_child('elem1'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem2'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem3'),
                }
            },
        },
        {
            layout:'15',
            preview_class:'section_layout_15',
            preview_html:`<div class="section_layout_15 section_layout_elem"><div></div><div><div></div><div></div></div></div>`,
            section_wrapper:{
                tag:'div',
                type:'section_wrapper',
                class:'section_wrapper',
                class_selector:`section_wrapper${hash()}`,
                css:{
                    'min-height':'500px',
                    display:'grid',
                    'grid-template-areas':'"elem1 elem2""elem1 elem3"',
                    'grid-template-columns':'repeat(2, 1fr)',
                    'grid-gap':'10px',
                },
                css_mobile:{
                    'grid-template-areas':'"elem1""elem2""elem3"',
                    'grid-template-columns':'repeat(1, 1fr)',
                },
                children:{
                    [`elements_container_${hash()}`]:get_home_section_child('elem1'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem2'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem3'),
                }
            },
        },
        {
            layout:'16',
            preview_class:'section_layout_16',
            preview_html:`<div class="section_layout_16 section_layout_elem"><div></div><div><div></div><div></div></div></div>`,
            section_wrapper:{
                tag:'div',
                type:'section_wrapper',
                class:'section_wrapper',
                class_selector:`section_wrapper${hash()}`,
                css:{
                    'min-height':'500px',
                    display:'grid',
                    'grid-template-areas':'"elem1 elem1 elem2""elem1 elem1 elem3"',
                    'grid-template-columns':'repeat(3, 1fr)',
                    'grid-gap':'10px',
                },
                css_mobile:{
                    'grid-template-areas':'"elem1""elem2""elem3"',
                    'grid-template-columns':'repeat(1, 1fr)',
                },
                children:{
                    [`elements_container_${hash()}`]:get_home_section_child('elem1'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem2'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem3'),
                }
            },
        },
        {
            layout:'17',
            preview_class:'section_layout_17',
            preview_html:`<div class="section_layout_17 section_layout_elem"><div><div></div><div></div></div><div></div></div>`,
            section_wrapper:{
                tag:'div',
                type:'section_wrapper',
                class:'section_wrapper',
                class_selector:`section_wrapper${hash()}`,
                css:{
                    'min-height':'500px',
                    display:'grid',
                    'grid-template-areas':'"elem1 elem3 elem3""elem2 elem3 elem3"',
                    'grid-template-columns':'repeat(3, 1fr)',
                    'grid-gap':'10px',
                },
                css_mobile:{
                    'grid-template-areas':'"elem1""elem2""elem3"',
                    'grid-template-columns':'repeat(1, 1fr)',
                },
                children:{
                    [`elements_container_${hash()}`]:get_home_section_child('elem1'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem2'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem3'),
                }
            },
        },
        {
            layout:'1',
            preview_class:'section_layout_1',
            preview_html:`<div class="section_layout_1 section_layout_elem"><div></div><div></div></div>`,
            section_wrapper:{
                tag:'div',
                type:'section_wrapper',
                class:'section_wrapper',
                class_selector:`section_wrapper${hash()}`,
                css:{
                    'min-height':'500px',
                    display:'grid',
                    'grid-template-areas':'"elem1" "elem2"',
                    'grid-template-columns':'repeat(1, 1fr)',
                    'grid-gap':'10px',
                },
                css_mobile:{
                    'grid-template-areas':'"elem1""elem2"',
                    'grid-template-columns':'repeat(1, 1fr)',
                },
                children:{
                    [`elements_container_${hash()}`]:get_home_section_child('elem1'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem2'),
                }
            },
        },
        {
            layout:'3',
            preview_class:'section_layout_3',
            preview_html:`<div class="section_layout_3 section_layout_elem"><div></div><div><div></div><div></div></div></div>`,
            section_wrapper:{
                tag:'div',
                type:'section_wrapper',
                class:'section_wrapper',
                class_selector:`section_wrapper${hash()}`,
                css:{
                    'min-height':'500px',
                    display:'grid',
                    'grid-template-areas':'"elem1 elem1" "elem2 elem3"',
                    'grid-template-columns':'repeat(2, 1fr)',
                    'grid-gap':'10px',
                },
                css_mobile:{
                    'grid-template-areas':'"elem1""elem2""elem3"',
                    'grid-template-columns':'repeat(1, 1fr)',
                },
                children:{
                    [`elements_container_${hash()}`]:get_home_section_child('elem1'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem2'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem3'),
                }
            },
        },
        {
            layout:'4',
            preview_class:'section_layout_4',
            preview_html:`<div class="section_layout_4 section_layout_elem"><div><div></div><div></div></div><div></div></div>`,
            section_wrapper:{
                tag:'div',
                type:'section_wrapper',
                class:'section_wrapper',
                class_selector:`section_wrapper${hash()}`,
                css:{
                    'min-height':'500px',
                    display:'grid',
                    'grid-template-areas':'"elem1 elem2" "elem3 elem3"',
                    'grid-template-columns':'repeat(2, 1fr)',
                    'grid-gap':'10px',
                },
                css_mobile:{
                    'grid-template-areas':'"elem1""elem2""elem3"',
                    'grid-template-columns':'repeat(1, 1fr)',
                },
                children:{
                    [`elements_container_${hash()}`]:get_home_section_child('elem1'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem2'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem3'),
                }
            },
        },
        {
            layout:'5',
            preview_class:'section_layout_5',
            preview_html:`<div class="section_layout_5 section_layout_elem"><div><div></div><div></div></div><div><div></div><div></div></div></div>`,
            section_wrapper:{
                tag:'div',
                type:'section_wrapper',
                class:'section_wrapper',
                class_selector:`section_wrapper${hash()}`,
                css:{
                    'min-height':'500px',
                    display:'grid',
                    'grid-template-areas':'"elem1 elem2" "elem3 elem4"',
                    'grid-template-columns':'repeat(2, 1fr)',
                    'grid-gap':'10px',
                },
                css_mobile:{
                    'grid-template-areas':'"elem1""elem2""elem3""elem4"',
                    'grid-template-columns':'repeat(1, 1fr)',
                },
                children:{
                    [`elements_container_${hash()}`]:get_home_section_child('elem1'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem2'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem3'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem4'),
                }
            },
        },
        {
            layout:'6',
            preview_class:'section_layout_6',
            preview_html:`<div class="section_layout_6 section_layout_elem"><div></div><div></div><div></div></div>`,
            section_wrapper:{
                tag:'div',
                type:'section_wrapper',
                class:'section_wrapper',
                class_selector:`section_wrapper${hash()}`,
                css:{
                    'min-height':'500px',
                    display:'grid',
                    'grid-template-areas':'"elem1 elem2 elem3"',
                    'grid-template-columns':'repeat(3, 1fr)',
                    'grid-gap':'10px',
                },
                css_mobile:{
                    'grid-template-areas':'"elem1""elem2""elem3"',
                    'grid-template-columns':'repeat(1, 1fr)',
                },
                children:{
                    [`elements_container_${hash()}`]:get_home_section_child('elem1'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem2'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem3'),
                }
            },
        },
        {
            layout:'7',
            preview_class:'section_layout_7',
            preview_html:`<div class="section_layout_7 section_layout_elem"><div><div></div><div></div></div><div></div><div></div></div>`,
            section_wrapper:{
                tag:'div',
                type:'section_wrapper',
                class:'section_wrapper',
                class_selector:`section_wrapper${hash()}`,
                css:{
                    'min-height':'500px',
                    display:'grid',
                    'grid-template-areas':'"elem1 elem3 elem4""elem2 elem3 elem4"',
                    'grid-template-columns':'repeat(3, 1fr)',
                    'grid-gap':'10px',
                },
                css_mobile:{
                    'grid-template-areas':'"elem1""elem2""elem3""elem4"',
                    'grid-template-columns':'repeat(1, 1fr)',
                },
                children:{
                    [`elements_container_${hash()}`]:get_home_section_child('elem1'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem2'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem3'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem4'),
                }
            },
        },
        {
            layout:'8',
            preview_class:'section_layout_8',
            preview_html:`<div class="section_layout_8 section_layout_elem"><div></div><div><div></div><div></div></div><div></div></div>`,
            section_wrapper:{
                tag:'div',
                type:'section_wrapper',
                class:'section_wrapper',
                class_selector:`section_wrapper${hash()}`,
                css:{
                    'min-height':'500px',
                    display:'grid',
                    'grid-template-areas':'"elem1 elem2 elem4""elem1 elem3 elem4"',
                    'grid-template-columns':'repeat(3, 1fr)',
                    'grid-gap':'10px',
                },
                css_mobile:{
                    'grid-template-areas':'"elem1""elem2""elem3""elem4"',
                    'grid-template-columns':'repeat(1, 1fr)',
                },
                children:{
                    [`elements_container_${hash()}`]:get_home_section_child('elem1'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem2'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem3'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem4'),
                }
            },
        },
        {
            layout:'9',
            preview_class:'section_layout_9',
            preview_html:`<div class="section_layout_9 section_layout_elem"><div></div><div></div><div><div></div><div></div></div></div>`,
            section_wrapper:{
                tag:'div',
                type:'section_wrapper',
                class:'section_wrapper',
                class_selector:`section_wrapper${hash()}`,
                css:{
                    'min-height':'500px',
                    display:'grid',
                    'grid-template-areas':'"elem1 elem2 elem3""elem1 elem2 elem4"',
                    'grid-template-columns':'repeat(3, 1fr)',
                    'grid-gap':'10px',
                },
                css_mobile:{
                    'grid-template-areas':'"elem1""elem2""elem3""elem4"',
                    'grid-template-columns':'repeat(1, 1fr)',
                },
                children:{
                    [`elements_container_${hash()}`]:get_home_section_child('elem1'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem2'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem3'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem4'),
                }
            },
        },
        {
            layout:'10',
            preview_class:'section_layout_10',
            preview_html:`<div class="section_layout_10 section_layout_elem"><div><div></div><div></div></div><div><div></div><div></div></div><div></div></div>`,
            section_wrapper:{
                tag:'div',
                type:'section_wrapper',
                class:'section_wrapper',
                class_selector:`section_wrapper${hash()}`,
                css:{
                    'min-height':'500px',
                    display:'grid',
                    'grid-template-areas':'"elem1 elem3 elem5""elem2 elem4 elem5"',
                    'grid-template-columns':'repeat(3, 1fr)',
                    'grid-gap':'10px',
                },
                css_mobile:{
                    'grid-template-areas':'"elem1""elem2""elem3""elem4""elem5"',
                    'grid-template-columns':'repeat(1, 1fr)',
                },
                children:{
                    [`elements_container_${hash()}`]:get_home_section_child('elem1'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem2'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem3'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem4'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem5'),
                }
            },
        },
        {
            layout:'11',
            preview_class:'section_layout_11',
            preview_html:`<div class="section_layout_11 section_layout_elem"><div><div></div><div></div></div><div></div><div><div></div><div></div></div></div>`,
            section_wrapper:{
                tag:'div',
                type:'section_wrapper',
                class:'section_wrapper',
                class_selector:`section_wrapper${hash()}`,
                css:{
                    'min-height':'500px',
                    display:'grid',
                    'grid-template-areas':'"elem1 elem3 elem4""elem2 elem3 elem5"',
                    'grid-template-columns':'repeat(3, 1fr)',
                    'grid-gap':'10px',
                },
                css_mobile:{
                    'grid-template-areas':'"elem1""elem2""elem3""elem4""elem5"',
                    'grid-template-columns':'repeat(1, 1fr)',
                },
                children:{
                    [`elements_container_${hash()}`]:get_home_section_child('elem1'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem2'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem3'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem4'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem5'),
                }
            },
        },
        {
            layout:'12',
            preview_class:'section_layout_12',
            preview_html:`<div class="section_layout_12 section_layout_elem"><div></div><div><div></div><div></div></div><div><div></div><div></div></div></div>`,
            section_wrapper:{
                tag:'div',
                type:'section_wrapper',
                class:'section_wrapper',
                class_selector:`section_wrapper${hash()}`,
                css:{
                    'min-height':'500px',
                    display:'grid',
                    'grid-template-areas':'"elem1 elem2 elem4""elem1 elem3 elem5"',
                    'grid-template-columns':'repeat(3, 1fr)',
                    'grid-gap':'10px',
                },
                css_mobile:{
                    'grid-template-areas':'"elem1""elem2""elem3""elem4""elem5"',
                    'grid-template-columns':'repeat(1, 1fr)',
                },
                children:{
                    [`elements_container_${hash()}`]:get_home_section_child('elem1'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem2'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem3'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem4'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem5'),
                }
            },
        },
        {
            layout:'13',
            preview_class:'section_layout_13',
            preview_html:`<div class="section_layout_13 section_layout_elem"><div><div></div><div></div></div><div><div></div><div></div></div><div><div></div><div></div></div></div>`,
            section_wrapper:{
                tag:'div',
                type:'section_wrapper',
                class:'section_wrapper',
                class_selector:`section_wrapper${hash()}`,
                css:{
                    'min-height':'500px',
                    display:'grid',
                    'grid-template-areas':'"elem1 elem3 elem5""elem2 elem4 elem6"',
                    'grid-template-columns':'repeat(3, 1fr)',
                    'grid-gap':'10px',
                },
                css_mobile:{
                    'grid-template-areas':'"elem1""elem2""elem3""elem4""elem5""elem6"',
                    'grid-template-columns':'repeat(1, 1fr)',
                },
                children:{
                    [`elements_container_${hash()}`]:get_home_section_child('elem1'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem2'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem3'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem4'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem5'),
                    [`elements_container_${hash()}`]:get_home_section_child('elem6'),
                }
            },
        },

    ]
}

