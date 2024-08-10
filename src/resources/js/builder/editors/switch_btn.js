draw_switch_btn = function(data){
    let editor = $('<div/>',{
        class:`editor switch_btn ${data.dummy === true ? 'dummy_editor' : ''} ${data.dummy === true ? data.dummy_class : ''} ${data.disabled ? 'switch_btn_disabled' : ''}`,
        key_tree:data.key_tree,
        variable_key:data.variable_key,
        key:data.key,
        show_hide:data.show_hide ?? '',
    })
    return editor;
}
set_switch_btn = function(editor){
    if(editor.hasClass('dummy_editor')){return;}
    let val = get_editor_val(editor)
    if(val == '1'){
        editor.addClass('switch_btn_selected')
    }else if(val == '0'){
        editor.removeClass('switch_btn_selected')
    }
    if(typeof(editor.attr('show_hide')) !== 'undefined' && editor.attr('show_hide') != ''){
        let show_hide = editor.attr('show_hide').split('.');
        if(val == '1'){
            for(const key in show_hide){
                $(`.${show_hide[key]}`).removeClass('none')
            }
        }else if(val == '0'){
            for(const key in show_hide){
                $(`.${show_hide[key]}`).addClass('none')
            }
        }
    }
}
set_dummy_switch_btn = function(editor,val){
    if(val == '1'){
        editor.addClass('switch_btn_selected')
    }else if(val == '0'){
        editor.removeClass('switch_btn_selected')
    }
    if(typeof(editor.attr('show_hide')) !== 'undefined' && editor.attr('show_hide') !== ''){
        let show_hide = editor.attr('show_hide').split('.');
        if(val == '1'){
            for(const key in show_hide){
                $(`.${show_hide[key]}`).removeClass('none')
            }
        }else if(val == '0'){
            for(const key in show_hide){
                $(`.${show_hide[key]}`).addClass('none')
            }
        }
    }
}
$('body').on('change','.switch_btn',function(e){
    if($(this).hasClass('dummy_editor')){return;}
    let new_val;
    if($(this).hasClass('switch_btn_selected')){
        new_val = '1';
    }else{
        new_val = '0';
    }
    set_val($(this),new_val);
    new_action();
})
$('body').on('click','.switch_btn',function(e){
    if($(this).hasClass('switch_btn_disabled')){
        return;
    }
    let new_val;
    if($(this).hasClass('switch_btn_selected')){
        $(this).removeClass('switch_btn_selected')
        new_val = '0';
    }else{
        $(this).addClass('switch_btn_selected')
        new_val = '1';
    }
    if(typeof($(this).attr('show_hide')) !== 'undefined' && $(this).attr('show_hide') != ''){
        let show_hide = $(this).attr('show_hide').split('.');
        if(new_val == '1'){
            for(const key in show_hide){
                $(`.${show_hide[key]}`).removeClass('none')
            }
        }else if(new_val == '0'){
            for(const key in show_hide){
                $(`.${show_hide[key]}`).addClass('none')
            }
        }
    }
    $(this).trigger('change');

})
