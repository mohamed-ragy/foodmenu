$('#navLiveChat-optionsIcon').on('click',function(e){
    // e.stopImmediatePropagation();
    $('.navLiveChat-optionsContainer').removeClass('none');
    $('.navLiveChat-optionsContainer').css({
        'top':$(this).offset().top + $(this).outerHeight(),
        'left':($(this).offset().left + $(this).outerWidth() - $('.navLiveChat-optionsContainer').outerWidth()),
    })
})

$('body').on('click',function(){
    if($('.navLiveChat-optionsContainer:hover').length == 0 && $('#navLiveChat-optionsIcon:hover').length == 0){
        $('.navLiveChat-optionsContainer').addClass('none');
    }
})

//////
$('body').on('click','#LiveChat-goInvisible',function(e){
    if(!coolDownChecker()){return;}
    if($('#LiveChat-goInvisible').prop('checked') == true){
        account.isInvisible = 1;
    }else if($('#LiveChat-goInvisible').prop('checked') == false){
        account.isInvisible = 0;
    }
    window.globalChannel.send({invisible:account.isInvisible}).then(()=>{
        $('#LiveChat-goInvisible').prop('checked') ? account.isInvisible = 1 : account.isInvisible = 0;
        ReloadForUpdatePopup();
    },()=>{
        account.isInvisible == 1 ? $('#LiveChat-goInvisible').prop('checked',true) : $('#LiveChat-goInvisible').prop('checked',false) ;
    })

})
////

$('body').on('click','#navLiveChat-mute',function(e){
    if(settings.muteChat == 1){
        settings.muteChat = 0;
        $('#navLiveChat-mute').find('.navLiveChat-muteCheck').removeClass('ico-check1').addClass('ico-check0')
    }else{
        settings.muteChat = 1;
        $('#navLiveChat-mute').find('.navLiveChat-muteCheck').addClass('ico-check1').removeClass('ico-check0')
    }
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            muteChat:settings.muteChat
        }
    })
})
///////

$('#LiveChat-chatPopup').on('click',function(){
    settings_temp.chatPopup = $(this).prop('checked')
    $('#cpanelSettings-chatPopup').prop('checked',$(this).prop('checked'));
    control_panel_settings_unsave_check();
})
