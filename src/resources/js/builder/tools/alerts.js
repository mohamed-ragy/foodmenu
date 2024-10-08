
showAlert = function(type,text,time=4000,sound=false){
    $('#statusBar').html(text);
    if(sound == true ){
        $('#alert_'+type).prop('muted',false);
        $('#alert_'+type)[0].currentTime = 0;
        $('#alert_'+type)[0].play();
    }

    if(type == 'normal'){alertIcon = 'ico-info'}
    if(type == 'error'){alertIcon = 'ico-warning'}
    if(type == 'success'){alertIcon = 'ico-success'}
    if(type == 'warning'){alertIcon = 'ico-warning'}
    let randomId = Math.round(Math.random()*10000000);

    $('#alertsContainer').prepend(
        $('<div/>',{
            id:'alert-'+randomId,
            class:'alertContainer alert_'+type,
        }).append(
            $('<div/>',{
                class:'alertIcon_'+type,
            }).append(
                $('<div/>',{class:alertIcon}),
            ),
            $('<div/>',{
                class:'alert_text',
                html:text,
            }),
            $('<span/>',{class:'ico-close closeAlert',randomId:randomId}),
        )
    )
    $('#alert-'+randomId).css('bottom','-'+ (parseFloat($('#alert-'+randomId).height()) + 50)+'px')
    $('#alert-'+randomId).animate({'bottom':'0'},250);

    setTimeout(function(){
        if($('#alert-'+randomId+':hover').length == 0){
            $('#alert-'+randomId).animate({'opacity':'0'},150);
            setTimeout(function(){
                $('#alert-'+randomId).animate({'height':'0','margin':'0'},250);
                setTimeout(function(){
                    $('#alert-'+randomId).remove();
                },250);
            },500)
        }else{
            $('#alert-'+randomId).on('mouseleave',function(){
                $('#alert-'+randomId).animate({'opacity':'0'},150);
                setTimeout(function(){
                    $('#alert-'+randomId).animate({'height':'0','margin':'0'},250);
                    setTimeout(function(){
                        $('#alert-'+randomId).remove();
                    },250);
                },500)
            });
        }
    },time + 250)


}

$('#alertsContainer').on('click','.closeAlert',function(e){
    randomId=$(this).attr('randomId');
    $('#alert-'+randomId).remove();

})
