get_box_shadows = function(key=null){
    let shadows = [//94
        'rgba(var(--color_4_3),0.1) 0px 4px 16px 0px, rgba(var(--color_4_3),0.1) 0px 8px 32px 0px',
        'rgba(var(--color_4_2),0.1) 0px 1px 0px 0px, rgba(var(--color_4_2),0.1) 0px 0px 8px 0px',
        'rgba(var(--color_4_5),0.3) 0px 3px 6px 0px inset, rgba(var(--color_4_7),0.3) -3px -3px 6px 1px inset',
        'rgba(var(--color_4_1),0.1) 0px 10px 50px 0px',
        'rgba(var(--color_4_1),0.2) 0px 18px 50px -10px',
        'rgba(var(--color_4_2),0.1) 0px 2px 4px 0px inset',
        'rgba(var(--color_4_1),0.1) 0px 10px 15px -3px, rgba(var(--color_4_2),0.1) 0px 4px 6px -2px',
        'rgba(var(--color_4_1),0.1) 0px 1px 3px 0px, rgba(var(--color_4_2),0.1) 0px 1px 2px 0px',
        'rgba(var(--color_4_1),0.1) 0px 1px 3px 0px, rgba(var(--color_4_1),0.2) 0px 1px 2px 0px',
        'rgba(var(--color_4_2),0.2) 0px 50px 100px -20px, rgba(var(--color_4_1),0.3) 0px 30px 60px -30px',
        'rgba(var(--color_4_3),0.3) 0px 6px 12px -2px, rgba(var(--color_4_1),0.3) 0px 3px 7px -3px',
        'rgba(var(--color_4_2),0.2) 0px 2px 5px -1px, rgba(var(--color_4_1),0.3) 0px 1px 3px -1px',
        'rgba(var(--color_4_3),0.2) 0px 13px 27px -5px, rgba(var(--color_4_1),0.3) 0px 8px 16px -8px',
        'rgba(var(--color_4_5),0.3) 0px 50px 100px -20px, rgba(var(--color_4_1),0.3) 0px 30px 60px -30px',
        'rgba(var(--color_4_3),0.1) 0px 48px 100px 0px',
        'rgba(var(--color_4_1),0.2) 0px 10px 36px 0px, rgba(var(--color_4_1),0.1) 0px 0px 0px 1px',
        'rgba(var(--color_4_1),0.1) 0px 6px 24px 0px, rgba(var(--color_4_1),0.1) 0px 0px 0px 1px',
        'rgba(var(--color_4_1),0.1) 0px 4px 12px 0px',
        'rgba(var(--color_4_4),0.2) 0px 50px 100px -20px, rgba(var(--color_4_1),0.3) 0px 30px 60px -30px, rgba(var(--color_4_3),0.3) 0px -2px 6px 0px inset',
        'rgba(var(--color_4_2),0.2) 0px 2px 8px 0px',
        'rgba(var(--color_4_1),0.1) 0px 1px 4px 0px',
        'rgba(var(--color_4_1),0.1) 0px 6px 24px 0px, rgba(var(--color_4_1),0.1) 0px 0px 0px 1px',
        'rgba(var(--color_4_2),0.2) 0px 8px 24px 0px',
        'rgba(var(--color_4_2),0.2) 0px 7px 29px 0px',
        'rgba(var(--color_4_1),0.1) 2px 2px 2px 0px',
        'rgba(var(--color_4_1),0.2) 0px 3px 8px 0px',
        'rgba(var(--color_4_1),0.3) 0px 5px 15px 0px',
        'rgba(var(--color_4_1),0.2) 0px 25px 20px -20px',
    ]
    if(key == null){
        return shadows;
    }else{
        return shadows[key]
    }
}