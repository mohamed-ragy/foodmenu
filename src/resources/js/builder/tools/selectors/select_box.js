$('html,body').on('click','.select_box',function(e){
    e.stopImmediatePropagation();
    let keys = $(this).closest('.select_box_container').attr('key_tree').split('.');
    let template = window.template;
    for(const key in keys){
        template = template[keys[key]];
    }
    template[$(this).closest('.select_box_container').attr('key')] = $(this).attr('key')
    new_action();
})
