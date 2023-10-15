step1 = function(){
    $('.getStartedText').addClass('getStartedText_show');
    $('.stepTxt').addClass('stepTxt_Show')
    $('.stepIcon').addClass('stepIcon_show')

    $('.getStartedBtnContainer').addClass('opacity0')
    $('.registerForm').removeClass('registerForm_show');
    $('.stepContainer[step="2"]').find('.stepIcon').removeClass('stepIcon_active stepIcon_success');
    $('.stepContainer[step="3"]').find('.stepIcon').removeClass('stepIcon_active stepIcon_success');
    $('.stepContainer[step="4"]').find('.stepIcon').removeClass('stepIcon_active stepIcon_success');
    setTimeout(function(){
        $('.getStartedBtnContainer').addClass('none')
        $('.registerForm').addClass('none');
        $('.registerForm[step="1"]').removeClass('none');

        $('.stepContainer[step="1"]').find('.stepTxtCheck').removeClass('stepTxtCheck_show');
        $('.stepContainer[step="2"]').find('.stepTxtCheck').removeClass('stepTxtCheck_show');
        $('.stepContainer[step="3"]').find('.stepTxtCheck').removeClass('stepTxtCheck_show');
        $('.stepContainer[step="4"]').find('.stepTxtCheck').removeClass('stepTxtCheck_show');
    },500)
    setTimeout(function(){
        $('.registerForm[step="1"]').addClass('registerForm_show');
        $('.stepContainer[step="1"]').find('.stepIcon').addClass('stepIcon_active').removeClass('stepIcon_success')
        $('.registerPrograssBar_val').css('width','0%')
    },550)
}

$('.agreeCheck').on('click',function(e){
    e.stopImmediatePropagation();
    if($('a:hover').length > 0){return;}
    $(this).children().first().removeClass('cR')
    $(this).children().first().hasClass('ico-check1') ? $(this).children().first().removeClass('ico-check1').addClass('ico-check0') : $(this).children().first().hasClass('ico-check0') ? $(this).children().first().removeClass('ico-check0').addClass('ico-check1') : null;
})

$('#step1Btn').on('click',function(){
    clearErrors();
    showBtnLoading($('#step1Btn'));
    $('input').prop('disabled',true);
    $.ajax({
        url:'/doRegister',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            createAccount:true,
            name:$('#name').val(),
            email:$('#email').val(),
            password:$('#password').val(),
            passwordConfirm:$('#passwordConfirm').val(),
            agree1:$('#agree1Check').hasClass('ico-check1'),
            agree2:$('#agree2Check').hasClass('ico-check1'),
            agree3:$('#agree3Check').hasClass('ico-check1'),
        },success:function(r){
            hideBtnLoading($('#step1Btn'));
            $('input').prop('disabled',false);
            if(r.createAccountState == 0){

                if(r.errors.agree1){
                    $('#agree1Error').removeClass('none').text(r.errors.agree1[0])
                    $('#agree1Check').addClass('cR')
                }
                if(r.errors.agree2){
                    $('#agree2Error').removeClass('none').text(r.errors.agree2[0])
                    $('#agree2Check').addClass('cR')
                }
                if(r.errors.passwordConfirm){
                    inputTextError($('#passwordConfirm'));
                    $('#passwordConfirm_error').removeClass('vH').html(r.errors.passwordConfirm[0]);
                }
                if(r.errors.password){
                    inputTextError($('#password'));
                    $('#password_error').removeClass('vH').html(r.errors.password[0]);
                }
                if(r.errors.email){
                    inputTextError($('#email'));
                    $('#email_error').removeClass('vH').html(r.errors.email[0]);
                }
                if(r.errors.name){
                    inputTextError($('#name'));
                    $('#name_error').removeClass('vH').html(r.errors.name[0]);
                }
            }else if(r.createAccountState == 1){
                step2();
            }
        }
    })
})
