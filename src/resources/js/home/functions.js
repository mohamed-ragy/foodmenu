tooltip = function(){
    // $(document).on('click','[tooltip], [tooltip]',function(e){
    //     $('#tooltipDiv').hide();
    // });
    $(document).on('mouseleave','[tooltip]',function(e){
        $('#tooltipDiv').text('');
        $('#tooltipDiv').hide();
    });
    $(document).on('mousemove mouseover mouseenter','[tooltip]',function(e){
        if($(this).attr('tooltip') == ''){return;}
        if(!window.matchMedia("(pointer: coarse)").matches && $('#cpanelSettings-tooltip').prop('checked') == true){
            // console.log($(this).attr('tooltip'));
            if(e.pageY < ($(window).height()/2) &&  e.pageX < ($(window).width()/2)){
                $('#tooltipDiv').html($(this).attr('tooltip') ?? $(this).attr('tooltip'));
                $('#tooltipDiv').css({
                    'top':e.pageY + 15 ,
                    'left':e.pageX + 15,
                    'display':'flex',
                });
                // console.log('up left')
            }else if(e.pageY > ($(window).height()/2) &&  e.pageX < ($(window).width()/2)){
                $('#tooltipDiv').html($(this).attr('tooltip') ?? $(this).attr('tooltip'));
                $('#tooltipDiv').css({
                    'top':e.pageY - $('#tooltipDiv').height() - 15,
                    'left':e.pageX + 15,
                    'display':'flex',
                });
                // console.log('down left')
            }else if(e.pageY < ($(window).height()/2) &&  e.pageX > ($(window).width()/2)){
                $('#tooltipDiv').html($(this).attr('tooltip') ?? $(this).attr('tooltip'));
                $('#tooltipDiv').css({
                    'top':e.pageY + 15,
                    'left':e.pageX - $('#tooltipDiv').width() - 15,
                    'display':'flex',
                });
                // console.log('up right')
            }else if(e.pageY > ($(window).height()/2) &&  e.pageX > ($(window).width()/2)){
                $('#tooltipDiv').html($(this).attr('tooltip') ?? $(this).attr('tooltip'));
                $('#tooltipDiv').css({
                    'left':e.pageX - $('#tooltipDiv').innerWidth() - 15,
                    'top':e.pageY - $('#tooltipDiv').innerHeight() - 15,
                    'display':'flex',
                });
                // console.log('down right')
            }
        }
    });
    $(document).on('mousemove',function(e){
        if($('[tooltip]:hover').length == 0){
            $('#tooltipDiv').text('');
            $('#tooltipDiv').hide();
        }
    });
    // $(document).on('mouseover','.optionBtn',function(e){
        // e.stopImmediatePropagation();
        // if($(this).prop('disabled') == true){
            // $('#tooltipDiv').hide();
        // }
    // })

}
tooltip();
