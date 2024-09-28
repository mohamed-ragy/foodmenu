drawInputText = function(autoHelp,icon,iconFlag,tooltip,id,type,placeholder,maxlength,icon2,containerClass='',value='',readOnly=false,inputClass=''){
    let iconElem;let icon2Elem;
    if(iconFlag == ''){
        if(icon == ''){
            iconElem = $('<div/>',{class:'mie-3'});
        }else{
            iconElem = $('<div/>',{class:`inputTextIcon`,tooltip:tooltip}).append(
                $('<span/>',{class:icon})
            );
        }
    }else if(iconFlag == 'CLF'){
        iconElem = $('<div/>',{class:`inputTextIcon`,tooltip:tooltip}).append(
            $('<img/>',{class:'inputTextIconFlag customLangFlag'})
        );
    }else{
        iconElem = $('<div/>',{class:`inputTextIcon ${icon}`,tooltip:tooltip}).append(
            $('<img/>',{class:'inputTextIconFlag',src:`./storage/imgs/flags/${iconFlag}.png`})
        );
    }
    if(icon2 == 'clearVal'){
        icon2Elem = $('<div/>',{class:'inputText-clearVal ico-close fs08',tooltip:texts.cpanel.public.clear})
    }else if(icon2 == 'password'){
        icon2Elem = $('<div/>',{class:'inputText-showPassword ico-showPassword fs1 pX3',tooltip:texts.cpanel.public.showPassword})
    }else if(icon2 == 'copy'){
        icon2Elem = $('<div/>',{class:'inputText-copyVal ico-copy fs1',tooltip:texts.cpanel.public.copy})
    }
    return $('<div/>',{class:`inputTextContainer ${containerClass}`,autoHelp:autoHelp}).append(
        iconElem,
        $('<input/>',{class:`inputText ${inputClass}`,readOnly:readOnly,type:type,id:id,placeholder:placeholder,maxlength:maxlength,value:value,tooltip:tooltip}),
        icon2Elem,
    )
}
$('body').on('click','.inputTextIcon',function(e){
    $(this).parent().find('input').select();
});
$('body').on('focus','.inputText,.inputSearch',function(e){
    $(this).parent().addClass('inputTextContainer_active');
    $(this).parent().find('.inputTextIcon').addClass('cG').removeClass('cR cO');
})
$('body').on('focusout','.inputText,.inputSearch',function(e){
    $(this).parent().removeClass('inputTextContainer_active');
    $(this).parent().find('.inputTextIcon').removeClass('cR cO cG');
})
$('body').on('click','.inputText-copyVal',function(e){
    navigator.clipboard.writeText($(this).closest('.inputTextContainer').find('.inputText').val()).then(function(){
        showAlert('normal',texts.cpanel.public.valueCopied,4000,true);
    });
})
$('body').on('click','.inputText-showPassword',function(e){
    if($(this).hasClass('ico-showPassword')){
        $(this).removeClass('ico-showPassword').addClass('ico-hidePassword').attr('tooltip',texts.cpanel.public.hidePassword)
        $(this).closest('.inputTextContainer').find('.inputText').attr('type','text')
    }else if($(this).hasClass('ico-hidePassword')){
        $(this).removeClass('ico-hidePassword').addClass('ico-showPassword').attr('tooltip',texts.cpanel.public.showPassword)
        $(this).closest('.inputTextContainer').find('.inputText').attr('type','password')
    }
    try{
        updateToolTip();
    }catch{}
})
$('body').on('click','.inputText-clearVal',function(e){
    $(this).parent().find('input').val('').trigger('change')
});
$('body').on('input change','.inputText',function(e){
    $(this).closest('.inputTextContainer').find('.inputTextIcon').removeClass('cR')

})
inputTextError = function(elem){
    elem.focus();
    elem.closest('.inputTextContainer').find('.inputTextIcon').addClass('cR');
}
