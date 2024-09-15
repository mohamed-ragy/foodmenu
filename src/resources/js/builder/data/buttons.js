window.preview_buttons_style = {
    color:'1',
    border_radius:'10px',
    padding_size:'10px 15px 10px 15px',
}
get_buttons = function(key=null){
    let c = window.preview_buttons_style.color;
    let br = window.preview_buttons_style.border_radius;
    let p = window.preview_buttons_style.padding_size;
    let buttons = {};
    let _key = 0;
    buttons[_key] = {
        'css':{
            'color':`rgba(var(--color_${c}_7),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            
            'padding':p,
            'transition-duration':'200ms',
        },
        'css_hover':{
            'color':`rgba(var(--color_${c}_7),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
        },
        'css_click':{
            'color':`rgba(var(--color_${c}_7),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
        },
        'css_disabled':{
            'color':`rgba(var(--color_4_5),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
        },
        'background':get_default_style('background'),
        'background_hover':get_default_style('background'),
        'background_click':get_default_style('background'),
        'background_disabled':get_default_style('background'),
    };
    buttons[_key].background.type = 'gradient';
    buttons[_key].background.gradient = `linear-gradient(90deg, rgba(var(--color_${c}_3),1) 0%, rgba(var(--color_${c}_3),.8) 100%)`;
    buttons[_key].background_hover.type = 'gradient';
    buttons[_key].background_hover.gradient = `linear-gradient(90deg, rgba(var(--color_${c}_3),.8) 0%, rgba(var(--color_${c}_3),.6) 100%)`;
    buttons[_key].background_click.type = 'gradient';
    buttons[_key].background_click.gradient = `linear-gradient(90deg, rgba(var(--color_${c}_3),1) 0%, rgba(var(--color_${c}_3),.8) 100%)`;
    buttons[_key].background_disabled.type = 'gradient';
    buttons[_key].background_disabled.gradient = `linear-gradient(90deg, rgba(var(--color_4_6),1) 0%, rgba(var(--color_4_6),.8) 100%)`;

    _key++;
    buttons[_key] = {
        'css':{
            'color':`rgba(var(--color_${c}_7),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            'padding':p,
            'transition-duration':'100ms',
            'transition-timing-function':get_timing_function('ease_in_out_quint')
        },
        'css_hover':{
            'color':`rgba(var(--color_${c}_7),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            'box-shadow':`rgba(var(--color_${c}_4),1) 0px 0px 0px 2px`,
        },
        'css_click':{
            'color':`rgba(var(--color_${c}_7),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
        },
        'css_disabled':{
            'color':`rgba(var(--color_4_5),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
        },
        'background':get_default_style('background'),
        'background_hover':get_default_style('background'),
        'background_click':get_default_style('background'),
        'background_disabled':get_default_style('background'),
    };
    buttons[_key].background.type = 'color';
    buttons[_key].background.color = `rgba(var(--color_${c}_3),1)`;
    buttons[_key].background_hover.type = 'color';
    buttons[_key].background_hover.color = `rgba(var(--color_${c}_3),1)`;
    buttons[_key].background_click.type = 'color';
    buttons[_key].background_click.color = `rgba(var(--color_${c}_3),1)`;
    buttons[_key].background_disabled.type = 'color';
    buttons[_key].background_disabled.color = `rgba(var(--color_4_6),1)`;

    _key++;
    buttons[_key] = {
        'css':{
            'color':`rgba(var(--color_${c}_7),1)`,
            'background-color':`rgba(var(--color_${c}_3),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            // 'box-shadow':`rgba(var(--color_${c}_1),.8) 0px 0px 1px 1px`,
            'transform':get_default_style('transform'),
            'padding':p,
            'transition-duration':'200ms',
        },
        'css_hover':{
            'color':`rgba(var(--color_${c}_7),1)`,
            'background-color':`rgba(var(--color_${c}_3),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            // 'box-shadow':`rgba(var(--color_${c}_1),.8) 0px 0px 1px 1px`,
            'transform':get_default_style('transform').replace('translate(0px,0px)','translate(0px,-2px)'),
        },
        'css_click':{
            'color':`rgba(var(--color_${c}_7),1)`,
            'background-color':`rgba(var(--color_${c}_3),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            // 'box-shadow':'none',
            'transform':get_default_style('transform').replace('translate(0px,0px)','translate(0px,-1px)'),
        },
        'css_disabled':{
            'color':`rgba(var(--color_4_5),1)`,
            'background-color':`rgba(var(--color_4_6),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            'box-shadow':'none',
        },
    };

    _key++;
    buttons[_key] = {
        'css':{
            'color':`rgba(var(--color_${c}_7),1)`,
            'background-color':`rgba(var(--color_${c}_3),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            'box-shadow':`0px 5px 0px 0px rgba(var(--color_${c}_2),1)`,
            
            'padding':p,
            'transition-duration':'0ms',
        },
        'css_hover':{
            'color':`rgba(var(--color_${c}_7),1)`,
            'background-color':`rgba(var(--color_${c}_3),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            'box-shadow':`0px 5px 0px 0px rgba(var(--color_${c}_2),1)`,
        },
        'css_click':{
            'color':`rgba(var(--color_${c}_7),1)`,
            'background-color':`rgba(var(--color_${c}_2),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            'box-shadow':`0px 5px 0px 0px rgba(var(--color_${c}_2),1)`,
        },
        'css_disabled':{
            'color':`rgba(var(--color_4_5),1)`,
            'background-color':`rgba(var(--color_4_6),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
        },
    };

    _key++;
    buttons[_key] = {
        'css':{
            'color':`rgba(var(--color_${c}_7),1)`,
            'background-color':`rgba(var(--color_${c}_3),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            'box-shadow':'none',
            'padding':p,
            'transition-duration':'0ms',
        },
        'css_hover':{
            'color':`rgba(var(--color_${c}_7),1)`,
            'background-color':`rgba(var(--color_${c}_3),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            'box-shadow':`0 0 1px 2px rgba(var(--color_${c}_3),.5)`,
        },
        'css_click':{
            'color':`rgba(var(--color_${c}_7),1)`,
            'background-color':`rgba(var(--color_${c}_3),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            'box-shadow':`0 0 1px 1px rgba(var(--color_${c}_3),.5)`,
        },
        'css_disabled':{
            'color':`rgba(var(--color_4_5),1)`,
            'background-color':`rgba(var(--color_4_6),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
        },
    };

    _key++;
    buttons[_key] = {
        'css':{
            'color':`rgba(var(--color_${c}_3),1)`,
            'background-color':`rgba(var(--color_${c}_7),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            'border-top':`1px solid rgba(var(--color_${c}_3),.5)`,
            'border-right':`1px solid rgba(var(--color_${c}_3),.5)`,
            'border-bottom':`1px solid rgba(var(--color_${c}_3),.5)`,
            'border-left':`1px solid rgba(var(--color_${c}_3),.5)`,

            'padding':p,
            'transition-duration':'200ms',
        },
        'css_hover':{
            'color':`rgba(var(--color_${c}_7),1)`,
            'background-color':`rgba(var(--color_${c}_3),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            'border-top':`1px solid rgba(var(--color_${c}_3),.5)`,
            'border-right':`1px solid rgba(var(--color_${c}_3),.5)`,
            'border-bottom':`1px solid rgba(var(--color_${c}_3),.5)`,
            'border-left':`1px solid rgba(var(--color_${c}_3),.5)`,
            
        },
        'css_click':{
            'color':`rgba(var(--color_${c}_7),1)`,
            'background-color':`rgba(var(--color_${c}_4),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            'border-top':`1px solid rgba(var(--color_${c}_3),.5)`,
            'border-right':`1px solid rgba(var(--color_${c}_3),.5)`,
            'border-bottom':`1px solid rgba(var(--color_${c}_3),.5)`,
            'border-left':`1px solid rgba(var(--color_${c}_3),.5)`,
        },
        'css_disabled':{
            'color':`rgba(var(--color_4_5),1)`,
            'background-color':`rgba(var(--color_4_6),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            'border-top':`1px solid rgba(var(--color_4_6),1)`,
            'border-right':`1px solid rgba(var(--color_4_6),1)`,
            'border-bottom':`1px solid rgba(var(--color_4_6),1)`,
            'border-left':`1px solid rgba(var(--color_4_6),1)`,
        },

    };

    _key++;
    buttons[_key] = {
        'css':{
            'color':`rgba(var(--color_${c}_3),1)`,
            'background-color':`rgba(var(--color_${c}_7),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            'border-top':`1px solid rgba(var(--color_${c}_3),.5)`,
            'border-right':`1px solid rgba(var(--color_${c}_3),.5)`,
            'border-bottom':`1px solid rgba(var(--color_${c}_3),.5)`,
            'border-left':`1px solid rgba(var(--color_${c}_3),.5)`,

            'padding':p,
            'transition-duration':'200ms',
        },
        'css_hover':{
            'color':`rgba(var(--color_${c}_3),1)`,
            'background-color':`rgba(var(--color_${c}_3),.1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            'border-top':`1px solid rgba(var(--color_${c}_3),.5)`,
            'border-right':`1px solid rgba(var(--color_${c}_3),.5)`,
            'border-bottom':`1px solid rgba(var(--color_${c}_3),.5)`,
            'border-left':`1px solid rgba(var(--color_${c}_3),.5)`,
            
        },
        'css_click':{
            'color':`rgba(var(--color_${c}_3),1)`,
            'background-color':`rgba(var(--color_${c}_3),.2)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            'border-top':`1px solid rgba(var(--color_${c}_3),.5)`,
            'border-right':`1px solid rgba(var(--color_${c}_3),.5)`,
            'border-bottom':`1px solid rgba(var(--color_${c}_3),.5)`,
            'border-left':`1px solid rgba(var(--color_${c}_3),.5)`,
        },
        'css_disabled':{
            'color':`rgba(var(--color_4_5),1)`,
            'background-color':`rgba(var(--color_4_6),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            'border-top':`1px solid rgba(var(--color_4_6),1)`,
            'border-right':`1px solid rgba(var(--color_4_6),1)`,
            'border-bottom':`1px solid rgba(var(--color_4_6),1)`,
            'border-left':`1px solid rgba(var(--color_4_6),1)`,
        },
    };

    _key++;
    buttons[_key] = {
        'css':{
            'color':`rgba(var(--color_${c}_1),1)`,
            'background-color':`rgba(var(--color_${c}_7),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            'box-shadow':`rgba(var(--color_${c}_1),0.1) 0px 1px 1px 0px, rgba(var(--color_${c}_2),0.1) 0px 1px 1px 0px inset, rgba(var(--color_${c}_3),.1) 0px 0px 0px 1px inset`,

            'padding':p,
            'transition-duration':'50ms',
        },
        'css_hover':{
            'color':`rgba(var(--color_${c}_1),1)`,
            'background-color':`rgba(var(--color_${c}_6),.1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            'box-shadow':`rgba(var(--color_${c}_1),0.1) 0px 1px 1px 0px, rgba(var(--color_${c}_2),0.1) 0px 1px 1px 0px inset, rgba(var(--color_${c}_3),.1) 0px 0px 0px 1px inset`,
            
        },
        'css_click':{
            'color':`rgba(var(--color_${c}_1),1)`,
            'background-color':`rgba(var(--color_${c}_6),.1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            'box-shadow':`rgba(var(--color_${c}_3),.1) 0px 0px 0px 1px inset`,

        },
        'css_disabled':{
            'color':`rgba(var(--color_4_5),1)`,
            'background-color':`rgba(var(--color_4_6),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            'box-shadow':`rgba(var(--color_4_5),.1) 0px 0px 0px 1px inset`,
        },
    };

    _key++;
    buttons[_key] = {
        'css':{
            'color':`rgba(var(--color_${c}_1),1)`,
            'background-color':`rgba(var(--color_${c}_7),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            'box-shadow':`rgba(var(--color_${c}_1),0.1) 0px 1px 1px 0px, rgba(var(--color_${c}_2),0.1) 0px 1px 1px 0px inset, rgba(var(--color_${c}_3),.1) 0px 0px 0px 1px inset`,

            'padding':p,
            'transition-duration':'200ms',
        },
        'css_hover':{
            'color':`rgba(var(--color_${c}_7),1)`,
            'background-color':`rgba(var(--color_${c}_3),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            'box-shadow':`rgba(var(--color_${c}_1),0.1) 0px 1px 1px 0px, rgba(var(--color_${c}_2),0.1) 0px 1px 1px 0px inset, rgba(var(--color_${c}_3),.1) 0px 0px 0px 1px inset`,
        },
        'css_click':{
            'color':`rgba(var(--color_${c}_7),1)`,
            'background-color':`rgba(var(--color_${c}_3),.7)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            'box-shadow':`rgba(var(--color_${c}_3),.1) 0px 0px 0px 1px inset`,

        },
        'css_disabled':{
            'color':`rgba(var(--color_4_5),1)`,
            'background-color':`rgba(var(--color_4_6),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            'box-shadow':`rgba(var(--color_4_5),.1) 0px 0px 0px 1px inset`,
        },
    };

    _key++;
    buttons[_key] = {
        'css':{
            'color':`rgba(var(--color_${c}_2),1)`,
            'background-color':`rgba(var(--color_${c}_5),.1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,

            'padding':p,
            'transition-duration':'200ms',
        },
        'css_hover':{
            'color':`rgba(var(--color_${c}_2),1)`,
            'background-color':`rgba(var(--color_${c}_5),.2)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
        },
        'css_click':{
            'color':`rgba(var(--color_${c}_2),1)`,
            'background-color':`rgba(var(--color_${c}_5),.1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,

        },
        'css_disabled':{
            'color':`rgba(var(--color_4_5),1)`,
            'background-color':`rgba(var(--color_4_6),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
        },
    };

    _key++;
    buttons[_key] = {
        'css':{
            'color':`rgba(var(--color_${c}_3),.8)`,
            'background-color':`rgba(var(--color_${c}_7),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            'box-shadow':`0px 0px 20px 0px rgba(var(--color_${c}_5),.1), 0px 1px 0px 1px rgba(var(--color_${c}_5),.1), 0px 0px 0px 1px rgba(var(--color_${c}_2),.1) inset`,

            'padding':p,
            'transition-duration':'50ms',
        },
        'css_hover':{
            'color':`rgba(var(--color_${c}_3),.8)`,
            'background-color':`rgba(var(--color_${c}_7),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            'box-shadow':`0px 0px 20px 0px rgba(var(--color_${c}_5),.1), 0px 1px 0px 1px rgba(var(--color_${c}_5),.1), 0px 0px 0px 1px rgba(var(--color_${c}_2),.1) inset`,
        },
        'css_click':{
            'color':`rgba(var(--color_${c}_3),.8)`,
            'background-color':`rgba(var(--color_${c}_7),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            'box-shadow':`0px 0px 0px 0px rgba(var(--color_${c}_5),.1), 0px 0px 0px 0px rgba(var(--color_${c}_5),.1), 0px 0px 1px 1px rgba(var(--color_${c}_2),.1) inset`,
        },
        'css_disabled':{
            'color':`rgba(var(--color_4_5),1)`,
            'background-color':`rgba(var(--color_4_6),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            'box-shadow':'none',
        },
    };

    _key++;
    buttons[_key] = {
        'css':{
            'color':`rgba(var(--color_${c}_3),.8)`,
            'background-color':`rgba(var(--color_${c}_7),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            'box-shadow':`0px 0px 20px 0px rgba(var(--color_${c}_5),.1), 0px 1px 0px 1px rgba(var(--color_${c}_5),.1), 0px 0px 0px 1px rgba(var(--color_${c}_2),.3) inset`,

            'font-weight':'bold',
            'padding':p,
            'transition-duration':'50ms',
        },
        'css_hover':{
            'color':`rgba(var(--color_${c}_3),.8)`,
            'background-color':`rgba(var(--color_${c}_7),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            'box-shadow':`0px 0px 20px 0px rgba(var(--color_${c}_5),.1), 0px 1px 0px 1px rgba(var(--color_${c}_5),.1), 0px 0px 0px 1px rgba(var(--color_${c}_2),.3) inset`,
        },
        'css_click':{
            'color':`rgba(var(--color_${c}_3),.8)`,
            'background-color':`rgba(var(--color_${c}_7),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            'box-shadow':`0px 0px 0px 0px rgba(var(--color_${c}_5),.1), 0px 0px 0px 0px rgba(var(--color_${c}_5),.1), 0px 0px 1px 1px rgba(var(--color_${c}_2),.2) inset`,
        },
        'css_disabled':{
            'color':`rgba(var(--color_4_5),1)`,
            'background-color':`rgba(var(--color_4_6),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            'box-shadow':'none',
        },
    };

    _key++;
    buttons[_key] = {
        'css':{
            'color':`rgba(var(--color_${c}_7),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
            
            'padding':p,
            'transition-duration':'200ms',
        },
        'css_hover':{
            'color':`rgba(var(--color_${c}_7),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
        },
        'css_click':{
            'color':`rgba(var(--color_${c}_7),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
        },
        'css_disabled':{
            'color':`rgba(var(--color_4_5),1)`,
            'border-radius': `${br} ${br} ${br} ${br}`,
        },
        'background':get_default_style('background'),
        'background_hover':get_default_style('background'),
    }
    buttons[_key].background.type = 'gradient';
    buttons[_key].background.gradient = `linear-gradient(90deg, rgba(var(--color_${c}_3),1) 0%, rgba(var(--color_${c}_4),1) 100%)`;
    buttons[_key].background_hover.type = 'gradient';
    buttons[_key].background_hover.gradient = `linear-gradient(90deg, rgba(var(--color_${c}_5),1) 0%, rgba(var(--color_${c}_6),1) 100%)`;

    if(key == null){
        return buttons;
    }else{
        return buttons[key]
    }
}