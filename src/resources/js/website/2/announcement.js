if(!$('.announcement').hasClass('none') && announcement_Arr.length > 0 ){
    announcement_Arr.forEach(ann => {
        $('.announcementTxt').append(
            $('<span/>',{
                html:'- '+ann,
                tooltip:ann,
                class:'mX-20'
            })
        )
    });
    if(lang == 'ar' || lang == 'eg' && website.customLang_rtl){
        $('.announcementTxt').css('left',parseFloat($('.announcementTxt').width()) * -1)
    }else{
        $('.announcementTxt').css('left',(parseFloat($('.announcementTxtContainer').outerWidth()))+'px')
    }

    setInterval(()=>{
        if($('.announcement').is(':hover') || document.hidden){
            return;
        }
        if(lang == 'ar' || lang == 'eg' && website.customLang_rtl){
            if(parseFloat($('.announcementTxt').offset().left)  > parseFloat($('.announcementTxtContainer').outerWidth()) ){
                $('.announcementTxt').css('left',parseFloat($('.announcementTxt').width()) * -1)
            }else{
                $('.announcementTxt').animate({'left': (parseFloat($('.announcementTxt').offset().left) + 30)+'px'},1000,'linear')
            }
        }else{
            if(parseFloat($('.announcementTxt').offset().left) < (parseFloat($('.announcementTxt').width())) * -1 ){
                $('.announcementTxt').css('left',(parseFloat($('.announcementTxtContainer').outerWidth()))+'px')
            }else{
                $('.announcementTxt').animate({'left':(parseFloat($('.announcementTxt').offset().left) - 30)+'px'},1000,'linear')
            }
        }

    },1000)
}
