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
        // if(goInvisible == false){
        //     for(const key in liveChats){
        //         if(liveChats[key].lastMsg != null && liveChats[key].lastMsg.author == 1 && liveChats[key].lastMsg.is_delivered == false){
        //                 liveChats[key].lastMsg.is_delivered = true;
        //                 liveChats[key].lastMsg.delivered_at = response.now;
        //         }
        //         for(const key2 in liveChats[key].msgs){
        //             if(liveChats[key].msgs[key2].is_delivered == false && liveChats[key].msgs[key2].author == 1){
        //                 liveChats[key].msgs[key2].is_delivered = true;
        //                 liveChats[key].msgs[key2].delivered_at = response.now;
        //                 // $('#ChatWindowMsgCard-'+liveChats[key].id).find('.chatWindowMsgInfo').attr('tooltip',this.newMsgCalc(liveChats[key].msgs.[key2]).info)
    
        //             }
        //         }
        //     }
        // }
    },()=>{
        account.isInvisible == 1 ? $('#LiveChat-goInvisible').prop('checked',true) : $('#LiveChat-goInvisible').prop('checked',false) ; 
    })

})
////
if(settings_temp.newMsgAlert == 0){
    $('#navLiveChat-mute').find('.navLiveChat-muteCheck').addClass('ico-check1').removeClass('ico-check0')
}else{
    $('#navLiveChat-mute').find('.navLiveChat-muteCheck').removeClass('ico-check1').addClass('ico-check0')
}
$('html,body').on('click','#navLiveChat-mute',function(e){
    e.stopImmediatePropagation();
    if($(this).find('.navLiveChat-muteCheck').hasClass('ico-check1')){
        if(settings.newMsgAlert == 0){
            showAlert('warning',texts.cpanel.liveChat.noToneSelected,4000,true);
            return;
        }else{
            settings_temp.newMsgAlert = settings.newMsgAlert;
        }
    }else{
        settings_temp.newMsgAlert = 0;
    }
    setAlertsTones();
    control_panel_settings_unsave_check();
})
///////
$('#LiveChat-chatPopup').prop('checked',settings_temp.chatPopup);

$('#LiveChat-chatPopup').on('click',function(){
    settings_temp.chatPopup = $(this).prop('checked')
    $('#cpanelSettings-chatPopup').prop('checked',$(this).prop('checked'));
    control_panel_settings_unsave_check();
})
