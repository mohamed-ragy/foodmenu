let categoryOnMove = false;
let categoryOnMoveFrom;
let categoryOnMoveTo;
let categoryOnMoveInterval;

sortCategories = function(){
    let tempCatFromSort = website.categories.find(item=> item.id == categoryOnMoveFrom).sort;
    let tempCatToSort = website.categories.find(item=> item.id == categoryOnMoveTo).sort;
    if(tempCatFromSort == tempCatToSort){return;}
    website.categories.find(item=> item.id == categoryOnMoveFrom).sort = tempCatToSort;
    website.categories.find(item=> item.id == categoryOnMoveTo).sort = tempCatFromSort;
    website.categories.sort((a,b)=>{
        return parseInt(a.sort) - parseInt(b.sort)
    })
    website_temp.categories.find(item=> item.id == categoryOnMoveFrom).sort = tempCatToSort;
    website_temp.categories.find(item=> item.id == categoryOnMoveTo).sort = tempCatFromSort;
    website_temp.categories.sort((a,b)=>{
        return parseInt(a.sort) - parseInt(b.sort)
    })
    drawCategoryList();
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
            if(r.sortCategoriesStatus == 1){

            }else if(r.sortCategoriesStatus == 0){
                showAlert('error',r.msg,4000,true);
                website.categories.find(item=> item.id == categoryOnMoveFrom).sort = tempCatFromSort;
                website.categories.find(item=> item.id == categoryOnMoveTo).sort = tempCatToSort;
                website.categories.sort((a,b)=>{
                    return parseInt(a.sort) - parseInt(b.sort)
                })
                website_temp.categories.find(item=> item.id == categoryOnMoveFrom).sort = tempCatFromSort;
                website_temp.categories.find(item=> item.id == categoryOnMoveTo).sort = tempCatToSort;
                website_temp.categories.sort((a,b)=>{
                    return parseInt(a.sort) - parseInt(b.sort)
                })
                drawCategoryList();
            }

        }
    }).fail(function(){
        showAlert('error',r.msg,4000,true);
        website.categories.find(item=> item.id == categoryOnMoveFrom).sort = tempCatFromSort;
        website.categories.find(item=> item.id == categoryOnMoveTo).sort = tempCatToSort;
        website.categories.sort((a,b)=>{
            return parseInt(a.sort) - parseInt(b.sort)
        })
        website_temp.categories.find(item=> item.id == categoryOnMoveFrom).sort = tempCatFromSort;
        website_temp.categories.find(item=> item.id == categoryOnMoveTo).sort = tempCatToSort;
        website_temp.categories.sort((a,b)=>{
            return parseInt(a.sort) - parseInt(b.sort)
        })
        drawCategoryList();
    })
}


$('html,body').on('mousedown touchstart','.categoryCardMove',function(e){
    e.stopImmediatePropagation();
    e.preventDefault();
    categoryOnMove = true;
    categoryOnMoveFrom = $(this).closest('.categoryCardContainer').attr('category');
    $(this).closest('.categoryCardContainer').addClass('categoryCardSelectedOnMove');
    $('#onMove').removeClass().addClass('categoryCardOnMove')
    $('#onMove').html($(this).closest('.categoryCardContainer').html());
    $('#onMove').width($(this).closest('.categoryCardContainer').width())
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
$('html,body').on('mousemove touchmove',function(e){
    if(categoryOnMove){
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
            if(pageY < $('#bodyPage').offset().top + 100 && $('.categoriesListContainer').offset().top < $('#bodyPage').offset().top + 40){
                $('#bodyPage').scrollTop($('#bodyPage').scrollTop() - 5);
            }else if(pageY > $('#bodyPage').offset().top + $('#bodyPage').height() - 100 && $('.categoriesListContainer').offset().top + $('.categoriesListContainer').height() > $('#bodyPage').offset().top + $('#bodyPage').height() - 10){
                $('#bodyPage').scrollTop($('#bodyPage').scrollTop() + 5);
            }
        },10)
    }else{
        clearInterval(categoryOnMoveInterval)
    }

});
$('html,body').on('mouseup touchend','#bodyPage',function(e){
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
                categoryOnMoveFrom = $('.categoryCardSelectedOnMove').attr('category');
                categoryOnMoveTo = $(this).attr('category');
                sortCategories();
            }
        })
        $('.categoryCardContainer').removeClass('categoryCardSelectedOnMove');
        $('#onMove').removeClass().html('').addClass('none');
        $('.categoryCardContainer').removeClass('categoryCardHighlighted');
        categoryOnMove = false;
    }

});
