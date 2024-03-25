productIcons = (productId) => {
    let is_trending = ''; let is_popular = 'none'; let is_new = 'none'; let is_topRated = 'none';
    website.trendingProducts2.find(item=> item.id == productId) ? is_trending = 'ic-trending trending pointer' : is_trending = 'none';
    website.mostPopularProducts.find(item=> item.id == productId) ? is_popular = 'ic-popular popular pointer' : is_popular = 'none';
    website.topRatedProducts.find(item=> item.id == productId) ? is_topRated = 'ic-topRated topRated pointer' : is_topRated = 'none';
    Date.parse(new Date(products.find(item=> item.id == productId).created_at)) >= Date.parse(new Date()) - (10 * 86400000) ? is_new = 'ic-new new pointer' : is_new = 'none';
    return {
        trending:is_trending,
        popular:is_popular,
        topRated:is_topRated,
        new:is_new,
    }
}

$('html,body').on('click','.productToChat',function(e){
    e.stopImmediatePropagation();
    if(!website.guestLiveChat && !loginCheck){
        showPopup($('#login-popup'),$('#login-email'),function(){
            $('.loginInput').removeClass('inputError')
            $('#loginFail').addClass('vH')
            $('#signupSuccess').addClass('vH')
            $('#loginWarning').text(texts.liveChat.loginToChat).removeClass('vH')
        })
        return;
    }
    showLiveChatWindow();
    $('#liveChatmsgInput').val('p@'+$(this).attr('productName'));
    $("#liveChatmsgBtn").trigger('click');
    hidePopup();
})
