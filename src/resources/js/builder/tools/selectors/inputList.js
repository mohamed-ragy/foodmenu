$('html,body').on('click','.inputList_container',function(e){
    e.stopImmediatePropagation();
    $('.color_theme_picker_themes').addClass('none')
    $('.inputList_elems').attr('key_tree',$(this).attr('key_tree')).attr('key',$(this).attr('key')).attr('inputList',$(this).attr('id')).text('').append(
        $(this).find('.inputList_elems_temp').html()
    ).removeClass('none').css({
        left:$(this).offset().left,
        top:$(this).offset().top + $(this).outerHeight(),
    })
})
$('html,body').on('click','.inputList_elem',function(e){
    e.stopImmediatePropagation();
    let key_tree = $('.inputList_elems').attr('key_tree').split('.');
    let template = window.template;
    let this_key = $(this).attr('key');
    for(const key in key_tree){
        template = window.template[key_tree[key]];
    }
    template[$('.inputList_elems').attr('key')] = this_key;
    $(`#${$('.inputList_elems').attr('inputList')}`).removeClass().addClass(`inputList_container ${this_key}`).children().first().text(texts.inputList_elem[`_${this_key}`])
    $('.inputList_elems').addClass('none')
    new_action();
})
