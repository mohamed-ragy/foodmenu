
handleLoginRequest = function(r){
    if(r.code == 1){
        changeForm('loading')
        setTimeout(function(){
            location.reload();
        },1000)
    }else if(r.code == 0){
        $('#msg').removeClass().addClass('cR m10').text(r.msg)
        $('#loginEmailinput').prop('disabled',false)
        $('#loginPasswordinput').prop('disabled',false).val('').focus();
        hideBtnLoading($('#loginBtn'));
    }
}
/////

//////
$('body').on('keypress','#loginEmailinput, #loginPasswordinput',function(e){
    if(e.which == 13){
        $('#loginBtn').trigger('click');
    }
})
$('body').on('click','#loginBtn',function(e){
    showBtnLoading($('#loginBtn'));
    $('#loginEmailinput').prop('disabled',true)
    $('#loginPasswordinput').prop('disabled',true)
    $('#msg').text('');
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

