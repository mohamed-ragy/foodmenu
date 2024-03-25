showLiveChatWindow = function(){
    if(!website.liveChat){return;}
    $('.liveChatContainer').css({'animation-name':'chatwindowShow'}).removeClass('none')
    setTimeout(function(){
        $('#liveChatmsgInput').focus();
    },150)
};
hideLiveChatWindow = function(){
    $('.liveChatContainer').css({'animation-name':'chatwindowHide'})
    setTimeout(function(){
        $('.liveChatContainer').addClass('none')
    },100)
}
