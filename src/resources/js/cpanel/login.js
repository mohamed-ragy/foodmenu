window.$ = require("jquery");
window.loadTouchEvents = require('jquery-touch-events');
const { post } = require("jquery");
loadTouchEvents($);
window.Cookies = require('js-cookie');

require("./tools/loading.js")
require("./tools/form/inputTxt.js")

changeForm = function(form,callback=()=>{}){
    $('.formContainer').addClass('opacity0')
    setTimeout(()=>{
        drawForm(form)
        callback();
        setTimeout(()=>{
            $('.formContainer').removeClass('opacity0')
        },200)
    },400)
}
drawForm = function(form){
    switch (form) {
        case 'login':
            $('#loginFormsContainer').text('').append(
                $('<div/>',{class:'formContainer opacity0'}).append(
                    $('<a/>',{class:'hvr-tdNone taC pointer',href:process.env.MIX_APP_URL}).append(
                        $('<img/>',{class:'foodMenuLogo',src:'/storage/logo/logo.png'})
                    ),
                    $('<div/>',{class:'m10 fs103 bold',text:window.texts.login}),

                    $('<div/>',{class:'taC mX10 w350 mxw100p-40'}).append(
                        $('<span/>',{id:'msg',class:'',text:''})
                    ),
                    drawInputText('','ico-email_address','',window.texts.email,'loginEmailinput','text',window.texts.email,200,'clearVal','mY20','',false,''),
                    drawInputText('','ico-password','',window.texts.password,'loginPasswordinput','password',window.texts.password,200,'password','mT0','',false,''),
                    $('<a/>',{class:'alnsE fs09 mB10 changeForm',changeForm:'forgetPassword',text:window.texts.forgetPassword}),
                    $('<button/>',{class:'btn',id:'loginBtn'}).append(
                        $('<div/>',{class:'btnLoading'}),
                        $('<div/>',{class:'btnTxt',text:window.texts.login})
                    ),
                    $('<div/>',{class:'mT20',html:window.texts.dontHaveAccount})
                )
            )
            if(Cookies.get('CpanelLoginEmail')){
                $('#loginEmailinput').val(Cookies.get('CpanelLoginEmail'));
                $('#loginPasswordinput').focus();
            }else{
                $('#loginEmailinput').focus();
            }
        break;
        case 'loading':
            $('#loginFormsContainer').text('').append(
                $('<div/>',{class:'loading_L vV'})
            )
        break;
        case 'forgetPassword':
            $('#loginFormsContainer').text('').append(
                $('<div/>',{class:'formContainer opacity0'}).append(
                    $('<div/>',{class:'forgetPasswordOption changeForm',changeForm:'forgetPassword_email'}).append(
                        $('<div/>',{class:'ico-email_address fs3'}),
                        $('<div/>',{class:'fs101 taC mX10 mY20',text:window.texts.recoverPasswordEmail})
                    ),
                    $('<div/>',{class:'forgetPasswordOption mT20 changeForm',changeForm:'forgetPassword_phone'}).append(
                        $('<div/>',{class:'ico-phone_number fs3'}),
                        $('<div/>',{class:'fs101 taC mX10 mY20',text:window.texts.recoverPasswordSMS})
                    ),
                    $('<a/>',{class:'mT30 changeForm',changeForm:'login',text:window.texts.backToLogin})
                )
            )
        break;
        case 'forgetPassword_email':
            $('#loginFormsContainer').text('').append(
                $('<div/>',{class:'formContainer opacity0'}).append(
                    $('<div/>',{class:'taC mX10 w350 mxw100p-40'}).append(
                        $('<span/>',{id:'msg',class:'',text:window.texts.enterResetEmailMsg})
                    ),
                    drawInputText('','ico-email_address','',window.texts.email,'recoverPasswordEmailInput','text',window.texts.email,200,'clearVal','mY20','',false,''),
                    $('<button/>',{class:'btn',id:'recoverPasswordEmailBtn'}).append(
                        $('<div/>',{class:'btnLoading'}),
                        $('<div/>',{class:'btnTxt',text:window.texts.recoverPasswordEmailBtn})
                    ),
                    $('<a/>',{class:'mT30 changeForm',changeForm:'login',text:window.texts.backToLogin})
                )
            )
            $('#recoverPasswordEmailInput').focus();
        break;
        case 'forgetPassword_phone':
            $('#loginFormsContainer').text('').append(
                $('<div/>',{class:'formContainer opacity0'}).append(
                    $('<div/>',{class:'taC mX10 w350 mxw100p-40'}).append(
                        $('<span/>',{id:'msg',class:'',text:window.texts.enterResetPhoneMsg})
                    ),
                    drawInputText('','ico-phone_number','',window.texts.phoneNumber,'recoverPasswordPhoneInput','text',window.texts.phoneNumber,200,'clearVal','mY20','',false,''),
                    $('<button/>',{class:'btn',id:'recoverPasswordPhoneBtn'}).append(
                        $('<div/>',{class:'btnLoading'}),
                        $('<div/>',{class:'btnTxt',text:window.texts.recoverPasswordPhoneBtn})
                    ),
                    $('<a/>',{class:'mT30 changeForm',changeForm:'login',text:window.texts.backToLogin})
                )
            )
            $('#recoverPasswordPhoneInput').focus();
        break;
        case 'forgetPassword_code':
            $('#loginFormsContainer').text('').append(
                $('<div/>',{class:'formContainer opacity0'}).append(
                    $('<div/>',{class:'taC mX10 w350 mxw100p-40'}).append(
                        $('<span/>',{id:'msg',class:'',text:window.texts.enterTheCode})
                    ),
                    drawInputText('','ico-security','','','resetPasswordCode','password','',6,'password','mY20','',false,'w80'),
                    $('<button/>',{class:'btn w150',id:'resetPasswordCodeBtn'}).append(
                        $('<div/>',{class:'btnLoading'}),
                        $('<div/>',{class:'btnTxt',text:window.texts.confirm})
                    ),
                    $('<a/>',{class:'mT30 changeForm',changeForm:'login',text:window.texts.backToLogin})
                )
            )
            $('#resetPasswordCode').focus();
        break;
        case 'changePassword':
            $('#loginFormsContainer').text('').append(
                $('<div/>',{class:'formContainer opacity0'}).append(
                    $('<div/>',{class:'taC mX10 w350 mxw100p-40'}).append(
                        $('<span/>',{id:'msg',class:'',text:window.texts.enterTheCode})
                    ),
                    drawInputText('','ico-password','',window.texts.newPassword,'changePasswordPassword','password',window.texts.newPassword,200,'password','','',false,''),
                    drawInputText('','ico-password','',window.texts.newPasswordConfirm,'changePasswordConfirm','password',window.texts.newPasswordConfirm,200,'password','','',false,''),
                    $('<button/>',{class:'btn mY10 mX5 w100p-10',id:'changePasswordBtn'}).append(
                        $('<div/>',{class:'btnLoading'}),
                        $('<div/>',{class:'btnTxt',text:window.texts.changePassword})
                    ),
                )
            )
            $('#changePasswordPassword').focus();
        break;
        case 'error':
            $('#loginFormsContainer').text('').append(
                $('<div/>',{class:'formContainer opacity0'}).append(
                    $('<div/>',{class:'taC mX10 w350 mxw100p-40'}).append(
                        $('<span/>',{id:'msg',class:'cR'})
                    ),
                    $('<a/>',{class:'mT30 changeForm',changeForm:'login',text:window.texts.backToLogin})
                )
            )
        break;
        default:
            drawForm('login')
        break;
    }
}

require("./login/loginForm.js")
require("./login/forgetPassword.js")
require("./login/enterCode.js")
require("./login/changePassword.js")


window.resetCodeFails = 0;


$('body').on('click','.changeForm',function(e){
    changeForm($(this).attr('changeForm'))
})

drawForm('loading')
let params = new URLSearchParams(window.location.search)
if(params.get('unblock') != null){
    let unblockCode = params.get('unblock');
    window.history.replaceState({},'','/login')
    $.ajax({
        url:'/dologin',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            unblockAccount:unblockCode,
            email:params.get('email'),
        },success:function(r){
            if(r.code == 0){
                changeForm('error',function(){
                    $('#msg').removeClass().addClass('cR m10').text(r.msg)
                })
            }else if(r.code == 1){
                changeForm('login',function(){
                    $('#msg').removeClass().addClass('cG m10').text(r.msg)
                })
            }
        }
    })
}else{
    changeForm('login')
}
