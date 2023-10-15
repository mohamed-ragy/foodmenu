// require("../bootstrap");
window.$ = require("jquery");
window.loadTouchEvents = require('jquery-touch-events');
const { post } = require("jquery");
loadTouchEvents($);
window.Cookies = require('js-cookie');
$(document).ready(function(){
    let colorMode = window.Cookies.get('darkMode');
    console.log(colorMode)
    if(colorMode == 1){
        $('#colors').prop('href','css/cpanel/colorsDark.css');
        $('#foodMenuLogo').attr('src','./storage/logo/logo_dark.png')
    }
    require("./tools/loading.js")
    require("./login/loginForm.js")
    require("./login/forgetPassword.js")
    require("./login/enterCode.js")
    require("./login/changePassword.js")
    require("./login/unblock.js")


    window.resetCodeFails = 0;

    showErrorMsg = function(msg){
        $('.formContainer').addClass('opacity0');
        $('#backToLoginForm').addClass('opacity0')
        $('#errorMsgTxt').text(msg)
        setTimeout(() => {
            $('#backToLoginForm').addClass('none')
            $('.formContainer').addClass('none');
            $('#errorMsg').removeClass('none');
            $('#errorMsg').removeClass('opacity0');
        }, 500);
    }
    /////////////events
    $('.clearVal').on('click',function(){
        if($(this).closest('.inputTextContainer').find('.inputText').prop('disabled')){return}
        $(this).closest('.inputTextContainer').find('.inputText').val('')
    })
    $('.passwordShowHide').on('click',function(){
        if($(this).hasClass('ico-showPassword')){
            $(this).removeClass('ico-showPassword').addClass('ico-hidePassword');
            $(this).closest('.inputTextContainer').find('.inputText').prop('type','text');
        }else if($(this).hasClass('ico-hidePassword')){
            $(this).removeClass('ico-hidePassword').addClass('ico-showPassword');
            $(this).closest('.inputTextContainer').find('.inputText').prop('type','password');
        }
    })


    $('#forgetPassword').on('click',function(e){

        resetForgetPasswordForm();
        $('.formContainer').addClass('opacity0');
        $('#backToLoginForm').removeClass('none')
        setTimeout(()=>{
            $('.formContainer').addClass('none');
            $('#forgetPasswordContainer').removeClass('none')
            $('#forgetPasswordContainer').removeClass('opacity0')
            $('#backToLoginForm').removeClass('opacity0')
        },500)
    })

    $('#backToLoginForm').on('click',function(){
        window.resetPassword = null;
        window.resetPasswordEmail = null;
        window.resetPasswordPhone = null;
        window.resetCodeFails = 0;
        resetLoginForm();
        $('.formContainer').addClass('opacity0');
        $('#backToLoginForm').addClass('opacity0')
        setTimeout(()=>{
            $('#backToLoginForm').addClass('none')
            $('.formContainer').addClass('none');
            $('#loginContainer').removeClass('none');
            $('#loginContainer').removeClass('opacity0');
        },500)
    })


    ////////
    $('#loginContainer').removeClass('opacity0')
});
