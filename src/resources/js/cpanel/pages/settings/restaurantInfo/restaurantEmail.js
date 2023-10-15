////////////////restaurantEmail
$('html,body').on('input change','#settings-restaurantEmail',function(){
    website_temp.restaurantEmail = $(this).val();
    restaurant_information_unsave_chack();
});
$('html,body').on('click','#settings-restaurantEmailCancelBtn',function(){
    website_temp.restaurantEmail = website.restaurantEmail;
    $('#settings-restaurantEmail').val(website.restaurantEmail);
    restaurant_information_unsave_chack();
});
$('html,body').on('click','#settings-restaurantEmailSaveBtn',function(e){
    e.stopImmediatePropagation();
    if(!coolDownChecker()){return;}
    showBtnLoading($('#settings-restaurantEmailSaveBtn'))
    $.ajax({
        url:'settings',
        type:'put',
        data:{
            _token:$('meta[name="csrf-token"]').attr('content'),
            saveRestaurantEmail:website_temp.restaurantEmail,
        },
        success:function(response){
            hideBtnLoading($('#settings-restaurantEmailSaveBtn'))
            if(response.saveRestaurantEmail == 1){
                showAlert('success',response.msg,4000,true);
                website.restaurantEmail = website_temp.restaurantEmail;
                restaurant_information_unsave_chack();
                window.guideHints.restaurantEmail();
            }else if(response.saveRestaurantEmail == 0){
                showAlert('error',response.msg,4000,true);
            }
        }

    });
});
restaurantEmailNoSaveFunction = function(){
    if(
        website.restaurantEmail == $('#settings-restaurantEmail').val()
    ){
        $('.restaurantEmailNoSave').addClass('none');
        return true;
    }else{
        $('.restaurantEmailNoSave').removeClass('none');
        return false;
    }
}
