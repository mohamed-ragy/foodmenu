let categoryOnMove = false;
let categoryOnMoveFrom;
let categoryOnMoveTo;
let categoryOnMoveInterval;

sortCategories = function(){
    let tempCatFromSort = categories.find(item=> item.id == categoryOnMoveFrom).sort;
    let tempCatToSort = categories.find(item=> item.id == categoryOnMoveTo).sort;
    if(tempCatFromSort == tempCatToSort){return;}
    $('.categoryCardSortLoading').removeClass('none').css('visibility','visible')
    $('.categoryCardMove').addClass('none')
    $.ajax({
        url:'categories',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            sortCategories:true,
            fromId:categoryOnMoveFrom,
            toId:categoryOnMoveTo,
            fromSort:tempCatToSort,
            toSort:tempCatFromSort,
        },success:function(r){
            $('.categoryCardSortLoading').addClass('none').css('visibility','hidden')
            $('.categoryCardMove').removeClass('none')
            if(r.sortCategoriesStatus == 1){
                categories.find(item=> item.id == categoryOnMoveFrom).sort = tempCatToSort;
                categories.find(item=> item.id == categoryOnMoveTo).sort = tempCatFromSort;
                categories.sort((a,b)=>{
                    return parseInt(a.sort) - parseInt(b.sort)
                })
                drawCategoryList();
            }else if(r.sortCategoriesStatus == 0){
                showAlert('error',r.msg,4000,true);
                drawCategoryList();
            }

        }
    })
}


$('#categoriesList-categoriesListContainer').on('mousedown touchstart','.categoryCardMove',function(e){
    e.stopImmediatePropagation();
    e.preventDefault();
    categoryOnMove = true;
    categoryOnMoveFrom = $(this).attr('categoryId');
    $(this).closest('.categoryCardContainer').addClass('categoryCardSelectedOnMove');
    $('#categoryCardOnMove').html($(this).closest('.categoryCardContainer').html());
    $('#categoryCardOnMove').width($(this).closest('.categoryCardContainer').width())
    $('#categoryCardOnMove').css('display','flex');
    if(!window.matchMedia("(pointer: coarse)").matches){
        $('#categoryCardOnMove').css({
            'top':e.pageY,
            'left':e.pageX,
        });
    }else{
        $('#categoryCardOnMove').css({
            'top':e.originalEvent.touches[0].pageY,
            'left':e.originalEvent.touches[0].pageX,
        });
    }
});
$('#bodyPage').on('mousemove touchmove',function(e){
    if(categoryOnMove){
        e.stopImmediatePropagation();
        e.preventDefault();
        if(!window.matchMedia("(pointer: coarse)").matches){
            $('#categoryCardOnMove').css({
                'top':e.pageY,
                'left':e.pageX,
            });
        }else{
            $('#categoryCardOnMove').css({
                'top':e.originalEvent.touches[0].pageY,
                'left':e.originalEvent.touches[0].pageX,
            });
        }
        let pageY; let pageX;
        $('.categoryCardContainer').removeClass('categoryCardHighlighted')
        if(!window.matchMedia("(pointer: coarse)").matches){
            pageY = e.pageY;
            pageX = e.pageX;
        }else{
            pageY = e.targetTouches[0].pageY;
            pageX = e.targetTouches[0].pageX;
        }
        $('.categoryCardContainer').each(function(){
            if(
                $(this).offset().top < pageY && ($(this).offset().top + $(this).outerHeight() ) > pageY && $(this).offset().left < pageX && ($(this).offset().left + $(this).outerWidth() ) > pageX
            ){
                $(this).addClass('categoryCardHighlighted')
            }
        })
        clearInterval(categoryOnMoveInterval)
        categoryOnMoveInterval = setInterval(function(){
            if(pageY < $('#bodyPage').offset().top + 100 && $('#categoriesList-categoriesListContainer').offset().top < $('#bodyPage').offset().top + 40){
                $('#bodyPage').scrollTop($('#bodyPage').scrollTop() - 5);
            }else if(pageY > $('#bodyPage').offset().top + $('#bodyPage').height() - 100 && $('#categoriesList-categoriesListContainer').offset().top + $('#categoriesList-categoriesListContainer').height() > $('#bodyPage').offset().top + $('#bodyPage').height() - 10){
                $('#bodyPage').scrollTop($('#bodyPage').scrollTop() + 5);
            }
        },10)
    }else{
        clearInterval(categoryOnMoveInterval)
    }

});
$('#bodyPage').on('mouseup touchend',function(e){
    clearInterval(categoryOnMoveInterval)
    if(categoryOnMove){
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
        $('.categoryCardContainer').each(function(){
            if(
                $(this).offset().top < pageY && ($(this).offset().top + $(this).outerHeight() ) > pageY && $(this).offset().left < pageX && ($(this).offset().left + $(this).outerWidth() ) > pageX
            ){
                categoryOnMoveFrom = $('.categoryCardSelectedOnMove').attr('categoryId');
                categoryOnMoveTo = $(this).attr('categoryId');
                sortCategories();
            }
        })
        $('.categoryCardContainer').removeClass('categoryCardSelectedOnMove');
        $('#categoryCardOnMove').hide();
        $('.categoryCardContainer').removeClass('categoryCardHighlighted');
        categoryOnMove = false;
    }

});
