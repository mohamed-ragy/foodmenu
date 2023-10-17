$('#navLiveChat-optionsIcon').on('click',function(){
    $('.navLiveChat-optionsContainer').removeClass('none');
    $('.navLiveChat-optionsContainer').css({
        'top':$(this).offset().top + $(this).outerHeight(),
        'left':($(this).offset().left + $(this).outerWidth() - $('.navLiveChat-optionsContainer').outerWidth()),
    })
})

$(document).on('click',function(){
    if($('.navLiveChat-optionsContainer:hover').length == 0 && $('#navLiveChat-optionsIcon:hover').length == 0){
        $('.navLiveChat-optionsContainer').addClass('none');
    }
})

//////
$('#LiveChat-goInvisible').prop('checked',account.isInvisible);
$('html,body').on('click','#LiveChat-goInvisible',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    if($('#LiveChat-goInvisible').prop('checked') == true){
        account.isInvisible = 1;
    }else if($('#LiveChat-goInvisible').prop('checked') == false){
        account.isInvisible = 0;
    }
    window.globalChannel.send({invisible:account.isInvisible}).then(()=>{
        $('#LiveChat-goInvisible').prop('checked') ? account.isInvisible = 1 : account.isInvisible = 0;
    },()=>{
        account.isInvisible == 1 ? $('#LiveChat-goInvisible').prop('checked',true) : $('#LiveChat-goInvisible').prop('checked',false) ;
    })

})
////
if(settings.muteChat == 1){
    $('#navLiveChat-mute').find('.navLiveChat-muteCheck').addClass('ico-check1').removeClass('ico-check0')
}else{
    $('#navLiveChat-mute').find('.navLiveChat-muteCheck').removeClass('ico-check1').addClass('ico-check0')
}
$('html,body').on('click','#navLiveChat-mute',function(e){
    e.stopImmediatePropagation();
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
$('#LiveChat-chatPopup').prop('checked',settings_temp.chatPopup);

$('#LiveChat-chatPopup').on('click',function(){
    settings_temp.chatPopup = $(this).prop('checked')
    $('#cpanelSettings-chatPopup').prop('checked',$(this).prop('checked'));
    control_panel_settings_unsave_check();
})
