let productCardOnMove = false;
let productCardOnMoveFrom;
let productCardOnMoveTo;
let productCardOnMoveInterval;

sortProducts = function(){
    let tempProductFromSort = website.products.find(item=> item.id == productCardOnMoveFrom).sort;
    let tempProductToSort = website.products.find(item=> item.id == productCardOnMoveTo).sort;
    if(tempProductFromSort == tempProductToSort){return;}
    website.products.find(item=> item.id == productCardOnMoveFrom).sort = tempProductToSort;
    website.products.find(item=> item.id == productCardOnMoveTo).sort = tempProductFromSort;
    website.products.sort((a,b)=>{
        return parseInt(a.sort) - parseInt(b.sort)
    })
    website_temp.products.find(item=> item.id == productCardOnMoveFrom).sort = tempProductToSort;
    website_temp.products.find(item=> item.id == productCardOnMoveTo).sort = tempProductFromSort;
    website_temp.products.sort((a,b)=>{
        return parseInt(a.sort) - parseInt(b.sort)
    })
    if($('#manageProducts-selectCategory').attr('key') != null){
        drawManageProductCards($('#manageProducts-selectCategory').attr('key'))
    }
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
            if(r.sortProductsStatus == 1){

            }else if(r.sortProductsStatus == 0){
                showAlert('error',r.msg,4000,true);
                website.products.find(item=> item.id == productCardOnMoveFrom).sort = tempProductFromSort;
                website.products.find(item=> item.id == productCardOnMoveTo).sort = tempProductToSort;
                website.products.sort((a,b)=>{
                    return parseInt(a.sort) - parseInt(b.sort)
                })
                website_temp.products.find(item=> item.id == productCardOnMoveFrom).sort = tempProductFromSort;
                website_temp.products.find(item=> item.id == productCardOnMoveTo).sort = tempProductToSort;
                website_temp.products.sort((a,b)=>{
                    return parseInt(a.sort) - parseInt(b.sort)
                })
                if($('#manageProducts-selectCategory').attr('key') != null){
                    drawManageProductCards($('#manageProducts-selectCategory').attr('key'))
                }
            }
        }
    }).fail(function(){
        showAlert('error',r.msg,4000,true);
        website.products.find(item=> item.id == productCardOnMoveFrom).sort = tempProductFromSort;
        website.products.find(item=> item.id == productCardOnMoveTo).sort = tempProductToSort;
        website.products.sort((a,b)=>{
            return parseInt(a.sort) - parseInt(b.sort)
        })
        website_temp.products.find(item=> item.id == productCardOnMoveFrom).sort = tempProductFromSort;
        website_temp.products.find(item=> item.id == productCardOnMoveTo).sort = tempProductToSort;
        website_temp.products.sort((a,b)=>{
            return parseInt(a.sort) - parseInt(b.sort)
        })
        if($('#manageProducts-selectCategory').attr('key') != null){
            drawManageProductCards($('#manageProducts-selectCategory').attr('key'))
        }
    })
}


$('body').on('mousedown touchstart','.manageProductCardMove',function(e){
    e.preventDefault();
    productCardOnMove = true;
    productCardOnMoveFrom = $(this).closest('.manageProductCardContainer').attr('product');
    $(this).closest('.manageProductCardContainer').addClass('manageProductCardSelectedOnMove');
    $('#onMove').removeClass().addClass('manageProductCardOnMove')
    $('#onMove').html($(this).closest('.manageProductCardContainer').html());
    $('#onMove').width($(this).closest('.manageProductCardContainer').width())
    $('#onMove').css('display','flex');
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

$('#bodyPage').on('mousemove touchmove',function(e){
    if(productCardOnMove){
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
            if(pageY < $('#bodyPage').offset().top + 100 && $('.productsListContainer').offset().top < $('#bodyPage').offset().top + 40){
                $('#bodyPage').scrollTop($('#bodyPage').scrollTop() - 5);
            }else if(pageY > $('#bodyPage').offset().top + $('#bodyPage').height() - 100 && $('.productsListContainer').offset().top + $('.productsListContainer').height() > $('#bodyPage').offset().top + $('#bodyPage').height() - 10){
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
                productCardOnMoveFrom = $('.manageProductCardSelectedOnMove').attr('product');
                productCardOnMoveTo = $(this).attr('product');
                console.log(productCardOnMoveFrom)
                sortProducts();
            }
        })
        $('.manageProductCardContainer').removeClass('manageProductCardSelectedOnMove');
        $('#onMove').removeClass().html('').addClass('none');
        $('.manageProductCardContainer').removeClass('manageProductCardHighlighted');
        productCardOnMove = false;
    }

});
