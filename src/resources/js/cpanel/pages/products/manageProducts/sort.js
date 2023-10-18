let productCardOnMove = false;
let productCardOnMoveFrom;
let productCardOnMoveTo;
let productCardOnMoveInterval;

sortProducts = function(){
    let tempProductFromSort = website.products.find(item=> item.id == productCardOnMoveFrom).sort;
    let tempProductToSort = website.products.find(item=> item.id == productCardOnMoveTo).sort;
    if(tempProductFromSort == tempProductToSort){return;}
    $('.manageProductCardSortLoading').removeClass('none').css('visibility','visible');
    $('.manageProductCardMove').addClass('none');
    $.ajax({
        url:'products',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            sortProducts:true,
            fromId:productCardOnMoveFrom,
            toId:productCardOnMoveTo,
            fromSort:tempProductToSort,
            toSort:tempProductFromSort,
        },success:function(r){
            $('.manageProductCardSortLoading').addClass('none').css('visibility','hidden');
            $('.manageProductCardMove').removeClass('none');
            if(r.sortProductsStatus == 1){
                website.products.find(item=> item.id == productCardOnMoveFrom).sort = tempProductToSort;
                website.products.find(item=> item.id == productCardOnMoveTo).sort = tempProductFromSort;
                if($('#manageProducts-selectCategory').attr('key') != null){
                    drawManageProductCards($('#manageProducts-selectCategory').attr('key'))
                }
            }else if(r.sortProductsStatus == 0){
                showAlert('error',r.msg,4000,true);
                if($('#manageProducts-selectCategory').attr('key') != null){
                    drawManageProductCards($('#manageProducts-selectCategory').attr('key'))
                }
            }
        }
    })
}


$('#manageProducts-manageProductsContainer').on('mousedown touchstart','.manageProductCardMove',function(e){
    e.stopImmediatePropagation();
    productCardOnMove = true;
    productCardOnMoveFrom = $(this).attr('productId');
    $(this).closest('.manageProductCardContainer').addClass('manageProductCardSelectedOnMove');
    $('#manageProductCardOnMove').html($(this).closest('.manageProductCardContainer').html());
    $('#manageProductCardOnMove').width($(this).closest('.manageProductCardContainer').width())
    $('#manageProductCardOnMove').css('display','flex');
    if(!window.matchMedia("(pointer: coarse)").matches){
        $('#manageProductCardOnMove').css({
            'top':e.pageY,
            'left':e.pageX,
        });
    }else{
        $('#manageProductCardOnMove').css({
            'top':e.originalEvent.touches[0].pageY,
            'left':e.originalEvent.touches[0].pageX,
        });
    }
});

$('#bodyPage').on('mousemove touchmove',function(e){
    if(productCardOnMove){
        e.stopImmediatePropagation();
        e.preventDefault();
        if(!window.matchMedia("(pointer: coarse)").matches){
            $('#manageProductCardOnMove').css({
                'top':e.pageY,
                'left':e.pageX,
            });
        }else{
            $('#manageProductCardOnMove').css({
                'top':e.originalEvent.touches[0].pageY,
                'left':e.originalEvent.touches[0].pageX,
            });
        }
        let pageY; let pageX;
        $('.manageProductCardContainer').removeClass('manageProductCardHighlighted')
        if(!window.matchMedia("(pointer: coarse)").matches){
            pageY = e.pageY;
            pageX = e.pageX;
        }else{
            pageY = e.targetTouches[0].pageY;
            pageX = e.targetTouches[0].pageX;
        }
        $('.manageProductCardContainer').each(function(){
            if(
                $(this).offset().top < pageY && ($(this).offset().top + $(this).outerHeight() ) > pageY && $(this).offset().left < pageX && ($(this).offset().left + $(this).outerWidth() ) > pageX
            ){
                $(this).addClass('manageProductCardHighlighted')
            }
        })
        clearInterval(productCardOnMoveInterval)
        productCardOnMoveInterval = setInterval(function(){
            if(pageY < $('#bodyPage').offset().top + 100 && $('#manageProducts-manageProductsContainer').offset().top < $('#bodyPage').offset().top + 40){
                $('#bodyPage').scrollTop($('#bodyPage').scrollTop() - 5);
            }else if(pageY > $('#bodyPage').offset().top + $('#bodyPage').height() - 100 && $('#manageProducts-manageProductsContainer').offset().top + $('#manageProducts-manageProductsContainer').height() > $('#bodyPage').offset().top + $('#bodyPage').height() - 10){
                $('#bodyPage').scrollTop($('#bodyPage').scrollTop() + 5);
            }
        },10)
    }else{
        clearInterval(productCardOnMoveInterval)
    }

});
$('#bodyPage').on('mouseup touchend',function(e){
    clearInterval(productCardOnMoveInterval)
    if(productCardOnMove){
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
        $('.manageProductCardContainer').each(function(){
            if(
                $(this).offset().top < pageY && ($(this).offset().top + $(this).outerHeight() ) > pageY && $(this).offset().left < pageX && ($(this).offset().left + $(this).outerWidth() ) > pageX
            ){
                productCardOnMoveFrom = $('.manageProductCardSelectedOnMove').attr('productId');
                productCardOnMoveTo = $(this).attr('productId');
                sortProducts();
            }
        })
        $('.manageProductCardContainer').removeClass('manageProductCardSelectedOnMove');
        $('#manageProductCardOnMove').hide();
        $('.manageProductCardContainer').removeClass('manageProductCardHighlighted');
        productCardOnMove = false;
    }

});
