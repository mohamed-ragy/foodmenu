get_buttons = function(c,key=null){
    let buttons = [
        {
            'css':{
                'color':`rgba(var(--color_${c}_7),1)`,
                'background-color':`rgba(var(--color_${c}_4),1)`,
                //
                'border-radius': `3px 3px 3px 3px`,
            },
            'css_hover':{
                'color':`rgba(var(--color_${c}_7),1)`,
                'background-color':`rgba(var(--color_${c}_3),1)`,
                //
            },
            'css_click':{
                'color':`rgba(var(--color_${c}_7),1)`,
                'background-color':`rgba(var(--color_${c}_4),1)`,
                //
            },
            'css_disabled':{
                'color':`rgba(var(--color_4_3),1)`,
                'background-color':`rgba(var(--color_4_4),1)`,
            },

        },
        {
            'css':{
                'color':`rgba(var(--color_${c}_4),1)`,
                'background-color':`rgba(var(--color_${c}_4),.1)`,
                //
                'border-top':`1px solid rgba(var(--color_${c}_4),.5)`,
                'border-right':`1px solid rgba(var(--color_${c}_4),.5)`,
                'border-bottom':`1px solid rgba(var(--color_${c}_4),.5)`,
                'border-left':`1px solid rgba(var(--color_${c}_4),.5)`,
                //
                'border-radius': `3px 3px 3px 3px`,
            },
            'css_hover':{
                'color':`rgba(var(--color_${c}_4),1)`,
                'background-color':`rgba(var(--color_${c}_4),.2)`,
                //
                'border-top':`1px solid rgba(var(--color_${c}_4),.5)`,
                'border-right':`1px solid rgba(var(--color_${c}_4),.5)`,
                'border-bottom':`1px solid rgba(var(--color_${c}_4),.5)`,
                'border-left':`1px solid rgba(var(--color_${c}_4),.5)`,
                //
            },
            'css_click':{
                'color':`rgba(var(--color_${c}_4),1)`,
                'background-color':`rgba(var(--color_${c}_4),.1)`,
                //
                'border-top':`1px solid rgba(var(--color_${c}_4),.5)`,
                'border-right':`1px solid rgba(var(--color_${c}_4),.5)`,
                'border-bottom':`1px solid rgba(var(--color_${c}_4),.5)`,
                'border-left':`1px solid rgba(var(--color_${c}_4),.5)`,
                //
            },
            'css_disabled':{
                'color':`rgba(var(--color_4_3),1)`,
                'background-color':`rgba(var(--color_4_4),1)`,
            }
        }
    ]

    if(key == null){
        return buttons;
    }else{
        return buttons[key]
    }
}