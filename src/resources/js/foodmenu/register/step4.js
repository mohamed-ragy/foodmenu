step4 = function(){
    $.ajax({
        url:'/doRegister',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            setInstallationDone:true,
        }
    })
    $('.getStartedText').addClass('getStartedText_show');
    $('.stepTxt').addClass('stepTxt_Show')
    $('.stepIcon').addClass('stepIcon_show')


    $('.getStartedBtnContainer').addClass('opacity0')
    $('.registerForm').removeClass('registerForm_show');
    setTimeout(function(){
        $('.getStartedBtnContainer').addClass('none')
        $('.registerForm').addClass('none');
        $('.registerForm[step="4"]').removeClass('none');

        $('.stepContainer[step="4"]').find('.stepTxtCheck').removeClass('stepTxtCheck_show');
    },500)
    setTimeout(function(){
        $('.stepContainer[step="1"]').find('.stepTxtCheck').addClass('stepTxtCheck_show');
        $('.stepContainer[step="2"]').find('.stepTxtCheck').addClass('stepTxtCheck_show');
        $('.stepContainer[step="3"]').find('.stepTxtCheck').addClass('stepTxtCheck_show');

        $('.registerForm[step="4"]').addClass('registerForm_show');
        $('.stepContainer[step="1"]').find('.stepIcon').removeClass('stepIcon_active').addClass('stepIcon_success')
        $('.stepContainer[step="2"]').find('.stepIcon').removeClass('stepIcon_active').addClass('stepIcon_success')
        $('.stepContainer[step="3"]').find('.stepIcon').removeClass('stepIcon_active').addClass('stepIcon_success')
        $('.stepContainer[step="4"]').find('.stepIcon').addClass('stepIcon_active').removeClass('stepIcon_success')
        $('.registerPrograssBar_val').css('width','99.9%')
    },550)
}

