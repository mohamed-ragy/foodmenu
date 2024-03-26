$('html,body').on('click','.border_radius_select',function(e){
    e.stopImmediatePropagation();
    hidePopupSelectors();
    let corner_name = $(this).attr('corner_name')
    $('.border_radius_select_elems').attr('corner_name',corner_name).attr('key_tree',$(this).closest('.border_radius_selector_container').attr('key_tree')).attr('key',$(this).closest('.border_radius_selector_container').attr('key')).attr('inputList',$(this).attr('id')).text('').append(
        $('<div/>',{class:`border_radius_elem border_radius_select_${corner_name}_0px`,key:'0px'}),
        $('<div/>',{class:`border_radius_elem border_radius_select_${corner_name}_5px`,key:'5px'}),
        $('<div/>',{class:`border_radius_elem border_radius_select_${corner_name}_10px`,key:'10px'}),
        $('<div/>',{class:`border_radius_elem border_radius_select_${corner_name}_20px`,key:'20px'}),
    ).removeClass('none').css({
        left:$(this).offset().left - 3,
        top:$(this).offset().top + $(this).outerHeight(),
    })
})

$('html,body').on('click','.border_radius_elem',function(e){
    e.stopImmediatePropagation();
    let keys = $('.border_radius_select_elems').attr('key_tree').split('.');
    let corner_name = $('.border_radius_select_elems').attr('corner_name')
    let template = window.template;
    for(const key in keys){
        template = template[keys[key]];
    }
    let border_radius = template[$('.border_radius_select_elems').attr('key')].split(' ');
    let new_border_radius = '';
    corner_name == 'top_left' ? new_border_radius = new_border_radius + $(this).attr('key') :new_border_radius = new_border_radius +  border_radius[0];
    corner_name == 'top_right' ? new_border_radius = new_border_radius + ` ${$(this).attr('key')}` :new_border_radius = new_border_radius +  ` ${border_radius[1]}`;
    corner_name == 'bottom_right' ? new_border_radius = new_border_radius + ` ${$(this).attr('key')}` :new_border_radius = new_border_radius +  ` ${border_radius[2]}`;
    corner_name == 'bottom_left' ? new_border_radius = new_border_radius + ` ${$(this).attr('key')}` :new_border_radius = new_border_radius +  ` ${border_radius[3]}`;
    template[$('.border_radius_select_elems').attr('key')] = new_border_radius;
    $('.border_radius_select_elems').addClass('none')
    new_action();
})
