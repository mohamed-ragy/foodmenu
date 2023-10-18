/////////////////////announcement////////////////////////////////
websiteAnnouncementsNoSaveFunction = function(){
    if(JSON.stringify(website.website_announcements) == JSON.stringify(website_temp.website_announcements)){
        $('.websiteAnnouncementNoSave').addClass('none');
        return true;
    }else{
        $('.websiteAnnouncementNoSave').removeClass('none');
        return false;
    }

}

$('html,body').on('input change','.websiteAnnouncementInputText',function(e){
    e.stopImmediatePropagation();
    for(const key in website.languages){
        let lang = website.languages[key];
        website_temp.website_announcements[lang.code] = $(`#settings_Announcement_${lang.code}`).val();
    }
    restaurant_information_unsave_chack();
})

$('html,body').on('click','#settings-websiteAnnouncementCancelBtn',function(e){
    e.stopImmediatePropagation();
    website_temp.website_announcements = JSON.parse(JSON.stringify(website.website_announcements));
    for(const key in website.languages){
        let lang = website.languages[key];
        $(`#settings_Announcement_${lang.code}`).val(website.website_announcements[lang.code]);
    }
    restaurant_information_unsave_chack();
});
$('html,body').on('click','#settings-websiteAnnouncementSaveBtn',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    showBtnLoading($('#settings-websiteAnnouncementSaveBtn'))
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            saveWebsiteAnnouncements:website_temp.website_announcements,
        },
        success:function(response){
            hideBtnLoading($('#settings-websiteAnnouncementSaveBtn'))
            if(response.saveWebsiteAnnouncement == 1){
                showAlert('success',response.msg,4000,true);
                website.website_announcements = JSON.parse(JSON.stringify(website_temp.website_announcements));
                restaurant_information_unsave_chack();
                window.guideHints.websiteAnnouncements();
            }else if(response.saveWebsiteAnnouncement == 0){
                showAlert('error',response.msg,4000,true);

            }
        }

    });
});
