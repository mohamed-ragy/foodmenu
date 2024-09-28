let optionCardOnMove = false;
let optionCardOnMoveFrom;
let optionCardOnMoveTo;
let optionCardOnMoveInterval;

sortOptions = function(){
    let tempOptionFromSort = website.products.find(item=>item.name == window.history.state.product).product_options.find(item=>item.id == optionCardOnMoveFrom).sort;
    let tempOptionToSort = website.products.find(item=>item.name == window.history.state.product).product_options.find(item=>item.id == optionCardOnMoveTo).sort;
    if(tempOptionFromSort == tempOptionToSort){return;}

    website.products.find(item=>item.name == window.history.state.product).product_options.find(item=>item.id == optionCardOnMoveFrom).sort = tempOptionToSort;
    website.products.find(item=>item.name == window.history.state.product).product_options.find(item=>item.id == optionCardOnMoveTo).sort = tempOptionFromSort;

    website_temp.products.find(item=>item.name == window.history.state.product).product_options.find(item=>item.id == optionCardOnMoveFrom).sort = tempOptionToSort;
    website_temp.products.find(item=>item.name == window.history.state.product).product_options.find(item=>item.id == optionCardOnMoveTo).sort = tempOptionFromSort;

    drawPopupPage_manage_product_variants(window.history.state.product)

    $.ajax({
        url:'products',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            sortProductOptions:true,
            product_name:window.history.state.product,
            fromId:optionCardOnMoveFrom,
            toId:optionCardOnMoveTo,
            fromSort:tempOptionToSort,
            toSort:tempOptionFromSort,
        },success:function(r){
            if(r.sortOptionsStatus == 1){

            }else if(r.sortOptionsStatus == 0){
                website.products.find(item=>item.name == window.history.state.product).product_options.find(item=>item.id == optionCardOnMoveFrom).sort = tempOptionFromSort;
                website.products.find(item=>item.name == window.history.state.product).product_options.find(item=>item.id == optionCardOnMoveTo).sort = tempOptionToSort;

                website_temp.products.find(item=>item.name == window.history.state.product).product_options.find(item=>item.id == optionCardOnMoveFrom).sort = tempOptionFromSort;
                website_temp.products.find(item=>item.name == window.history.state.product).product_options.find(item=>item.id == optionCardOnMoveTo).sort = tempOptionToSort;
                drawPopupPage_manage_product_variants(window.history.state.product)
                showAlert('error',r.msg,4000,true);
            }
        }
    }).fail(function(){
        website.products.find(item=>item.name == window.history.state.product).product_options.find(item=>item.id == optionCardOnMoveFrom).sort = tempOptionFromSort;
        website.products.find(item=>item.name == window.history.state.product).product_options.find(item=>item.id == optionCardOnMoveTo).sort = tempOptionToSort;

        website_temp.products.find(item=>item.name == window.history.state.product).product_options.find(item=>item.id == optionCardOnMoveFrom).sort = tempOptionFromSort;
        website_temp.products.find(item=>item.name == window.history.state.product).product_options.find(item=>item.id == optionCardOnMoveTo).sort = tempOptionToSort;
        drawPopupPage_manage_product_variants(window.history.state.product)
        showAlert('error',r.msg,4000,true);
    })
}
$('body').on('mousedown touchstart','.optionCardMoveContainer',function(e){
    optionCardOnMove = true;
    optionCardOnMoveFrom = $(this).closest('.productOptionContainer').attr('option');
    $(this).closest('.productOptionContainer').addClass('optionCardSelectedOnMove');
    $('#onMove').removeClass().addClass('optionCardOnMove')
    $('#onMove').html($(this).closest('.productOptionContainer').html());
    $('#onMove').width($(this).closest('.productOptionContainer').width())
    if(!window.matchMedia("(pointer: coarse)").matches){
        $('#onMove').css({
            'top':e.pageY,
            'left':e.pageX,
        });
    }else{
        $('#onMove').css({
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
            $('#onMove').css({
                'top':e.pageY,
                'left':e.pageX,
            });
        }else{
            $('#onMove').css({
                'top':e.originalEvent.touches[0].pageY,
                'left':e.originalEvent.touches[0].pageX,
            });
        }
        let pageY; let pageX;
        $('.productOptionContainer').removeClass('optionCardHighlighted')
        if(!window.matchMedia("(pointer: coarse)").matches){
            pageY = e.pageY;
            pageX = e.pageX;
        }else{
            pageY = e.targetTouches[0].pageY;
            pageX = e.targetTouches[0].pageX;
        }
        $('.productOptionContainer').each(function(){
            if(
                $(this).offset().top < pageY && ($(this).offset().top + $(this).outerHeight() ) > pageY && $(this).offset().left < pageX && ($(this).offset().left + $(this).outerWidth() ) > pageX
            ){
                $(this).addClass('optionCardHighlighted')
            }
        })
        clearInterval(optionCardOnMoveInterval)
        optionCardOnMoveInterval = setInterval(function(){
            if(pageY < $('#popupPageBody').offset().top + 100 && $('#productOptionsContainer').offset().top < $('#popupPageBody').offset().top + 40){
                $('#popupPageBody').scrollTop($('#popupPageBody').scrollTop() - 5);
            }else if(pageY > $('#popupPageBody').offset().top + $('#popupPageBody').height() - 100 && $('#productOptionsContainer').offset().top + $('#productOptionsContainer').height() > $('#popupPageBody').offset().top + $('#popupPageBody').height() - 10){
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
        $('.productOptionContainer').each(function(){
            if(
                $(this).offset().top < pageY && ($(this).offset().top + $(this).outerHeight() ) > pageY && $(this).offset().left < pageX && ($(this).offset().left + $(this).outerWidth() ) > pageX
            ){
                optionCardOnMoveFrom = $('.optionCardSelectedOnMove').attr('option');
                optionCardOnMoveTo = $(this).attr('option');
                sortOptions();
            }
        })
        $('.productOptionContainer').removeClass('optionCardSelectedOnMove');
        $('#onMove').removeClass().html('').addClass('none');
        $('.productOptionContainer').removeClass('optionCardHighlighted');
        optionCardOnMove = false;
    }

});
