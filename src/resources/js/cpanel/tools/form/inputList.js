drawInputList = function(autoHelp,icon,iconFlag,tooltip,id,placeholder,maxlength,listId,listLoading,containerClass='',listClass='',inputClass=''){
    let iconElem; let listContainer = $('<div/>',{class:'listContainer',id:listId});
    if(iconFlag == ''){
        iconElem = $('<div/>',{class:`inputListIcon`}).append(
            $('<span/>',{class:icon}),
            $('<div/>',{class:`inputList_unsaved none ${id}-unsaved`})

        );
    }else{
        iconElem = $('<div/>',{class:`inputListIcon`}).append(
            $('<img/>',{class:'inputTextIconFlag',src:`./storage/imgs/flags/${iconFlag}.png`,alt:''}),
            $('<div/>',{class:`inputList_unsaved none ${id}-unsaved`})
        );
    }
    if(listLoading){
        listContainer = $('<div/>',{class:`listContainer ${listClass}`,id:listId}).append(
            $('<div/>',{class:'inputListElementLoading1'}),
            $('<div/>',{class:'inputListElementLoading2'}),
            $('<div/>',{class:'inputListElementLoading1'}),
            $('<div/>',{class:'inputListElementLoading2'}),
            $('<div/>',{class:'inputListElementLoading1'}),
            $('<div/>',{class:'inputListElementLoading2'}),
            $('<div/>',{class:'inputListElementLoading1'}),
            $('<div/>',{class:'inputListElementLoading2'}),
        )
    }
    return $('<div/>',{class:'inputListContainer '+containerClass,autoHelp:autoHelp}).append(
        iconElem,
        $('<input/>',{id:id,key:'',class:`inputList ${inputClass}`,tooltip:tooltip,type:'text',placeholder:placeholder,maxlength:maxlength}),
        $('<div/>',{class:'inputListDownIcon ico-down mis-5'}),
        listContainer,
    )
}
$('html,body').on('click','.inputListElement',function(e){
    e.stopImmediatePropagation();
    $(this).closest('.inputListContainer').find('.inputList').val($(this).text()).attr('key',$(this).attr('key'));
    $(this).closest('.inputListContainer').find('.inputListIcon').removeClass('cR cO cG');
    $(this).closest('.inputListContainer').find('.listContainer').hide();
    $(this).closest('.inputListContainer').find('.inputListElement').css('display','flex');
    $(this).closest('.inputListContainer').find('.inputListElement').removeClass('selectedinputListElement')
    $(this).addClass('selectedinputListElement');

})

$('html,body').on('click','.inputListIcon, .inputListDownIcon',function(e){
    e.stopImmediatePropagation()
    $(this).closest('.inputListContainer').find('.inputList').select();
});
$('html,body').on('focus','.inputList',function(e){
    e.stopImmediatePropagation();
    let thisInputList = $(this);
    $(this).closest('.inputListContainer').addClass('inputListContainer_active')
    $(this).closest('.inputListContainer').find('.inputListIcon').addClass('cG').removeClass('cR cO');
    $(this).closest('.inputListContainer').find('.listContainer').show();
    thisInputList.closest('.inputListContainer').find('.inputListElement').css('display','flex');
    $(this).closest('.inputListContainer').find('.listContainer').children().each(function(){
        if($(this).attr('key') == thisInputList.attr('key')){
            thisInputList.closest('.inputListContainer').find('.listContainer').animate({'scrollTop': $(this).offset().top - $(this).parent().offset().top + $(this).parent().scrollTop()},200)
            thisInputList.closest('.inputListContainer').find('.inputListElement').removeClass('selectedinputListElement').css('display','flex');
            $(this).addClass('selectedinputListElement');
        }
    })
})
$('html,body').on('focusout','.inputList',function(e){
    e.stopImmediatePropagation();
    $(this).closest('.inputListContainer').removeClass('inputListContainer_active')
    if($(this).parent().find('.listContainer:hover').length > 0){return;}
    let inputlistValCheck = false;
    let thisInputList = $(this);
    $(this).closest('.inputListContainer').find('.listContainer').children().each(function(){
        if($(this).attr('key') == thisInputList.attr('key') && $(this).text() == thisInputList.val()){
            inputlistValCheck = true;
        }
    });
    if(inputlistValCheck == false){
        thisInputList.val('').attr('key','')
    }
    $(this).closest('.inputListContainer').find('.inputListIcon').removeClass('cR cO cG');
    $(this).closest('.inputListContainer').find('.listContainer').hide();
    $(this).closest('.inputListContainer').find('.inputListElement').css('display','flex');
});

