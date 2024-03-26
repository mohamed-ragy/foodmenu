$('html,body').on('click','.inputList_container',function(e){
    e.stopImmediatePropagation();
    hidePopupSelectors();
    $('.inputList_elems').attr('key_tree',$(this).attr('key_tree')).attr('key',$(this).attr('key')).attr('inputList',$(this).attr('id')).text('').append(
        $(this).find('.inputList_elems_temp').html()
    ).removeClass('none').css({
        left:$(this).offset().left,
        top:$(this).offset().top + $(this).outerHeight(),
    })
})
$('html,body').on('click','.inputList_elem',function(e){
    e.stopImmediatePropagation();
    let keys = $('.inputList_elems').attr('key_tree').split('.');
    let template = window.template;
    for(const key in keys){
        template = template[keys[key]];
    }
    let this_key = $(this).attr('key');
    template[$('.inputList_elems').attr('key')] = this_key;
    $('.inputList_elems').addClass('none')
    new_action();
})
