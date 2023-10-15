let optionCardOnMove = false;
let optionCardOnMoveFrom;
let optionCardOnMoveTo;
let optionCardOnMoveInterval;

sortOptions = function(){
    let tempOptionFromSort;
    let tempOptionToSort;
    for(const key in products){
        for(const key2 in products[key].product_options){
            if(products[key].product_options[key2].id == optionCardOnMoveFrom){
                tempOptionFromSort = products[key].product_options[key2].sort;
            }
            if(products[key].product_options[key2].id == optionCardOnMoveTo){
                tempOptionToSort = products[key].product_options[key2].sort;
            }
        }
    }
    if(tempOptionFromSort == tempOptionToSort){return;}
    $('.productOptionMoveLoading').removeClass('none').css('visibility','visible');
    $('.productOptionCardMoveIcon').addClass('none');
    $.ajax({
        url:'products',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            sortProductOptions:true,
            fromId:optionCardOnMoveFrom,
            toId:optionCardOnMoveTo,
            fromSort:tempOptionToSort,
            toSort:tempOptionFromSort,
        },success:function(r){
            $('.productOptionMoveLoading').addClass('none').css('visibility','hidden');
            $('.productOptionCardMoveIcon').removeClass('none');
            if(r.sortOptionsStatus == 1){
                for(const key in products){
                    for(const key2 in products[key].product_options){
                        if(products[key].product_options[key2].id == optionCardOnMoveFrom){
                            products[key].product_options[key2].sort = tempOptionToSort;
                            if(window.history.state.popupPage == 'Product-Options' && window.history.state.editProductOptions == products[key].name){
                                setEditProductOptions(products[key].name)
                            }
                        }
                        if(products[key].product_options[key2].id == optionCardOnMoveTo){
                            products[key].product_options[key2].sort = tempOptionFromSort;
                            if(window.history.state.popupPage == 'Product-Options' && window.history.state.editProductOptions == products[key].name){
                                setEditProductOptions(products[key].name)
                            }
                        }

                    }
                }
            }else if(r.sortOptionsStatus == 0){
                showAlert('error',r.msg,4000,true);
            }
        }
    })
}
$('#editProductOptions-optionsContainer').on('mousedown touchstart','.productOptionCardMoveIcon',function(e){
    e.stopImmediatePropagation();
    optionCardOnMove = true;
    optionCardOnMoveFrom = $(this).attr('optionId');
    $(this).closest('.productOptionCardContainer').addClass('productOptionCardSelectedOnMove');
    $('#productOptionCardOnMove').html($(this).closest('.productOptionCardContainer').html());
    $('#productOptionCardOnMove').width($(this).closest('.productOptionCardContainer').width())
    $('#productOptionCardOnMove').css('display','flex');
    if(!window.matchMedia("(pointer: coarse)").matches){
        $('#productOptionCardOnMove').css({
            'top':e.pageY,
            'left':e.pageX,
        });
    }else{
        $('#productOptionCardOnMove').css({
            'top':e.originalEvent.touches[0].pageY,
            'left':e.originalEvent.touches[0].pageX,
        });
    }
});
$('#popupPageBody').on('mousemove touchmove',function(e){
    if(optionCardOnMove){
        e.stopImmediatePropagation();
        e.preventDefault();
        if(!window.matchMedia("(pointer: coarse)").matches){
            $('#productOptionCardOnMove').css({
                'top':e.pageY,
                'left':e.pageX,
            });
        }else{
            $('#productOptionCardOnMove').css({
                'top':e.originalEvent.touches[0].pageY,
                'left':e.originalEvent.touches[0].pageX,
            });
        }
        let pageY; let pageX;
        $('.productOptionCardContainer').removeClass('productOptionCardHighlighted')
        if(!window.matchMedia("(pointer: coarse)").matches){
            pageY = e.pageY;
            pageX = e.pageX;
        }else{
            pageY = e.targetTouches[0].pageY;
            pageX = e.targetTouches[0].pageX;
        }
        $('.productOptionCardContainer').each(function(){
            if(
                $(this).offset().top < pageY && ($(this).offset().top + $(this).outerHeight() ) > pageY && $(this).offset().left < pageX && ($(this).offset().left + $(this).outerWidth() ) > pageX
            ){
                $(this).addClass('productOptionCardHighlighted')
            }
        })
        clearInterval(optionCardOnMoveInterval)
        optionCardOnMoveInterval = setInterval(function(){
            if(pageY < $('#popupPageBody').offset().top + 100 && $('#editProductOptions-optionsContainer').offset().top < $('#popupPageBody').offset().top + 40){
                $('#popupPageBody').scrollTop($('#popupPageBody').scrollTop() - 5);
            }else if(pageY > $('#popupPageBody').offset().top + $('#popupPageBody').height() - 100 && $('#editProductOptions-optionsContainer').offset().top + $('#editProductOptions-optionsContainer').height() > $('#popupPageBody').offset().top + $('#popupPageBody').height() - 10){
                $('#popupPageBody').scrollTop($('#popupPageBody').scrollTop() + 5);
            }
        },10)
    }else{
        clearInterval(optionCardOnMoveInterval)
    }

});
$('#popupPageBody').on('mouseup touchend',function(e){
    clearInterval(optionCardOnMoveInterval)
    if(optionCardOnMove){
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
        $('.productOptionCardContainer').each(function(){
            if(
                $(this).offset().top < pageY && ($(this).offset().top + $(this).outerHeight() ) > pageY && $(this).offset().left < pageX && ($(this).offset().left + $(this).outerWidth() ) > pageX
            ){
                optionCardOnMoveFrom = $('.productOptionCardSelectedOnMove').attr('optionId');
                optionCardOnMoveTo = $(this).attr('optionId');
                sortOptions();
            }
        })
        $('.productOptionCardContainer').removeClass('productOptionCardSelectedOnMove');
        $('#productOptionCardOnMove').hide();
        $('.productOptionCardContainer').removeClass('productOptionCardHighlighted');
        optionCardOnMove = false;
    }

});
