window.preview_input_boxs_style = {
    color:'1',
    border_radius:'5px',
    padding_size:'8px 10px 8px 10px',
    preview_error:'0',
}
elem_preivew_input_box = function(_key){
    let class_selector = `input_box_preview_${_key}`;
    return {
        type:'preview_input_box',
        elem_type:'input_box',
        tag:'input',
        class_selector:class_selector,
        css:{
            'width':'100%',
            'box-sizing':'border-box',
        
            'line-height':'1.3em',
            'letter-spacing':'0.03em',
            'font-size':'0.9em',
            'font-weight':'normal',
            'text-decoration':'none',
            'font-style':'normal',
            'text-align':'start',
        },
        css_hover:{},
        css_focus:{},
        css_error:{},
        css_placeholder:{
            'color':'rgba(var(--color_4_5),1)',
        },
        accessibility:['hover','focus','error']
    }
} 
get_input_boxs = function(key=null){
    let c = window.preview_input_boxs_style.color;
    let br = window.preview_input_boxs_style.border_radius;
    let p = window.preview_input_boxs_style.padding_size;
    let input_boxs = {};

    let _key = 0;//1;
    input_boxs[_key] = {
        'css':{
            'border-top':`1px solid rgba(var(--color_4_3),.3)`,
            'border-right':`1px solid rgba(var(--color_4_3),.3)`,
            'border-bottom':`1px solid rgba(var(--color_4_3),.3)`,
            'border-left':`1px solid rgba(var(--color_4_3),.3)`,

            'border-radius': `${br} ${br} ${br} ${br}`,
            'padding':p,
            'transition-duration':'200ms',
        },
        'css_focus':{
            'box-shadow':`0 0 2px 3px rgba(var(--color_${c}_3),.4)`,
            'border-top':`1px solid rgba(var(--color_${c}_3),.3)`,
            'border-right':`1px solid rgba(var(--color_${c}_3),.3)`,
            'border-bottom':`1px solid rgba(var(--color_${c}_3),.3)`,
            'border-left':`1px solid rgba(var(--color_${c}_3),.3)`,
        },
        'css_error':{
            'border-top':`1px solid rgba(var(--_error),1)`,
            'border-right':`1px solid rgba(var(--_error),1)`,
            'border-bottom':`1px solid rgba(var(--_error),1)`,
            'border-left':`1px solid rgba(var(--_error),1)`,
        },
        'background':get_default_style('background_color'),
    }
    input_boxs[_key].background.color = `rgba(var(--color_4_7),1)`;

    _key++;//2;
    input_boxs[_key] = {
        'css':{
            'border-top':`2px solid rgba(var(--color_4_6),.2)`,
            'border-right':`2px solid rgba(var(--color_4_6),.2)`,
            'border-bottom':`2px solid rgba(var(--color_4_6),.2)`,
            'border-left':`2px solid rgba(var(--color_4_6),.2)`,

            'border-radius': `${br} ${br} ${br} ${br}`,
            'padding':p,
            'transition-duration':'300ms',
        },
        'css_hover':{
            'border-top':`2px solid rgba(var(--color_4_6),.8)`,
            'border-right':`2px solid rgba(var(--color_4_6),.8)`,
            'border-bottom':`2px solid rgba(var(--color_4_6),.8)`,
            'border-left':`2px solid rgba(var(--color_4_6),.8)`,
        },
        'css_focus':{
            'border-top':`2px solid rgba(var(--color_${c}_3),.5)`,
            'border-right':`2px solid rgba(var(--color_${c}_3),.5)`,
            'border-bottom':`2px solid rgba(var(--color_${c}_3),.5)`,
            'border-left':`2px solid rgba(var(--color_${c}_3),.5)`,
        },
        'css_error':{
            'border-top':`2px solid rgba(var(--_error),0.8)`,
            'border-right':`2px solid rgba(var(--_error),0.8)`,
            'border-bottom':`2px solid rgba(var(--_error),0.8)`,
            'border-left':`2px solid rgba(var(--_error),0.8)`,
        },
        'background':get_default_style('background_color'),
        'background_focus':get_default_style('background_color'),
    }
    input_boxs[_key].background.color = `rgba(var(--color_4_6),.5)`;
    input_boxs[_key].background_focus.color = `rgba(var(--color_4_7),1)`;

    _key++;//3;
    input_boxs[_key] = {
        'css':{
            'border-top':`2px solid rgba(var(--color_${c}_3),0)`,
            'border-right':`2px solid rgba(var(--color_${c}_3),0)`,
            'border-bottom':`2px solid rgba(var(--color_4_6),.8)`,
            'border-left':`2px solid rgba(var(--color_${c}_3),0)`,

            'padding':'3px 5px 3px 5px',
            'transition-duration':'300ms',
        },
        'css_focus':{
            'border-top':`2px solid rgba(var(--color_${c}_3),0)`,
            'border-right':`2px solid rgba(var(--color_${c}_3),0)`,
            'border-bottom':`2px solid rgba(var(--color_${c}_3),.8)`,
            'border-left':`2px solid rgba(var(--color_${c}_3),0)`,
        },
        'css_error':{
            'border-top':`2px solid rgba(var(--_error),0)`,
            'border-right':`2px solid rgba(var(--_error),0)`,
            'border-bottom':`2px solid rgba(var(--_error),0.8)`,
            'border-left':`2px solid rgba(var(--_error),0)`,
        },
        'background':get_default_style('background_color'),
    }
    input_boxs[_key].background.color = `rgba(var(--color_4_7),0)`;

    _key++;//4;
    input_boxs[_key] = {
        'css':{
            'border-top':`2px solid rgba(var(--color_${c}_3),0)`,
            'border-right':`2px solid rgba(var(--color_${c}_3),0)`,
            'border-bottom':`2px solid rgba(var(--color_${c}_3),.5)`,
            'border-left':`2px solid rgba(var(--color_${c}_3),0)`,

            'padding':'3px 5px 3px 5px',
            'transition-duration':'500ms',
        },
        'css_focus':{
            'border-top':`2px solid rgba(var(--color_${c}_3),0)`,
            'border-right':`2px solid rgba(var(--color_${c}_3),0)`,
            'border-bottom':`2px solid rgba(var(--color_${c}_3),.8)`,
            'border-left':`2px solid rgba(var(--color_${c}_3),0)`,
        },
        'css_error':{
            'border-top':`2px solid rgba(var(--_error),0)`,
            'border-right':`2px solid rgba(var(--_error),0)`,
            'border-bottom':`2px solid rgba(var(--_error),0.8)`,
            'border-left':`2px solid rgba(var(--_error),0)`,
        },
        'background':get_default_style('background_color'),
        'background_focus':get_default_style('background_color'),
    }
    input_boxs[_key].background.color = `rgba(var(--color_4_6),.2)`;
    input_boxs[_key].background_focus.color = `rgba(var(--color_4_7),0)`;

    _key++;//5;
    input_boxs[_key] = {
        'css':{
            'border-radius': `${br} ${br} ${br} ${br}`,
            'padding':p,
            'transition-duration':'500ms',
        },
        'background':get_default_style('background_color'),
        'background_error':get_default_style('background_color'),
    }
    input_boxs[_key].background.color = `rgba(var(--color_4_6),.3)`;
    input_boxs[_key].background_error.color = `rgba(var(--_error),.2)`;

    _key++;//6;
    input_boxs[_key] = {
        'css':{
            'border-radius': `${br} ${br} ${br} ${br}`,
            'padding':p,
            'transition-duration':'200ms',
        },
        'background':get_default_style('background_color'),
        'background_hover':get_default_style('background_color'),
        'background_focus':get_default_style('background_color'),
        'background_error':get_default_style('background_color'),
    }
    input_boxs[_key].background.color = `rgba(var(--color_4_6),.5)`;
    input_boxs[_key].background_hover.color = `rgba(var(--color_4_6),.3)`;
    input_boxs[_key].background_focus.color = `rgba(var(--color_4_6),.1)`;
    input_boxs[_key].background_error.color = `rgba(var(--_error),.2)`;

    _key++;//7;
    input_boxs[_key] = {
        'css':{
    
            'box-shadow':`rgba(var(--color_${c}_1),.3) 0px 0px 2px 0px, rgba(var(--color_${c}_3),.1) 0px 1px 1px 0px`,
            'border-top':`1px solid rgba(var(--color_4_3),.0)`,
            'border-right':`1px solid rgba(var(--color_4_3),.0)`,
            'border-bottom':`1px solid rgba(var(--color_4_3),.0)`,
            'border-left':`1px solid rgba(var(--color_4_3),.0)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            'padding':p,
            'transition-duration':'100ms',
        },
        'css_hover':{
            'border-top':`1px solid rgba(var(--color_4_3),.0)`,
            'border-right':`1px solid rgba(var(--color_4_3),.0)`,
            'border-bottom':`1px solid rgba(var(--color_4_3),.0)`,
            'border-left':`1px solid rgba(var(--color_4_3),.0)`,
        },
        'css_focus':{
            'border-top':`1px solid rgba(var(--color_${c}_3),1)`,
            'border-right':`1px solid rgba(var(--color_${c}_3),1)`,
            'border-bottom':`1px solid rgba(var(--color_${c}_3),1)`,
            'border-left':`1px solid rgba(var(--color_${c}_3),1)`,
        },
        'css_error':{
            'border-top':`1px solid rgba(var(--_error),1)`,
            'border-right':`1px solid rgba(var(--_error),1)`,
            'border-bottom':`1px solid rgba(var(--_error),1)`,
            'border-left':`1px solid rgba(var(--_error),1)`,
        },
        'background':get_default_style('background_color'),
        'background_focus':get_default_style('background_color'),
    }
    input_boxs[_key].background.color = `rgba(var(--color_4_6),0)`;
    input_boxs[_key].background_focus.color = `rgba(var(--color_4_7),0)`;

    _key++;//8;
    input_boxs[_key] = {
        'css':{
    
            'box-shadow':`rgba(var(--color_4_3),.2) 0px 1px 4px 0px inset`,
            'border-top':`1px solid rgba(var(--color_4_3),.0)`,
            'border-right':`1px solid rgba(var(--color_4_3),.0)`,
            'border-bottom':`1px solid rgba(var(--color_4_3),.0)`,
            'border-left':`1px solid rgba(var(--color_4_3),.0)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            'padding':p,
            'transition-duration':'100ms',
        },
        'css_hover':{
            'border-top':`1px solid rgba(var(--color_4_3),.0)`,
            'border-right':`1px solid rgba(var(--color_4_3),.0)`,
            'border-bottom':`1px solid rgba(var(--color_4_3),.0)`,
            'border-left':`1px solid rgba(var(--color_4_3),.0)`,
        },
        'css_focus':{
            'border-top':`1px solid rgba(var(--color_${c}_3),1)`,
            'border-right':`1px solid rgba(var(--color_${c}_3),1)`,
            'border-bottom':`1px solid rgba(var(--color_${c}_3),1)`,
            'border-left':`1px solid rgba(var(--color_${c}_3),1)`,
        },
        'css_error':{
            'border-top':`1px solid rgba(var(--_error),1)`,
            'border-right':`1px solid rgba(var(--_error),1)`,
            'border-bottom':`1px solid rgba(var(--_error),1)`,
            'border-left':`1px solid rgba(var(--_error),1)`,
        },
        'background':get_default_style('background_color'),
        'background_focus':get_default_style('background_color'),
    }
    input_boxs[_key].background.color = `rgba(var(--color_4_6),0)`;
    input_boxs[_key].background_focus.color = `rgba(var(--color_4_7),0)`;


    if(key == null){
        return input_boxs;
    }else{
        return input_boxs[key]
    }
}