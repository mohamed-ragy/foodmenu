step3 = function(){
    $('.getStartedText').addClass('getStartedText_show');
    $('.stepTxt').addClass('stepTxt_Show')
    $('.stepIcon').addClass('stepIcon_show')


    $('.getStartedBtnContainer').addClass('opacity0')
    $('.registerForm').removeClass('registerForm_show');
    $('.stepContainer[step="4"]').find('.stepIcon').removeClass('stepIcon_active stepIcon_success');
    setTimeout(function(){
        $('.getStartedBtnContainer').addClass('none')
        $('.registerForm').addClass('none');
        $('.registerForm[step="3"]').removeClass('none');

        $('.stepContainer[step="3"]').find('.stepTxtCheck').removeClass('stepTxtCheck_show');
        $('.stepContainer[step="4"]').find('.stepTxtCheck').removeClass('stepTxtCheck_show');
    },500)
    setTimeout(function(){
        $('.stepContainer[step="1"]').find('.stepTxtCheck').addClass('stepTxtCheck_show');
        $('.stepContainer[step="2"]').find('.stepTxtCheck').addClass('stepTxtCheck_show');

        $('.registerForm[step="3"]').addClass('registerForm_show');
        $('.stepContainer[step="1"]').find('.stepIcon').removeClass('stepIcon_active').addClass('stepIcon_success')
        $('.stepContainer[step="2"]').find('.stepIcon').removeClass('stepIcon_active').addClass('stepIcon_success')
        $('.stepContainer[step="3"]').find('.stepIcon').addClass('stepIcon_active').removeClass('stepIcon_success')
        $('.registerPrograssBar_val').css('width','100%')
        installationFuntion()
    },550)
}

let installationPercent = 0;
let installationInterval;
// showInstallations = function(){
//     $('.registerForm').removeClass('registerForm_show');
//     setTimeout(function(){
//         $('.registerForm').addClass('none');
//         $('.registerForm[step="3_5"]').removeClass('none');
//     },500)
//     setTimeout(function(){
//         $('.registerForm[step="3_5"]').addClass('registerForm_show');
//         installationFuntion();
//     },550)

// }
installationFuntion = function(){
    installationPercent = installationPercent + Math.floor(Math.random() * (Math.floor(8) - Math.ceil(1) + 1)) + Math.ceil(1);
    $('.istallationBar').css('width',installationPercent+'%')
    // clearInterval(installationInterval)
    if(installationPercent < 100){
        installationInterval = setTimeout(function(){
            installationFuntion()
        },Math.floor(Math.random() * (Math.floor(800) - Math.ceil(100) + 1)) + Math.ceil(100));
    }else{
        setTimeout(()=>{
            step4();
        },1000)
    }
}

