let selectionCardOnMove = false;
let selectionCardOnMoveFrom;
let selectionCardOnMoveTo;
let selectionCardOnMoveInterval;

sortSelections = function(){
    let tempSelectionFromSort;
    let tempSelectionToSort;
    for(const key in website.products){
        for(const key2 in website.products[key].product_options){
            for(const key3 in website.products[key].product_options[key2].product_option_selections){
                if(website.products[key].product_options[key2].product_option_selections[key3].id == selectionCardOnMoveFrom){
                    tempSelectionFromSort = website.products[key].product_options[key2].product_option_selections[key3].sort;
                }
                if(website.products[key].product_options[key2].product_option_selections[key3].id == selectionCardOnMoveTo){
                    tempSelectionToSort = website.products[key].product_options[key2].product_option_selections[key3].sort;
                }
            }
        }
    }
    if(tempSelectionFromSort == tempSelectionToSort){return;}
    $('.selectionCardMoveLoading').removeClass('none').css('visibility','visible');
    $('.selectionCardMoveIcon').addClass('none');
    $.ajax({
        url:'products',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            sortProductSelections:true,
            fromId:selectionCardOnMoveFrom,
            toId:selectionCardOnMoveTo,
            fromSort:tempSelectionToSort,
            toSort:tempSelectionFromSort,
        },success:function(r){
            $('.selectionCardMoveLoading').addClass('none').css('visibility','hidden');
            $('.selectionCardMoveIcon').removeClass('none');
            if(r.sortSelectionsStatus == 1){
                for(const key in website.products){
                    for(const key2 in website.products[key].product_options){
                        for(const key3 in website.products[key].product_options[key2].product_option_selections){
                            if(website.products[key].product_options[key2].product_option_selections[key3].id == selectionCardOnMoveFrom){
                                website.products[key].product_options[key2].product_option_selections[key3].sort = tempSelectionToSort;
                                if($('#editOption-createNewSelection').attr('productId') == website.products[key].id && $('#editOption-createNewSelection').attr('optionId') == website.products[key].product_options[key2].id){
                                    setManageSelections(website.products[key].id,website.products[key].product_options[key2].id)
                                }
                            }
                            if(website.products[key].product_options[key2].product_option_selections[key3].id == selectionCardOnMoveTo){
                                website.products[key].product_options[key2].product_option_selections[key3].sort = tempSelectionFromSort;
                                if($('#editOption-createNewSelection').attr('productId') == website.products[key].id && $('#editOption-createNewSelection').attr('optionId') == website.products[key].product_options[key2].id){
                                    setManageSelections(website.products[key].id,website.products[key].product_options[key2].id)
                                }
                            }
                        }
                    }
                }
            }else if(r.sortSelectionsStatus == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })
}
// setTimeout(function(){
//     selectionCardOnMoveFrom = 826;
//     selectionCardOnMoveTo = 827;
//     sortSelections()
// },5000)
$('#editOption-optionSelectionsContainer').on('mousedown touchstart','.selectionCardMoveIcon',function(e){
    e.stopImmediatePropagation();
    selectionCardOnMove = true;
    selectionCardOnMoveFrom = $(this).attr('selectionId');
    $(this).closest('.selectionCardContainer').addClass('selectionCardSelectedOnMove');
    $('#selectionCardOnMove').html($(this).closest('.selectionCardContainer').html());
    $('#selectionCardOnMove').width($(this).closest('.selectionCardContainer').width())
    $('#selectionCardOnMove').css('display','flex');
    if(!window.matchMedia("(pointer: coarse)").matches){
        $('#selectionCardOnMove').css({
            'top':e.pageY,
            'left':e.pageX,
        });
    }else{
        $('#selectionCardOnMove').css({
            'top':e.originalEvent.touches[0].pageY,
            'left':e.originalEvent.touches[0].pageX,
        });
    }
});
$('#popupPageBody').on('mousemove touchmove',function(e){
    if(selectionCardOnMove){
        e.stopImmediatePropagation();
        e.preventDefault();
        if(!window.matchMedia("(pointer: coarse)").matches){
            $('#selectionCardOnMove').css({
                'top':e.pageY,
                'left':e.pageX,
            });
        }else{
            $('#selectionCardOnMove').css({
                'top':e.originalEvent.touches[0].pageY,
                'left':e.originalEvent.touches[0].pageX,
            });
        }
        let pageY; let pageX;
        $('.selectionCardContainer').removeClass('selectionCardHighlighted')
        if(!window.matchMedia("(pointer: coarse)").matches){
            pageY = e.pageY;
            pageX = e.pageX;
        }else{
            pageY = e.targetTouches[0].pageY;
            pageX = e.targetTouches[0].pageX;
        }
        $('.selectionCardContainer').each(function(){
            if(
                $(this).offset().top < pageY && ($(this).offset().top + $(this).outerHeight() ) > pageY && $(this).offset().left < pageX && ($(this).offset().left + $(this).outerWidth() ) > pageX
            ){
                $(this).addClass('selectionCardHighlighted')
            }
        })
        clearInterval(selectionCardOnMoveInterval)
        selectionCardOnMoveInterval = setInterval(function(){
            if(pageY < $('#popupPageBody').offset().top + 100 && $('#editOption-optionSelectionsContainer').offset().top < $('#popupPageBody').offset().top + 40){
                $('#popupPageBody').scrollTop($('#popupPageBody').scrollTop() - 5);
            }else if(pageY > $('#popupPageBody').offset().top + $('#popupPageBody').height() - 100 && $('#editOption-optionSelectionsContainer').offset().top + $('#editOption-optionSelectionsContainer').height() > $('#popupPageBody').offset().top + $('#popupPageBody').height() - 10){
                $('#popupPageBody').scrollTop($('#popupPageBody').scrollTop() + 5);
            }
        },10)
    }else{
        clearInterval(selectionCardOnMoveInterval)
    }

});
$('#popupPageBody').on('mouseup touchend',function(e){
    clearInterval(selectionCardOnMoveInterval)
    if(selectionCardOnMove){
        e.stopImmediatePropagation();
        e.preventDefault();
        let pageY; let pageX;
        if(!window.matchMedia("(pointer: coarse)").matches){
            pageY = e.pageY;
            pageX = e.pageX;
        }else{
            pageY = e.changedTouches[0].pageY;
            pageX = e.changedTouches[0].pageX;
        }
        $('.selectionCardContainer').each(function(){
            if(
                $(this).offset().top < pageY && ($(this).offset().top + $(this).outerHeight() ) > pageY && $(this).offset().left < pageX && ($(this).offset().left + $(this).outerWidth() ) > pageX
            ){
                selectionCardOnMoveFrom = $('.selectionCardSelectedOnMove').attr('selectionId');
                selectionCardOnMoveTo = $(this).attr('selectionId');
                sortSelections();
            }
        })
        $('.selectionCardContainer').removeClass('selectionCardSelectedOnMove');
        $('#selectionCardOnMove').hide();
        $('.selectionCardContainer').removeClass('selectionCardHighlighted');
        selectionCardOnMove = false;
    }

});
