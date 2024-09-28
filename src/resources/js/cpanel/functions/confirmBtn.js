$('body').on('click',function(e){
    if($('.confirm-btn:hover').length == 0){
        $('.confirm-btn').removeClass('confirm-btn');
    }
})

confirmBtn = function(elem,x,y){
    if(!elem.hasClass('confirm-btn') && settings_temp.dClickConfirm){
        tooltip(texts.cpanel.public.clickToConfirm,x,y)
        elem.addClass('confirm-btn');
        return false;
    }else{
        elem.removeClass('confirm-btn');
        return true;
    }
}
//
