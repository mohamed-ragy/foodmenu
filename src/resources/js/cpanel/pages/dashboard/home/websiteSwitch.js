/////////websiteSwitch
checkWebsiteStatus = function(){

    if(website.subscription_status != 'trialing' && website.subscription_status != 'incomplete' && website.subscription_status != 'active'){
        website.active == false;
        $('#system-websiteSwitch').prop('checked',false);
        $('.websiteStatus').removeClass('cG').addClass('cR')
        $('.websiteStatusIcon').removeClass('online-icon').addClass('offline-icon');
    }else{
        if(website.active == true){
            $('#system-websiteSwitch').prop('checked',true);
            $('.websiteStatus').removeClass('cR').addClass('cG')
            $('.websiteStatusIcon').removeClass('offline-icon').addClass('online-icon')
            $('.websiteStatusTxt').text(texts.cpanel.public.online)
        }else if(website.active == false){
            $('#system-websiteSwitch').prop('checked',false);
            $('.websiteStatus').removeClass('cG').addClass('cR')
            $('.websiteStatusIcon').removeClass('online-icon').addClass('offline-icon')
            $('.websiteStatusTxt').text(texts.cpanel.public.offline)
        }
    }
};


$('html,body').on('change','#system-websiteSwitch',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){
        setTimeout(function(){
            checkWebsiteStatus();
        },100)
        return;
    }
    if(website.subscription_status != 'trialing' && website.subscription_status != 'incomplete' && website.subscription_status != 'active'){
        website.active == false;
        setTimeout(function(){
            $('#system-websiteSwitch').prop('checked',false);
        },200);
        showAlert('warning',texts.settings.siteoffpaymentFail,1000000,true);
        return
    }
    showLoading($('#websiteSwitchLoading'))
    if($('#system-websiteSwitch').is(':checked')){
        $.ajax({
            url:'settings',
            type:'put',
            data:{
                _token: $('meta[name="csrf-token"]').attr("content"),
                websiteSwitch:1,
            },
            success:function(response){
                if(response.websiteSwitchOnStatus == 1){
                    setTimeout(function(){
                        showAlert('success',response.msg,4000,true);
                        hideLoading($('#websiteSwitchLoading'))
                        website.active = true;
                        window.guideHints.websiteSwitch();
                        checkWebsiteStatus();
                    },1000);
                }else if(response.websiteSwitchOnStatus == 0){
                    showAlert('error',response.msg,4000,true);
                    hideLoading($('#websiteSwitchLoading'))
                    checkWebsiteStatus();
                }
            }
        })
    }else if(!$('#system-websiteSwitch').is(':checked')){
        $.ajax({
            url:'settings',
            type:'put',
            data:{
                _token: $('meta[name="csrf-token"]').attr("content"),
                websiteSwitch:0,
            },
            success:function(response){
                if(response.websiteSwitchOffStatus == 1){
                    setTimeout(function(){
                        showAlert('success',response.msg,4000,true);
                        hideLoading($('#websiteSwitchLoading'))
                        website.active = false;
                        window.guideHints.websiteSwitch();
                        checkWebsiteStatus();
                    },1000);
                }else if(response.websiteSwitchOffStatus == 0){
                    showAlert('error',response.msg,4000,true);
                    hideLoading($('#websiteSwitchLoading'))
                    checkWebsiteStatus();
                }
            }
        })
    }
});
////////////
