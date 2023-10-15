///////////////////////////privacy policy/////////////////////////
    for(const key in website.languages){
        let lang = website.languages[key];
        $('html,body').on('input change',`#system_PrivacyPolicy_${lang.code}`,function(e){
            e.stopImmediatePropagation();
            website_temp.website_privacyPolicy[lang.code] = $(`#system_PrivacyPolicy_${lang.code}`).val();
            system_unsave_check();
        })
    }

    $('html,body').on('click','#system-privacyPolicyCancelBtn',function(e){
        e.stopImmediatePropagation();
        if(!account.is_master){return;}
        for(const key in website.languages){
            let lang = website.languages[key];
            $(`#system_PrivacyPolicy_${lang.code}`).val(website.website_privacyPolicy[lang.code]);
        }
        website_temp.website_privacyPolicy = JSON.parse(JSON.stringify(website.website_privacyPolicy));
        system_unsave_check();

    });
    $('html,body').on('click','#system-privacyPolicySaveBtn',function(e){
        e.stopImmediatePropagation();
        if(!coolDownChecker()){return;}
        showBtnLoading($('#system-privacyPolicySaveBtn'))
        $.ajax({
            url:'settings',
            type:'put',
            data:{
                _token:$('meta[name="csrf-token"]').attr('content'),
                saveWebsitePrivacyPolicy:website_temp.website_privacyPolicy,
            },
            success:function(response){
                hideBtnLoading($('#system-privacyPolicySaveBtn'))
                if(response.saveWebsitePrivacyPolicy == 1){
                    showAlert('success',response.msg,4000,true);
                    website.website_privacyPolicy = website_temp.website_privacyPolicy;
                    system_unsave_check();
                    window.guideHints.websitePrivacyPolicy();
                }else if(response.saveWebsitePrivacyPolicy == 0){
                    showAlert('error',response.msg,4000,true);

                }
            }

        });
    });
    websitePrivacyPolicyNoSaveCheck = function(){
        if(!account.is_master){return true;}
        if(JSON.stringify(website.website_privacyPolicy) == JSON.stringify(website_temp.website_privacyPolicy)){
            $('.system-privacyPolicyNoSave').addClass('none');
            return true;
        }else{
            $('.system-privacyPolicyNoSave').removeClass('none');
            return false;
        }

    }

