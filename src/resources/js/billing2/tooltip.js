$('html,body').on('mouseenter','[tooltip]',function(e){
    e.stopImmediatePropagation();
    $('#tooltip').text($(this).attr('tooltip')).css({
        'top':parseFloat($(this).offset().top) - 25 - $('#tooltip').height(),
        'left':parseFloat($(this).position().left) - ($('#tooltip').width() / 2),
        'display':'flex',
    })
    if($('#tooltip').offset().left < 0){
        $('#tooltip').text($(this).attr('tooltip')).css({
            'left':0,
        })
    }
    if($('#tooltip').offset().top < 0){
        $('#tooltip').text($(this).attr('tooltip')).css({
            'top':parseFloat($(this).offset().top) + 25,
        })
    }
})
$('html,body').on('mouseleave','[tooltip]',function(e){
    e.stopImmediatePropagation();
    $('#tooltip').text($(this).attr('tooltip')).css({
        'display':'none',
    })
})
