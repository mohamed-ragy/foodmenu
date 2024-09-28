let selectionCardOnMove = false;
let selectionCardOnMoveFrom;
let selectionCardOnMoveTo;
let selectionCardOnMoveOption = null;

sortSelections = function(){
    let tempSelectionFromSort = website.products.find(item=>item.name == window.history.state.product).product_options.find(item=>item.id == selectionCardOnMoveOption).product_option_selections.find(item=>item.id == selectionCardOnMoveFrom).sort;
    let tempSelectionToSort = website.products.find(item=>item.name == window.history.state.product).product_options.find(item=>item.id == selectionCardOnMoveOption).product_option_selections.find(item=>item.id == selectionCardOnMoveTo).sort;
    if(tempSelectionFromSort == tempSelectionToSort){return;}
    website.products.find(item=>item.name == window.history.state.product).product_options.find(item=>item.id == selectionCardOnMoveOption).product_option_selections.find(item=>item.id == selectionCardOnMoveFrom).sort = tempSelectionToSort;
    website.products.find(item=>item.name == window.history.state.product).product_options.find(item=>item.id == selectionCardOnMoveOption).product_option_selections.find(item=>item.id == selectionCardOnMoveTo).sort = tempSelectionFromSort;
    website_temp.products.find(item=>item.name == window.history.state.product).product_options.find(item=>item.id == selectionCardOnMoveOption).product_option_selections.find(item=>item.id == selectionCardOnMoveFrom).sort = tempSelectionToSort;
    website_temp.products.find(item=>item.name == window.history.state.product).product_options.find(item=>item.id == selectionCardOnMoveOption).product_option_selections.find(item=>item.id == selectionCardOnMoveTo).sort = tempSelectionFromSort;
    drawPopupPage_manage_product_variants(window.history.state.product)
    $.ajax({
        url:'products',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            sortProductSelections:true,
            product_name:window.history.state.product,
            option_id:selectionCardOnMoveOption,
            fromId:selectionCardOnMoveFrom,
            toId:selectionCardOnMoveTo,
            fromSort:tempSelectionToSort,
            toSort:tempSelectionFromSort,
        },success:function(r){

            if(r.sortSelectionsStatus == 1){

            }else if(r.sortSelectionsStatus == 0){
                website.products.find(item=>item.name == window.history.state.product).product_options.find(item=>item.id == selectionCardOnMoveOption).product_option_selections.find(item=>item.id == selectionCardOnMoveFrom).sort = tempSelectionFromSort;
                website.products.find(item=>item.name == window.history.state.product).product_options.find(item=>item.id == selectionCardOnMoveOption).product_option_selections.find(item=>item.id == selectionCardOnMoveTo).sort = tempSelectionToSort;
                website_temp.products.find(item=>item.name == window.history.state.product).product_options.find(item=>item.id == selectionCardOnMoveOption).product_option_selections.find(item=>item.id == selectionCardOnMoveFrom).sort = tempSelectionFromSort;
                website_temp.products.find(item=>item.name == window.history.state.product).product_options.find(item=>item.id == selectionCardOnMoveOption).product_option_selections.find(item=>item.id == selectionCardOnMoveTo).sort = tempSelectionToSort;
                drawPopupPage_manage_product_variants(window.history.state.product)
                showAlert('error',r.msg,4000,true);
            }
        }
    }).fail(function(){
        website.products.find(item=>item.name == window.history.state.product).product_options.find(item=>item.id == selectionCardOnMoveOption).product_option_selections.find(item=>item.id == selectionCardOnMoveFrom).sort = tempSelectionFromSort;
        website.products.find(item=>item.name == window.history.state.product).product_options.find(item=>item.id == selectionCardOnMoveOption).product_option_selections.find(item=>item.id == selectionCardOnMoveTo).sort = tempSelectionToSort;
        website_temp.products.find(item=>item.name == window.history.state.product).product_options.find(item=>item.id == selectionCardOnMoveOption).product_option_selections.find(item=>item.id == selectionCardOnMoveFrom).sort = tempSelectionFromSort;
        website_temp.products.find(item=>item.name == window.history.state.product).product_options.find(item=>item.id == selectionCardOnMoveOption).product_option_selections.find(item=>item.id == selectionCardOnMoveTo).sort = tempSelectionToSort;
        drawPopupPage_manage_product_variants(window.history.state.product)
        showAlert('error',r.msg,4000,true);
    })
}

$('body').on('mousedown touchstart','.selectionCardMoveContainer',function(e){
    selectionCardOnMove = true;
    selectionCardOnMoveFrom = $(this).closest('.productOptionSelectionContainer').attr('selection');
    selectionCardOnMoveOption = $(this).closest('.productOptionContainer').attr('option')
    $(this).closest('.productOptionSelectionContainer').addClass('selectionCardSelectedOnMove');
    $('#onMove').removeClass().addClass('selectionCardOnMove')
    $('#onMove').html($(this).closest('.productOptionSelectionContainer').html());
    $('#onMove').width($(this).closest('.productOptionSelectionContainer').width())
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
    if(selectionCardOnMove){
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
        $('.productOptionSelectionContainer').removeClass('selectionCardHighlighted')
        if(!window.matchMedia("(pointer: coarse)").matches){
            pageY = e.pageY;
            pageX = e.pageX;
        }else{
            pageY = e.targetTouches[0].pageY;
            pageX = e.targetTouches[0].pageX;
        }
        $('.productOptionSelectionContainer').each(function(){
            if(
                $(this).offset().top < pageY &&
                ($(this).offset().top + $(this).outerHeight() ) > pageY &&
                $(this).offset().left < pageX &&
                ($(this).offset().left + $(this).outerWidth() ) > pageX &&
                $(this).closest('.productOptionContainer').attr('option') == selectionCardOnMoveOption
            ){
                $(this).addClass('selectionCardHighlighted')
            }
        })
    }
});
$('#popupPageBody').on('mouseup touchend',function(e){
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
        $('.productOptionSelectionContainer').each(function(){
            if(
                $(this).offset().top < pageY &&
                ($(this).offset().top + $(this).outerHeight() ) > pageY &&
                $(this).offset().left < pageX &&
                ($(this).offset().left + $(this).outerWidth() ) > pageX &&
                $(this).closest('.productOptionContainer').attr('option') == selectionCardOnMoveOption

            ){
                selectionCardOnMoveFrom = $('.selectionCardSelectedOnMove').attr('selection');
                selectionCardOnMoveTo = $(this).attr('selection');
                sortSelections();
            }
        })
        $('.productOptionSelectionContainer').removeClass('selectionCardSelectedOnMove');
        $('#onMove').removeClass().html('').addClass('none');
        $('.productOptionSelectionContainer').removeClass('selectionCardHighlighted');
        selectionCardOnMove = false;
    }

});