$('html,body').on('keydown','.inputList',function(e){
    e.stopImmediatePropagation();
    let thisListElem;
    if(e.which == 40){
        $(this).closest('.inputListContainer').find('.listContainer').css('display','block');
        e.preventDefault();
        if($(this).closest('.inputListContainer').find('.selectedinputListElement').length == 0){
            thisListElem = $(this).closest('.inputListContainer').find('.listContainer').children(':visible').first();
            thisListElem.closest('.inputListContainer').find('.inputList').val(thisListElem.text()).attr('key',thisListElem.attr('key'));
            thisListElem.closest('.inputListContainer').find('.inputListElement').removeClass('selectedinputListElement')
            thisListElem.addClass('selectedinputListElement');
            thisListElem.parent().stop().animate({'scrollTop':0},200)
            return;
        }else if($(this).closest('.inputListContainer').find('.listContainer').children(':visible').last().hasClass('selectedinputListElement')){
            thisListElem = $(this).closest('.inputListContainer').find('.listContainer').children(':visible').first();
            thisListElem.closest('.inputListContainer').find('.inputList').val(thisListElem.text()).attr('key',thisListElem.attr('key'));
            thisListElem.closest('.inputListContainer').find('.inputListElement').removeClass('selectedinputListElement')
            thisListElem.addClass('selectedinputListElement');
            thisListElem.parent().stop().animate({'scrollTop':0},200)
            return;
        }
        thisListElem = $(this).closest('.inputListContainer').find('.listContainer').find('.selectedinputListElement').nextAll(':visible').first();
        thisListElem.closest('.inputListContainer').find('.inputList').val(thisListElem.text()).attr('key',thisListElem.attr('key'));
        thisListElem.closest('.inputListContainer').find('.inputListElement').removeClass('selectedinputListElement')
        thisListElem.addClass('selectedinputListElement');

        if(thisListElem.offset().top + $(this).height() > thisListElem.parent().offset().top + thisListElem.parent().height()){
            thisListElem.parent().stop().animate({'scrollTop': thisListElem.offset().top - thisListElem.parent().offset().top + thisListElem.parent().scrollTop() - thisListElem.parent().height() + thisListElem.outerHeight()},200)
        }
    }else if(e.which == 38){
        $(this).closest('.inputListContainer').find('.listContainer').css('display','block');
        e.preventDefault();
        if($(this).closest('.inputListContainer').find('.listContainer').find('.selectedinputListElement').length == 0){
            thisListElem = $(this).closest('.inputListContainer').find('.listContainer').children(':visible').last();
            thisListElem.closest('.inputListContainer').find('.inputList').val(thisListElem.text()).attr('key',thisListElem.attr('key'));
            thisListElem.closest('.inputListContainer').find('.inputListElement').removeClass('selectedinputListElement')
            thisListElem.addClass('selectedinputListElement');
            thisListElem.parent().stop().animate({'scrollTop':thisListElem.parent().offset().top + thisListElem.parent()[0].scrollHeight},200)
            return;
        }else if($(this).closest('.inputListContainer').find('.listContainer').children(':visible').first().hasClass('selectedinputListElement')){
            thisListElem = $(this).closest('.inputListContainer').find('.listContainer').children(':visible').last();
            thisListElem.closest('.inputListContainer').find('.inputList').val(thisListElem.text()).attr('key',thisListElem.attr('key'));
            thisListElem.closest('.inputListContainer').find('.inputListElement').removeClass('selectedinputListElement')
            thisListElem.addClass('selectedinputListElement');
            thisListElem.parent().stop().animate({'scrollTop':thisListElem.parent().offset().top + thisListElem.parent()[0].scrollHeight},200)
            return;
        }
        thisListElem = $(this).closest('.inputListContainer').find('.listContainer').find('.selectedinputListElement').prevAll(':visible').first();
        thisListElem.closest('.inputListContainer').find('.inputList').val(thisListElem.text()).attr('key',thisListElem.attr('key'));
        thisListElem.closest('.inputListContainer').find('.inputListElement').removeClass('selectedinputListElement')
        thisListElem.addClass('selectedinputListElement');

        if(thisListElem.offset().top + $(this).height() < thisListElem.parent().offset().top){
            thisListElem.parent().stop().animate({'scrollTop': thisListElem.offset().top - thisListElem.parent().offset().top + thisListElem.parent().scrollTop() },200)
        }
    }else if(e.which == 27){
        $(this).closest('.inputListContainer').find('.inputListElement').css('display','flex');
    }else if(e.which == 13){
        $(this).closest('.inputListContainer').find('.listContainer').children().each(function(){
            if($(this).hasClass('selectedinputListElement')){
                $(this).closest('.inputListContainer').find('.inputList').val($(this).text()).attr('key',$(this).attr('key'))
                $(this).trigger('click');
                $(this).closest('.inputListContainer').find('.listContainer').hide();
            }
        })
    }

})

$('html,body').on('input','.inputList',function(e){
    // e.stopImmediatePropagation();
    let thisInputList = $(this);
    thisInputList.closest('.inputListContainer').find('.listContainer').children().removeClass('selectedinputListElement');
    thisInputList.closest('.inputListContainer').find('.inputList').attr('key','');

    thisInputList.parent().parent().find('.listContainer').children().each(function(){
        if($(this).text().match(RegExp(thisInputList.val(), 'i') )){
            $(this).css('display','flex');
        }else{
            $(this).css('display','none');
        }

    });
});


inputListError = function(elem){
    elem.focus();
    elem.closest('.inputListContainer').find('.inputListIcon').addClass('cR')
}

