resetLoginForm = function(){
    hideBtnLoading($('#loginBtn'));
    $('#loginEmailinput').prop('disabled',false)
    $('#loginPasswordinput').prop('disabled',false)
    $(this).removeClass('ico-hidePassword').addClass('ico-showPassword');
    $('#loginPasswordinput').prop('type','password');
    $('#loginMsg').removeClass().addClass('none').text('')
}
handleLoginRequest = function(r){
    if(r.code == 1){
        $('#loginFormsContainer').css('opacity','0');
        setTimeout(function(){
            location.reload();
        },400)
    }else if(r.code == 0){
        $('#loginMsg').removeClass().addClass('cR').text(r.msg);
        $('#loginEmailinput').prop('disabled',false)
        $('#loginPasswordinput').text('').prop('disabled',false)
        $('#loginPasswordinput').val('').focus();
        hideBtnLoading($('#loginBtn'));
    }
}
/////
if(Cookies.get('CpanelLoginEmail')){
    $('#loginEmailinput').val(Cookies.get('CpanelLoginEmail'));
    $('#loginPasswordinput').focus();
}else{
    $('#loginEmailinput').focus();
}
//////
$('#loginEmailinput, #loginPasswordinput').on('keypress',function(e){
    if(e.which == 13){
        $('#loginBtn').trigger('click');
    }
})
$('#loginBtn').on('click',function(){
    showBtnLoading($('#loginBtn'));
    $('#loginEmailinput').prop('disabled',true)
    $('#loginPasswordinput').prop('disabled',true)
    $.ajax({
        url:'/dologin',
        type:'post',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            cpLogin:true,
            email:$('#loginEmailinput').val(),
            password:$('#loginPasswordinput').val(),
        },success:function(r){
            handleLoginRequest(r)
        }
    })
})

