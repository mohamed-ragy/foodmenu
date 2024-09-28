/////////////social media links///////////////////////////////
checkSocailMediaLinksNoSave = function(){
    if(
        website_temp.facebookLink == website.facebookLink &&
        website_temp.twitterLink == website.twitterLink &&
        website_temp.youtubeLink == website.youtubeLink &&
        website_temp.linkedinLink == website.linkedinLink &&
        website_temp.instagramLink == website.instagramLink
    ){
        $('.socialMediaLinksNoSave').addClass('none');
        return true;
    }else{
        $('.socialMediaLinksNoSave').removeClass('none');
        return false;
    }
}
$('body').on('input change','#settings-facebookLink,#settings-twitterLink,#settings-youtubeLink,#settings-linkedinLink,#settings-instagramLink',function(){
    website_temp.facebookLink = $('#settings-facebookLink').val();
    website_temp.twitterLink = $('#settings-twitterLink').val();
    website_temp.youtubeLink = $('#settings-youtubeLink').val();
    website_temp.linkedinLink = $('#settings-linkedinLink').val();
    website_temp.instagramLink = $('#settings-instagramLink').val();
    restaurant_information_unsave_chack();
});

$('body').on('click','#settings-socialMediaLinksCancelBtn',function(){
    website_temp.facebookLink = website.facebookLink;
    website_temp.twitterLink = website.twitterLink;
    website_temp.youtubeLink = website.youtubeLink;
    website_temp.linkedinLink = website.linkedinLink;
    website_temp.instagramLink = website.instagramLink;
    $('#settings-facebookLink').val(website.facebookLink);
    $('#settings-twitterLink').val(website.twitterLink);
    $('#settings-youtubeLink').val(website.youtubeLink);
    $('#settings-linkedinLink').val(website.linkedinLink);
    $('#settings-instagramLink').val(website.instagramLink);
    restaurant_information_unsave_chack();
});
$('body').on('click','#settings-socialMediaLinksSaveBtn',function(){
    if(!coolDownChecker()){return;}
    showBtnLoading($('#settings-socialMediaLinksSaveBtn'))
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            saveSocailMediaLinks:true,
            facebookLink:website_temp.facebookLink,
            twitterLink:website_temp.twitterLink,
            youtubeLink:website_temp.youtubeLink,
            linkedinLink:website_temp.linkedinLink,
            instagramLink:website_temp.instagramLink,
        },
        success:function(response){
            hideBtnLoading($('#settings-socialMediaLinksSaveBtn'))
            if(response.saveSocailMediaLinksStatus == 1 ){
                showAlert('success',response.msg,4000,true);
                website.facebookLink = website_temp.facebookLink;
                website.twitterLink = website_temp.twitterLink;
                website.youtubeLink = website_temp.youtubeLink;
                website.linkedinLink = website_temp.linkedinLink;
                website.instagramLink = website_temp.instagramLink;
            }else if(response.saveSocailMediaLinksStatus == 0){
                showAlert('error',response.msg,4000,true);

            }
            restaurant_information_unsave_chack();
        }
    })
});
