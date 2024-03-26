$('html,body').on('click','.switch_btn_action',function(e){
    e.stopImmediatePropagation();
    $(this).hasClass('switch_btn_selected') ? $(this).removeClass('switch_btn_selected') : $(this).addClass('switch_btn_selected');
    let action;
    if($(this).hasClass('switch_btn_selected')){
        action = $(this).attr('switch_on')
    }else{
        action = $(this).attr('switch_off')
    }
    let keys = $(this).attr('key_tree').split('.');
    let template = window.template;
    for(const key in keys){
        template = template[keys[key]];
    }
    template[$(this).attr('key')] = action;
    new_action();
})
switch_btn_toggle = function(switch_btn){
    switch_btn.hasClass('switch_btn_selected') ? switch_btn.removeClass('switch_btn_selected') : switch_btn.addClass('switch_btn_selected');
}
