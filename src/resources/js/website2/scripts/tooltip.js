

    $(document).on('mousemove mouseover','[tooltip]',function(e) {

        if($(this).attr('tooltip') != ''){
            if(!window.matchMedia("(pointer: coarse)").matches){
                if(e.pageY < ($(window).height()/2) &&  e.pageX < ($(window).width()/2)){
                    $('.tooltipPopup').html($(this).attr('tooltip')).css({
                        'top':e.pageY + 15 ,
                        'left':e.pageX + 15,
                    }).removeClass('tooltipPopupHidden');
                }else if(e.pageY > ($(window).height()/2) &&  e.pageX < ($(window).width()/2)){
                    $('.tooltipPopup').html($(this).attr('tooltip')).css({
                        'top':e.pageY - $('.tooltipPopup').height() - 15,
                        'left':e.pageX + 15,
                    }).removeClass('tooltipPopupHidden');
                }else if(e.pageY < ($(window).height()/2) &&  e.pageX > ($(window).width()/2)){
                    $('.tooltipPopup').html($(this).attr('tooltip')).css({
                        'top':e.pageY + 15,
                        'left':e.pageX - $('.tooltipPopup').width() - 15,
                    }).removeClass('tooltipPopupHidden');
                }else if(e.pageY > ($(window).height()/2) &&  e.pageX > ($(window).width()/2)){
                    $('.tooltipPopup').html($(this).attr('tooltip')).css({
                        'top':e.pageY - $('.tooltipPopup').height() - 15,
                        'left':e.pageX - $('.tooltipPopup').width() - 15,
                    }).removeClass('tooltipPopupHidden');
                }
            }
        }
    });
    $(document).on('touchstart','[tooltip]',function(e) {
        if($(this).attr('tooltip') != ''){
            if(window.matchMedia("(pointer: coarse)").matches){
                // $('.tooltipPopup').html($(this).attr('tooltip'));
                if(e.originalEvent.touches[0].pageY < ($(window).height()/2) &&  e.originalEvent.touches[0].pageX < ($(window).width()/2)){
                    $('.tooltipPopup').html($(this).attr('tooltip')).css({
                        'top':e.originalEvent.touches[0].pageY + 15 ,
                        'left':e.originalEvent.touches[0].pageX + 15,
                    }).removeClass('tooltipPopupHidden');
                }else if(e.originalEvent.touches[0].pageY > ($(window).height()/2) &&  e.originalEvent.touches[0].pageX < ($(window).width()/2)){
                    $('.tooltipPopup').html($(this).attr('tooltip')).css({
                        'top':e.originalEvent.touches[0].pageY - $('.tooltipPopup').height() - 15,
                        'left':e.originalEvent.touches[0].pageX + 15,
                    }).removeClass('tooltipPopupHidden');
                }else if(e.originalEvent.touches[0].pageY < ($(window).height()/2) &&  e.originalEvent.touches[0].pageX > ($(window).width()/2)){
                    $('.tooltipPopup').html($(this).attr('tooltip')).css({
                        'top':e.originalEvent.touches[0].pageY + 15,
                        'left':e.originalEvent.touches[0].pageX - $('.tooltipPopup').width() - 15,
                    }).removeClass('tooltipPopupHidden');
                }else if(e.originalEvent.touches[0].pageY > ($(window).height()/2) &&  e.originalEvent.touches[0].pageX > ($(window).width()/2)){
                    $('.tooltipPopup').html($(this).attr('tooltip')).css({
                        'left':e.originalEvent.touches[0].pageX - $('.tooltipPopup').width() - 15,
                        'top':e.originalEvent.touches[0].pageY - $('.tooltipPopup').height() - 15,
                    }).removeClass('tooltipPopupHidden');
                }
            }
        }
    });
    $(document).on('mousemove',(e) => {
        if($('[tooltip]:hover').length == 0){
            $('.tooltipPopup').text('');
            $('.tooltipPopup').addClass('tooltipPopupHidden');
        }
    });
    $(document).on('touchend',(e) => {
            $('.tooltipPopup').text('');
            $('.tooltipPopup').addClass('tooltipPopupHidden')
    });

    $('#body').on('scroll',() => {
        $('.tooltipPopup').text('');
        $('.tooltipPopup').addClass('tooltipPopupHidden');
    })
