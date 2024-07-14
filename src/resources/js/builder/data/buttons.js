get_buttons = function(key=null){
    let buttons = [
        {
            'css':{
                'color':'rgba(var(--color_1_7),1)',
                'background-color':'rgba(var(--color_1_1),1)',
                'box-shadow': 'none',
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
            },
            'css_hover':{
                'color':'rgba(var(--color_1_7),1)',
                'background-color':'rgba(var(--color_1_2),1)',
                'box-shadow': 'none',
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
            },
            'css_click':{
                'color':'rgba(var(--color_1_7),1)',
                'background-color':'rgba(var(--color_1_1),1)',
                'box-shadow': 'none',
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
            },

        },
    ]

    if(key == null){
        return buttons;
    }else{
        return buttons[key]
    }
}