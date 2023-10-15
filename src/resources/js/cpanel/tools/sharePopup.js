
share = function(type,item){
    if(!$('#share-popup').hasClass('none')){return}
    showPopup($('#share-popup'),function(){
        if(type == 'product' ){
            if(item.category_id == null){return;}
            $('#share-inputHidden').val(categories.find(cat => cat.id == item.category_id).name+'/'+item.name);
        }else if(type == 'category'){
            $('#share-inputHidden').val(item.name);
        }
        let shareImg;
        let shareLink;
        let customLangFlag = website.customLang_flag ?? 'USA';

        $('.sharelangicon').removeClass('sharelangiconSelected');
        $('.sharelangicon').each(function(){
            if(website.defaultLanguage == $(this).attr('lang')){
                $(this).addClass('sharelangiconSelected');
                $(this).find('.ico-check0').addClass('ico-check1');
            }
        });
        $('.shareIcon[shareTo="copy"]').trigger('click');
        $('#share-img').attr('src',item.imgUrl);
        $('#share-name').text(item.name);

    });
}
$(document).on('click','.shareCatButton',function(e){
    e.stopImmediatePropagation();
    share('category',categories.find(item=> item.id == $(this).attr('catId')));
})
$(document).on('click','.shareProdButton',function(e){
    e.stopImmediatePropagation();
    share('product',products.find(item=> item.id == $(this).attr('prodId')));
})

$('.sharelangicon').on('click',function(e){
    e.stopImmediatePropagation();
    $('.sharelangicon').removeClass('sharelangiconSelected');
    $('.sharelangicon').find('.ico-check0').removeClass('ico-check1');
    $(this).addClass('sharelangiconSelected');
    $(this).find('.ico-check0').addClass('ico-check1');
    $('.shareIcon').each(function(){
        if($(this).hasClass('shareIconSelected')){
            $(this).trigger('click');
        }
    })
})

$('.shareIcon').on('click',function(e){
    e.stopImmediatePropagation();
    thisLang = website.defaultLanguage;
    $('.sharelangicon').each(function(){
        if($(this).hasClass('sharelangiconSelected')){
            thisLang = $(this).attr('lang');
        }
    });
    if(thisLang == 'eg'){thisLang = website.customLang_code}
    $('.shareIcon').removeClass('shareIconSelected');
    $(this).addClass('shareIconSelected');
    $('.shareIcon').find('.ico-check1').removeClass('ico-check1').addClass('ico-check0');
    $(this).find('.ico-check0').removeClass('ico-check0').addClass('ico-check1');
    $('.shareBtnContainer').hide();
    $('.shareBtnContainer[shareTo="'+$(this).attr('shareTo')+'"]').css('display','flex');

    switch($(this).attr('shareTo')){
        case 'copy':
            $('#share-copy').attr('link','https://'+website.url+'/'+thisLang+'/'+$('#share-inputHidden').val());
            break;
        case 'facebook':
            $('#share-facebook').attr('link','https://www.facebook.com/sharer/sharer.php?display=popup&u='+website.url+'/'+thisLang+'/'+encodeURI($('#share-inputHidden').val().replace(/ /g,'%20')));
            break;
        case 'twitter':
            $('#share-twitter').attr('link','https://twitter.com/intent/tweet?url=https://'+website.url+'/'+thisLang+'/'+encodeURI($('#share-inputHidden').val().replace(/ /g,'%20')));
            break;
        case 'linkedin':
            $('#share-linkedin').attr('link','https://www.linkedin.com/sharing/share-offsite/?url=https://'+website.url+'/'+thisLang+'/'+encodeURI($('#share-inputHidden').val().replace(/ /g,'%20')));
            break;
        case 'whatsapp':
            $('#share-whatsapp').attr('link','https://api.whatsapp.com/send/?text=https://'+website.url+'/'+thisLang+'/'+encodeURI($('#share-inputHidden').val().replace(/ /g,'%20')));
            break;
        case 'telegram':
            $('#share-telegram').attr('link','https://t.me/share/url?url=https://'+website.url+'/'+thisLang+'/'+encodeURI($('#share-inputHidden').val().replace(/ /g,'%20')) );
            break;
    }
})

$('#share-copy').on('click',function(){
    navigator.clipboard.writeText($(this).attr('link')).then(function(){
        showAlert('normal',texts.cpanel.public.shareLinkCopied,4000,true);
    });
})
$('#share-facebook, #share-twitter, #share-linkedin, #share-whatsapp, #share-telegram').on('click',function(){
    window.open($(this).attr('link'),'','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes');

})

