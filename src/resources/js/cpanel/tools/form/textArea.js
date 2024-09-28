drawTextArea = function(autoHelp,icon,iconFlag,title,id,maxlength,containerClass,value='',inputClass=''){
    let iconElem;
    if(iconFlag == ''){
        iconElem = $('<span/>',{class:`textareaIcon ${icon}`});
    }else if(iconFlag == 'CLF'){
        iconElem = $('<img/>',{class:'textareaIconFlag customLangFlag'});
    }else{
        iconElem = $('<img/>',{class:'textareaIconFlag',src:`./storage/imgs/flags/${iconFlag}.png`});
    }
    return $('<div/>',{class:`textareaContainer ${containerClass}`,autoHelp:autoHelp}).append(
        $('<div/>',{class:'textareaHead'}).append(
            iconElem,
            $('<span/>',{class:'textareaTitle mX5',html:title})
        ),
        $('<textarea/>',{class:`textarea ${inputClass}`,id:id,maxlength:maxlength,text:value}),
        $('<div/>',{class:'textareaCounter'}).append(
            $('<span/>',{class:'textAreaInputLength',text:value.length,}),
            $('<span/>',{text:'/'}),
            $('<span/>',{text:maxlength})
        )
    )
}
$('body').on('input change','.textarea',function(e){
    $(this).closest('.textareaContainer').find('.textareaTitle').removeClass('cR')
    $(this).closest('.textareaContainer').find('.textareaIcon').removeClass('cR')
    $(this).parent().find('.textAreaInputLength').text($(this).val().length);
    if($(this).val().length == $(this).attr('maxlength')){
        $(this).parent().find('.textAreaInputLength').addClass('cR');
    }else{
        $(this).parent().find('.textAreaInputLength').removeClass('cR');
    }
});
$('body').on('click','.textareaHead',function(e){
    $(this).closest('.textareaContainer').find('textarea').select();
});
$('.textarea').each(function(){
    $(this).parent().find('.textAreaInputLength').text($(this).val().length);
    if($(this).val().length == $(this).attr('maxlength')){
        $(this).parent().find('.textAreaInputLength').addClass('cR');
    }else{
        $(this).parent().find('.textAreaInputLength').removeClass('cR');
    }
})
$('body').on('focus','.textarea',function(e){
    $(this).parent().addClass('textareaContainer_active');
    $(this).closest('.textareaContainer').find('.textareaTitle').removeClass('cR cO').addClass('cG')
    $(this).closest('.textareaContainer').find('.textareaIcon').removeClass('cR cO').addClass('cG')
})
$('body').on('focusout','.textarea',function(e){
    $(this).parent().removeClass('textareaContainer_active');
    $(this).closest('.textareaContainer').find('.textareaTitle').removeClass('cR cO cG')
    $(this).closest('.textareaContainer').find('.textareaIcon').removeClass('cR cO cG')
})
textareaError = function(elem){
    elem.focus();
    elem.closest('.textareaContainer').find('.textareaTitle').addClass('cR')
    elem.closest('.textareaContainer').find('.textareaIcon').addClass('cR')
}
