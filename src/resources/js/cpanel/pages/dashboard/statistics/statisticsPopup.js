
$('html,body').on('click','[statisticsPopup]',function(e){
    e.stopImmediatePropagation();
    $('#statistics-popup').find('.popupBody').text('').append(
        window.statisticsPopups[$(this).attr('statisticsPopup')]
    )
    $('#statistics-popup').find('.popupTitleTxt').text($(this).attr('statisticsPopupTitle'))
    showPopup($('#statistics-popup'))
})
////////////////////
$(document).on('mouseleave','[statisticsPopup]',function(e){
    $('#statisticsPopupDiv').text('');
    $('#statisticsPopupDiv').hide();
});
$(document).on('mousemove mouseover mouseenter','[statisticsPopup]',function(e){
    if($(this).attr('statisticsPopup') == ''){return;}
    if(!window.matchMedia("(pointer: coarse)").matches){
        // console.log($(this).attr('statisticsPopup'));
        if(e.pageY < ($(window).height()/2) &&  e.pageX < ($(window).width()/2)){
            $('#statisticsPopupDiv').html(window.statisticsPopups[$(this).attr('statisticsPopup')]);
            $('#statisticsPopupDiv').css({
                'top':e.pageY + 15 ,
                'left':e.pageX + 15,
                'display':'block',
            });
            // console.log('up left')
        }else if(e.pageY > ($(window).height()/2) &&  e.pageX < ($(window).width()/2)){
            $('#statisticsPopupDiv').html(window.statisticsPopups[$(this).attr('statisticsPopup')]);
            $('#statisticsPopupDiv').css({
                'top':e.pageY - $('#statisticsPopupDiv').height() - 5,
                'left':e.pageX + 5,
                'display':'block',
            });
            // console.log('down left')
        }else if(e.pageY < ($(window).height()/2) &&  e.pageX > ($(window).width()/2)){
            $('#statisticsPopupDiv').html(window.statisticsPopups[$(this).attr('statisticsPopup')]);
            $('#statisticsPopupDiv').css({
                'top':e.pageY + 15,
                'left':e.pageX - $('#statisticsPopupDiv').width() - 15,
                'display':'block',
            });
            // console.log('up right')
        }else if(e.pageY > ($(window).height()/2) &&  e.pageX > ($(window).width()/2)){
            $('#statisticsPopupDiv').html(window.statisticsPopups[$(this).attr('statisticsPopup')]);
            $('#statisticsPopupDiv').css({
                'left':e.pageX - $('#statisticsPopupDiv').width() - 10,
                'top':e.pageY - $('#statisticsPopupDiv').height() - 10,
                'display':'block',
            });
        }
    }
});

$(document).on('touchstart','[statisticsPopup]',function(e){
    if($(this).attr('statisticsPopup') == ''){return;}
        // console.log($(this).attr('statisticsPopup'));
        if(e.originalEvent.touches[0].pageY < ($(window).height()/2) &&  e.originalEvent.touches[0].pageX < ($(window).width()/2)){
            $('#statisticsPopupDiv').html(window.statisticsPopups[$(this).attr('statisticsPopup')]);
            $('#statisticsPopupDiv').css({
                'top':e.originalEvent.touches[0].pageY + 15 ,
                'left':e.originalEvent.touches[0].pageX + 15,
                'display':'block',
            });
            // console.log('up left')
        }else if(e.originalEvent.touches[0].pageY > ($(window).height()/2) && e.originalEvent.touches[0].pageX < ($(window).width()/2)){
            $('#statisticsPopupDiv').html(window.statisticsPopups[$(this).attr('statisticsPopup')]);
            $('#statisticsPopupDiv').css({
                'top':e.originalEvent.touches[0].pageY - $('#statisticsPopupDiv').height() - 5,
                'left':e.originalEvent.touches[0].pageX + 5,
                'display':'block',
            });
            // console.log('down left')
        }else if(e.originalEvent.touches[0].pageY < ($(window).height()/2) &&  e.originalEvent.touches[0].pageX > ($(window).width()/2)){
            $('#statisticsPopupDiv').html(window.statisticsPopups[$(this).attr('statisticsPopup')]);
            $('#statisticsPopupDiv').css({
                'top':e.originalEvent.touches[0].pageY + 15,
                'left':e.originalEvent.touches[0].pageX - $('#statisticsPopupDiv').width() - 15,
                'display':'block',
            });
            // console.log('up right')
        }else if(e.originalEvent.touches[0].pageY > ($(window).height()/2) &&  e.originalEvent.touches[0].pageX > ($(window).width()/2)){
            $('#statisticsPopupDiv').html(window.statisticsPopups[$(this).attr('statisticsPopup')]);
            $('#statisticsPopupDiv').css({
                'left':e.originalEvent.touches[0].pageX - $('#statisticsPopupDiv').width() - 10,
                'top':e.originalEvent.touches[0].pageY - $('#statisticsPopupDiv').height() - 10,
                'display':'block',
            });
            // console.log('down right')
        }
});
$(document).on('mousemove',function(e){
    if($('[statisticsPopup]:hover').length == 0){
        $('#statisticsPopupDiv').text('');
        $('#statisticsPopupDiv').hide();
    }
});
$(document).on('touchend',function(e){
    $('#statisticsPopupDiv').text('');
    $('#statisticsPopupDiv').hide();
});
