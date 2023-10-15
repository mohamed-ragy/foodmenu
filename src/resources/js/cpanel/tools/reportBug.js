$('.reportBug').on('click',function(){
    showPopup('reportBug',function(){
        $('#reportBugMsg').focus();
    });
})
$('html,body').on('click','#reportBugBtn',function(e){
    e.stopImmediatePropagation();
    if($('#reportBugMsg').val() == ''){
        showAlert('error',texts.cpanel.reportBug.msgRequired,4000,true)
        textareaError($('#reportBugMsg'))
        $('#reportBugMsg').select();
        return;
    }
    showBtnLoading($('#reportBugBtn'));
    $.ajax({
        url:'dashboard',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            reportBug:$('#reportBugMsg').val(),
        },
        success:function(response){
            hideBtnLoading($('#reportBugBtn'));
            if(response.reportBugStatus == 1){
                showAlert('success',response.msg,4000,true);
                $('#reportBugMsg').val('').trigger('input');
                closePopup();
            }else if(response.reportBugStatus == 0){
                showAlert('error',response.msg,4000,true);
            }
        }
    })

})
