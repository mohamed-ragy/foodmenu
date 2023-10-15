
inputTextError = function(elem){
    elem.select();
    $('body,html').stop();
    $('body,html').animate({'scrollTop':elem.offset().top - 150},500)

    elem.closest('.inputTextContainer').find('.inputTextIcon').addClass('cR');
    elem.closest('.inputTextContainer').addClass('inputTextContainer_error')

    elem.closest('.inputListContainer').find('.inputListIcon').addClass('cR');
    elem.closest('.inputListContainer').addClass('inputTextContainer_error')
}

clearErrors = function(){
    $('#agree1Error').addClass('none')
    $('#agree2Error').addClass('none')
    $('#agree1Check').removeClass('cR')
    $('#agree2Check').removeClass('cR')


    $('.inputTextContainer').find('.inputTextIcon').removeClass('cR');
    $('.inputTextContainer').removeClass('inputTextContainer_error')
    $('.inputTxtError').addClass('vH').text('-');

    $('.inputListContainer').find('.inputListIcon').removeClass('cR');
    $('.inputListContainer').removeClass('inputTextContainer_error')

    $('.templatesContainer').parent().removeClass('templatesContainer_error')
    $('.plansCards').removeClass('plansCards_error')
    $('.langCardsContainer').removeClass('langCardsContainer_error')

}

addToInputList = function(list,text,key){
    if(list.children().first().hasClass('inputListElementLoading1')){
        list.text('');
    }
    list.append(
        $('<div/>',{
            text:text,
            key:key,
            class:'inputListElement taS'
        })
    )
}
$('html,body').on('click','.inputListElement',function(e){
    e.stopImmediatePropagation();
    $(this).closest('.inputListContainer').find('.inputList').val($(this).text()).attr('key',$(this).attr('key'));
    // $(this).closest('.inputListContainer').find('.inputListIcon').removeClass('cR cO cG');
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
    $(this).closest('.inputListContainer').addClass('inputListContainer_active')
    let thisInputList = $(this);
    // $(this).closest('.inputListContainer').find('.inputListIcon').addClass('cG').removeClass('cR cO');
    $(this).closest('.inputListContainer').find('.listContainer').show();
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
    // $(this).closest('.inputListContainer').find('.inputListIcon').removeClass('cR cO cG');
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

    // setTimeout(function(){
        let thisInputList = $(this);
        $(this).closest('.inputListContainer').find('.listContainer').children().removeClass('selectedinputListElement');
        $(this).closest('.inputListContainer').find('.inputList').attr('key','');

        $(this).parent().parent().find('.listContainer').children().each(function(){
            if($(this).text().match(RegExp(thisInputList.val(), 'i') )){
                $(this).css('display','flex');
            }else{
                $(this).css('display','none');
            }

        });
    // },200)

});
//////
$('html,body').on('click','.inputTextIcon',function(e){
    e.stopImmediatePropagation();
    $(this).parent().find('input').select();
});
$('html,body').on('focus','.inputText',function(e){
    e.stopImmediatePropagation();
    $(this).closest('.inputTextContainer').addClass('inputTextContainer_active');
    $(this).parent().find('.inputTextIcon').addClass('cG').removeClass('cR cO');
})
$('html,body').on('focusout','.inputText',function(e){
    e.stopImmediatePropagation();
    $(this).closest('.inputTextContainer').removeClass('inputTextContainer_active');
    $(this).parent().find('.inputTextIcon').removeClass('cR cO cG');
})

window.L = require("leaflet");
// require('./register/payment.js')
require('./register/step1.js')
require('./register/step2.js')
require('./register/step3.js')
require('./register/step4.js')



$(document).ready(function(){
    if(account == null || account == 'null'){
        // step2();
        step0();
    }else if(account.register == 0){
        step2();
    }else if(account.register == 1){
        step4();
    }
})

step0 = function(){
    $('.getStartedBtnContainer').removeClass('none')
    setTimeout(function(){
        $('.getStartedText').addClass('getStartedText_show');
        setTimeout(function(){
            $('.stepContainer[step="1"]').find('.stepIcon').addClass('stepIcon_show')
            $('.stepContainer[step="1"]').find('.stepTxt').addClass('stepTxt_Show')
            setTimeout(function(){
                $('.stepContainer[step="2"]').find('.stepIcon').addClass('stepIcon_show')
                $('.stepContainer[step="2"]').find('.stepTxt').addClass('stepTxt_Show')
                setTimeout(function(){
                    $('.stepContainer[step="3"]').find('.stepIcon').addClass('stepIcon_show')
                    $('.stepContainer[step="3"]').find('.stepTxt').addClass('stepTxt_Show')
                    // setTimeout(function(){
                    //     $('.stepContainer[step="4"]').find('.stepIcon').addClass('stepIcon_show')
                    //     $('.stepContainer[step="4"]').find('.stepTxt').addClass('stepTxt_Show')
                        setTimeout(function(){
                            $('.getStartedBtnContainer').removeClass('opacity0');
                        },350);
                    // },350)
                },350)
            },350)
        },800)
    },500);
}

$('#getStartedBtn').on('click',function(){
    step1();
})

$('.inputTextInfo').on('mouseenter',function(e){
    e.stopImmediatePropagation();
    $(this).children().first().removeClass('none')
})
$('.inputTextInfo').on('mouseleave',function(e){
    e.stopImmediatePropagation();
    $(this).children().first().addClass('none')
})

///////////
