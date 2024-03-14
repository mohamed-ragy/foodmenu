
tooltip = function(tooltipMsg,x,y){
    if(!window.matchMedia("(pointer: coarse)").matches ){
        if(y < ($(window).height()/2) &&  x < ($(window).width()/2)){
            $('#tooltipDiv').html(tooltipMsg);
            $('#tooltipDiv').css({
                'top':y + 15 ,
                'left':x + 15,
                'display':'block',
            });
            // console.log('up left')
        }else if(y > ($(window).height()/2) &&  x < ($(window).width()/2)){
            $('#tooltipDiv').html(tooltipMsg);
            $('#tooltipDiv').css({
                'top':y - $('#tooltipDiv').height() - 5,
                'left':x + 5,
                'display':'block',
            });
            // console.log('down left')
        }else if(y < ($(window).height()/2) &&  x > ($(window).width()/2)){
            $('#tooltipDiv').html(tooltipMsg);
            $('#tooltipDiv').css({
                'top':y + 15,
                'left':x - $('#tooltipDiv').width() - 15,
                'display':'block',
            });
            // console.log('up right')
        }else if(y > ($(window).height()/2) &&  x > ($(window).width()/2)){
            $('#tooltipDiv').html(tooltipMsg);
            $('#tooltipDiv').css({
                'left':x - $('#tooltipDiv').width() - 10,
                'top':y - $('#tooltipDiv').height() - 10,
                'display':'block',
            });
        }
    }
}
updateToolTip = function(){
    if(typeof(window.toolTipElem) === 'undefined'){return;}
    $('#tooltipDiv').html(window.toolTipElem.attr('tooltip'));
}
///
$('html,body').on('mouseleave','[tooltip]',function(e){
    $('#tooltipDiv').text('');
    $('#tooltipDiv').hide();
});
$('html,body').on('mouseenter mouseover mousemove ','[tooltip]',function(e){
    // e.stopImmediatePropagation();
    if($(this).attr('tooltip') == ''){return;}
    window.toolTipElem = $(this);
    tooltip($(this).attr('tooltip'),e.pageX,e.pageY);
});


$('html,body').on('mousemove',function(e){
    if($('[tooltip]:hover').length == 0 && $('.confirm-btn:hover').length == 0){
        $('#tooltipDiv').text('');
        $('#tooltipDiv').hide();
    }
});
