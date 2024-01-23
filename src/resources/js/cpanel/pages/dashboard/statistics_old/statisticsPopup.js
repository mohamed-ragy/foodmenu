
$('html,body').on('click','[statisticspopup]',function(e){
    e.stopImmediatePropagation();
    $('#statistics-popup').find('.popupBody').text('').append(
        window.statisticspopups[$(this).attr('statisticspopup')]
    )
    $('#statistics-popup').find('.popupTitleTxt').text($(this).attr('statisticspopupTitle'))
    showPopup($('#statistics-popup'))
})
////////////////////
$(document).on('mouseleave','[statisticspopup]',function(e){
    $('#statisticspopupDiv').text('');
    $('#statisticspopupDiv').hide();
});
$(document).on('mousemove mouseover mouseenter','[statisticspopup]',function(e){
    if($(this).attr('statisticspopup') == ''){return;}
    if(!window.matchMedia("(pointer: coarse)").matches){
        // console.log($(this).attr('statisticspopup'));
        if(e.pageY < ($(window).height()/2) &&  e.pageX < ($(window).width()/2)){
            $('#statisticspopupDiv').html(window.statisticspopups[$(this).attr('statisticspopup')]);
            $('#statisticspopupDiv').css({
                'top':e.pageY + 15 ,
                'left':e.pageX + 15,
                'display':'block',
            });
            // console.log('up left')
        }else if(e.pageY > ($(window).height()/2) &&  e.pageX < ($(window).width()/2)){
            $('#statisticspopupDiv').html(window.statisticspopups[$(this).attr('statisticspopup')]);
            $('#statisticspopupDiv').css({
                'top':e.pageY - $('#statisticspopupDiv').height() - 5,
                'left':e.pageX + 5,
                'display':'block',
            });
            // console.log('down left')
        }else if(e.pageY < ($(window).height()/2) &&  e.pageX > ($(window).width()/2)){
            $('#statisticspopupDiv').html(window.statisticspopups[$(this).attr('statisticspopup')]);
            $('#statisticspopupDiv').css({
                'top':e.pageY + 15,
                'left':e.pageX - $('#statisticspopupDiv').width() - 15,
                'display':'block',
            });
            // console.log('up right')
        }else if(e.pageY > ($(window).height()/2) &&  e.pageX > ($(window).width()/2)){
            $('#statisticspopupDiv').html(window.statisticspopups[$(this).attr('statisticspopup')]);
            $('#statisticspopupDiv').css({
                'left':e.pageX - $('#statisticspopupDiv').width() - 10,
                'top':e.pageY - $('#statisticspopupDiv').height() - 10,
                'display':'block',
            });
        }
    }
});

$(document).on('touchstart','[statisticspopup]',function(e){
    if($(this).attr('statisticspopup') == ''){return;}
        // console.log($(this).attr('statisticspopup'));
        if(e.originalEvent.touches[0].pageY < ($(window).height()/2) &&  e.originalEvent.touches[0].pageX < ($(window).width()/2)){
            $('#statisticspopupDiv').html(window.statisticspopups[$(this).attr('statisticspopup')]);
            $('#statisticspopupDiv').css({
                'top':e.originalEvent.touches[0].pageY + 15 ,
                'left':e.originalEvent.touches[0].pageX + 15,
                'display':'block',
            });
            // console.log('up left')
        }else if(e.originalEvent.touches[0].pageY > ($(window).height()/2) && e.originalEvent.touches[0].pageX < ($(window).width()/2)){
            $('#statisticspopupDiv').html(window.statisticspopups[$(this).attr('statisticspopup')]);
            $('#statisticspopupDiv').css({
                'top':e.originalEvent.touches[0].pageY - $('#statisticspopupDiv').height() - 5,
                'left':e.originalEvent.touches[0].pageX + 5,
                'display':'block',
            });
            // console.log('down left')
        }else if(e.originalEvent.touches[0].pageY < ($(window).height()/2) &&  e.originalEvent.touches[0].pageX > ($(window).width()/2)){
            $('#statisticspopupDiv').html(window.statisticspopups[$(this).attr('statisticspopup')]);
            $('#statisticspopupDiv').css({
                'top':e.originalEvent.touches[0].pageY + 15,
                'left':e.originalEvent.touches[0].pageX - $('#statisticspopupDiv').width() - 15,
                'display':'block',
            });
            // console.log('up right')
        }else if(e.originalEvent.touches[0].pageY > ($(window).height()/2) &&  e.originalEvent.touches[0].pageX > ($(window).width()/2)){
            $('#statisticspopupDiv').html(window.statisticspopups[$(this).attr('statisticspopup')]);
            $('#statisticspopupDiv').css({
                'left':e.originalEvent.touches[0].pageX - $('#statisticspopupDiv').width() - 10,
                'top':e.originalEvent.touches[0].pageY - $('#statisticspopupDiv').height() - 10,
                'display':'block',
            });
            // console.log('down right')
        }
});
$(document).on('mousemove',function(e){
    if($('[statisticspopup]:hover').length == 0){
        $('#statisticspopupDiv').text('');
        $('#statisticspopupDiv').hide();
    }
});
$(document).on('touchend',function(e){
    $('#statisticspopupDiv').text('');
    $('#statisticspopupDiv').hide();
});
