
share_pop = function(){
    let item = window.share.item;
    let type = window.share.type;
    showPopup('share-popup',function(){
        $('.popupBody').append(
            $('<div/>',{class:''}).append(
                $('<img/>',{src:window.share.item.img,class:'w400 mxw100p h100 br3 ofCover'}),
                $('<div/>',{class:'fs102 bold500',text:item.name})
            ),
            $('<div/>',{class:'pageSection_brdrB mY10'}),
            $('<div/>',{class:''}).append(
                $('<div/>',{class:'fs09',text:texts.cpanel.public.selectShareLang}),
                drawInputList('','ico-languages ','',texts.cpanel.public.selectShareLang,'shareLangInputList',texts.cpanel.public.selectShareLang,200,'shareLangInputList_list',false,'','','')
            ),
            $('<div/>',{class:'pageSection_brdrB mY10'}),
            $('<div/>',{class:''}).append(
                $('<div/>',{class:'fs09',text:texts.cpanel.public.shareOn}),
                $('<div/>',{class:'row wrap alnC jstfyC w100p mxw400'}).append(
                    $('<button/>',{class:'shareBtn bgc_facebook',shareTo:'facebook'}).append(
                        $('<div/>',{class:'c_txt2 shareBtnIcon ico-facebook'}),
                        $('<div/>',{class:'c_txt2 shareBtnTxt',text:texts.cpanel.public.facebook})
                    ),
                    $('<button/>',{class:'shareBtn bgc_whatsapp',shareTo:'whatsapp'}).append(
                        $('<div/>',{class:'c_txt2 shareBtnIcon ico-whatsapp'}),
                        $('<div/>',{class:'c_txt2 shareBtnTxt',text:texts.cpanel.public.whatsapp})
                    ),
                    $('<button/>',{class:'shareBtn bgc_telegram',shareTo:'telegram'}).append(
                        $('<div/>',{class:'c_txt2 shareBtnIcon ico-telegram'}),
                        $('<div/>',{class:'c_txt2 shareBtnTxt',text:texts.cpanel.public.telegram})
                    ),
                    $('<button/>',{class:'shareBtn bgc_linkedin',shareTo:'linkedin'}).append(
                        $('<div/>',{class:'c_txt2 shareBtnIcon ico-linkedin'}),
                        $('<div/>',{class:'c_txt2 shareBtnTxt',text:texts.cpanel.public.linkedin})
                    ),
                    $('<button/>',{class:'shareBtn bgc_twitter',shareTo:'twitter'}).append(
                        $('<div/>',{class:'c_txt2 shareBtnIcon ico-twitter'}),
                        $('<div/>',{class:'c_txt2 shareBtnTxt',text:texts.cpanel.public.twitter})
                    ),
                    $('<button/>',{class:'shareBtn bgc_G',shareTo:'copy'}).append(
                        $('<div/>',{class:'c_txt2 shareBtnIcon ico-copy'}),
                        $('<div/>',{class:'c_txt2 shareBtnTxt',text:texts.cpanel.public.copyLink})
                    ),
                )
            )
        )
        for(const key in website.languages){
            addToInputList($('#shareLangInputList_list'),website.languages[key].name,website.languages[key].code)
        }
    });
}


$('body').on('click','.shareBtn',function(e){
    if($('#shareLangInputList').val() == ''){
        showAlert('error',texts.cpanel.public.errorSelectSareLang,4000,true)
        inputListError($('#shareLangInputList'))
        return;
    }
    let link;
    if(window.share.type == 'product'){
        link = encodeURI(`${website.url}/${$('#shareLangInputList').attr('key')}/${website.categories.find(item=>item.id == window.share.item.category_id).name}/${window.share.item.name}`);
    }else if(window.share.type == 'category'){
        link = encodeURI(`${website.url}/${$('#shareLangInputList').attr('key')}/${window.share.item.name}`);
    }
    switch($(this).attr('shareTo')){
        case 'copy':
            navigator.clipboard.writeText(link).then(function(){
                showAlert('normal',texts.cpanel.public.shareLinkCopied,4000,true);
            });
            break;
        case 'facebook':
            window.open(`https://www.facebook.com/sharer/sharer.php?display=popup&u=${link}`,'','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes');
            break;
        case 'twitter':
            window.open(`https://twitter.com/intent/tweet?url=https://${link}`,'','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes');
        break;
        case 'linkedin':
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=https://${link}`,'','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes');
        break;
        case 'whatsapp':
            window.open(`https://api.whatsapp.com/send/?text=https://${link}`,'','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes');
        break;
        case 'telegram':
            window.open(`https://t.me/share/url?url=https://${link}`,'','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes');
        break;
    }
})
