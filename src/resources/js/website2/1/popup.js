
showPopup = function(elem,focusElem=null,callback=function(){}){
    let showPopupTimeout = 0;
    if(!$('.popupWindowCover').hasClass('none')){
        hidePopup(true);
        showPopupTimeout = 500;
    }
    setTimeout(function(){
        navMobileClose()
        let img = '/storage/imgs/templates/'+website.templateType+'/intro.webp';
        $('.popupWindowCover').removeClass('none');
        $('.popupContent').addClass('none');
        $('.popup').removeClass('none');
        elem.removeClass('none');
        $('.popup').addClass('showpopup');
        // $("body").css('height','100vh');
        // $('html, body').css('overflow-y','hidden')

        // $('html').css('overflow-y','hidden')
        // $('html').css('height','100%')
        $('.popupImg').attr('src','')
        if(elem.attr('showImg') == null || elem.attr('showImg') == ''){
            $('.popupImg').addClass('none');
        }else{
            if(elem.attr('showImg') == 'random'){
                if(imgs.length > 0){
                    img ='/storage/'+imgs[Math.floor(Math.random() * imgs.length)].url
                }else{
                    img = website.introImg_url;
                }
            }else if(elem.attr('showImg') == 'intro'){
                img = website.introImg_url;
            }else if(elem.attr('showImg') == 'info'){
                img = website.infoImg_url
            }else if(elem.attr('showImg') == 'ourStory'){
                img = website.ourStoryImg_url
            }else{
                img ='/storage/'+imgs.find(item => item.id == elem.attr('showImg')).url
            }
            $('.popupImg').removeClass('none');
            $('.popupImg').attr('src',img)
            $('.popupImg').css('opacity','1')
        }
        callback();

        if(focusElem != null){
            focusElem.focus();
        }
    },showPopupTimeout)


}
hidePopup = function(keepCover,callback = ()=>{}){
    if(!keepCover){
        $('.popupWindowCover').addClass('none');
    }
    $('.popupImg').css('opacity','0')
    $('.popupContent').addClass('none');
    $('.popup').removeClass('showpopup');
    $('.popup').addClass('none');
    // $('html, body').css('overflow-y','visible')
    callback();
// $("body").css('height','auto');

        // $('html').css('overflow-y','visible')
        // $('html').css('height','auto')
    userStatusBrowsingPage();
}
$('html, body').on('click','#popupClose',function(e){
    e.stopImmediatePropagation();
    hidePopup();

})
